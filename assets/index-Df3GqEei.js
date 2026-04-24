(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const k=[{id:1,name:"ESP32 Development Board (Type-C)",category:"Microcontrollers",price:350,image:"images/products/esp32.png",stock:45,description:"Type C ESP32 Development Board with 30/38 pins. Supported interfaces: UART, SPI, SDIO, I2C, PWM, I2S, IR, ADC, DAC. Perfect for IoT projects."},{id:2,name:"Ultrasonic Sensor HC-SR04",category:"Sensors",price:89,image:"images/products/hc-sr04.png",stock:120,description:"Popular and cost-effective module used for non-contact distance measurement. Works by emitting ultrasonic waves."},{id:3,name:"L298N DC Motor Driver Module",category:"Motor Drivers",price:75,image:"images/products/l298n.png",stock:67,description:"Dual H-Bridge Motor Driver Module. High voltage, dual H-bridge manufactured by ST company. Perfect for controlling DC motors and stepper motors."},{id:4,name:"40-Pin Jumper Wires (10cm)",category:"Cables & Wires",price:25,image:"images/products/jumper-wires.png",stock:200,description:"Essential tools for breadboarding and prototyping. 40-pin jumper wires allow easy connections between components."},{id:5,name:"Breadboard 830 Points",category:"Prototyping",price:99,image:"images/products/breadboard.png",stock:85,description:"Solderless breadboard SYB-MB102 with 830 tie points. Completely reusable, perfect for creating temporary circuits without soldering."},{id:6,name:"SG90 Micro Servo Motor (9g)",category:"Motors & Actuators",price:95,image:"images/products/sg90.png",stock:150,description:"SG92R/SG90 Micro Servo with nylon carbon fiber gears. Stall Torque: 2.5kg/cm at 4.8V. Perfect for RC models and robotics."},{id:7,name:"Tower Pro MG996R Servo Motor",category:"Motors & Actuators",price:275,image:"images/products/mg996r.png",stock:42,description:"Digital servo motor with 180° rotation. High torque for robotics applications. Metal gears for durability."},{id:8,name:"1-4 Channel 5V Relay Module",category:"Relays & Switches",price:125,image:"images/products/relay.png",stock:95,description:"5V/12V 10A relay module with optocoupler. Compatible with Arduino, Orange Pi, and Raspberry Pi (use 5V version)."},{id:9,name:"LM2596S DC-DC Buck Converter",category:"Power Supply",price:45,image:"images/products/buck-converter.png",stock:78,description:"Step-down voltage regulator module. Adjustable output voltage. Perfect for powering projects with different voltage requirements."},{id:10,name:"IR Proximity Sensor",category:"Sensors",price:35,image:"images/products/ir-sensor.png",stock:110,description:"Multipurpose infrared sensor for obstacle sensing, color detection, and line following applications."},{id:11,name:"18650 Battery Holder (1S/2S/3S)",category:"Batteries & Holders",price:35,image:"images/products/battery-holder.png",stock:140,description:"Series battery holder for 18650 cells with wire. Available in 1, 2, or 3 cell configurations for various voltage requirements."},{id:12,name:"PKCELL 18650 3.7V Battery (3000mAh)",category:"Batteries & Holders",price:175,image:"images/products/battery-18650.png",stock:88,description:"True rated lithium-ion 18650 battery. Available in 2200mAh, 3000mAh, 3350mAh capacities. Perfect for power banks and flashlights."},{id:13,name:"USB Cable for Arduino Nano/Uno",category:"Cables & Wires",price:25,image:"images/products/usb-cable.png",stock:165,description:"25cm Mini USB cable for Arduino Nano or Uno/Mega boards. Blue color, quality connectors."},{id:14,name:"FR4 Universal PCB Board (Double-Sided)",category:"Prototyping",price:55,image:"images/products/pcb-board.png",stock:95,description:"Fiberglass universal protoboard, more durable than phenolic paper PCB. Double-sided for complex circuits."},{id:15,name:"SanDisk MicroSD Card (16GB-256GB)",category:"Storage",price:299,image:"images/products/microsd.png",stock:75,description:"SanDisk Ultra Class 10 memory card for Raspberry Pi and phones. Fast transfer speeds. Available in multiple capacities."},{id:16,name:"eSUN PLA+ 3D Printer Filament (1.75mm, 1kg)",category:"3D Printing",price:799,image:"images/products/esun-pla-plus.png",stock:55,description:"Environmentally friendly PLA+ filament with smooth surface finish. Easy to print with excellent layer adhesion."},{id:17,name:"eSUN PETG Filament (1.75mm, 1kg)",category:"3D Printing",price:1099,image:"images/products/esun-petg.png",stock:48,description:"High-performance PETG filament combining ABS strength with PLA ease of printing. Excellent durability."},{id:18,name:"Polymaker Matte PLA Filament",category:"3D Printing",price:1350,image:"images/products/polymaker-matte.png",stock:35,description:"Panchroma™ Matte bioplastic 3D printing filament. Next generation matte finish for stunning prints."},{id:19,name:"ELEGOO PLA Filament (1.75mm, 1kg)",category:"3D Printing",price:749,image:"images/products/elegoo-pla.png",stock:62,description:"High-quality PLA with lower melting temperature. Easy to use, multiple color options available."},{id:20,name:"Bambu Lab PLA Basic Filament (1kg)",category:"3D Printing",price:999,image:"images/products/bambu-lab.png",stock:40,description:"Easy to print, beginner-friendly PLA with smooth surface finish. Biodegradable and reliable quality."}],S=[{id:1,name:"Admin User",email:"adminlumina",password:"lumina12",role:"admin"},{id:2,name:"John Doe",email:"userlumina",password:"lumina123",role:"customer"}],x=[{id:"ORD-001",userId:2,date:"2023-10-25",total:1598,status:"Completed",items:[{productId:1,quantity:1},{productId:2,quantity:1}]}],e={products:JSON.parse(localStorage.getItem("products_v2"))||k,users:JSON.parse(localStorage.getItem("users_v2"))||S,orders:JSON.parse(localStorage.getItem("orders"))||x,currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:"home",searchQuery:"",showSuggestions:!1,searchSuggestions:[]},u=()=>{localStorage.setItem("products_v2",JSON.stringify(e.products)),localStorage.setItem("users_v2",JSON.stringify(e.users)),localStorage.setItem("orders",JSON.stringify(e.orders)),localStorage.setItem("currentUser",JSON.stringify(e.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(e.cart))},d=s=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(s),l=s=>{const t=document.createElement("div");t.className="toast",t.textContent=s,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3e3)},g=s=>{e.route=s,m(),window.scrollTo(0,0)},$=()=>{const s=e.cart.reduce((a,o)=>a+o.quantity,0),t=!!e.currentUser,i=e.currentUser?.role==="admin";return`
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

                <div class="nav-actions">
                    ${i?"":`
                    <a href="#" class="action-icon" onclick="window.navigate('cart'); return false;">
                        <div style="position: relative;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            ${s>0?`<span class="cart-count">${s}</span>`:""}
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
    `},v=s=>{const t=s.stock<10;return`
        <div class="product-card">
            <div class="product-badge ${t?"low-stock":""}">${t?"Low Stock":"In Stock"}</div>
            <div class="product-image">
                <img src="${s.image}" alt="${s.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${s.category}</div>
                <h3 class="product-title">${s.name}</h3>
                <div class="product-price">${d(s.price)}</div>
                <button class="add-btn" onclick="window.addToCart(${s.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},y=()=>{if(e.searchQuery){const i=e.products.filter(a=>a.name.toLowerCase().includes(e.searchQuery.toLowerCase())||a.category.toLowerCase().includes(e.searchQuery.toLowerCase())||a.description.toLowerCase().includes(e.searchQuery.toLowerCase()));return`
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
                        ${i.map(v).join("")}
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
                ${e.products.filter(i=>s.includes(i.id)).sort((i,a)=>s.indexOf(i.id)-s.indexOf(a.id)).map(v).join("")}
            </div>
        </div>
    `},P=()=>`
        <div style="padding: 2rem 0;">
            <div class="section-title">
                <h2>All Products</h2>
            </div>
            <div class="product-grid">
                ${e.products.map(v).join("")}
            </div>
        </div>
    `,C=()=>`
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
    `,L=()=>`
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
    `,M=()=>{if(e.cart.length===0)return`
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('home')">Start Shopping</button>
            </div>
        `;const s=e.cart.reduce((t,i)=>t+i.price*i.quantity,0);return`
        <div class="cart-container">
            <h2 class="mb-4">Shopping Cart</h2>
            <div class="cart-items">
                ${e.cart.map(t=>`
                    <div class="cart-item">
                        <img src="${t.image}" alt="${t.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                        <div style="flex: 1;">
                            <h3 style="font-size: 1rem;">${t.name}</h3>
                            <p class="text-muted">${d(t.price)}</p>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${t.id}, ${t.quantity-1})">-</button>
                            <span>${t.quantity}</span>
                            <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${t.id}, ${t.quantity+1})">+</button>
                        </div>
                        <button class="btn btn-ghost" style="color: var(--danger);" onclick="window.removeFromCart(${t.id})">Remove</button>
                    </div>
                `).join("")}
            </div>
            <div class="cart-summary">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                    <span>Total</span>
                    <span>${d(s)}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `},A=()=>{if(!e.currentUser||e.currentUser.role!=="admin")return g("home"),"";const s=e.orders.reduce((r,p)=>r+p.total,0),t=e.orders.length,i=e.products.length,a=e.users.filter(r=>r.role==="customer").length,o=e.products.filter(r=>r.stock<10),n=e.products.filter(r=>r.stock===0),c=e.orders.slice(0,5),w=t>0?s/t:0,h=e.products.reduce((r,p)=>r+p.price*p.stock,0);return`
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
                        <div class="metric-value">${d(s)}</div>
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
                        <div class="metric-value">${t}</div>
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
                        <div class="metric-value">${a}</div>
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
                        <div class="metric-value">${d(w)}</div>
                        <div class="metric-change positive">+5.2% increase</div>
                    </div>
                </div>
            </div>

            <!-- Alerts & Inventory Status -->
            <div class="admin-row">
                <div class="admin-section alert-section">
                    <div class="section-header">
                        <h3>⚠️ Inventory Alerts</h3>
                        <span class="badge badge-warning">${o.length+n.length}</span>
                    </div>
                    <div class="alert-list">
                        ${n.length>0?`
                            <div class="alert-item critical">
                                <div class="alert-icon">🔴</div>
                                <div class="alert-content">
                                    <div class="alert-title">Out of Stock</div>
                                    <div class="alert-desc">${n.length} product(s) need restocking</div>
                                </div>
                            </div>
                        `:""}
                        ${o.length>0?`
                            <div class="alert-item warning">
                                <div class="alert-icon">⚠️</div>
                                <div class="alert-content">
                                    <div class="alert-title">Low Stock Alert</div>
                                    <div class="alert-desc">${o.length} product(s) running low (< 10 units)</div>
                                </div>
                            </div>
                        `:""}
                        ${o.length===0&&n.length===0?`
                            <div class="alert-item success">
                                <div class="alert-icon">✅</div>
                                <div class="alert-content">
                                    <div class="alert-title">All Good!</div>
                                    <div class="alert-desc">No inventory issues detected</div>
                                </div>
                            </div>
                        `:""}
                        <div class="alert-item info">
                            <div class="alert-icon">📦</div>
                            <div class="alert-content">
                                <div class="alert-title">Inventory Value</div>
                                <div class="alert-desc">${d(h)} total stock value</div>
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
                            <span class="stat-number">${i}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Categories</span>
                            <span class="stat-number">${[...new Set(e.products.map(r=>r.category))].length}</span>
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
                    <span class="text-muted">${c.length} orders</span>
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
                            ${c.length>0?c.map(r=>{const p=e.users.find(b=>b.id===r.userId);return`
                                    <tr>
                                        <td><strong>${r.id}</strong></td>
                                        <td>${r.date}</td>
                                        <td>${p?p.name:"Unknown"}</td>
                                        <td>${r.items.length} items</td>
                                        <td><strong>${d(r.total)}</strong></td>
                                        <td><span class="badge badge-success">${r.status}</span></td>
                                    </tr>
                                `}).join(""):'<tr><td colspan="6" class="text-center text-muted">No orders yet</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Low Stock Products -->
            ${o.length>0?`
                <div class="admin-section">
                    <div class="section-header">
                        <h3>📉 Low Stock Products</h3>
                        <span class="badge badge-warning">${o.length}</span>
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
                                ${o.map(r=>`
                                    <tr>
                                        <td>
                                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                                <img src="${r.image}" style="width: 32px; height: 32px; object-fit: contain; background: #f1f5f9; border-radius: 4px;">
                                                <span>${r.name}</span>
                                            </div>
                                        </td>
                                        <td>${r.category}</td>
                                        <td>
                                            <span class="badge ${r.stock===0?"badge-danger":"badge-warning"}">
                                                ${r.stock} units
                                            </span>
                                        </td>
                                        <td>${d(r.price)}</td>
                                        <td>
                                            <button class="btn-small btn-accent" onclick="window.showToast('Restocking ${r.name}...')">
                                                Restock
                                            </button>
                                        </td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            `:""}

            <!-- All Products Inventory -->
            <div class="admin-section">
                <div class="section-header">
                    <h3>📦 Full Inventory</h3>
                    <span class="text-muted">${i} products</span>
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
                            ${e.products.map(r=>`
                                <tr>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${r.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${r.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${r.category}</span></td>
                                    <td>${d(r.price)}</td>
                                    <td>
                                        <span class="stock-badge ${r.stock<10?"low":""} ${r.stock===0?"out":""}">
                                            ${r.stock}
                                        </span>
                                    </td>
                                    <td>${d(r.price*r.stock)}</td>
                                    <td>
                                        <button class="btn-icon" onclick="window.showToast('Editing ${r.name}...')" title="Edit">
                                            ✏️
                                        </button>
                                        <button class="btn-icon danger" onclick="window.deleteProduct(${r.id})" title="Delete">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `};window.navigate=g;window.addToCart=s=>{if(!e.currentUser){l("Please login to shop"),g("login");return}const t=e.products.find(a=>a.id===s),i=e.cart.find(a=>a.id===s);i?i.quantity+=1:e.cart.push({...t,quantity:1}),u(),m(),l("Added to cart")};window.updateQuantity=(s,t)=>{if(t<1){window.removeFromCart(s);return}const i=e.cart.find(a=>a.id===s);i&&(i.quantity=t,u(),m())};window.removeFromCart=s=>{e.cart=e.cart.filter(t=>t.id!==s),u(),m()};window.checkout=()=>{if(e.cart.length===0)return;const s={id:`ORD-${Date.now().toString().slice(-6)}`,userId:e.currentUser.id,date:new Date().toISOString().split("T")[0],total:e.cart.reduce((t,i)=>t+i.price*i.quantity,0),status:"Completed",items:e.cart.map(t=>({productId:t.id,quantity:t.quantity}))};e.orders.unshift(s),e.cart=[],u(),l("Order placed successfully!"),g("home")};window.handleSearchInput=s=>{const t=s.target.value;if(e.searchQuery=t,t.trim()){const i=new Set;e.products.forEach(a=>{const o=a.name.toLowerCase(),n=a.category.toLowerCase(),c=t.toLowerCase();o.includes(c)&&i.add(a.name),n.includes(c)&&i.add(a.category),o.split(" ").forEach(h=>{h.toLowerCase().startsWith(c)&&h.length>2&&i.add(h.charAt(0).toUpperCase()+h.slice(1))})}),e.searchSuggestions=Array.from(i).slice(0,8),e.showSuggestions=!0}else e.searchSuggestions=[],e.showSuggestions=!1;f()};function f(){const s=document.querySelector(".search-container");if(!s)return;const t=s.querySelector(".search-suggestions");if(t&&t.remove(),e.showSuggestions&&e.searchQuery){const i=`
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
        `;s.insertAdjacentHTML("beforeend",i)}}window.showSearchSuggestions=()=>{e.searchQuery&&(e.showSuggestions=!0,f())};window.selectSuggestion=s=>{e.searchQuery=s,e.showSuggestions=!1;const t=document.getElementById("searchInput");t&&(t.value=s),handleSearch()};window.handleSearch=()=>{e.showSuggestions=!1;const s=document.getElementById("searchInput");s&&(e.searchQuery=s.value.trim()),g("home"),setTimeout(()=>{const t=document.querySelector(".product-grid");t&&t.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{e.searchQuery="",e.showSuggestions=!1,e.searchSuggestions=[],m()};document.addEventListener("click",s=>{if(!s.target.closest(".search-container")&&e.showSuggestions){e.showSuggestions=!1;const t=document.querySelector(".search-suggestions");t&&t.remove()}});window.handleLogin=s=>{s.preventDefault();const t=s.target.email.value,i=s.target.password.value,a=e.users.find(o=>o.email===t&&o.password===i);a?(e.currentUser=a,u(),l(`Welcome back, ${a.name}`),g(a.role==="admin"?"admin":"home")):l("Invalid credentials")};window.handleSignup=s=>{s.preventDefault();const t=s.target.name.value,i=s.target.email.value,a=s.target.password.value;if(e.users.find(n=>n.email===i)){l("Email already exists");return}const o={id:e.users.length+1,name:t,email:i,password:a,role:"customer"};e.users.push(o),e.currentUser=o,u(),l("Account created successfully"),g("home")};window.logout=()=>{e.currentUser=null,e.cart=[],u(),g("home")};window.deleteProduct=s=>{confirm("Are you sure you want to remove this product?")&&(e.products=e.products.filter(t=>t.id!==s),u(),m(),l("Product removed"))};const m=()=>{const s=document.getElementById("app");let t="";switch(e.route){case"home":t=y();break;case"products":t=P();break;case"login":t=C();break;case"signup":t=L();break;case"cart":t=M();break;case"admin":t=A();break;default:t=y()}s.innerHTML=`
        ${$()}
        <main>
            ${t}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `};m();
