(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const L="https://lumina-production-a4bb.up.railway.app",I="http://localhost:3000",k=window.location.hostname==="jlfuertes14.github.io",$=k?`${L}/api`:`${I}/api`;async function y(s,e={}){const r=`${$}${s}`;try{const i=await fetch(r,{...e,headers:{"Content-Type":"application/json",...e.headers}}),o=await i.json();if(!i.ok)throw new Error(o.error||o.message||"API request failed");return o}catch(i){throw console.error("API Error:",i),i}}console.log(`🌍 Environment: ${k?"PRODUCTION":"DEVELOPMENT"}`);console.log(`🔗 API URL: ${$}`);const t={products:[],users:[],orders:[],currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:"home",searchQuery:"",showSuggestions:!1,searchSuggestions:[],currentProductId:null,sortBy:"featured",filterCategory:null,cartSearchQuery:"",isLoading:!1},w={getProducts:async()=>{try{const s=await y("/products");t.products=s.data,p()}catch(s){console.error("Failed to load products:",s),c("Failed to load products")}},login:async(s,e)=>{console.log("Calling API login...");try{const r=await y("/users/login",{method:"POST",body:JSON.stringify({email:s,password:e})});t.currentUser=r.data,localStorage.setItem("currentUser",JSON.stringify(t.currentUser)),c(`Welcome back, ${t.currentUser.name}!`),g("home")}catch(r){throw c(r.message||"Login failed"),r}},register:async(s,e,r)=>{try{const i=await y("/users/register",{method:"POST",body:JSON.stringify({name:s,email:e,password:r})});t.currentUser=i.data,localStorage.setItem("currentUser",JSON.stringify(t.currentUser)),c("Account created successfully!"),g("home")}catch(i){throw c(i.message||"Registration failed"),i}},createOrder:async s=>{try{const e=await y("/orders",{method:"POST",body:JSON.stringify(s)});return t.cart=[],m(),c("Order placed successfully!"),t.currentUser.role==="admin"&&w.getOrders(),e.data}catch(e){throw c(e.message||"Failed to place order"),e}},getOrders:async()=>{if(!(!t.currentUser||t.currentUser.role!=="admin"))try{const s=await y("/orders");t.orders=s.data,p()}catch(s){console.error("Failed to load orders:",s)}}},m=()=>{localStorage.setItem("currentUser",JSON.stringify(t.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(t.cart))},u=s=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(s),c=s=>{const e=document.createElement("div");e.className="toast",e.textContent=s,document.body.appendChild(e),setTimeout(()=>e.classList.add("show"),100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.remove(),300)},3e3)},g=s=>{t.route=s,p(),window.scrollTo(0,0)},Q=()=>{const s=t.cart.reduce((o,n)=>o+n.quantity,0),e=!!t.currentUser,r=t.currentUser?.role==="admin";return`
        <header>
            <div class="header-top">
                <a href="#" class="logo" onclick="window.navigate('home'); return false;">
                    Lumina<span>Electronics</span>
                </a>
                
                ${t.route==="cart"?"":`
                    <div class="search-bar">
                        <div class="search-container">
                            <input 
                                type="text" 
                                id="searchInput" 
                                class="search-input" 
                                placeholder="Search for Products..." 
                                value="${t.searchQuery}"
                                oninput="window.handleSearchInput(event)"
                                onkeyup="if(event.key === 'Enter') window.handleSearch()"
                                onfocus="window.showSearchSuggestions()"
                            >
                            <button class="search-btn" onclick="window.handleSearch()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                            ${t.showSuggestions&&t.searchQuery?`
                                <div class="search-suggestions" id="searchSuggestions">
                                    <div class="suggestions-header">Suggestions</div>
                                    ${t.searchSuggestions.slice(0,5).map(o=>`
                                        <div class="suggestion-item" onclick="window.selectSuggestion('${o.replace(/'/g,"\\'")}')"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                            <span>${o}</span>
                                        </div>
                                    `).join("")}
                                    ${t.searchQuery?`
                                        <div class="suggestion-search-all" onclick="window.handleSearch()">
                                            Search for "${t.searchQuery}" →
                                        </div>
                                    `:""}
                                </div>
                            `:""}
                        </div>
                    </div>
                `}

                <div class="nav-actions">
                    ${r?"":`
                    <a href="#" class="action-icon" onclick="window.navigate('cart'); return false;">
                        <div style="position: relative;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            ${s>0?`<span class="cart-count">${s}</span>`:""}
                        </div>
                        <span>Cart</span>
                    </a>
                    `}
                    
                    ${e?`
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
                <a href="#" class="nav-link ${t.route==="home"?"active":""}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${t.route==="products"?"active":""}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link">Brands</a>
                <a href="#" class="nav-link">Deals</a>
                <a href="#" class="nav-link">Support</a>
                ${r?`<a href="#" class="nav-link ${t.route==="admin"?"active":""}" onclick="window.navigate('admin'); return false;">Admin Dashboard</a>`:""}
            </nav>
        </header>
    `},f=s=>{const e=s.stock<10,r=e?"low-stock":"",i=e?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${s.id})" style="cursor: pointer;">
            <div class="product-badge ${r}">${i}</div>
            <div class="product-image">
                <img src="${s.image}" alt="${s.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${s.category}</div>
                <h3 class="product-title">${s.name}</h3>
                <div class="product-price">${u(s.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${s.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},O=()=>{const s=t.products.find(o=>o.id===t.currentProductId);if(!s)return g("home"),"";s.stock<10;const e=s.stock>0?"In Stock":"Out of Stock",r=s.stock>0?"var(--success)":"var(--danger)",i=t.products.filter(o=>o.id!==s.id).sort(()=>.5-Math.random()).slice(0,4);return`
        <div class="product-detail-container">
            <div class="breadcrumbs">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a> &gt; 
                <a href="#" onclick="window.navigate('products'); return false;">Products</a> &gt; 
                <span>${s.name}</span>
            </div>

            <div class="product-main">
                <div class="product-gallery">
                    <img src="${s.image}" alt="${s.name}">
                </div>

                <div class="product-details-info">
                    <div class="product-sku">SKU: LUM-${s.id.toString().padStart(4,"0")}</div>
                    <h1 class="detail-title">${s.name}</h1>
                    <div class="detail-price">${u(s.price)}</div>

                    <div class="detail-section">
                        <span class="detail-label">Description</span>
                        <p style="color: var(--text-muted); line-height: 1.6;">${s.description}</p>
                    </div>

                    <div class="detail-section">
                        <span class="detail-label">Quantity</span>
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="window.adjustDetailQty(-1)">-</button>
                            <input type="number" id="detailQty" class="qty-input" value="1" min="1" max="${s.stock}" readonly>
                            <button class="qty-btn" onclick="window.adjustDetailQty(1)">+</button>
                        </div>
                    </div>

                    <button class="btn-add-large" onclick="window.addToCartFromDetail(${s.id})">
                        Add To Cart
                    </button>

                    <div class="stock-status" style="color: ${r}">
                        <span class="stock-dot" style="background-color: ${r}"></span>
                        ${e} (${s.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${i.map(f).join("")}
                </div>
            </div>
        </div>
    `},x=()=>{if(t.searchQuery){const r=t.products.filter(i=>i.name.toLowerCase().includes(t.searchQuery.toLowerCase())||i.category.toLowerCase().includes(t.searchQuery.toLowerCase())||i.description.toLowerCase().includes(t.searchQuery.toLowerCase()));return`
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
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${r.length} result${r.length!==1?"s":""} for "${t.searchQuery}"</p>
                ${r.length>0?`
                    <div class="product-grid">
                        ${r.map(f).join("")}
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
        `}const s=[1,6,2,12,4];return`
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
                ${t.products.filter(r=>s.includes(r.id)).sort((r,i)=>s.indexOf(r.id)-s.indexOf(i.id)).map(f).join("")}
            </div>
        </div>
    `},j=()=>{let s=[...t.products];switch(t.searchQuery&&(s=s.filter(e=>e.name.toLowerCase().includes(t.searchQuery.toLowerCase())||e.category.toLowerCase().includes(t.searchQuery.toLowerCase())||e.description.toLowerCase().includes(t.searchQuery.toLowerCase()))),t.sortBy){case"price-asc":s.sort((e,r)=>e.price-r.price);break;case"price-desc":s.sort((e,r)=>r.price-e.price);break;case"name-asc":s.sort((e,r)=>e.name.localeCompare(r.name));break;case"name-desc":s.sort((e,r)=>r.name.localeCompare(e.name));break;case"featured":default:s.sort((e,r)=>e.id-r.id);break}return`
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
                        <span style="color: var(--text-muted); font-size: 0.9rem;">${s.length} products</span>
                    </div>
                    
                    <div class="sort-container">
                        <span class="sort-label">Sort by:</span>
                        <select class="sort-select" onchange="window.handleSort(this.value)">
                            <option value="featured" ${t.sortBy==="featured"?"selected":""}>Featured</option>
                            <option value="price-asc" ${t.sortBy==="price-asc"?"selected":""}>Price: Low to High</option>
                            <option value="price-desc" ${t.sortBy==="price-desc"?"selected":""}>Price: High to Low</option>
                            <option value="name-asc" ${t.sortBy==="name-asc"?"selected":""}>Alphabetical: A-Z</option>
                            <option value="name-desc" ${t.sortBy==="name-desc"?"selected":""}>Alphabetical: Z-A</option>
                        </select>
                    </div>
                </div>
            </div>

            ${t.searchQuery?`
                <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: var(--surface); border-radius: 8px; margin-bottom: 1.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>
                        Showing results for <strong>"${t.searchQuery}"</strong>
                    </span>
                </div>
            `:""}

            <div class="product-grid">
                ${s.map(f).join("")}
            </div>
        </div>
    `},T=()=>`
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
    `,q=()=>`
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
    `,A=()=>{if(t.cart.length===0)return`
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('products')">Start Shopping</button>
            </div>
        `;let s=t.cart;return t.cartSearchQuery&&(s=t.cart.filter(e=>e.name.toLowerCase().includes(t.cartSearchQuery.toLowerCase())||e.category.toLowerCase().includes(t.cartSearchQuery.toLowerCase()))),t.cart.reduce((e,r)=>e+r.price*r.quantity,0),`
        <div style="margin: 2rem auto; padding: 0 2rem;">
            <button class="btn btn-outline" onclick="window.navigate('products')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                ← Continue Shopping
            </button>
            
            <div class="cart-container">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0;">Shopping Cart</h2>
                    
                    ${t.cart.length>0?`
                        <div class="search-container" style="max-width: 400px; flex: 1;">
                            <input 
                                type="text" 
                                id="cartSearchInput" 
                                class="search-input" 
                                placeholder="Search items in cart..." 
                                value="${t.cartSearchQuery}"
                                oninput="window.handleCartSearch(event)"
                                style="width: 100%;"
                            >
                            <button class="search-btn" onclick="window.clearCartSearch()">
                                ${t.cartSearchQuery?`
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
                
                <div class="cart-search-message" style="${t.cartSearchQuery&&s.length===0?"":"display: none;"}">
                    ${t.cartSearchQuery&&s.length===0?`
                        <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                            No items found for "${t.cartSearchQuery}"
                        </p>
                    `:""}
                </div>
                
            <div class="cart-items">
                ${s.map(e=>{const r=t.products.filter(i=>i.category===e.category&&i.id!==e.id).slice(0,4);return`
                    <div style="display: flex; flex-direction: column; background: var(--surface); border-bottom: 1px solid var(--border);">
                        <div class="cart-item" style="border-bottom: none;">
                            <input type="checkbox" 
                                style="width: 20px; height: 20px; margin-right: 1rem; cursor: pointer; accent-color: var(--primary);"
                                ${e.selected!==!1?"checked":""}
                                onchange="window.toggleCartItem(${e.id})"
                            >
                            <img src="${e.image}" alt="${e.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                            <div style="flex: 1;">
                                <h3 style="font-size: 1rem;">${e.name}</h3>
                                <p class="text-muted">${u(e.price)}</p>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem; margin-right: 2rem;">
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${e.id}, ${e.quantity-1})">-</button>
                                <span>${e.quantity}</span>
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${e.id}, ${e.quantity+1})">+</button>
                            </div>
                            
                            <div class="cart-item-actions">
                                <button class="btn-delete" onclick="window.removeFromCart(${e.id})">Delete</button>
                                <button class="btn-find-similar" onclick="window.toggleFindSimilar(${e.id})">
                                    Find Similar 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${e.showSimilar?"rotate(180deg)":"rotate(0deg)"}; transition: transform 0.2s;">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="similar-products-dropdown ${e.showSimilar?"show":""}">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h4 style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Similar Products</h4>
                                <button onclick="window.toggleFindSimilar(${e.id})" style="background: none; border: none; cursor: pointer;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            ${r.length>0?`
                                <div class="similar-products-grid">
                                    ${r.map(i=>`
                                        <div class="similar-product-card" onclick="window.viewProduct(${i.id})">
                                            <img src="${i.image}" alt="${i.name}" class="similar-product-image">
                                            <div class="similar-product-title" title="${i.name}">${i.name}</div>
                                            <div class="similar-product-price">${u(i.price)}</div>
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
                    <span>${u(t.cart.reduce((e,r)=>e+(r.selected!==!1?r.price*r.quantity:0),0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${t.cart.filter(e=>e.selected!==!1).length})
                </button>

            </div>
        </div>
        </div>
    `};window.updateOrderStatus=(s,e)=>{const r=t.orders.find(i=>i.id===s);r&&(r.status=e,m(),c(`Order #${s} updated to ${e}`),p())};window.toggleSelectAll=s=>{document.querySelectorAll(".product-checkbox").forEach(r=>r.checked=s.checked)};window.bulkAction=s=>{const e=document.querySelectorAll(".product-checkbox:checked"),r=Array.from(e).map(i=>parseInt(i.value));if(r.length===0){c("No products selected");return}s==="delete"?confirm(`Delete ${r.length} products?`)&&(t.products=t.products.filter(i=>!r.includes(i.id)),m(),p(),c("Products deleted")):s==="restock"&&(t.products.forEach(i=>{r.includes(i.id)&&(i.stock+=10)}),m(),p(),c("Products restocked"))};window.viewOrderDetails=s=>{const e=t.orders.find(o=>o.id===s);if(!e)return;const r=t.users.find(o=>o.id===e.userId),i=`
        <div class="modal-overlay show" id="orderModal" onclick="if(event.target === this) window.closeModal()">
            <div class="modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Order #${e.id}</h3>
                    <button class="btn-icon" onclick="window.closeModal()">✕</button>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Customer:</strong> ${r?r.name:"Unknown"}</p>
                    <p><strong>Date:</strong> ${e.date}</p>
                    <p><strong>Status:</strong> <span class="badge badge-${e.status==="Delivered"?"success":"warning"}">${e.status}</span></p>
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
                        ${e.items.map(o=>`
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 0.5rem;">${o.name}</td>
                                <td style="padding: 0.5rem;">${o.quantity}</td>
                                <td style="padding: 0.5rem;">${u(o.price)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${u(e.total)}
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",i)};window.closeModal=()=>{const s=document.getElementById("orderModal");s&&s.remove()};const D=()=>{if(!t.currentUser||t.currentUser.role!=="admin")return g("home"),"";const s=t.orders.reduce((a,v)=>a+v.total,0),e=t.orders.length;t.products.length;const r=t.users.filter(a=>a.role==="customer").length,i=t.products.filter(a=>a.stock<10);t.products.filter(a=>a.stock===0);const o=t.orders.slice(0,5),n=e>0?s/e:0,d={};t.products.forEach(a=>{d[a.category]=(d[a.category]||0)+1});const l=Object.entries(d).map(([a,v])=>({name:a,count:v})),h=[450,720,550,890,600,950,1200],C=Math.max(...h);return`
        <div class="admin-container">
            <div class="admin-header">
                <div style="display: flex; align-items: center;">
                    <h1>📊 Admin Dashboard</h1>
                </div>
                <div class="admin-actions" style="display: flex; align-items: center;">
                    <div class="notification-bell" onclick="window.showToast('No new notifications')">
                        🔔
                        ${i.length>0?`<span class="notification-badge">${i.length}</span>`:""}
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
                        ${h.map(a=>`
                            <div class="chart-bar" style="height: ${a/C*100}%" data-value="${u(a)}"></div>
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
                        ${l.slice(0,3).map(a=>`<span class="badge badge-info">${a.name}: ${a.count}</span>`).join("")}
                    </div>
                </div>

                <!-- Top Products -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🏆 Top Products</h3>
                    </div>
                    <div class="top-products-list">
                        ${t.products.slice(0,4).map(a=>`
                            <div class="top-product-item">
                                <img src="${a.image}" style="width: 32px; height: 32px; object-fit: contain;">
                                <div style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                                        <span>${a.name}</span>
                                        <span>${u(a.price)}</span>
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
                        <div class="metric-value">${u(s)}</div>
                        <div class="metric-change positive">+15.3%</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">🛍️</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Orders</div>
                        <div class="metric-value">${e}</div>
                        <div class="metric-change positive">+8 new today</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">👥</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Customers</div>
                        <div class="metric-value">${r}</div>
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
                            ${o.length>0?o.map(a=>{const v=t.users.find(P=>P.id===a.userId);return`
                                    <tr>
                                        <td><strong>#${a.id}</strong></td>
                                        <td>${a.date}</td>
                                        <td>${v?v.name:"Unknown"}</td>
                                        <td>${a.items.length} items</td>
                                        <td><strong>${u(a.total)}</strong></td>
                                        <td>
                                            <select class="status-select" onchange="window.updateOrderStatus(${a.id}, this.value)">
                                                <option value="Pending" ${a.status==="Pending"?"selected":""}>Pending</option>
                                                <option value="Shipped" ${a.status==="Shipped"?"selected":""}>Shipped</option>
                                                <option value="Delivered" ${a.status==="Delivered"?"selected":""}>Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button class="btn-icon" onclick="window.viewOrderDetails(${a.id})" title="Quick View">👁️</button>
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
                            ${t.products.map(a=>`
                                <tr>
                                    <td><input type="checkbox" class="product-checkbox" value="${a.id}"></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${a.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${a.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${a.category}</span></td>
                                    <td>${u(a.price)}</td>
                                    <td>
                                        <span class="stock-badge ${a.stock<10?"low":""} ${a.stock===0?"out":""}" style="${a.stock<10?"color: var(--danger); font-weight: bold;":""}">
                                            ${a.stock}
                                        </span>
                                    </td>
                                    <td>${a.stock>0?Math.floor(a.stock/2)+" days":"Out of Stock"}</td>
                                    <td>
                                        <button class="btn-icon" onclick="window.showToast('Editing ${a.name}...')" title="Edit">✏️</button>
                                        <button class="btn-icon danger" onclick="window.deleteProduct(${a.id})" title="Delete">🗑️</button>
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
                            ${t.users.filter(a=>a.role==="customer").slice(0,3).map(a=>`
                                <li style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                                    <span>${a.name}</span>
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
    `};window.navigate=g;window.handleSort=s=>{t.sortBy=s,p()};window.viewProduct=s=>{t.currentProductId=s,g("product-detail")};window.adjustDetailQty=s=>{const e=document.getElementById("detailQty");let r=parseInt(e.value)+s;r<1&&(r=1),e.value=r};window.addToCartFromDetail=s=>{const e=parseInt(document.getElementById("detailQty").value);if(!t.currentUser){c("Please login to shop"),g("login");return}const r=t.products.find(o=>o.id===s),i=t.cart.find(o=>o.id===s);i?i.quantity+=e:t.cart.push({...r,quantity:e}),m(),c(`Added ${e} item(s) to cart`)};window.addToCart=s=>{if(!t.currentUser){c("Please login to shop"),g("login");return}const e=t.products.find(i=>i.id===s),r=t.cart.find(i=>i.id===s);r?r.quantity+=1:t.cart.push({...e,quantity:1}),m(),p(),c("Added to cart")};window.updateQuantity=(s,e)=>{if(e<1){window.removeFromCart(s);return}const r=t.cart.find(i=>i.id===s);r&&(r.quantity=e,m(),p())};window.removeFromCart=s=>{t.cart=t.cart.filter(e=>e.id!==s),m(),p()};window.checkout=async()=>{if(t.cart.length===0)return;if(!t.currentUser){c("Please login to checkout"),g("login");return}const s=t.cart.filter(r=>r.selected!==!1);if(s.length===0){c("No items selected for checkout");return}const e={items:s.map(r=>({productId:r.id,quantity:r.quantity,price:r.price,name:r.name})),total:s.reduce((r,i)=>r+i.price*i.quantity,0)};try{await w.createOrder(e),g("home")}catch{}};window.handleSearchInput=s=>{const e=s.target.value;if(t.searchQuery=e,e.trim()){const r=new Set;t.products.forEach(i=>{const o=i.name.toLowerCase(),n=i.category.toLowerCase(),d=e.toLowerCase();o.includes(d)&&r.add(i.name),n.includes(d)&&r.add(i.category),o.split(" ").forEach(h=>{h.toLowerCase().startsWith(d)&&h.length>2&&r.add(h.charAt(0).toUpperCase()+h.slice(1))})}),t.searchSuggestions=Array.from(r).slice(0,8),t.showSuggestions=!0}else if(t.searchSuggestions=[],t.showSuggestions=!1,t.route==="home"||t.route==="products"){p();return}S()};function S(){const s=document.querySelector(".search-container");if(!s)return;const e=s.querySelector(".search-suggestions");if(e&&e.remove(),t.showSuggestions&&t.searchQuery){const r=`
            <div class="search-suggestions" id="searchSuggestions">
                <div class="suggestions-header">Suggestions</div>
                ${t.searchSuggestions.slice(0,5).map(i=>`
                    <div class="suggestion-item" onclick="window.selectSuggestion('${i.replace(/'/g,"\\'")}')"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <span>${i}</span>
                    </div>
                `).join("")}
                ${t.searchQuery?`
                    <div class="suggestion-search-all" onclick="window.handleSearch()">
                        Search for "${t.searchQuery}" →
                    </div>
                `:""}
            </div>
        `;s.insertAdjacentHTML("beforeend",r)}}window.showSearchSuggestions=()=>{t.searchQuery&&(t.showSuggestions=!0,S())};window.selectSuggestion=s=>{t.searchQuery=s,t.showSuggestions=!1;const e=document.getElementById("searchInput");e&&(e.value=s),handleSearch()};window.handleSearch=()=>{t.showSuggestions=!1;const s=document.getElementById("searchInput");s&&(t.searchQuery=s.value.trim()),g("products"),setTimeout(()=>{const e=document.querySelector(".product-grid");e&&e.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{t.searchQuery="",t.showSuggestions=!1,t.searchSuggestions=[],p()};document.addEventListener("click",s=>{if(!s.target.closest(".search-container")&&t.showSuggestions){t.showSuggestions=!1;const e=document.querySelector(".search-suggestions");e&&e.remove()}});window.handleLogin=async s=>{console.log("Login attempt started"),s.preventDefault();const e=s.target.email.value,r=s.target.password.value;console.log("Credentials:",{email:e,password:r});try{await w.login(e,r),console.log("Login successful")}catch(i){console.error("Login error:",i)}};window.handleSignup=async s=>{console.log("Signup attempt started"),s.preventDefault();const e=s.target.name.value,r=s.target.email.value,i=s.target.password.value;try{await w.register(e,r,i)}catch(o){console.error("Signup error:",o)}};window.logout=()=>{t.currentUser=null,t.cart=[],localStorage.removeItem("currentUser"),localStorage.removeItem("cart_v2"),c("Logged out successfully"),g("home")};window.deleteProduct=s=>{confirm("Are you sure you want to remove this product?")&&(t.products=t.products.filter(e=>e.id!==s),m(),p(),c("Product removed"))};const p=()=>{const s=document.getElementById("app");let e="";switch(t.route){case"home":e=x();break;case"products":e=j();break;case"product-detail":e=O();break;case"login":e=T();break;case"signup":e=q();break;case"cart":e=A();break;case"admin":e=D();break;default:e=x()}s.innerHTML=`
        ${Q()}
        <main>
            ${e}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `};window.handleCartSearch=s=>{t.cartSearchQuery=s.target.value,b()};window.clearCartSearch=()=>{t.cartSearchQuery="",b()};window.toggleCartItem=s=>{const e=t.cart.find(r=>r.id===s);e&&(e.selected=e.selected===!1,m(),b())};window.toggleFindSimilar=s=>{const e=t.cart.find(r=>r.id===s);e&&(t.cart.forEach(r=>{r.id!==s&&(r.showSimilar=!1)}),e.showSimilar=!e.showSimilar,m(),b())};function b(){const s=document.querySelector(".cart-items"),e=document.querySelector(".cart-summary"),r=document.querySelector(".cart-search-message");if(!s)return;let i=t.cart;if(t.cartSearchQuery&&(i=t.cart.filter(n=>n.name.toLowerCase().includes(t.cartSearchQuery.toLowerCase())||n.category.toLowerCase().includes(t.cartSearchQuery.toLowerCase()))),s.innerHTML=i.map(n=>{const d=t.products.filter(l=>l.category===n.category&&l.id!==n.id).slice(0,4);return`
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
    `}).join(""),e){const n=t.cart.reduce((l,h)=>l+(h.selected!==!1?h.price*h.quantity:0),0),d=t.cart.filter(l=>l.selected!==!1).length;e.innerHTML=`
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${u(n)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${d})
            </button>
        `}r&&(t.cartSearchQuery&&i.length===0?(r.innerHTML=`
                <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                    No items found for "${t.cartSearchQuery}"
                </p>
            `,r.style.display="block"):r.style.display="none");const o=document.querySelector("#cartSearchInput + .search-btn");o&&(o.innerHTML=t.cartSearchQuery?`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `:`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `)}const B=async()=>{await w.getProducts(),t.currentUser?.role==="admin"&&await w.getOrders(),p()};B();
