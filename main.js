import { API_BASE_URL, apiCall } from './src/api-config.js';

// --- State Management ---
const state = {
    products: [], // Will be fetched from API
    users: [], // Will be fetched from API (admin only)
    orders: [], // Will be fetched from API
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    cart: JSON.parse(localStorage.getItem('cart_v2')) || [],
    route: 'home',
    searchQuery: '',
    showSuggestions: false,
    searchSuggestions: [],
    currentProductId: null,
    sortBy: 'featured',
    filterCategory: null,
    cartSearchQuery: '',
    isLoading: false,
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
            state.currentUser = response.data;
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
            showToast(`Welcome back, ${state.currentUser.name}!`);
            navigate('home');
        } catch (error) {
            showToast(error.message || 'Login failed');
            throw error; // Re-throw to handle in caller
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
    }
};

// --- Utilities ---
const saveState = () => {
    // Only save cart and user session locally
    localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    localStorage.setItem('cart_v2', JSON.stringify(state.cart));
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
};

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

// --- Router ---
const navigate = (route) => {
    state.route = route;
    render();
    window.scrollTo(0, 0);
};

// --- Components ---

const Header = () => {
    const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
    const isLoggedIn = !!state.currentUser;
    const isAdmin = state.currentUser?.role === 'admin';
    const isCartPage = state.route === 'cart';

    return `
        <header>
            <div class="header-top">
                <a href="#" class="logo" onclick="window.navigate('home'); return false;">
                    Lumina<span>Electronics</span>
                </a>
                
                ${!isCartPage ? `
                    <div class="search-bar">
                        <div class="search-container">
                            <input 
                                type="text" 
                                id="searchInput" 
                                class="search-input" 
                                placeholder="Search for Products..." 
                                value="${state.searchQuery}"
                                oninput="window.handleSearchInput(event)"
                                onkeyup="if(event.key === 'Enter') window.handleSearch()"
                                onfocus="window.showSearchSuggestions()"
                            >
                            <button class="search-btn" onclick="window.handleSearch()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                            ${state.showSuggestions && state.searchQuery ? `
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
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <div class="nav-actions">
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
                        <div class="action-icon" onclick="window.logout()" style="cursor: pointer;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            <span>Logout</span>
                        </div>
                    ` : `
                        <a href="#" class="action-icon" onclick="window.navigate('login'); return false;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span>Login</span>
                        </a>
                    `}
                </div>
            </div>
            
            <nav class="header-nav">
                <a href="#" class="nav-link ${state.route === 'home' ? 'active' : ''}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${state.route === 'products' ? 'active' : ''}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link">Brands</a>
                <a href="#" class="nav-link">Deals</a>
                <a href="#" class="nav-link">Support</a>
                ${isAdmin ? `<a href="#" class="nav-link ${state.route === 'admin' ? 'active' : ''}" onclick="window.navigate('admin'); return false;">Admin Dashboard</a>` : ''}
            </nav>
        </header>
    `;
};

