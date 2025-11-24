(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const L="https://lumina-production-a4bb.up.railway.app",I="http://localhost:3000",k=window.location.hostname==="jlfuertes14.github.io",$=k?`${L}/api`:`${I}/api`;async function y(r,t={}){const s=`${$}${r}`;try{const o=await fetch(s,{...t,headers:{"Content-Type":"application/json",...t.headers}}),a=await o.json();if(!o.ok)throw new Error(a.error||a.message||"API request failed");return a}catch(o){throw console.error("API Error:",o),o}}console.log(`🌍 Environment: ${k?"PRODUCTION":"DEVELOPMENT"}`);console.log(`🔗 API URL: ${$}`);const e={products:[],users:[],orders:[],currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:"home",searchQuery:"",showSuggestions:!1,searchSuggestions:[],currentProductId:null,sortBy:"featured",filterCategory:null,cartSearchQuery:"",isLoading:!1},v={getProducts:async()=>{try{const r=await y("/products");e.products=r.data,p()}catch(r){console.error("Failed to load products:",r),c("Failed to load products")}},login:async(r,t)=>{console.log("Calling API login...");try{const s=await y("/users/login",{method:"POST",body:JSON.stringify({email:r,password:t})});e.currentUser=s.data,localStorage.setItem("currentUser",JSON.stringify(e.currentUser)),c(`Welcome back, ${e.currentUser.name}!`),g("home")}catch(s){throw c(s.message||"Login failed"),s}},register:async(r,t,s)=>{try{const o=await y("/users/register",{method:"POST",body:JSON.stringify({name:r,email:t,password:s})});e.currentUser=o.data,localStorage.setItem("currentUser",JSON.stringify(e.currentUser)),c("Account created successfully!"),g("home")}catch(o){throw c(o.message||"Registration failed"),o}},createOrder:async r=>{try{const t=await y("/orders",{method:"POST",body:JSON.stringify(r)});return e.cart=[],m(),c("Order placed successfully!"),e.currentUser.role==="admin"&&v.getOrders(),t.data}catch(t){throw c(t.message||"Failed to place order"),t}},getOrders:async()=>{if(!(!e.currentUser||e.currentUser.role!=="admin"))try{const r=await y("/orders");e.orders=r.data,p()}catch(r){console.error("Failed to load orders:",r)}},getUsers:async()=>{if(!(!e.currentUser||e.currentUser.role!=="admin"))try{const r=await y("/users");e.users=r.data,p()}catch(r){console.error("Failed to load users:",r)}}},m=()=>{localStorage.setItem("currentUser",JSON.stringify(e.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(e.cart))},u=r=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(r),c=r=>{const t=document.createElement("div");t.className="toast",t.textContent=r,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3e3)},g=r=>{e.route=r,p(),window.scrollTo(0,0)},Q=()=>{const r=e.cart.reduce((a,n)=>a+n.quantity,0),t=!!e.currentUser,s=e.currentUser?.role==="admin";return`
        <header>
            <div class="header-top">
                <a href="#" class="logo" onclick="window.navigate('home'); return false;">
                    Lumina<span>Electronics</span>
                </a>
                
                ${e.route==="cart"?"":`
                    <div class="search-bar">
                        <div class="search-container">
                            <input 
                                type="text" 
                                id="searchInput" 
                                class="search-input" 
                                placeholder="Search for Products..." 
                                value="${e.searchQuery}"
                                oninput="window.handleSearchInput(event)"
                                onkeyup="if(event.key === 'Enter') window.handleSearch()"
                                onfocus="window.showSearchSuggestions()"
                            >
                            <button class="search-btn" onclick="window.handleSearch()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                            ${e.showSuggestions&&e.searchQuery?`
                                <div class="search-suggestions" id="searchSuggestions">
                                    <div class="suggestions-header">Suggestions</div>
                                    ${e.searchSuggestions.slice(0,5).map(a=>`
                                        <div class="suggestion-item" onclick="window.selectSuggestion('${a.replace(/'/g,"\\'")}')"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                            <span>${a}</span>
                                        </div>
                                    `).join("")}
                                    ${e.searchQuery?`
                                        <div class="suggestion-search-all" onclick="window.handleSearch()">
                                            Search for "${e.searchQuery}" →
                                        </div>
                                    `:""}
                                </div>
                            `:""}
                        </div>
                    </div>
                `}

                <div class="nav-actions">
                    ${s?"":`
                    <a href="#" class="action-icon" onclick="window.navigate('cart'); return false;">
                        <div style="position: relative;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            ${r>0?`<span class="cart-count">${r}</span>`:""}
                        </div>
                        <span>Cart</span>
                    </a>
                    `}
                    
                    ${t?`
                        <div class="action-icon" onclick="window.logout()" style="cursor: pointer;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            <span>Logout</span>
                        </div>
                    `:`
                        <a href="#" class="action-icon" onclick="window.navigate('login'); return false;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span>Login</span>
                        </a>
                    `}
                </div>
            </div>
            
            <nav class="header-nav">
                <a href="#" class="nav-link ${e.route==="home"?"active":""}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${e.route==="products"?"active":""}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link">Brands</a>
                <a href="#" class="nav-link">Deals</a>
                <a href="#" class="nav-link">Support</a>
                ${s?`<a href="#" class="nav-link ${e.route==="admin"?"active":""}" onclick="window.navigate('admin'); return false;">Admin Dashboard</a>`:""}
            </nav>
        </header>
    `},f=r=>{const t=r.stock<10,s=t?"low-stock":"",o=t?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${r.id})" style="cursor: pointer;">
            <div class="product-badge ${s}">${o}</div>
            <div class="product-image">
                <img src="${r.image}" alt="${r.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${r.category}</div>
                <h3 class="product-title">${r.name}</h3>
                <div class="product-price">${u(r.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${r.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},O=()=>{const r=e.products.find(a=>a.id===e.currentProductId);if(!r)return g("home"),"";r.stock<10;const t=r.stock>0?"In Stock":"Out of Stock",s=r.stock>0?"var(--success)":"var(--danger)",o=e.products.filter(a=>a.id!==r.id).sort(()=>.5-Math.random()).slice(0,4);return`
        <div class="product-detail-container">
            <div class="breadcrumbs">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a> &gt; 
                <a href="#" onclick="window.navigate('products'); return false;">Products</a> &gt; 
                <span>${r.name}</span>
            </div>

            <div class="product-main">
                <div class="product-gallery">
                    <img src="${r.image}" alt="${r.name}">
                </div>

                <div class="product-details-info">
                    <div class="product-sku">SKU: LUM-${r.id.toString().padStart(4,"0")}</div>
                    <h1 class="detail-title">${r.name}</h1>
                    <div class="detail-price">${u(r.price)}</div>

                    <div class="detail-section">
                        <span class="detail-label">Description</span>
                        <p style="color: var(--text-muted); line-height: 1.6;">${r.description}</p>
                    </div>

                    <div class="detail-section">
                        <span class="detail-label">Quantity</span>
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="window.adjustDetailQty(-1)">-</button>
                            <input type="number" id="detailQty" class="qty-input" value="1" min="1" max="${r.stock}" readonly>
                            <button class="qty-btn" onclick="window.adjustDetailQty(1)">+</button>
                        </div>
                    </div>

                    <button class="btn-add-large" onclick="window.addToCartFromDetail(${r.id})">
                        Add To Cart
                    </button>

                    <div class="stock-status" style="color: ${s}">
                        <span class="stock-dot" style="background-color: ${s}"></span>
                        ${t} (${r.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${o.map(f).join("")}
                </div>
            </div>
        </div>
    `},x=()=>{if(e.searchQuery){const s=e.products.filter(o=>o.name.toLowerCase().includes(e.searchQuery.toLowerCase())||o.category.toLowerCase().includes(e.searchQuery.toLowerCase())||o.description.toLowerCase().includes(e.searchQuery.toLowerCase()));return`
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
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${s.length} result${s.length!==1?"s":""} for "${e.searchQuery}"</p>
                ${s.length>0?`
                    <div class="product-grid">
                        ${s.map(f).join("")}
                    </div>
                `:`
                    <div style="text-align: center; padding: 4rem 2rem; color: var(--text-muted);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 1rem; opacity: 0.3;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <h3 style="margin-bottom: 0.5rem;">No products found</h3>
                        <p>Try searching with different keywords</p>
                        <button class="btn btn-primary" onclick="window.clearSearch()" style="margin-top: 1rem;">Clear Search</button>
                    </div>
                `}
            </div>
        `}const r=[1,6,2,12,4];return`
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
                ${e.products.filter(s=>r.includes(s.id)).sort((s,o)=>r.indexOf(s.id)-r.indexOf(o.id)).map(f).join("")}
            </div>
        </div>
    `},j=()=>{let r=[...e.products];switch(e.searchQuery&&(r=r.filter(t=>t.name.toLowerCase().includes(e.searchQuery.toLowerCase())||t.category.toLowerCase().includes(e.searchQuery.toLowerCase())||t.description.toLowerCase().includes(e.searchQuery.toLowerCase()))),e.sortBy){case"price-asc":r.sort((t,s)=>t.price-s.price);break;case"price-desc":r.sort((t,s)=>s.price-t.price);break;case"name-asc":r.sort((t,s)=>t.name.localeCompare(s.name));break;case"name-desc":r.sort((t,s)=>s.name.localeCompare(t.name));break;case"featured":default:r.sort((t,s)=>t.id-s.id);break}return`
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
                        <span style="color: var(--text-muted); font-size: 0.9rem;">${r.length} products</span>
                    </div>
                    
                    <div class="sort-container">
                        <span class="sort-label">Sort by:</span>
                        <select class="sort-select" onchange="window.handleSort(this.value)">
                            <option value="featured" ${e.sortBy==="featured"?"selected":""}>Featured</option>
                            <option value="price-asc" ${e.sortBy==="price-asc"?"selected":""}>Price: Low to High</option>
                            <option value="price-desc" ${e.sortBy==="price-desc"?"selected":""}>Price: High to Low</option>
                            <option value="name-asc" ${e.sortBy==="name-asc"?"selected":""}>Alphabetical: A-Z</option>
                            <option value="name-desc" ${e.sortBy==="name-desc"?"selected":""}>Alphabetical: Z-A</option>
                        </select>
                    </div>
                </div>
            </div>

            ${e.searchQuery?`
                <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: var(--surface); border-radius: 8px; margin-bottom: 1.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>
                        Showing results for <strong>"${e.searchQuery}"</strong>
                    </span>
                </div>
            `:""}

            <div class="product-grid">
                ${r.map(f).join("")}
            </div>
        </div>
    `},A=()=>`
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
    `,T=()=>`
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
    `,q=()=>{if(e.cart.length===0)return`
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('products')">Start Shopping</button>
            </div>
        `;let r=e.cart;return e.cartSearchQuery&&(r=e.cart.filter(t=>t.name.toLowerCase().includes(e.cartSearchQuery.toLowerCase())||t.category.toLowerCase().includes(e.cartSearchQuery.toLowerCase()))),e.cart.reduce((t,s)=>t+s.price*s.quantity,0),`
        <div style="margin: 2rem auto; padding: 0 2rem;">
            <button class="btn btn-outline" onclick="window.navigate('products')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                ← Continue Shopping
            </button>
            
            <div class="cart-container">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0;">Shopping Cart</h2>
                    
                    ${e.cart.length>0?`
                        <div class="search-container" style="max-width: 400px; flex: 1;">
                            <input 
                                type="text" 
                                id="cartSearchInput" 
                                class="search-input" 
                                placeholder="Search items in cart..." 
                                value="${e.cartSearchQuery}"
                                oninput="window.handleCartSearch(event)"
                                style="width: 100%;"
                            >
                            <button class="search-btn" onclick="window.clearCartSearch()">
                                ${e.cartSearchQuery?`
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                `:`
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                `}
                            </button>
                        </div>
                    `:""}
                </div>
                
                <div class="cart-search-message" style="${e.cartSearchQuery&&r.length===0?"":"display: none;"}">
                    ${e.cartSearchQuery&&r.length===0?`
                        <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                            No items found for "${e.cartSearchQuery}"
                        </p>
                    `:""}
                </div>
                
            <div class="cart-items">
                ${r.map(t=>{const s=e.products.filter(o=>o.category===t.category&&o.id!==t.id).slice(0,4);return`
                    <div style="display: flex; flex-direction: column; background: var(--surface); border-bottom: 1px solid var(--border);">
                        <div class="cart-item" style="border-bottom: none;">
                            <input type="checkbox" 
                                style="width: 20px; height: 20px; margin-right: 1rem; cursor: pointer; accent-color: var(--primary);"
                                ${t.selected!==!1?"checked":""}
                                onchange="window.toggleCartItem(${t.id})"
                            >
                            <img src="${t.image}" alt="${t.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                            <div style="flex: 1;">
                                <h3 style="font-size: 1rem;">${t.name}</h3>
                                <p class="text-muted">${u(t.price)}</p>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem; margin-right: 2rem;">
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${t.id}, ${t.quantity-1})">-</button>
                                <span>${t.quantity}</span>
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${t.id}, ${t.quantity+1})">+</button>
                            </div>
                            
                            <div class="cart-item-actions">
                                <button class="btn-delete" onclick="window.removeFromCart(${t.id})">Delete</button>
                                <button class="btn-find-similar" onclick="window.toggleFindSimilar(${t.id})">
                                    Find Similar 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${t.showSimilar?"rotate(180deg)":"rotate(0deg)"}; transition: transform 0.2s;">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="similar-products-dropdown ${t.showSimilar?"show":""}">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h4 style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Similar Products</h4>
                                <button onclick="window.toggleFindSimilar(${t.id})" style="background: none; border: none; cursor: pointer;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            ${s.length>0?`
                                <div class="similar-products-grid">
                                    ${s.map(o=>`
                                        <div class="similar-product-card" onclick="window.viewProduct(${o.id})">
                                            <img src="${o.image}" alt="${o.name}" class="similar-product-image">
                                            <div class="similar-product-title" title="${o.name}">${o.name}</div>
                                            <div class="similar-product-price">${u(o.price)}</div>
                                        </div>
                                    `).join("")}
                                </div>
                            `:'<p class="text-muted text-center">No similar products found.</p>'}
                        </div>
                    </div>
                `}).join("")}
            </div>
            <div class="cart-summary">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                    <span>Total</span>
                    <span>${u(e.cart.reduce((t,s)=>t+(s.selected!==!1?s.price*s.quantity:0),0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${e.cart.filter(t=>t.selected!==!1).length})
                </button>

            </div>
        </div>
        </div>
    `};window.updateOrderStatus=(r,t)=>{const s=e.orders.find(o=>o.id===r);s&&(s.status=t,m(),c(`Order #${r} updated to ${t}`),p())};window.toggleSelectAll=r=>{document.querySelectorAll(".product-checkbox").forEach(s=>s.checked=r.checked)};window.bulkAction=r=>{const t=document.querySelectorAll(".product-checkbox:checked"),s=Array.from(t).map(o=>parseInt(o.value));if(s.length===0){c("No products selected");return}r==="delete"?confirm(`Delete ${s.length} products?`)&&(e.products=e.products.filter(o=>!s.includes(o.id)),m(),p(),c("Products deleted")):r==="restock"&&(e.products.forEach(o=>{s.includes(o.id)&&(o.stock+=10)}),m(),p(),c("Products restocked"))};window.viewOrderDetails=r=>{const t=e.orders.find(a=>a.id===r);if(!t)return;const s=e.users.find(a=>a.id===t.userId),o=`
        <div class="modal-overlay show" id="orderModal" onclick="if(event.target === this) window.closeModal()">
            <div class="modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Order #${t.id}</h3>
                    <button class="btn-icon" onclick="window.closeModal()">✕</button>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Customer:</strong> ${s?s.name:"Unknown"}</p>
                    <p><strong>Date:</strong> ${t.date}</p>
                    <p><strong>Status:</strong> <span class="badge badge-${t.status==="Delivered"?"success":"warning"}">${t.status}</span></p>
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
                        ${t.items.map(a=>`
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 0.5rem;">${a.name}</td>
                                <td style="padding: 0.5rem;">${a.quantity}</td>
                                <td style="padding: 0.5rem;">${u(a.price)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${u(t.total)}
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",o)};window.closeModal=()=>{const r=document.getElementById("orderModal");r&&r.remove()};const D=()=>{if(!e.currentUser||e.currentUser.role!=="admin")return g("home"),"";const r=e.orders.reduce((i,w)=>i+w.total,0),t=e.orders.length;e.products.length;const s=e.users.filter(i=>i.role==="customer").length,o=e.products.filter(i=>i.stock<10);e.products.filter(i=>i.stock===0);const a=e.orders.slice(0,5),n=t>0?r/t:0,d={};e.products.forEach(i=>{d[i.category]=(d[i.category]||0)+1});const l=Object.entries(d).map(([i,w])=>({name:i,count:w})),h=[450,720,550,890,600,950,1200],C=Math.max(...h);return`
        <div class="admin-container">
            <div class="admin-header">
                <div style="display: flex; align-items: center;">
                    <h1>📊 Admin Dashboard</h1>
                </div>
                <div class="admin-actions" style="display: flex; align-items: center;">
                    <div class="notification-bell" onclick="window.showToast('No new notifications')">
                        🔔
                        ${o.length>0?`<span class="notification-badge">${o.length}</span>`:""}
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
                        ${h.map(i=>`
                            <div class="chart-bar" style="height: ${i/C*100}%" data-value="${u(i)}"></div>
                        `).join("")}
                    </div>
                </div>

                <!-- Category Distribution -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🥧 Categories</h3>
                    </div>
                    <div class="donut-chart">
                        <div class="donut-hole">
                            ${l.length} Cats
                        </div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        ${l.slice(0,3).map(i=>`<span class="badge badge-info">${i.name}: ${i.count}</span>`).join("")}
                    </div>
                </div>

                <!-- Top Products -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🏆 Top Products</h3>
                    </div>
                    <div class="top-products-list">
                        ${e.products.slice(0,4).map(i=>`
                            <div class="top-product-item">
                                <img src="${i.image}" style="width: 32px; height: 32px; object-fit: contain;">
                                <div style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                                        <span>${i.name}</span>
                                        <span>${u(i.price)}</span>
                                    </div>
                                    <div class="progress-bar-bg">
                                        <div class="progress-bar-fill" style="width: ${Math.random()*40+60}%"></div>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>

            <!-- Key Metrics -->
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">💰</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Revenue</div>
                        <div class="metric-value">${u(r)}</div>
                        <div class="metric-change positive">+15.3%</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">🛍️</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Orders</div>
                        <div class="metric-value">${t}</div>
                        <div class="metric-change positive">+8 new today</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">👥</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Customers</div>
                        <div class="metric-value">${s}</div>
                        <div class="metric-change">2 new this week</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">📊</div>
                    <div class="metric-content">
                        <div class="metric-label">Avg. Order Value</div>
                        <div class="metric-value">${u(n)}</div>
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
                            ${a.length>0?a.map(i=>{const w=e.users.find(P=>P.id===i.userId);return`
                                    <tr>
                                        <td><strong>#${i.orderId}</strong></td>
                                        <td>${new Date(i.createdAt).toLocaleDateString()}</td>
                                        <td>${w?w.name:"Unknown (ID: "+i.userId+")"}</td>
                                        <td>${i.items.length} items</td>
                                        <td><strong>${u(i.total)}</strong></td>
                                        <td>
                                            <select class="status-select" onchange="window.updateOrderStatus('${i.orderId}', this.value)">
                                                <option value="Pending" ${i.status==="Pending"?"selected":""}>Pending</option>
                                                <option value="Shipped" ${i.status==="Shipped"?"selected":""}>Shipped</option>
                                                <option value="Delivered" ${i.status==="Delivered"?"selected":""}>Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button class="btn-icon" onclick="window.viewOrderDetails('${i.orderId}')" title="Quick View">👁️</button>
                                        </td>
                                    </tr>
                                `}).join(""):'<tr><td colspan="7" class="text-center text-muted">No orders yet</td></tr>'}
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
                            ${e.products.map(i=>`
                                <tr>
                                    <td><input type="checkbox" class="product-checkbox" value="${i.id}"></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${i.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${i.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${i.category}</span></td>
                                    <td>${u(i.price)}</td>
                                    <td>
                                        <span class="stock-badge ${i.stock<10?"low":""} ${i.stock===0?"out":""}" style="${i.stock<10?"color: var(--danger); font-weight: bold;":""}">
                                            ${i.stock}
                                        </span>
                                    </td>
                                    <td>${i.stock>0?Math.floor(i.stock/2)+" days":"Out of Stock"}</td>
                                    <td>
                                        <button class="btn-icon" onclick="window.showToast('Editing ${i.name}...')" title="Edit">✏️</button>
                                        <button class="btn-icon danger" onclick="window.deleteProduct(${i.id})" title="Delete">🗑️</button>
                                    </td>
                                </tr>
                            `).join("")}
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
                            ${e.users.filter(i=>i.role==="customer").slice(0,3).map(i=>`
                                <li style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                                    <span>${i.name}</span>
                                    <span style="font-weight: bold; color: var(--primary);">$${(Math.random()*500+100).toFixed(2)}</span>
                                </li>
                            `).join("")}
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
    `};window.navigate=g;window.handleSort=r=>{e.sortBy=r,p()};window.viewProduct=r=>{e.currentProductId=r,g("product-detail")};window.adjustDetailQty=r=>{const t=document.getElementById("detailQty");let s=parseInt(t.value)+r;s<1&&(s=1),t.value=s};window.addToCartFromDetail=r=>{const t=parseInt(document.getElementById("detailQty").value);if(!e.currentUser){c("Please login to shop"),g("login");return}const s=e.products.find(a=>a.id===r),o=e.cart.find(a=>a.id===r);o?o.quantity+=t:e.cart.push({...s,quantity:t}),m(),c(`Added ${t} item(s) to cart`)};window.addToCart=r=>{if(!e.currentUser){c("Please login to shop"),g("login");return}const t=e.products.find(o=>o.id===r),s=e.cart.find(o=>o.id===r);s?s.quantity+=1:e.cart.push({...t,quantity:1}),m(),p(),c("Added to cart")};window.updateQuantity=(r,t)=>{if(t<1){window.removeFromCart(r);return}const s=e.cart.find(o=>o.id===r);s&&(s.quantity=t,m(),p())};window.removeFromCart=r=>{e.cart=e.cart.filter(t=>t.id!==r),m(),p()};window.checkout=async()=>{if(e.cart.length===0)return;if(!e.currentUser){c("Please login to checkout"),g("login");return}const r=e.cart.filter(s=>s.selected!==!1);if(r.length===0){c("No items selected for checkout");return}const t={userId:e.currentUser.id,items:r.map(s=>({productId:s.id,quantity:s.quantity,price:s.price,name:s.name})),total:r.reduce((s,o)=>s+o.price*o.quantity,0)};try{await v.createOrder(t),g("home")}catch{}};window.handleSearchInput=r=>{const t=r.target.value;if(e.searchQuery=t,t.trim()){const s=new Set;e.products.forEach(o=>{const a=o.name.toLowerCase(),n=o.category.toLowerCase(),d=t.toLowerCase();a.includes(d)&&s.add(o.name),n.includes(d)&&s.add(o.category),a.split(" ").forEach(h=>{h.toLowerCase().startsWith(d)&&h.length>2&&s.add(h.charAt(0).toUpperCase()+h.slice(1))})}),e.searchSuggestions=Array.from(s).slice(0,8),e.showSuggestions=!0}else if(e.searchSuggestions=[],e.showSuggestions=!1,e.route==="home"||e.route==="products"){p();return}S()};function S(){const r=document.querySelector(".search-container");if(!r)return;const t=r.querySelector(".search-suggestions");if(t&&t.remove(),e.showSuggestions&&e.searchQuery){const s=`
            <div class="search-suggestions" id="searchSuggestions">
                <div class="suggestions-header">Suggestions</div>
                ${e.searchSuggestions.slice(0,5).map(o=>`
                    <div class="suggestion-item" onclick="window.selectSuggestion('${o.replace(/'/g,"\\'")}')"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <span>${o}</span>
                    </div>
                `).join("")}
                ${e.searchQuery?`
                    <div class="suggestion-search-all" onclick="window.handleSearch()">
                        Search for "${e.searchQuery}" →
                    </div>
                `:""}
            </div>
        `;r.insertAdjacentHTML("beforeend",s)}}window.showSearchSuggestions=()=>{e.searchQuery&&(e.showSuggestions=!0,S())};window.selectSuggestion=r=>{e.searchQuery=r,e.showSuggestions=!1;const t=document.getElementById("searchInput");t&&(t.value=r),handleSearch()};window.handleSearch=()=>{e.showSuggestions=!1;const r=document.getElementById("searchInput");r&&(e.searchQuery=r.value.trim()),g("products"),setTimeout(()=>{const t=document.querySelector(".product-grid");t&&t.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{e.searchQuery="",e.showSuggestions=!1,e.searchSuggestions=[],p()};document.addEventListener("click",r=>{if(!r.target.closest(".search-container")&&e.showSuggestions){e.showSuggestions=!1;const t=document.querySelector(".search-suggestions");t&&t.remove()}});window.handleLogin=async r=>{console.log("Login attempt started"),r.preventDefault();const t=r.target.email.value,s=r.target.password.value;console.log("Credentials:",{email:t,password:s});try{await v.login(t,s),console.log("Login successful")}catch(o){console.error("Login error:",o)}};window.handleSignup=async r=>{console.log("Signup attempt started"),r.preventDefault();const t=r.target.name.value,s=r.target.email.value,o=r.target.password.value;try{await v.register(t,s,o)}catch(a){console.error("Signup error:",a)}};window.logout=()=>{e.currentUser=null,e.cart=[],localStorage.removeItem("currentUser"),localStorage.removeItem("cart_v2"),c("Logged out successfully"),g("home")};window.deleteProduct=r=>{confirm("Are you sure you want to remove this product?")&&(e.products=e.products.filter(t=>t.id!==r),m(),p(),c("Product removed"))};const p=()=>{const r=document.getElementById("app");let t="";switch(e.route){case"home":t=x();break;case"products":t=j();break;case"product-detail":t=O();break;case"login":t=A();break;case"signup":t=T();break;case"cart":t=q();break;case"admin":t=D();break;default:t=x()}r.innerHTML=`
        ${Q()}
        <main>
            ${t}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `};window.handleCartSearch=r=>{e.cartSearchQuery=r.target.value,b()};window.clearCartSearch=()=>{e.cartSearchQuery="",b()};window.toggleCartItem=r=>{const t=e.cart.find(s=>s.id===r);t&&(t.selected=t.selected===!1,m(),b())};window.toggleFindSimilar=r=>{const t=e.cart.find(s=>s.id===r);t&&(e.cart.forEach(s=>{s.id!==r&&(s.showSimilar=!1)}),t.showSimilar=!t.showSimilar,m(),b())};function b(){const r=document.querySelector(".cart-items"),t=document.querySelector(".cart-summary"),s=document.querySelector(".cart-search-message");if(!r)return;let o=e.cart;if(e.cartSearchQuery&&(o=e.cart.filter(n=>n.name.toLowerCase().includes(e.cartSearchQuery.toLowerCase())||n.category.toLowerCase().includes(e.cartSearchQuery.toLowerCase()))),r.innerHTML=o.map(n=>{const d=e.products.filter(l=>l.category===n.category&&l.id!==n.id).slice(0,4);return`
        <div style="display: flex; flex-direction: column; background: var(--surface); border-bottom: 1px solid var(--border);">
            <div class="cart-item" style="border-bottom: none;">
                <input type="checkbox" 
                    style="width: 20px; height: 20px; margin-right: 1rem; cursor: pointer; accent-color: var(--primary);"
                    ${n.selected!==!1?"checked":""}
                    onchange="window.toggleCartItem(${n.id})"
                >
                <img src="${n.image}" alt="${n.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                <div style="flex: 1;">
                    <h3 style="font-size: 1rem;">${n.name}</h3>
                    <p class="text-muted">${u(n.price)}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-right: 2rem;">
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${n.id}, ${n.quantity-1})">-</button>
                    <span>${n.quantity}</span>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${n.id}, ${n.quantity+1})">+</button>
                </div>
                
                <div class="cart-item-actions">
                    <button class="btn-delete" onclick="window.removeFromCart(${n.id})">Delete</button>
                    <button class="btn-find-similar" onclick="window.toggleFindSimilar(${n.id})">
                        Find Similar 
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${n.showSimilar?"rotate(180deg)":"rotate(0deg)"}; transition: transform 0.2s;">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="similar-products-dropdown ${n.showSimilar?"show":""}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4 style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Similar Products</h4>
                    <button onclick="window.toggleFindSimilar(${n.id})" style="background: none; border: none; cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                ${d.length>0?`
                    <div class="similar-products-grid">
                        ${d.map(l=>`
                            <div class="similar-product-card" onclick="window.viewProduct(${l.id})">
                                <img src="${l.image}" alt="${l.name}" class="similar-product-image">
                                <div class="similar-product-title" title="${l.name}">${l.name}</div>
                                <div class="similar-product-price">${u(l.price)}</div>
                            </div>
                        `).join("")}
                    </div>
                `:'<p class="text-muted text-center">No similar products found.</p>'}
            </div>
        </div>
    `}).join(""),t){const n=e.cart.reduce((l,h)=>l+(h.selected!==!1?h.price*h.quantity:0),0),d=e.cart.filter(l=>l.selected!==!1).length;t.innerHTML=`
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${u(n)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${d})
            </button>
        `}s&&(e.cartSearchQuery&&o.length===0?(s.innerHTML=`
                <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                    No items found for "${e.cartSearchQuery}"
                </p>
            `,s.style.display="block"):s.style.display="none");const a=document.querySelector("#cartSearchInput + .search-btn");a&&(a.innerHTML=e.cartSearchQuery?`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `:`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `)}const U=async()=>{await v.getProducts(),e.currentUser?.role==="admin"&&await Promise.all([v.getOrders(),v.getUsers()]),p()};U();
