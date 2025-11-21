(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();const h=[{id:1,name:"ESP32 Development Board (Type-C)",category:"Microcontrollers",price:8.99,image:"https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=800&auto=format&fit=crop&q=60",stock:45,description:"Type C ESP32 Development Board with 30/38 pins. Supported interfaces: UART, SPI, SDIO, I2C, PWM, I2S, IR, ADC, DAC. Perfect for IoT projects."},{id:2,name:"Ultrasonic Sensor HC-SR04",category:"Sensors",price:3.5,image:"https://images.unsplash.com/photo-1625314897518-bb4fe6e95229?w=800&auto=format&fit=crop&q=60",stock:120,description:"Popular and cost-effective module used for non-contact distance measurement. Works by emitting ultrasonic waves."},{id:3,name:"L298N DC Motor Driver Module",category:"Motor Drivers",price:5.99,image:"https://plus.unsplash.com/premium_photo-1677103216857-4b726262846c?w=800&auto=format&fit=crop&q=60",stock:67,description:"Dual H-Bridge Motor Driver Module. High voltage, dual H-bridge manufactured by ST company. Perfect for controlling DC motors and stepper motors."},{id:4,name:"40-Pin Jumper Wires (10cm)",category:"Cables & Wires",price:2.5,image:"https://images.unsplash.com/photo-1621839673705-6617adf4e5e5?w=800&auto=format&fit=crop&q=60",stock:200,description:"Essential tools for breadboarding and prototyping. 40-pin jumper wires allow easy connections between components."},{id:5,name:"Breadboard 830 Points",category:"Prototyping",price:4.99,image:"https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800&auto=format&fit=crop&q=60",stock:85,description:"Solderless breadboard SYB-MB102 with 830 tie points. Completely reusable, perfect for creating temporary circuits without soldering."},{id:6,name:"SG90 Micro Servo Motor (9g)",category:"Motors & Actuators",price:3.99,image:"https://images.unsplash.com/photo-1585859675834-e5dfe9c70f4d?w=800&auto=format&fit=crop&q=60",stock:150,description:"SG92R/SG90 Micro Servo with nylon carbon fiber gears. Stall Torque: 2.5kg/cm at 4.8V. Perfect for RC models and robotics."},{id:7,name:"Tower Pro MG996R Servo Motor",category:"Motors & Actuators",price:9.99,image:"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop&q=60",stock:42,description:"Digital servo motor with 180° rotation. High torque for robotics applications. Metal gears for durability."},{id:8,name:"1-4 Channel 5V Relay Module",category:"Relays & Switches",price:4.5,image:"https://images.unsplash.com/photo-1601524811026-33e61c59a69a?w=800&auto=format&fit=crop&q=60",stock:95,description:"5V/12V 10A relay module with optocoupler. Compatible with Arduino, Orange Pi, and Raspberry Pi (use 5V version)."},{id:9,name:"LM2596S DC-DC Buck Converter",category:"Power Supply",price:3.99,image:"https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?w=800&auto=format&fit=crop&q=60",stock:78,description:"Step-down voltage regulator module. Adjustable output voltage. Perfect for powering projects with different voltage requirements."},{id:10,name:"IR Proximity Sensor",category:"Sensors",price:2.99,image:"https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&auto=format&fit=crop&q=60",stock:110,description:"Multipurpose infrared sensor for obstacle sensing, color detection, and line following applications."},{id:11,name:"18650 Battery Holder (1S/2S/3S)",category:"Batteries & Holders",price:1.99,image:"https://images.unsplash.com/photo-1606242420883-dcb08da4601c?w=800&auto=format&fit=crop&q=60",stock:140,description:"Series battery holder for 18650 cells with wire. Available in 1, 2, or 3 cell configurations for various voltage requirements."},{id:12,name:"PKCELL 18650 3.7V Battery (3000mAh)",category:"Batteries & Holders",price:6.5,image:"https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=60",stock:88,description:"True rated lithium-ion 18650 battery. Available in 2200mAh, 3000mAh, 3350mAh capacities. Perfect for power banks and flashlights."},{id:13,name:"USB Cable for Arduino Nano/Uno",category:"Cables & Wires",price:2.5,image:"https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=60",stock:165,description:"25cm Mini USB cable for Arduino Nano or Uno/Mega boards. Blue color, quality connectors."},{id:14,name:"FR4 Universal PCB Board (Double-Sided)",category:"Prototyping",price:3.5,image:"https://images.unsplash.com/photo-1591489354816-cf4e0a7b0f0a?w=800&auto=format&fit=crop&q=60",stock:95,description:"Fiberglass universal protoboard, more durable than phenolic paper PCB. Double-sided for complex circuits."},{id:15,name:"SanDisk MicroSD Card (16GB-256GB)",category:"Storage",price:12.99,image:"https://images.unsplash.com/photo-1602172620385-91433d285afd?w=800&auto=format&fit=crop&q=60",stock:75,description:"SanDisk Ultra Class 10 memory card for Raspberry Pi and phones. Fast transfer speeds. Available in multiple capacities."},{id:16,name:"eSUN PLA+ 3D Printer Filament (1.75mm, 1kg)",category:"3D Printing",price:22.99,image:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=60",stock:55,description:"Environmentally friendly PLA+ filament with smooth surface finish. Easy to print with excellent layer adhesion."},{id:17,name:"eSUN PETG Filament (1.75mm, 1kg)",category:"3D Printing",price:24.99,image:"https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800&auto=format&fit=crop&q=60",stock:48,description:"High-performance PETG filament combining ABS strength with PLA ease of printing. Excellent durability."},{id:18,name:"Polymaker Matte PLA Filament",category:"3D Printing",price:26.99,image:"https://images.unsplash.com/photo-1617040020617-e6ab81c65fcd?w=800&auto=format&fit=crop&q=60",stock:35,description:"Panchroma™ Matte bioplastic 3D printing filament. Next generation matte finish for stunning prints."},{id:19,name:"ELEGOO PLA Filament (1.75mm, 1kg)",category:"3D Printing",price:19.99,image:"https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&auto=format&fit=crop&q=60",stock:62,description:"High-quality PLA with lower melting temperature. Easy to use, multiple color options available."},{id:20,name:"Bambu Lab PLA Basic Filament (1kg)",category:"3D Printing",price:21.99,image:"https://images.unsplash.com/photo-1609702414271-bd5e2f9e5c88?w=800&auto=format&fit=crop&q=60",stock:40,description:"Easy to print, beginner-friendly PLA with smooth surface finish. Biodegradable and reliable quality."}],g=[{id:1,name:"Admin User",email:"admin@lumina.com",password:"admin",role:"admin"},{id:2,name:"John Doe",email:"user@example.com",password:"user",role:"customer"}],f=[{id:"ORD-001",userId:2,date:"2023-10-25",total:1598,status:"Completed",items:[{productId:1,quantity:1},{productId:2,quantity:1}]}],e={products:JSON.parse(localStorage.getItem("products_v2"))||h,users:JSON.parse(localStorage.getItem("users"))||g,orders:JSON.parse(localStorage.getItem("orders"))||f,currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:"home"},c=()=>{localStorage.setItem("products_v2",JSON.stringify(e.products)),localStorage.setItem("users",JSON.stringify(e.users)),localStorage.setItem("orders",JSON.stringify(e.orders)),localStorage.setItem("currentUser",JSON.stringify(e.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(e.cart))},d=o=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(o),n=o=>{const t=document.createElement("div");t.className="toast",t.textContent=o,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3e3)},l=o=>{e.route=o,p(),window.scrollTo(0,0)},v=()=>{const o=e.cart.reduce((a,r)=>a+r.quantity,0),t=!!e.currentUser,s=e.currentUser?.role==="admin";return`
        <header>
            <div class="header-top">
                <a href="#" class="logo" onclick="window.navigate('home'); return false;">
                    Lumina<span>Electronics</span>
                </a>
                
                <div class="search-bar">
                    <input type="text" class="search-input" placeholder="Search for products, brands and more...">
                    <button class="search-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </div>

                <div class="nav-actions">
                    ${s?"":`
                    <a href="#" class="action-icon" onclick="window.navigate('cart'); return false;">
                        <div style="position: relative;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            ${o>0?`<span class="cart-count">${o}</span>`:""}
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
                ${s?`<a href="#" class="nav-link ${e.route==="admin"?"active":""}" onclick="window.navigate('admin'); return false;">Admin Dashboard</a>`:""}
            </nav>
        </header>
    `},b=o=>{const t=o.stock<10;return`
        <div class="product-card">
            <div class="product-badge ${t?"low-stock":""}">${t?"Low Stock":"In Stock"}</div>
            <div class="product-image">
                <img src="${o.image}" alt="${o.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${o.category}</div>
                <h3 class="product-title">${o.name}</h3>
                <div class="product-price">${d(o.price)}</div>
                <button class="add-btn" onclick="window.addToCart(${o.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},m=()=>`
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
                <h2>Featured Components</h2>
                <a href="#" style="font-size: 0.9rem; color: var(--primary); font-weight: 600;">View All Products &rarr;</a>
            </div>
            <div class="product-grid">
                ${e.products.map(b).join("")}
            </div>
        </div>
    `,y=()=>`
        <div class="auth-container">
            <h2 class="auth-title">Welcome Back</h2>
            <form onsubmit="window.handleLogin(event)">
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" name="email" class="form-input" required placeholder="admin@lumina.com or user@example.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" class="form-input" required placeholder="admin or user">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%">Login</button>
            </form>
            <p class="text-center mt-4 text-sm">
                Don't have an account? <a href="#" onclick="window.navigate('signup'); return false;" style="color: var(--accent)">Sign up</a>
            </p>
        </div>
    `,w=()=>`
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
    `,k=()=>{if(e.cart.length===0)return`
            <div class="text-center" style="padding: 4rem;">
                <h2>Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('home')">Start Shopping</button>
            </div>
        `;const o=e.cart.reduce((t,s)=>t+s.price*s.quantity,0);return`
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
                    <span>${d(o)}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `},S=()=>{if(!e.currentUser||e.currentUser.role!=="admin")return l("home"),"";const o=e.orders.reduce((a,r)=>a+r.total,0),t=e.orders.length,s=e.products.length;return`
        <div>
            <h2 class="mb-4">Admin Dashboard</h2>
            
            <div class="dashboard-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Sales</div>
                    <div class="stat-value">${d(o)}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Orders</div>
                    <div class="stat-value">${t}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Products in Stock</div>
                    <div class="stat-value">${s}</div>
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
                    ${e.products.map(a=>`
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <img src="${a.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 4px;">
                                    ${a.name}
                                </div>
                            </td>
                            <td>${a.category}</td>
                            <td>${d(a.price)}</td>
                            <td>${a.stock}</td>
                            <td>
                                <button class="btn btn-ghost" style="color: var(--danger)" onclick="window.deleteProduct(${a.id})">Delete</button>
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
                    ${e.orders.map(a=>`
                        <tr>
                            <td>${a.id}</td>
                            <td>${a.date}</td>
                            <td>${a.userId}</td>
                            <td>${d(a.total)}</td>
                            <td><span class="badge badge-success">${a.status}</span></td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `};window.navigate=l;window.addToCart=o=>{if(!e.currentUser){n("Please login to shop"),l("login");return}const t=e.products.find(a=>a.id===o),s=e.cart.find(a=>a.id===o);s?s.quantity+=1:e.cart.push({...t,quantity:1}),c(),p(),n("Added to cart")};window.updateQuantity=(o,t)=>{if(t<1){window.removeFromCart(o);return}const s=e.cart.find(a=>a.id===o);s&&(s.quantity=t,c(),p())};window.removeFromCart=o=>{e.cart=e.cart.filter(t=>t.id!==o),c(),p()};window.checkout=()=>{if(e.cart.length===0)return;const o={id:`ORD-${Date.now().toString().slice(-6)}`,userId:e.currentUser.id,date:new Date().toISOString().split("T")[0],total:e.cart.reduce((t,s)=>t+s.price*s.quantity,0),status:"Completed",items:e.cart.map(t=>({productId:t.id,quantity:t.quantity}))};e.orders.unshift(o),e.cart=[],c(),n("Order placed successfully!"),l("home")};window.handleLogin=o=>{o.preventDefault();const t=o.target.email.value,s=o.target.password.value,a=e.users.find(r=>r.email===t&&r.password===s);a?(e.currentUser=a,c(),n(`Welcome back, ${a.name}`),l(a.role==="admin"?"admin":"home")):n("Invalid credentials")};window.handleSignup=o=>{o.preventDefault();const t=o.target.name.value,s=o.target.email.value,a=o.target.password.value;if(e.users.find(i=>i.email===s)){n("Email already exists");return}const r={id:e.users.length+1,name:t,email:s,password:a,role:"customer"};e.users.push(r),e.currentUser=r,c(),n("Account created successfully"),l("home")};window.logout=()=>{e.currentUser=null,e.cart=[],c(),l("home")};window.deleteProduct=o=>{confirm("Are you sure you want to remove this product?")&&(e.products=e.products.filter(t=>t.id!==o),c(),p(),n("Product removed"))};const p=()=>{const o=document.getElementById("app");let t="";switch(e.route){case"home":t=m();break;case"login":t=y();break;case"signup":t=w();break;case"cart":t=k();break;case"admin":t=S();break;default:t=m()}o.innerHTML=`
        ${v()}
        <main>
            ${t}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `};p();
