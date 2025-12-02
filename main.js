import { API_BASE_URL, apiCall } from './src/api-config.js';
import { AboutUsPage } from './pages/AboutUsPage.js';
import { LearnPage } from './pages/LearnPage.js';
import { TutorialDetailPage } from './pages/TutorialDetailPage.js';
import { ContactUsPage } from './pages/ContactUsPage.js';
import { DealsPage } from './pages/DealsPage.js';
import { AdminPage } from './pages/AdminPage.js';
import { UserPage } from './pages/UserPage.js';
import { ProductsPage } from './pages/ProductsPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';
import { ProductCard } from './pages/ProductDetailPage.js';
import { formatCurrency } from './src/utils.js';

//  --- State Management ---
const state = {
    products: [], // Will be fetched from API
    users: [], // Will be fetched from API (admin only)
    orders: [], // Will be fetched from API
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    cart: JSON.parse(localStorage.getItem('cart_v2')) || [],
    route: sessionStorage.getItem('currentRoute') || 'home', // Restore last route or default to home
    mobileMenuOpen: false, // For hamburger navigation
    searchQuery: '',
    showSuggestions: false,
    searchSuggestions: [],
    currentProductId: null,
    devices: [],
    currentDeviceId: null,
    esp32Client: null,
    deviceStatus: {},
    telemetryData: {},
    sortBy: 'featured',
    filterCategory: null,
    cartSearchQuery: '',
    isLoading: false,
    cartSynced: false, // Track if cart has been synced with server
    checkoutData: {
        shipping: {
            fullName: '',
            address: '',
            city: '',
            province: '',
            postalCode: '',
            phone: '',
            instructions: ''
        },
        paymentMethod: 'cod',
        shippingFee: 50
    },
    lastOrderId: null
};

// --- API Actions ---
const api = {
    // Products
    getProducts: async () => {
        try {
            const response = await apiCall('/products');
            state.products = response.data;
            render();
        } catch (error) {
            console.error('Failed to load products:', error);
            showToast('Failed to load products');
        }
    },


    // Auth
    login: async (email, password) => {
        console.log('Calling API login...');
        try {
            const response = await apiCall('/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            // Inside api.login, after login success:
            state.currentUser = response.data;
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));

            // Add this:
            await deviceAPI.getMyDevices(); // Load user's devices

            // Sync cart after login!
            await syncCartWithServer();

            showToast(`Welcome back, ${state.currentUser.name}!`);
            navigate('home');
        } catch (error) {
            showToast(error.message || 'Login failed');
            throw error;
        }
    },

    register: async (name, email, password) => {
        try {
            const response = await apiCall('/users/register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });
            state.currentUser = response.data;
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
            showToast('Account created successfully!');
            navigate('home');
        } catch (error) {
            showToast(error.message || 'Registration failed');
            throw error; // Re-throw to handle in caller
        }
    },

    // Orders
    createOrder: async (orderData) => {
        try {
            const response = await apiCall('/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });
            state.cart = [];
            saveState();
            showToast('Order placed successfully!');
            // Refresh orders if we're admin or viewing history
            if (state.currentUser.role === 'admin') api.getOrders();
            return response.data;
        } catch (error) {
            showToast(error.message || 'Failed to place order');
            throw error;
        }
    },

    getOrders: async () => {
        if (!state.currentUser || state.currentUser.role !== 'admin') return;
        try {
            const response = await apiCall('/orders');
            state.orders = response.data;
            render();
        } catch (error) {
            console.error('Failed to load orders:', error);
        }
    },

    getUsers: async () => {
        if (!state.currentUser || state.currentUser.role !== 'admin') return;
        try {
            const response = await apiCall('/users');
            state.users = response.data;
            render();
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    },
};

const deviceAPI = {

    // Inside the existing `api` object:
    getMyDevices: async () => {
        if (!state.currentUser) return;
        try {
            const response = await apiCall(`/devices/my-devices?userId=${state.currentUser.id}`);
            state.devices = response.data;

            // Initialize real-time status monitoring
            initializeDeviceStatusMonitoring();

            render();
        } catch (error) {
            console.error('Failed to load devices:', error);
            showToast('Failed to load devices');
        }
    },
    pairDevice: async (deviceId, deviceToken) => {
        try {
            const response = await apiCall('/devices/pair', {
                method: 'POST',
                body: JSON.stringify({
                    deviceId,
                    deviceToken,
                    userId: state.currentUser.id
                })
            });
            showToast('Device paired successfully!');
            await deviceAPI.getMyDevices();
            navigate('my-devices');
        } catch (error) {
            showToast(error.message || 'Device pairing failed');
            throw error;
        }
    }
};
// Real-time device status monitoring
function initializeDeviceStatusMonitoring() {
    // Initialize WebSocket client if not exists
    if (!state.esp32Client) {
        state.esp32Client = new ESP32SocketClient();
    }
    // Connect to Socket.IO if not already connected
    if (!state.esp32Client.isConnected() && state.currentUser) {
        state.esp32Client.connect(state.currentUser.id).catch(err => {
            console.error('Failed to connect to WebSocket:', err);
        });
    }
    // Listen for device status updates
    state.esp32Client.on('device:status', (data) => {
        console.log('📊 Device status update:', data);
        // Update the device in the devices array
        if (state.devices) {
            const deviceIndex = state.devices.findIndex(d => d.deviceId === data.deviceId);
            if (deviceIndex !== -1) {
                state.devices[deviceIndex].status = data.status === 'online' ? 'active' : 'offline';
                state.devices[deviceIndex].lastOnline = data.timestamp;
                // Store in deviceStatus for real-time tracking
                state.deviceStatus[data.deviceId] = data;
                // Re-render if we're on the devices page
                if (state.route === 'my-devices') {
                    render();
                }
            }
        }
    });
}

// --- Utilities ---
const saveState = () => {
    // Only save cart and user session locally
    localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    localStorage.setItem('cart_v2', JSON.stringify(state.cart));
};


const syncCartWithServer = async () => {
    if (!state.currentUser || state.cartSynced) return;

    try {
        // Call sync endpoint
        const response = await apiCall(`/users/${state.currentUser.id}/cart/sync`, {
            method: 'POST',
            body: JSON.stringify({ localCart: state.cart })
        });

        // Update cart with merged data from server
        state.cart = response.data.map(item => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            category: item.category,
            selected: item.selected
        }));

        state.cartSynced = true;
        saveState();
        render();
        showToast('Cart synced!');
    } catch (error) {
        console.error('Cart sync failed:', error);
    }
};

// --- Router ---
const navigate = (route, params = {}) => {
    state.route = route;
    state.params = params; // Store params for components to use
    state.mobileMenuOpen = false; // Close mobile menu on navigation
    sessionStorage.setItem('currentRoute', route); // Persist route!
    render();
    window.scrollTo(0, 0);
};

// Expose navigate to window for onclick handlers
window.navigate = navigate;

const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// --- Components ---

// Breadcrumbs Component
const Breadcrumbs = (pageName) => {
    const pages = {
        'deals': 'Deals',
        'learn': 'Learn',
        'my-devices': 'My Devices',
        'device-pair': 'Pair Device',
        'remote-control': 'Remote Control',
        'about-us': 'About Us',
        'contact-us': 'Contact Us',
        'products': 'Products',
        'cart': 'Cart',
        'checkout': 'Checkout'
    };

    const displayName = pages[pageName] || pageName;

    return `
        <div class="breadcrumbs">
            <a href="#" onclick="window.navigate('home'); return false;">Home</a>
            <span class="breadcrumb-separator">›</span>
            <span>${displayName}</span>
        </div>
    `;
};

const Header = () => {
    const isLoggedIn = state.currentUser !== null;
    const isAdmin = state.currentUser?.role === 'admin';
    const isCartPage = state.route === 'cart';
    const cartCount = state.cart.length;
    return `
        <header>
            <div class="header-top">
                <button class="hamburger-btn" onclick="window.toggleMobileMenu()" aria-label="Toggle menu">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
                <a href="#" class="logo" onclick="window.navigate('home'); return false;">
                    Lumina<span>Electronics</span>
                </a>
                
                ${!isCartPage ? `
                    <!-- Search Bar Code (Keep existing search bar code here) -->
                    <div class="search-bar">
                        <div class="search-container">
                            <input type="text" id="searchInput" class="search-input" placeholder="Search for Products..." 
                                value="${state.searchQuery}" oninput="window.handleSearchInput(event)"
                                onkeyup="if(event.key === 'Enter') window.handleSearch()" onfocus="window.showSearchSuggestions()">
                            <button class="search-btn" onclick="window.handleSearch()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                        </div>
                    </div>
                ` : ''}
                <div class="nav-actions" style="gap: 1.5rem;"> <!-- Increased gap -->
                    ${!isAdmin ? `
                    <a href="#" class="action-icon" onclick="window.navigate('cart'); return false;">
                        <div style="position: relative;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            ${cartCount > 0 ? `<span class="cart-count">${cartCount}</span>` : ''}
                        </div>
                        <span>Cart</span>
                    </a>
                    ` : ''}
                    
                    ${isLoggedIn ? `
                        <div class="user-dropdown">
                            <div class="action-icon">
                                <div style="width: 32px; height: 32px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                                    ${state.currentUser.name.charAt(0).toUpperCase()}
                                </div>
                                <span>${state.currentUser.name.split(' ')[0]}</span>
                            </div>
                            <div class="user-menu">
                                <a href="#" class="user-menu-item" onclick="window.navigate('user'); return false;">
                                    <span>👤 My Profile</span>
                                </a>
                                <a href="#" class="user-menu-item" onclick="window.navigate('my-devices'); return false;">
                                    <span>🚗 My Devices</span>
                                </a>
                                <div class="user-menu-item" onclick="window.logout()" style="cursor: pointer; color: var(--danger);">
                                    <span>🚪 Logout</span>
                                </div>
                            </div>
                        </div>
                    ` : `
                         <a href="#" class="action-icon" onclick="window.openLoginModal(); return false;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span>Login</span>
                        </a>
                    `}
                </div>
            </div>
            <!-- Keep existing nav links below -->
            <nav class="header-nav ${state.mobileMenuOpen ? 'mobile-open' : ''}">
                <a href="#" class="nav-link ${state.route === 'home' ? 'active' : ''}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${state.route === 'products' ? 'active' : ''}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link ${state.route === 'deals' ? 'active' : ''}" onclick="window.navigate('deals'); return false;">Deals</a>
                <a href="#" class="nav-link ${state.route === 'learn' ? 'active' : ''}" onclick="window.navigate('learn'); return false;">Learn</a>
                <!-- Removed My Devices from here as it's in dropdown now, but can keep for mobile if desired -->
                 <a href="#" class="nav-link ${state.route === 'about-us' ? 'active' : ''}" onclick="window.navigate('about-us'); return false;">About Us</a>
                  <a href="#" class="nav-link ${state.route === 'contact-us' ? 'active' : ''}" onclick="window.navigate('contact-us'); return false;">Contact Us</a>
            </nav>
        </header>
    `;
};


