(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function i(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=i(a);fetch(a.href,o)}})();const I="https://lumina-production-a4bb.up.railway.app",D="http://localhost:3000",k=window.location.hostname==="jlfuertes14.github.io",$=k?`${I}/api`:`${D}/api`;async function w(r,t={}){const i=`${$}${r}`;try{const s=await fetch(i,{...t,headers:{"Content-Type":"application/json",...t.headers}}),a=await s.json();if(!s.ok)throw new Error(a.error||a.message||"API request failed");return a}catch(s){throw console.error("API Error:",s),s}}console.log(`🌍 Environment: ${k?"PRODUCTION":"DEVELOPMENT"}`);console.log(`🔗 API URL: ${$}`);const e={products:[],users:[],orders:[],currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:"home",searchQuery:"",showSuggestions:!1,searchSuggestions:[],currentProductId:null,sortBy:"featured",filterCategory:null,cartSearchQuery:"",isLoading:!1,checkoutData:{shipping:{fullName:"",address:"",city:"",province:"",postalCode:"",phone:"",instructions:""},paymentMethod:"cod",shippingFee:50},lastOrderId:null},h={getProducts:async()=>{try{const r=await w("/products");e.products=r.data,m()}catch(r){console.error("Failed to load products:",r),l("Failed to load products")}},login:async(r,t)=>{console.log("Calling API login...");try{const i=await w("/users/login",{method:"POST",body:JSON.stringify({email:r,password:t})});e.currentUser=i.data,localStorage.setItem("currentUser",JSON.stringify(e.currentUser)),l(`Welcome back, ${e.currentUser.name}!`),p("home")}catch(i){throw l(i.message||"Login failed"),i}},register:async(r,t,i)=>{try{const s=await w("/users/register",{method:"POST",body:JSON.stringify({name:r,email:t,password:i})});e.currentUser=s.data,localStorage.setItem("currentUser",JSON.stringify(e.currentUser)),l("Account created successfully!"),p("home")}catch(s){throw l(s.message||"Registration failed"),s}},createOrder:async r=>{try{const t=await w("/orders",{method:"POST",body:JSON.stringify(r)});return e.cart=[],g(),l("Order placed successfully!"),e.currentUser.role==="admin"&&h.getOrders(),t.data}catch(t){throw l(t.message||"Failed to place order"),t}},getOrders:async()=>{if(!(!e.currentUser||e.currentUser.role!=="admin"))try{const r=await w("/orders");e.orders=r.data,m()}catch(r){console.error("Failed to load orders:",r)}},getUsers:async()=>{if(!(!e.currentUser||e.currentUser.role!=="admin"))try{const r=await w("/users");e.users=r.data,m()}catch(r){console.error("Failed to load users:",r)}}},g=()=>{localStorage.setItem("currentUser",JSON.stringify(e.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(e.cart))},d=r=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(r),l=r=>{const t=document.createElement("div");t.className="toast",t.textContent=r,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3e3)},p=r=>{e.route=r,m(),window.scrollTo(0,0)},L=()=>{const r=e.cart.reduce((a,o)=>a+o.quantity,0),t=!!e.currentUser,i=e.currentUser?.role==="admin";return`
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
                    ${i?"":`
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
                ${i?`<a href="#" class="nav-link ${e.route==="admin"?"active":""}" onclick="window.navigate('admin'); return false;">Admin Dashboard</a>`:""}
            </nav>
        </header>
    `},f=r=>{const t=r.stock<10,i=t?"low-stock":"",s=t?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${r.id})" style="cursor: pointer;">
            <div class="product-badge ${i}">${s}</div>
            <div class="product-image">
                <img src="${r.image}" alt="${r.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${r.category}</div>
                <h3 class="product-title">${r.name}</h3>
                <div class="product-price">${d(r.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${r.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},O=()=>{const r=e.products.find(a=>a.id===e.currentProductId);if(!r)return p("home"),"";r.stock<10;const t=r.stock>0?"In Stock":"Out of Stock",i=r.stock>0?"var(--success)":"var(--danger)",s=e.products.filter(a=>a.id!==r.id).sort(()=>.5-Math.random()).slice(0,4);return`
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
                    <div class="detail-price">${d(r.price)}</div>

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

                    <div class="stock-status" style="color: ${i}">
                        <span class="stock-dot" style="background-color: ${i}"></span>
                        ${t} (${r.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${s.map(f).join("")}
                </div>
            </div>
        </div>
    `},x=()=>{if(e.searchQuery){const i=e.products.filter(s=>s.name.toLowerCase().includes(e.searchQuery.toLowerCase())||s.category.toLowerCase().includes(e.searchQuery.toLowerCase())||s.description.toLowerCase().includes(e.searchQuery.toLowerCase()));return`
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
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${i.length} result${i.length!==1?"s":""} for "${e.searchQuery}"</p>
                ${i.length>0?`
                    <div class="product-grid">
                        ${i.map(f).join("")}
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
                ${e.products.filter(i=>r.includes(i.id)).sort((i,s)=>r.indexOf(i.id)-r.indexOf(s.id)).map(f).join("")}
            </div>
        </div>
    `},j=()=>{let r=[...e.products];switch(e.searchQuery&&(r=r.filter(t=>t.name.toLowerCase().includes(e.searchQuery.toLowerCase())||t.category.toLowerCase().includes(e.searchQuery.toLowerCase())||t.description.toLowerCase().includes(e.searchQuery.toLowerCase()))),e.sortBy){case"price-asc":r.sort((t,i)=>t.price-i.price);break;case"price-desc":r.sort((t,i)=>i.price-t.price);break;case"name-asc":r.sort((t,i)=>t.name.localeCompare(i.name));break;case"name-desc":r.sort((t,i)=>i.name.localeCompare(t.name));break;case"featured":default:r.sort((t,i)=>t.id-i.id);break}return`
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
    `},Q=()=>`
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
    `,A=()=>{if(e.cart.length===0)return`
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('products')">Start Shopping</button>
            </div>
        `;let r=e.cart;return e.cartSearchQuery&&(r=e.cart.filter(t=>t.name.toLowerCase().includes(e.cartSearchQuery.toLowerCase())||t.category.toLowerCase().includes(e.cartSearchQuery.toLowerCase()))),e.cart.reduce((t,i)=>t+i.price*i.quantity,0),`
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
                ${r.map(t=>{const i=e.products.filter(s=>s.category===t.category&&s.id!==t.id).slice(0,4);return`
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
                                <p class="text-muted">${d(t.price)}</p>
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
                            ${i.length>0?`
                                <div class="similar-products-grid">
                                    ${i.map(s=>`
                                        <div class="similar-product-card" onclick="window.viewProduct(${s.id})">
                                            <img src="${s.image}" alt="${s.name}" class="similar-product-image">
                                            <div class="similar-product-title" title="${s.name}">${s.name}</div>
                                            <div class="similar-product-price">${d(s.price)}</div>
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
                    <span>${d(e.cart.reduce((t,i)=>t+(i.selected!==!1?i.price*i.quantity:0),0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${e.cart.filter(t=>t.selected!==!1).length})
                </button>

            </div>
        </div>
        </div>
    `},T=()=>{if(!e.currentUser)return p("login"),"";const r=e.cart.filter(a=>a.selected!==!1);if(r.length===0)return l("No items selected for checkout"),p("cart"),"";const t=r.reduce((a,o)=>a+o.price*o.quantity,0),i=e.checkoutData.shippingFee,s=t+i;return`
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
                                    <input type="text" name="fullName" class="form-input" value="${e.checkoutData.shipping.fullName||e.currentUser.name}" required oninput="window.updateShippingInfo('fullName', this.value)">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Phone Number *</label>
                                    <input type="tel" name="phone" class="form-input" value="${e.checkoutData.shipping.phone}" required placeholder="09XX-XXX-XXXX" oninput="window.updateShippingInfo('phone', this.value)">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Address *</label>
                                <input type="text" name="address" class="form-input" value="${e.checkoutData.shipping.address}" required placeholder="Street address, house number" oninput="window.updateShippingInfo('address', this.value)">
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                                <div class="form-group">
                                    <label class="form-label">City *</label>
                                    <input type="text" name="city" class="form-input" value="${e.checkoutData.shipping.city}" required oninput="window.updateShippingInfo('city', this.value)">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Province *</label>
                                    <input type="text" name="province" class="form-input" value="${e.checkoutData.shipping.province}" required oninput="window.updateShippingInfo('province', this.value)">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Postal Code</label>
                                    <input type="text" name="postalCode" class="form-input" value="${e.checkoutData.shipping.postalCode}" placeholder="Optional" oninput="window.updateShippingInfo('postalCode', this.value)">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Delivery Instructions (Optional)</label>
                                <textarea name="instructions" class="form-input" rows="3" placeholder="Floor number, landmark, etc." oninput="window.updateShippingInfo('instructions', this.value)">${e.checkoutData.shipping.instructions}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="admin-section">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">💳 Payment Method</h2>
                        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem;">
                            ${[{id:"cod",label:"Cash on Delivery",image:"/lumina/images/payment/cod.png"},{id:"gcash",label:"GCash",image:"/lumina/images/payment/gcash.png"},{id:"maya",label:"Maya",image:"/lumina/images/payment/maya.png"},{id:"card",label:"Credit/Debit Card",image:"/lumina/images/payment/card.png"},{id:"bank",label:"Bank Transfer",image:"/lumina/images/payment/bank.png"}].map(a=>`
                                <div class="payment-method-card" onclick="window.selectPaymentMethod('${a.id}')" style="padding: 0.75rem; border: 2px solid ${e.checkoutData.paymentMethod===a.id?"var(--primary)":"var(--border)"}; border-radius: var(--radius-md); cursor: pointer; text-align: center; transition: all 0.2s; background: ${e.checkoutData.paymentMethod===a.id?"rgba(0, 43, 91, 0.05)":"var(--surface)"};">
                                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                                        <img src="${a.image}" alt="${a.label}" style="max-width: 100%; max-height: 48px; object-fit: contain;">
                                    </div>
                                    <div style="font-size: 0.75rem; font-weight: 600; line-height: 1.2;">${a.label}</div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="cart-summary" style="position: sticky; top: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Order Summary</h2>
                        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem;">
                            ${r.map(a=>`
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                                    <img src="${a.image}" alt="${a.name}" style="width: 60px; height: 60px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${a.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-muted);">Qty: ${a.quantity}</div>
                                    </div>
                                    <div style="font-weight: 700; color: var(--primary);">${d(a.price*a.quantity)}</div>
                                </div>
                            `).join("")}
                        </div>
                        <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Subtotal</span>
                                <span>${d(t)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Shipping Fee</span>
                                <span>${d(i)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                                <span>Total</span>
                                <span style="color: var(--primary);">${d(s)}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="window.placeOrder()" style="width: 100%; padding: 1rem; font-size: 1rem;">Place Order</button>
                        <div style="margin-top: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);">🔒 Your payment information is secure</div>
                    </div>
                </div>
            </div>
        </div>
    `},U=()=>{if(!e.lastOrderId)return p("home"),"";const r=e.orders.find(o=>o.orderId===e.lastOrderId);if(!r)return p("home"),"";const t=new Date,i=new Date(t);i.setDate(t.getDate()+3);const s=new Date(t);s.setDate(t.getDate()+5);const a=`${i.toLocaleDateString("en-US",{month:"short",day:"numeric"})} - ${s.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`;return`
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
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">#${r.orderId}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">Order Date</div>
                            <div style="font-weight: 600;">${new Date(r.createdAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">1</div>
                        <div style="font-weight: 600;">Estimated Delivery</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">${a}</div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">2</div>
                        <div style="font-weight: 600;">Payment Status</div>
                    </div>
                    <div style="padding-left: 2rem;">
                        <span class="badge badge-${e.checkoutData.paymentMethod==="cod"?"warning":"success"}" style="font-size: 0.875rem; padding: 0.375rem 0.75rem;">
                            ${e.checkoutData.paymentMethod==="cod"?"Cash on Delivery":"Payment Confirmed"}
                        </span>
                    </div>
                </div>

                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">3</div>
                        <div style="font-weight: 600;">Shipping Address</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">
                        ${e.checkoutData.shipping.fullName}<br>
                        ${e.checkoutData.shipping.address}<br>
                        ${e.checkoutData.shipping.city}, ${e.checkoutData.shipping.province} ${e.checkoutData.shipping.postalCode}<br>
                        ${e.checkoutData.shipping.phone}
                    </div>
                </div>
            </div>

            <div class="admin-section" style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Order Items</h3>
                ${r.items.map(o=>`
                    <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${o.productName||o.name}</div>
                            <div style="font-size: 0.875rem; color: var(--text-muted);">Quantity: ${o.quantity}</div>
                        </div>
                        <div style="font-weight: 700; color: var(--primary);">${d(o.price*o.quantity)}</div>
                    </div>
                `).join("")}
                <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                    <span>Total Amount</span>
                    <span style="color: var(--primary);">${d(r.total)}</span>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="window.printReceipt()" style="padding: 0.875rem 2rem;">🖨️ Print Receipt</button>
                <button class="btn btn-outline" onclick="window.navigate('home')" style="padding: 0.875rem 2rem;">🏠 Back to Shop</button>
            </div>

            <div style="text-align: center; margin-top: 3rem; padding: 1.5rem; background: var(--surface-alt); border-radius: var(--radius-md);">
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">An email confirmation has been sent to <strong>${e.currentUser.email}</strong></p>
                <p style="font-size: 0.875rem; color: var(--text-muted);">Questions? Contact us at support@luminaelectronics.com</p>
            </div>
        </div>
    `};window.updateOrderStatus=(r,t)=>{const i=e.orders.find(s=>s.id===r);i&&(i.status=t,g(),l(`Order #${r} updated to ${t}`),m())};window.toggleSelectAll=r=>{document.querySelectorAll(".product-checkbox").forEach(i=>i.checked=r.checked)};window.bulkAction=r=>{const t=document.querySelectorAll(".product-checkbox:checked"),i=Array.from(t).map(s=>parseInt(s.value));if(i.length===0){l("No products selected");return}r==="delete"?confirm(`Delete ${i.length} products?`)&&(e.products=e.products.filter(s=>!i.includes(s.id)),g(),m(),l("Products deleted")):r==="restock"&&(e.products.forEach(s=>{i.includes(s.id)&&(s.stock+=10)}),g(),m(),l("Products restocked"))};window.viewOrderDetails=r=>{const t=e.orders.find(a=>a.id===r);if(!t)return;const i=e.users.find(a=>a.id===t.userId),s=`
        <div class="modal-overlay show" id="orderModal" onclick="if(event.target === this) window.closeModal()">
            <div class="modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Order #${t.id}</h3>
                    <button class="btn-icon" onclick="window.closeModal()">✕</button>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Customer:</strong> ${i?i.name:"Unknown"}</p>
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
                                <td style="padding: 0.5rem;">${d(a.price)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${d(t.total)}
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",s)};window.closeModal=()=>{const r=document.getElementById("orderModal");r&&r.remove()};const M=()=>{if(!e.currentUser||e.currentUser.role!=="admin")return p("home"),"";const r=e.orders.reduce((n,y)=>n+y.total,0),t=e.orders.length;e.products.length;const i=e.users.filter(n=>n.role==="customer").length,s=e.products.filter(n=>n.stock<10);e.products.filter(n=>n.stock===0);const a=e.orders.slice(0,5),o=t>0?r/t:0,c={};e.products.forEach(n=>{c[n.category]=(c[n.category]||0)+1});const u=Object.entries(c).map(([n,y])=>({name:n,count:y})),v=[450,720,550,890,600,950,1200],C=Math.max(...v);return`
        <div class="admin-container">
            <div class="admin-header">
                <div style="display: flex; align-items: center;">
                    <h1>📊 Admin Dashboard</h1>
                </div>
                <div class="admin-actions" style="display: flex; align-items: center;">
                    <div class="notification-bell" onclick="window.showToast('No new notifications')">
                        🔔
                        ${s.length>0?`<span class="notification-badge">${s.length}</span>`:""}
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
                        ${v.map(n=>`
                            <div class="chart-bar" style="height: ${n/C*100}%" data-value="${d(n)}"></div>
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
                            ${u.length} Cats
                        </div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        ${u.slice(0,3).map(n=>`<span class="badge badge-info">${n.name}: ${n.count}</span>`).join("")}
                    </div>
                </div>

                <!-- Top Products -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🏆 Top Products</h3>
                    </div>
                    <div class="top-products-list">
                        ${e.products.slice(0,4).map(n=>`
                            <div class="top-product-item">
                                <img src="${n.image}" style="width: 32px; height: 32px; object-fit: contain;">
                                <div style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                                        <span>${n.name}</span>
                                        <span>${d(n.price)}</span>
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
                        <div class="metric-value">${d(r)}</div>
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
                        <div class="metric-value">${i}</div>
                        <div class="metric-change">2 new this week</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">📊</div>
                    <div class="metric-content">
                        <div class="metric-label">Avg. Order Value</div>
                        <div class="metric-value">${d(o)}</div>
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
                            ${a.length>0?a.map(n=>{const y=e.users.find(P=>P.id===n.userId);return`
                                    <tr>
                                        <td><strong>#${n.orderId}</strong></td>
                                        <td>${new Date(n.createdAt).toLocaleDateString()}</td>
                                        <td>${y?y.name:"Unknown (ID: "+n.userId+")"}</td>
                                        <td>${n.items.length} items</td>
                                        <td><strong>${d(n.total)}</strong></td>
                                        <td>
                                            <select class="status-select" onchange="window.updateOrderStatus('${n.orderId}', this.value)">
                                                <option value="Pending" ${n.status==="Pending"?"selected":""}>Pending</option>
                                                <option value="Shipped" ${n.status==="Shipped"?"selected":""}>Shipped</option>
                                                <option value="Delivered" ${n.status==="Delivered"?"selected":""}>Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button class="btn-icon" onclick="window.viewOrderDetails('${n.orderId}')" title="Quick View">👁️</button>
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
                            ${e.products.map(n=>`
                                <tr>
                                    <td><input type="checkbox" class="product-checkbox" value="${n.id}"></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${n.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${n.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${n.category}</span></td>
                                    <td>${d(n.price)}</td>
                                    <td>
                                        <span class="stock-badge ${n.stock<10?"low":""} ${n.stock===0?"out":""}" style="${n.stock<10?"color: var(--danger); font-weight: bold;":""}">
                                            ${n.stock}
                                        </span>
                                    </td>
                                    <td>${n.stock>0?Math.floor(n.stock/2)+" days":"Out of Stock"}</td>
                                    <td>
                                        <button class="btn-icon" onclick="window.showToast('Editing ${n.name}...')" title="Edit">✏️</button>
                                        <button class="btn-icon danger" onclick="window.deleteProduct(${n.id})" title="Delete">🗑️</button>
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
                            ${e.users.filter(n=>n.role==="customer").slice(0,3).map(n=>`
                                <li style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                                    <span>${n.name}</span>
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
    `};window.navigate=p;window.handleSort=r=>{e.sortBy=r,m()};window.viewProduct=r=>{e.currentProductId=r,p("product-detail")};window.adjustDetailQty=r=>{const t=document.getElementById("detailQty");let i=parseInt(t.value)+r;i<1&&(i=1),t.value=i};window.addToCartFromDetail=r=>{const t=parseInt(document.getElementById("detailQty").value);if(!e.currentUser){l("Please login to shop"),p("login");return}const i=e.products.find(a=>a.id===r),s=e.cart.find(a=>a.id===r);s?s.quantity+=t:e.cart.push({...i,quantity:t}),g(),l(`Added ${t} item(s) to cart`)};window.addToCart=r=>{if(!e.currentUser){l("Please login to shop"),p("login");return}const t=e.products.find(s=>s.id===r),i=e.cart.find(s=>s.id===r);i?i.quantity+=1:e.cart.push({...t,quantity:1}),g(),m(),l("Added to cart")};window.updateQuantity=(r,t)=>{if(t<1){window.removeFromCart(r);return}const i=e.cart.find(s=>s.id===r);i&&(i.quantity=t,g(),m())};window.removeFromCart=r=>{e.cart=e.cart.filter(t=>t.id!==r),g(),m()};window.checkout=async()=>{if(e.cart.length===0)return;if(!e.currentUser){l("Please login to checkout"),p("login");return}if(e.cart.filter(t=>t.selected!==!1).length===0){l("No items selected for checkout");return}p("checkout")};window.updateShippingInfo=(r,t)=>{e.checkoutData.shipping[r]=t};window.selectPaymentMethod=r=>{e.checkoutData.paymentMethod=r,m()};window.placeOrder=async()=>{const r=e.checkoutData.shipping;if(!r.fullName||!r.phone||!r.address||!r.city||!r.province){l("Please fill in all required shipping fields");return}const t=e.cart.filter(s=>s.selected!==!1),i={userId:e.currentUser.id,items:t.map(s=>({productId:s.id,quantity:s.quantity,price:s.price,name:s.name})),total:t.reduce((s,a)=>s+a.price*a.quantity,0)+e.checkoutData.shippingFee,shippingInfo:e.checkoutData.shipping,paymentMethod:e.checkoutData.paymentMethod,shippingFee:e.checkoutData.shippingFee};try{const s=await h.createOrder(i);e.lastOrderId=s.orderId,e.cart=e.cart.filter(a=>a.selected===!1),g(),p("order-confirmation")}catch{}};window.printReceipt=()=>{window.print()};window.handleSearchInput=r=>{const t=r.target.value;if(e.searchQuery=t,t.trim()){const i=new Set;e.products.forEach(s=>{const a=s.name.toLowerCase(),o=s.category.toLowerCase(),c=t.toLowerCase();a.includes(c)&&i.add(s.name),o.includes(c)&&i.add(s.category),a.split(" ").forEach(v=>{v.toLowerCase().startsWith(c)&&v.length>2&&i.add(v.charAt(0).toUpperCase()+v.slice(1))})}),e.searchSuggestions=Array.from(i).slice(0,8),e.showSuggestions=!0}else if(e.searchSuggestions=[],e.showSuggestions=!1,e.route==="home"||e.route==="products"){m();return}S()};function S(){const r=document.querySelector(".search-container");if(!r)return;const t=r.querySelector(".search-suggestions");if(t&&t.remove(),e.showSuggestions&&e.searchQuery){const i=`
            <div class="search-suggestions" id="searchSuggestions">
                <div class="suggestions-header">Suggestions</div>
                ${e.searchSuggestions.slice(0,5).map(s=>`
                    <div class="suggestion-item" onclick="window.selectSuggestion('${s.replace(/'/g,"\\'")}')"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <span>${s}</span>
                    </div>
                `).join("")}
                ${e.searchQuery?`
                    <div class="suggestion-search-all" onclick="window.handleSearch()">
                        Search for "${e.searchQuery}" →
                    </div>
                `:""}
            </div>
        `;r.insertAdjacentHTML("beforeend",i)}}window.showSearchSuggestions=()=>{e.searchQuery&&(e.showSuggestions=!0,S())};window.selectSuggestion=r=>{e.searchQuery=r,e.showSuggestions=!1;const t=document.getElementById("searchInput");t&&(t.value=r),handleSearch()};window.handleSearch=()=>{e.showSuggestions=!1;const r=document.getElementById("searchInput");r&&(e.searchQuery=r.value.trim()),p("products"),setTimeout(()=>{const t=document.querySelector(".product-grid");t&&t.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{e.searchQuery="",e.showSuggestions=!1,e.searchSuggestions=[],m()};document.addEventListener("click",r=>{if(!r.target.closest(".search-container")&&e.showSuggestions){e.showSuggestions=!1;const t=document.querySelector(".search-suggestions");t&&t.remove()}});window.handleLogin=async r=>{console.log("Login attempt started"),r.preventDefault();const t=r.target.email.value,i=r.target.password.value;console.log("Credentials:",{email:t,password:i});try{await h.login(t,i),console.log("Login successful")}catch(s){console.error("Login error:",s)}};window.handleSignup=async r=>{console.log("Signup attempt started"),r.preventDefault();const t=r.target.name.value,i=r.target.email.value,s=r.target.password.value;try{await h.register(t,i,s)}catch(a){console.error("Signup error:",a)}};window.logout=()=>{e.currentUser=null,e.cart=[],localStorage.removeItem("currentUser"),localStorage.removeItem("cart_v2"),l("Logged out successfully"),p("home")};window.deleteProduct=r=>{confirm("Are you sure you want to remove this product?")&&(e.products=e.products.filter(t=>t.id!==r),g(),m(),l("Product removed"))};window.viewOrderDetails=r=>{const t=e.orders.find(c=>c.orderId===r);if(!t){l("Order not found");return}const i=e.users.find(c=>c.id===t.userId),s=i?i.name:`User ID: ${t.userId}`,a=document.createElement("div");a.className="order-details-modal",a.innerHTML=`
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
                        <span class="info-value"><strong>#${t.orderId}</strong></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Customer:</span>
                        <span class="info-value">${s}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Date:</span>
                        <span class="info-value">${new Date(t.createdAt).toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span class="info-value">
                            <span class="status-badge status-${t.status.toLowerCase()}">${t.status}</span>
                        </span>
                    </div>
                </div>
                
                <h3 style="margin: 1.5rem 0 1rem 0; color: var(--primary);">Items Ordered</h3>
                <div class="order-items-list">
                    ${t.items.map(c=>`
                        <div class="order-item-row">
                            <div class="item-details">
                                <div class="item-name">${c.productName||"Product ID: "+c.productId}</div>
                                <div class="item-meta">Quantity: ${c.quantity} × ${d(c.price)}</div>
                            </div>
                            <div class="item-total">${d(c.price*c.quantity)}</div>
                        </div>
                    `).join("")}
                </div>
                
                <div class="order-total">
                    <span>Total Amount:</span>
                    <span class="total-amount">${d(t.total)}</span>
                </div>
            </div>
        </div>
    `,document.body.appendChild(a);const o=c=>{c.key==="Escape"&&(a.remove(),document.removeEventListener("keydown",o))};document.addEventListener("keydown",o)};const m=()=>{const r=document.getElementById("app");let t="";switch(e.route){case"home":t=x();break;case"products":t=j();break;case"product-detail":t=O();break;case"login":t=Q();break;case"signup":t=q();break;case"cart":t=A();break;case"checkout":t=T();break;case"order-confirmation":t=U();break;case"admin":t=M();break;default:t=x()}r.innerHTML=`
        ${L()}
        <main>
            ${t}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `};window.handleCartSearch=r=>{e.cartSearchQuery=r.target.value,b()};window.clearCartSearch=()=>{e.cartSearchQuery="",b()};window.toggleCartItem=r=>{const t=e.cart.find(i=>i.id===r);t&&(t.selected=t.selected===!1,g(),b())};window.toggleFindSimilar=r=>{const t=e.cart.find(i=>i.id===r);t&&(e.cart.forEach(i=>{i.id!==r&&(i.showSimilar=!1)}),t.showSimilar=!t.showSimilar,g(),b())};function b(){const r=document.querySelector(".cart-items"),t=document.querySelector(".cart-summary"),i=document.querySelector(".cart-search-message");if(!r)return;let s=e.cart;if(e.cartSearchQuery&&(s=e.cart.filter(o=>o.name.toLowerCase().includes(e.cartSearchQuery.toLowerCase())||o.category.toLowerCase().includes(e.cartSearchQuery.toLowerCase()))),r.innerHTML=s.map(o=>{const c=e.products.filter(u=>u.category===o.category&&u.id!==o.id).slice(0,4);return`
        <div style="display: flex; flex-direction: column; background: var(--surface); border-bottom: 1px solid var(--border);">
            <div class="cart-item" style="border-bottom: none;">
                <input type="checkbox" 
                    style="width: 20px; height: 20px; margin-right: 1rem; cursor: pointer; accent-color: var(--primary);"
                    ${o.selected!==!1?"checked":""}
                    onchange="window.toggleCartItem(${o.id})"
                >
                <img src="${o.image}" alt="${o.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                <div style="flex: 1;">
                    <h3 style="font-size: 1rem;">${o.name}</h3>
                    <p class="text-muted">${d(o.price)}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-right: 2rem;">
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${o.id}, ${o.quantity-1})">-</button>
                    <span>${o.quantity}</span>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${o.id}, ${o.quantity+1})">+</button>
                </div>
                
                <div class="cart-item-actions">
                    <button class="btn-delete" onclick="window.removeFromCart(${o.id})">Delete</button>
                    <button class="btn-find-similar" onclick="window.toggleFindSimilar(${o.id})">
                        Find Similar 
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${o.showSimilar?"rotate(180deg)":"rotate(0deg)"}; transition: transform 0.2s;">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="similar-products-dropdown ${o.showSimilar?"show":""}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4 style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Similar Products</h4>
                    <button onclick="window.toggleFindSimilar(${o.id})" style="background: none; border: none; cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                ${c.length>0?`
                    <div class="similar-products-grid">
                        ${c.map(u=>`
                            <div class="similar-product-card" onclick="window.viewProduct(${u.id})">
                                <img src="${u.image}" alt="${u.name}" class="similar-product-image">
                                <div class="similar-product-title" title="${u.name}">${u.name}</div>
                                <div class="similar-product-price">${d(u.price)}</div>
                            </div>
                        `).join("")}
                    </div>
                `:'<p class="text-muted text-center">No similar products found.</p>'}
            </div>
        </div>
    `}).join(""),t){const o=e.cart.reduce((u,v)=>u+(v.selected!==!1?v.price*v.quantity:0),0),c=e.cart.filter(u=>u.selected!==!1).length;t.innerHTML=`
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${d(o)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${c})
            </button>
        `}i&&(e.cartSearchQuery&&s.length===0?(i.innerHTML=`
                <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                    No items found for "${e.cartSearchQuery}"
                </p>
            `,i.style.display="block"):i.style.display="none");const a=document.querySelector("#cartSearchInput + .search-btn");a&&(a.innerHTML=e.cartSearchQuery?`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `:`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `)}const N=async()=>{await h.getProducts(),e.currentUser?.role==="admin"&&await Promise.all([h.getOrders(),h.getUsers()]),m()};N();
