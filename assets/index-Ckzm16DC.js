(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();const O="https://lumina-production-a4bb.up.railway.app",M="http://localhost:3000",L=window.location.hostname==="jlfuertes14.github.io",P=L?`${O}/api`:`${M}/api`;async function b(e,a={}){const s=`${P}${e}`;try{const n=await fetch(s,{...a,headers:{"Content-Type":"application/json",...a.headers}}),i=await n.json();if(!n.ok)throw new Error(i.error||i.message||"API request failed");return i}catch(n){throw console.error("API Error:",n),n}}console.log(`🌍 Environment: ${L?"PRODUCTION":"DEVELOPMENT"}`);console.log(`🔗 API URL: ${P}`);const t={products:[],users:[],orders:[],currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:sessionStorage.getItem("currentRoute")||"home",mobileMenuOpen:!1,searchQuery:"",showSuggestions:!1,searchSuggestions:[],currentProductId:null,sortBy:"featured",filterCategory:null,cartSearchQuery:"",isLoading:!1,cartSynced:!1,checkoutData:{shipping:{fullName:"",address:"",city:"",province:"",postalCode:"",phone:"",instructions:""},paymentMethod:"cod",shippingFee:50},lastOrderId:null},f={getProducts:async()=>{try{const e=await b("/products");t.products=e.data,g()}catch(e){console.error("Failed to load products:",e),c("Failed to load products")}},login:async(e,a)=>{console.log("Calling API login...");try{const s=await b("/users/login",{method:"POST",body:JSON.stringify({email:e,password:a})});t.currentUser=s.data,localStorage.setItem("currentUser",JSON.stringify(t.currentUser)),await E(),c(`Welcome back, ${t.currentUser.name}!`),y("home")}catch(s){throw c(s.message||"Login failed"),s}},register:async(e,a,s)=>{try{const n=await b("/users/register",{method:"POST",body:JSON.stringify({name:e,email:a,password:s})});t.currentUser=n.data,localStorage.setItem("currentUser",JSON.stringify(t.currentUser)),c("Account created successfully!"),y("home")}catch(n){throw c(n.message||"Registration failed"),n}},createOrder:async e=>{try{const a=await b("/orders",{method:"POST",body:JSON.stringify(e)});return t.cart=[],w(),c("Order placed successfully!"),t.currentUser.role==="admin"&&f.getOrders(),a.data}catch(a){throw c(a.message||"Failed to place order"),a}},getOrders:async()=>{if(!(!t.currentUser||t.currentUser.role!=="admin"))try{const e=await b("/orders");t.orders=e.data,g()}catch(e){console.error("Failed to load orders:",e)}},getUsers:async()=>{if(!(!t.currentUser||t.currentUser.role!=="admin"))try{const e=await b("/users");t.users=e.data,g()}catch(e){console.error("Failed to load users:",e)}}},w=()=>{localStorage.setItem("currentUser",JSON.stringify(t.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(t.cart))},E=async()=>{if(!(!t.currentUser||t.cartSynced))try{const e=await b(`/users/${t.currentUser.id}/cart/sync`,{method:"POST",body:JSON.stringify({localCart:t.cart})});t.cart=e.data.map(a=>({id:a.productId,name:a.name,price:a.price,image:a.image,quantity:a.quantity,category:a.category,selected:a.selected})),t.cartSynced=!0,w(),g(),c("Cart synced!")}catch(e){console.error("Cart sync failed:",e)}},l=e=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e),y=e=>{t.route=e,t.mobileMenuOpen=!1,sessionStorage.setItem("currentRoute",e),g(),window.scrollTo(0,0)},c=e=>{const a=document.createElement("div");a.className="toast",a.textContent=e,document.body.appendChild(a),setTimeout(()=>a.classList.add("show"),100),setTimeout(()=>{a.classList.remove("show"),setTimeout(()=>a.remove(),300)},3e3)},B=()=>{const e=t.currentUser!==null,a=t.currentUser?.role==="admin",s=t.route==="cart",n=t.cart.length;return`
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
                
                ${s?"":`
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
                            `:""}
                        </div>
                    </div>
                `}

                <div class="nav-actions">
                    ${a?"":`
                    <a href="#" class="action-icon" onclick="window.navigate('cart'); return false;">
                        <div style="position: relative;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            ${n>0?`<span class="cart-count">${n}</span>`:""}
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
            
            <nav class="header-nav ${t.mobileMenuOpen?"mobile-open":""}">
                <a href="#" class="nav-link ${t.route==="home"?"active":""}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${t.route==="products"?"active":""}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link">Brands</a>
                <a href="#" class="nav-link">Deals</a>
                <a href="#" class="nav-link">Support</a>
                ${a?`<a href="#" class="nav-link ${t.route==="admin"?"active":""}" onclick="window.navigate('admin'); return false;">Admin Dashboard</a>`:""}
                
                ${e?`
                    <div class="mobile-logout" onclick="window.logout()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span>Logout</span>
                    </div>
                `:""}
            </nav>
        </header>
    `},k=e=>{const a=e.stock<10,s=a?"low-stock":"",n=a?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${e.id})" style="cursor: pointer;">
            <div class="product-badge ${s}">${n}</div>
            <div class="product-image">
                <img src="${e.image}" alt="${e.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${e.category}</div>
                <h3 class="product-title">${e.name}</h3>
                <div class="product-price">${l(e.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${e.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},T=()=>{const e=t.products.find(i=>i.id===t.currentProductId);if(!e)return y("home"),"";e.stock<10;const a=e.stock>0?"In Stock":"Out of Stock",s=e.stock>0?"var(--success)":"var(--danger)",n=t.products.filter(i=>i.id!==e.id).sort(()=>.5-Math.random()).slice(0,4);return`
        <div class="product-detail-container">
            <div class="breadcrumbs">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a> &gt; 
                <a href="#" onclick="window.navigate('products'); return false;">Products</a> &gt; 
                <span>${e.name}</span>
            </div>

            <div class="product-main">
                <div class="product-gallery">
                    <img src="${e.image}" alt="${e.name}">
                </div>

                <div class="product-details-info">
                    <div class="product-sku">SKU: LUM-${e.id.toString().padStart(4,"0")}</div>
                    <h1 class="detail-title">${e.name}</h1>
                    <div class="detail-price">${l(e.price)}</div>

                    <div class="detail-section">
                        <span class="detail-label">Description</span>
                        <p style="color: var(--text-muted); line-height: 1.6;">${e.description}</p>
                    </div>

                    <div class="detail-section">
                        <span class="detail-label">Quantity</span>
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="window.adjustDetailQty(-1)">-</button>
                            <input type="number" id="detailQty" class="qty-input" value="1" min="1" max="${e.stock}" readonly>
                            <button class="qty-btn" onclick="window.adjustDetailQty(1)">+</button>
                        </div>
                    </div>

                    <button class="btn-add-large" onclick="window.addToCartFromDetail(${e.id})">
                        Add To Cart
                    </button>

                    <div class="stock-status" style="color: ${s}">
                        <span class="stock-dot" style="background-color: ${s}"></span>
                        ${a} (${e.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${n.map(k).join("")}
                </div>
            </div>
        </div>
    `},I=()=>{if(t.searchQuery){const s=t.products.filter(n=>n.name.toLowerCase().includes(t.searchQuery.toLowerCase())||n.category.toLowerCase().includes(t.searchQuery.toLowerCase())||n.description.toLowerCase().includes(t.searchQuery.toLowerCase()));return`
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
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${s.length} result${s.length!==1?"s":""} for "${t.searchQuery}"</p>
                ${s.length>0?`
                    <div class="product-grid">
                        ${s.map(k).join("")}
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
        `}const e=[1,6,2,12,4];return`
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
                ${t.products.filter(s=>e.includes(s.id)).sort((s,n)=>e.indexOf(s.id)-e.indexOf(n.id)).map(k).join("")}
            </div>
        </div>
    `},N=()=>{let e=[...t.products];switch(t.searchQuery&&(e=e.filter(a=>a.name.toLowerCase().includes(t.searchQuery.toLowerCase())||a.category.toLowerCase().includes(t.searchQuery.toLowerCase())||a.description.toLowerCase().includes(t.searchQuery.toLowerCase()))),t.sortBy){case"price-asc":e.sort((a,s)=>a.price-s.price);break;case"price-desc":e.sort((a,s)=>s.price-a.price);break;case"name-asc":e.sort((a,s)=>a.name.localeCompare(s.name));break;case"name-desc":e.sort((a,s)=>s.name.localeCompare(a.name));break;case"featured":default:e.sort((a,s)=>a.id-s.id);break}return`
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
                        <span style="color: var(--text-muted); font-size: 0.9rem;">${e.length} products</span>
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
                ${e.map(k).join("")}
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
    `,j=()=>`
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
    `,q=()=>{if(t.cart.length===0)return`
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('products')">Start Shopping</button>
            </div>
        `;let e=t.cart;return t.cartSearchQuery&&(e=t.cart.filter(a=>a.name.toLowerCase().includes(t.cartSearchQuery.toLowerCase())||a.category.toLowerCase().includes(t.cartSearchQuery.toLowerCase()))),t.cart.reduce((a,s)=>a+s.price*s.quantity,0),`
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
                
                <div class="cart-search-message" style="${t.cartSearchQuery&&e.length===0?"":"display: none;"}">
                    ${t.cartSearchQuery&&e.length===0?`
                        <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                            No items found for "${t.cartSearchQuery}"
                        </p>
                    `:""}
                </div>
                
            <div class="cart-items">
                ${e.map(a=>{const s=t.products.filter(n=>n.category===a.category&&n.id!==a.id).slice(0,4);return`
                    <div style="display: flex; flex-direction: column; background: var(--surface); border-bottom: 1px solid var(--border);">
                        <div class="cart-item" style="border-bottom: none;">
                            <input type="checkbox" 
                                style="width: 20px; height: 20px; margin-right: 1rem; cursor: pointer; accent-color: var(--primary);"
                                ${a.selected!==!1?"checked":""}
                                onchange="window.toggleCartItem(${a.id})"
                            >
                            <img src="${a.image}" alt="${a.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                            <div style="flex: 1;">
                                <h3 style="font-size: 1rem;">${a.name}</h3>
                                <p class="text-muted">${l(a.price)}</p>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem; margin-right: 2rem;">
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${a.id}, ${a.quantity-1})">-</button>
                                <span>${a.quantity}</span>
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${a.id}, ${a.quantity+1})">+</button>
                            </div>
                            
                            <div class="cart-item-actions">
                                <button class="btn-delete" onclick="window.removeFromCart(${a.id})">Delete</button>
                                <button class="btn-find-similar" onclick="window.toggleFindSimilar(${a.id})">
                                    Find Similar 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${a.showSimilar?"rotate(180deg)":"rotate(0deg)"}; transition: transform 0.2s;">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="similar-products-dropdown ${a.showSimilar?"show":""}">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h4 style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Similar Products</h4>
                                <button onclick="window.toggleFindSimilar(${a.id})" style="background: none; border: none; cursor: pointer;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            ${s.length>0?`
                                <div class="similar-products-grid">
                                    ${s.map(n=>`
                                        <div class="similar-product-card" onclick="window.viewProduct(${n.id})">
                                            <img src="${n.image}" alt="${n.name}" class="similar-product-image">
                                            <div class="similar-product-title" title="${n.name}">${n.name}</div>
                                            <div class="similar-product-price">${l(n.price)}</div>
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
                    <span>${l(t.cart.reduce((a,s)=>a+(s.selected!==!1?s.price*s.quantity:0),0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${t.cart.filter(a=>a.selected!==!1).length})
                </button>

            </div>
        </div>
        </div>
    `},U=()=>{if(!t.currentUser)return y("login"),"";const e=t.cart.filter(i=>i.selected!==!1);if(e.length===0)return c("No items selected for checkout"),y("cart"),"";const a=e.reduce((i,o)=>i+o.price*o.quantity,0),s=t.checkoutData.shippingFee,n=a+s;return`
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
                                    value="${t.checkoutData.shipping.fullName||(t.currentUser?t.currentUser.name:"")}"
                                    oninput="window.handleNameInput(this)"
                                    placeholder="e.g. Juan Dela Cruz">
                            </div>

                            <div>
                                <label class="form-label">Phone Number <span style="color: red;">*</span></label>
                                <input type="tel" class="form-input" 
                                    value="${t.checkoutData.shipping.phone}"
                                    oninput="window.handlePhoneInput(this)"
                                    maxlength="11"
                                    placeholder="09123456789">
                            </div>

                            <div>
                                <label class="form-label">Address <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${t.checkoutData.shipping.address}"
                                    onchange="window.updateShippingInfo('address', this.value)"
                                    placeholder="House/Unit No., Street Name, Barangay">
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label class="form-label">City <span style="color: red;">*</span></label>
                                    <input type="text" class="form-input" 
                                        value="${t.checkoutData.shipping.city}"
                                        oninput="window.handleLocationInput(this, 'city')"
                                        placeholder="e.g. Makati">
                                </div>
                                <div>
                                    <label class="form-label">Province <span style="color: red;">*</span></label>
                                    <input type="text" class="form-input" 
                                        value="${t.checkoutData.shipping.province}"
                                        oninput="window.handleLocationInput(this, 'province')"
                                        placeholder="e.g. Metro Manila">
                                </div>
                            </div>

                            <div>
                                <label class="form-label">Postal Code <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${t.checkoutData.shipping.postalCode}"
                                    oninput="window.handlePostalInput(this)"
                                    maxlength="4"
                                    placeholder="e.g. 1200">
                            </div>

                            <div>
                                <label class="form-label">Delivery Instructions (Optional)</label>
                                <textarea class="form-input" 
                                    onchange="window.updateShippingInfo('instructions', this.value)"
                                    rows="3"
                                    placeholder="Floor number, landmark, etc.">${t.checkoutData.shipping.instructions||""}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="admin-section">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">💳 Payment Method <span style="color: red;">*</span></h2>
                        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem;">
                            ${[{id:"cod",label:"Cash on Delivery",image:"/lumina/images/payment/cod.png"},{id:"gcash",label:"GCash",image:"/lumina/images/payment/gcash.png"},{id:"maya",label:"Maya",image:"/lumina/images/payment/maya.png"},{id:"card",label:"Credit/Debit Card",image:"/lumina/images/payment/card.png"},{id:"bank",label:"Bank Transfer",image:"/lumina/images/payment/bank.png"}].map(i=>`
                                <div class="payment-method-card" onclick="window.selectPaymentMethod('${i.id}')" style="padding: 0.75rem; border: 2px solid ${t.checkoutData.paymentMethod===i.id?"var(--primary)":"var(--border)"}; border-radius: var(--radius-md); cursor: pointer; text-align: center; transition: all 0.2s; background: ${t.checkoutData.paymentMethod===i.id?"rgba(0, 43, 91, 0.05)":"var(--surface)"};">
                                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                                        <img src="${i.image}" alt="${i.label}" style="max-width: 100%; max-height: 48px; object-fit: contain;">
                                    </div>
                                    <div style="font-size: 0.75rem; font-weight: 600; line-height: 1.2;">${i.label}</div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="cart-summary" style="position: sticky; top: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Order Summary</h2>
                        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem;">
                            ${e.map(i=>`
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                                    <img src="${i.image}" alt="${i.name}" style="width: 60px; height: 60px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${i.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-muted);">Qty: ${i.quantity}</div>
                                    </div>
                                    <div style="font-weight: 700; color: var(--primary);">${l(i.price*i.quantity)}</div>
                                </div>
                            `).join("")}
                        </div>
                        <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Subtotal</span>
                                <span>${l(a)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Shipping Fee</span>
                                <span>${l(s)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                                <span>Total</span>
                                <span style="color: var(--primary);">${l(n)}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="window.placeOrder()" style="width: 100%; padding: 1rem; font-size: 1rem;">Place Order</button>
                        <div style="margin-top: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);">🔒 Your payment information is secure</div>
                    </div>
                </div>
            </div>
        </div>
    `},Q=()=>{if(!t.lastOrderId)return y("home"),"";const e=t.orders.find(o=>o.orderId===t.lastOrderId);if(!e)return y("home"),"";const a=new Date,s=new Date(a);s.setDate(a.getDate()+3);const n=new Date(a);n.setDate(a.getDate()+5);const i=`${s.toLocaleDateString("en-US",{month:"short",day:"numeric"})} - ${n.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} `;return`
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
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">#${e.orderId}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">Order Date</div>
                            <div style="font-weight: 600;">${new Date(e.createdAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">1</div>
                        <div style="font-weight: 600;">Estimated Delivery</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">${i}</div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">2</div>
                        <div style="font-weight: 600;">Payment Status</div>
                    </div>
                    <div style="padding-left: 2rem;">
                        <span class="badge badge-${t.checkoutData.paymentMethod==="cod"?"warning":"success"}" style="font-size: 0.875rem; padding: 0.375rem 0.75rem;">
                            ${t.checkoutData.paymentMethod==="cod"?"Cash on Delivery":"Payment Confirmed"}
                        </span>
                    </div>
                </div>

                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">3</div>
                        <div style="font-weight: 600;">Shipping Address</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">
                        ${t.checkoutData.shipping.fullName}<br>
                        ${t.checkoutData.shipping.address}<br>
                        ${t.checkoutData.shipping.city}, ${t.checkoutData.shipping.province} ${t.checkoutData.shipping.postalCode}<br>
                        ${t.checkoutData.shipping.phone}
                    </div>
                </div>
            </div>

            <div class="admin-section" style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Order Items</h3>
                ${e.items.map(o=>`
                    <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${o.productName||o.name}</div>
                            <div style="font-size: 0.875rem; color: var(--text-muted);">Quantity: ${o.quantity}</div>
                        </div>
                        <div style="font-weight: 700; color: var(--primary);">${l(o.price*o.quantity)}</div>
                    </div>
                `).join("")}
                <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                    <span>Total Amount</span>
                    <span style="color: var(--primary);">${l(e.total)}</span>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="window.printReceipt()" style="padding: 0.875rem 2rem;">🖨️ Print Receipt</button>
                <button class="btn btn-outline" onclick="window.navigate('home')" style="padding: 0.875rem 2rem;">🏠 Back to Shop</button>
            </div>

            <div style="text-align: center; margin-top: 3rem; padding: 1.5rem; background: var(--surface-alt); border-radius: var(--radius-md);">
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">An email confirmation has been sent to <strong>${t.currentUser.email}</strong></p>
                <p style="font-size: 0.875rem; color: var(--text-muted);">Questions? Contact us at support@luminaelectronics.com</p>
            </div>
        </div>
    `};window.updateOrderStatus=(e,a)=>{const s=t.orders.find(n=>n.id===e);s&&(s.status=a,w(),c(`Order #${e} updated to ${a}`),g())};window.toggleSelectAll=e=>{document.querySelectorAll(".product-checkbox").forEach(s=>s.checked=e.checked)};window.bulkAction=e=>{const a=document.querySelectorAll(".product-checkbox:checked"),s=Array.from(a).map(n=>parseInt(n.value));if(s.length===0){c("No products selected");return}e==="delete"?confirm(`Delete ${s.length} products?`)&&(t.products=t.products.filter(n=>!s.includes(n.id)),w(),g(),c("Products deleted")):e==="restock"&&(t.products.forEach(n=>{s.includes(n.id)&&(n.stock+=10)}),w(),g(),c("Products restocked"))};window.viewOrderDetails=e=>{const a=t.orders.find(i=>i.id===e);if(!a)return;const s=t.users.find(i=>i.id===a.userId),n=`
        <div class="modal-overlay show" id="orderModal" onclick="if(event.target === this) window.closeModal()">
            <div class="modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Order #${a.id}</h3>
                    <button class="btn-icon" onclick="window.closeModal()">✕</button>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Customer:</strong> ${s?s.name:"Unknown"}</p>
                    <p><strong>Date:</strong> ${a.date}</p>
                    <p><strong>Status:</strong> <span class="badge badge-${a.status==="Delivered"?"success":"warning"}">${a.status}</span></p>
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
                        ${a.items.map(i=>`
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 0.5rem;">${i.name}</td>
                                <td style="padding: 0.5rem;">${i.quantity}</td>
                                <td style="padding: 0.5rem;">${l(i.price)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${l(a.total)}
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",n)};window.closeModal=()=>{const e=document.getElementById("orderModal");e&&e.remove()};const z=()=>{if(!t.currentUser||t.currentUser.role!=="admin")return y("home"),"";t.orders.length===0&&f.getOrders();const e=t.orders.reduce((r,m)=>r+m.total,0),a=t.orders.length;t.products.length;const s=t.users.filter(r=>r.role==="customer").length,n=t.products.filter(r=>r.stock<10);t.products.filter(r=>r.stock===0);const i=t.orders.slice(0,5),o=a>0?e/a:0,d={};t.products.forEach(r=>{d[r.category]=(d[r.category]||0)+1});const u=Object.entries(d).map(([r,m])=>({name:r,count:m})),p=[450,720,550,890,600,950,1200],v=Math.max(...p);return`
        <div class="admin-container">
            <div class="admin-header">
                <div style="display: flex; align-items: center;">
                    <h1>📊 Admin Dashboard</h1>
                </div>
                <div class="admin-actions" style="display: flex; align-items: center;">
                    <div class="notification-bell" onclick="window.showToast('No new notifications')">
                        🔔
                        ${n.length>0?`<span class="notification-badge">${n.length}</span>`:""}
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
                        ${p.map(r=>`
                            <div class="chart-bar" style="height: ${r/v*100}%" data-value="${l(r)}"></div>
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
                        ${u.slice(0,3).map(r=>`<span class="badge badge-info">${r.name}: ${r.count}</span>`).join("")}
                    </div>
                </div>

                <!-- Top Products -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🏆 Top Products</h3>
                    </div>
                    <div class="top-products-list">
                        ${t.products.slice(0,4).map(r=>`
                            <div class="top-product-item">
                                <img src="${r.image}" style="width: 32px; height: 32px; object-fit: contain;">
                                <div style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                                        <span>${r.name}</span>
                                        <span>${l(r.price)}</span>
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
                        <div class="metric-value">${l(e)}</div>
                        <div class="metric-change positive">+15.3%</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">🛍️</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Orders</div>
                        <div class="metric-value">${a}</div>
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
                        <div class="metric-value">${l(o)}</div>
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
                            ${i.length>0?i.map(r=>{const m=t.users.find(h=>h.id===r.userId);return`
                                    <tr>
                                        <td><strong>#${r.orderId}</strong></td>
                                        <td>${new Date(r.createdAt).toLocaleDateString()}</td>
                                        <td>${m?m.name:"Unknown (ID: "+r.userId+")"}</td>
                                        <td>${r.items.length} items</td>
                                        <td><strong>${l(r.total)}</strong></td>
                                        <td>
                                            <select class="status-select" onchange="window.updateOrderStatus('${r.orderId}', this.value)">
                                                <option value="Pending" ${r.status==="Pending"?"selected":""}>Pending</option>
                                                <option value="Shipped" ${r.status==="Shipped"?"selected":""}>Shipped</option>
                                                <option value="Delivered" ${r.status==="Delivered"?"selected":""}>Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button class="btn-icon" onclick="window.viewOrderDetails('${r.orderId}')" title="Quick View">👁️</button>
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
                        <button class="btn-small btn-accent" onclick="window.showProductModal()">
                            ➕ Add New Product
                        </button>
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
                            ${t.products.map(r=>`
                                <tr>
                                    <td><input type="checkbox" class="product-checkbox" value="${r.id}"></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${r.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${r.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${r.category}</span></td>
                                    <td>${l(r.price)}</td>
                                    <td>
                                        <span class="stock-badge ${r.stock<10?"low":""} ${r.stock===0?"out":""}" style="${r.stock<10?"color: var(--danger); font-weight: bold;":""}">
                                            ${r.stock}
                                        </span>
                                    </td>
                                    <td>${r.stock>0?Math.floor(r.stock/2)+" days":"Out of Stock"}</td>
                                    <td>
                                        <button class="btn-icon" onclick="window.showToast('Editing ${r.name}...')" title="Edit">✏️</button>
                                        <button class="btn-icon danger" onclick="window.deleteProduct(${r.id})" title="Delete">🗑️</button>
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
                            ${t.users.filter(r=>r.role==="customer").slice(0,3).map(r=>`
                                <li style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                                    <span>${r.name}</span>
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
    `};window.navigate=y;window.toggleMobileMenu=()=>{t.mobileMenuOpen=!t.mobileMenuOpen,g()};window.showProductModal=(e=null)=>{document.body.insertAdjacentHTML("beforeend",ProductModal(e))};window.closeProductModal=()=>{document.getElementById("productModal")?.remove()};window.editProduct=e=>{window.showProductModal(e)};window.deleteProduct=async e=>{if(confirm("Delete this product?"))try{await b(`/products/${e}`,{method:"DELETE"}),await f.getProducts(),c("Product deleted")}catch{c("Delete failed")}};window.handleProductSubmit=async(e,a)=>{e.preventDefault();const s=new FormData(e.target);try{const n=a?"PUT":"POST",i=a?`/products/${a}`:"/products";if(!(await fetch(`${P}${i}`,{method:n,body:s})).ok)throw new Error("Failed");await f.getProducts(),window.closeProductModal(),c(a?"Product updated!":"Product created!")}catch{c("Operation failed")}};window.handleSort=e=>{t.sortBy=e,g()};window.viewProduct=e=>{t.currentProductId=e,y("product-detail")};window.adjustDetailQty=e=>{const a=document.getElementById("detailQty");let s=parseInt(a.value)+e;s<1&&(s=1),a.value=s};window.addToCartFromDetail=e=>{const a=parseInt(document.getElementById("detailQty").value);if(!t.currentUser){c("Please login to shop"),y("login");return}const s=t.products.find(i=>i.id===e),n=t.cart.find(i=>i.id===e);n?n.quantity+=a:t.cart.push({...s,quantity:a}),w(),c(`Added ${a} item(s) to cart`)};window.addToCart=async e=>{if(!t.currentUser){c("Please login to shop"),y("login");return}const a=t.products.find(n=>n.id===e),s=t.cart.find(n=>n.id===e);s?s.quantity+=1:t.cart.push({...a,quantity:1}),w(),g(),c("Added to cart"),t.currentUser&&await b(`/users/${t.currentUser.id}/cart`,{method:"PUT",body:JSON.stringify({cart:t.cart.map(n=>({productId:n.id,name:n.name,price:n.price,image:n.image,quantity:n.quantity,category:n.category,selected:n.selected!==!1}))})})};window.updateQuantity=(e,a)=>{if(a<1){window.removeFromCart(e);return}const s=t.cart.find(n=>n.id===e);s&&(s.quantity=a,w(),g())};window.removeFromCart=e=>{t.cart=t.cart.filter(a=>a.id!==e),w(),g()};window.checkout=async()=>{if(t.cart.length===0)return;if(!t.currentUser){c("Please login to checkout"),y("login");return}if(t.cart.filter(a=>a.selected!==!1).length===0){c("No items selected for checkout");return}y("checkout")};window.updateShippingInfo=(e,a)=>{t.checkoutData.shipping[e]=a};window.selectPaymentMethod=e=>{t.checkoutData.paymentMethod=e,g()};window.handlePhoneInput=e=>{const a=e.value.replace(/[^0-9]/g,"");e.value=a,t.checkoutData.shipping.phone=a};window.handleNameInput=e=>{const a=e.value.replace(/[^a-zA-Z\s]/g,"");e.value=a,t.checkoutData.shipping.fullName=a};window.handleLocationInput=(e,a)=>{const s=e.value.replace(/[^a-zA-Z\s]/g,"");e.value=s,t.checkoutData.shipping[a]=s};window.handlePostalInput=e=>{const a=e.value.replace(/[^0-9]/g,"");e.value=a,t.checkoutData.shipping.postalCode=a};window.showPaymentModal=e=>new Promise(a=>{let s="";const n=`
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
                                <span style="font-weight: 700;">${l(e)}</span>
                            </div>
                            <div class="payment-summary-row total">
                                <span>To Pay:</span>
                                <span>${l(e)}</span>
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
                            <button class="quick-amount-btn" data-amount="${e}">Exact</button>
                            <button class="quick-amount-btn" data-amount="${e+50}">+₱50</button>
                            <button class="quick-amount-btn" data-amount="${e+100}">+₱100</button>
                            <button class="quick-amount-btn" data-amount="${Math.ceil(e/100)*100}">Round</button>
                            <button class="quick-amount-btn" data-amount="${e+500}">+₱500</button>
                            <button class="quick-amount-btn" data-amount="${e+1e3}">+₱1000</button>
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
        `;document.body.insertAdjacentHTML("beforeend",n);const i=document.getElementById("paymentModalOverlay"),o=document.getElementById("paymentAmountInput"),d=document.getElementById("paymentError"),u=document.getElementById("paymentChangeDisplay"),p=document.getElementById("changeAmount"),v=document.getElementById("paymentConfirmBtn"),r=document.getElementById("paymentCancelBtn");setTimeout(()=>o.focus(),100),o.addEventListener("input",m=>{let h=m.target.value.replace(/[^0-9.]/g,"");const S=h.split(".");S.length>2&&(h=S[0]+"."+S.slice(1).join("")),m.target.value=h,s=h;const x=parseFloat(h);if(!h||isNaN(x)||x<0){d.textContent="",d.classList.remove("show"),o.classList.remove("error"),v.disabled=!0,u.classList.remove("show");return}if(x<e){const C=e-x;d.textContent=`Insufficient! Need ${l(C)} more`,d.classList.add("show"),o.classList.add("error"),v.disabled=!0,u.classList.remove("show")}else{const C=x-e;d.classList.remove("show"),o.classList.remove("error"),v.disabled=!1,u.classList.add("show"),p.textContent=l(C)}}),document.querySelectorAll(".quick-amount-btn").forEach(m=>{m.addEventListener("click",()=>{const h=m.getAttribute("data-amount");o.value=h,o.dispatchEvent(new Event("input"))})}),r.addEventListener("click",()=>{i.remove(),a(null)}),i.addEventListener("click",m=>{m.target===i&&(i.remove(),a(null))}),v.addEventListener("click",()=>{const m=parseFloat(s);m>=e&&(i.remove(),a({amountPaid:m,change:m-e}))}),o.addEventListener("keypress",m=>{m.key==="Enter"&&!v.disabled&&v.click()}),document.addEventListener("keydown",function m(h){h.key==="Escape"&&(i.remove(),a(null),document.removeEventListener("keydown",m))})});window.showGCashModal=e=>new Promise(a=>{const s="GCASH-"+Date.now().toString().slice(-8),n=`
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
                                <span>${l(e)}</span>
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
                                value="${s}"
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
        `;document.body.insertAdjacentHTML("beforeend",n);const i=document.getElementById("paymentModalOverlay"),o=document.getElementById("paymentConfirmBtn"),d=document.getElementById("paymentCancelBtn"),u=document.getElementById("processingOverlay"),p=document.getElementById("successOverlay");d.addEventListener("click",()=>{i.remove(),a(null)}),o.addEventListener("click",()=>{u.classList.add("show"),setTimeout(()=>{u.classList.remove("show"),p.classList.add("show"),setTimeout(()=>{i.remove(),a({method:"gcash",reference:s})},1e3)},1500)}),i.addEventListener("click",v=>{v.target===i&&(i.remove(),a(null))})});window.showMayaModal=e=>new Promise(a=>{const s="MAYA-"+Date.now().toString().slice(-8),n=`
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
                                <span>${l(e)}</span>
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
                                value="${s}"
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
        `;document.body.insertAdjacentHTML("beforeend",n);const i=document.getElementById("paymentModalOverlay"),o=document.getElementById("paymentConfirmBtn"),d=document.getElementById("paymentCancelBtn"),u=document.getElementById("processingOverlay"),p=document.getElementById("successOverlay");d.addEventListener("click",()=>{i.remove(),a(null)}),o.addEventListener("click",()=>{u.classList.add("show"),setTimeout(()=>{u.classList.remove("show"),p.classList.add("show"),setTimeout(()=>{i.remove(),a({method:"maya",reference:s})},1e3)},1500)}),i.addEventListener("click",v=>{v.target===i&&(i.remove(),a(null))})});window.showCardModal=e=>new Promise(a=>{const d=`
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
                                <span>${l(e)}</span>
                            </div>
                        </div>
                        
                        <div class="card-form">
                            <div class="payment-input-group">
                                <label>Card Number</label>
                                <input 
                                    type="text" 
                                    class="payment-input card-number-input auto-filled" 
                                    value="4111 1111 1111 1111"
                                    readonly
                                >
                            </div>
                            
                            <div class="card-form-row">
                                <div class="payment-input-group">
                                    <label>Expiry Date</label>
                                    <input 
                                        type="text" 
                                        class="payment-input auto-filled" 
                                        value="12/25"
                                        readonly
                                    >
                                </div>
                                <div class="payment-input-group">
                                    <label>CVV</label>
                                    <input 
                                        type="text" 
                                        class="payment-input auto-filled" 
                                        value="123"
                                        readonly
                                    >
                                </div>
                            </div>
                            
                            <div class="payment-input-group">
                                <label>Cardholder Name</label>
                                <input 
                                    type="text" 
                                    class="payment-input auto-filled" 
                                    value="JOHN DOE"
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
        `;document.body.insertAdjacentHTML("beforeend",d);const u=document.getElementById("paymentModalOverlay"),p=document.getElementById("paymentConfirmBtn"),v=document.getElementById("paymentCancelBtn"),r=document.getElementById("processingOverlay"),m=document.getElementById("successOverlay");v.addEventListener("click",()=>{u.remove(),a(null)}),p.addEventListener("click",()=>{r.classList.add("show"),setTimeout(()=>{r.classList.remove("show"),m.classList.add("show"),setTimeout(()=>{u.remove(),a({method:"card",last4:"1111"})},1e3)},2e3)}),u.addEventListener("click",h=>{h.target===u&&(u.remove(),a(null))})});window.showBankModal=e=>new Promise(a=>{const s="BDO-"+Date.now().toString().slice(-8),n=`
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
                                <span>${l(e)}</span>
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
                                value="${s}"
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
        `;document.body.insertAdjacentHTML("beforeend",n);const i=document.getElementById("paymentModalOverlay"),o=document.getElementById("paymentConfirmBtn"),d=document.getElementById("paymentCancelBtn"),u=document.getElementById("processingOverlay"),p=document.getElementById("successOverlay");d.addEventListener("click",()=>{i.remove(),a(null)}),o.addEventListener("click",()=>{u.classList.add("show"),setTimeout(()=>{u.classList.remove("show"),p.classList.add("show"),setTimeout(()=>{i.remove(),a({method:"bank",reference:s})},1e3)},1500)}),i.addEventListener("click",v=>{v.target===i&&(i.remove(),a(null))})});window.placeOrder=async()=>{const e=t.checkoutData.shipping;if(!e.fullName||!e.fullName.trim()){c("Please enter your full name");return}if(!e.address||!e.address.trim()){c("Please enter your address");return}if(!e.city||!e.city.trim()){c("Please enter your city");return}if(!e.province||!e.province.trim()){c("Please enter your province");return}if(!e.phone||!e.phone.trim()){c("Please enter your phone number");return}if(!/^09\d{9}$/.test(e.phone)){c('Phone number must start with "09" and contain exactly 11 digits');return}const s=/^[a-zA-Z\s]+$/;if(!s.test(e.fullName)){c("Full Name must contain letters and spaces only");return}if(!s.test(e.city)){c("City must contain letters and spaces only");return}if(!s.test(e.province)){c("Province must contain letters and spaces only");return}if(e.postalCode&&!/^\d+$/.test(e.postalCode)){c("Postal Code must contain numbers only");return}if(!t.checkoutData.paymentMethod){c("Please select a payment method");return}const n=t.cart.filter(r=>r.selected!==!1),o=n.reduce((r,m)=>r+m.price*m.quantity,0)+t.checkoutData.shippingFee;let d=null;switch(t.checkoutData.paymentMethod){case"cod":d=await showPaymentModal(o);break;case"gcash":d=await showGCashModal(o);break;case"maya":d=await showMayaModal(o);break;case"card":d=await showCardModal(o);break;case"bank":d=await showBankModal(o);break;default:c("Please select a payment method");return}if(!d)return;let u=d.amountPaid||o,p=d.change||0;const v={userId:t.currentUser.id,items:n.map(r=>({productId:r.id,quantity:r.quantity,price:r.price,name:r.name})),total:o,shippingInfo:t.checkoutData.shipping,paymentMethod:t.checkoutData.paymentMethod,shippingFee:t.checkoutData.shippingFee,amountPaid:u,change:p};try{const r=await f.createOrder(v);t.lastOrderId=r.orderId,t.lastOrderPayment={amountPaid:u,change:p},t.orders.push({orderId:r.orderId,...r,items:n,total:o,createdAt:new Date().toISOString(),userId:t.currentUser.id}),t.cart=t.cart.filter(m=>m.selected===!1),w(),y("order-confirmation")}catch{}};window.printReceipt=()=>{if(!t.lastOrderId){c("No order found to print");return}const e=t.orders.find(o=>o.orderId===t.lastOrderId);if(!e){c("Order not found");return}const a=t.lastOrderPayment||{},s=new Date,n=`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Receipt #${e.orderId}</title>
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
                    <span><strong>${e.orderId}</strong></span>
                </div>
                <div class="info-row">
                    <span>Date:</span>
                    <span>${s.toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"})}</span>
                </div>
                <div class="info-row">
                    <span>Time:</span>
                    <span>${s.toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit"})}</span>
                </div>
                <div class="info-row">
                    <span>Cashier:</span>
                    <span>${t.currentUser.name}</span>
                </div>
                <div class="info-row">
                    <span>Payment:</span>
                    <span>${t.checkoutData.paymentMethod.toUpperCase()}</span>
                </div>
            </div>
            
            <div class="items-section">
                <div class="items-header">
                    <div>ITEM</div>
                    <div class="text-center">QTY</div>
                    <div class="text-right">AMOUNT</div>
                </div>
                
                ${e.items.map(o=>`
                    <div class="item-row">
                        <div class="item-name">${o.productName||o.name}</div>
                        <div class="item-details">
                            <div>${l(o.price)}</div>
                            <div class="text-center">x${o.quantity}</div>
                            <div class="text-right"><strong>${l(o.price*o.quantity)}</strong></div>
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div class="totals-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>${l(e.total-t.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping Fee:</span>
                    <span>${l(t.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row grand-total">
                    <span>TOTAL:</span>
                    <span>${l(e.total)}</span>
                </div>
            </div>
            
            ${a.amountPaid?`
                <div class="payment-section">
                    <div class="payment-row">
                        <span>Amount Paid:</span>
                        <span>${l(a.amountPaid)}</span>
                    </div>
                    <div class="payment-row change-row">
                        <span>Change:</span>
                        <span>${l(a.change)}</span>
                    </div>
                </div>
            `:""}
            
            <div class="receipt-footer">
                <div class="thank-you">THANK YOU!</div>
                <div class="footer-note">Please come again</div>
                <div class="footer-note" style="margin-top: 10px;">
                    Shipping to:<br>
                    ${t.checkoutData.shipping.fullName}<br>
                    ${t.checkoutData.shipping.address}<br>
                    ${t.checkoutData.shipping.city}, ${t.checkoutData.shipping.province}<br>
                    Phone: ${t.checkoutData.shipping.phone}
                </div>
                <div style="margin-top: 15px; font-size: 9px;">
                    This serves as your official receipt<br>
                    Keep this for warranty claims
                </div>
            </div>
        </body>
        </html>
    `,i=window.open("","_blank","width=300,height=600");i.document.write(n),i.document.close(),i.onload=function(){setTimeout(()=>{i.print()},250)}};window.handleSearchInput=e=>{const a=e.target.value;if(t.searchQuery=a,a.trim()){const s=new Set;t.products.forEach(n=>{const i=n.name.toLowerCase(),o=n.category.toLowerCase(),d=a.toLowerCase();i.includes(d)&&s.add(n.name),o.includes(d)&&s.add(n.category),i.split(" ").forEach(p=>{p.toLowerCase().startsWith(d)&&p.length>2&&s.add(p.charAt(0).toUpperCase()+p.slice(1))})}),t.searchSuggestions=Array.from(s).slice(0,8),t.showSuggestions=!0}else if(t.searchSuggestions=[],t.showSuggestions=!1,t.route==="home"||t.route==="products"){g();return}D()};function D(){const e=document.querySelector(".search-container");if(!e)return;const a=e.querySelector(".search-suggestions");if(a&&a.remove(),t.showSuggestions&&t.searchQuery){const s=`
            <div class="search-suggestions" id="searchSuggestions">
                <div class="suggestions-header">Suggestions</div>
                ${t.searchSuggestions.slice(0,5).map(n=>`
                    <div class="suggestion-item" onclick="window.selectSuggestion('${n.replace(/'/g,"\\'")}')"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <span>${n}</span>
                    </div>
                `).join("")}
                ${t.searchQuery?`
                    <div class="suggestion-search-all" onclick="window.handleSearch()">
                        Search for "${t.searchQuery}" →
                    </div>
                `:""}
            </div>
        `;e.insertAdjacentHTML("beforeend",s)}}window.showSearchSuggestions=()=>{t.searchQuery&&(t.showSuggestions=!0,D())};window.selectSuggestion=e=>{t.searchQuery=e,t.showSuggestions=!1;const a=document.getElementById("searchInput");a&&(a.value=e),handleSearch()};window.handleSearch=()=>{t.showSuggestions=!1;const e=document.getElementById("searchInput");e&&(t.searchQuery=e.value.trim()),y("products"),setTimeout(()=>{const a=document.querySelector(".product-grid");a&&a.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{t.searchQuery="",t.showSuggestions=!1,t.searchSuggestions=[],g()};document.addEventListener("click",e=>{if(!e.target.closest(".search-container")&&t.showSuggestions){t.showSuggestions=!1;const a=document.querySelector(".search-suggestions");a&&a.remove()}});window.handleLogin=async e=>{console.log("Login attempt started"),e.preventDefault();const a=e.target.email.value,s=e.target.password.value;console.log("Credentials:",{email:a,password:s});try{await f.login(a,s),console.log("Login successful")}catch(n){console.error("Login error:",n)}};window.handleSignup=async e=>{console.log("Signup attempt started"),e.preventDefault();const a=e.target.name.value,s=e.target.email.value,n=e.target.password.value;try{await f.register(a,s,n)}catch(i){console.error("Signup error:",i)}};window.logout=()=>{t.currentUser=null,t.cart=[],localStorage.removeItem("currentUser"),localStorage.removeItem("cart_v2"),c("Logged out successfully"),sessionStorage.removeItem("currentRoute"),y("home")};window.deleteProduct=e=>{confirm("Are you sure you want to remove this product?")&&(t.products=t.products.filter(a=>a.id!==e),w(),g(),c("Product removed"))};window.viewOrderDetails=e=>{const a=t.orders.find(d=>d.orderId===e);if(!a){c("Order not found");return}const s=t.users.find(d=>d.id===a.userId),n=s?s.name:`User ID: ${a.userId}`,i=document.createElement("div");i.className="order-details-modal",i.innerHTML=`
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
                        <span class="info-value"><strong>#${a.orderId}</strong></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Customer:</span>
                        <span class="info-value">${n}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Date:</span>
                        <span class="info-value">${new Date(a.createdAt).toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span class="info-value">
                            <span class="status-badge status-${a.status.toLowerCase()}">${a.status}</span>
                        </span>
                    </div>
                </div>
                
                <h3 style="margin: 1.5rem 0 1rem 0; color: var(--primary);">Items Ordered</h3>
                <div class="order-items-list">
                    ${a.items.map(d=>`
                        <div class="order-item-row">
                            <div class="item-details">
                                <div class="item-name">${d.productName||"Product ID: "+d.productId}</div>
                                <div class="item-meta">Quantity: ${d.quantity} × ${l(d.price)}</div>
                            </div>
                            <div class="item-total">${l(d.price*d.quantity)}</div>
                        </div>
                    `).join("")}
                </div>
                
                <div class="order-total">
                    <span>Total Amount:</span>
                    <span class="total-amount">${l(a.total)}</span>
                </div>
            </div>
        </div>
    `,document.body.appendChild(i);const o=d=>{d.key==="Escape"&&(i.remove(),document.removeEventListener("keydown",o))};document.addEventListener("keydown",o)};const g=()=>{const e=document.getElementById("app");let a="";switch(t.route){case"home":a=I();break;case"products":a=N();break;case"product-detail":a=T();break;case"login":a=A();break;case"signup":a=j();break;case"cart":a=q();break;case"checkout":a=U();break;case"order-confirmation":a=Q();break;case"admin":a=z();break;default:a=I()}e.innerHTML=`
        ${B()}
        <main>
            ${a}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `};window.handleCartSearch=e=>{t.cartSearchQuery=e.target.value,$()};window.clearCartSearch=()=>{t.cartSearchQuery="",$()};window.toggleCartItem=e=>{const a=t.cart.find(s=>s.id===e);a&&(a.selected=a.selected===!1,w(),$())};window.toggleFindSimilar=e=>{const a=t.cart.find(s=>s.id===e);a&&(t.cart.forEach(s=>{s.id!==e&&(s.showSimilar=!1)}),a.showSimilar=!a.showSimilar,w(),$())};function $(){const e=document.querySelector(".cart-items"),a=document.querySelector(".cart-summary"),s=document.querySelector(".cart-search-message");if(!e)return;let n=t.cart;if(t.cartSearchQuery&&(n=t.cart.filter(o=>o.name.toLowerCase().includes(t.cartSearchQuery.toLowerCase())||o.category.toLowerCase().includes(t.cartSearchQuery.toLowerCase()))),e.innerHTML=n.map(o=>{const d=t.products.filter(u=>u.category===o.category&&u.id!==o.id).slice(0,4);return`
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
                    <p class="text-muted">${l(o.price)}</p>
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
                ${d.length>0?`
                    <div class="similar-products-grid">
                        ${d.map(u=>`
                            <div class="similar-product-card" onclick="window.viewProduct(${u.id})">
                                <img src="${u.image}" alt="${u.name}" class="similar-product-image">
                                <div class="similar-product-title" title="${u.name}">${u.name}</div>
                                <div class="similar-product-price">${l(u.price)}</div>
                            </div>
                        `).join("")}
                    </div>
                `:'<p class="text-muted text-center">No similar products found.</p>'}
            </div>
        </div>
    `}).join(""),a){const o=t.cart.reduce((u,p)=>u+(p.selected!==!1?p.price*p.quantity:0),0),d=t.cart.filter(u=>u.selected!==!1).length;a.innerHTML=`
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${l(o)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${d})
            </button>
        `}s&&(t.cartSearchQuery&&n.length===0?(s.innerHTML=`
                <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                    No items found for "${t.cartSearchQuery}"
                </p>
            `,s.style.display="block"):s.style.display="none");const i=document.querySelector("#cartSearchInput + .search-btn");i&&(i.innerHTML=t.cartSearchQuery?`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `:`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `)}const R=async()=>{await f.getProducts(),t.currentUser?.role==="admin"&&await Promise.all([f.getOrders(),f.getUsers()]),g()};R();