const HomePage = () => {
    // Filter products based on search query
    if (state.searchQuery) {
        const filteredProducts = state.products.filter(product =>
            product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        );

        return `
            <div class="hero">
                <div class="hero-content">
                    <span class="hero-badge">Quality Components</span>
                    <h1>Build Your Next Project</h1>
                    <p>Premium electronics components, development boards, sensors, and maker supplies. Everything you need to bring your ideas to life.</p>
                    <div style="display: flex; gap: 1rem;">
                        <button class="btn btn-primary" onclick="window.navigate('products')">Shop Components</button>
                        <button class="btn btn-outline">Learn More</button>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80" alt="Electronics Components" style="max-width: 400px; border-radius: 20px;">
                </div>
            </div>
            
            <div style="padding: 2rem 0;">
                <div class="section-title">
                    <h2>Search Results</h2>
                </div>
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} for "${state.searchQuery}"</p>
                ${filteredProducts.length > 0 ? `
                    <div class="product-grid">
                        ${filteredProducts.map(ProductCard).join('')}
                    </div>
                ` : `
                    <div style="text-align: center; padding: 4rem 2rem; color: var(--text-muted);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 1rem; opacity: 0.3;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <h3 style="margin-bottom: 0.5rem;">No products found</h3>
                        <p>Try searching with different keywords</p>
                        <button class="btn btn-primary" onclick="window.clearSearch()" style="margin-top: 1rem;">Clear Search</button>
                    </div>
                `}
            </div>
        `;
    }

    // Default Home: Show Popular Products (5 items)
    // 1. ESP32, 2. Servo, 3. Ultrasonic, 4. 18650, 5. Jumper Wires
    const popularIds = [1, 6, 2, 12, 4];
    const popularProducts = state.products
        .filter(p => popularIds.includes(p.id))
        .sort((a, b) => popularIds.indexOf(a.id) - popularIds.indexOf(b.id));

    return `
        <div class="hero">
            <div class="hero-content">
                <span class="hero-badge">Quality Components</span>
                <h1>Build Your Next Project</h1>
                <p>Premium electronics components, development boards, sensors, and maker supplies. Everything you need to bring your ideas to life.</p>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary" onclick="window.navigate('products')">Shop Components</button>
                    <button class="btn btn-outline">Learn More</button>
                </div>
            </div>
            <div class="hero-image">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80" alt="Electronics Components" style="max-width: 400px; border-radius: 20px;">
            </div>
        </div>
        
        <div style="padding: 2rem 0;">
            <div class="section-title">
                <h2>Popular Products</h2>
                <a href="#" onclick="window.navigate('products'); return false;" style="font-size: 0.9rem; color: var(--primary); font-weight: 600;">View All Products &rarr;</a>
            </div>
            <div class="product-grid">
                ${popularProducts.map(ProductCard).join('')}
            </div>
        </div>
    `;
};


const LoginPage = () => {
    return `
        <div class="auth-container">
            <h2 class="auth-title">Welcome Back</h2>
            <form onsubmit="window.handleLogin(event)">
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="text" name="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" class="form-input" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%">Login</button>
            </form>
            <p class="text-center mt-4 text-sm">
                Don't have an account? <a href="#" onclick="window.navigate('signup'); return false;" style="color: var(--accent)">Sign up</a>
            </p>
        </div>
    `;
};

const SignupPage = () => {
    return `
        <div class="auth-container">
            <h2 class="auth-title">Create Account</h2>
            <form onsubmit="window.handleSignup(event)">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" name="name" class="form-input" required 
                           pattern="[a-zA-Z\\s]+" 
                           title="Please enter letters only."
                           oninput="this.value = this.value.replace(/[^a-zA-Z\\s]/g, '')">
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" name="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" class="form-input" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%">Sign Up</button>
            </form>
            <p class="text-center mt-4 text-sm">
                Already have an account? <a href="#" onclick="window.openLoginModal(); return false;" style="color: var(--accent)">Login</a>
            </p>
        </div>
    `;
};

