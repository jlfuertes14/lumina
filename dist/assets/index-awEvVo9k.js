(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}})();const O="https://lumina-production-a4bb.up.railway.app",A="http://localhost:3000",E=window.location.hostname==="jlfuertes14.github.io",I=E?`${O}/api`:`${A}/api`;async function b(t,e={}){const o=`${I}${t}`;try{const r=await fetch(o,{...e,headers:{"Content-Type":"application/json",...e.headers}}),a=await r.json();if(!r.ok)throw new Error(a.error||a.message||"API request failed");return a}catch(r){throw console.error("API Error:",r),r}}console.log(`🌍 Environment: ${E?"PRODUCTION":"DEVELOPMENT"}`);console.log(`🔗 API URL: ${I}`);const i={products:[],users:[],orders:[],currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:sessionStorage.getItem("currentRoute")||"home",mobileMenuOpen:!1,searchQuery:"",showSuggestions:!1,searchSuggestions:[],currentProductId:null,devices:[],currentDeviceId:null,esp32Client:null,deviceStatus:{},telemetryData:{},sortBy:"featured",filterCategory:null,cartSearchQuery:"",isLoading:!1,cartSynced:!1,checkoutData:{shipping:{fullName:"",address:"",city:"",province:"",postalCode:"",phone:"",instructions:""},paymentMethod:"cod",shippingFee:50},lastOrderId:null},f={getProducts:async()=>{try{const t=await b("/products");i.products=t.data,v()}catch(t){console.error("Failed to load products:",t),l("Failed to load products")}},getMyDevices:async()=>{if(i.currentUser)try{const t=await b(`/devices/my-devices?userId=${i.currentUser._id}`);i.devices=t.data,v()}catch(t){console.error("Failed to load devices:",t)}},pairDevice:async(t,e)=>{try{const o=await b("/devices/pair",{method:"POST",body:JSON.stringify({deviceId:t,deviceToken:e,userId:i.currentUser._id})});l("Device paired successfully!"),await f.getMyDevices(),g("my-devices")}catch(o){throw l(o.message||"Device pairing failed"),o}},login:async(t,e)=>{console.log("Calling API login...");try{const o=await b("/users/login",{method:"POST",body:JSON.stringify({email:t,password:e})});i.currentUser=o.data,localStorage.setItem("currentUser",JSON.stringify(i.currentUser)),await f.getMyDevices(),await T(),l(`Welcome back, ${i.currentUser.name}!`),g("home")}catch(o){throw l(o.message||"Login failed"),o}},register:async(t,e,o)=>{try{const r=await b("/users/register",{method:"POST",body:JSON.stringify({name:t,email:e,password:o})});i.currentUser=r.data,localStorage.setItem("currentUser",JSON.stringify(i.currentUser)),l("Account created successfully!"),g("home")}catch(r){throw l(r.message||"Registration failed"),r}},createOrder:async t=>{try{const e=await b("/orders",{method:"POST",body:JSON.stringify(t)});return i.cart=[],w(),l("Order placed successfully!"),i.currentUser.role==="admin"&&f.getOrders(),e.data}catch(e){throw l(e.message||"Failed to place order"),e}},getOrders:async()=>{if(!(!i.currentUser||i.currentUser.role!=="admin"))try{const t=await b("/orders");i.orders=t.data,v()}catch(t){console.error("Failed to load orders:",t)}},getUsers:async()=>{if(!(!i.currentUser||i.currentUser.role!=="admin"))try{const t=await b("/users");i.users=t.data,v()}catch(t){console.error("Failed to load users:",t)}}},w=()=>{localStorage.setItem("currentUser",JSON.stringify(i.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(i.cart))},T=async()=>{if(!(!i.currentUser||i.cartSynced))try{const t=await b(`/users/${i.currentUser.id}/cart/sync`,{method:"POST",body:JSON.stringify({localCart:i.cart})});i.cart=t.data.map(e=>({id:e.productId,name:e.name,price:e.price,image:e.image,quantity:e.quantity,category:e.category,selected:e.selected})),i.cartSynced=!0,w(),v(),l("Cart synced!")}catch(t){console.error("Cart sync failed:",t)}},m=t=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(t),g=t=>{i.route=t,i.mobileMenuOpen=!1,sessionStorage.setItem("currentRoute",t),v(),window.scrollTo(0,0)},l=t=>{const e=document.createElement("div");e.className="toast",e.textContent=t,document.body.appendChild(e),setTimeout(()=>e.classList.add("show"),100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.remove(),300)},3e3)},x=t=>`
        <div class="breadcrumbs">
            <a href="#" onclick="window.navigate('home'); return false;">Home</a>
            <span class="breadcrumb-separator">›</span>
            <span>${{deals:"Deals",learn:"Learn","my-devices":"My Devices","device-pair":"Pair Device","remote-control":"Remote Control","about-us":"About Us","contact-us":"Contact Us",products:"Products",cart:"Cart",checkout:"Checkout"}[t]||t}</span>
        </div>
    `,j=()=>{const t=i.currentUser!==null,e=i.currentUser?.role==="admin",o=i.route==="cart",r=i.cart.length;return`
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
                
                ${o?"":`
                    <div class="search-bar">
                        <div class="search-container">
                            <input 
                                type="text" 
                                id="searchInput" 
                                class="search-input" 
                                placeholder="Search for Products..." 
                                value="${i.searchQuery}"
                                oninput="window.handleSearchInput(event)"
                                onkeyup="if(event.key === 'Enter') window.handleSearch()"
                                onfocus="window.showSearchSuggestions()"
                            >
                            <button class="search-btn" onclick="window.handleSearch()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                            ${i.showSuggestions&&i.searchQuery?`
                                <div class="search-suggestions" id="searchSuggestions">
                                    <div class="suggestions-header">Suggestions</div>
                                    ${i.searchSuggestions.slice(0,5).map(a=>`
                                        <div class="suggestion-item" onclick="window.selectSuggestion('${a.replace(/'/g,"\\'")}')"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                            <span>${a}</span>
                                        </div>
                                    `).join("")}
                                    ${i.searchQuery?`
                                        <div class="suggestion-search-all" onclick="window.handleSearch()">
                                            Search for "${i.searchQuery}" →
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
            
            <nav class="header-nav ${i.mobileMenuOpen?"mobile-open":""}">
                <a href="#" class="nav-link ${i.route==="home"?"active":""}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${i.route==="products"?"active":""}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link ${i.route==="deals"?"active":""}" onclick="window.navigate('deals'); return false;">Deals</a>
                <a href="#" class="nav-link ${i.route==="learn"?"active":""}" onclick="window.navigate('learn'); return false;">Learn</a>
                ${t&&!e?`
                    <a href="#" class="nav-link ${i.route==="my-devices"?"active":""}" 
                       onclick="window.navigate('my-devices'); return false;">My Devices 🚗</a>
                `:""}
                <a href="#" class="nav-link ${i.route==="about-us"?"active":""}" onclick="window.navigate('about-us'); return false;">About Us</a>
                <a href="#" class="nav-link ${i.route==="contact-us"?"active":""}" onclick="window.navigate('contact-us'); return false;">Contact Us</a>
                ${e?`<a href="#" class="nav-link ${i.route==="admin"?"active":""}" onclick="window.navigate('admin'); return false;">Admin Dashboard</a>`:""}
                ${t?`
                    <div class="mobile-logout" onclick="window.logout()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        <span>Logout</span>
                    </div>
                `:""}
            </nav>
        </header>
    `},C=t=>{const e=t.stock<10,o=e?"low-stock":"",r=e?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${t.id})" style="cursor: pointer;">
            <div class="product-badge ${o}">${r}</div>
            <div class="product-image">
                <img src="${t.image}" alt="${t.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${t.category}</div>
                <h3 class="product-title">${t.name}</h3>
                <div class="product-price">${m(t.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${t.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},N=()=>{const t=i.products.find(a=>a.id===i.currentProductId);if(!t)return g("home"),"";t.stock<10;const e=t.stock>0?"In Stock":"Out of Stock",o=t.stock>0?"var(--success)":"var(--danger)",r=i.products.filter(a=>a.id!==t.id).sort(()=>.5-Math.random()).slice(0,4);return`
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
                    <div class="detail-price">${m(t.price)}</div>

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

                    <div class="stock-status" style="color: ${o}">
                        <span class="stock-dot" style="background-color: ${o}"></span>
                        ${e} (${t.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${r.map(C).join("")}
                </div>
            </div>
        </div>
    `},M=()=>{if(i.searchQuery){const o=i.products.filter(r=>r.name.toLowerCase().includes(i.searchQuery.toLowerCase())||r.category.toLowerCase().includes(i.searchQuery.toLowerCase())||r.description.toLowerCase().includes(i.searchQuery.toLowerCase()));return`
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
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${o.length} result${o.length!==1?"s":""} for "${i.searchQuery}"</p>
                ${o.length>0?`
                    <div class="product-grid">
                        ${o.map(C).join("")}
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
                ${i.products.filter(o=>t.includes(o.id)).sort((o,r)=>t.indexOf(o.id)-t.indexOf(r.id)).map(C).join("")}
            </div>
        </div>
    `},U=()=>{let t=[...i.products];switch(i.searchQuery&&(t=t.filter(e=>e.name.toLowerCase().includes(i.searchQuery.toLowerCase())||e.category.toLowerCase().includes(i.searchQuery.toLowerCase())||e.description.toLowerCase().includes(i.searchQuery.toLowerCase()))),i.sortBy){case"price-asc":t.sort((e,o)=>e.price-o.price);break;case"price-desc":t.sort((e,o)=>o.price-e.price);break;case"name-asc":t.sort((e,o)=>e.name.localeCompare(o.name));break;case"name-desc":t.sort((e,o)=>o.name.localeCompare(e.name));break;case"featured":default:t.sort((e,o)=>e.id-o.id);break}return`
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
                            <option value="featured" ${i.sortBy==="featured"?"selected":""}>Featured</option>
                            <option value="price-asc" ${i.sortBy==="price-asc"?"selected":""}>Price: Low to High</option>
                            <option value="price-desc" ${i.sortBy==="price-desc"?"selected":""}>Price: High to Low</option>
                            <option value="name-asc" ${i.sortBy==="name-asc"?"selected":""}>Alphabetical: A-Z</option>
                            <option value="name-desc" ${i.sortBy==="name-desc"?"selected":""}>Alphabetical: Z-A</option>
                        </select>
                    </div>
                </div>
            </div>

            ${i.searchQuery?`
                <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: var(--surface); border-radius: 8px; margin-bottom: 1.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>
                        Showing results for <strong>"${i.searchQuery}"</strong>
                    </span>
                </div>
            `:""}

            <div class="product-grid">
                ${t.map(C).join("")}
            </div>
        </div>
    `},q=()=>`
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
    `,R=()=>`
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
    `,F=()=>{if(i.cart.length===0)return`
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('products')">Start Shopping</button>
            </div>
        `;let t=i.cart;return i.cartSearchQuery&&(t=i.cart.filter(e=>e.name.toLowerCase().includes(i.cartSearchQuery.toLowerCase())||e.category.toLowerCase().includes(i.cartSearchQuery.toLowerCase()))),i.cart.reduce((e,o)=>e+o.price*o.quantity,0),`
        <div style="margin: 2rem auto; padding: 0 2rem;">
            <button class="btn btn-outline" onclick="window.navigate('products')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                ← Continue Shopping
            </button>
            
            <div class="cart-container">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0;">Shopping Cart</h2>
                    
                    ${i.cart.length>0?`
                        <div class="search-container" style="max-width: 400px; flex: 1;">
                            <input 
                                type="text" 
                                id="cartSearchInput" 
                                class="search-input" 
                                placeholder="Search items in cart..." 
                                value="${i.cartSearchQuery}"
                                oninput="window.handleCartSearch(event)"
                                style="width: 100%;"
                            >
                            <button class="search-btn" onclick="window.clearCartSearch()">
                                ${i.cartSearchQuery?`
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
                
                <div class="cart-search-message" style="${i.cartSearchQuery&&t.length===0?"":"display: none;"}">
                    ${i.cartSearchQuery&&t.length===0?`
                        <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                            No items found for "${i.cartSearchQuery}"
                        </p>
                    `:""}
                </div>
                
            <div class="cart-items">
                ${t.map(e=>{const o=i.products.filter(r=>r.category===e.category&&r.id!==e.id).slice(0,4);return`
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
                                <p class="text-muted">${m(e.price)}</p>
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
                            ${o.length>0?`
                                <div class="similar-products-grid">
                                    ${o.map(r=>`
                                        <div class="similar-product-card" onclick="window.viewProduct(${r.id})">
                                            <img src="${r.image}" alt="${r.name}" class="similar-product-image">
                                            <div class="similar-product-title" title="${r.name}">${r.name}</div>
                                            <div class="similar-product-price">${m(r.price)}</div>
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
                    <span>${m(i.cart.reduce((e,o)=>e+(o.selected!==!1?o.price*o.quantity:0),0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${i.cart.filter(e=>e.selected!==!1).length})
                </button>

            </div>
        </div>
        </div>
    `},H=()=>{if(!i.currentUser)return g("login"),"";const t=i.devices||[];return`
        <div style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            ${x("my-devices")}
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 2rem 0;">
                <h1 style="font-size: 2.5rem; margin: 0;">My Devices</h1>
                <button class="btn btn-primary" onclick="window.navigate('device-pair')">
                    + Pair New Device
                </button>
            </div>

            ${t.length===0?`
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
            `:`
                <div class="device-grid">
                    ${t.map(e=>`
                        <div class="device-card">
                            <div class="device-status-badge ${e.status==="active"?"online":"offline"}">
                                <span class="status-dot"></span>
                                ${e.status==="active"?"Online":e.status==="pending"?"Not Configured":"Offline"}
                            </div>
                            
                            <div class="device-icon">
                                🚗
                            </div>
                            
                            <h3 class="device-name">${e.deviceName}</h3>
                            <p class="device-id">ID: ${e.deviceId}</p>
                            
                            <div class="device-info">
                                <div class="info-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
                                        <path d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                    ${e.lastOnline?new Date(e.lastOnline).toLocaleDateString():"Never"}
                                </div>
                                <div class="info-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.5-12.5v5.793l2.646 2.647a.5.5 0 0 1-.707.707l-3-3A.5.5 0 0 1 7 8V3.5a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                    v${e.firmwareVersion||"1.0.0"}
                                </div>
                            </div>
                            
                            <div class="device-actions">
                                ${e.status==="active"?`
                                    <button class="btn btn-primary" onclick="window.startRemoteControl('${e.deviceId}')" style="width: 100%;">
                                        🎮 Control
                                    </button>
                                `:e.status==="pending"?`
                                    <button class="btn btn-outline" style="width: 100%;" disabled>
                                        Awaiting Setup
                                    </button>
                                `:`
                                    <button class="btn btn-outline" style="width: 100%;" disabled>
                                        Offline
                                    </button>
                                `}
                            </div>
                        </div>
                    `).join("")}
                </div>
            `}
        </div>
    `},Q=()=>i.currentUser?`
        <div style="max-width: 600px; margin: 2rem auto; padding: 0 2rem;">
            ${x("device-pair")}
            
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
    `:(g("login"),""),V=()=>{if(!i.currentUser)return g("login"),"";if(!i.currentDeviceId)return g("my-devices"),"";const t=i.devices?.find(a=>a.deviceId===i.currentDeviceId);if(!t)return g("my-devices"),"";const e=i.deviceStatus[t.deviceId]||{},o=i.telemetryData[t.deviceId]||{},r=e.status==="online";return`
        <div style="max-width: 1200px; margin: 0 auto; padding: 1rem;">
            <div style="margin-bottom: 1rem;">
                <button class="btn btn-outline" onclick="window.stopRemoteControl()" style="padding: 0.75rem 1.5rem;">
                    ← Back to My Devices
                </button>
            </div>

            <div class="remote-control-container">
                <!-- Device Info Header -->
                <div class="remote-header">
                    <div>
                        <h1 style="margin: 0 0 0.5rem 0; font-size: 1.75rem;">${t.deviceName}</h1>
                        <p style="color: var(--text-muted); margin: 0;">${t.deviceId}</p>
                    </div>
                    <div class="connection-status ${r?"connected":"disconnected"}">
                        <span class="status-pulse"></span>
                        ${r?"Connected":"Offline"}
                    </div>
                </div>

                <!-- Telemetry Dashboard -->
                <div class="telemetry-grid">
                    <div class="telemetry-card">
                        <div class="telemetry-icon">🔋</div>
                        <div class="telemetry-value">${o.battery||0}%</div>
                        <div class="telemetry-label">Battery</div>
                    </div>
                    <div class="telemetry-card">
                        <div class="telemetry-icon">📡</div>
                        <div class="telemetry-value">${o.signal||"N/A"}</div>
                        <div class="telemetry-label">Signal</div>
                    </div>
                    <div class="telemetry-card">
                        <div class="telemetry-icon">⚡</div>
                        <div class="telemetry-value">${o.isMoving?"Yes":"No"}</div>
                        <div class="telemetry-label">Moving</div>
                    </div>
                    <div class="telemetry-card">
                        <div class="telemetry-icon">🚧</div>
                        <div class="telemetry-value">${o.frontSensor?"Detected":"Clear"}</div>
                        <div class="telemetry-label">Obstacle</div>
                    </div>
                </div>

                <!-- Control Panel -->
                <div class="control-panel">
                    <div class="control-section">
                        <h3 style="margin-bottom: 1rem; text-align: center;">Directional Controls</h3>
                        <div class="control-grid">
                            <div style="grid-column: 2; text-align: center;">
                                <button class="control-btn" 
                                    onmousedown="window.sendCarCommand('forward')"
                                    onmouseup="window.sendCarCommand('stop')"
                                    ontouchstart="window.sendCarCommand('forward')"
                                    ontouchend="window.sendCarCommand('stop')"
                                    ${r?"":"disabled"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="12" y1="19" x2="12" y2="5"></line>
                                        <polyline points="5 12 12 5 19 12"></polyline>
                                    </svg>
                                    <div>Forward</div>
                                </button>
                            </div>
                            <div style="grid-column: 1; text-align: center;">
                                <button class="control-btn"
                                    onmousedown="window.sendCarCommand('left')"
                                    onmouseup="window.sendCarCommand('stop')"
                                    ontouchstart="window.sendCarCommand('left')"
                                    ontouchend="window.sendCarCommand('stop')"
                                    ${r?"":"disabled"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                    <div>Left</div>
                                </button>
                            </div>
                            <div style="grid-column: 2; text-align: center;">
                                <button class="control-btn stop-btn"
                                    onclick="window.sendCarCommand('stop')"
                                    ${r?"":"disabled"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="6" width="12" height="12"></rect>
                                    </svg>
                                    <div>STOP</div>
                                </button>
                            </div>
                            <div style="grid-column: 3; text-align: center;">
                                <button class="control-btn"
                                    onmousedown="window.sendCarCommand('right')"
                                    onmouseup="window.sendCarCommand('stop')"
                                    ontouchstart="window.sendCarCommand('right')"
                                    ontouchend="window.sendCarCommand('stop')"
                                    ${r?"":"disabled"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                    <div>Right</div>
                                </button>
                            </div>
                            <div style="grid-column: 2; text-align: center;">
                                <button class="control-btn"
                                    onmousedown="window.sendCarCommand('backward')"
                                    onmouseup="window.sendCarCommand('stop')"
                                    ontouchstart="window.sendCarCommand('backward')"
                                    ontouchend="window.sendCarCommand('stop')"
                                    ${r?"":"disabled"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <polyline points="19 12 12 19 5 12"></polyline>
                                    </svg>
                                    <div>Backward</div>
                                </button>
                            </div>
                        </div>
                        <p style="text-align: center; color: var(--text-muted); margin-top: 1rem; font-size: 0.875rem;">
                            Or use keyboard: W/A/S/D or Arrow Keys
                        </p>
                    </div>
                </div>

                <!-- Command Log -->
                <div class="command-log">
                    <h4 style="margin-bottom: 0.5rem;">Activity Log</h4>
                    <div id="commandLogContent" class="log-content">
                        <div class="log-entry">Ready to control ${t.deviceName}</div>
                    </div>
                </div>
            </div>
        </div>
    `},G=()=>{if(!i.currentUser)return g("login"),"";const t=i.cart.filter(a=>a.selected!==!1);if(t.length===0)return l("No items selected for checkout"),g("cart"),"";const e=t.reduce((a,n)=>a+n.price*n.quantity,0),o=i.checkoutData.shippingFee,r=e+o;return`
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
                                    value="${i.checkoutData.shipping.fullName||(i.currentUser?i.currentUser.name:"")}"
                                    oninput="window.handleNameInput(this)"
                                    placeholder="e.g. Juan Dela Cruz">
                            </div>

                            <div>
                                <label class="form-label">Phone Number <span style="color: red;">*</span></label>
                                <input type="tel" class="form-input" 
                                    value="${i.checkoutData.shipping.phone}"
                                    oninput="window.handlePhoneInput(this)"
                                    maxlength="11"
                                    placeholder="09123456789">
                            </div>

                            <div>
                                <label class="form-label">Address <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${i.checkoutData.shipping.address}"
                                    onchange="window.updateShippingInfo('address', this.value)"
                                    placeholder="House/Unit No., Street Name, Barangay">
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label class="form-label">City <span style="color: red;">*</span></label>
                                    <input type="text" class="form-input" 
                                        value="${i.checkoutData.shipping.city}"
                                        oninput="window.handleLocationInput(this, 'city')"
                                        placeholder="e.g. Makati">
                                </div>
                                <div>
                                    <label class="form-label">Province <span style="color: red;">*</span></label>
                                    <input type="text" class="form-input" 
                                        value="${i.checkoutData.shipping.province}"
                                        oninput="window.handleLocationInput(this, 'province')"
                                        placeholder="e.g. Metro Manila">
                                </div>
                            </div>

                            <div>
                                <label class="form-label">Postal Code <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${i.checkoutData.shipping.postalCode}"
                                    oninput="window.handlePostalInput(this)"
                                    maxlength="4"
                                    placeholder="e.g. 1200">
                            </div>

                            <div>
                                <label class="form-label">Delivery Instructions (Optional)</label>
                                <textarea class="form-input" 
                                    onchange="window.updateShippingInfo('instructions', this.value)"
                                    rows="3"
                                    placeholder="Floor number, landmark, etc.">${i.checkoutData.shipping.instructions||""}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="admin-section">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">💳 Payment Method <span style="color: red;">*</span></h2>
                        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem;">
                            ${[{id:"cod",label:"Cash on Delivery",image:"/lumina/images/payment/cod.png"},{id:"gcash",label:"GCash",image:"/lumina/images/payment/gcash.png"},{id:"maya",label:"Maya",image:"/lumina/images/payment/maya.png"},{id:"card",label:"Credit/Debit Card",image:"/lumina/images/payment/card.png"},{id:"bank",label:"Bank Transfer",image:"/lumina/images/payment/bank.png"}].map(a=>`
                                <div class="payment-method-card" onclick="window.selectPaymentMethod('${a.id}')" style="padding: 0.75rem; border: 2px solid ${i.checkoutData.paymentMethod===a.id?"var(--primary)":"var(--border)"}; border-radius: var(--radius-md); cursor: pointer; text-align: center; transition: all 0.2s; background: ${i.checkoutData.paymentMethod===a.id?"rgba(0, 43, 91, 0.05)":"var(--surface)"};">
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
                            ${t.map(a=>`
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                                    <img src="${a.image}" alt="${a.name}" style="width: 60px; height: 60px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${a.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-muted);">Qty: ${a.quantity}</div>
                                    </div>
                                    <div style="font-weight: 700; color: var(--primary);">${m(a.price*a.quantity)}</div>
                                </div>
                            `).join("")}
                        </div>
                        <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Subtotal</span>
                                <span>${m(e)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Shipping Fee</span>
                                <span>${m(o)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                                <span>Total</span>
                                <span style="color: var(--primary);">${m(r)}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="window.placeOrder()" style="width: 100%; padding: 1rem; font-size: 1rem;">Place Order</button>
                        <div style="margin-top: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);">🔒 Your payment information is secure</div>
                    </div>
                </div>
            </div>
        </div>
    `},Y=()=>{if(!i.lastOrderId)return g("home"),"";const t=i.orders.find(n=>n.orderId===i.lastOrderId);if(!t)return g("home"),"";const e=new Date,o=new Date(e);o.setDate(e.getDate()+3);const r=new Date(e);r.setDate(e.getDate()+5);const a=`${o.toLocaleDateString("en-US",{month:"short",day:"numeric"})} - ${r.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} `;return`
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
                    <div style="padding-left: 2rem; color: var(--text-muted);">${a}</div>
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">2</div>
                        <div style="font-weight: 600;">Payment Status</div>
                    </div>
                    <div style="padding-left: 2rem;">
                        <span class="badge badge-${i.checkoutData.paymentMethod==="cod"?"warning":"success"}" style="font-size: 0.875rem; padding: 0.375rem 0.75rem;">
                            ${i.checkoutData.paymentMethod==="cod"?"Cash on Delivery":"Payment Confirmed"}
                        </span>
                    </div>
                </div>

                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">3</div>
                        <div style="font-weight: 600;">Shipping Address</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">
                        ${i.checkoutData.shipping.fullName}<br>
                        ${i.checkoutData.shipping.address}<br>
                        ${i.checkoutData.shipping.city}, ${i.checkoutData.shipping.province} ${i.checkoutData.shipping.postalCode}<br>
                        ${i.checkoutData.shipping.phone}
                    </div>
                </div>
            </div>

            <div class="admin-section" style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Order Items</h3>
                ${t.items.map(n=>`
                    <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${n.productName||n.name}</div>
                            <div style="font-size: 0.875rem; color: var(--text-muted);">Quantity: ${n.quantity}</div>
                        </div>
                        <div style="font-weight: 700; color: var(--primary);">${m(n.price*n.quantity)}</div>
                    </div>
                `).join("")}
                <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                    <span>Total Amount</span>
                    <span style="color: var(--primary);">${m(t.total)}</span>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="window.printReceipt()" style="padding: 0.875rem 2rem;">🖨️ Print Receipt</button>
                <button class="btn btn-outline" onclick="window.navigate('home')" style="padding: 0.875rem 2rem;">🏠 Back to Shop</button>
            </div>

            <div style="text-align: center; margin-top: 3rem; padding: 1.5rem; background: var(--surface-alt); border-radius: var(--radius-md);">
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">An email confirmation has been sent to <strong>${i.currentUser.email}</strong></p>
                <p style="font-size: 0.875rem; color: var(--text-muted);">Questions? Contact us at support@luminaelectronics.com</p>
            </div>
        </div>
    `},W=()=>`
        <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
            ${x("contact-us")}
            
            <!-- Hero Section -->
            <div style="text-align: center; margin-bottom: 4rem;">
                <h1 style="font-size: 2.5rem; margin-bottom: 1rem; background: linear-gradient(135deg, var(--primary), #0EA5E9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Get in Touch</h1>
                <p style="font-size: 1.125rem; color: var(--text-muted); max-width: 600px; margin: 0 auto;">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 4rem;">
                <!-- Contact Form -->
                <div class="admin-section" style="padding: 2rem;">
                    <h2 style="margin-bottom: 1.5rem; color: var(--primary);">Send Us a Message</h2>
                    <form onsubmit="window.handleContactSubmit(event)" id="contactForm">
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Name *</label>
                            <input type="text" name="name" required 
                                style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: var(--radius-md); font-size: 1rem; transition: border-color 0.3s;"
                                onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'" />
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email *</label>
                            <input type="email" name="email" required 
                                style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: var(--radius-md); font-size: 1rem; transition: border-color 0.3s;"
                                onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'" />
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Subject *</label>
                            <input type="text" name="subject" required 
                                style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: var(--radius-md); font-size: 1rem; transition: border-color 0.3s;"
                                onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'" />
                        </div>
                        
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Message *</label>
                            <textarea name="message" required rows="6"
                                style="width: 100%; padding: 0.75rem; border: 2px solid var(--border); border-radius: var(--radius-md); font-size: 1rem; resize: vertical; transition: border-color 0.3s; font-family: inherit;"
                                onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'"></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 1.125rem;">
                            Send Message
                        </button>
                    </form>
                </div>

                <!-- Contact Information -->
                <div>
                    <div class="admin-section" style="padding: 2rem; margin-bottom: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; color: var(--primary);">Contact Information</h2>
                        
                        <div style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1.5rem;">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, var(--primary), #0EA5E9); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <div>
                                <h3 style="margin-bottom: 0.5rem;">Address</h3>
                                <p style="color: var(--text-muted); line-height: 1.6;">123 Electronics Street<br/>Makati City, Metro Manila<br/>Philippines 1200</p>
                            </div>
                        </div>

                        <div style="display: flex; align-items: start; gap: 1rem; margin-bottom: 1.5rem;">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, var(--primary), #0EA5E9); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <div>
                                <h3 style="margin-bottom: 0.5rem;">Phone</h3>
                                <p style="color: var(--text-muted);">(02) 8123-4567<br/>+63 917 123 4567</p>
                            </div>
                        </div>

                        <div style="display: flex; align-items: start; gap: 1rem;">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, var(--primary), #0EA5E9); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <div>
                                <h3 style="margin-bottom: 0.5rem;">Email</h3>
                                <p style="color: var(--text-muted);">support@luminaelectronics.com<br/>sales@luminaelectronics.com</p>
                            </div>
                        </div>
                    </div>

                    <!-- Business Hours -->
                    <div class="admin-section" style="padding: 2rem;">
                        <h3 style="margin-bottom: 1rem; color: var(--primary);">Business Hours</h3>
                        <div style="color: var(--text-muted); line-height: 2;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Monday - Friday:</span>
                                <strong>9:00 AM - 6:00 PM</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Saturday:</span>
                                <strong>10:00 AM - 4:00 PM</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>Sunday:</span>
                                <strong>Closed</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Map Section -->
            <div class="admin-section" style="padding: 0; overflow: hidden;">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5489358476346!2d121.0244036!3d14.5547146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90264a0f917%3A0x1299c768397f2d01!2sAyala%20Avenue%2C%20Makati%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph" 
                    width="100%" 
                    height="400" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    `,J=()=>{const t=[{name:"Alex Santos",role:"Founder & CEO",image:"https://ui-avatars.com/api/?name=Alex+Santos&background=6366f1&color=fff&size=120"},{name:"Sarah Lee",role:"Operations Manager",image:"https://ui-avatars.com/api/?name=Sarah+Lee&background=6366f1&color=fff&size=120"},{name:"Mike Chen",role:"Technical Support",image:"https://ui-avatars.com/api/?name=Mike+Chen&background=6366f1&color=fff&size=120"},{name:"Jenny Reyes",role:"Customer Service",image:"https://ui-avatars.com/api/?name=Jenny+Reyes&background=6366f1&color=fff&size=120"}];return`
        <div style="background: #f8f9fa; min-height: 100vh; padding: 2rem 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                ${x("about-us")}
                
                <!-- Hero Section with Real Photo -->
                <div style="position: relative; border-radius: 4px; overflow: hidden; margin-bottom: 2.5rem; height: 250px; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center; color: white; padding: 2rem;">
                        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; font-weight: 700; color: white;">About Lumina Electronics</h1>
                        <p style="font-size: 1.125rem; opacity: 0.95;">Your trusted source for quality electronics components since 2020</p>
                    </div>
                </div>

                <!-- Mission & Stats -->
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 2.5rem;">
                    <div style="background: white; padding: 2rem; border-radius: 4px; border: 1px solid #e2e8f0;">
                        <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: #1e293b; font-weight: 600;">Our Mission</h2>
                        <p style="font-size: 1rem; line-height: 1.8; color: #475569; margin-bottom: 1rem; text-align: left;">
                            To provide high-quality, affordable electronics components to engineers, students, and hobbyists across the Philippines. We believe in fostering innovation by making technology accessible to everyone.
                        </p>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1.5rem;">
                            <div style="padding: 1rem; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #6366f1;">
                                <h3 style="font-size: 0.875rem; margin-bottom: 0.25rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; text-align: left;">Quality First</h3>
                                <p style="font-size: 0.875rem; color: #475569; text-align: left;">Authentic components from trusted suppliers</p>
                            </div>
                            <div style="padding: 1rem; background: #f8f9fa; border-radius: 4px; border-left: 3px solid #6366f1;">
                                <h3 style="font-size: 0.875rem; margin-bottom: 0.25rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; text-align: left;">Fast Delivery</h3>
                                <p style="font-size: 0.875rem; color: #475569; text-align: left;">Same-day Metro Manila shipping</p>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; padding: 2rem; border-radius: 4px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 1.5rem;">
                        <div style="text-align: center;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: #6366f1; margin-bottom: 0.25rem;">50k+</div>
                            <div style="font-size: 0.875rem; color: #64748b;">Happy Customers</div>
                        </div>
                        <div style="height: 1px; background: #e2e8f0;"></div>
                        <div style="text-align: center;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: #6366f1; margin-bottom: 0.25rem;">1000+</div>
                            <div style="font-size: 0.875rem; color: #64748b;">Products</div>
                        </div>
                    </div>
                </div>

                <!-- Clean Timeline -->
                <div style="background: white; padding: 2rem; border-radius: 4px; border: 1px solid #e2e8f0; margin-bottom: 2.5rem;">
                    <h2 style="font-size: 1.5rem; margin-bottom: 2rem; color: #1e293b; font-weight: 600;">Our Journey</h2>
                    <div style="position: relative; padding-left: 2.5rem;">
                        <div style="position: absolute; left: 0.625rem; top: 0; bottom: 0; width: 2px; background: #e2e8f0;"></div>
                        
                        <div style="position: relative; margin-bottom: 2rem;">
                            <div style="position: absolute; left: -2.125rem; top: 0.25rem; width: 12px; height: 12px; background: #6366f1; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px #e2e8f0;"></div>
                            <div style="display: flex; gap: 1rem; align-items: baseline;">
                                <span style="font-size: 0.875rem; font-weight: 700; color: #6366f1; min-width: 3rem;">2020</span>
                                <div>
                                    <h3 style="font-size: 1rem; margin-bottom: 0.25rem; color: #1e293b; font-weight: 600; text-align: left;">Founded</h3>
                                    <p style="font-size: 0.875rem; color: #64748b; line-height: 1.6; text-align: left;">Started as a small online shop with 50 products, driven by a passion for electronics.</p>
                                </div>
                            </div>
                        </div>

                        <div style="position: relative; margin-bottom: 2rem;">
                            <div style="position: absolute; left: -2.125rem; top: 0.25rem; width: 12px; height: 12px; background: #6366f1; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px #e2e8f0;"></div>
                            <div style="display: flex; gap: 1rem; align-items: baseline;">
                                <span style="font-size: 0.875rem; font-weight: 700; color: #6366f1; min-width: 3rem;">2022</span>
                                <div>
                                    <h3 style="font-size: 1rem; margin-bottom: 0.25rem; color: #1e293b; font-weight: 600; text-align: left;">Expansion</h3>
                                    <p style="font-size: 0.875rem; color: #64748b; line-height: 1.6; text-align: left;">Grew to 500+ products and established partnerships with major manufacturers worldwide.</p>
                                </div>
                            </div>
                        </div>

                        <div style="position: relative;">
                            <div style="position: absolute; left: -2.125rem; top: 0.25rem; width: 12px; height: 12px; background: #6366f1; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px #e2e8f0;"></div>
                            <div style="display: flex; gap: 1rem; align-items: baseline;">
                                <span style="font-size: 0.875rem; font-weight: 700; color: #6366f1; min-width: 3rem;">2024</span>
                                <div>
                                    <h3 style="font-size: 1rem; margin-bottom: 0.25rem; color: #1e293b; font-weight: 600; text-align: left;">Today</h3>
                                    <p style="font-size: 0.875rem; color: #64748b; line-height: 1.6; text-align: left;">Serving 50,000+ customers with 1000+ products, same-day shipping, and dedicated support.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Team Section -->
                <div style="background: white; padding: 2rem; border-radius: 4px; border: 1px solid #e2e8f0; margin-bottom: 2.5rem;">
                    <h2 style="font-size: 1.5rem; margin-bottom: 2rem; color: #1e293b; font-weight: 600;">Meet Our Team</h2>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;">
                        ${t.map(e=>`
                            <div style="text-align: center;">
                                <div style="width: 80px; height: 80px; margin: 0 auto 1rem; border-radius: 50%; overflow: hidden; border: 2px solid #e2e8f0;">
                                    <img src="${e.image}" alt="${e.name}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <h3 style="font-size: 0.875rem; margin-bottom: 0.25rem; color: #1e293b; font-weight: 600;">${e.name}</h3>
                                <p style="font-size: 0.75rem; color: #64748b;">${e.role}</p>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <!-- Why Choose Us -->
                <div>
                    <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; color: #1e293b; font-weight: 600;">Why Choose Us</h2>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                        <div style="background: white; padding: 1.5rem; border-radius: 4px; border: 1px solid #e2e8f0;">
                            <div style="width: 40px; height: 40px; background: #f0fdf4; border-radius: 4px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <h3 style="font-size: 1rem; margin-bottom: 0.5rem; color: #1e293b; font-weight: 600; text-align: left;">Authentic Products</h3>
                            <p style="font-size: 0.875rem; color: #64748b; line-height: 1.6; text-align: left;">Only genuine components from trusted manufacturers</p>
                        </div>

                        <div style="background: white; padding: 1.5rem; border-radius: 4px; border: 1px solid #e2e8f0;">
                            <div style="width: 40px; height: 40px; background: #fef3c7; border-radius: 4px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                            <h3 style="font-size: 1rem; margin-bottom: 0.5rem; color: #1e293b; font-weight: 600; text-align: left;">Expert Support</h3>
                            <p style="font-size: 0.875rem; color: #64748b; line-height: 1.6; text-align: left;">Technical assistance from experienced engineers</p>
                        </div>

                        <div style="background: white; padding: 1.5rem; border-radius: 4px; border: 1px solid #e2e8f0;">
                            <div style="width: 40px; height: 40px; background: #ede9fe; border-radius: 4px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            </div>
                            <h3 style="font-size: 1rem; margin-bottom: 0.5rem; color: #1e293b; font-weight: 600; text-align: left;">Fast Shipping</h3>
                            <p style="font-size: 0.875rem; color: #64748b; line-height: 1.6; text-align: left;">Same-day delivery for Metro Manila orders</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `},K=()=>{const t=[{id:1,title:"Getting Started with Arduino",category:"Beginner",topic:"Microcontrollers",duration:"15 min",videoId:"nL34zDTPkcs",featured:!0},{id:2,title:"Raspberry Pi Setup Guide",category:"Beginner",topic:"Microcontrollers",duration:"20 min",videoId:"BpJCAafw2qE",featured:!0},{id:3,title:"Understanding Sensors",category:"Intermediate",topic:"IoT",duration:"18 min",videoId:"DlG6LY84MUU",recent:!0},{id:4,title:"DIY Obstacle Avoidance Car",category:"Intermediate",topic:"IoT",duration:"6 min",videoId:"1n_KjpMfVT0",recent:!0},{id:5,title:"PCB Design Basics",category:"Advanced",topic:"PCB Design",duration:"60 min",videoId:"vaCVh2SAZY4",featured:!0},{id:6,title:"IoT Projects with ESP32",category:"Advanced",topic:"IoT",duration:"50 min",videoId:"xPlN_Tk3VLQ",recent:!0},{id:7,title:"8 Brilliant Projects with 3D Printing and Electronics!",category:"Intermediate",topic:"Microcontrollers",duration:"8 min",videoId:"UkWoPMa6V-M",featured:!0},{id:8,title:"Building a Weather Station",category:"Advanced",topic:"IoT",duration:"42 min",videoId:"U0kPgFcALac",recent:!0}],e=t.filter(a=>a.featured),o=t.filter(a=>a.recent),r=a=>a==="Beginner"?{bg:"#dcfce7",text:"#16a34a"}:a==="Intermediate"?{bg:"#dbeafe",text:"#2563eb"}:{bg:"#f3e8ff",text:"#9333ea"};return`
        <div style="background: #f8f9fa; min-height: 100vh; padding-bottom: 3rem;">
            <!-- Hero Banner -->
            <div style="width: 100%; margin-top: 2rem; margin-bottom: 2rem; overflow: hidden;">
                <div style="max-width: 1400px; margin: 0 auto;">
                    <img src="assets/learning-hub-banner.png" alt="Lumina Learning Hub" style="width: 100%; max-height: 200px; object-fit: cover; display: block; border-radius: 8px;" />
                </div>
            </div>

            <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                ${x("learn")}
                
                <!-- Filter Chips -->
                <div style="display: flex; gap: 0.75rem; margin-bottom: 2rem; flex-wrap: wrap; overflow-x: auto; padding-bottom: 0.5rem;">
                    <!-- Difficulty Filters -->
                    <button class="topic-filter active" data-filter="all" onclick="window.filterLearningContent('all')" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; background: #6366f1; color: white; border: 2px solid #6366f1; border-radius: 24px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                        All
                    </button>
                    <button class="topic-filter" data-filter="Beginner" onclick="window.filterLearningContent('Beginner')" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; background: white; color: #64748b; border: 2px solid #e2e8f0; border-radius: 24px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Beginner
                    </button>
                    <button class="topic-filter" data-filter="Intermediate" onclick="window.filterLearningContent('Intermediate')" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; background: white; color: #64748b; border: 2px solid #e2e8f0; border-radius: 24px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Intermediate
                    </button>
                    <button class="topic-filter" data-filter="Advanced" onclick="window.filterLearningContent('Advanced')" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; background: white; color: #64748b; border: 2px solid #e2e8f0; border-radius: 24px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Advanced
                    </button>
                    <!-- Topic Filters -->
                    <button class="topic-filter" data-filter="Microcontrollers" onclick="window.filterLearningContent('Microcontrollers')" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; background: white; color: #64748b; border: 2px solid #e2e8f0; border-radius: 24px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                        Microcontrollers
                    </button>
                    <button class="topic-filter" data-filter="IoT" onclick="window.filterLearningContent('IoT')" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; background: white; color: #64748b; border: 2px solid #e2e8f0; border-radius: 24px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                        IoT
                    </button>
                    <button class="topic-filter" data-filter="PCB Design" onclick="window.filterLearningContent('PCB Design')" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; background: white; color: #64748b; border: 2px solid #e2e8f0; border-radius: 24px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                        PCB Design
                    </button>
                </div>

                <!-- Featured Playlist Carousel -->
                <div style="margin-bottom: 3rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h2 style="font-size: 1.5rem; color: #1e293b; font-weight: 600;">Featured Playlist</h2>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                        ${e.map(a=>{const n=r(a.category);return`
                            <div class="tutorial-card" data-category="${a.category}" data-topic="${a.topic}" 
                                 style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" 
                                 onclick="window.openVideoModal('${a.videoId}')"
                                 onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.12)'"
                                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'">
                                <div style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden;">
                                    <img src="https://img.youtube.com/vi/${a.videoId}/maxresdefault.jpg" alt="${a.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3);">
                                        <div style="width: 56px; height: 56px; background: rgba(220, 38, 38, 0.95); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                        </div>
                                    </div>
                                    <div style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.85); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                        ⏱ ${a.duration}
                                    </div>
                                    <div style="position: absolute; top: 0.5rem; left: 0.5rem; background: ${n.bg}; color: ${n.text}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
                                        ${a.category}
                                    </div>
                                </div>
                                <div style="padding: 1rem;">
                                    <h3 style="font-size: 1rem; margin-bottom: 0.5rem; line-height: 1.4; color: #1e293b; font-weight: 600; text-align: left;">${a.title}</h3>
                                    <p style="font-size: 0.875rem; color: #64748b; text-align: left;">Watch this ${a.category.toLowerCase()}-level tutorial</p>
                                </div>
                            </div>
                        `}).join("")}
                    </div>
                </div>

                <!-- Recently Added Carousel -->
                <div style="margin-bottom: 3rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h2 style="font-size: 1.5rem; color: #1e293b; font-weight: 600;">Recently Added</h2>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                        ${o.map(a=>{const n=r(a.category);return`
                            <div class="tutorial-card" data-category="${a.category}" data-topic="${a.topic}"
                                 style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" 
                                 onclick="window.openVideoModal('${a.videoId}')"
                                 onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.12)'"
                                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'">
                                <div style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden;">
                                    <img src="https://img.youtube.com/vi/${a.videoId}/maxresdefault.jpg" alt="${a.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3);">
                                        <div style="width: 56px; height: 56px; background: rgba(220, 38, 38, 0.95); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                        </div>
                                    </div>
                                    <div style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.85); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                        ⏱ ${a.duration}
                                    </div>
                                    <div style="position: absolute; top: 0.5rem; left: 0.5rem; background: ${n.bg}; color: ${n.text}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
                                        ${a.category}
                                    </div>
                                </div>
                                <div style="padding: 1rem;">
                                    <h3 style="font-size: 1rem; margin-bottom: 0.5rem; line-height: 1.4; color: #1e293b; font-weight: 600; text-align: left;">${a.title}</h3>
                                    <p style="font-size: 0.875rem; color: #64748b; text-align: left;">Watch this ${a.category.toLowerCase()}-level tutorial</p>
                                </div>
                            </div>
                        `}).join("")}
                    </div>
                </div>

                <!-- Additional Learning Resources -->
                <div style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; padding: 2.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                    <h2 style="font-size: 1.5rem; margin-bottom: 2rem; color: #1e293b; font-weight: 600;">Additional Learning Resources</h2>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;">
                        <div style="text-align: center;">
                            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #dcfce7, #bbf7d0); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            </div>
                            <h3 style="font-size: 1.125rem; margin-bottom: 0.625rem; color: #1e293b; font-weight: 600;">Documentation</h3>
                            <p style="font-size: 0.875rem; color: #64748b; line-height: 1.6;">Comprehensive product datasheets and guides</p>
                        </div>
                        <div style="text-align: center;">
                            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #fef3c7, #fef08a); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                            <h3 style="font-size: 1.125rem; margin-bottom: 0.625rem; color: #1e293b; font-weight: 600;">Community Forum</h3>
                            <p style="font-size: 0.875rem; color: #64748b; line-height: 1.6;">Get help and share projects with the maker community</p>
                        </div>
                        <div style="text-align: center;">
                            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #f3e8ff, #e9d5ff); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9333ea" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 3v18"></path><path d="M15 3v18"></path></svg>
                            </div>
                            <h3 style="font-size: 1.125rem; margin-bottom: 0.625rem; color: #1e293b; font-weight: 600;">Project Kits</h3>
                            <p style="font-size: 0.875rem; color: #64748b; line-height: 1.6;">Curated starter kits with all components</p>
                        </div>
                        <div style="text-align: center;">
                            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #dbeafe, #bfdbfe); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                            </div>
                            <h3 style="font-size: 1.125rem; margin-bottom: 0.625rem; color: #1e293b; font-weight: 600;">Workshops & Webinars</h3>
                            <p style="font-size: 0.875rem; color: #64748b; line-height: 1.6;">Workshops & Webinars to help you learn live</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `},_=()=>{const t=i.products.slice(0,8).map((e,o)=>({...e,originalPrice:e.price*1.3,discount:[10,15,20,25,30][o%5],stock:[45,67,23,89,12][o%5],category:["Microcontrollers","Sensors","Tools","Robotics","Components"][o%5]}));return`
        <div style="background: #f8f9fa; min-height: 100vh; padding: 2rem 0;">
            <!-- Content Container -->
            <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                ${x("deals")}
                
                <!-- Hero Banner -->
                <div style="width: 100%; background: #e5e7eb; margin-bottom: 2rem; border-radius: 8px; overflow: hidden;">
                    <img src="assets/deals-hero.png" alt="Raspberry Pi 5 Kit Deal" style="width: 100%; max-width: 100%; height: auto; display: block; image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
                </div>

                <!-- COUPON ZONE -->
                <div style="margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        <h2 style="font-size: 1.125rem; color: #1e293b; font-weight: 700;">Active Coupon Codes</h2>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <!-- Coupon 1: Gold Gradient -->
                        <div style="background: linear-gradient(135deg, #b8860b, #daa520); border-radius: 8px; padding: 1.5rem; position: relative; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <div style="position: absolute; top: 1rem; right: 1rem; width: 40px; height: 40px; background: rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                            </div>
                            <div style="color: white;">
                                <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; opacity: 0.9;">NEW MAKER DISCOUNT</div>
                                <div style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem;">₱100 OFF</div>
                                <div style="font-size: 0.75rem; margin-bottom: 1.5rem; opacity: 0.9;">Min. spend ₱500</div>
                                <div style="background: white; border-radius: 4px; padding: 0.625rem; display: flex; align-items: center; justify-content: space-between;">
                                    <code style="color: #1e293b; font-size: 0.875rem; font-weight: 600;">MAKER100</code>
                                    <button onclick="navigator.clipboard.writeText('MAKER100'); alert('Code copied!')" style="background: #1e293b; color: white; border: none; padding: 0.375rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.25rem;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                        Copy Code
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Coupon 2: Cyan Gradient -->
                        <div style="background: linear-gradient(135deg, #06b6d4, #0ea5e9); border-radius: 8px; padding: 1.5rem; position: relative; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <div style="position: absolute; top: 1rem; right: 1rem; width: 40px; height: 40px; background: rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                            </div>
                            <div style="color: white;">
                                <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; opacity: 0.9;">SENSOR BUNDLE</div>
                                <div style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem;">10% OFF</div>
                                <div style="font-size: 0.75rem; margin-bottom: 1.5rem; opacity: 0.9;">All Sensors</div>
                                <div style="background: white; border-radius: 4px; padding: 0.625rem; display: flex; align-items: center; justify-content: space-between;">
                                    <code style="color: #1e293b; font-size: 0.875rem; font-weight: 600;">SENSE10</code>
                                    <button onclick="navigator.clipboard.writeText('SENSE10'); alert('Code copied!')" style="background: #1e293b; color: white; border: none; padding: 0.375rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.25rem;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                        Copy Code
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Coupon 3: Green Gradient -->
                        <div style="background: linear-gradient(135deg, #10b981, #059669); border-radius: 8px; padding: 1.5rem; position: relative; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <div style="position: absolute; top: 1rem; right: 1rem; width: 40px; height: 40px; background: rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            </div>
                            <div style="color: white;">
                                <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; opacity: 0.9;">FREE SHIPPING</div>
                                <div style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem;">FREE</div>
                                <div style="font-size: 0.75rem; margin-bottom: 1.5rem; opacity: 0.9;">Orders over ₱1,500</div>
                                <div style="background: white; border-radius: 4px; padding: 0.625rem; display: flex; align-items: center; justify-content: space-between;">
                                    <code style="color: #1e293b; font-size: 0.875rem; font-weight: 600;">SHIPFREE</code>
                                    <button onclick="navigator.clipboard.writeText('SHIPFREE'); alert('Code copied!')" style="background: #1e293b; color: white; border: none; padding: 0.375rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.25rem;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                        Copy Code
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CATEGORY TABS -->
                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button onclick="window.filterDeals('all')" class="deal-category-tab active" data-category="all" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: #6366f1; color: white; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">All Deals</button>
                        <button onclick="window.filterDeals('Microcontrollers')" class="deal-category-tab" data-category="Microcontrollers" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: white; color: #64748b; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">Microcontrollers</button>
                        <button onclick="window.filterDeals('Sensors')" class="deal-category-tab" data-category="Sensors" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: white; color: #64748b; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">Sensors</button>
                        <button onclick="window.filterDeals('Tools')" class="deal-category-tab" data-category="Tools" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: white; color: #64748b; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">Tools</button>
                        <button onclick="window.filterDeals('Robotics')" class="deal-category-tab" data-category="Robotics" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: white; color: #64748b; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">Robotics</button>
                        <button onclick="window.filterDeals('clearance')" class="deal-category-tab" data-category="clearance" style="padding: 0.5rem 1rem; border: 1px solid #dc2626; background: white; color: #dc2626; border-radius: 4px; font-size: 0.875rem; font-weight: 700; cursor: pointer;">🔥 Clearance Bin</button>
                    </div>
                </div>

                <!-- DEALS GRID -->
                <div style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <div style="font-size: 0.875rem; color: #64748b;">${t.length} products on sale</div>
                        <select style="padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 0.875rem; outline: none;" onchange="window.sortDeals(this.value)">
                            <option value="featured">Sort: Featured</option>
                            <option value="discount">Highest Discount</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
                        ${t.map(e=>`
                            <div class="deal-product-card" data-category="${e.category}" style="background: white; border-radius: 4px; border: 1px solid #e2e8f0; overflow: hidden; position: relative; cursor: pointer; transition: border-color 0.15s;" 
                                 onclick="window.viewProduct(${e.id})"
                                 onmouseover="this.style.borderColor='#cbd5e1'" 
                                 onmouseout="this.style.borderColor='#e2e8f0'">
                                <!-- Discount Badge -->
                                <div style="position: absolute; top: 0.5rem; left: 0.5rem; background: #6366f1; color: white; padding: 0.375rem 0.625rem; border-radius: 4px; font-size: 0.875rem; font-weight: 700; z-index: 1; box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);">
                                    -${e.discount}%
                                </div>
                                
                                <!-- Product Image -->
                                <div style="aspect-ratio: 1; background: #f8f9fa; display: flex; align-items: center; justify-content: center; padding: 1.5rem; border-bottom: 1px solid #f1f5f9;">
                                    <img src="${e.image}" alt="${e.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                                </div>
                                
                                <!-- Product Info -->
                                <div style="padding: 1rem;">
                                    <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">${e.category}</div>
                                    <h3 style="margin-bottom: 0.75rem; font-size: 0.875rem; line-height: 1.4; height: 2.8em; overflow: hidden; color: #1e293b; font-weight: 600;">${e.name}</h3>
                                    
                                    <!-- Price Display (Star of the Card) -->
                                    <div style="margin-bottom: 0.75rem;">
                                        <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.25rem;">
                                            <span style="font-size: 1.5rem; font-weight: 700; color: #6366f1;">${m(e.price)}</span>
                                            <span style="font-size: 0.875rem; text-decoration: line-through; color: #94a3b8;">${m(e.originalPrice)}</span>
                                        </div>
                                        <div style="font-size: 0.75rem; color: #16a34a; font-weight: 600;">You save ${m(e.originalPrice-e.price)}</div>
                                    </div>
                                    
                                    <!-- Stock Indicator -->
                                    <div style="margin-bottom: 0.75rem;">
                                        <div style="font-size: 0.75rem; color: ${e.stock<30?"#dc2626":"#16a34a"}; font-weight: 600; margin-bottom: 0.25rem;">
                                            ${e.stock<30?"⚠️ Only "+e.stock+" left!":"✓ In Stock"}
                                        </div>
                                    </div>
                                    
                                    <button class="btn btn-primary" style="width: 100%; padding: 0.625rem; font-size: 0.875rem; font-weight: 500; border-radius: 4px;" onclick="event.stopPropagation(); window.addToCart(${e.id})">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <!-- BULK BUY SECTION -->
                <div style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); border-radius: 8px; padding: 2rem; margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        <h2 style="font-size: 1.25rem; color: #1e40af; font-weight: 700;">Bulk Buy Deals - Save More!</h2>
                    </div>
                    <p style="font-size: 0.875rem; color: #1e3a8a; margin-bottom: 1.5rem;">Perfect for workshops, classrooms, or large projects</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                        <!-- Arduino Pack -->
                        <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <div style="aspect-ratio: 1; background: #f8f9fa; display: flex; align-items: center; justify-content: center; padding: 1rem;">
                                <img src="assets/bulk-arduino.png" alt="10x Arduino Nano" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                            </div>
                            <div style="padding: 1.25rem;">
                                <div style="font-size: 0.75rem; color: #6366f1; text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem;">BULK PACK</div>
                                <h3 style="font-size: 1rem; margin-bottom: 0.75rem; color: #1e293b; font-weight: 600;">10x Arduino Nano</h3>
                                <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.5rem;">
                                    <span style="font-size: 1.5rem; font-weight: 700; color: #6366f1;">₱1,500</span>
                                    <span style="font-size: 0.875rem; text-decoration: line-through; color: #94a3b8;">₱1,800</span>
                                </div>
                                <div style="font-size: 0.75rem; color: #16a34a; font-weight: 600; margin-bottom: 1rem;">Save ₱300 (17% OFF)</div>
                                <button class="btn btn-primary" style="width: 100%; padding: 0.625rem; font-size: 0.875rem; border-radius: 4px;" onclick="window.addToCart(21)">Add Pack</button>
                            </div>
                        </div>
                        
                        <!-- Sensor Bundle -->
                        <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <div style="aspect-ratio: 1; background: #f8f9fa; display: flex; align-items: center; justify-content: center; padding: 1rem;">
                                <img src="assets/bulk-sensors.png" alt="20x Assorted Sensors" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                            </div>
                            <div style="padding: 1.25rem;">
                                <div style="font-size: 0.75rem; color: #6366f1; text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem;">SENSOR BUNDLE</div>
                                <h3 style="font-size: 1rem; margin-bottom: 0.75rem; color: #1e293b; font-weight: 600;">20x Assorted Sensors</h3>
                                <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.5rem;">
                                    <span style="font-size: 1.5rem; font-weight: 700; color: #6366f1;">₱2,400</span>
                                    <span style="font-size: 0.875rem; text-decoration: line-through; color: #94a3b8;">₱3,000</span>
                                </div>
                                <div style="font-size: 0.75rem; color: #16a34a; font-weight: 600; margin-bottom: 1rem;">Save ₱600 (20% OFF)</div>
                                <button class="btn btn-primary" style="width: 100%; padding: 0.625rem; font-size: 0.875rem; border-radius: 4px;" onclick="window.addToCart(22)">Add Bundle</button>
                            </div>
                        </div>
                        
                        <!-- Resistor Pack -->
                        <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <div style="aspect-ratio: 1; background: #f8f9fa; display: flex; align-items: center; justify-content: center; padding: 1rem;">
                                <img src="assets/bulk-resistors.png" alt="500x Resistors" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                            </div>
                            <div style="padding: 1.25rem;">
                                <div style="font-size: 0.75rem; color: #6366f1; text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem;">RESISTOR PACK</div>
                                <h3 style="font-size: 1rem; margin-bottom: 0.75rem; color: #1e293b; font-weight: 600;">500x Resistors (Assorted)</h3>
                                <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.5rem;">
                                    <span style="font-size: 1.5rem; font-weight: 700; color: #6366f1;">₱800</span>
                                    <span style="font-size: 0.875rem; text-decoration: line-through; color: #94a3b8;">₱1,200</span>
                                </div>
                                <div style="font-size: 0.75rem; color: #16a34a; font-weight: 600; margin-bottom: 1rem;">Save ₱400 (33% OFF)</div>
                                <button class="btn btn-primary" style="width: 100%; padding: 0.625rem; font-size: 0.875rem; border-radius: 4px;" onclick="window.addToCart(23)">Add Pack</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `};window.updateOrderStatus=(t,e)=>{const o=i.orders.find(r=>r.id===t);o&&(o.status=e,w(),l(`Order #${t} updated to ${e}`),v())};window.toggleSelectAll=t=>{document.querySelectorAll(".product-checkbox").forEach(o=>o.checked=t.checked)};window.bulkAction=t=>{const e=document.querySelectorAll(".product-checkbox:checked"),o=Array.from(e).map(r=>parseInt(r.value));if(o.length===0){l("No products selected");return}t==="delete"?confirm(`Delete ${o.length} products?`)&&(i.products=i.products.filter(r=>!o.includes(r.id)),w(),v(),l("Products deleted")):t==="restock"&&(i.products.forEach(r=>{o.includes(r.id)&&(r.stock+=10)}),w(),v(),l("Products restocked"))};window.viewOrderDetails=t=>{const e=i.orders.find(a=>a.id===t);if(!e)return;const o=i.users.find(a=>a.id===e.userId),r=`
        <div class="modal-overlay show" id="orderModal" onclick="if(event.target === this) window.closeModal()">
            <div class="modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Order #${e.id}</h3>
                    <button class="btn-icon" onclick="window.closeModal()">✕</button>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Customer:</strong> ${o?o.name:"Unknown"}</p>
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
                        ${e.items.map(a=>`
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 0.5rem;">${a.name}</td>
                                <td style="padding: 0.5rem;">${a.quantity}</td>
                                <td style="padding: 0.5rem;">${m(a.price)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${m(e.total)}
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",r)};window.closeModal=()=>{const t=document.getElementById("orderModal");t&&t.remove()};const X=()=>{if(!i.currentUser||i.currentUser.role!=="admin")return g("home"),"";i.orders.length===0&&f.getOrders();const t=i.orders.reduce((s,u)=>s+u.total,0),e=i.orders.length;i.products.length;const o=i.users.filter(s=>s.role==="customer").length,r=i.products.filter(s=>s.stock<10);i.products.filter(s=>s.stock===0);const a=i.orders.slice(0,5),n=e>0?t/e:0,d={};i.products.forEach(s=>{d[s.category]=(d[s.category]||0)+1});const c=Object.entries(d).map(([s,u])=>({name:s,count:u})),p=[450,720,550,890,600,950,1200],h=Math.max(...p);return`
        <div class="admin-container">
            <div class="admin-header">
                <div style="display: flex; align-items: center;">
                    <h1>📊 Admin Dashboard</h1>
                </div>
                <div class="admin-actions" style="display: flex; align-items: center;">
                    <div class="notification-bell" onclick="window.showToast('No new notifications')">
                        🔔
                        ${r.length>0?`<span class="notification-badge">${r.length}</span>`:""}
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
                        ${p.map(s=>`
                            <div class="chart-bar" style="height: ${s/h*100}%" data-value="${m(s)}"></div>
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
                            ${c.length} Cats
                        </div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        ${c.slice(0,3).map(s=>`<span class="badge badge-info">${s.name}: ${s.count}</span>`).join("")}
                    </div>
                </div>

                <!-- Top Products -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🏆 Top Products</h3>
                    </div>
                    <div class="top-products-list">
                        ${i.products.slice(0,4).map(s=>`
                            <div class="top-product-item">
                                <img src="${s.image}" style="width: 32px; height: 32px; object-fit: contain;">
                                <div style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                                        <span>${s.name}</span>
                                        <span>${m(s.price)}</span>
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
                        <div class="metric-value">${m(t)}</div>
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
                        <div class="metric-value">${o}</div>
                        <div class="metric-change">2 new this week</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">📊</div>
                    <div class="metric-content">
                        <div class="metric-label">Avg. Order Value</div>
                        <div class="metric-value">${m(n)}</div>
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
                            ${a.length>0?a.map(s=>{const u=i.users.find(y=>y.id===s.userId);return`
                                    <tr>
                                        <td><strong>#${s.orderId}</strong></td>
                                        <td>${new Date(s.createdAt).toLocaleDateString()}</td>
                                        <td>${u?u.name:"Unknown (ID: "+s.userId+")"}</td>
                                        <td>${s.items.length} items</td>
                                        <td><strong>${m(s.total)}</strong></td>
                                        <td>
                                            <select class="status-select" onchange="window.updateOrderStatus('${s.orderId}', this.value)">
                                                <option value="Pending" ${s.status==="Pending"?"selected":""}>Pending</option>
                                                <option value="Shipped" ${s.status==="Shipped"?"selected":""}>Shipped</option>
                                                <option value="Delivered" ${s.status==="Delivered"?"selected":""}>Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button class="btn-icon" onclick="window.viewOrderDetails('${s.orderId}')" title="Quick View">👁️</button>
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
                            ${i.products.map(s=>`
                                <tr>
                                    <td><input type="checkbox" class="product-checkbox" value="${s.id}"></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${s.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${s.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${s.category}</span></td>
                                    <td>${m(s.price)}</td>
                                    <td>
                                        <span class="stock-badge ${s.stock<10?"low":""} ${s.stock===0?"out":""}" style="${s.stock<10?"color: var(--danger); font-weight: bold;":""}">
                                            ${s.stock}
                                        </span>
                                    </td>
                                    <td>${s.stock>0?Math.floor(s.stock/2)+" days":"Out of Stock"}</td>
                                    <td>
                                        <button class="btn-icon" onclick="window.showToast('Editing ${s.name}...')" title="Edit">✏️</button>
                                        <button class="btn-icon danger" onclick="window.deleteProduct(${s.id})" title="Delete">🗑️</button>
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
                            ${i.users.filter(s=>s.role==="customer").slice(0,3).map(s=>`
                                <li style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                                    <span>${s.name}</span>
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
    `},Z=(t=null)=>{const e=t?i.products.find(r=>r.id===t):null,o=!!e;return`
        <div class="modal-overlay show" id="productModal" onclick="if(event.target === this) window.closeProductModal()">
            <div class="modal-content" style="max-width: 600px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>${o?"Edit Product":"Add New Product"}</h3>
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
                        <button type="submit" class="btn btn-primary" style="flex: 1;">${o?"Update":"Create"} Product</button>
                    </div>
                </form>
            </div>
        </div>
    `};window.navigate=g;window.toggleMobileMenu=()=>{i.mobileMenuOpen=!i.mobileMenuOpen,v()};window.showProductModal=(t=null)=>{document.body.insertAdjacentHTML("beforeend",Z(t))};window.closeProductModal=()=>{document.getElementById("productModal")?.remove()};window.editProduct=t=>{window.showProductModal(t)};window.deleteProduct=async t=>{if(confirm("Delete this product?"))try{await b(`/products/${t}`,{method:"DELETE"}),await f.getProducts(),l("Product deleted")}catch{l("Delete failed")}};window.handleProductSubmit=async(t,e)=>{t.preventDefault();const o=new FormData(t.target);try{const r=e?"PUT":"POST",a=e?`/products/${e}`:"/products";if(!(await fetch(`${I}${a}`,{method:r,body:o})).ok)throw new Error("Failed");await f.getProducts(),window.closeProductModal(),l(e?"Product updated!":"Product created!")}catch{l("Operation failed")}};window.handleSort=t=>{i.sortBy=t,v()};window.viewProduct=t=>{i.currentProductId=t,g("product-detail")};window.adjustDetailQty=t=>{const e=document.getElementById("detailQty");let o=parseInt(e.value)+t;o<1&&(o=1),e.value=o};window.addToCartFromDetail=t=>{const e=parseInt(document.getElementById("detailQty").value);if(!i.currentUser){l("Please login to shop"),g("login");return}const o=i.products.find(a=>a.id===t),r=i.cart.find(a=>a.id===t);r?r.quantity+=e:i.cart.push({...o,quantity:e}),w(),l(`Added ${e} item(s) to cart`)};window.addToCart=async t=>{if(!i.currentUser){l("Please login to shop"),g("login");return}const e=i.products.find(r=>r.id===t),o=i.cart.find(r=>r.id===t);o?o.quantity+=1:i.cart.push({...e,quantity:1}),w(),v(),l("Added to cart"),i.currentUser&&await b(`/users/${i.currentUser.id}/cart`,{method:"PUT",body:JSON.stringify({cart:i.cart.map(r=>({productId:r.id,name:r.name,price:r.price,image:r.image,quantity:r.quantity,category:r.category,selected:r.selected!==!1}))})})};window.updateQuantity=(t,e)=>{if(e<1){window.removeFromCart(t);return}const o=i.cart.find(r=>r.id===t);o&&(o.quantity=e,w(),v())};window.removeFromCart=t=>{i.cart=i.cart.filter(e=>e.id!==t),w(),v()};window.checkout=async()=>{if(i.cart.length===0)return;if(!i.currentUser){l("Please login to checkout"),g("login");return}if(i.cart.filter(e=>e.selected!==!1).length===0){l("No items selected for checkout");return}g("checkout")};window.updateShippingInfo=(t,e)=>{i.checkoutData.shipping[t]=e};window.selectPaymentMethod=t=>{i.checkoutData.paymentMethod=t,v()};window.handlePhoneInput=t=>{const e=t.value.replace(/[^0-9]/g,"");t.value=e,i.checkoutData.shipping.phone=e};window.handleNameInput=t=>{const e=t.value.replace(/[^a-zA-Z\s]/g,"");t.value=e,i.checkoutData.shipping.fullName=e};window.handleLocationInput=(t,e)=>{const o=t.value.replace(/[^a-zA-Z\s]/g,"");t.value=o,i.checkoutData.shipping[e]=o};window.handlePostalInput=t=>{const e=t.value.replace(/[^0-9]/g,"");t.value=e,i.checkoutData.shipping.postalCode=e};window.showPaymentModal=t=>new Promise(e=>{let o="";const r=`
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
                                <span style="font-weight: 700;">${m(t)}</span>
                            </div>
                            <div class="payment-summary-row total">
                                <span>To Pay:</span>
                                <span>${m(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentAmountInput"),d=document.getElementById("paymentError"),c=document.getElementById("paymentChangeDisplay"),p=document.getElementById("changeAmount"),h=document.getElementById("paymentConfirmBtn"),s=document.getElementById("paymentCancelBtn");setTimeout(()=>n.focus(),100),n.addEventListener("input",u=>{let y=u.target.value.replace(/[^0-9.]/g,"");const S=y.split(".");S.length>2&&(y=S[0]+"."+S.slice(1).join("")),u.target.value=y,o=y;const k=parseFloat(y);if(!y||isNaN(k)||k<0){d.textContent="",d.classList.remove("show"),n.classList.remove("error"),h.disabled=!0,c.classList.remove("show");return}if(k<t){const P=t-k;d.textContent=`Insufficient! Need ${m(P)} more`,d.classList.add("show"),n.classList.add("error"),h.disabled=!0,c.classList.remove("show")}else{const P=k-t;d.classList.remove("show"),n.classList.remove("error"),h.disabled=!1,c.classList.add("show"),p.textContent=m(P)}}),document.querySelectorAll(".quick-amount-btn").forEach(u=>{u.addEventListener("click",()=>{const y=u.getAttribute("data-amount");n.value=y,n.dispatchEvent(new Event("input"))})}),s.addEventListener("click",()=>{a.remove(),e(null)}),a.addEventListener("click",u=>{u.target===a&&(a.remove(),e(null))}),h.addEventListener("click",()=>{const u=parseFloat(o);u>=t&&(a.remove(),e({amountPaid:u,change:u-t}))}),n.addEventListener("keypress",u=>{u.key==="Enter"&&!h.disabled&&h.click()}),document.addEventListener("keydown",function u(y){y.key==="Escape"&&(a.remove(),e(null),document.removeEventListener("keydown",u))})});window.showGCashModal=t=>new Promise(e=>{const o="GCASH-"+Date.now().toString().slice(-8),r=`
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
                                <span>${m(t)}</span>
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
                                value="${o}"
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentConfirmBtn"),d=document.getElementById("paymentCancelBtn"),c=document.getElementById("processingOverlay"),p=document.getElementById("successOverlay");d.addEventListener("click",()=>{a.remove(),e(null)}),n.addEventListener("click",()=>{c.classList.add("show"),setTimeout(()=>{c.classList.remove("show"),p.classList.add("show"),setTimeout(()=>{a.remove(),e({method:"gcash",reference:o})},1e3)},1500)}),a.addEventListener("click",h=>{h.target===a&&(a.remove(),e(null))})});window.showMayaModal=t=>new Promise(e=>{const o="MAYA-"+Date.now().toString().slice(-8),r=`
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
                                <span>${m(t)}</span>
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
                                value="${o}"
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentConfirmBtn"),d=document.getElementById("paymentCancelBtn"),c=document.getElementById("processingOverlay"),p=document.getElementById("successOverlay");d.addEventListener("click",()=>{a.remove(),e(null)}),n.addEventListener("click",()=>{c.classList.add("show"),setTimeout(()=>{c.classList.remove("show"),p.classList.add("show"),setTimeout(()=>{a.remove(),e({method:"maya",reference:o})},1e3)},1500)}),a.addEventListener("click",h=>{h.target===a&&(a.remove(),e(null))})});window.showCardModal=t=>new Promise(e=>{const d=`
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
                                <span>${m(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",d);const c=document.getElementById("paymentModalOverlay"),p=document.getElementById("paymentConfirmBtn"),h=document.getElementById("paymentCancelBtn"),s=document.getElementById("processingOverlay"),u=document.getElementById("successOverlay");h.addEventListener("click",()=>{c.remove(),e(null)}),p.addEventListener("click",()=>{s.classList.add("show"),setTimeout(()=>{s.classList.remove("show"),u.classList.add("show"),setTimeout(()=>{c.remove(),e({method:"card",last4:"1111"})},1e3)},2e3)}),c.addEventListener("click",y=>{y.target===c&&(c.remove(),e(null))})});window.showBankModal=t=>new Promise(e=>{const o="BDO-"+Date.now().toString().slice(-8),r=`
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
                                <span>${m(t)}</span>
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
                                value="${o}"
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentConfirmBtn"),d=document.getElementById("paymentCancelBtn"),c=document.getElementById("processingOverlay"),p=document.getElementById("successOverlay");d.addEventListener("click",()=>{a.remove(),e(null)}),n.addEventListener("click",()=>{c.classList.add("show"),setTimeout(()=>{c.classList.remove("show"),p.classList.add("show"),setTimeout(()=>{a.remove(),e({method:"bank",reference:o})},1e3)},1500)}),a.addEventListener("click",h=>{h.target===a&&(a.remove(),e(null))})});window.placeOrder=async()=>{const t=i.checkoutData.shipping;if(!t.fullName||!t.fullName.trim()){l("Please enter your full name");return}if(!t.address||!t.address.trim()){l("Please enter your address");return}if(!t.city||!t.city.trim()){l("Please enter your city");return}if(!t.province||!t.province.trim()){l("Please enter your province");return}if(!t.phone||!t.phone.trim()){l("Please enter your phone number");return}if(!/^09\d{9}$/.test(t.phone)){l('Phone number must start with "09" and contain exactly 11 digits');return}const o=/^[a-zA-Z\s]+$/;if(!o.test(t.fullName)){l("Full Name must contain letters and spaces only");return}if(!o.test(t.city)){l("City must contain letters and spaces only");return}if(!o.test(t.province)){l("Province must contain letters and spaces only");return}if(t.postalCode&&!/^\d+$/.test(t.postalCode)){l("Postal Code must contain numbers only");return}if(!i.checkoutData.paymentMethod){l("Please select a payment method");return}const r=i.cart.filter(s=>s.selected!==!1),n=r.reduce((s,u)=>s+u.price*u.quantity,0)+i.checkoutData.shippingFee;let d=null;switch(i.checkoutData.paymentMethod){case"cod":d=await showPaymentModal(n);break;case"gcash":d=await showGCashModal(n);break;case"maya":d=await showMayaModal(n);break;case"card":d=await showCardModal(n);break;case"bank":d=await showBankModal(n);break;default:l("Please select a payment method");return}if(!d)return;let c=d.amountPaid||n,p=d.change||0;const h={userId:i.currentUser.id,items:r.map(s=>({productId:s.id,quantity:s.quantity,price:s.price,name:s.name})),total:n,shippingInfo:i.checkoutData.shipping,paymentMethod:i.checkoutData.paymentMethod,shippingFee:i.checkoutData.shippingFee,amountPaid:c,change:p};try{const s=await f.createOrder(h);i.lastOrderId=s.orderId,i.lastOrderPayment={amountPaid:c,change:p},i.orders.push({orderId:s.orderId,...s,items:r,total:n,createdAt:new Date().toISOString(),userId:i.currentUser.id}),i.cart=i.cart.filter(u=>u.selected===!1),w(),g("order-confirmation")}catch{}};window.printReceipt=()=>{if(!i.lastOrderId){l("No order found to print");return}const t=i.orders.find(n=>n.orderId===i.lastOrderId);if(!t){l("Order not found");return}const e=i.lastOrderPayment||{},o=new Date,r=`
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
                    <span>${o.toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"})}</span>
                </div>
                <div class="info-row">
                    <span>Time:</span>
                    <span>${o.toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit"})}</span>
                </div>
                <div class="info-row">
                    <span>Cashier:</span>
                    <span>${i.currentUser.name}</span>
                </div>
                <div class="info-row">
                    <span>Payment:</span>
                    <span>${i.checkoutData.paymentMethod.toUpperCase()}</span>
                </div>
            </div>
            
            <div class="items-section">
                <div class="items-header">
                    <div>ITEM</div>
                    <div class="text-center">QTY</div>
                    <div class="text-right">AMOUNT</div>
                </div>
                
                ${t.items.map(n=>`
                    <div class="item-row">
                        <div class="item-name">${n.productName||n.name}</div>
                        <div class="item-details">
                            <div>${m(n.price)}</div>
                            <div class="text-center">x${n.quantity}</div>
                            <div class="text-right"><strong>${m(n.price*n.quantity)}</strong></div>
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div class="totals-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>${m(t.total-i.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping Fee:</span>
                    <span>${m(i.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row grand-total">
                    <span>TOTAL:</span>
                    <span>${m(t.total)}</span>
                </div>
            </div>
            
            ${e.amountPaid?`
                <div class="payment-section">
                    <div class="payment-row">
                        <span>Amount Paid:</span>
                        <span>${m(e.amountPaid)}</span>
                    </div>
                    <div class="payment-row change-row">
                        <span>Change:</span>
                        <span>${m(e.change)}</span>
                    </div>
                </div>
            `:""}
            
            <div class="receipt-footer">
                <div class="thank-you">THANK YOU!</div>
                <div class="footer-note">Please come again</div>
                <div class="footer-note" style="margin-top: 10px;">
                    Shipping to:<br>
                    ${i.checkoutData.shipping.fullName}<br>
                    ${i.checkoutData.shipping.address}<br>
                    ${i.checkoutData.shipping.city}, ${i.checkoutData.shipping.province}<br>
                    Phone: ${i.checkoutData.shipping.phone}
                </div>
                <div style="margin-top: 15px; font-size: 9px;">
                    This serves as your official receipt<br>
                    Keep this for warranty claims
                </div>
            </div>
        </body>
        </html>
    `,a=window.open("","_blank","width=300,height=600");a.document.write(r),a.document.close(),a.onload=function(){setTimeout(()=>{a.print()},250)}};window.handleSearchInput=t=>{const e=t.target.value;if(i.searchQuery=e,e.trim()){const o=new Set;i.products.forEach(r=>{const a=r.name.toLowerCase(),n=r.category.toLowerCase(),d=e.toLowerCase();a.includes(d)&&o.add(r.name),n.includes(d)&&o.add(r.category),a.split(" ").forEach(p=>{p.toLowerCase().startsWith(d)&&p.length>2&&o.add(p.charAt(0).toUpperCase()+p.slice(1))})}),i.searchSuggestions=Array.from(o).slice(0,8),i.showSuggestions=!0}else if(i.searchSuggestions=[],i.showSuggestions=!1,i.route==="home"||i.route==="products"){v();return}B()};function B(){const t=document.querySelector(".search-container");if(!t)return;const e=t.querySelector(".search-suggestions");if(e&&e.remove(),i.showSuggestions&&i.searchQuery){const o=`
            <div class="search-suggestions" id="searchSuggestions">
                <div class="suggestions-header">Suggestions</div>
                ${i.searchSuggestions.slice(0,5).map(r=>`
                    <div class="suggestion-item" onclick="window.selectSuggestion('${r.replace(/'/g,"\\'")}')"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <span>${r}</span>
                    </div>
                `).join("")}
                ${i.searchQuery?`
                    <div class="suggestion-search-all" onclick="window.handleSearch()">
                        Search for "${i.searchQuery}" →
                    </div>
                `:""}
            </div>
        `;t.insertAdjacentHTML("beforeend",o)}}window.showSearchSuggestions=()=>{i.searchQuery&&(i.showSuggestions=!0,B())};window.selectSuggestion=t=>{i.searchQuery=t,i.showSuggestions=!1;const e=document.getElementById("searchInput");e&&(e.value=t),handleSearch()};window.handleSearch=()=>{i.showSuggestions=!1;const t=document.getElementById("searchInput");t&&(i.searchQuery=t.value.trim()),g("products"),setTimeout(()=>{const e=document.querySelector(".product-grid");e&&e.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{i.searchQuery="",i.showSuggestions=!1,i.searchSuggestions=[],v()};document.addEventListener("click",t=>{if(!t.target.closest(".search-container")&&i.showSuggestions){i.showSuggestions=!1;const e=document.querySelector(".search-suggestions");e&&e.remove()}});window.handleLogin=async t=>{console.log("Login attempt started"),t.preventDefault();const e=t.target.email.value,o=t.target.password.value;console.log("Credentials:",{email:e,password:o});try{await f.login(e,o),console.log("Login successful")}catch(r){console.error("Login error:",r)}};window.handleSignup=async t=>{console.log("Signup attempt started"),t.preventDefault();const e=t.target.name.value,o=t.target.email.value,r=t.target.password.value;try{await f.register(e,o,r)}catch(a){console.error("Signup error:",a)}};window.logout=()=>{i.currentUser=null,i.cart=[],localStorage.removeItem("currentUser"),localStorage.removeItem("cart_v2"),l("Logged out successfully"),sessionStorage.removeItem("currentRoute"),g("home")};window.handleContactSubmit=t=>{t.preventDefault();const e=t.target,o={name:e.name.value,email:e.email.value,subject:e.subject.value,message:e.message.value};console.log("Contact form submitted:",o),l("Thank you for your message! We will get back to you soon."),e.reset()};window.deleteProduct=t=>{confirm("Are you sure you want to remove this product?")&&(i.products=i.products.filter(e=>e.id!==t),w(),v(),l("Product removed"))};window.viewOrderDetails=t=>{const e=i.orders.find(d=>d.orderId===t);if(!e){l("Order not found");return}const o=i.users.find(d=>d.id===e.userId),r=o?o.name:`User ID: ${e.userId}`,a=document.createElement("div");a.className="order-details-modal",a.innerHTML=`
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
                        <span class="info-value">${r}</span>
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
                                <div class="item-meta">Quantity: ${d.quantity} × ${m(d.price)}</div>
                            </div>
                            <div class="item-total">${m(d.price*d.quantity)}</div>
                        </div>
                    `).join("")}
                </div>
                
                <div class="order-total">
                    <span>Total Amount:</span>
                    <span class="total-amount">${m(e.total)}</span>
                </div>
            </div>
        </div>
    `,document.body.appendChild(a);const n=d=>{d.key==="Escape"&&(a.remove(),document.removeEventListener("keydown",n))};document.addEventListener("keydown",n)};const v=()=>{const t=document.getElementById("app");let e="";switch(i.route){case"home":e=M();break;case"products":e=U();break;case"product-detail":e=N();break;case"login":e=q();break;case"signup":e=R();break;case"cart":e=F();break;case"checkout":e=G();break;case"order-confirmation":e=Y();break;case"contact-us":e=W();break;case"about-us":e=J();break;case"learn":e=K();break;case"deals":e=_();break;case"admin":e=X();break;case"my-devices":e=H();break;case"device-pair":e=Q();break;case"remote-control":e=V();break;default:e=M()}t.innerHTML=`
        ${j()}
        <main>
            ${e}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `,i.route==="deals"&&setTimeout(()=>window.startDealsTimer(),100)};window.handleCartSearch=t=>{i.cartSearchQuery=t.target.value,$()};window.clearCartSearch=()=>{i.cartSearchQuery="",$()};window.toggleCartItem=t=>{const e=i.cart.find(o=>o.id===t);e&&(e.selected=e.selected===!1,w(),$())};window.toggleFindSimilar=t=>{const e=i.cart.find(o=>o.id===t);e&&(i.cart.forEach(o=>{o.id!==t&&(o.showSimilar=!1)}),e.showSimilar=!e.showSimilar,w(),$())};function $(){const t=document.querySelector(".cart-items"),e=document.querySelector(".cart-summary"),o=document.querySelector(".cart-search-message");if(!t)return;let r=i.cart;if(i.cartSearchQuery&&(r=i.cart.filter(n=>n.name.toLowerCase().includes(i.cartSearchQuery.toLowerCase())||n.category.toLowerCase().includes(i.cartSearchQuery.toLowerCase()))),t.innerHTML=r.map(n=>{const d=i.products.filter(c=>c.category===n.category&&c.id!==n.id).slice(0,4);return`
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
                    <p class="text-muted">${m(n.price)}</p>
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
                        ${d.map(c=>`
                            <div class="similar-product-card" onclick="window.viewProduct(${c.id})">
                                <img src="${c.image}" alt="${c.name}" class="similar-product-image">
                                <div class="similar-product-title" title="${c.name}">${c.name}</div>
                                <div class="similar-product-price">${m(c.price)}</div>
                            </div>
                        `).join("")}
                    </div>
                `:'<p class="text-muted text-center">No similar products found.</p>'}
            </div>
        </div>
    `}).join(""),e){const n=i.cart.reduce((c,p)=>c+(p.selected!==!1?p.price*p.quantity:0),0),d=i.cart.filter(c=>c.selected!==!1).length;e.innerHTML=`
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${m(n)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${d})
            </button>
        `}o&&(i.cartSearchQuery&&r.length===0?(o.innerHTML=`
                <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                    No items found for "${i.cartSearchQuery}"
                </p>
            `,o.style.display="block"):o.style.display="none");const a=document.querySelector("#cartSearchInput + .search-btn");a&&(a.innerHTML=i.cartSearchQuery?`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `:`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `)}let L=null;window.startDealsTimer=()=>{const t=new Date().getTime()+864e5;L=setInterval(()=>{const e=new Date().getTime(),o=t-e,r=Math.floor(o%(1e3*60*60*24)/(1e3*60*60)),a=Math.floor(o%(1e3*60*60)/(1e3*60)),n=Math.floor(o%(1e3*60)/1e3),d=document.getElementById("deal-hours"),c=document.getElementById("deal-minutes"),p=document.getElementById("deal-seconds");d&&(d.textContent=String(r).padStart(2,"0")),c&&(c.textContent=String(a).padStart(2,"0")),p&&(p.textContent=String(n).padStart(2,"0")),o<0&&(clearInterval(L),d&&(d.textContent="00"),c&&(c.textContent="00"),p&&(p.textContent="00"))},1e3)};window.filterLearningContent=t=>{const e=document.querySelectorAll(".tutorial-card");document.querySelectorAll(".topic-filter").forEach(r=>{r.dataset.filter===t?(r.style.background="#6366f1",r.style.color="white",r.style.borderColor="#6366f1"):(r.style.background="white",r.style.color="#64748b",r.style.borderColor="#e2e8f0")}),e.forEach(r=>{const a=r.dataset.category,n=r.dataset.topic;t==="all"||a===t||n===t?r.style.display="block":r.style.display="none"})};window.currentLearnCategory="all";window.filterTutorials=t=>{window.currentLearnCategory=t;const e=document.querySelectorAll(".tutorial-card");document.querySelectorAll(".category-tab").forEach(r=>{r.classList.remove("active"),r.dataset.category===t&&r.classList.add("active")}),e.forEach(r=>{t==="all"||r.dataset.category===t?r.style.display="block":r.style.display="none"})};window.filterDeals=t=>{const e=document.querySelectorAll(".deal-product-card");document.querySelectorAll(".deal-category-tab").forEach(r=>{r.dataset.category===t?(r.style.background="#6366f1",r.style.color="white"):(r.style.background="white",r.style.color="#64748b")}),e.forEach(r=>{t==="all"||t==="clearance"||r.dataset.category===t?r.style.display="block":r.style.display="none"})};window.openVideoModal=t=>{const e=document.createElement("div");e.className="video-modal",e.innerHTML=`
        <div class="video-modal-content">
            <div class="video-modal-close" onclick="this.closest('.video-modal').remove()">✕</div>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${t}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `,document.body.appendChild(e),setTimeout(()=>e.classList.add("show"),10)};const ee=async()=>{await f.getProducts(),i.currentUser?.role==="admin"&&await Promise.all([f.getOrders(),f.getMyDevices(),f.getUsers()]),v()};window.handleDevicePairing=async t=>{t.preventDefault();const e=t.target,o=e.deviceId.value.trim(),r=e.deviceToken.value.trim();try{await f.pairDevice(o,r)}catch{}};window.startRemoteControl=async t=>{i.currentDeviceId=t,i.esp32Client||(i.esp32Client=new ESP32SocketClient);try{await i.esp32Client.connect(i.currentUser._id),i.esp32Client.monitorDevice(t),i.esp32Client.on("device:status",e=>{i.deviceStatus[e.deviceId]=e,z()}),i.esp32Client.on("device:telemetry",e=>{i.telemetryData[e.deviceId]=e,z()}),i.esp32Client.on("command:sent",e=>{D(`Command sent: ${e.command}`)}),i.esp32Client.on("command:response",e=>{e.success?D(`✓ ${e.message||"Command executed"}`):D(`✗ ${e.error||"Command failed"}`)}),g("remote-control")}catch(e){l("Failed to connect to device"),console.error(e)}};window.stopRemoteControl=()=>{i.esp32Client&&i.esp32Client.stopMonitoring(),i.currentDeviceId=null,g("my-devices")};window.sendCarCommand=t=>{if(!(!i.esp32Client||!i.currentDeviceId))try{t==="stop"?i.esp32Client.stop(i.currentDeviceId):i.esp32Client.move(i.currentDeviceId,t,255)}catch(e){l("Failed to send command"),console.error(e)}};function z(){i.route==="remote-control"&&v()}function D(t){const e=document.getElementById("commandLogContent");if(e){const o=document.createElement("div");for(o.className="log-entry",o.textContent=`[${new Date().toLocaleTimeString()}] ${t}`,e.insertBefore(o,e.firstChild);e.children.length>10;)e.removeChild(e.lastChild)}}document.addEventListener("keydown",t=>{if(i.route!=="remote-control")return;const e=t.key.toLowerCase(),o={w:"forward",arrowup:"forward",s:"backward",arrowdown:"backward",a:"left",arrowleft:"left",d:"right",arrowright:"right"," ":"stop"};o[e]&&(t.preventDefault(),window.sendCarCommand(o[e]))});document.addEventListener("keyup",t=>{if(i.route!=="remote-control")return;const e=t.key.toLowerCase();["w","s","a","d","arrowup","arrowdown","arrowleft","arrowright"].includes(e)&&(t.preventDefault(),window.sendCarCommand("stop"))});ee();
