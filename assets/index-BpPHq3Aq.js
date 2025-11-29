(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const M="https://lumina-production-a4bb.up.railway.app",O="http://localhost:3000",L=window.location.hostname==="jlfuertes14.github.io",P=L?`${M}/api`:`${O}/api`;async function f(t,e={}){const s=`${P}${t}`;try{const i=await fetch(s,{...e,headers:{"Content-Type":"application/json",...e.headers}}),r=await i.json();if(!i.ok)throw new Error(r.error||r.message||"API request failed");return r}catch(i){throw console.error("API Error:",i),i}}console.log(`🌍 Environment: ${L?"PRODUCTION":"DEVELOPMENT"}`);console.log(`🔗 API URL: ${P}`);const a={products:[],users:[],orders:[],currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:sessionStorage.getItem("currentRoute")||"home",mobileMenuOpen:!1,searchQuery:"",showSuggestions:!1,searchSuggestions:[],currentProductId:null,sortBy:"featured",filterCategory:null,cartSearchQuery:"",isLoading:!1,cartSynced:!1,checkoutData:{shipping:{fullName:"",address:"",city:"",province:"",postalCode:"",phone:"",instructions:""},paymentMethod:"cod",shippingFee:50},lastOrderId:null},w={getProducts:async()=>{try{const t=await f("/products");a.products=t.data,g()}catch(t){console.error("Failed to load products:",t),c("Failed to load products")}},login:async(t,e)=>{console.log("Calling API login...");try{const s=await f("/users/login",{method:"POST",body:JSON.stringify({email:t,password:e})});a.currentUser=s.data,localStorage.setItem("currentUser",JSON.stringify(a.currentUser)),await E(),c(`Welcome back, ${a.currentUser.name}!`),h("home")}catch(s){throw c(s.message||"Login failed"),s}},register:async(t,e,s)=>{try{const i=await f("/users/register",{method:"POST",body:JSON.stringify({name:t,email:e,password:s})});a.currentUser=i.data,localStorage.setItem("currentUser",JSON.stringify(a.currentUser)),c("Account created successfully!"),h("home")}catch(i){throw c(i.message||"Registration failed"),i}},createOrder:async t=>{try{const e=await f("/orders",{method:"POST",body:JSON.stringify(t)});return a.cart=[],b(),c("Order placed successfully!"),a.currentUser.role==="admin"&&w.getOrders(),e.data}catch(e){throw c(e.message||"Failed to place order"),e}},getOrders:async()=>{if(!(!a.currentUser||a.currentUser.role!=="admin"))try{const t=await f("/orders");a.orders=t.data,g()}catch(t){console.error("Failed to load orders:",t)}},getUsers:async()=>{if(!(!a.currentUser||a.currentUser.role!=="admin"))try{const t=await f("/users");a.users=t.data,g()}catch(t){console.error("Failed to load users:",t)}}},b=()=>{localStorage.setItem("currentUser",JSON.stringify(a.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(a.cart))},E=async()=>{if(!(!a.currentUser||a.cartSynced))try{const t=await f(`/users/${a.currentUser.id}/cart/sync`,{method:"POST",body:JSON.stringify({localCart:a.cart})});a.cart=t.data.map(e=>({id:e.productId,name:e.name,price:e.price,image:e.image,quantity:e.quantity,category:e.category,selected:e.selected})),a.cartSynced=!0,b(),g(),c("Cart synced!")}catch(t){console.error("Cart sync failed:",t)}},l=t=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(t),h=t=>{a.route=t,a.mobileMenuOpen=!1,sessionStorage.setItem("currentRoute",t),g(),window.scrollTo(0,0)},c=t=>{const e=document.createElement("div");e.className="toast",e.textContent=t,document.body.appendChild(e),setTimeout(()=>e.classList.add("show"),100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.remove(),300)},3e3)},B=()=>{const t=a.currentUser!==null,e=a.currentUser?.role==="admin",s=a.route==="cart",i=a.cart.length;return`
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
                                value="${a.searchQuery}"
                                oninput="window.handleSearchInput(event)"
                                onkeyup="if(event.key === 'Enter') window.handleSearch()"
                                onfocus="window.showSearchSuggestions()"
                            >
                            <button class="search-btn" onclick="window.handleSearch()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                            ${a.showSuggestions&&a.searchQuery?`
                                <div class="search-suggestions" id="searchSuggestions">
                                    <div class="suggestions-header">Suggestions</div>
                                    ${a.searchSuggestions.slice(0,5).map(r=>`
                                        <div class="suggestion-item" onclick="window.selectSuggestion('${r.replace(/'/g,"\\'")}')"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                            <span>${r}</span>
                                        </div>
                                    `).join("")}
                                    ${a.searchQuery?`
                                        <div class="suggestion-search-all" onclick="window.handleSearch()">
                                            Search for "${a.searchQuery}" →
                                        </div>
                                    `:""}
                                </div>
                            `:""}
                        </div>
                    </div>
                `}

                <div class="nav-actions">
                    ${e?"":`
                    <a href="#" class="action-icon" onclick="window.navigate('cart'); return false;">
                        <div style="position: relative;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            ${i>0?`<span class="cart-count">${i}</span>`:""}
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
            
            <nav class="header-nav ${a.mobileMenuOpen?"mobile-open":""}">
                <a href="#" class="nav-link ${a.route==="home"?"active":""}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${a.route==="products"?"active":""}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link ${a.route==="deals"?"active":""}" onclick="window.navigate('deals'); return false;">Deals</a>
                <a href="#" class="nav-link ${a.route==="learn"?"active":""}" onclick="window.navigate('learn'); return false;">Learn</a>
                <a href="#" class="nav-link ${a.route==="about"?"active":""}" onclick="window.navigate('about'); return false;">About Us</a>
                <a href="#" class="nav-link ${a.route==="contact"?"active":""}" onclick="window.navigate('contact'); return false;">Contact Us</a>
                ${e?`<a href="#" class="nav-link ${a.route==="admin"?"active":""}" onclick="window.navigate('admin'); return false;">Admin Dashboard</a>`:""}
                
                ${t?`
                    <div class="mobile-logout" onclick="window.logout()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span>Logout</span>
                    </div>
                `:""}
            </nav>
        </header>
    `},k=t=>{const e=t.stock<10,s=e?"low-stock":"",i=e?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${t.id})" style="cursor: pointer;">
            <div class="product-badge ${s}">${i}</div>
            <div class="product-image">
                <img src="${t.image}" alt="${t.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${t.category}</div>
                <h3 class="product-title">${t.name}</h3>
                <div class="product-price">${l(t.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${t.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},T=()=>{const t=a.products.find(r=>r.id===a.currentProductId);if(!t)return h("home"),"";t.stock<10;const e=t.stock>0?"In Stock":"Out of Stock",s=t.stock>0?"var(--success)":"var(--danger)",i=a.products.filter(r=>r.id!==t.id).sort(()=>.5-Math.random()).slice(0,4);return`
        <div class="product-detail-container">
            <div class="breadcrumbs">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a> &gt; 
                <a href="#" onclick="window.navigate('products'); return false;">Products</a> &gt; 
                <span>${t.name}</span>
            </div>

            <div class="product-main">
                <div class="product-gallery">
                    <img src="${t.image}" alt="${t.name}">
                </div>

                <div class="product-details-info">
                    <div class="product-sku">SKU: LUM-${t.id.toString().padStart(4,"0")}</div>
                    <h1 class="detail-title">${t.name}</h1>
                    <div class="detail-price">${l(t.price)}</div>

                    <div class="detail-section">
                        <span class="detail-label">Description</span>
                        <p style="color: var(--text-muted); line-height: 1.6;">${t.description}</p>
                    </div>

                    <div class="detail-section">
                        <span class="detail-label">Quantity</span>
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="window.adjustDetailQty(-1)">-</button>
                            <input type="number" id="detailQty" class="qty-input" value="1" min="1" max="${t.stock}" readonly>
                            <button class="qty-btn" onclick="window.adjustDetailQty(1)">+</button>
                        </div>
                    </div>

                    <button class="btn-add-large" onclick="window.addToCartFromDetail(${t.id})">
                        Add To Cart
                    </button>

                    <div class="stock-status" style="color: ${s}">
                        <span class="stock-dot" style="background-color: ${s}"></span>
                        ${e} (${t.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${i.map(k).join("")}
                </div>
            </div>
        </div>
    `},I=()=>{if(a.searchQuery){const s=a.products.filter(i=>i.name.toLowerCase().includes(a.searchQuery.toLowerCase())||i.category.toLowerCase().includes(a.searchQuery.toLowerCase())||i.description.toLowerCase().includes(a.searchQuery.toLowerCase()));return`
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
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${s.length} result${s.length!==1?"s":""} for "${a.searchQuery}"</p>
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
        `}const t=[1,6,2,12,4];return`
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
                ${a.products.filter(s=>t.includes(s.id)).sort((s,i)=>t.indexOf(s.id)-t.indexOf(i.id)).map(k).join("")}
            </div>
        </div>
    `},A=()=>{let t=[...a.products];switch(a.searchQuery&&(t=t.filter(e=>e.name.toLowerCase().includes(a.searchQuery.toLowerCase())||e.category.toLowerCase().includes(a.searchQuery.toLowerCase())||e.description.toLowerCase().includes(a.searchQuery.toLowerCase()))),a.sortBy){case"price-asc":t.sort((e,s)=>e.price-s.price);break;case"price-desc":t.sort((e,s)=>s.price-e.price);break;case"name-asc":t.sort((e,s)=>e.name.localeCompare(s.name));break;case"name-desc":t.sort((e,s)=>s.name.localeCompare(e.name));break;case"featured":default:t.sort((e,s)=>e.id-s.id);break}return`
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
                        <span style="color: var(--text-muted); font-size: 0.9rem;">${t.length} products</span>
                    </div>
                    
                    <div class="sort-container">
                        <span class="sort-label">Sort by:</span>
                        <select class="sort-select" onchange="window.handleSort(this.value)">
                            <option value="featured" ${a.sortBy==="featured"?"selected":""}>Featured</option>
                            <option value="price-asc" ${a.sortBy==="price-asc"?"selected":""}>Price: Low to High</option>
                            <option value="price-desc" ${a.sortBy==="price-desc"?"selected":""}>Price: High to Low</option>
                            <option value="name-asc" ${a.sortBy==="name-asc"?"selected":""}>Alphabetical: A-Z</option>
                            <option value="name-desc" ${a.sortBy==="name-desc"?"selected":""}>Alphabetical: Z-A</option>
                        </select>
                    </div>
                </div>
            </div>

            ${a.searchQuery?`
                <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: var(--surface); border-radius: 8px; margin-bottom: 1.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>
                        Showing results for <strong>"${a.searchQuery}"</strong>
                    </span>
                </div>
            `:""}

            <div class="product-grid">
                ${t.map(k).join("")}
            </div>
        </div>
    `},N=()=>`
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
    `,z=()=>`
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
    `,j=()=>{if(a.cart.length===0)return`
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('products')">Start Shopping</button>
            </div>
        `;let t=a.cart;return a.cartSearchQuery&&(t=a.cart.filter(e=>e.name.toLowerCase().includes(a.cartSearchQuery.toLowerCase())||e.category.toLowerCase().includes(a.cartSearchQuery.toLowerCase()))),a.cart.reduce((e,s)=>e+s.price*s.quantity,0),`
        <div style="margin: 2rem auto; padding: 0 2rem;">
            <button class="btn btn-outline" onclick="window.navigate('products')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                ← Continue Shopping
            </button>
            
            <div class="cart-container">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0;">Shopping Cart</h2>
                    
                    ${a.cart.length>0?`
                        <div class="search-container" style="max-width: 400px; flex: 1;">
                            <input 
                                type="text" 
                                id="cartSearchInput" 
                                class="search-input" 
                                placeholder="Search items in cart..." 
                                value="${a.cartSearchQuery}"
                                oninput="window.handleCartSearch(event)"
                                style="width: 100%;"
                            >
                            <button class="search-btn" onclick="window.clearCartSearch()">
                                ${a.cartSearchQuery?`
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
                
                <div class="cart-search-message" style="${a.cartSearchQuery&&t.length===0?"":"display: none;"}">
                    ${a.cartSearchQuery&&t.length===0?`
                        <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                            No items found for "${a.cartSearchQuery}"
                        </p>
                    `:""}
                </div>
                
            <div class="cart-items">
                ${t.map(e=>{const s=a.products.filter(i=>i.category===e.category&&i.id!==e.id).slice(0,4);return`
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
                                <p class="text-muted">${l(e.price)}</p>
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
                            ${s.length>0?`
                                <div class="similar-products-grid">
                                    ${s.map(i=>`
                                        <div class="similar-product-card" onclick="window.viewProduct(${i.id})">
                                            <img src="${i.image}" alt="${i.name}" class="similar-product-image">
                                            <div class="similar-product-title" title="${i.name}">${i.name}</div>
                                            <div class="similar-product-price">${l(i.price)}</div>
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
                    <span>${l(a.cart.reduce((e,s)=>e+(s.selected!==!1?s.price*s.quantity:0),0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${a.cart.filter(e=>e.selected!==!1).length})
                </button>

            </div>
        </div>
        </div>
    `},q=()=>{if(!a.currentUser)return h("login"),"";const t=a.cart.filter(r=>r.selected!==!1);if(t.length===0)return c("No items selected for checkout"),h("cart"),"";const e=t.reduce((r,o)=>r+o.price*o.quantity,0),s=a.checkoutData.shippingFee,i=e+s;return`
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
                                    value="${a.checkoutData.shipping.fullName||(a.currentUser?a.currentUser.name:"")}"
                                    oninput="window.handleNameInput(this)"
                                    placeholder="e.g. Juan Dela Cruz">
                            </div>

                            <div>
                                <label class="form-label">Phone Number <span style="color: red;">*</span></label>
                                <input type="tel" class="form-input" 
                                    value="${a.checkoutData.shipping.phone}"
                                    oninput="window.handlePhoneInput(this)"
                                    maxlength="11"
                                    placeholder="09123456789">
                            </div>

                            <div>
                                <label class="form-label">Address <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${a.checkoutData.shipping.address}"
                                    onchange="window.updateShippingInfo('address', this.value)"
                                    placeholder="House/Unit No., Street Name, Barangay">
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label class="form-label">City <span style="color: red;">*</span></label>
                                    <input type="text" class="form-input" 
                                        value="${a.checkoutData.shipping.city}"
                                        oninput="window.handleLocationInput(this, 'city')"
                                        placeholder="e.g. Makati">
                                </div>
                                <div>
                                    <label class="form-label">Province <span style="color: red;">*</span></label>
                                    <input type="text" class="form-input" 
                                        value="${a.checkoutData.shipping.province}"
                                        oninput="window.handleLocationInput(this, 'province')"
                                        placeholder="e.g. Metro Manila">
                                </div>
                            </div>

                            <div>
                                <label class="form-label">Postal Code <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${a.checkoutData.shipping.postalCode}"
                                    oninput="window.handlePostalInput(this)"
                                    maxlength="4"
                                    placeholder="e.g. 1200">
                            </div>

                            <div>
                                <label class="form-label">Delivery Instructions (Optional)</label>
                                <textarea class="form-input" 
                                    onchange="window.updateShippingInfo('instructions', this.value)"
                                    rows="3"
                                    placeholder="Floor number, landmark, etc.">${a.checkoutData.shipping.instructions||""}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="admin-section">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">💳 Payment Method <span style="color: red;">*</span></h2>
                        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem;">
                            ${[{id:"cod",label:"Cash on Delivery",image:"/lumina/images/payment/cod.png"},{id:"gcash",label:"GCash",image:"/lumina/images/payment/gcash.png"},{id:"maya",label:"Maya",image:"/lumina/images/payment/maya.png"},{id:"card",label:"Credit/Debit Card",image:"/lumina/images/payment/card.png"},{id:"bank",label:"Bank Transfer",image:"/lumina/images/payment/bank.png"}].map(r=>`
                                <div class="payment-method-card" onclick="window.selectPaymentMethod('${r.id}')" style="padding: 0.75rem; border: 2px solid ${a.checkoutData.paymentMethod===r.id?"var(--primary)":"var(--border)"}; border-radius: var(--radius-md); cursor: pointer; text-align: center; transition: all 0.2s; background: ${a.checkoutData.paymentMethod===r.id?"rgba(0, 43, 91, 0.05)":"var(--surface)"};">
                                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                                        <img src="${r.image}" alt="${r.label}" style="max-width: 100%; max-height: 48px; object-fit: contain;">
                                    </div>
                                    <div style="font-size: 0.75rem; font-weight: 600; line-height: 1.2;">${r.label}</div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="cart-summary" style="position: sticky; top: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Order Summary</h2>
                        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem;">
                            ${t.map(r=>`
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                                    <img src="${r.image}" alt="${r.name}" style="width: 60px; height: 60px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${r.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-muted);">Qty: ${r.quantity}</div>
                                    </div>
                                    <div style="font-weight: 700; color: var(--primary);">${l(r.price*r.quantity)}</div>
                                </div>
                            `).join("")}
                        </div>
                        <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Subtotal</span>
                                <span>${l(e)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Shipping Fee</span>
                                <span>${l(s)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                                <span>Total</span>
                                <span style="color: var(--primary);">${l(i)}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="window.placeOrder()" style="width: 100%; padding: 1rem; font-size: 1rem;">Place Order</button>
                        <div style="margin-top: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);">🔒 Your payment information is secure</div>
                    </div>
                </div>
            </div>
        </div>
    `},U=()=>{if(!a.lastOrderId)return h("home"),"";const t=a.orders.find(o=>o.orderId===a.lastOrderId);if(!t)return h("home"),"";const e=new Date,s=new Date(e);s.setDate(e.getDate()+3);const i=new Date(e);i.setDate(e.getDate()+5);const r=`${s.toLocaleDateString("en-US",{month:"short",day:"numeric"})} - ${i.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} `;return`
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
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">#${t.orderId}</div>
                        </div>
                        <div>
                            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">Order Date</div>
                            <div style="font-weight: 600;">${new Date(t.createdAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--success); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">1</div>
                        <div style="font-weight: 600;">Estimated Delivery</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">${r}</div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">2</div>
                        <div style="font-weight: 600;">Payment Status</div>
                    </div>
                    <div style="padding-left: 2rem;">
                        <span class="badge badge-${a.checkoutData.paymentMethod==="cod"?"warning":"success"}" style="font-size: 0.875rem; padding: 0.375rem 0.75rem;">
                            ${a.checkoutData.paymentMethod==="cod"?"Cash on Delivery":"Payment Confirmed"}
                        </span>
                    </div>
                </div>

                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">3</div>
                        <div style="font-weight: 600;">Shipping Address</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">
                        ${a.checkoutData.shipping.fullName}<br>
                        ${a.checkoutData.shipping.address}<br>
                        ${a.checkoutData.shipping.city}, ${a.checkoutData.shipping.province} ${a.checkoutData.shipping.postalCode}<br>
                        ${a.checkoutData.shipping.phone}
                    </div>
                </div>
            </div>

            <div class="admin-section" style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Order Items</h3>
                ${t.items.map(o=>`
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
                    <span style="color: var(--primary);">${l(t.total)}</span>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="window.printReceipt()" style="padding: 0.875rem 2rem;">🖨️ Print Receipt</button>
                <button class="btn btn-outline" onclick="window.navigate('home')" style="padding: 0.875rem 2rem;">🏠 Back to Shop</button>
            </div>

            <div style="text-align: center; margin-top: 3rem; padding: 1.5rem; background: var(--surface-alt); border-radius: var(--radius-md);">
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">An email confirmation has been sent to <strong>${a.currentUser.email}</strong></p>
                <p style="font-size: 0.875rem; color: var(--text-muted);">Questions? Contact us at support@luminaelectronics.com</p>
            </div>
        </div>
    `};window.updateOrderStatus=(t,e)=>{const s=a.orders.find(i=>i.id===t);s&&(s.status=e,b(),c(`Order #${t} updated to ${e}`),g())};window.toggleSelectAll=t=>{document.querySelectorAll(".product-checkbox").forEach(s=>s.checked=t.checked)};window.bulkAction=t=>{const e=document.querySelectorAll(".product-checkbox:checked"),s=Array.from(e).map(i=>parseInt(i.value));if(s.length===0){c("No products selected");return}t==="delete"?confirm(`Delete ${s.length} products?`)&&(a.products=a.products.filter(i=>!s.includes(i.id)),b(),g(),c("Products deleted")):t==="restock"&&(a.products.forEach(i=>{s.includes(i.id)&&(i.stock+=10)}),b(),g(),c("Products restocked"))};window.viewOrderDetails=t=>{const e=a.orders.find(r=>r.id===t);if(!e)return;const s=a.users.find(r=>r.id===e.userId),i=`
        <div class="modal-overlay show" id="orderModal" onclick="if(event.target === this) window.closeModal()">
            <div class="modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Order #${e.id}</h3>
                    <button class="btn-icon" onclick="window.closeModal()">✕</button>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Customer:</strong> ${s?s.name:"Unknown"}</p>
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
                        ${e.items.map(r=>`
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 0.5rem;">${r.name}</td>
                                <td style="padding: 0.5rem;">${r.quantity}</td>
                                <td style="padding: 0.5rem;">${l(r.price)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${l(e.total)}
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",i)};window.closeModal=()=>{const t=document.getElementById("orderModal");t&&t.remove()};const Q=()=>{if(!a.currentUser||a.currentUser.role!=="admin")return h("home"),"";a.orders.length===0&&w.getOrders();const t=a.orders.reduce((n,u)=>n+u.total,0),e=a.orders.length;a.products.length;const s=a.users.filter(n=>n.role==="customer").length,i=a.products.filter(n=>n.stock<10);a.products.filter(n=>n.stock===0);const r=a.orders.slice(0,5),o=e>0?t/e:0,d={};a.products.forEach(n=>{d[n.category]=(d[n.category]||0)+1});const m=Object.entries(d).map(([n,u])=>({name:n,count:u})),p=[450,720,550,890,600,950,1200],v=Math.max(...p);return`
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
                        ${p.map(n=>`
                            <div class="chart-bar" style="height: ${n/v*100}%" data-value="${l(n)}"></div>
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
                            ${m.length} Cats
                        </div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        ${m.slice(0,3).map(n=>`<span class="badge badge-info">${n.name}: ${n.count}</span>`).join("")}
                    </div>
                </div>

                <!-- Top Products -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🏆 Top Products</h3>
                    </div>
                    <div class="top-products-list">
                        ${a.products.slice(0,4).map(n=>`
                            <div class="top-product-item">
                                <img src="${n.image}" style="width: 32px; height: 32px; object-fit: contain;">
                                <div style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                                        <span>${n.name}</span>
                                        <span>${l(n.price)}</span>
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
                        <div class="metric-value">${l(t)}</div>
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
                            ${r.length>0?r.map(n=>{const u=a.users.find(y=>y.id===n.userId);return`
                                    <tr>
                                        <td><strong>#${n.orderId}</strong></td>
                                        <td>${new Date(n.createdAt).toLocaleDateString()}</td>
                                        <td>${u?u.name:"Unknown (ID: "+n.userId+")"}</td>
                                        <td>${n.items.length} items</td>
                                        <td><strong>${l(n.total)}</strong></td>
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
                            ${a.products.map(n=>`
                                <tr>
                                    <td><input type="checkbox" class="product-checkbox" value="${n.id}"></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${n.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${n.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${n.category}</span></td>
                                    <td>${l(n.price)}</td>
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
                            ${a.users.filter(n=>n.role==="customer").slice(0,3).map(n=>`
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
    `},F=(t=null)=>{const e=t?a.products.find(i=>i.id===t):null,s=!!e;return`
        <div class="modal-overlay show" id="productModal" onclick="if(event.target === this) window.closeProductModal()">
            <div class="modal-content" style="max-width: 600px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>${s?"Edit Product":"Add New Product"}</h3>
                    <button class="btn-icon" onclick="window.closeProductModal()">✕</button>
                </div>
                
                <form id="productForm" onsubmit="window.handleProductSubmit(event, ${t||"null"})" enctype="multipart/form-data">
                    <div class="form-group">
                        <label class="form-label">Product Name *</label>
                        <input type="text" name="name" class="form-input" value="${e?.name||""}" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Category *</label>
                        <input type="text" name="category" class="form-input" value="${e?.category||""}" required>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label class="form-label">Price (₱) *</label>
                            <input type="number" name="price" class="form-input" value="${e?.price||""}" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Stock *</label>
                            <input type="number" name="stock" class="form-input" value="${e?.stock||""}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Description *</label>
                        <textarea name="description" class="form-input" rows="3" required>${e?.description||""}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Image</label>
                        <input type="file" name="image" class="form-input" accept="image/*">
                        ${e?.image?`<div style="margin-top: 0.5rem;">Current: <img src="${e.image}" style="max-width: 100px;"></div>`:""}
                    </div>
                    
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <button type="button" class="btn btn-outline" style="flex: 1;" onclick="window.closeProductModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary" style="flex: 1;">${s?"Update":"Create"} Product</button>
                    </div>
                </form>
            </div>
        </div>
    `};window.navigate=h;window.toggleMobileMenu=()=>{a.mobileMenuOpen=!a.mobileMenuOpen,g()};window.showProductModal=(t=null)=>{document.body.insertAdjacentHTML("beforeend",F(t))};window.closeProductModal=()=>{document.getElementById("productModal")?.remove()};window.editProduct=t=>{window.showProductModal(t)};window.deleteProduct=async t=>{if(confirm("Delete this product?"))try{await f(`/products/${t}`,{method:"DELETE"}),await w.getProducts(),c("Product deleted")}catch{c("Delete failed")}};window.handleProductSubmit=async(t,e)=>{t.preventDefault();const s=new FormData(t.target);try{const i=e?"PUT":"POST",r=e?`/products/${e}`:"/products";if(!(await fetch(`${P}${r}`,{method:i,body:s})).ok)throw new Error("Failed");await w.getProducts(),window.closeProductModal(),c(e?"Product updated!":"Product created!")}catch{c("Operation failed")}};window.handleSort=t=>{a.sortBy=t,g()};window.viewProduct=t=>{a.currentProductId=t,h("product-detail")};window.adjustDetailQty=t=>{const e=document.getElementById("detailQty");let s=parseInt(e.value)+t;s<1&&(s=1),e.value=s};window.addToCartFromDetail=t=>{const e=parseInt(document.getElementById("detailQty").value);if(!a.currentUser){c("Please login to shop"),h("login");return}const s=a.products.find(r=>r.id===t),i=a.cart.find(r=>r.id===t);i?i.quantity+=e:a.cart.push({...s,quantity:e}),b(),c(`Added ${e} item(s) to cart`)};window.addToCart=async t=>{if(!a.currentUser){c("Please login to shop"),h("login");return}const e=a.products.find(i=>i.id===t),s=a.cart.find(i=>i.id===t);s?s.quantity+=1:a.cart.push({...e,quantity:1}),b(),g(),c("Added to cart"),a.currentUser&&await f(`/users/${a.currentUser.id}/cart`,{method:"PUT",body:JSON.stringify({cart:a.cart.map(i=>({productId:i.id,name:i.name,price:i.price,image:i.image,quantity:i.quantity,category:i.category,selected:i.selected!==!1}))})})};window.updateQuantity=(t,e)=>{if(e<1){window.removeFromCart(t);return}const s=a.cart.find(i=>i.id===t);s&&(s.quantity=e,b(),g())};window.removeFromCart=t=>{a.cart=a.cart.filter(e=>e.id!==t),b(),g()};window.checkout=async()=>{if(a.cart.length===0)return;if(!a.currentUser){c("Please login to checkout"),h("login");return}if(a.cart.filter(e=>e.selected!==!1).length===0){c("No items selected for checkout");return}h("checkout")};window.updateShippingInfo=(t,e)=>{a.checkoutData.shipping[t]=e};window.selectPaymentMethod=t=>{a.checkoutData.paymentMethod=t,g()};window.handlePhoneInput=t=>{const e=t.value.replace(/[^0-9]/g,"");t.value=e,a.checkoutData.shipping.phone=e};window.handleNameInput=t=>{const e=t.value.replace(/[^a-zA-Z\s]/g,"");t.value=e,a.checkoutData.shipping.fullName=e};window.handleLocationInput=(t,e)=>{const s=t.value.replace(/[^a-zA-Z\s]/g,"");t.value=s,a.checkoutData.shipping[e]=s};window.handlePostalInput=t=>{const e=t.value.replace(/[^0-9]/g,"");t.value=e,a.checkoutData.shipping.postalCode=e};window.showPaymentModal=t=>new Promise(e=>{let s="";const i=`
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
                                <span style="font-weight: 700;">${l(t)}</span>
                            </div>
                            <div class="payment-summary-row total">
                                <span>To Pay:</span>
                                <span>${l(t)}</span>
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
                            <button class="quick-amount-btn" data-amount="${t}">Exact</button>
                            <button class="quick-amount-btn" data-amount="${t+50}">+₱50</button>
                            <button class="quick-amount-btn" data-amount="${t+100}">+₱100</button>
                            <button class="quick-amount-btn" data-amount="${Math.ceil(t/100)*100}">Round</button>
                            <button class="quick-amount-btn" data-amount="${t+500}">+₱500</button>
                            <button class="quick-amount-btn" data-amount="${t+1e3}">+₱1000</button>
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
        `;document.body.insertAdjacentHTML("beforeend",i);const r=document.getElementById("paymentModalOverlay"),o=document.getElementById("paymentAmountInput"),d=document.getElementById("paymentError"),m=document.getElementById("paymentChangeDisplay"),p=document.getElementById("changeAmount"),v=document.getElementById("paymentConfirmBtn"),n=document.getElementById("paymentCancelBtn");setTimeout(()=>o.focus(),100),o.addEventListener("input",u=>{let y=u.target.value.replace(/[^0-9.]/g,"");const S=y.split(".");S.length>2&&(y=S[0]+"."+S.slice(1).join("")),u.target.value=y,s=y;const x=parseFloat(y);if(!y||isNaN(x)||x<0){d.textContent="",d.classList.remove("show"),o.classList.remove("error"),v.disabled=!0,m.classList.remove("show");return}if(x<t){const C=t-x;d.textContent=`Insufficient! Need ${l(C)} more`,d.classList.add("show"),o.classList.add("error"),v.disabled=!0,m.classList.remove("show")}else{const C=x-t;d.classList.remove("show"),o.classList.remove("error"),v.disabled=!1,m.classList.add("show"),p.textContent=l(C)}}),document.querySelectorAll(".quick-amount-btn").forEach(u=>{u.addEventListener("click",()=>{const y=u.getAttribute("data-amount");o.value=y,o.dispatchEvent(new Event("input"))})}),n.addEventListener("click",()=>{r.remove(),e(null)}),r.addEventListener("click",u=>{u.target===r&&(r.remove(),e(null))}),v.addEventListener("click",()=>{const u=parseFloat(s);u>=t&&(r.remove(),e({amountPaid:u,change:u-t}))}),o.addEventListener("keypress",u=>{u.key==="Enter"&&!v.disabled&&v.click()}),document.addEventListener("keydown",function u(y){y.key==="Escape"&&(r.remove(),e(null),document.removeEventListener("keydown",u))})});window.showGCashModal=t=>new Promise(e=>{const s="GCASH-"+Date.now().toString().slice(-8),i=`
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
                                <span>${l(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",i);const r=document.getElementById("paymentModalOverlay"),o=document.getElementById("paymentConfirmBtn"),d=document.getElementById("paymentCancelBtn"),m=document.getElementById("processingOverlay"),p=document.getElementById("successOverlay");d.addEventListener("click",()=>{r.remove(),e(null)}),o.addEventListener("click",()=>{m.classList.add("show"),setTimeout(()=>{m.classList.remove("show"),p.classList.add("show"),setTimeout(()=>{r.remove(),e({method:"gcash",reference:s})},1e3)},1500)}),r.addEventListener("click",v=>{v.target===r&&(r.remove(),e(null))})});window.showMayaModal=t=>new Promise(e=>{const s="MAYA-"+Date.now().toString().slice(-8),i=`
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
                                <span>${l(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",i);const r=document.getElementById("paymentModalOverlay"),o=document.getElementById("paymentConfirmBtn"),d=document.getElementById("paymentCancelBtn"),m=document.getElementById("processingOverlay"),p=document.getElementById("successOverlay");d.addEventListener("click",()=>{r.remove(),e(null)}),o.addEventListener("click",()=>{m.classList.add("show"),setTimeout(()=>{m.classList.remove("show"),p.classList.add("show"),setTimeout(()=>{r.remove(),e({method:"maya",reference:s})},1e3)},1500)}),r.addEventListener("click",v=>{v.target===r&&(r.remove(),e(null))})});window.showCardModal=t=>new Promise(e=>{const d=`
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
                                <span>${l(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",d);const m=document.getElementById("paymentModalOverlay"),p=document.getElementById("paymentConfirmBtn"),v=document.getElementById("paymentCancelBtn"),n=document.getElementById("processingOverlay"),u=document.getElementById("successOverlay");v.addEventListener("click",()=>{m.remove(),e(null)}),p.addEventListener("click",()=>{n.classList.add("show"),setTimeout(()=>{n.classList.remove("show"),u.classList.add("show"),setTimeout(()=>{m.remove(),e({method:"card",last4:"1111"})},1e3)},2e3)}),m.addEventListener("click",y=>{y.target===m&&(m.remove(),e(null))})});window.showBankModal=t=>new Promise(e=>{const s="BDO-"+Date.now().toString().slice(-8),i=`
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
                                <span>${l(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",i);const r=document.getElementById("paymentModalOverlay"),o=document.getElementById("paymentConfirmBtn"),d=document.getElementById("paymentCancelBtn"),m=document.getElementById("processingOverlay"),p=document.getElementById("successOverlay");d.addEventListener("click",()=>{r.remove(),e(null)}),o.addEventListener("click",()=>{m.classList.add("show"),setTimeout(()=>{m.classList.remove("show"),p.classList.add("show"),setTimeout(()=>{r.remove(),e({method:"bank",reference:s})},1e3)},1500)}),r.addEventListener("click",v=>{v.target===r&&(r.remove(),e(null))})});window.placeOrder=async()=>{const t=a.checkoutData.shipping;if(!t.fullName||!t.fullName.trim()){c("Please enter your full name");return}if(!t.address||!t.address.trim()){c("Please enter your address");return}if(!t.city||!t.city.trim()){c("Please enter your city");return}if(!t.province||!t.province.trim()){c("Please enter your province");return}if(!t.phone||!t.phone.trim()){c("Please enter your phone number");return}if(!/^09\d{9}$/.test(t.phone)){c('Phone number must start with "09" and contain exactly 11 digits');return}const s=/^[a-zA-Z\s]+$/;if(!s.test(t.fullName)){c("Full Name must contain letters and spaces only");return}if(!s.test(t.city)){c("City must contain letters and spaces only");return}if(!s.test(t.province)){c("Province must contain letters and spaces only");return}if(t.postalCode&&!/^\d+$/.test(t.postalCode)){c("Postal Code must contain numbers only");return}if(!a.checkoutData.paymentMethod){c("Please select a payment method");return}const i=a.cart.filter(n=>n.selected!==!1),o=i.reduce((n,u)=>n+u.price*u.quantity,0)+a.checkoutData.shippingFee;let d=null;switch(a.checkoutData.paymentMethod){case"cod":d=await showPaymentModal(o);break;case"gcash":d=await showGCashModal(o);break;case"maya":d=await showMayaModal(o);break;case"card":d=await showCardModal(o);break;case"bank":d=await showBankModal(o);break;default:c("Please select a payment method");return}if(!d)return;let m=d.amountPaid||o,p=d.change||0;const v={userId:a.currentUser.id,items:i.map(n=>({productId:n.id,quantity:n.quantity,price:n.price,name:n.name})),total:o,shippingInfo:a.checkoutData.shipping,paymentMethod:a.checkoutData.paymentMethod,shippingFee:a.checkoutData.shippingFee,amountPaid:m,change:p};try{const n=await w.createOrder(v);a.lastOrderId=n.orderId,a.lastOrderPayment={amountPaid:m,change:p},a.orders.push({orderId:n.orderId,...n,items:i,total:o,createdAt:new Date().toISOString(),userId:a.currentUser.id}),a.cart=a.cart.filter(u=>u.selected===!1),b(),h("order-confirmation")}catch{}};window.printReceipt=()=>{if(!a.lastOrderId){c("No order found to print");return}const t=a.orders.find(o=>o.orderId===a.lastOrderId);if(!t){c("Order not found");return}const e=a.lastOrderPayment||{},s=new Date,i=`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Receipt #${t.orderId}</title>
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
                    <span><strong>${t.orderId}</strong></span>
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
                    <span>${a.currentUser.name}</span>
                </div>
                <div class="info-row">
                    <span>Payment:</span>
                    <span>${a.checkoutData.paymentMethod.toUpperCase()}</span>
                </div>
            </div>
            
            <div class="items-section">
                <div class="items-header">
                    <div>ITEM</div>
                    <div class="text-center">QTY</div>
                    <div class="text-right">AMOUNT</div>
                </div>
                
                ${t.items.map(o=>`
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
                    <span>${l(t.total-a.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping Fee:</span>
                    <span>${l(a.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row grand-total">
                    <span>TOTAL:</span>
                    <span>${l(t.total)}</span>
                </div>
            </div>
            
            ${e.amountPaid?`
                <div class="payment-section">
                    <div class="payment-row">
                        <span>Amount Paid:</span>
                        <span>${l(e.amountPaid)}</span>
                    </div>
                    <div class="payment-row change-row">
                        <span>Change:</span>
                        <span>${l(e.change)}</span>
                    </div>
                </div>
            `:""}
            
            <div class="receipt-footer">
                <div class="thank-you">THANK YOU!</div>
                <div class="footer-note">Please come again</div>
                <div class="footer-note" style="margin-top: 10px;">
                    Shipping to:<br>
                    ${a.checkoutData.shipping.fullName}<br>
                    ${a.checkoutData.shipping.address}<br>
                    ${a.checkoutData.shipping.city}, ${a.checkoutData.shipping.province}<br>
                    Phone: ${a.checkoutData.shipping.phone}
                </div>
                <div style="margin-top: 15px; font-size: 9px;">
                    This serves as your official receipt<br>
                    Keep this for warranty claims
                </div>
            </div>
        </body>
        </html>
    `,r=window.open("","_blank","width=300,height=600");r.document.write(i),r.document.close(),r.onload=function(){setTimeout(()=>{r.print()},250)}};const H=()=>`
        <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
            <div class="breadcrumbs" style="margin-bottom: 2rem;">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a>
                <span>&gt;</span>
                <span>Contact Us</span>
            </div>
            
            <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary);">Get in Touch</h1>
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 3rem;">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
                <div>
                    <form onsubmit="event.preventDefault(); window.showToast('Message sent! We will get back to you soon.');" style="background: var(--surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
                        <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem;">Send us a Message</h2>
                        
                        <div class="form-group">
                            <label class="form-label">Your Name</label>
                            <input type="text" class="form-input" placeholder="Juan Dela Cruz" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Email Address</label>
                            <input type="email" class="form-input" placeholder="juan@example.com" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Subject</label>
                            <input type="text" class="form-input" placeholder="How can we help you?" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Message</label>
                            <textarea class="form-input" rows="6" placeholder="Tell us more about your inquiry..." required style="resize: vertical; font-family: var(--font-body);"></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                    </form>
                </div>
                
                <div>
                    <div style="background: var(--surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border); margin-bottom: 2rem;">
                        <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem;">Contact Information</h2>
                        
                        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                            <div style="display: flex; gap: 1rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                <div>
                                    <h3 style="font-size: 1rem; margin-bottom: 0.25rem;">Address</h3>
                                    <p style="color: var(--text-muted);">123 Electronics Avenue, Tech City, Philippines</p>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 1rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                <div>
                                    <h3 style="font-size: 1rem; margin-bottom: 0.25rem;">Phone</h3>
                                    <p style="color: var(--text-muted);">+63 912 345 6789</p>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 1rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <div>
                                    <h3 style="font-size: 1rem; margin-bottom: 0.25rem;">Email</h3>
                                    <p style="color: var(--text-muted);">support@luminaelectronics.ph</p>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 1rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <div>
                                    <h3 style="font-size: 1rem; margin-bottom: 0.25rem;">Business Hours</h3>
                                    <p style="color: var(--text-muted);">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                                    <p style="color: var(--text-muted);">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%); padding: 2rem; border-radius: var(--radius-lg); color: white;">
                        <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: white;">Need Immediate Help?</h3>
                        <p style="margin-bottom: 1.5rem; opacity: 0.9;">Our support team is available during business hours to assist you with any questions or concerns.</p>
                        <button class="btn" style="background: white; color: var(--primary); width: 100%;" onclick="window.showToast('Opening live chat...')">Start Live Chat</button>
                    </div>
                </div>
            </div>
        </div>
    `,R=()=>`
        <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
            <div class="breadcrumbs" style="margin-bottom: 2rem;">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a>
                <span>&gt;</span>
                <span>About Us</span>
            </div>
            
            <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary);">About Lumina Electronics</h1>
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 3rem;">Your trusted partner for quality electronics components since 2020</p>
            
            <div style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--border); margin-bottom: 3rem;">
                <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem;">Our Story</h2>
                <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 1rem;">
                    Founded in 2020, Lumina Electronics started with a simple mission: to make quality electronics components accessible to everyone. From hobbyists and students to professional engineers and makers, we serve a diverse community of innovators and creators.
                </p>
                <p style="color: var(--text-muted); line-height: 1.8;">
                    What began as a small online store has grown into one of the Philippines' most trusted sources for development boards, sensors, components, and maker supplies. We pride ourselves on offering authentic products, competitive prices, and exceptional customer service.
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem;">
                <div style="background: var(--surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border); text-align: center;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary), var(--accent)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem;">Authentic Products</h3>
                    <p style="color: var(--text-muted); line-height: 1.6;">100% genuine components from trusted manufacturers worldwide</p>
                </div>
                
                <div style="background: var(--surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border); text-align: center;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary), var(--accent)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                    </div>
                    <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem;">Fast Shipping</h3>
                    <p style="color: var(--text-muted); line-height: 1.6;">Quick delivery to your doorstep anywhere in the Philippines</p>
                </div>
                
                <div style="background: var(--surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border); text-align: center;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary), var(--accent)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem;">Expert Support</h3>
                    <p style="color: var(--text-muted); line-height: 1.6;">Dedicated team ready to help with your projects and questions</p>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, var(--primary) 0%, #1a3a5c 100%); padding: 3rem; border-radius: var(--radius-lg); color: white; text-align: center;">
                <h2 style="font-size: 1.75rem; margin-bottom: 1rem; color: white;">Our Mission</h2>
                <p style="font-size: 1.1rem; line-height: 1.8; max-width: 800px; margin: 0 auto; opacity: 0.95;">
                    To empower innovators, educators, and makers by providing easy access to quality electronics components and fostering a community of learning and creativity.
                </p>
            </div>
        </div>
    `,V=()=>`
        <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
            <div class="breadcrumbs" style="margin-bottom: 2rem;">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a>
                <span>&gt;</span>
                <span>Learn</span>
            </div>
            
            <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary);">Learning Center</h1>
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 3rem;">Master electronics with our comprehensive tutorials and guides</p>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                <button class="btn btn-primary">All Tutorials</button>
                <button class="btn btn-outline">Beginner</button>
                <button class="btn btn-outline">Intermediate</button>
                <button class="btn btn-outline">Advanced</button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem;">
                ${[{id:1,title:"Getting Started with Arduino",category:"Beginner",duration:"15 min",image:"https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop"},{id:2,title:"ESP32 WiFi Projects",category:"Intermediate",duration:"30 min",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"},{id:3,title:"Raspberry Pi Home Automation",category:"Advanced",duration:"45 min",image:"https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop"},{id:4,title:"Sensor Integration Guide",category:"Intermediate",duration:"25 min",image:"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"},{id:5,title:"Soldering Basics",category:"Beginner",duration:"20 min",image:"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop"},{id:6,title:"PCB Design Fundamentals",category:"Advanced",duration:"60 min",image:"https://images.unsplash.com/photo-1530819568329-97653eafbbfa?w=400&h=300&fit=crop"}].map(e=>`
                    <div style="background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border); overflow: hidden; transition: all 0.3s ease; cursor: pointer;" 
                         onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='var(--shadow-xl)'"
                         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
                         onclick="window.showToast('Tutorial: ${e.title}')">
                        <div style="width: 100%; height: 200px; background: linear-gradient(135deg, var(--primary), var(--accent)); background-image: url('${e.image}'); background-size: cover; background-position: center;"></div>
                        <div style="padding: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                                <span style="background: var(--accent); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem; font-weight: 600;">${e.category}</span>
                                <span style="color: var(--text-muted); font-size: 0.875rem; display: flex; align-items: center; gap: 0.25rem;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    ${e.duration}
                                </span>
                            </div>
                            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text-main);">${e.title}</h3>
                            <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">Learn step-by-step how to implement this project with detailed instructions and code examples.</p>
                            <button class="btn btn-primary" style="width: 100%;">Start Learning</button>
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--border); margin-top: 3rem; text-align: center;">
                <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">Can't Find What You're Looking For?</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                    Request a tutorial topic and our team will create content based on your needs.
                </p>
                <button class="btn btn-accent" onclick="window.navigate('contact')">Request a Tutorial</button>
            </div>
        </div>
    `,Y=()=>`
        <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
            <div class="breadcrumbs" style="margin-bottom: 2rem;">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a>
                <span>&gt;</span>
                <span>Deals</span>
            </div>
            
            <div style="background: linear-gradient(135deg, var(--accent) 0%, #ff4f1a 100%); padding: 3rem; border-radius: var(--radius-lg); margin-bottom: 3rem; color: white; text-align: center;">
                <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: white;">Special Deals & Promotions</h1>
                <p style="font-size: 1.1rem; opacity: 0.95;">Save big on quality electronics components - Limited time offers!</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
                ${[{id:1,name:"Arduino Starter Kit Bundle",originalPrice:2500,salePrice:1999,discount:20,category:"Development Boards",image:"https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop",endsIn:"2 days"},{id:2,name:"Sensor Pack - 20 Types",originalPrice:1800,salePrice:1299,discount:28,category:"Sensors",image:"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",endsIn:"5 days"},{id:6,name:"Servo Motor Bundle (5pcs)",originalPrice:800,salePrice:599,discount:25,category:"Motors",image:"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",endsIn:"1 week"},{id:12,name:"Premium Jumper Wire Set",originalPrice:350,salePrice:249,discount:29,category:"Accessories",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",endsIn:"3 days"}].map(e=>`
                    <div style="background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border); overflow: hidden; transition: all 0.3s ease; position: relative; cursor: pointer;"
                         onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='var(--shadow-xl)'"
                         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
                         onclick="window.showToast('Added to cart: ${e.name}')">
                        <div style="position: absolute; top: 1rem; right: 1rem; background: var(--accent); color: white; padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 700; font-size: 0.875rem; z-index: 10;">
                            -${e.discount}%
                        </div>
                        <div style="width: 100%; height: 200px; background: linear-gradient(135deg, var(--primary), var(--accent)); background-image: url('${e.image}'); background-size: cover; background-position: center;"></div>
                        <div style="padding: 1.5rem;">
                            <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">${e.category}</div>
                            <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--text-main); font-weight: 700;">${e.name}</h3>
                            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                                <span style="font-size: 1.5rem; font-weight: 800; color: var(--accent);">${l(e.salePrice)}</span>
                                <span style="text-decoration: line-through; color: var(--text-muted); font-size: 1rem;">${l(e.originalPrice)}</span>
                            </div>
                            <div style="background: var(--surface-alt); padding: 0.5rem; border-radius: var(--radius-sm); margin-bottom: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);">
                                ⏰ Ends in ${e.endsIn}
                            </div>
                            <button class="btn btn-primary" style="width: 100%;" onclick="event.stopPropagation(); window.addToCart(${e.id})">Add to Cart</button>
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--border); text-align: center;">
                <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">Subscribe for Exclusive Deals</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                    Get early access to sales, special promotions, and new product launches delivered straight to your inbox.
                </p>
                <form onsubmit="event.preventDefault(); window.showToast('Successfully subscribed to newsletter!');" style="display: flex; gap: 1rem; max-width: 500px; margin: 0 auto;">
                    <input type="email" class="form-input" placeholder="Enter your email address" required style="flex: 1;">
                    <button type="submit" class="btn btn-accent">Subscribe</button>
                </form>
            </div>
        </div>
    `;window.handleSearchInput=t=>{const e=t.target.value;if(a.searchQuery=e,e.trim()){const s=new Set;a.products.forEach(i=>{const r=i.name.toLowerCase(),o=i.category.toLowerCase(),d=e.toLowerCase();r.includes(d)&&s.add(i.name),o.includes(d)&&s.add(i.category),r.split(" ").forEach(p=>{p.toLowerCase().startsWith(d)&&p.length>2&&s.add(p.charAt(0).toUpperCase()+p.slice(1))})}),a.searchSuggestions=Array.from(s).slice(0,8),a.showSuggestions=!0}else if(a.searchSuggestions=[],a.showSuggestions=!1,a.route==="home"||a.route==="products"){g();return}D()};function D(){const t=document.querySelector(".search-container");if(!t)return;const e=t.querySelector(".search-suggestions");if(e&&e.remove(),a.showSuggestions&&a.searchQuery){const s=`
            <div class="search-suggestions" id="searchSuggestions">
                <div class="suggestions-header">Suggestions</div>
                ${a.searchSuggestions.slice(0,5).map(i=>`
                    <div class="suggestion-item" onclick="window.selectSuggestion('${i.replace(/'/g,"\\'")}')"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <span>${i}</span>
                    </div>
                `).join("")}
                ${a.searchQuery?`
                    <div class="suggestion-search-all" onclick="window.handleSearch()">
                        Search for "${a.searchQuery}" →
                    </div>
                `:""}
            </div>
        `;t.insertAdjacentHTML("beforeend",s)}}window.showSearchSuggestions=()=>{a.searchQuery&&(a.showSuggestions=!0,D())};window.selectSuggestion=t=>{a.searchQuery=t,a.showSuggestions=!1;const e=document.getElementById("searchInput");e&&(e.value=t),handleSearch()};window.handleSearch=()=>{a.showSuggestions=!1;const t=document.getElementById("searchInput");t&&(a.searchQuery=t.value.trim()),h("products"),setTimeout(()=>{const e=document.querySelector(".product-grid");e&&e.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{a.searchQuery="",a.showSuggestions=!1,a.searchSuggestions=[],g()};document.addEventListener("click",t=>{if(!t.target.closest(".search-container")&&a.showSuggestions){a.showSuggestions=!1;const e=document.querySelector(".search-suggestions");e&&e.remove()}});window.handleLogin=async t=>{console.log("Login attempt started"),t.preventDefault();const e=t.target.email.value,s=t.target.password.value;console.log("Credentials:",{email:e,password:s});try{await w.login(e,s),console.log("Login successful")}catch(i){console.error("Login error:",i)}};window.handleSignup=async t=>{console.log("Signup attempt started"),t.preventDefault();const e=t.target.name.value,s=t.target.email.value,i=t.target.password.value;try{await w.register(e,s,i)}catch(r){console.error("Signup error:",r)}};window.logout=()=>{a.currentUser=null,a.cart=[],localStorage.removeItem("currentUser"),localStorage.removeItem("cart_v2"),c("Logged out successfully"),sessionStorage.removeItem("currentRoute"),h("home")};window.deleteProduct=t=>{confirm("Are you sure you want to remove this product?")&&(a.products=a.products.filter(e=>e.id!==t),b(),g(),c("Product removed"))};window.viewOrderDetails=t=>{const e=a.orders.find(d=>d.orderId===t);if(!e){c("Order not found");return}const s=a.users.find(d=>d.id===e.userId),i=s?s.name:`User ID: ${e.userId}`,r=document.createElement("div");r.className="order-details-modal",r.innerHTML=`
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
                        <span class="info-value"><strong>#${e.orderId}</strong></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Customer:</span>
                        <span class="info-value">${i}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Date:</span>
                        <span class="info-value">${new Date(e.createdAt).toLocaleString()}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span class="info-value">
                            <span class="status-badge status-${e.status.toLowerCase()}">${e.status}</span>
                        </span>
                    </div>
                </div>
                
                <h3 style="margin: 1.5rem 0 1rem 0; color: var(--primary);">Items Ordered</h3>
                <div class="order-items-list">
                    ${e.items.map(d=>`
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
                    <span class="total-amount">${l(e.total)}</span>
                </div>
            </div>
        </div>
    `,document.body.appendChild(r);const o=d=>{d.key==="Escape"&&(r.remove(),document.removeEventListener("keydown",o))};document.addEventListener("keydown",o)};const g=()=>{const t=document.getElementById("app");let e="";switch(a.route){case"home":e=I();break;case"products":e=A();break;case"product-detail":e=T();break;case"login":e=N();break;case"signup":e=z();break;case"cart":e=j();break;case"checkout":e=q();break;case"order-confirmation":e=U();break;case"admin":e=Q();break;case"contact":e=H();break;case"about":e=R();break;case"learn":e=V();break;case"deals":e=Y();break;default:e=I()}t.innerHTML=`
        ${B()}
        <main>
            ${e}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `};window.handleCartSearch=t=>{a.cartSearchQuery=t.target.value,$()};window.clearCartSearch=()=>{a.cartSearchQuery="",$()};window.toggleCartItem=t=>{const e=a.cart.find(s=>s.id===t);e&&(e.selected=e.selected===!1,b(),$())};window.toggleFindSimilar=t=>{const e=a.cart.find(s=>s.id===t);e&&(a.cart.forEach(s=>{s.id!==t&&(s.showSimilar=!1)}),e.showSimilar=!e.showSimilar,b(),$())};function $(){const t=document.querySelector(".cart-items"),e=document.querySelector(".cart-summary"),s=document.querySelector(".cart-search-message");if(!t)return;let i=a.cart;if(a.cartSearchQuery&&(i=a.cart.filter(o=>o.name.toLowerCase().includes(a.cartSearchQuery.toLowerCase())||o.category.toLowerCase().includes(a.cartSearchQuery.toLowerCase()))),t.innerHTML=i.map(o=>{const d=a.products.filter(m=>m.category===o.category&&m.id!==o.id).slice(0,4);return`
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
                        ${d.map(m=>`
                            <div class="similar-product-card" onclick="window.viewProduct(${m.id})">
                                <img src="${m.image}" alt="${m.name}" class="similar-product-image">
                                <div class="similar-product-title" title="${m.name}">${m.name}</div>
                                <div class="similar-product-price">${l(m.price)}</div>
                            </div>
                        `).join("")}
                    </div>
                `:'<p class="text-muted text-center">No similar products found.</p>'}
            </div>
        </div>
    `}).join(""),e){const o=a.cart.reduce((m,p)=>m+(p.selected!==!1?p.price*p.quantity:0),0),d=a.cart.filter(m=>m.selected!==!1).length;e.innerHTML=`
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${l(o)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${d})
            </button>
        `}s&&(a.cartSearchQuery&&i.length===0?(s.innerHTML=`
                <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                    No items found for "${a.cartSearchQuery}"
                </p>
            `,s.style.display="block"):s.style.display="none");const r=document.querySelector("#cartSearchInput + .search-btn");r&&(r.innerHTML=a.cartSearchQuery?`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `:`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `)}const J=async()=>{await w.getProducts(),a.currentUser?.role==="admin"&&await Promise.all([w.getOrders(),w.getUsers()]),g()};J();