const CartPage = () => {
    if (state.cart.length === 0) {
        return `
            <div class="text-center" style="padding: 4rem; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                <h2 style="margin-bottom: 1rem;">Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('products')">Start Shopping</button>
            </div>
        `;
    }
    // Filter cart items based on cart search query
    let displayedCartItems = state.cart;
    if (state.cartSearchQuery) {
        displayedCartItems = state.cart.filter(item =>
            item.name.toLowerCase().includes(state.cartSearchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(state.cartSearchQuery.toLowerCase())
        );
    }
    const total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return `
        <div style="margin: 2rem auto; padding: 0 2rem;">
            <button class="btn btn-outline" onclick="window.navigate('products')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                ← Continue Shopping
            </button>
            
            <div class="cart-container">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0;">Shopping Cart</h2>
                    
                    ${state.cart.length > 0 ? `
                        <div class="search-container" style="max-width: 400px; flex: 1;">
                            <input 
                                type="text" 
                                id="cartSearchInput" 
                                class="search-input" 
                                placeholder="Search items in cart..." 
                                value="${state.cartSearchQuery}"
                                oninput="window.handleCartSearch(event)"
                                style="width: 100%;"
                            >
                            <button class="search-btn" onclick="window.clearCartSearch()">
                                ${state.cartSearchQuery ? `
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                ` : `
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                `}
                            </button>
                        </div>
                    ` : ''}
                </div>
                
                <div class="cart-search-message" style="${state.cartSearchQuery && displayedCartItems.length === 0 ? '' : 'display: none;'}">
                    ${state.cartSearchQuery && displayedCartItems.length === 0 ? `
                        <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                            No items found for "${state.cartSearchQuery}"
                        </p>
                    ` : ''}
                </div>
                
            <div class="cart-items">
                ${displayedCartItems.map(item => {
        // Find similar products based on category
        const similarProducts = state.products
            .filter(p => p.category === item.category && p.id !== item.id)
            .slice(0, 4); // Show up to 4 similar items
        return `
                    <div style="display: flex; flex-direction: column; background: var(--surface); border-bottom: 1px solid var(--border);">
                        <div class="cart-item" style="border-bottom: none;">
                            <input type="checkbox" 
                                style="width: 20px; height: 20px; margin-right: 1rem; cursor: pointer; accent-color: var(--primary);"
                                ${item.selected !== false ? 'checked' : ''}
                                onchange="window.toggleCartItem(${item.id})"
                            >
                            <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                            <div style="flex: 1;">
                                <h3 style="font-size: 1rem;">${item.name}</h3>
                                <p class="text-muted">${formatCurrency(item.price)}</p>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem; margin-right: 2rem;">
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            </div>
                            
                            <div class="cart-item-actions" style="display: flex; align-items: center; gap: 0.5rem;">
                                <button class="btn-find-similar" onclick="window.toggleFindSimilar(${item.id})" style="display: flex; align-items: center; gap: 0.25rem;">
                                    Find Similar 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${item.showSimilar ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform 0.2s;">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                <button class="btn-delete" onclick="window.removeFromCart(${item.id})" style="color: var(--danger); border-color: var(--danger);">Delete</button>
                            </div>
                        </div>
                        <div class="similar-products-dropdown ${item.showSimilar ? 'show' : ''}">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h4 style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Similar Products</h4>
                                <button onclick="window.toggleFindSimilar(${item.id})" style="background: none; border: none; cursor: pointer;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            ${similarProducts.length > 0 ? `
                                <div class="similar-products-grid">
                                    ${similarProducts.map(p => `
                                        <div class="similar-product-card" onclick="window.viewProduct(${p.id})">
                                            <img src="${p.image}" alt="${p.name}" class="similar-product-image">
                                            <div class="similar-product-title" title="${p.name}">${p.name}</div>
                                            <div class="similar-product-price">${formatCurrency(p.price)}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : '<p class="text-muted text-center">No similar products found.</p>'}
                        </div>
                    </div>
                `;
    }).join('')}
            </div>
            <div class="cart-summary">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                    <span>Total</span>
                    <span>${formatCurrency(state.cart.reduce((acc, item) => acc + (item.selected !== false ? item.price * item.quantity : 0), 0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${state.cart.filter(i => i.selected !== false).length})
                </button>
            </div>
        </div>
        </div>
    `;
};


// ===== Page Components =====
const MyDevicesPage = () => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }

    const devices = state.devices || [];
    return `
        <div style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            ${Breadcrumbs('my-devices')}
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 2rem 0;">
                <h1 style="font-size: 2.5rem; margin: 0;">My Devices</h1>
                <button class="btn btn-primary" onclick="window.navigate('device-pair')">
                    + Pair New Device
                </button>
            </div>
            ${devices.length === 0 ? `
                <div style="text-align: center; padding: 4rem 2rem; background: var(--surface); border-radius: 12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 1rem; opacity: 0.3;">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <h2>No Devices Yet</h2>
                    <p style="color: var(--text-muted); margin: 1rem 0;">Pair your ESP32 smart car to get started</p>
                    <button class="btn btn-primary" onclick="window.navigate('device-pair')" style="margin-top: 1rem;">
                        Pair Your First Device
                    </button>
                </div>
            ` : `
                <div class="device-grid">
                    ${devices.map(device => {
        const isMasked = !state.showTokens?.[device.deviceId];
        return `
                        <div class="device-card">
                            <div class="device-status-badge ${(device.status === 'active' || state.deviceStatus[device.deviceId]?.status === 'online') ? 'online' : 'offline'}">
                                <span class="status-dot"></span>
                                ${(device.status === 'active' || state.deviceStatus[device.deviceId]?.status === 'online') ? 'Online' : device.status === 'pending' ? 'Not Configured' : 'Offline'}
                            </div>
                            
                            <div class="device-icon">
                                🚗
                            </div>
                            
                            <h3 class="device-name">${device.deviceName}</h3>
                            <p class="device-id">ID: ${device.deviceId}</p>
                            <div class="info-row" style="margin-top: 0.5rem;">
                                <span class="label" style="color: var(--text-muted); font-size: 0.85rem;">Token:</span>
                                <div class="token-display" style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,0,0,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">
                                    <span class="token-value ${isMasked ? 'masked' : ''}" style="font-family: monospace; font-size: 0.85rem;">
                                        ${isMasked ? '••••••••' : device.deviceToken}
                                    </span>
                                    <button onclick="window.toggleToken('${device.deviceId}')" style="background:none; border:none; cursor: pointer; padding: 0; display: flex; align-items: center; color: var(--text-muted);">
                                        ${isMasked ? '👁️' : '🔒'}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="device-info">
                                <div class="info-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
                                        <path d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                    ${device.lastOnline ? new Date(device.lastOnline).toLocaleDateString() : 'Never'}
                                </div>
                                <div class="info-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.5-12.5v5.793l2.646 2.647a.5.5 0 0 1-.707.707l-3-3A.5.5 0 0 1 7 8V3.5a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                    v${device.firmwareVersion || '1.0.0'}
                                </div>
                            </div>
                            
                            <div class="device-actions">
                                ${(device.status === 'active' || state.deviceStatus[device.deviceId]?.status === 'online') ? `
                                    <button class="btn btn-primary" onclick="window.startRemoteControl('${device.deviceId}')" style="width: 100%;">
                                        🎮 Control
                                    </button>
                                ` : device.status === 'pending' ? `
                                    <button class="btn btn-outline" style="width: 100%;" onclick="window.navigate('device-pair')">
                                        🔧 Awaiting Setup
                                    </button>
                                ` : `
                                    <button class="btn btn-outline" style="width: 100%;" disabled>
                                        Offline
                                    </button>
                                `}
                            </div>
                        </div>
                    `;
    }).join('')}
                </div>
            `}
        </div>
    `;
};
const DevicePairingPage = () => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }

    return `
        <div style="max-width: 600px; margin: 2rem auto; padding: 0 2rem;">
            ${Breadcrumbs('device-pair')}
            
            <div style="background: var(--surface); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
                <h1 style="font-size: 2rem; margin-bottom: 1rem;">Pair New Device</h1>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">
                    Enter your device credentials from your order confirmation email.
                </p>
                
                <form onsubmit="window.handleDevicePairing(event)" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <div class="form-group">
                        <label class="form-label">Device ID</label>
                        <input type="text" name="deviceId" class="form-input" placeholder="ESP32-XXXXXXXX" required>
                        <small style="color: var(--text-muted); font-size: 0.875rem;">From your order confirmation</small>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Device Token</label>
                        <input type="text" name="deviceToken" class="form-input" placeholder="Enter your device token" required>
                        <small style="color: var(--text-muted); font-size: 0.875rem;">Long string of random characters</small>
                    </div>
                    
                    <div style="background: #f0f4ff; padding: 1rem; border-radius: 8px; border-left: 4px solid var(--primary);">
                        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.9rem;">Setup Instructions:</h4>
                        <ol style="margin: 0; padding-left: 1.5rem; font-size: 0.875rem; line-height: 1.6;">
                            <li>Turn on your ESP32 smart car</li>
                            <li>Connect to WiFi network: <strong>"ESP32-SmartCar-Setup"</strong></li>
                            <li>Open <strong>http://192.168.4.1</strong> in your browser</li>
                            <li>Enter your WiFi details and device credentials</li>
                            <li>Once configured, pair it here</li>
                        </ol>
                    </div>
                    
                    <div style="display: flex; gap: 1rem;">
                        <button type="button" class="btn btn-outline" onclick="window.navigate('my-devices')" style="flex: 1;">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary" style="flex: 1;">
                            Pair Device
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
    `;
};

const RemoteControlPage = () => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }
    if (!state.currentDeviceId) {
        navigate('my-devices');
        return '';
    }
    const device = state.devices?.find(d => d.deviceId === state.currentDeviceId);
    if (!device) {
        navigate('my-devices');
        return '';
    }
    const statusData = state.deviceStatus[device.deviceId] || {};
    const telemetry = state.telemetryData[device.deviceId] || {};
    const isConnected = statusData.status === 'online';
    // Calculate battery ring progress
    const battery = telemetry.battery || 0;
    const batteryCircumference = 2 * Math.PI * 20; // radius = 20
    const batteryOffset = batteryCircumference - (battery / 100) * batteryCircumference;
    // Calculate signal strength (convert to 0-4 scale)
    const signalStrength = Math.min(4, Math.max(0, Math.round((telemetry.signal || 0) / 25)));
    return `
        <div style="max-width: 1200px; margin: 0 auto; padding: 1rem;">
            <div style="margin-bottom: 1rem;">
                <button class="btn btn-outline" onclick="window.stopRemoteControl()" style="padding: 0.75rem 1.5rem;">
                    ← Back to My Devices
                </button>
            </div>
            <div class="cyber-container">
                <!-- HUD Strip -->
                <div class="cyber-hud">
                    <!-- Battery Gauge -->
                    <div class="hud-group">
                        <div class="cyber-gauge">
                            <svg width="48" height="48" viewBox="0 0 48 48">
                                <circle class="gauge-bg" cx="24" cy="24" r="20" stroke-dasharray="${batteryCircumference}" stroke-dashoffset="0"></circle>
                                <circle class="gauge-fill" cx="24" cy="24" r="20" stroke-dasharray="${batteryCircumference}" stroke-dashoffset="${batteryOffset}"></circle>
                            </svg>
                            <div class="gauge-text">${battery}%</div>
                        </div>
                        <div class="info">
                            <div class="label">Battery</div>
                            <div class="value">${battery >= 70 ? 'Good' : battery >= 30 ? 'Low' : 'Critical'}</div>
                        </div>
                    </div>
                    <!-- Signal Strength -->
                    <div class="hud-group">
                        <div class="icon-box">
                            <div class="signal-bars">
                                <div class="bar ${signalStrength >= 1 ? 'active' : ''}"></div>
                                <div class="bar ${signalStrength >= 2 ? 'active' : ''}"></div>
                                <div class="bar ${signalStrength >= 3 ? 'active' : ''}"></div>
                                <div class="bar ${signalStrength >= 4 ? 'active' : ''}"></div>
                            </div>
                        </div>
                        <div class="info">
                            <div class="label">Signal</div>
                            <div class="value">${telemetry.signal || 0}%</div>
                        </div>
                    </div>
                    <!-- Movement Status -->
                    <div class="hud-group">
                        <div class="icon-box">⚡</div>
                        <div class="info">
                            <div class="label">Status</div>
                            <div class="value">${telemetry.isMoving ? 'Moving' : 'Idle'}</div>
                        </div>
                    </div>
                    <!-- Connection Status -->
                    <div class="hud-group">
                        <div class="icon-box">${isConnected ? '🟢' : '🔴'}</div>
                        <div class="info">
                            <div class="label">Connection</div>
                            <div class="value">${isConnected ? 'Online' : 'Offline'}</div>
                        </div>
                    </div>
                </div>
                <!-- Obstacle Alert (only show if detected) -->
                ${telemetry.frontSensor ? `
                    <div class="obstacle-alert">
                        ⚠️ OBSTACLE DETECTED AHEAD
                    </div>
                ` : ''}
                <!-- Control Deck (D-Pad) -->
                <div class="control-deck">
                    <div class="d-pad-grid">
                        <button class="d-pad-btn" data-dir="forward"
                            onmousedown="window.sendCarCommand('forward'); this.classList.add('active')"
                            onmouseup="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ontouchstart="window.sendCarCommand('forward'); this.classList.add('active')"
                            ontouchend="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ${!isConnected ? 'disabled' : ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="19" x2="12" y2="5"></line>
                                <polyline points="5 12 12 5 19 12"></polyline>
                            </svg>
                            <span>FWD</span>
                        </button>
                        
                        <button class="d-pad-btn" data-dir="left"
                            onmousedown="window.sendCarCommand('left'); this.classList.add('active')"
                            onmouseup="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ontouchstart="window.sendCarCommand('left'); this.classList.add('active')"
                            ontouchend="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ${!isConnected ? 'disabled' : ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            <span>LEFT</span>
                        </button>
                        
                        <button class="d-pad-btn stop" data-dir="stop"
                            onclick="window.sendCarCommand('stop')"
                            ${!isConnected ? 'disabled' : ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="6" width="12" height="12"></rect>
                            </svg>
                            <span>STOP</span>
                        </button>
                        
                        <button class="d-pad-btn" data-dir="right"
                            onmousedown="window.sendCarCommand('right'); this.classList.add('active')"
                            onmouseup="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ontouchstart="window.sendCarCommand('right'); this.classList.add('active')"
                            ontouchend="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ${!isConnected ? 'disabled' : ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                            <span>RIGHT</span>
                        </button>
                        
                        <button class="d-pad-btn" data-dir="backward"
                            onmousedown="window.sendCarCommand('backward'); this.classList.add('active')"
                            onmouseup="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ontouchstart="window.sendCarCommand('backward'); this.classList.add('active')"
                            ontouchend="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ${!isConnected ? 'disabled' : ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                            </svg>
                            <span>BWD</span>
                        </button>
                    </div>
                </div>
                <!-- Action Bar -->
                <div class="action-bar">
                    <!-- Speed Control -->
                    <div class="speed-control">
                        <div class="label-row">
                            <span>Speed</span>
                            <span id="speedValue">50%</span>
                        </div>
                        <input type="range" min="0" max="100" value="50" class="cyber-slider" id="speedSlider"
                            oninput="document.getElementById('speedValue').textContent = this.value + '%'">
                    </div>
                    <!-- Auxiliary Controls -->
                    <div class="aux-controls">
                        <button class="cyber-toggle-btn" id="lightsToggle" onclick="window.toggleLights()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                            <span>Lights</span>
                        </button>
                        <button class="cyber-toggle-btn" id="hornToggle" onclick="window.toggleHorn()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                            </svg>
                            <span>Horn</span>
                        </button>
                    </div>
                </div>
            </div>
            <p style="text-align: center; color: var(--cyber-text-muted); margin-top: 1rem; font-size: 0.875rem;">
                Use WASD or Arrow Keys to control
            </p>
        </div>
    `;
};
const CheckoutPage = () => {
    if (!state.currentUser) {
        navigate('login');
        return '';
    }

    const selectedItems = state.cart.filter(item => item.selected !== false);
    if (selectedItems.length === 0) {
        showToast('No items selected for checkout');
        navigate('cart');
        return '';
    }

    const subtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingFee = state.checkoutData.shippingFee;
    const total = subtotal + shippingFee;

    return `
        <div class="checkout-container" style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            <div style="margin-bottom: 2rem;">
                <button class="btn btn-outline" onclick="window.navigate('cart')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                    ← Back to Cart
                </button>
                <h1 style="font-size: 2.5rem; margin-top: 1rem;">Checkout</h1>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 380px; gap: 3rem;">
                <div class="checkout-form">
                    <div class="admin-section" style="margin-bottom: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">📍 Shipping Information</h2>
                        <form onsubmit="event.preventDefault();" style="display: grid; gap: 1.5rem;">
                            <div>
                                <label class="form-label">Full Name <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${state.checkoutData.shipping.fullName || (state.currentUser ? state.currentUser.name : '')}"
                                    oninput="window.handleNameInput(this)"
                                    placeholder="e.g. Juan Dela Cruz">
                            </div>

                            <div>
                                <label class="form-label">Phone Number <span style="color: red;">*</span></label>
                                <input type="tel" class="form-input" 
                                    value="${state.checkoutData.shipping.phone}"
                                    oninput="window.handlePhoneInput(this)"
                                    maxlength="11"
                                    placeholder="09123456789">
                            </div>

                            <div>
                                <label class="form-label">Address <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${state.checkoutData.shipping.address}"
                                    onchange="window.updateShippingInfo('address', this.value)"
                                    placeholder="House/Unit No., Street Name, Barangay">
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label class="form-label">City <span style="color: red;">*</span></label>
                                    <input type="text" class="form-input" 
                                        value="${state.checkoutData.shipping.city}"
                                        oninput="window.handleLocationInput(this, 'city')"
                                        placeholder="e.g. Makati">
                                </div>
                                <div>
                                    <label class="form-label">Province <span style="color: red;">*</span></label>
                                    <input type="text" class="form-input" 
                                        value="${state.checkoutData.shipping.province}"
                                        oninput="window.handleLocationInput(this, 'province')"
                                        placeholder="e.g. Metro Manila">
                                </div>
                            </div>

                            <div>
                                <label class="form-label">Postal Code <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${state.checkoutData.shipping.postalCode}"
                                    oninput="window.handlePostalInput(this)"
                                    maxlength="4"
                                    placeholder="e.g. 1200">
                            </div>

                            <div>
                                <label class="form-label">Delivery Instructions (Optional)</label>
                                <textarea class="form-input" 
                                    onchange="window.updateShippingInfo('instructions', this.value)"
                                    rows="3"
                                    placeholder="Floor number, landmark, etc.">${state.checkoutData.shipping.instructions || ''}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="admin-section">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">💳 Payment Method <span style="color: red;">*</span></h2>
                        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem;">
                            ${[
            { id: 'cod', label: 'Cash on Delivery', image: '/lumina/images/payment/cod.png' },
            { id: 'gcash', label: 'GCash', image: '/lumina/images/payment/gcash.png' },
            { id: 'maya', label: 'Maya', image: '/lumina/images/payment/maya.png' },
            { id: 'card', label: 'Credit/Debit Card', image: '/lumina/images/payment/card.png' },
            { id: 'bank', label: 'Bank Transfer', image: '/lumina/images/payment/bank.png' }
        ].map(method => `
                                <div class="payment-method-card" onclick="window.selectPaymentMethod('${method.id}')" style="padding: 0.75rem; border: 2px solid ${state.checkoutData.paymentMethod === method.id ? 'var(--primary)' : 'var(--border)'}; border-radius: var(--radius-md); cursor: pointer; text-align: center; transition: all 0.2s; background: ${state.checkoutData.paymentMethod === method.id ? 'rgba(0, 43, 91, 0.05)' : 'var(--surface)'};">
                                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                                        <img src="${method.image}" alt="${method.label}" style="max-width: 100%; max-height: 48px; object-fit: contain;">
                                    </div>
                                    <div style="font-size: 0.75rem; font-weight: 600; line-height: 1.2;">${method.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="cart-summary" style="position: sticky; top: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Order Summary</h2>
                        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem;">
                            ${selectedItems.map(item => `
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${item.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-muted);">Qty: ${item.quantity}</div>
                                    </div>
                                    <div style="font-weight: 700; color: var(--primary);">${formatCurrency(item.price * item.quantity)}</div>
                                </div>
                            `).join('')}
                        </div>
                        <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Subtotal</span>
                                <span>${formatCurrency(subtotal)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Shipping Fee</span>
                                <span>${formatCurrency(shippingFee)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                                <span>Total</span>
                                <span style="color: var(--primary);">${formatCurrency(total)}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="window.placeOrder()" style="width: 100%; padding: 1rem; font-size: 1rem;">Place Order</button>
                        <div style="margin-top: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);">🔒 Your payment information is secure</div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const OrderConfirmationPage = () => {
    if (!state.lastOrderId) {
        navigate('home');
        return '';
    }

    const order = state.orders.find(o => o.orderId === state.lastOrderId);
    if (!order) {
        navigate('home');
        return '';
    }

    const today = new Date();
    const minDelivery = new Date(today);
    minDelivery.setDate(today.getDate() + 3);
    const maxDelivery = new Date(today);
    maxDelivery.setDate(today.getDate() + 5);

    const deliveryRange = `${minDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${maxDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} `;

    return `
        <div style="max-width: 800px; margin: 4rem auto; padding: 0 2rem;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #10B981, #059669); border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 3rem;">✓</div>
                <h1 style="color: var(--success); margin-bottom: 0.5rem;">Order Placed Successfully!</h1>
                <p style="font-size: 1.125rem; color: var(--text-muted);">Thank you for your purchase</p>
            </div>

            <div class="admin-section" style="margin-bottom: 2rem;">
                <div style="background: var(--surface-alt); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                        <div>
                            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">Order Number</div>
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">#${order.orderId}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">Order Date</div>
                            <div style="font-weight: 600;">${new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">1</div>
                        <div style="font-weight: 600;">Estimated Delivery</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">${deliveryRange}</div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">2</div>
                        <div style="font-weight: 600;">Payment Status</div>
                    </div>
                    <div style="padding-left: 2rem;">
                        <span class="badge badge-${state.checkoutData.paymentMethod === 'cod' ? 'warning' : 'success'}" style="font-size: 0.875rem; padding: 0.375rem 0.75rem;">
                            ${state.checkoutData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Payment Confirmed'}
                        </span>
                    </div>
                </div>

                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">3</div>
                        <div style="font-weight: 600;">Shipping Address</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">
                        ${state.checkoutData.shipping.fullName}<br>
                        ${state.checkoutData.shipping.address}<br>
                        ${state.checkoutData.shipping.city}, ${state.checkoutData.shipping.province} ${state.checkoutData.shipping.postalCode}<br>
                        ${state.checkoutData.shipping.phone}
                    </div>
                </div>
            </div>

            ${order.devices && order.devices.length > 0 ? `
                <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="font-size: 2rem;">🚗</div>
                        <div>
                            <h3 style="margin: 0; color: #0369a1;">ESP32 Smart Car Credentials</h3>
                            <p style="margin: 0; color: #0c4a6e; font-size: 0.9rem;">Use these details to configure your device</p>
                        </div>
                    </div>

                    ${order.devices.map((device, index) => `
                        <div style="background: white; padding: 1rem; border-radius: 8px; border: 1px solid #e0f2fe; margin-bottom: ${index < order.devices.length - 1 ? '1rem' : '0'};">
                            <h4 style="margin: 0 0 0.5rem 0; color: #0284c7;">${device.productName}</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Device ID</div>
                                    <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #334155; background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block;">${device.deviceId}</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Device Token</div>
                                    <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #334155; background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block;">${device.deviceToken}</div>
                                </div>
                            </div>
                            <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #0c4a6e;">
                                <strong>Setup:</strong> Connect to "ESP32-SmartCar-Setup" WiFi and enter these credentials.
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            <div class="admin-section" style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Order Items</h3>
                ${order.items.map(item => `
                    <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${item.productName || item.name}</div>
                            <div style="font-size: 0.875rem; color: var(--text-muted);">Quantity: ${item.quantity}</div>
                        </div>
                        <div style="font-weight: 700; color: var(--primary);">${formatCurrency(item.price * item.quantity)}</div>
                    </div>
                `).join('')}
                <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                    <span>Total Amount</span>
                    <span style="color: var(--primary);">${formatCurrency(order.total)}</span>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="window.printReceipt()" style="padding: 0.875rem 2rem;">🖨️ Print Receipt</button>
                <button class="btn btn-outline" onclick="window.navigate('home')" style="padding: 0.875rem 2rem;">🏠 Back to Shop</button>
            </div>

            <div style="text-align: center; margin-top: 3rem; padding: 1.5rem; background: var(--surface-alt); border-radius: var(--radius-md);">
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">An email confirmation has been sent to <strong>${state.currentUser.email}</strong></p>
                <p style="font-size: 0.875rem; color: var(--text-muted);">Questions? Contact us at support@luminaelectronics.com</p>
            </div>
        </div>
    `;
};


// Helper function for tutorial navigation
window.navigateToTutorial = (tutorialId) => {
    navigate('tutorial-detail', { id: tutorialId });
};

// Helper for Learn Filter
window.filterLearningContent = (category) => {
    state.filterLearnCategory = category;
    render();
};

// Helper function for tutorial navigation
window.navigateToTutorial = (tutorialId) => {
    navigate('tutorial-detail', { id: tutorialId });
};

// --- Admin Helpers ---
window.updateOrderStatus = (orderId, newStatus) => {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveState();
        showToast(`Order #${orderId} updated to ${newStatus}`);
        render(); // Re-render to reflect changes
    }
};

window.toggleSelectAll = (source) => {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
};

window.bulkAction = (action) => {
    const checkboxes = document.querySelectorAll('.product-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.value));

    if (selectedIds.length === 0) {
        showToast('No products selected');
        return;
    }

    if (action === 'delete') {
        if (confirm(`Delete ${selectedIds.length} products?`)) {
            state.products = state.products.filter(p => !selectedIds.includes(p.id));
            saveState();
            render();
            showToast('Products deleted');
        }
    } else if (action === 'restock') {
        state.products.forEach(p => {
            if (selectedIds.includes(p.id)) {
                p.stock += 10; // Mock restock
            }
        });
        saveState();
        render();
        showToast('Products restocked');
    }
};

window.viewOrderDetails = (orderId) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const customer = state.users.find(u => u.id === order.userId);

    const modalHTML = `
        <div class="modal-overlay show" id="orderModal" onclick="if(event.target === this) window.closeModal()">
            <div class="modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Order #${order.id}</h3>
                    <button class="btn-icon" onclick="window.closeModal()">✕</button>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Customer:</strong> ${customer ? customer.name : 'Unknown'}</p>
                    <p><strong>Date:</strong> ${order.date}</p>
                    <p><strong>Status:</strong> <span class="badge badge-${order.status === 'Delivered' ? 'success' : 'warning'}">${order.status}</span></p>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--border); text-align: left;">
                            <th style="padding: 0.5rem;">Item</th>
                            <th style="padding: 0.5rem;">Qty</th>
                            <th style="padding: 0.5rem;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 0.5rem;">${item.name}</td>
                                <td style="padding: 0.5rem;">${item.quantity}</td>
                                <td style="padding: 0.5rem;">${formatCurrency(item.price)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${formatCurrency(order.total)}
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

window.closeModal = () => {
    const modal = document.getElementById('orderModal');
    if (modal) modal.remove();
};

const ProductModal = (productId = null) => {
    const product = productId ? state.products.find(p => p.id === productId) : null;
    const isEdit = !!product;

    return `
        <div class="modal-overlay show" id="productModal" onclick="if(event.target === this) window.closeProductModal()">
            <div class="modal-content" style="max-width: 600px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>${isEdit ? 'Edit Product' : 'Add New Product'}</h3>
                    <button class="btn-icon" onclick="window.closeProductModal()">✕</button>
                </div>
                
                <form id="productForm" onsubmit="window.handleProductSubmit(event, ${productId || 'null'})" enctype="multipart/form-data">
                    <div class="form-group">
                        <label class="form-label">Product Name *</label>
                        <input type="text" name="name" class="form-input" value="${product?.name || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Category *</label>
                        <input type="text" name="category" class="form-input" value="${product?.category || ''}" required>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label class="form-label">Price (₱) *</label>
                            <input type="number" name="price" class="form-input" value="${product?.price || ''}" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Stock *</label>
                            <input type="number" name="stock" class="form-input" value="${product?.stock || ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Description *</label>
                        <textarea name="description" class="form-input" rows="3" required>${product?.description || ''}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Image</label>
                        <input type="file" name="image" class="form-input" accept="image/*">
                        ${product?.image ? `<div style="margin-top: 0.5rem;">Current: <img src="${product.image}" style="max-width: 100px;"></div>` : ''}
                    </div>
                    
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <button type="button" class="btn btn-outline" style="flex: 1;" onclick="window.closeProductModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary" style="flex: 1;">${isEdit ? 'Update' : 'Create'} Product</button>
                    </div>
                </form>
            </div>
        </div>
    `;
};


// --- Actions ---

window.navigate = navigate;

window.toggleMobileMenu = () => {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    render();
};

window.showProductModal = (productId = null) => {
    document.body.insertAdjacentHTML('beforeend', ProductModal(productId));
};
window.closeProductModal = () => {
    document.getElementById('productModal')?.remove();
};
window.editProduct = (id) => {
    window.showProductModal(id);
};
window.deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;

    try {
        await apiCall(`/products/${id}`, { method: 'DELETE' });
        await api.getProducts(); // Refresh products
        showToast('Product deleted');
    } catch (error) {
        showToast('Delete failed');
    }
};
window.handleProductSubmit = async (event, productId) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
        const method = productId ? 'PUT' : 'POST';
        const url = productId ? `/products/${productId}` : `/products`;

        const response = await fetch(`${API_BASE_URL}${url}`, {
            method,
            body: formData // Send as FormData for file upload
        });

        if (!response.ok) throw new Error('Failed');

        await api.getProducts(); // Refresh
        window.closeProductModal();
        showToast(productId ? 'Product updated!' : 'Product created!');
    } catch (error) {
        showToast('Operation failed');
    }
};

window.handleSort = (sortValue) => {
    state.sortBy = sortValue;
    render();
};

window.viewProduct = (productId) => {
    state.currentProductId = productId;
    navigate('product-detail');
};

window.adjustDetailQty = (change) => {
    const qtyInput = document.getElementById('detailQty');
    let newQty = parseInt(qtyInput.value) + change;
    if (newQty < 1) newQty = 1;
    // Check max stock if needed, though simple logic is fine
    qtyInput.value = newQty;
};

window.addToCartFromDetail = (productId) => {
    const qty = parseInt(document.getElementById('detailQty').value);
    if (!state.currentUser) {
        showToast('Please login to shop');
        navigate('login');
        return;
    }

    const product = state.products.find(p => p.id === productId);
    const existingItem = state.cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        state.cart.push({ ...product, quantity: qty, selected: true });
    }

    saveState();
    showToast(`Added ${qty} item(s) to cart`);
    // Optional: navigate to cart or stay on page
};

window.addToCart = async (productId) => {
    if (!state.currentUser) {
        window.showToast('Please login to shop');
        window.navigate('login');
        return;
    }
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = state.cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ ...product, quantity: 1, selected: true });
    }
    // Save state locally
    saveState();

    // Update Header Cart Count
    render();

    // Show Feedback Toast
    window.showToast(`Added ${product.name} to cart! 🛒`);
    // Sync to server!
    if (state.currentUser) {
        try {
            await apiCall(`/users/${state.currentUser.id}/cart`, {
                method: 'PUT',
                body: JSON.stringify({
                    cart: state.cart.map(item => ({
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: item.quantity,
                        category: item.category,
                        selected: item.selected !== false
                    }))
                })
            });
        } catch (error) {
            console.error('Failed to sync cart:', error);
        }
    }
};

window.updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
        window.removeFromCart(productId);
        return;
    }
    const item = state.cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveState();
        render();
    }
};

window.removeFromCart = (productId) => {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveState();
    render();
};

window.checkout = async () => {
    if (state.cart.length === 0) return;
    if (!state.currentUser) {
        showToast('Please login to checkout');
        navigate('login');
        return;
    }

    const selectedItems = state.cart.filter(item => item.selected !== false);
    if (selectedItems.length === 0) {
        showToast('No items selected for checkout');
        return;
    }

    // Navigate to checkout page instead of immediately placing order
    navigate('checkout');
};

// Checkout helper functions
window.updateShippingInfo = (field, value) => {
    state.checkoutData.shipping[field] = value;
};

window.selectPaymentMethod = (method) => {
    state.checkoutData.paymentMethod = method;
    render();
};

window.handlePhoneInput = (input) => {
    // Only allow numbers
    const numbersOnly = input.value.replace(/[^0-9]/g, '');
    input.value = numbersOnly;
    state.checkoutData.shipping.phone = numbersOnly;
};

window.handleNameInput = (input) => {
    // Only allow letters and spaces
    const lettersOnly = input.value.replace(/[^a-zA-Z\s]/g, '');
    input.value = lettersOnly;
    state.checkoutData.shipping.fullName = lettersOnly;
};

window.handleLocationInput = (input, field) => {
    // Only allow letters and spaces for City/Province
    const lettersOnly = input.value.replace(/[^a-zA-Z\s]/g, '');
    input.value = lettersOnly;
    state.checkoutData.shipping[field] = lettersOnly;
};

window.handlePostalInput = (input) => {
    // Only allow numbers
    const numbersOnly = input.value.replace(/[^0-9]/g, '');
    input.value = numbersOnly;
    state.checkoutData.shipping.postalCode = numbersOnly;
};

// Payment Modal Function
window.showPaymentModal = (totalAmount) => {
    return new Promise((resolve) => {
        let currentAmount = '';

        // Create modal HTML
        const modalHTML = `
            <div class="payment-modal-overlay" id="paymentModalOverlay">
                <div class="payment-modal">
                    <div class="payment-modal-header">
                        <h2>💳 Cash on Delivery Payment</h2>
                        <p>Please enter the amount you have</p>
                    </div>
                    
                    <div class="payment-modal-body">
                        <div class="payment-summary">
                            <div class="payment-summary-row">
                                <span>Total Amount:</span>
                                <span style="font-weight: 700;">${formatCurrency(totalAmount)}</span>
                            </div>
                            <div class="payment-summary-row total">
                                <span>To Pay:</span>
                                <span>${formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                        
                        <div class="payment-input-group">
                            <label>Enter Amount</label>
                            <input 
                                type="text" 
                                id="paymentAmountInput" 
                                class="payment-input" 
                                placeholder="₱ 0.00"
                                inputmode="decimal"
                            >
                            <div class="payment-error" id="paymentError"></div>
                        </div>
                        
                        <div class="quick-amount-buttons">
                            <button class="quick-amount-btn" data-amount="${totalAmount}">Exact</button>
                            <button class="quick-amount-btn" data-amount="${totalAmount + 50}">+₱50</button>
                            <button class="quick-amount-btn" data-amount="${totalAmount + 100}">+₱100</button>
                            <button class="quick-amount-btn" data-amount="${Math.ceil(totalAmount / 100) * 100}">Round</button>
                            <button class="quick-amount-btn" data-amount="${totalAmount + 500}">+₱500</button>
                            <button class="quick-amount-btn" data-amount="${totalAmount + 1000}">+₱1000</button>
                        </div>
                        
                        <div class="payment-change-display" id="paymentChangeDisplay">
                            <div class="change-label">Your Change</div>
                            <div class="change-amount" id="changeAmount">₱ 0.00</div>
                        </div>
                    </div>
                    
                    <div class="payment-modal-footer">
                        <button class="btn-cancel" id="paymentCancelBtn">Cancel</button>
                        <button class="btn-confirm" id="paymentConfirmBtn" disabled>Confirm Payment</button>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const overlay = document.getElementById('paymentModalOverlay');
        const input = document.getElementById('paymentAmountInput');
        const errorDiv = document.getElementById('paymentError');
        const changeDisplay = document.getElementById('paymentChangeDisplay');
        const changeAmount = document.getElementById('changeAmount');
        const confirmBtn = document.getElementById('paymentConfirmBtn');
        const cancelBtn = document.getElementById('paymentCancelBtn');

        // Focus input
        setTimeout(() => input.focus(), 100);

        // Handle input
        input.addEventListener('input', (e) => {
            // Only allow numbers and decimal point
            let value = e.target.value.replace(/[^0-9.]/g, '');

            // Ensure only one decimal point
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }

            e.target.value = value;
            currentAmount = value;

            // Validate
            const amount = parseFloat(value);

            if (!value || isNaN(amount) || amount < 0) {
                errorDiv.textContent = '';
                errorDiv.classList.remove('show');
                input.classList.remove('error');
                confirmBtn.disabled = true;
                changeDisplay.classList.remove('show');
                return;
            }

            if (amount < totalAmount) {
                const shortfall = totalAmount - amount;
                errorDiv.textContent = `Insufficient! Need ${formatCurrency(shortfall)} more`;
                errorDiv.classList.add('show');
                input.classList.add('error');
                confirmBtn.disabled = true;
                changeDisplay.classList.remove('show');
            } else {
                const change = amount - totalAmount;
                errorDiv.classList.remove('show');
                input.classList.remove('error');
                confirmBtn.disabled = false;
                changeDisplay.classList.add('show');
                changeAmount.textContent = formatCurrency(change);
            }
        });

        // Quick amount buttons
        document.querySelectorAll('.quick-amount-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const amount = btn.getAttribute('data-amount');
                input.value = amount;
                input.dispatchEvent(new Event('input'));
            });
        });

        // Cancel button
        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(null);
        });

        // Click overlay to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        });

        // Confirm button
        confirmBtn.addEventListener('click', () => {
            const amount = parseFloat(currentAmount);
            if (amount >= totalAmount) {
                overlay.remove();
                resolve({
                    amountPaid: amount,
                    change: amount - totalAmount
                });
            }
        });

        // Enter key to confirm
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !confirmBtn.disabled) {
                confirmBtn.click();
            }
        });

        // Escape key to cancel
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                resolve(null);
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
};

// GCash Payment Modal
window.showGCashModal = (totalAmount) => {
    return new Promise((resolve) => {
        const demoRef = 'GCASH-' + Date.now().toString().slice(-8);

        const modalHTML = `
            <div class="payment-modal-overlay" id="paymentModalOverlay">
                <div class="payment-modal">
                    <div class="demo-badge">DEMO MODE</div>
                    <div class="payment-modal-header">
                        <h2>📱 GCash Payment</h2>
                        <p>Scan QR or send to GCash number</p>
                    </div>
                    
                    <div class="payment-modal-body">
                        <div class="payment-summary">
                            <div class="payment-summary-row total">
                                <span>Amount to Pay:</span>
                                <span>${formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                        
                        <div class="qr-code-container">
                            <div class="qr-code-placeholder">📱</div>
                            <div class="qr-code-label">Demo QR Code - GCash</div>
                        </div>
                        
                        <div class="account-details">
                            <div class="account-detail-row">
                                <span class="label">GCash Number:</span>
                                <span class="value">0917-123-4567</span>
                            </div>
                            <div class="account-detail-row">
                                <span class="label">Account Name:</span>
                                <span class="value">LUMINA ELECTRONICS</span>
                            </div>
                        </div>
                        
                        <div class="payment-input-group">
                            <label>Reference Number (Auto-filled)</label>
                            <input 
                                type="text" 
                                id="gcashRefInput" 
                                class="payment-input auto-filled" 
                                value="${demoRef}"
                                readonly
                            >
                        </div>
                        
                        <div class="demo-notice">
                            <div class="demo-notice-icon">ℹ️</div>
                            <div class="demo-notice-text">
                                <strong>Demo Mode:</strong> This is a simulation. No real payment will be processed.
                            </div>
                        </div>
                    </div>
                    
                    <div class="payment-modal-footer">
                        <button class="btn-cancel" id="paymentCancelBtn">Cancel</button>
                        <button class="btn-confirm" id="paymentConfirmBtn">Simulate Payment</button>
                    </div>
                    
                    <div class="processing-overlay" id="processingOverlay">
                        <div class="processing-spinner"></div>
                        <div class="processing-text">Processing payment...</div>
                    </div>
                    
                    <div class="success-overlay" id="successOverlay">
                        <div class="success-checkmark">✓</div>
                        <div class="success-text">Payment Successful!</div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const overlay = document.getElementById('paymentModalOverlay');
        const confirmBtn = document.getElementById('paymentConfirmBtn');
        const cancelBtn = document.getElementById('paymentCancelBtn');
        const processingOverlay = document.getElementById('processingOverlay');
        const successOverlay = document.getElementById('successOverlay');

        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(null);
        });

        confirmBtn.addEventListener('click', () => {
            processingOverlay.classList.add('show');

            setTimeout(() => {
                processingOverlay.classList.remove('show');
                successOverlay.classList.add('show');

                setTimeout(() => {
                    overlay.remove();
                    resolve({ method: 'gcash', reference: demoRef });
                }, 1000);
            }, 1500);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        });
    });
};

// Maya Payment Modal
window.showMayaModal = (totalAmount) => {
    return new Promise((resolve) => {
        const demoRef = 'MAYA-' + Date.now().toString().slice(-8);

        const modalHTML = `
            <div class="payment-modal-overlay" id="paymentModalOverlay">
                <div class="payment-modal">
                    <div class="demo-badge">DEMO MODE</div>
                    <div class="payment-modal-header">
                        <h2>💸 Maya Payment</h2>
                        <p>Scan QR or send to Maya account</p>
                    </div>
                    
                    <div class="payment-modal-body">
                        <div class="payment-summary">
                            <div class="payment-summary-row total">
                                <span>Amount to Pay:</span>
                                <span>${formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                        
                        <div class="qr-code-container">
                            <div class="qr-code-placeholder">💸</div>
                            <div class="qr-code-label">Demo QR Code - Maya</div>
                        </div>
                        
                        <div class="account-details">
                            <div class="account-detail-row">
                                <span class="label">Maya Number:</span>
                                <span class="value">0919-987-6543</span>
                            </div>
                            <div class="account-detail-row">
                                <span class="label">Account Name:</span>
                                <span class="value">LUMINA ELECTRONICS</span>
                            </div>
                        </div>
                        
                        <div class="payment-input-group">
                            <label>Reference Number (Auto-filled)</label>
                            <input 
                                type="text" 
                                id="mayaRefInput" 
                                class="payment-input auto-filled" 
                                value="${demoRef}"
                                readonly
                            >
                        </div>
                        
                        <div class="demo-notice">
                            <div class="demo-notice-icon">ℹ️</div>
                            <div class="demo-notice-text">
                                <strong>Demo Mode:</strong> This is a simulation. No real payment will be processed.
                            </div>
                        </div>
                    </div>
                    
                    <div class="payment-modal-footer">
                        <button class="btn-cancel" id="paymentCancelBtn">Cancel</button>
                        <button class="btn-confirm" id="paymentConfirmBtn">Simulate Payment</button>
                    </div>
                    
                    <div class="processing-overlay" id="processingOverlay">
                        <div class="processing-spinner"></div>
                        <div class="processing-text">Processing payment...</div>
                    </div>
                    
                    <div class="success-overlay" id="successOverlay">
                        <div class="success-checkmark">✓</div>
                        <div class="success-text">Payment Successful!</div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const overlay = document.getElementById('paymentModalOverlay');
        const confirmBtn = document.getElementById('paymentConfirmBtn');
        const cancelBtn = document.getElementById('paymentCancelBtn');
        const processingOverlay = document.getElementById('processingOverlay');
        const successOverlay = document.getElementById('successOverlay');

        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(null);
        });

        confirmBtn.addEventListener('click', () => {
            processingOverlay.classList.add('show');

            setTimeout(() => {
                processingOverlay.classList.remove('show');
                successOverlay.classList.add('show');

                setTimeout(() => {
                    overlay.remove();
                    resolve({ method: 'maya', reference: demoRef });
                }, 1000);
            }, 1500);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        });
    });
};

