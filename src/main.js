import { products as initialProducts, users as initialUsers, orders as initialOrders } from './src/data.js';

// --- State Management ---
const state = {
    products: JSON.parse(localStorage.getItem('products_v2')) || initialProducts,
    users: JSON.parse(localStorage.getItem('users_v2')) || initialUsers,
    orders: JSON.parse(localStorage.getItem('orders')) || initialOrders,
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    cart: JSON.parse(localStorage.getItem('cart_v2')) || [],
    route: 'home', // home, login, signup, cart, admin, checkout
    searchQuery: '', // search functionality
    showSuggestions: false, // show/hide suggestions dropdown
    searchSuggestions: [] // current search suggestions
};

// --- Utilities ---
const saveState = () => {
    localStorage.setItem('products_v2', JSON.stringify(state.products));
    localStorage.setItem('users_v2', JSON.stringify(state.users));
    localStorage.setItem('orders', JSON.stringify(state.orders));
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

    return `
        <header>
            <div class="header-top">
                <a href="#" class="logo" onclick="window.navigate('home'); return false;">
                    Lumina<span>Electronics</span>
                </a>
                
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
                <a href="#" class="nav-link">Products</a>
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
        <div class="product-card">
            <div class="product-badge ${badgeClass}">${badgeText}</div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatCurrency(product.price)}</div>
                <button class="add-btn" onclick="window.addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
};

const HomePage = () => {
    // Filter products based on search query
    const filteredProducts = state.searchQuery
        ? state.products.filter(product =>
            product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        )
        : state.products;

    const searchResultsText = state.searchQuery
        ? `<p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} for "${state.searchQuery}"</p>`
        : '';

    return `
        <div class="hero">
            <div class="hero-content">
                <span class="hero-badge">Quality Components</span>
                <h1>Build Your Next Project</h1>
                <p>Premium electronics components, development boards, sensors, and maker supplies. Everything you need to bring your ideas to life.</p>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary" onclick="document.querySelector('.product-grid').scrollIntoView({behavior: 'smooth'})">Shop Components</button>
                    <button class="btn btn-outline">Learn More</button>
                </div>
            </div>
            <div class="hero-image">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80" alt="Electronics Components" style="max-width: 400px; border-radius: 20px;">
            </div>
        </div>
        
        <div style="padding: 2rem 0;">
            <div class="section-title">
                <h2>${state.searchQuery ? 'Search Results' : 'Featured Components'}</h2>
                ${!state.searchQuery ? '<a href="#" style="font-size: 0.9rem; color: var(--primary); font-weight: 600;">View All Products &rarr;</a>' : ''}
            </div>
            ${searchResultsText}
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
                <button class="btn btn-primary" onclick="window.navigate('home')">Start Shopping</button>
            </div>
        `;
    }

    const total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return `
        <div class="cart-container">
            <h2 class="mb-4">Shopping Cart</h2>
            <div class="cart-items">
                ${state.cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                        <div style="flex: 1;">
                            <h3 style="font-size: 1rem;">${item.name}</h3>
                            <p class="text-muted">${formatCurrency(item.price)}</p>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="btn btn-ghost" style="color: var(--danger);" onclick="window.removeFromCart(${item.id})">Remove</button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                    <span>Total</span>
                    <span>${formatCurrency(total)}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `;
};

const AdminPage = () => {
    if (!state.currentUser || state.currentUser.role !== 'admin') {
        navigate('home');
        return '';
    }

    const totalSales = state.orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = state.orders.length;
    const totalProducts = state.products.length;

    return `
        <div>
            <h2 class="mb-4">Admin Dashboard</h2>
            
            <div class="dashboard-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Sales</div>
                    <div class="stat-value">${formatCurrency(totalSales)}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Orders</div>
                    <div class="stat-value">${totalOrders}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Products in Stock</div>
                    <div class="stat-value">${totalProducts}</div>
                </div>
            </div>

            <h3 class="mb-4">Inventory Management</h3>
            <table class="inventory-table mb-4">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.products.map(product => `
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <img src="${product.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 4px;">
                                    ${product.name}
                                </div>
                            </td>
                            <td>${product.category}</td>
                            <td>${formatCurrency(product.price)}</td>
                            <td>${product.stock}</td>
                            <td>
                                <button class="btn btn-ghost" style="color: var(--danger)" onclick="window.deleteProduct(${product.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <h3 class="mb-4">Recent Transactions</h3>
            <table class="inventory-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer ID</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.orders.map(order => `
                        <tr>
                            <td>${order.id}</td>
                            <td>${order.date}</td>
                            <td>${order.userId}</td>
                            <td>${formatCurrency(order.total)}</td>
                            <td><span class="badge badge-success">${order.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};

// --- Actions ---

window.navigate = navigate;

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

window.checkout = () => {
    if (state.cart.length === 0) return;

    const order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        userId: state.currentUser.id,
        date: new Date().toISOString().split('T')[0],
        total: state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        status: 'Completed',
        items: state.cart.map(item => ({ productId: item.id, quantity: item.quantity }))
    };

    state.orders.unshift(order);
    state.cart = [];
    saveState();
    showToast('Order placed successfully!');
    navigate('home');
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
    navigate('home');
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

window.handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const user = state.users.find(u => u.email === email && u.password === password);

    if (user) {
        state.currentUser = user;
        saveState();
        showToast(`Welcome back, ${user.name}`);
        navigate(user.role === 'admin' ? 'admin' : 'home');
    } else {
        showToast('Invalid credentials');
    }
};

window.handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (state.users.find(u => u.email === email)) {
        showToast('Email already exists');
        return;
    }

    const newUser = {
        id: state.users.length + 1,
        name,
        email,
        password,
        role: 'customer'
    };

    state.users.push(newUser);
    state.currentUser = newUser;
    saveState();
    showToast('Account created successfully');
    navigate('home');
};

window.logout = () => {
    state.currentUser = null;
    state.cart = [];
    saveState();
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

// --- Render ---
const render = () => {
    const app = document.getElementById('app');
    let content = '';

    switch (state.route) {
        case 'home': content = HomePage(); break;
        case 'login': content = LoginPage(); break;
        case 'signup': content = SignupPage(); break;
        case 'cart': content = CartPage(); break;
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

// Initial Render
render();
