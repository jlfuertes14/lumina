(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const S=[{id:1,name:"ESP32 Development Board (Type-C)",category:"Microcontrollers",price:350,image:"images/products/esp32.png",stock:45,description:"Type C ESP32 Development Board with 30/38 pins. Supported interfaces: UART, SPI, SDIO, I2C, PWM, I2S, IR, ADC, DAC. Perfect for IoT projects."},{id:2,name:"Ultrasonic Sensor HC-SR04",category:"Sensors",price:89,image:"images/products/hc-sr04.png",stock:120,description:"Popular and cost-effective module used for non-contact distance measurement. Works by emitting ultrasonic waves."},{id:3,name:"L298N DC Motor Driver Module",category:"Motor Drivers",price:75,image:"images/products/l298n.png",stock:67,description:"Dual H-Bridge Motor Driver Module. High voltage, dual H-bridge manufactured by ST company. Perfect for controlling DC motors and stepper motors."},{id:4,name:"40-Pin Jumper Wires (10cm)",category:"Cables & Wires",price:25,image:"images/products/jumper-wires.png",stock:200,description:"Essential tools for breadboarding and prototyping. 40-pin jumper wires allow easy connections between components."},{id:5,name:"Breadboard 830 Points",category:"Prototyping",price:99,image:"images/products/breadboard.png",stock:85,description:"Solderless breadboard SYB-MB102 with 830 tie points. Completely reusable, perfect for creating temporary circuits without soldering."},{id:6,name:"SG90 Micro Servo Motor (9g)",category:"Motors & Actuators",price:95,image:"images/products/sg90.png",stock:150,description:"SG92R/SG90 Micro Servo with nylon carbon fiber gears. Stall Torque: 2.5kg/cm at 4.8V. Perfect for RC models and robotics."},{id:7,name:"Tower Pro MG996R Servo Motor",category:"Motors & Actuators",price:275,image:"images/products/mg996r.png",stock:42,description:"Digital servo motor with 180° rotation. High torque for robotics applications. Metal gears for durability."},{id:8,name:"1-4 Channel 5V Relay Module",category:"Relays & Switches",price:125,image:"images/products/relay.png",stock:95,description:"5V/12V 10A relay module with optocoupler. Compatible with Arduino, Orange Pi, and Raspberry Pi (use 5V version)."},{id:9,name:"LM2596S DC-DC Buck Converter",category:"Power Supply",price:45,image:"images/products/buck-converter.png",stock:78,description:"Step-down voltage regulator module. Adjustable output voltage. Perfect for powering projects with different voltage requirements."},{id:10,name:"IR Proximity Sensor",category:"Sensors",price:35,image:"images/products/ir-sensor.png",stock:110,description:"Multipurpose infrared sensor for obstacle sensing, color detection, and line following applications."},{id:11,name:"18650 Battery Holder (1S/2S/3S)",category:"Batteries & Holders",price:35,image:"images/products/battery-holder.png",stock:140,description:"Series battery holder for 18650 cells with wire. Available in 1, 2, or 3 cell configurations for various voltage requirements."},{id:12,name:"PKCELL 18650 3.7V Battery (3000mAh)",category:"Batteries & Holders",price:175,image:"images/products/battery-18650.png",stock:88,description:"True rated lithium-ion 18650 battery. Available in 2200mAh, 3000mAh, 3350mAh capacities. Perfect for power banks and flashlights."},{id:13,name:"USB Cable for Arduino Nano/Uno",category:"Cables & Wires",price:25,image:"images/products/usb-cable.png",stock:165,description:"25cm Mini USB cable for Arduino Nano or Uno/Mega boards. Blue color, quality connectors."},{id:14,name:"FR4 Universal PCB Board (Double-Sided)",category:"Prototyping",price:55,image:"images/products/pcb-board.png",stock:95,description:"Fiberglass universal protoboard, more durable than phenolic paper PCB. Double-sided for complex circuits."},{id:15,name:"SanDisk MicroSD Card (16GB-256GB)",category:"Storage",price:299,image:"images/products/microsd.png",stock:75,description:"SanDisk Ultra Class 10 memory card for Raspberry Pi and phones. Fast transfer speeds. Available in multiple capacities."},{id:16,name:"eSUN PLA+ 3D Printer Filament (1.75mm, 1kg)",category:"3D Printing",price:799,image:"images/products/esun-pla-plus.png",stock:55,description:"Environmentally friendly PLA+ filament with smooth surface finish. Easy to print with excellent layer adhesion."},{id:17,name:"eSUN PETG Filament (1.75mm, 1kg)",category:"3D Printing",price:1099,image:"images/products/esun-petg.png",stock:48,description:"High-performance PETG filament combining ABS strength with PLA ease of printing. Excellent durability."},{id:18,name:"Polymaker Matte PLA Filament",category:"3D Printing",price:1350,image:"images/products/polymaker-matte.png",stock:35,description:"Panchroma™ Matte bioplastic 3D printing filament. Next generation matte finish for stunning prints."},{id:19,name:"ELEGOO PLA Filament (1.75mm, 1kg)",category:"3D Printing",price:749,image:"images/products/elegoo-pla.png",stock:62,description:"High-quality PLA with lower melting temperature. Easy to use, multiple color options available."},{id:20,name:"Bambu Lab PLA Basic Filament (1kg)",category:"3D Printing",price:999,image:"images/products/bambu-lab.png",stock:40,description:"Easy to print, beginner-friendly PLA with smooth surface finish. Biodegradable and reliable quality."}],$=[{id:1,name:"Admin User",email:"adminlumina",password:"lumina12",role:"admin"},{id:2,name:"John Doe",email:"userlumina",password:"lumina123",role:"customer"}],C=[{id:"ORD-001",userId:2,date:"2023-10-25",total:1598,status:"Completed",items:[{productId:1,quantity:1},{productId:2,quantity:1}]}],e={products:JSON.parse(localStorage.getItem("products_v2"))||S,users:JSON.parse(localStorage.getItem("users_v2"))||$,orders:JSON.parse(localStorage.getItem("orders"))||C,currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:"home",searchQuery:"",showSuggestions:!1,searchSuggestions:[],currentProductId:null,sortBy:"featured",cartSearchQuery:""},p=()=>{localStorage.setItem("products_v2",JSON.stringify(e.products)),localStorage.setItem("users_v2",JSON.stringify(e.users)),localStorage.setItem("orders",JSON.stringify(e.orders)),localStorage.setItem("currentUser",JSON.stringify(e.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(e.cart))},d=i=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(i),u=i=>{const t=document.createElement("div");t.className="toast",t.textContent=i,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3e3)},h=i=>{e.route=i,g(),window.scrollTo(0,0)},P=()=>{const i=e.cart.reduce((o,n)=>o+n.quantity,0),t=!!e.currentUser,r=e.currentUser?.role==="admin";return`
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
                            `:""}
                        </div>
                    </div>
                `}

                <div class="nav-actions">
                    ${r?"":`
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
            
            <nav class="header-nav">
                <a href="#" class="nav-link ${e.route==="home"?"active":""}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${e.route==="products"?"active":""}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link">Brands</a>
                <a href="#" class="nav-link">Deals</a>
                <a href="#" class="nav-link">Support</a>
                ${r?`<a href="#" class="nav-link ${e.route==="admin"?"active":""}" onclick="window.navigate('admin'); return false;">Admin Dashboard</a>`:""}
            </nav>
        </header>
    `},y=i=>{const t=i.stock<10,r=t?"low-stock":"",s=t?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${i.id})" style="cursor: pointer;">
            <div class="product-badge ${r}">${s}</div>
            <div class="product-image">
                <img src="${i.image}" alt="${i.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${i.category}</div>
                <h3 class="product-title">${i.name}</h3>
                <div class="product-price">${d(i.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${i.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},L=()=>{const i=e.products.find(o=>o.id===e.currentProductId);if(!i)return h("home"),"";i.stock<10;const t=i.stock>0?"In Stock":"Out of Stock",r=i.stock>0?"var(--success)":"var(--danger)",s=e.products.filter(o=>o.id!==i.id).sort(()=>.5-Math.random()).slice(0,4);return`
        <div class="product-detail-container">
            <div class="breadcrumbs">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a> &gt; 
                <a href="#" onclick="window.navigate('products'); return false;">Products</a> &gt; 
                <span>${i.name}</span>
            </div>

            <div class="product-main">
                <div class="product-gallery">
                    <img src="${i.image}" alt="${i.name}">
                </div>

                <div class="product-details-info">
                    <div class="product-sku">SKU: LUM-${i.id.toString().padStart(4,"0")}</div>
                    <h1 class="detail-title">${i.name}</h1>
                    <div class="detail-price">${d(i.price)}</div>

                    <div class="detail-section">
                        <span class="detail-label">Description</span>
                        <p style="color: var(--text-muted); line-height: 1.6;">${i.description}</p>
                    </div>

                    <div class="detail-section">
                        <span class="detail-label">Quantity</span>
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="window.adjustDetailQty(-1)">-</button>
                            <input type="number" id="detailQty" class="qty-input" value="1" min="1" max="${i.stock}" readonly>
                            <button class="qty-btn" onclick="window.adjustDetailQty(1)">+</button>
                        </div>
                    </div>

                    <button class="btn-add-large" onclick="window.addToCartFromDetail(${i.id})">
                        Add To Cart
                    </button>

                    <div class="stock-status" style="color: ${r}">
                        <span class="stock-dot" style="background-color: ${r}"></span>
                        ${t} (${i.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${s.map(y).join("")}
                </div>
            </div>
        </div>
    `},f=()=>{if(e.searchQuery){const r=e.products.filter(s=>s.name.toLowerCase().includes(e.searchQuery.toLowerCase())||s.category.toLowerCase().includes(e.searchQuery.toLowerCase())||s.description.toLowerCase().includes(e.searchQuery.toLowerCase()));return`
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
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${r.length} result${r.length!==1?"s":""} for "${e.searchQuery}"</p>
                ${r.length>0?`
                    <div class="product-grid">
                        ${r.map(y).join("")}
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
        `}const i=[1,6,2,12,4];return`
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
                ${e.products.filter(r=>i.includes(r.id)).sort((r,s)=>i.indexOf(r.id)-i.indexOf(s.id)).map(y).join("")}
            </div>
        </div>
    `},I=()=>{let i=[...e.products];switch(e.searchQuery&&(i=i.filter(t=>t.name.toLowerCase().includes(e.searchQuery.toLowerCase())||t.category.toLowerCase().includes(e.searchQuery.toLowerCase())||t.description.toLowerCase().includes(e.searchQuery.toLowerCase()))),e.sortBy){case"price-asc":i.sort((t,r)=>t.price-r.price);break;case"price-desc":i.sort((t,r)=>r.price-t.price);break;case"name-asc":i.sort((t,r)=>t.name.localeCompare(r.name));break;case"name-desc":i.sort((t,r)=>r.name.localeCompare(t.name));break;case"featured":default:i.sort((t,r)=>t.id-r.id);break}return`
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
                        <span style="color: var(--text-muted); font-size: 0.9rem;">${i.length} products</span>
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
                ${i.map(y).join("")}
            </div>
        </div>
    `},D=()=>`
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
    `,A=()=>`
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
    `,B=()=>{if(e.cart.length===0)return`
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('products')">Start Shopping</button>
            </div>
        `;let i=e.cart;return e.cartSearchQuery&&(i=e.cart.filter(t=>t.name.toLowerCase().includes(e.cartSearchQuery.toLowerCase())||t.category.toLowerCase().includes(e.cartSearchQuery.toLowerCase()))),e.cart.reduce((t,r)=>t+r.price*r.quantity,0),`
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
                
                <div class="cart-search-message" style="${e.cartSearchQuery&&i.length===0?"":"display: none;"}">
                    ${e.cartSearchQuery&&i.length===0?`
                        <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                            No items found for "${e.cartSearchQuery}"
                        </p>
                    `:""}
                </div>
                
            <div class="cart-items">
                ${i.map(t=>{const r=e.products.filter(s=>s.category===t.category&&s.id!==t.id).slice(0,4);return`
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
                            ${r.length>0?`
                                <div class="similar-products-grid">
                                    ${r.map(s=>`
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
                    <span>${d(e.cart.reduce((t,r)=>t+(r.selected!==!1?r.price*r.quantity:0),0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${e.cart.filter(t=>t.selected!==!1).length})
                </button>

            </div>
        </div>
        </div>
    `};window.updateOrderStatus=(i,t)=>{const r=e.orders.find(s=>s.id===i);r&&(r.status=t,p(),u(`Order #${i} updated to ${t}`),g())};window.toggleSelectAll=i=>{document.querySelectorAll(".product-checkbox").forEach(r=>r.checked=i.checked)};window.bulkAction=i=>{const t=document.querySelectorAll(".product-checkbox:checked"),r=Array.from(t).map(s=>parseInt(s.value));if(r.length===0){u("No products selected");return}i==="delete"?confirm(`Delete ${r.length} products?`)&&(e.products=e.products.filter(s=>!r.includes(s.id)),p(),g(),u("Products deleted")):i==="restock"&&(e.products.forEach(s=>{r.includes(s.id)&&(s.stock+=10)}),p(),g(),u("Products restocked"))};window.viewOrderDetails=i=>{const t=e.orders.find(o=>o.id===i);if(!t)return;const r=e.users.find(o=>o.id===t.userId),s=`
        <div class="modal-overlay show" id="orderModal" onclick="if(event.target === this) window.closeModal()">
            <div class="modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Order #${t.id}</h3>
                    <button class="btn-icon" onclick="window.closeModal()">✕</button>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Customer:</strong> ${r?r.name:"Unknown"}</p>
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
                        ${t.items.map(o=>`
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 0.5rem;">${o.name}</td>
                                <td style="padding: 0.5rem;">${o.quantity}</td>
                                <td style="padding: 0.5rem;">${d(o.price)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${d(t.total)}
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",s)};window.closeModal=()=>{const i=document.getElementById("orderModal");i&&i.remove()};const M=()=>{if(!e.currentUser||e.currentUser.role!=="admin")return h("home"),"";const i=e.orders.reduce((a,v)=>a+v.total,0),t=e.orders.length;e.products.length;const r=e.users.filter(a=>a.role==="customer").length,s=e.products.filter(a=>a.stock<10);e.products.filter(a=>a.stock===0);const o=e.orders.slice(0,5),n=t>0?i/t:0,l={};e.products.forEach(a=>{l[a.category]=(l[a.category]||0)+1});const c=Object.entries(l).map(([a,v])=>({name:a,count:v})),m=[450,720,550,890,600,950,1200],k=Math.max(...m);return`
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
                        ${m.map(a=>`
                            <div class="chart-bar" style="height: ${a/k*100}%" data-value="${d(a)}"></div>
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
                        ${c.slice(0,3).map(a=>`<span class="badge badge-info">${a.name}: ${a.count}</span>`).join("")}
                    </div>
                </div>

                <!-- Top Products -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🏆 Top Products</h3>
                    </div>
                    <div class="top-products-list">
                        ${e.products.slice(0,4).map(a=>`
                            <div class="top-product-item">
                                <img src="${a.image}" style="width: 32px; height: 32px; object-fit: contain;">
                                <div style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                                        <span>${a.name}</span>
                                        <span>${d(a.price)}</span>
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
                        <div class="metric-value">${d(i)}</div>
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
                        <div class="metric-value">${r}</div>
                        <div class="metric-change">2 new this week</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">📊</div>
                    <div class="metric-content">
                        <div class="metric-label">Avg. Order Value</div>
                        <div class="metric-value">${d(n)}</div>
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
                            ${o.length>0?o.map(a=>{const v=e.users.find(x=>x.id===a.userId);return`
                                    <tr>
                                        <td><strong>#${a.id}</strong></td>
                                        <td>${a.date}</td>
                                        <td>${v?v.name:"Unknown"}</td>
                                        <td>${a.items.length} items</td>
                                        <td><strong>${d(a.total)}</strong></td>
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
                            ${e.products.map(a=>`
                                <tr>
                                    <td><input type="checkbox" class="product-checkbox" value="${a.id}"></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${a.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${a.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${a.category}</span></td>
                                    <td>${d(a.price)}</td>
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
                            ${e.users.filter(a=>a.role==="customer").slice(0,3).map(a=>`
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
    `};window.navigate=h;window.handleSort=i=>{e.sortBy=i,g()};window.viewProduct=i=>{e.currentProductId=i,h("product-detail")};window.adjustDetailQty=i=>{const t=document.getElementById("detailQty");let r=parseInt(t.value)+i;r<1&&(r=1),t.value=r};window.addToCartFromDetail=i=>{const t=parseInt(document.getElementById("detailQty").value);if(!e.currentUser){u("Please login to shop"),h("login");return}const r=e.products.find(o=>o.id===i),s=e.cart.find(o=>o.id===i);s?s.quantity+=t:e.cart.push({...r,quantity:t}),p(),u(`Added ${t} item(s) to cart`)};window.addToCart=i=>{if(!e.currentUser){u("Please login to shop"),h("login");return}const t=e.products.find(s=>s.id===i),r=e.cart.find(s=>s.id===i);r?r.quantity+=1:e.cart.push({...t,quantity:1}),p(),g(),u("Added to cart")};window.updateQuantity=(i,t)=>{if(t<1){window.removeFromCart(i);return}const r=e.cart.find(s=>s.id===i);r&&(r.quantity=t,p(),g())};window.removeFromCart=i=>{e.cart=e.cart.filter(t=>t.id!==i),p(),g()};window.checkout=()=>{if(e.cart.length===0)return;const i={id:`ORD-${Date.now().toString().slice(-6)}`,userId:e.currentUser.id,date:new Date().toISOString().split("T")[0],total:e.cart.reduce((t,r)=>t+r.price*r.quantity,0),status:"Completed",items:e.cart.map(t=>({productId:t.id,quantity:t.quantity}))};e.orders.unshift(i),e.cart=[],p(),u("Order placed successfully!"),h("home")};window.handleSearchInput=i=>{const t=i.target.value;if(e.searchQuery=t,t.trim()){const r=new Set;e.products.forEach(s=>{const o=s.name.toLowerCase(),n=s.category.toLowerCase(),l=t.toLowerCase();o.includes(l)&&r.add(s.name),n.includes(l)&&r.add(s.category),o.split(" ").forEach(m=>{m.toLowerCase().startsWith(l)&&m.length>2&&r.add(m.charAt(0).toUpperCase()+m.slice(1))})}),e.searchSuggestions=Array.from(r).slice(0,8),e.showSuggestions=!0}else if(e.searchSuggestions=[],e.showSuggestions=!1,e.route==="home"||e.route==="products"){g();return}b()};function b(){const i=document.querySelector(".search-container");if(!i)return;const t=i.querySelector(".search-suggestions");if(t&&t.remove(),e.showSuggestions&&e.searchQuery){const r=`
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
        `;i.insertAdjacentHTML("beforeend",r)}}window.showSearchSuggestions=()=>{e.searchQuery&&(e.showSuggestions=!0,b())};window.selectSuggestion=i=>{e.searchQuery=i,e.showSuggestions=!1;const t=document.getElementById("searchInput");t&&(t.value=i),handleSearch()};window.handleSearch=()=>{e.showSuggestions=!1;const i=document.getElementById("searchInput");i&&(e.searchQuery=i.value.trim()),h("products"),setTimeout(()=>{const t=document.querySelector(".product-grid");t&&t.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{e.searchQuery="",e.showSuggestions=!1,e.searchSuggestions=[],g()};document.addEventListener("click",i=>{if(!i.target.closest(".search-container")&&e.showSuggestions){e.showSuggestions=!1;const t=document.querySelector(".search-suggestions");t&&t.remove()}});window.handleLogin=i=>{i.preventDefault();const t=i.target.email.value,r=i.target.password.value,s=e.users.find(o=>o.email===t&&o.password===r);s?(e.currentUser=s,p(),u(`Welcome back, ${s.name}`),h(s.role==="admin"?"admin":"home")):u("Invalid credentials")};window.handleSignup=i=>{i.preventDefault();const t=i.target.name.value,r=i.target.email.value,s=i.target.password.value;if(e.users.find(n=>n.email===r)){u("Email already exists");return}const o={id:e.users.length+1,name:t,email:r,password:s,role:"customer"};e.users.push(o),e.currentUser=o,p(),u("Account created successfully"),h("home")};window.logout=()=>{e.currentUser=null,e.cart=[],p(),h("home")};window.deleteProduct=i=>{confirm("Are you sure you want to remove this product?")&&(e.products=e.products.filter(t=>t.id!==i),p(),g(),u("Product removed"))};const g=()=>{const i=document.getElementById("app");let t="";switch(e.route){case"home":t=f();break;case"products":t=I();break;case"product-detail":t=L();break;case"login":t=D();break;case"signup":t=A();break;case"cart":t=B();break;case"admin":t=M();break;default:t=f()}i.innerHTML=`
        ${P()}
        <main>
            ${t}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `};window.handleCartSearch=i=>{e.cartSearchQuery=i.target.value,w()};window.clearCartSearch=()=>{e.cartSearchQuery="",w()};window.toggleCartItem=i=>{const t=e.cart.find(r=>r.id===i);t&&(t.selected=t.selected===!1,p(),w())};window.toggleFindSimilar=i=>{const t=e.cart.find(r=>r.id===i);t&&(e.cart.forEach(r=>{r.id!==i&&(r.showSimilar=!1)}),t.showSimilar=!t.showSimilar,p(),w())};function w(){const i=document.querySelector(".cart-items"),t=document.querySelector(".cart-summary"),r=document.querySelector(".cart-search-message");if(!i)return;let s=e.cart;if(e.cartSearchQuery&&(s=e.cart.filter(n=>n.name.toLowerCase().includes(e.cartSearchQuery.toLowerCase())||n.category.toLowerCase().includes(e.cartSearchQuery.toLowerCase()))),i.innerHTML=s.map(n=>{const l=e.products.filter(c=>c.category===n.category&&c.id!==n.id).slice(0,4);return`
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
                    <p class="text-muted">${d(n.price)}</p>
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
                ${l.length>0?`
                    <div class="similar-products-grid">
                        ${l.map(c=>`
                            <div class="similar-product-card" onclick="window.viewProduct(${c.id})">
                                <img src="${c.image}" alt="${c.name}" class="similar-product-image">
                                <div class="similar-product-title" title="${c.name}">${c.name}</div>
                                <div class="similar-product-price">${d(c.price)}</div>
                            </div>
                        `).join("")}
                    </div>
                `:'<p class="text-muted text-center">No similar products found.</p>'}
            </div>
        </div>
    `}).join(""),t){const n=e.cart.reduce((c,m)=>c+(m.selected!==!1?m.price*m.quantity:0),0),l=e.cart.filter(c=>c.selected!==!1).length;t.innerHTML=`
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${d(n)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${l})
            </button>
        `}r&&(e.cartSearchQuery&&s.length===0?(r.innerHTML=`
                <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                    No items found for "${e.cartSearchQuery}"
                </p>
            `,r.style.display="block"):r.style.display="none");const o=document.querySelector("#cartSearchInput + .search-btn");o&&(o.innerHTML=e.cartSearchQuery?`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `:`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `)}g();