// Credit Card Payment Modal
window.showCardModal = (totalAmount) => {
    return new Promise((resolve) => {
        const demoCardNumber = '4111 1111 1111 1111';
        const demoExpiry = '12/25';
        const demoCVV = '123';
        const demoName = 'JOHN DOE';

        const modalHTML = `
            <div class="payment-modal-overlay" id="paymentModalOverlay">
                <div class="payment-modal">
                    <div class="demo-badge">DEMO MODE</div>
                    <div class="payment-modal-header">
                        <h2>💳 Credit/Debit Card</h2>
                        <p>Enter card details</p>
                    </div>
                    
                    <div class="payment-modal-body">
                        <div class="payment-summary">
                            <div class="payment-summary-row total">
                                <span>Amount to Charge:</span>
                                <span>${formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                        
                        <div class="card-form">
                            <div class="payment-input-group">
                                <label>Card Number</label>
                                <input 
                                    type="text" 
                                    class="payment-input card-number-input auto-filled" 
                                    value="${demoCardNumber}"
                                    readonly
                                >
                            </div>
                            
                            <div class="card-form-row">
                                <div class="payment-input-group">
                                    <label>Expiry Date</label>
                                    <input 
                                        type="text" 
                                        class="payment-input auto-filled" 
                                        value="${demoExpiry}"
                                        readonly
                                    >
                                </div>
                                <div class="payment-input-group">
                                    <label>CVV</label>
                                    <input 
                                        type="text" 
                                        class="payment-input auto-filled" 
                                        value="${demoCVV}"
                                        readonly
                                    >
                                </div>
                            </div>
                            
                            <div class="payment-input-group">
                                <label>Cardholder Name</label>
                                <input 
                                    type="text" 
                                    class="payment-input auto-filled" 
                                    value="${demoName}"
                                    readonly
                                >
                            </div>
                        </div>
                        
                        <div class="demo-notice">
                            <div class="demo-notice-icon">ℹ️</div>
                            <div class="demo-notice-text">
                                <strong>Demo Mode:</strong> Using test card 4111 1111 1111 1111. No real card will be charged.
                            </div>
                        </div>
                    </div>
                    
                    <div class="payment-modal-footer">
                        <button class="btn-cancel" id="paymentCancelBtn">Cancel</button>
                        <button class="btn-confirm" id="paymentConfirmBtn">Process Payment</button>
                    </div>
                    
                    <div class="processing-overlay" id="processingOverlay">
                        <div class="processing-spinner"></div>
                        <div class="processing-text">Processing card payment...</div>
                    </div>
                    
                    <div class="success-overlay" id="successOverlay">
                        <div class="success-checkmark">✓</div>
                        <div class="success-text">Payment Approved!</div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const overlay = document.getElementById('paymentModalOverlay');
        const confirmBtn = document.getElementById('paymentConfirmBtn');
        const cancelBtn = document.getElementById('paymentCancelBtn');
        const processingOverlay = document.getElementById('processingOverlay');
        const successOverlay = document.getElementById('successOverlay');

        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(null);
        });

        confirmBtn.addEventListener('click', () => {
            processingOverlay.classList.add('show');

            setTimeout(() => {
                processingOverlay.classList.remove('show');
                successOverlay.classList.add('show');

                setTimeout(() => {
                    overlay.remove();
                    resolve({ method: 'card', last4: '1111' });
                }, 1000);
            }, 2000);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        });
    });
};

// Bank Transfer Modal
window.showBankModal = (totalAmount) => {
    return new Promise((resolve) => {
        const demoRef = 'BDO-' + Date.now().toString().slice(-8);

        const modalHTML = `
            <div class="payment-modal-overlay" id="paymentModalOverlay">
                <div class="payment-modal">
                    <div class="demo-badge">DEMO MODE</div>
                    <div class="payment-modal-header">
                        <h2>🏦 Bank Transfer</h2>
                        <p>Transfer to our bank account</p>
                    </div>
                    
                    <div class="payment-modal-body">
                        <div class="payment-summary">
                            <div class="payment-summary-row total">
                                <span>Amount to Transfer:</span>
                                <span>${formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                        
                        <div class="account-details">
                            <div class="account-detail-row">
                                <span class="label">Bank Name:</span>
                                <span class="value">BDO Unibank</span>
                            </div>
                            <div class="account-detail-row">
                                <span class="label">Account Number:</span>
                                <span class="value">1234-5678-9012</span>
                            </div>
                            <div class="account-detail-row">
                                <span class="label">Account Name:</span>
                                <span class="value">LUMINA ELECTRONICS</span>
                            </div>
                            <div class="account-detail-row">
                                <span class="label">Branch:</span>
                                <span class="value">Makati City</span>
                            </div>
                        </div>
                        
                        <div class="payment-input-group">
                            <label>Reference Number (Auto-filled)</label>
                            <input 
                                type="text" 
                                id="bankRefInput" 
                                class="payment-input auto-filled" 
                                value="${demoRef}"
                                readonly
                            >
                        </div>
                        
                        <div class="demo-notice">
                            <div class="demo-notice-icon">ℹ️</div>
                            <div class="demo-notice-text">
                                <strong>Demo Mode:</strong> Demo bank details. No real transfer will occur.
                            </div>
                        </div>
                    </div>
                    
                    <div class="payment-modal-footer">
                        <button class="btn-cancel" id="paymentCancelBtn">Cancel</button>
                        <button class="btn-confirm" id="paymentConfirmBtn">Simulate Transfer</button>
                    </div>
                    
                    <div class="processing-overlay" id="processingOverlay">
                        <div class="processing-spinner"></div>
                        <div class="processing-text">Verifying transfer...</div>
                    </div>
                    
                    <div class="success-overlay" id="successOverlay">
                        <div class="success-checkmark">✓</div>
                        <div class="success-text">Transfer Confirmed!</div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const overlay = document.getElementById('paymentModalOverlay');
        const confirmBtn = document.getElementById('paymentConfirmBtn');
        const cancelBtn = document.getElementById('paymentCancelBtn');
        const processingOverlay = document.getElementById('processingOverlay');
        const successOverlay = document.getElementById('successOverlay');

        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            resolve(null);
        });

        confirmBtn.addEventListener('click', () => {
            processingOverlay.classList.add('show');

            setTimeout(() => {
                processingOverlay.classList.remove('show');
                successOverlay.classList.add('show');

                setTimeout(() => {
                    overlay.remove();
                    resolve({ method: 'bank', reference: demoRef });
                }, 1000);
            }, 1500);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(null);
            }
        });
    });
};