const ProductCard = (product) => {
    const isLowStock = product.stock < 10;
    const badgeClass = isLowStock ? 'low-stock' : '';
    const badgeText = isLowStock ? 'Low Stock' : 'In Stock';

    return `
        <div class="product-card" onclick="window.viewProduct(${product.id})" style="cursor: pointer;">
            <div class="product-badge ${badgeClass}">${badgeText}</div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatCurrency(product.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
};

const ProductDetailPage = () => {
    const product = state.products.find(p => p.id === state.currentProductId);

    if (!product) {
        navigate('home');
        return '';
    }

    const isLowStock = product.stock < 10;
    const stockStatus = product.stock > 0 ? 'In Stock' : 'Out of Stock';
    const stockColor = product.stock > 0 ? 'var(--success)' : 'var(--danger)';

    // Get 4 random related products (excluding current)
    const relatedProducts = state.products
        .filter(p => p.id !== product.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    return `
        <div class="product-detail-container">
            <div class="breadcrumbs">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a> &gt; 
                <a href="#" onclick="window.navigate('products'); return false;">Products</a> &gt; 
                <span>${product.name}</span>
            </div>

            <div class="product-main">
                <div class="product-gallery">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="product-details-info">
                    <div class="product-sku">SKU: LUM-${product.id.toString().padStart(4, '0')}</div>
                    <h1 class="detail-title">${product.name}</h1>
                    <div class="detail-price">${formatCurrency(product.price)}</div>

                    <div class="detail-section">
                        <span class="detail-label">Description</span>
                        <p style="color: var(--text-muted); line-height: 1.6;">${product.description}</p>
                    </div>

                    <div class="detail-section">
                        <span class="detail-label">Quantity</span>
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="window.adjustDetailQty(-1)">-</button>
                            <input type="number" id="detailQty" class="qty-input" value="1" min="1" max="${product.stock}" readonly>
                            <button class="qty-btn" onclick="window.adjustDetailQty(1)">+</button>
                        </div>
                    </div>

                    <button class="btn-add-large" onclick="window.addToCartFromDetail(${product.id})">
                        Add To Cart
                    </button>

                    <div class="stock-status" style="color: ${stockColor}">
                        <span class="stock-dot" style="background-color: ${stockColor}"></span>
                        ${stockStatus} (${product.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${relatedProducts.map(ProductCard).join('')}
                </div>
            </div>
        </div>
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

const ProductsPage = () => {
    // Apply filtering
    let displayedProducts = [...state.products];

    // Apply search query filter
    if (state.searchQuery) {
        displayedProducts = displayedProducts.filter(product =>
            product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
    }

    // Apply category filter
    if (state.filterCategory) {
        displayedProducts = displayedProducts.filter(p => p.category === state.filterCategory);
    }

    // Apply sorting
    switch (state.sortBy) {
        case 'price-asc':
            displayedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            displayedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            displayedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            displayedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'featured':
        default:
            // Default ID sort or custom logic
            displayedProducts.sort((a, b) => a.id - b.id);
            break;
    }

    return `
        <div style="padding: 2rem 0; max-width: 1200px; margin: 0 auto;">
            <div class="products-header">
                <div class="breadcrumbs">
                    <a href="#" onclick="window.navigate('home'); return false;">Home</a>
                    <span>&gt;</span>
                    <span>Products</span>
                </div>
                
                <div class="products-toolbar">
                    <div class="toolbar-left">
                        <button class="filter-btn" onclick="window.showToast('Filter drawer coming soon!')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                            Filter
                        </button>
                        <span style="color: var(--text-muted); font-size: 0.9rem;">${displayedProducts.length} products</span>
                    </div>
                    
                    <div class="sort-container">
                        <span class="sort-label">Sort by:</span>
                        <select class="sort-select" onchange="window.handleSort(this.value)">
                            <option value="featured" ${state.sortBy === 'featured' ? 'selected' : ''}>Featured</option>
                            <option value="price-asc" ${state.sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                            <option value="price-desc" ${state.sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                            <option value="name-asc" ${state.sortBy === 'name-asc' ? 'selected' : ''}>Alphabetical: A-Z</option>
                            <option value="name-desc" ${state.sortBy === 'name-desc' ? 'selected' : ''}>Alphabetical: Z-A</option>
                        </select>
                    </div>
                </div>
            </div>

            ${state.searchQuery ? `
                <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: var(--surface); border-radius: 8px; margin-bottom: 1.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>
                        Showing results for <strong>"${state.searchQuery}"</strong>
                    </span>
                </div>
            ` : ''}

            <div class="product-grid">
                ${displayedProducts.map(ProductCard).join('')}
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
                    <label class="form-label">Username</label>
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
                    <input type="text" name="name" class="form-input" required>
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
                Already have an account? <a href="#" onclick="window.navigate('login'); return false;" style="color: var(--accent)">Login</a>
            </p>
        </div>
    `;
};

const CartPage = () => {
    if (state.cart.length === 0) {
        return `
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
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
        <div style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            <button class="btn btn-outline" onclick="window.navigate('cart')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                ← Back to Cart
            </button>

            <h1 style="margin-bottom: 2rem;">Checkout</h1>

            <div style="display: grid; grid-template-columns: 1fr 400px; gap: 2rem;">
                <div>
                    <div class="admin-section" style="margin-bottom: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">📍 Shipping Information</h2>
                        <form id="shippingForm">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div class="form-group">
                                    <label class="form-label">Full Name *</label>
                                    <input type="text" name="fullName" class="form-input" value="${state.checkoutData.shipping.fullName || state.currentUser.name}" required oninput="window.updateShippingInfo('fullName', this.value)">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Phone Number *</label>
                                    <input type="tel" name="phone" class="form-input" value="${state.checkoutData.shipping.phone}" required placeholder="09XX-XXX-XXXX" oninput="window.handlePhoneInput(this)">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Address *</label>
                                <input type="text" name="address" class="form-input" value="${state.checkoutData.shipping.address}" required placeholder="Street address, house number" oninput="window.updateShippingInfo('address', this.value)">
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                                <div class="form-group">
                                    <label class="form-label">City *</label>
                                    <input type="text" name="city" class="form-input" value="${state.checkoutData.shipping.city}" required oninput="window.updateShippingInfo('city', this.value)">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Province *</label>
                                    <input type="text" name="province" class="form-input" value="${state.checkoutData.shipping.province}" required oninput="window.updateShippingInfo('province', this.value)">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Postal Code</label>
                                    <input type="text" name="postalCode" class="form-input" value="${state.checkoutData.shipping.postalCode}" placeholder="Optional" oninput="window.updateShippingInfo('postalCode', this.value)">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Delivery Instructions (Optional)</label>
                                <textarea name="instructions" class="form-input" rows="3" placeholder="Floor number, landmark, etc." oninput="window.updateShippingInfo('instructions', this.value)">${state.checkoutData.shipping.instructions}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="admin-section">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">💳 Payment Method</h2>
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

    const deliveryRange = `${minDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${maxDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

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

const AdminPage = () => {
    if (!state.currentUser || state.currentUser.role !== 'admin') {
        navigate('home');
        return '';
    }

    // Calculate metrics
    const totalSales = state.orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = state.orders.length;
    const totalProducts = state.products.length;
    const totalCustomers = state.users.filter(u => u.role === 'customer').length;

    // Low stock products
    const lowStockProducts = state.products.filter(p => p.stock < 10);
    const outOfStockProducts = state.products.filter(p => p.stock === 0);

    // Recent orders (last 5)
    const recentOrders = state.orders.slice(0, 5);

    // Average order value
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Category Distribution Data
    const categories = {};
    state.products.forEach(p => {
        categories[p.category] = (categories[p.category] || 0) + 1;
    });
    const categoryData = Object.entries(categories).map(([name, count]) => ({ name, count }));

    // Mock Revenue Data (Last 7 Days)
    const revenueData = [450, 720, 550, 890, 600, 950, 1200];
    const maxRevenue = Math.max(...revenueData);

    return `
        <div class="admin-container">
            <div class="admin-header">
                <div style="display: flex; align-items: center;">
                    <h1>📊 Admin Dashboard</h1>
                </div>
                <div class="admin-actions" style="display: flex; align-items: center;">
                    <div class="notification-bell" onclick="window.showToast('No new notifications')">
                        🔔
                        ${lowStockProducts.length > 0 ? `<span class="notification-badge">${lowStockProducts.length}</span>` : ''}
                    </div>
                    <button class="btn-action" onclick="window.showToast('Exporting data...')">
                        📥 Export CSV
                    </button>
                    <button class="btn-action" onclick="window.showToast('Report generated!')">
                        Generate Report
                    </button>
                </div>
            </div>

            <!-- Analytics Overview -->
            <div class="analytics-grid">
                <!-- Revenue Trend -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>📈 Revenue Trend (7 Days)</h3>
                    </div>
                    <div class="chart-container">
                        ${revenueData.map(val => `
                            <div class="chart-bar" style="height: ${(val / maxRevenue) * 100}%" data-value="${formatCurrency(val)}"></div>
                        `).join('')}
                    </div>
                </div>

                <!-- Category Distribution -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🥧 Categories</h3>
                    </div>
                    <div class="donut-chart">
                        <div class="donut-hole">
                            ${categoryData.length} Cats
                        </div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        ${categoryData.slice(0, 3).map(c => `<span class="badge badge-info">${c.name}: ${c.count}</span>`).join('')}
                    </div>
                </div>

                <!-- Top Products -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🏆 Top Products</h3>
                    </div>
                    <div class="top-products-list">
                        ${state.products.slice(0, 4).map(p => `
                            <div class="top-product-item">
                                <img src="${p.image}" style="width: 32px; height: 32px; object-fit: contain;">
                                <div style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                                        <span>${p.name}</span>
                                        <span>${formatCurrency(p.price)}</span>
                                    </div>
                                    <div class="progress-bar-bg">
                                        <div class="progress-bar-fill" style="width: ${Math.random() * 40 + 60}%"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Key Metrics -->
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">💰</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Revenue</div>
                        <div class="metric-value">${formatCurrency(totalSales)}</div>
                        <div class="metric-change positive">+15.3%</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">🛍️</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Orders</div>
                        <div class="metric-value">${totalOrders}</div>
                        <div class="metric-change positive">+8 new today</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">👥</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Customers</div>
                        <div class="metric-value">${totalCustomers}</div>
                        <div class="metric-change">2 new this week</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">📊</div>
                    <div class="metric-content">
                        <div class="metric-label">Avg. Order Value</div>
                        <div class="metric-value">${formatCurrency(avgOrderValue)}</div>
                        <div class="metric-change positive">+5.2%</div>
                    </div>
                </div>
            </div>

            <!-- Order Management -->
            <div class="admin-section">
                <div class="section-header">
                    <h3>🛍️ Order Management</h3>
                    <div class="filter-bar" style="margin-bottom: 0;">
                        <input type="date" class="filter-input">
                        <select class="filter-input">
                            <option value="">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </div>
                <div class="table-container">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${recentOrders.length > 0 ? recentOrders.map(order => {
        const customer = state.users.find(u => u.id === order.userId);
        return `
                                    <tr>
                                        <td><strong>#${order.orderId}</strong></td>
                                        <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>${customer ? customer.name : 'Unknown (ID: ' + order.userId + ')'}</td>
                                        <td>${order.items.length} items</td>
                                        <td><strong>${formatCurrency(order.total)}</strong></td>
                                        <td>
                                            <select class="status-select" onchange="window.updateOrderStatus('${order.orderId}', this.value)">
                                                <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                                <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                                                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button class="btn-icon" onclick="window.viewOrderDetails('${order.orderId}')" title="Quick View">👁️</button>
                                        </td>
                                    </tr>
                                `;
    }).join('') : '<tr><td colspan="7" class="text-center text-muted">No orders yet</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Inventory Management -->
            <div class="admin-section">
                <div class="section-header">
                    <h3>📦 Inventory Management</h3>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn-small btn-accent" onclick="window.bulkAction('restock')">Restock Selected</button>
                        <button class="btn-small" style="background: var(--danger); color: white;" onclick="window.bulkAction('delete')">Delete Selected</button>
                    </div>
                </div>
                <div class="table-container">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th style="width: 40px;"><input type="checkbox" onclick="window.toggleSelectAll(this)"></th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Est. Days Left</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${state.products.map(product => `
                                <tr>
                                    <td><input type="checkbox" class="product-checkbox" value="${product.id}"></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${product.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${product.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${product.category}</span></td>
                                    <td>${formatCurrency(product.price)}</td>
                                    <td>
                                        <span class="stock-badge ${product.stock < 10 ? 'low' : ''} ${product.stock === 0 ? 'out' : ''}" style="${product.stock < 10 ? 'color: var(--danger); font-weight: bold;' : ''}">
                                            ${product.stock}
                                        </span>
                                    </td>
                                    <td>${product.stock > 0 ? Math.floor(product.stock / 2) + ' days' : 'Out of Stock'}</td>
                                    <td>
                                        <button class="btn-icon" onclick="window.showToast('Editing ${product.name}...')" title="Edit">✏️</button>
                                        <button class="btn-icon danger" onclick="window.deleteProduct(${product.id})" title="Delete">🗑️</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Customer Insights (New) -->
            <div class="admin-section">
                <div class="section-header">
                    <h3>👥 Customer Insights</h3>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                    <div>
                        <h4>Top Spenders</h4>
                        <ul style="list-style: none; padding: 0; margin-top: 1rem;">
                            ${state.users.filter(u => u.role === 'customer').slice(0, 3).map(u => `
                                <li style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                                    <span>${u.name}</span>
                                    <span style="font-weight: bold; color: var(--primary);">$${(Math.random() * 500 + 100).toFixed(2)}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4>Geographic Distribution</h4>
                        <div class="map-widget">
                            Map Widget Placeholder
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// --- Actions ---

window.navigate = navigate;

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
        state.cart.push({ ...product, quantity: qty });
    }

    saveState();
    showToast(`Added ${qty} item(s) to cart`);
    // Optional: navigate to cart or stay on page
};

window.addToCart = (productId) => {
    if (!state.currentUser) {
        showToast('Please login to shop');
        navigate('login');
        return;
    }

    const product = state.products.find(p => p.id === productId);
    const existingItem = state.cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }

    saveState();
    render();
    showToast('Added to cart');
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

    // Validate phone number (numbers only, no letters or special characters)
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(shipping.phone)) {
        showToast('Phone number must contain only numbers (no letters or special characters)');
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

    // Prompt user for payment amount
    let amountPaid = null;
    let change = 0;

    if (state.checkoutData.paymentMethod === 'cod') {
        // Show payment modal instead of prompt
        const paymentResult = await showPaymentModal(totalAmount);

        if (!paymentResult) {
            // User cancelled
            return;
        }

        amountPaid = paymentResult.amountPaid;
        change = paymentResult.change;
    }

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
            userId: state.currentUser.id
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
    navigate('home');
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
        case 'products': content = ProductsPage(); break;
        case 'product-detail': content = ProductDetailPage(); break;
        case 'login': content = LoginPage(); break;
        case 'signup': content = SignupPage(); break;
        case 'cart': content = CartPage(); break;
        case 'checkout': content = CheckoutPage(); break;
        case 'order-confirmation': content = OrderConfirmationPage(); break;
        case 'admin': content = AdminPage(); break;
        default: content = HomePage();
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

// --- App Initialization ---
const initApp = async () => {
    await api.getProducts();
    if (state.currentUser?.role === 'admin') {
        await Promise.all([
            api.getOrders(),
            api.getUsers()
        ]);
    }
    render();
};

// Initial Render
initApp();
