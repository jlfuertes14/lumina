(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function o(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=o(a);fetch(a.href,i)}})();const v=[{id:1,name:"ESP32 Development Board (Type-C)",category:"Microcontrollers",price:350,image:"images/products/esp32.png",stock:45,description:"Type C ESP32 Development Board with 30/38 pins. Supported interfaces: UART, SPI, SDIO, I2C, PWM, I2S, IR, ADC, DAC. Perfect for IoT projects."},{id:2,name:"Ultrasonic Sensor HC-SR04",category:"Sensors",price:89,image:"images/products/hc-sr04.png",stock:120,description:"Popular and cost-effective module used for non-contact distance measurement. Works by emitting ultrasonic waves."},{id:3,name:"L298N DC Motor Driver Module",category:"Motor Drivers",price:75,image:"images/products/l298n.png",stock:67,description:"Dual H-Bridge Motor Driver Module. High voltage, dual H-bridge manufactured by ST company. Perfect for controlling DC motors and stepper motors."},{id:4,name:"40-Pin Jumper Wires (10cm)",category:"Cables & Wires",price:25,image:"images/products/jumper-wires.png",stock:200,description:"Essential tools for breadboarding and prototyping. 40-pin jumper wires allow easy connections between components."},{id:5,name:"Breadboard 830 Points",category:"Prototyping",price:99,image:"images/products/breadboard.png",stock:85,description:"Solderless breadboard SYB-MB102 with 830 tie points. Completely reusable, perfect for creating temporary circuits without soldering."},{id:6,name:"SG90 Micro Servo Motor (9g)",category:"Motors & Actuators",price:95,image:"images/products/sg90.png",stock:150,description:"SG92R/SG90 Micro Servo with nylon carbon fiber gears. Stall Torque: 2.5kg/cm at 4.8V. Perfect for RC models and robotics."},{id:7,name:"Tower Pro MG996R Servo Motor",category:"Motors & Actuators",price:275,image:"images/products/mg996r.png",stock:42,description:"Digital servo motor with 180° rotation. High torque for robotics applications. Metal gears for durability."},{id:8,name:"1-4 Channel 5V Relay Module",category:"Relays & Switches",price:125,image:"images/products/relay.png",stock:95,description:"5V/12V 10A relay module with optocoupler. Compatible with Arduino, Orange Pi, and Raspberry Pi (use 5V version)."},{id:9,name:"LM2596S DC-DC Buck Converter",category:"Power Supply",price:45,image:"images/products/buck-converter.png",stock:78,description:"Step-down voltage regulator module. Adjustable output voltage. Perfect for powering projects with different voltage requirements."},{id:10,name:"IR Proximity Sensor",category:"Sensors",price:35,image:"images/products/ir-sensor.png",stock:110,description:"Multipurpose infrared sensor for obstacle sensing, color detection, and line following applications."},{id:11,name:"18650 Battery Holder (1S/2S/3S)",category:"Batteries & Holders",price:35,image:"images/products/battery-holder.png",stock:140,description:"Series battery holder for 18650 cells with wire. Available in 1, 2, or 3 cell configurations for various voltage requirements."},{id:12,name:"PKCELL 18650 3.7V Battery (3000mAh)",category:"Batteries & Holders",price:175,image:"images/products/battery-18650.png",stock:88,description:"True rated lithium-ion 18650 battery. Available in 2200mAh, 3000mAh, 3350mAh capacities. Perfect for power banks and flashlights."},{id:13,name:"USB Cable for Arduino Nano/Uno",category:"Cables & Wires",price:25,image:"images/products/usb-cable.png",stock:165,description:"25cm Mini USB cable for Arduino Nano or Uno/Mega boards. Blue color, quality connectors."},{id:14,name:"FR4 Universal PCB Board (Double-Sided)",category:"Prototyping",price:55,image:"images/products/pcb-board.png",stock:95,description:"Fiberglass universal protoboard, more durable than phenolic paper PCB. Double-sided for complex circuits."},{id:15,name:"SanDisk MicroSD Card (16GB-256GB)",category:"Storage",price:299,image:"images/products/microsd.png",stock:75,description:"SanDisk Ultra Class 10 memory card for Raspberry Pi and phones. Fast transfer speeds. Available in multiple capacities."},{id:16,name:"eSUN PLA+ 3D Printer Filament (1.75mm, 1kg)",category:"3D Printing",price:799,image:"images/products/esun-pla-plus.png",stock:55,description:"Environmentally friendly PLA+ filament with smooth surface finish. Easy to print with excellent layer adhesion."},{id:17,name:"eSUN PETG Filament (1.75mm, 1kg)",category:"3D Printing",price:1099,image:"images/products/esun-petg.png",stock:48,description:"High-performance PETG filament combining ABS strength with PLA ease of printing. Excellent durability."},{id:18,name:"Polymaker Matte PLA Filament",category:"3D Printing",price:1350,image:"images/products/polymaker-matte.png",stock:35,description:"Panchroma™ Matte bioplastic 3D printing filament. Next generation matte finish for stunning prints."},{id:19,name:"ELEGOO PLA Filament (1.75mm, 1kg)",category:"3D Printing",price:749,image:"images/products/elegoo-pla.png",stock:62,description:"High-quality PLA with lower melting temperature. Easy to use, multiple color options available."},{id:20,name:"Bambu Lab PLA Basic Filament (1kg)",category:"3D Printing",price:999,image:"images/products/bambu-lab.png",stock:40,description:"Easy to print, beginner-friendly PLA with smooth surface finish. Biodegradable and reliable quality."}],y=[{id:1,name:"Admin User",email:"adminlumina",password:"lumina12",role:"admin"},{id:2,name:"John Doe",email:"userlumina",password:"lumina123",role:"customer"}],w=[{id:"ORD-001",userId:2,date:"2023-10-25",total:1598,status:"Completed",items:[{productId:1,quantity:1},{productId:2,quantity:1}]}],e={products:JSON.parse(localStorage.getItem("products_v2"))||v,users:JSON.parse(localStorage.getItem("users_v2"))||y,orders:JSON.parse(localStorage.getItem("orders"))||w,currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:"home",searchQuery:"",showSuggestions:!1,searchSuggestions:[]},c=()=>{localStorage.setItem("products_v2",JSON.stringify(e.products)),localStorage.setItem("users_v2",JSON.stringify(e.users)),localStorage.setItem("orders",JSON.stringify(e.orders)),localStorage.setItem("currentUser",JSON.stringify(e.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(e.cart))},g=r=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(r),n=r=>{const t=document.createElement("div");t.className="toast",t.textContent=r,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3e3)},l=r=>{e.route=r,u(),window.scrollTo(0,0)},f=()=>{const r=e.cart.reduce((s,a)=>s+a.quantity,0),t=!!e.currentUser,o=e.currentUser?.role==="admin";return`
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
                        `:""}
                    </div>
                </div>

                <div class="nav-actions">
                    ${o?"":`
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
                <a href="#" class="nav-link">Products</a>
                <a href="#" class="nav-link">Brands</a>
                <a href="#" class="nav-link">Deals</a>
                <a href="#" class="nav-link">Support</a>
                ${o?`<a href="#" class="nav-link ${e.route==="admin"?"active":""}" onclick="window.navigate('admin'); return false;">Admin Dashboard</a>`:""}
            </nav>
        </header>
    `},b=r=>{const t=r.stock<10;return`
        <div class="product-card">
            <div class="product-badge ${t?"low-stock":""}">${t?"Low Stock":"In Stock"}</div>
            <div class="product-image">
                <img src="${r.image}" alt="${r.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${r.category}</div>
                <h3 class="product-title">${r.name}</h3>
                <div class="product-price">${g(r.price)}</div>
                <button class="add-btn" onclick="window.addToCart(${r.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},m=()=>{const r=e.searchQuery?e.products.filter(o=>o.name.toLowerCase().includes(e.searchQuery.toLowerCase())||o.category.toLowerCase().includes(e.searchQuery.toLowerCase())||o.description.toLowerCase().includes(e.searchQuery.toLowerCase())):e.products,t=e.searchQuery?`<p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${r.length} result${r.length!==1?"s":""} for "${e.searchQuery}"</p>`:"";return`
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
                <h2>${e.searchQuery?"Search Results":"Featured Components"}</h2>
                ${e.searchQuery?"":'<a href="#" style="font-size: 0.9rem; color: var(--primary); font-weight: 600;">View All Products &rarr;</a>'}
            </div>
            ${t}
            ${r.length>0?`
                <div class="product-grid">
                    ${r.map(b).join("")}
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
    `},S=()=>`
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
    `,k=()=>`
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
    `,x=()=>{if(e.cart.length===0)return`
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('home')">Start Shopping</button>
            </div>
        `;const r=e.cart.reduce((t,o)=>t+o.price*o.quantity,0);return`
        <div class="cart-container">
            <h2 class="mb-4">Shopping Cart</h2>
            <div class="cart-items">
                ${e.cart.map(t=>`
                    <div class="cart-item">
                        <img src="${t.image}" alt="${t.name}" style="width: 80px; height: 80px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                        <div style="flex: 1;">
                            <h3 style="font-size: 1rem;">${t.name}</h3>
                            <p class="text-muted">${g(t.price)}</p>
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
                    <span>${g(r)}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `},P=()=>{if(!e.currentUser||e.currentUser.role!=="admin")return l("home"),"";const r=e.orders.reduce((s,a)=>s+a.total,0),t=e.orders.length,o=e.products.length;return`
        <div>
            <h2 class="mb-4">Admin Dashboard</h2>
            
            <div class="dashboard-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Sales</div>
                    <div class="stat-value">${g(r)}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Orders</div>
                    <div class="stat-value">${t}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Products in Stock</div>
                    <div class="stat-value">${o}</div>
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
                    ${e.products.map(s=>`
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <img src="${s.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 4px;">
                                    ${s.name}
                                </div>
                            </td>
                            <td>${s.category}</td>
                            <td>${g(s.price)}</td>
                            <td>${s.stock}</td>
                            <td>
                                <button class="btn btn-ghost" style="color: var(--danger)" onclick="window.deleteProduct(${s.id})">Delete</button>
                            </td>
                        </tr>
                    `).join("")}
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
                    ${e.orders.map(s=>`
                        <tr>
                            <td>${s.id}</td>
                            <td>${s.date}</td>
                            <td>${s.userId}</td>
                            <td>${g(s.total)}</td>
                            <td><span class="badge badge-success">${s.status}</span></td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `};window.navigate=l;window.addToCart=r=>{if(!e.currentUser){n("Please login to shop"),l("login");return}const t=e.products.find(s=>s.id===r),o=e.cart.find(s=>s.id===r);o?o.quantity+=1:e.cart.push({...t,quantity:1}),c(),u(),n("Added to cart")};window.updateQuantity=(r,t)=>{if(t<1){window.removeFromCart(r);return}const o=e.cart.find(s=>s.id===r);o&&(o.quantity=t,c(),u())};window.removeFromCart=r=>{e.cart=e.cart.filter(t=>t.id!==r),c(),u()};window.checkout=()=>{if(e.cart.length===0)return;const r={id:`ORD-${Date.now().toString().slice(-6)}`,userId:e.currentUser.id,date:new Date().toISOString().split("T")[0],total:e.cart.reduce((t,o)=>t+o.price*o.quantity,0),status:"Completed",items:e.cart.map(t=>({productId:t.id,quantity:t.quantity}))};e.orders.unshift(r),e.cart=[],c(),n("Order placed successfully!"),l("home")};window.handleSearchInput=r=>{const t=r.target.value;if(e.searchQuery=t,t.trim()){const o=new Set;e.products.forEach(s=>{const a=s.name.toLowerCase(),i=s.category.toLowerCase(),d=t.toLowerCase();a.includes(d)&&o.add(s.name),i.includes(d)&&o.add(s.category),a.split(" ").forEach(p=>{p.toLowerCase().startsWith(d)&&p.length>2&&o.add(p.charAt(0).toUpperCase()+p.slice(1))})}),e.searchSuggestions=Array.from(o).slice(0,8),e.showSuggestions=!0}else e.searchSuggestions=[],e.showSuggestions=!1;h()};function h(){const r=document.querySelector(".search-container");if(!r)return;const t=r.querySelector(".search-suggestions");if(t&&t.remove(),e.showSuggestions&&e.searchQuery){const o=`
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
        `;r.insertAdjacentHTML("beforeend",o)}}window.showSearchSuggestions=()=>{e.searchQuery&&(e.showSuggestions=!0,h())};window.selectSuggestion=r=>{e.searchQuery=r,e.showSuggestions=!1;const t=document.getElementById("searchInput");t&&(t.value=r),handleSearch()};window.handleSearch=()=>{e.showSuggestions=!1;const r=document.getElementById("searchInput");r&&(e.searchQuery=r.value.trim()),l("home"),setTimeout(()=>{const t=document.querySelector(".product-grid");t&&t.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{e.searchQuery="",e.showSuggestions=!1,e.searchSuggestions=[],u()};document.addEventListener("click",r=>{if(!r.target.closest(".search-container")&&e.showSuggestions){e.showSuggestions=!1;const t=document.querySelector(".search-suggestions");t&&t.remove()}});window.handleLogin=r=>{r.preventDefault();const t=r.target.email.value,o=r.target.password.value,s=e.users.find(a=>a.email===t&&a.password===o);s?(e.currentUser=s,c(),n(`Welcome back, ${s.name}`),l(s.role==="admin"?"admin":"home")):n("Invalid credentials")};window.handleSignup=r=>{r.preventDefault();const t=r.target.name.value,o=r.target.email.value,s=r.target.password.value;if(e.users.find(i=>i.email===o)){n("Email already exists");return}const a={id:e.users.length+1,name:t,email:o,password:s,role:"customer"};e.users.push(a),e.currentUser=a,c(),n("Account created successfully"),l("home")};window.logout=()=>{e.currentUser=null,e.cart=[],c(),l("home")};window.deleteProduct=r=>{confirm("Are you sure you want to remove this product?")&&(e.products=e.products.filter(t=>t.id!==r),c(),u(),n("Product removed"))};const u=()=>{const r=document.getElementById("app");let t="";switch(e.route){case"home":t=m();break;case"login":t=S();break;case"signup":t=k();break;case"cart":t=x();break;case"admin":t=P();break;default:t=m()}r.innerHTML=`
        ${f()}
        <main>
            ${t}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `};u();