window.placeOrder = async () => {
    const shipping = state.checkoutData.shipping;

    // Validate all required fields
    if (!shipping.fullName || !shipping.fullName.trim()) {
        showToast('Please enter your full name');
        return;
    }

    if (!shipping.address || !shipping.address.trim()) {
        showToast('Please enter your address');
        return;
    }

    if (!shipping.city || !shipping.city.trim()) {
        showToast('Please enter your city');
        return;
    }

    if (!shipping.province || !shipping.province.trim()) {
        showToast('Please enter your province');
        return;
    }

    if (!shipping.phone || !shipping.phone.trim()) {
        showToast('Please enter your phone number');
        return;
    }

    // Validate phone number (Must start with 09 and be exactly 11 digits)
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(shipping.phone)) {
        showToast('Phone number must start with "09" and contain exactly 11 digits');
        return;
    }

    // Validate Name (Letters and spaces only)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(shipping.fullName)) {
        showToast('Full Name must contain letters and spaces only');
        return;
    }

    // Validate City (Letters and spaces only)
    if (!nameRegex.test(shipping.city)) {
        showToast('City must contain letters and spaces only');
        return;
    }

    // Validate Province (Letters and spaces only)
    if (!nameRegex.test(shipping.province)) {
        showToast('Province must contain letters and spaces only');
        return;
    }

    // Validate Postal Code (Numbers only, if provided)
    if (shipping.postalCode && !/^\d+$/.test(shipping.postalCode)) {
        showToast('Postal Code must contain numbers only');
        return;
    }

    // Validate payment method is selected
    if (!state.checkoutData.paymentMethod) {
        showToast('Please select a payment method');
        return;
    }

    const selectedItems = state.cart.filter(item => item.selected !== false);
    const subtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalAmount = subtotal + state.checkoutData.shippingFee;

    // Show appropriate payment modal based on payment method
    let paymentResult = null;

    switch (state.checkoutData.paymentMethod) {
        case 'cod':
            paymentResult = await showPaymentModal(totalAmount);
            break;
        case 'gcash':
            paymentResult = await showGCashModal(totalAmount);
            break;
        case 'maya':
            paymentResult = await showMayaModal(totalAmount);
            break;
        case 'card':
            paymentResult = await showCardModal(totalAmount);
            break;
        case 'bank':
            paymentResult = await showBankModal(totalAmount);
            break;
        default:
            showToast('Please select a payment method');
            return;
    }

    // User cancelled payment
    if (!paymentResult) {
        return;
    }

    // For COD, we have amount and change
    let amountPaid = paymentResult.amountPaid || totalAmount;
    let change = paymentResult.change || 0;

    const orderData = {
        userId: state.currentUser.id,
        items: selectedItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            name: item.name
        })),
        total: totalAmount,
        shippingInfo: state.checkoutData.shipping,
        paymentMethod: state.checkoutData.paymentMethod,
        shippingFee: state.checkoutData.shippingFee,
        amountPaid: amountPaid,
        change: change
    };

    try {
        const response = await api.createOrder(orderData);
        state.lastOrderId = response.orderId;

        // Store payment info for receipt
        state.lastOrderPayment = {
            amountPaid: amountPaid,
            change: change
        };

        // Add the order to state.orders for the confirmation page
        state.orders.push({
            orderId: response.orderId,
            ...response,
            items: selectedItems,
            total: totalAmount,
            createdAt: new Date().toISOString(),
            userId: state.currentUser.id,
            devices: response.devices || [] // Explicitly save ESP32 device credentials
        });

        state.cart = state.cart.filter(item => item.selected === false);
        saveState();
        navigate('order-confirmation');
    } catch (error) {
        // Error already handled
    }
};

