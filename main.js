import { products as initialProducts, users as initialUsers, orders as initialOrders } from './src/data.js';

// --- State Management ---
const state = {
    products: JSON.parse(localStorage.getItem('products_v2')) || initialProducts,
    users: JSON.parse(localStorage.getItem('users_v2')) || initialUsers,
    orders: JSON.parse(localStorage.getItem('orders')) || initialOrders,
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    cart: JSON.parse(localStorage.getItem('cart_v2')) || [],
    route: 'home', // home, login, signup, cart, admin, checkout, product-detail, products
    searchQuery: '', // search functionality
    showSuggestions: false, // show/hide suggestions dropdown
    searchSuggestions: [], // current search suggestions
    currentProductId: null, // for product detail page
    sortBy: 'featured', // featured, price-asc, price-desc, name-asc, name-desc
    filterCategory: null // null or category string
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

    const total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return `
        <div style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            <button class="btn btn-outline" onclick="window.navigate('products')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                ← Continue Shopping
            </button>
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
        </div>
    `;
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

    // Total inventory value
    const inventoryValue = state.products.reduce((acc, p) => acc + (p.price * p.stock), 0);

    return `
        <div class="admin-container">
            <div class="admin-header">
                <h1>📊 Admin Dashboard</h1>
                <div class="admin-actions">
                    <button class="btn-action" onclick="window.showToast('Feature coming soon!')">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Add Product
                    </button>
                    <button class="btn-action" onclick="window.showToast('Report generated!')">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        Generate Report
                    </button>
                </div>
            </div>

            <!-- Key Metrics -->
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <div class="metric-content">
                        <div class="metric-label">Total Revenue</div>
                        <div class="metric-value">${formatCurrency(totalSales)}</div>
                        <div class="metric-change positive">+15.3% from last month</div>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                        <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                        </svg>
                    </div>
                    <div class="metric-content">
                        <div class="metric-label">Total Orders</div>
                        <div class="metric-value">${totalOrders}</div>
                        <div class="metric-change positive">+8 new today</div>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                        <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <div class="metric-content">
                        <div class="metric-label">Total Customers</div>
                        <div class="metric-value">${totalCustomers}</div>
                        <div class="metric-change">2 new this week</div>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                        <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div class="metric-content">
                        <div class="metric-label">Avg. Order Value</div>
                        <div class="metric-value">${formatCurrency(avgOrderValue)}</div>
                        <div class="metric-change positive">+5.2% increase</div>
                    </div>
                </div>
            </div>

            <!-- Alerts & Inventory Status -->
            <div class="admin-row">
                <div class="admin-section alert-section">
                    <div class="section-header">
                        <h3>⚠️ Inventory Alerts</h3>
                        <span class="badge badge-warning">${lowStockProducts.length + outOfStockProducts.length}</span>
                    </div>
                    <div class="alert-list">
                        ${outOfStockProducts.length > 0 ? `
                            <div class="alert-item critical">
                                <div class="alert-icon">🔴</div>
                                <div class="alert-content">
                                    <div class="alert-title">Out of Stock</div>
                                    <div class="alert-desc">${outOfStockProducts.length} product(s) need restocking</div>
                                </div>
                            </div>
                        ` : ''}
                        ${lowStockProducts.length > 0 ? `
                            <div class="alert-item warning">
                                <div class="alert-icon">⚠️</div>
                                <div class="alert-content">
                                    <div class="alert-title">Low Stock Alert</div>
                                    <div class="alert-desc">${lowStockProducts.length} product(s) running low (< 10 units)</div>
                                </div>
                            </div>
                        ` : ''}
                        ${lowStockProducts.length === 0 && outOfStockProducts.length === 0 ? `
                            <div class="alert-item success">
                                <div class="alert-icon">✅</div>
                                <div class="alert-content">
                                    <div class="alert-title">All Good!</div>
                                    <div class="alert-desc">No inventory issues detected</div>
                                </div>
                            </div>
                        ` : ''}
                        <div class="alert-item info">
                            <div class="alert-icon">📦</div>
                            <div class="alert-content">
                                <div class="alert-title">Inventory Value</div>
                                <div class="alert-desc">${formatCurrency(inventoryValue)} total stock value</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="admin-section quick-stats">
                    <div class="section-header">
                        <h3>📈 Quick Stats</h3>
                    </div>
                    <div class="stats-list">
                        <div class="stat-item">
                            <span class="stat-label">Products</span>
                            <span class="stat-number">${totalProducts}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Categories</span>
                            <span class="stat-number">${[...new Set(state.products.map(p => p.category))].length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Conversion Rate</span>
                            <span class="stat-number">3.2%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Today's Orders</span>
                            <span class="stat-number">0</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Orders -->
            <div class="admin-section">
                <div class="section-header">
                    <h3>🛍️ Recent Orders</h3>
                    <span class="text-muted">${recentOrders.length} orders</span>
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
                            </tr>
                        </thead>
                        <tbody>
                            ${recentOrders.length > 0 ? recentOrders.map(order => {
        const customer = state.users.find(u => u.id === order.userId);
        return `
                                    <tr>
                                        <td><strong>${order.id}</strong></td>
                                        <td>${order.date}</td>
                                        <td>${customer ? customer.name : 'Unknown'}</td>
                                        <td>${order.items.length} items</td>
                                        <td><strong>${formatCurrency(order.total)}</strong></td>
                                        <td><span class="badge badge-success">${order.status}</span></td>
                                    </tr>
                                `;
    }).join('') : '<tr><td colspan="6" class="text-center text-muted">No orders yet</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Low Stock Products -->
            ${lowStockProducts.length > 0 ? `
                <div class="admin-section">
                    <div class="section-header">
                        <h3>📉 Low Stock Products</h3>
                        <span class="badge badge-warning">${lowStockProducts.length}</span>
                    </div>
                    <div class="table-container">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Price</th>
                                    <th>Action Required</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${lowStockProducts.map(product => `
                                    <tr>
                                        <td>
                                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                                <img src="${product.image}" style="width: 32px; height: 32px; object-fit: contain; background: #f1f5f9; border-radius: 4px;">
                                                <span>${product.name}</span>
                                            </div>
                                        </td>
                                        <td>${product.category}</td>
                                        <td>
                                            <span class="badge ${product.stock === 0 ? 'badge-danger' : 'badge-warning'}">
                                                ${product.stock} units
                                            </span>
                                        </td>
                                        <td>${formatCurrency(product.price)}</td>
                                        <td>
                                            <button class="btn-small btn-accent" onclick="window.showToast('Restocking ${product.name}...')">
                                                Restock
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            ` : ''}

            <!-- All Products Inventory -->
            <div class="admin-section">
                <div class="section-header">
                    <h3>📦 Full Inventory</h3>
                    <span class="text-muted">${totalProducts} products</span>
                </div>
                <div class="table-container">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${state.products.map(product => `
                                <tr>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${product.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${product.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${product.category}</span></td>
                                    <td>${formatCurrency(product.price)}</td>
                                    <td>
                                        <span class="stock-badge ${product.stock < 10 ? 'low' : ''} ${product.stock === 0 ? 'out' : ''}">
                                            ${product.stock}
                                        </span>
                                    </td>
                                    <td>${formatCurrency(product.price * product.stock)}</td>
                                    <td>
                                        <button class="btn-icon" onclick="window.showToast('Editing ${product.name}...')" title="Edit">
                                            ✏️
                                        </button>
                                        <button class="btn-icon danger" onclick="window.deleteProduct(${product.id})" title="Delete">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
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
        case 'products': content = ProductsPage(); break;
        case 'product-detail': content = ProductDetailPage(); break;
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