window.printReceipt = () => {
    if (!state.lastOrderId) {
        showToast('No order found to print');
        return;
    }

    const order = state.orders.find(o => o.orderId === state.lastOrderId);
    if (!order) {
        showToast('Order not found');
        return;
    }

    const payment = state.lastOrderPayment || {};
    const currentDate = new Date();

    // Create receipt HTML with grocery-style formatting
    const receiptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Receipt #${order.orderId}</title>
            <style>
                @media print {
                    @page {
                        size: 80mm auto;
                        margin: 5mm;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                    }
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    line-height: 1.4;
                    width: 80mm;
                    margin: 0 auto;
                    padding: 10px;
                    background: white;
                }
                
                .receipt-header {
                    text-align: center;
                    border-bottom: 2px dashed #000;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                }
                
                .store-name {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .store-info {
                    font-size: 10px;
                    margin: 2px 0;
                }
                
                .receipt-info {
                    margin: 10px 0;
                    font-size: 11px;
                    border-bottom: 1px dashed #000;
                    padding-bottom: 10px;
                }
                
                .info-row {
                    display: flex;
                    justify-content: space-between;
                    margin: 3px 0;
                }
                
                .items-section {
                    margin: 10px 0;
                    border-bottom: 1px dashed #000;
                    padding-bottom: 10px;
                }
                
                .items-header {
                    font-weight: bold;
                    border-bottom: 1px solid #000;
                    padding: 5px 0;
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr;
                    gap: 5px;
                }
                
                .item-row {
                    padding: 5px 0;
                    border-bottom: 1px dotted #ccc;
                }
                
                .item-name {
                    font-weight: bold;
                    margin-bottom: 2px;
                }
                
                .item-details {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr;
                    gap: 5px;
                    font-size: 11px;
                }
                
                .totals-section {
                    margin: 10px 0;
                    padding: 10px 0;
                    border-bottom: 2px dashed #000;
                }
                
                .total-row {
                    display: flex;
                    justify-content: space-between;
                    margin: 5px 0;
                    font-size: 12px;
                }
                
                .total-row.grand-total {
                    font-size: 14px;
                    font-weight: bold;
                    border-top: 2px solid #000;
                    padding-top: 5px;
                    margin-top: 5px;
                }
                
                .payment-section {
                    margin: 10px 0;
                    padding: 10px 0;
                    border-bottom: 1px dashed #000;
                }
                
                .payment-row {
                    display: flex;
                    justify-content: space-between;
                    margin: 5px 0;
                    font-size: 12px;
                }
                
                .change-row {
                    font-weight: bold;
                    font-size: 13px;
                }
                
                .receipt-footer {
                    text-align: center;
                    margin-top: 10px;
                    font-size: 10px;
                }
                
                .thank-you {
                    font-weight: bold;
                    font-size: 14px;
                    margin: 10px 0;
                }
                
                .footer-note {
                    margin: 5px 0;
                    font-style: italic;
                }
                
                .text-right {
                    text-align: right;
                }
                
                .text-center {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="receipt-header">
                <div class="store-name">LUMINA ELECTRONICS</div>
                <div class="store-info">Premium Electronics Store</div>
                <div class="store-info">Tel: (02) 8123-4567</div>
                <div class="store-info">www.luminaelectronics.com</div>
            </div>
            
            <div class="receipt-info">
                <div class="info-row">
                    <span>Receipt #:</span>
                    <span><strong>${order.orderId}</strong></span>
                </div>
                <div class="info-row">
                    <span>Date:</span>
                    <span>${currentDate.toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })}</span>
                </div>
                <div class="info-row">
                    <span>Time:</span>
                    <span>${currentDate.toLocaleTimeString('en-PH', {
        hour: '2-digit',
        minute: '2-digit'
    })}</span>
                </div>
                <div class="info-row">
                    <span>Cashier:</span>
                    <span>${state.currentUser.name}</span>
                </div>
                <div class="info-row">
                    <span>Payment:</span>
                    <span>${state.checkoutData.paymentMethod.toUpperCase()}</span>
                </div>
            </div>
            
            <div class="items-section">
                <div class="items-header">
                    <div>ITEM</div>
                    <div class="text-center">QTY</div>
                    <div class="text-right">AMOUNT</div>
                </div>
                
                ${order.items.map(item => `
                    <div class="item-row">
                        <div class="item-name">${item.productName || item.name}</div>
                        <div class="item-details">
                            <div>${formatCurrency(item.price)}</div>
                            <div class="text-center">x${item.quantity}</div>
                            <div class="text-right"><strong>${formatCurrency(item.price * item.quantity)}</strong></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="totals-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>${formatCurrency(order.total - state.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping Fee:</span>
                    <span>${formatCurrency(state.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row grand-total">
                    <span>TOTAL:</span>
                    <span>${formatCurrency(order.total)}</span>
                </div>
            </div>
            
            ${payment.amountPaid ? `
                <div class="payment-section">
                    <div class="payment-row">
                        <span>Amount Paid:</span>
                        <span>${formatCurrency(payment.amountPaid)}</span>
                    </div>
                    <div class="payment-row change-row">
                        <span>Change:</span>
                        <span>${formatCurrency(payment.change)}</span>
                    </div>
                </div>
            ` : ''}
            
            <div class="receipt-footer">
                <div class="thank-you">THANK YOU!</div>
                <div class="footer-note">Please come again</div>
                <div class="footer-note" style="margin-top: 10px;">
                    Shipping to:<br>
                    ${state.checkoutData.shipping.fullName}<br>
                    ${state.checkoutData.shipping.address}<br>
                    ${state.checkoutData.shipping.city}, ${state.checkoutData.shipping.province}<br>
                    Phone: ${state.checkoutData.shipping.phone}
                </div>
                <div style="margin-top: 15px; font-size: 9px;">
                    This serves as your official receipt<br>
                    Keep this for warranty claims
                </div>
            </div>
        </body>
        </html>
    `;

    // Open print window
    const printWindow = window.open('', '_blank', 'width=300,height=600');
    printWindow.document.write(receiptHTML);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = function () {
        setTimeout(() => {
            printWindow.print();
        }, 250);
    };
};

// Advanced Search functionality with suggestions (optimized to not lose focus)
window.handleSearchInput = (event) => {
    const query = event.target.value;
    state.searchQuery = query;

    if (query.trim()) {
        // Generate suggestions based on product names and categories
        const suggestions = new Set();

        state.products.forEach(product => {
            const productName = product.name.toLowerCase();
            const category = product.category.toLowerCase();
            const queryLower = query.toLowerCase();

            // Add product names that match
            if (productName.includes(queryLower)) {
                suggestions.add(product.name);
            }

            // Add categories that match
            if (category.includes(queryLower)) {
                suggestions.add(product.category);
            }

            // Add word-based suggestions
            const words = productName.split(' ');
            words.forEach(word => {
                if (word.toLowerCase().startsWith(queryLower) && word.length > 2) {
                    suggestions.add(word.charAt(0).toUpperCase() + word.slice(1));
                }
            });
        });

        state.searchSuggestions = Array.from(suggestions).slice(0, 8);
        state.showSuggestions = true;
    } else {
        state.searchSuggestions = [];
        state.showSuggestions = false;
        // When search is cleared, re-render to show default page
        if (state.route === 'home' || state.route === 'products') {
            render();
            return; // Exit early to avoid double render
        }
    }

    // Update suggestions dropdown without full render
    updateSuggestionsDropdown();
};

// Update only the suggestions dropdown (not the whole page)
function updateSuggestionsDropdown() {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;

    // Remove existing suggestions
    const existingSuggestions = searchContainer.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }

    // Add new suggestions if needed
    if (state.showSuggestions && state.searchQuery) {
        const suggestionsHTML = `
            <div class="search-suggestions" id="searchSuggestions">
                <div class="suggestions-header">Suggestions</div>
                ${state.searchSuggestions.slice(0, 5).map(suggestion => `
                    <div class="suggestion-item" onclick="window.selectSuggestion('${suggestion.replace(/'/g, "\\'")}')"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <span>${suggestion}</span>
                    </div>
                `).join('')}
                ${state.searchQuery ? `
                    <div class="suggestion-search-all" onclick="window.handleSearch()">
                        Search for "${state.searchQuery}" →
                    </div>
                ` : ''}
            </div>
        `;

        searchContainer.insertAdjacentHTML('beforeend', suggestionsHTML);
    }
}

window.showSearchSuggestions = () => {
    if (state.searchQuery) {
        state.showSuggestions = true;
        updateSuggestionsDropdown();
    }
};

window.selectSuggestion = (suggestion) => {
    state.searchQuery = suggestion;
    state.showSuggestions = false;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = suggestion;
    }
    handleSearch();
};

window.handleSearch = () => {
    state.showSuggestions = false;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        state.searchQuery = searchInput.value.trim();
    }
    navigate('products');
    // Scroll to products section
    setTimeout(() => {
        const productsSection = document.querySelector('.product-grid');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
};

window.clearSearch = () => {
    state.searchQuery = '';
    state.showSuggestions = false;
    state.searchSuggestions = [];
    render();
};

// Close suggestions when clicking outside (only update dropdown, not full render)
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container') && state.showSuggestions) {
        state.showSuggestions = false;
        // Remove suggestions dropdown without full render
        const existingSuggestions = document.querySelector('.search-suggestions');
        if (existingSuggestions) {
            existingSuggestions.remove();
        }
    }
});

window.handleLogin = async (e) => {
    console.log('Login attempt started');
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log('Credentials:', { email, password });
    try {
        await api.login(email, password);
        console.log('Login successful');
    } catch (err) {
        console.error('Login error:', err);
    }
};

window.handleSignup = async (e) => {
    console.log('Signup attempt started');
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
        await api.register(name, email, password);
    } catch (err) {
        console.error('Signup error:', err);
    }
};

window.logout = () => {
    state.currentUser = null;
    state.cart = [];
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart_v2');
    showToast('Logged out successfully');
    sessionStorage.removeItem('currentRoute'); // Clear route!  
    navigate('home');
};

window.handleContactSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    console.log('Contact form submitted:', formData);
    showToast('Thank you for your message! We will get back to you soon.');
    form.reset();
};

window.deleteProduct = (productId) => {
    if (confirm('Are you sure you want to remove this product?')) {
        state.products = state.products.filter(p => p.id !== productId);
        saveState();
        render();
        showToast('Product removed');
    }
};

window.viewOrderDetails = (orderId) => {
    const order = state.orders.find(o => o.orderId === orderId);
    if (!order) {
        showToast('Order not found');
        return;
    }

    const customer = state.users.find(u => u.id === order.userId);
    const customerName = customer ? customer.name : `User ID: ${order.userId}`;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'order-details-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h2>Order Details</h2>
                <button class="modal-close" onclick="this.closest('.order-details-modal').remove()">✕</button>
            </div>
            <div class="modal-body">
                <div class="order-info">
                    <div class="info-row">
                        <span class="info-label">Order ID:</span>
                        <span class="info-value"><strong>#${order.orderId}</strong></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Customer:</span>
                        <span class="info-value">${customerName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Date:</span>
                        <span class="info-value">${new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span class="info-value">
                            <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
                        </span>
                    </div>
                </div>
                
                <h3 style="margin: 1.5rem 0 1rem 0; color: var(--primary);">Items Ordered</h3>
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <div class="item-details">
                                <div class="item-name">${item.productName || 'Product ID: ' + item.productId}</div>
                                <div class="item-meta">Quantity: ${item.quantity} × ${formatCurrency(item.price)}</div>
                            </div>
                            <div class="item-total">${formatCurrency(item.price * item.quantity)}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="order-total">
                    <span>Total Amount:</span>
                    <span class="total-amount">${formatCurrency(order.total)}</span>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
};

// --- Render ---
const render = () => {
    const app = document.getElementById('app');
    let content = '';

    switch (state.route) {
        case 'home': content = HomePage(); break;
        case 'products': content = ProductsPage({ Breadcrumbs, state }); break;
        case 'product-detail': content = ProductDetailPage({ Breadcrumbs, state }); break;
        case 'login': content = LoginPage(); break;
        case 'signup': content = SignupPage(); break;
        case 'cart': content = CartPage(); break;
        case 'checkout': content = CheckoutPage(); break;
        case 'order-confirmation': content = OrderConfirmationPage(); break;
        case 'contact-us': content = ContactUsPage({ Breadcrumbs }); break;
        case 'about-us': content = AboutUsPage({ Breadcrumbs }); break;
        case 'learn': content = LearnPage({ Breadcrumbs, state }); break;
        case 'tutorial-detail': content = TutorialDetailPage({ Breadcrumbs, state }); break;
        case 'deals': content = DealsPage({ Breadcrumbs, state }); break;
        case 'admin': content = AdminPage(state); break;
        case 'user': content = UserPage(state); break;
        case 'my-devices': content = MyDevicesPage(); break;
        case 'device-pair': content = DevicePairingPage(); break;
        case 'remote-control': content = RemoteControlPage(); break;
        default: content = HomePage();
    }


    // Add this case:
    if (state.route === 'user') {
        app.innerHTML = Header() + UserPage({ state });
        return;
    }

    app.innerHTML = `
        ${Header()}
        <main>
            ${content}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `;

    // Start deals timer if on deals page
    if (state.route === 'deals') {
        setTimeout(() => window.startDealsTimer(), 100);
    }

    // Setup scroll animations
    // Note: Scroll animations handled by CSS
};

// Cart search handlers - update only cart items, not full page
window.handleCartSearch = (event) => {
    state.cartSearchQuery = event.target.value;
    updateCartItems();
};

window.clearCartSearch = () => {
    state.cartSearchQuery = '';
    updateCartItems();
};

window.toggleCartItem = (id) => {
    const item = state.cart.find(i => i.id === id);
    if (item) {
        item.selected = item.selected === false ? true : false;
        saveState();
        updateCartItems();
    }
};

window.toggleFindSimilar = (id) => {
    const item = state.cart.find(i => i.id === id);
    if (item) {
        // Close other dropdowns first (optional, but good UX)
        state.cart.forEach(i => {
            if (i.id !== id) i.showSimilar = false;
        });

        item.showSimilar = !item.showSimilar;
        saveState();
        updateCartItems();
    }
};

// Update only the cart items display without full re-render
function updateCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSummaryContainer = document.querySelector('.cart-summary');
    const searchMessageContainer = document.querySelector('.cart-search-message');

    if (!cartItemsContainer) return;

    // Filter cart items based on search query
    let displayedCartItems = state.cart;
    if (state.cartSearchQuery) {
        displayedCartItems = state.cart.filter(item =>
            item.name.toLowerCase().includes(state.cartSearchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(state.cartSearchQuery.toLowerCase())
        );
    }

    // Update cart items
    cartItemsContainer.innerHTML = displayedCartItems.map(item => {
        // Find similar products based on category
        const similarProducts = state.products
            .filter(p => p.category === item.category && p.id !== item.id)
            .slice(0, 4); // Show up to 4 similar items

        return `
        <div style="display: flex; flex-direction: column; background: var(--surface); border-bottom: 1px solid var(--border);">
            <div class="cart-item" style="border-bottom: none;">
                <input type="checkbox" 
                    style="width: 20px; height: 20px; margin-right: 1rem; cursor: pointer; accent-color: var(--primary);"
                    ${item.selected !== false ? 'checked' : ''}
                    onchange="window.toggleCartItem(${item.id})"
                >
                <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                <div style="flex: 1;">
                    <h3 style="font-size: 1rem;">${item.name}</h3>
                    <p class="text-muted">${formatCurrency(item.price)}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-right: 2rem;">
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                
                <div class="cart-item-actions">
                    <button class="btn-delete" onclick="window.removeFromCart(${item.id})">Delete</button>
                    <button class="btn-find-similar" onclick="window.toggleFindSimilar(${item.id})">
                        Find Similar 
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${item.showSimilar ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform 0.2s;">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="similar-products-dropdown ${item.showSimilar ? 'show' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4 style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Similar Products</h4>
                    <button onclick="window.toggleFindSimilar(${item.id})" style="background: none; border: none; cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                ${similarProducts.length > 0 ? `
                    <div class="similar-products-grid">
                        ${similarProducts.map(p => `
                            <div class="similar-product-card" onclick="window.viewProduct(${p.id})">
                                <img src="${p.image}" alt="${p.name}" class="similar-product-image">
                                <div class="similar-product-title" title="${p.name}">${p.name}</div>
                                <div class="similar-product-price">${formatCurrency(p.price)}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p class="text-muted text-center">No similar products found.</p>'}
            </div>
        </div>
    `}).join('');

    // Update summary with selected items total
    if (cartSummaryContainer) {
        const selectedTotal = state.cart.reduce((acc, item) => acc + (item.selected !== false ? item.price * item.quantity : 0), 0);
        const selectedCount = state.cart.filter(i => i.selected !== false).length;

        cartSummaryContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${formatCurrency(selectedTotal)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${selectedCount})
            </button>
        `;
    }

    // Update search message
    if (searchMessageContainer) {
        if (state.cartSearchQuery && displayedCartItems.length === 0) {
            searchMessageContainer.innerHTML = `
                <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                    No items found for "${state.cartSearchQuery}"
                </p>
            `;
            searchMessageContainer.style.display = 'block';
        } else {
            searchMessageContainer.style.display = 'none';
        }
    }

    // Update search button icon
    const searchBtn = document.querySelector('#cartSearchInput + .search-btn');
    if (searchBtn) {
        searchBtn.innerHTML = state.cartSearchQuery ? `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        ` : `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `;
    }
}

// --- UI/UX Enhancement Functions ---

// Deals Page: Countdown Timer
let dealTimerInterval = null;

window.startDealsTimer = () => {
    // Set end time to 24 hours from now
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

    dealTimerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const hoursEl = document.getElementById('deal-hours');
        const minutesEl = document.getElementById('deal-minutes');
        const secondsEl = document.getElementById('deal-seconds');

        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(dealTimerInterval);
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }, 1000);
};

// Learn Page: Content Filtering (Difficulty + Topic)
window.filterLearningContent = (filter) => {
    const cards = document.querySelectorAll('.tutorial-card');
    const buttons = document.querySelectorAll('.topic-filter');

    // Update active button styling
    buttons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.style.background = '#6366f1';
            btn.style.color = 'white';
            btn.style.borderColor = '#6366f1';
        } else {
            btn.style.background = 'white';
            btn.style.color = '#64748b';
            btn.style.borderColor = '#e2e8f0';
        }
    });

    // Filter cards by category or topic
    cards.forEach(card => {
        const category = card.dataset.category;
        const topic = card.dataset.topic;

        if (filter === 'all' || category === filter || topic === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Learn Page: Category Filtering (Legacy - kept for compatibility)
window.currentLearnCategory = 'all';

window.filterTutorials = (category) => {
    window.currentLearnCategory = category;

    const tutorials = document.querySelectorAll('.tutorial-card');
    const tabs = document.querySelectorAll('.category-tab');

    // Update active tab
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });

    // Filter tutorials
    tutorials.forEach(tutorial => {
        if (category === 'all' || tutorial.dataset.category === category) {
            tutorial.style.display = 'block';
        } else {
            tutorial.style.display = 'none';
        }
    });
};

// Category Filtering for Deals
window.filterDeals = (category) => {
    const cards = document.querySelectorAll('.deal-product-card');
    const tabs = document.querySelectorAll('.deal-category-tab');

    // Update active tab styling
    tabs.forEach(tab => {
        if (tab.dataset.category === category) {
            tab.style.background = '#6366f1';
            tab.style.color = 'white';
        } else {
            tab.style.background = 'white';
            tab.style.color = '#64748b';
        }
    });

    // Filter products
    cards.forEach(card => {
        if (category === 'all' || category === 'clearance' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Video Modal
window.openVideoModal = (videoId) => {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-close" onclick="this.closest('.video-modal').remove()">✕</div>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
};

// --- App Initialization ---
const initApp = async () => {
    await api.getProducts();
    if (state.currentUser?.role === 'admin') {
        await Promise.all([
            api.getOrders(),
            deviceAPI.getMyDevices(),
            api.getUsers()
        ]);
    } else if (state.currentUser) {
        // Load devices for regular logged-in users
        await deviceAPI.getMyDevices();
    }
    render();
};


// Add this to your initApp or at the top of main.js
window.showLoading = () => {
    let overlay = document.querySelector('.loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);
    }
    // Force reflow
    void overlay.offsetWidth;
    overlay.classList.add('active');
};
window.hideLoading = () => {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 300);
    }
};

// === Login Modal Functions ===
window.openLoginModal = () => {
    const modalHTML = `
        <div class="login-modal-overlay" id="loginModal" onclick="window.closeLoginModalOnOverlay(event)">
            <div class="login-modal">
                <div class="login-modal-header">
                    <h2 class="login-modal-title">Welcome Back</h2>
                    <button class="login-modal-close" onclick="window.closeLoginModal()" aria-label="Close">×</button>
                </div>
                <div class="login-modal-body">
                    <form onsubmit="window.handleModalLogin(event)">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="text" name="email" class="form-input" required autocomplete="email">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" name="password" class="form-input" required autocomplete="current-password">
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.875rem;">
                            Login
                        </button>
                    </form>
                </div>
                <div class="login-modal-footer">
                    <p>
                        Don't have an account? 
                        <a href="#" onclick="window.closeLoginModal(); window.navigate('signup'); return false;">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal with animation
    setTimeout(() => {
        document.getElementById('loginModal').classList.add('show');
    }, 10);
};
window.closeLoginModal = () => {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
};
window.closeLoginModalOnOverlay = (event) => {
    if (event.target.id === 'loginModal') {
        window.closeLoginModal();
    }
};
window.handleModalLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const user = state.users.find(u => u.email === email && u.password === password);

        if (user) {
            state.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Close modal
            window.closeLoginModal();

            // Show success message
            showToast(`Welcome back, ${user.name}!`);

            // Refresh page to show logged-in state
            render();
        } else {
            alert('Invalid email or password');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
};

// Example usage in navigate:
const originalNavigate = window.navigate;
window.navigate = (route, params) => {
    window.showLoading();
    setTimeout(() => {
        originalNavigate(route, params);
        window.hideLoading();
    }, 300); // Fake delay to show spinner
};

//Device Management Handlers

window.handleDevicePairing = async (event) => {
    event.preventDefault();
    const form = event.target;
    const deviceId = form.deviceId.value.trim();
    const deviceToken = form.deviceToken.value.trim();

    try {
        await deviceAPI.pairDevice(deviceId, deviceToken);
    } catch (error) {
        // Error already shown via toast
    }
};

window.handleDeviceUnpairing = async (deviceId) => {
    try {
        await deviceAPI.unpairDevice(deviceId);
    } catch (error) {
        // Error already shown via toast
    }
};

window.startRemoteControl = async (deviceId) => {
    state.currentDeviceId = deviceId;

    // Initialize WebSocket connection
    if (!state.esp32Client) {
        state.esp32Client = new ESP32SocketClient();
    }

    try {
        await state.esp32Client.connect(state.currentUser.id); // Fixed: use .id instead of ._id

        // Start monitoring device
        state.esp32Client.monitorDevice(deviceId);

        // Set up event listeners
        state.esp32Client.on('device:status', (data) => {
            state.deviceStatus[data.deviceId] = data;
            updateRemoteControlUI();
        });

        state.esp32Client.on('device:telemetry', (data) => {
            state.telemetryData[data.deviceId] = data;
            updateRemoteControlUI();
        });

        state.esp32Client.on('command:sent', (data) => {
            addCommandLog(`Command sent: ${data.command}`);
        });

        state.esp32Client.on('command:response', (data) => {
            if (data.success) {
                addCommandLog(`✓ ${data.message || 'Command executed'}`);
            } else {
                addCommandLog(`✗ ${data.error || 'Command failed'}`);
            }
        });

        navigate('remote-control');
    } catch (error) {
        showToast('Failed to connect to device');
        console.error(error);
    }
};

window.stopRemoteControl = () => {
    if (state.esp32Client) {
        state.esp32Client.stopMonitoring();
    }
    state.currentDeviceId = null;
    navigate('my-devices');
};

window.sendCarCommand = (direction) => {
    if (!state.esp32Client || !state.currentDeviceId) return;

    try {
        if (direction === 'stop') {
            state.esp32Client.stop(state.currentDeviceId);
        } else {
            state.esp32Client.move(state.currentDeviceId, direction, 255);
        }
    } catch (error) {
        showToast('Failed to send command');
        console.error(error);
    }
};

// Toggle lights
window.toggleLights = () => {
    if (!state.esp32Client || !state.currentDeviceId) return;

    const lightsBtn = document.getElementById('lightsToggle');
    if (lightsBtn) {
        lightsBtn.classList.toggle('active');
        const isActive = lightsBtn.classList.contains('active');

        try {
            state.esp32Client.sendCommand(state.currentDeviceId, 'lights', { state: isActive ? 'on' : 'off' });
            showToast(`Lights ${isActive ? 'ON' : 'OFF'}`);
        } catch (error) {
            console.error('Failed to toggle lights:', error);
            lightsBtn.classList.toggle('active'); // Revert on error
        }
    }
};

// Toggle horn
window.toggleHorn = () => {
    if (!state.esp32Client || !state.currentDeviceId) return;

    const hornBtn = document.getElementById('hornToggle');
    if (hornBtn) {
        hornBtn.classList.toggle('active');
        const isActive = hornBtn.classList.contains('active');

        try {
            state.esp32Client.sendCommand(state.currentDeviceId, 'horn', { state: isActive ? 'on' : 'off' });
            showToast(`Horn ${isActive ? 'ON' : 'OFF'}`);
        } catch (error) {
            console.error('Failed to toggle horn:', error);
            hornBtn.classList.toggle('active'); // Revert on error
        }
    }
};

// Helper functions
function updateRemoteControlUI() {
    if (state.route === 'remote-control') {
        render();
    }
}

function addCommandLog(message) {
    const logContent = document.getElementById('commandLogContent');
    if (logContent) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logContent.insertBefore(entry, logContent.firstChild);

        // Keep only last 10 entries
        while (logContent.children.length > 10) {
            logContent.removeChild(logContent.lastChild);
        }
    }
}

// Toggle Token Visibility
window.toggleToken = (deviceId) => {
    if (!state.showTokens) state.showTokens = {};
    state.showTokens[deviceId] = !state.showTokens[deviceId];
    render();
};
// Handle Category Filter
window.handleCategoryFilter = (category) => {
    state.filterCategory = category || null;
    render();
};

// Keyboard event listeners
document.addEventListener('keydown', (e) => {
    if (state.route !== 'remote-control') return;

    const key = e.key.toLowerCase();
    const keyMap = {
        'w': 'forward',
        'arrowup': 'forward',
        's': 'backward',
        'arrowdown': 'backward',
        'a': 'left',
        'arrowleft': 'left',
        'd': 'right',
        'arrowright': 'right',
        ' ': 'stop'
    };

    if (keyMap[key]) {
        e.preventDefault();
        window.sendCarCommand(keyMap[key]);
    }
});

// ESC key to close login modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            window.closeLoginModal();
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (state.route !== 'remote-control') return;

    const key = e.key.toLowerCase();
    if (['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
        window.sendCarCommand('stop');
    }
});


// Initial Render
initApp();
