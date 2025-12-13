var ae=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var De=ae((Ae,N)=>{(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();let te=class{constructor(e="https://lumina-production-a4bb.up.railway.app"){this.serverUrl=e,this.socket=null,this.connected=!1,this.currentDeviceId=null,this.eventHandlers=new Map}async connect(e,i=""){if(this.socket&&this.connected){console.warn("Already connected to WebSocket");return}return new Promise((r,a)=>{if(typeof io>"u"){const n=document.createElement("script");n.src="https://cdn.socket.io/4.5.4/socket.io.min.js",n.onload=()=>this._initializeSocket(e,i,r,a),n.onerror=()=>a(new Error("Failed to load Socket.IO")),document.head.appendChild(n)}else this._initializeSocket(e,i,r,a)})}_initializeSocket(e,i,r,a){try{this.socket=io(`${this.serverUrl}/control`,{auth:{userId:e,sessionToken:i},transports:["websocket","polling"]}),this.socket.on("connect",()=>{console.log("✅ Connected to ESP32 WebSocket server"),this.connected=!0,this._triggerEvent("connected"),r()}),this.socket.on("connect_error",n=>{console.error("❌ Connection error:",n.message),this.connected=!1,this._triggerEvent("error",n),a(n)}),this.socket.on("disconnect",()=>{console.log("❌ Disconnected from WebSocket server"),this.connected=!1,this._triggerEvent("disconnected")}),this.socket.on("device:status",n=>{console.log("📊 Device status:",n),this._triggerEvent("device:status",n)}),this.socket.on("device:telemetry",n=>{this._triggerEvent("device:telemetry",n)}),this.socket.on("command:response",n=>{this._triggerEvent("command:response",n)}),this.socket.on("command:sent",n=>{this._triggerEvent("command:sent",n)}),this.socket.on("device:error",n=>{console.error("Device error:",n),this._triggerEvent("device:error",n)}),this.socket.on("devices:list",n=>{this._triggerEvent("devices:list",n)}),this.socket.on("error",n=>{console.error("System error:",n),this._triggerEvent("error",n)})}catch(n){a(n)}}monitorDevice(e){if(!this.connected)throw new Error("Not connected to WebSocket server");this.currentDeviceId=e,this.socket.emit("monitor:device",e),console.log(`👁️ Monitoring device: ${e}`)}stopMonitoring(){this.currentDeviceId&&this.connected&&(this.socket.emit("monitor:stop",this.currentDeviceId),this.currentDeviceId=null)}sendCommand(e,i,r={}){if(!this.connected)throw new Error("Not connected to WebSocket server");this.socket.emit("control:command",{deviceId:e,command:i,payload:r}),console.log(`📤 Sent command to ${e}:`,i,r)}move(e,i,r=255){this.sendCommand(e,"move",{direction:i,speed:r})}stop(e){this.sendCommand(e,"stop")}turnLeft(e,i=200){this.sendCommand(e,"move",{direction:"left",speed:i})}turnRight(e,i=200){this.sendCommand(e,"move",{direction:"right",speed:i})}forward(e,i=255){this.sendCommand(e,"move",{direction:"forward",speed:i})}backward(e,i=255){this.sendCommand(e,"move",{direction:"backward",speed:i})}requestDeviceList(){if(!this.connected)throw new Error("Not connected to WebSocket server");this.socket.emit("devices:list")}requestStatusRefresh(){if(!this.connected)throw new Error("Not connected to WebSocket server");this.socket.emit("devices:status:refresh"),console.log("📡 Requested status refresh for all devices")}on(e,i){this.eventHandlers.has(e)||this.eventHandlers.set(e,[]),this.eventHandlers.get(e).push(i)}off(e,i){if(!this.eventHandlers.has(e))return;const r=this.eventHandlers.get(e),a=r.indexOf(i);a>-1&&r.splice(a,1)}_triggerEvent(e,i=null){if(!this.eventHandlers.has(e))return;this.eventHandlers.get(e).forEach(a=>{try{a(i)}catch(n){console.error(`Error in event handler for ${e}:`,n)}})}disconnect(){this.socket&&(this.stopMonitoring(),this.socket.disconnect(),this.socket=null,this.connected=!1,console.log("👋 Disconnected from WebSocket"))}isConnected(){return this.connected}getCurrentDevice(){return this.currentDeviceId}};typeof N<"u"&&N.exports&&(N.exports=te);typeof window<"u"&&(window.ESP32SocketClient=te);const ne="https://lumina-production-a4bb.up.railway.app",se="http://localhost:3000",oe=window.location.hostname==="jlfuertes14.github.io",G=oe?`${ne}/api`:`${se}/api`;async function S(t,e={}){const i=`${G}${t}`;try{const r=await fetch(i,{...e,headers:{"Content-Type":"application/json",...e.headers}}),a=await r.json();if(!r.ok)throw new Error(a.error||a.message||"API request failed");return a}catch(r){throw console.error("API Error:",r),r}}console.log(`🌍 Environment: ${oe?"PRODUCTION":"DEVELOPMENT"}`);console.log(`🔗 API URL: ${G}`);const de=({Breadcrumbs:t})=>{const e=[{name:"Marco Dela Cruz",role:"Founder & CEO",image:"https://ui-avatars.com/api/?name=Marco+Dela+Cruz&background=6366f1&color=fff&size=120"},{name:"Rina Gonzales",role:"Operations Manager",image:"https://ui-avatars.com/api/?name=Rina+Gonzales&background=6366f1&color=fff&size=120"},{name:"Luis Navarro",role:"Technical Support Engineer",image:"https://ui-avatars.com/api/?name=Luis+Navarro&background=6366f1&color=fff&size=120"},{name:"Ella Ramirez",role:"Customer Service Lead",image:"https://ui-avatars.com/api/?name=Ella+Ramirez&background=6366f1&color=fff&size=120"}];return`
        <div class="about-us-page">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                ${t("about-us")}
                
                <!-- Hero Section -->
                <div class="about-hero" style="
                    position: relative; 
                    border-radius: 12px; 
                    overflow: hidden; 
                    margin: 2rem 0 4rem; 
                    height: 400px; 
                    background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('assets/about_us_hero.png'); 
                    background-size: cover; 
                    background-position: center; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                ">
                    <div style="text-align: center; color: white; padding: 2rem; max-width: 800px;">
                        <h1 style="font-size: 3.5rem; margin-bottom: 1rem; font-weight: 800; letter-spacing: -0.025em; background: linear-gradient(to right, #fff, #cbd5e1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">About Lumina Electronics</h1>
                        <p style="font-size: 1.25rem; color: #e2e8f0; line-height: 1.6;">Your trusted source for quality electronic components since 2020</p>
                    </div>
                </div>

                <!-- Origin Story Section -->
                <div class="about-origin-grid" style="margin-bottom: 6rem;">
                    <div>
                        <div style="text-transform: uppercase; color: #6366f1; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 1rem; font-size: 0.875rem;">Our Origin Story</div>
                        <h2 style="font-size: 2.5rem; color: #1e293b; margin-bottom: 1.5rem; font-weight: 700; line-height: 1.2;">From a 12-sqm Shop to a National Supplier</h2>
                        <p style="color: #475569; line-height: 1.8; margin-bottom: 1.5rem; font-size: 1.1rem;">
                            Lumina Electronics began with a simple idea: make electronics accessible to Filipinos.
                            Founded in the heart of Makati City, our journey started in a tiny 12-square-meter shop with only a handful of shelves, limited capital, and a big dream.
                        </p>
                        <p style="color: #475569; line-height: 1.8; margin-bottom: 1.5rem; font-size: 1.1rem;">
                            In 2020, a group of friends—engineers, hobbyists, and DIY enthusiasts—noticed something that every electronics student in the Philippines knew too well: quality electronic components were hard to find locally.
                        </p>
                        <blockquote style="border-left: 4px solid #6366f1; padding-left: 1.5rem; font-style: italic; color: #334155; font-size: 1.2rem; margin: 2rem 0;">
                            “Bridge the gap between Filipino innovators and the components they need.”
                        </blockquote>
                    </div>
                    <div style="position: relative;">
                        <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: #e0e7ff; border-radius: 50%; z-index: -1;"></div>
                        <div style="position: absolute; bottom: -20px; left: -20px; width: 150px; height: 150px; background: #f0fdf4; border-radius: 50%; z-index: -1;"></div>
                        <img src="assets/about_us_origin.png" alt="Our humble beginnings" style="width: 100%; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); transform: rotate(2deg);">
                    </div>
                </div>

                <!-- Mission Section -->
                <div style="background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('assets/about_us_community.png'); background-size: cover; background-position: center; border-radius: 24px; padding: 4rem; margin-bottom: 6rem; text-align: center; color: white; position: relative; overflow: hidden;">
                    <div style="position: relative; z-index: 1; max-width: 800px; margin: 0 auto;">
                        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; font-weight: 700; color: #6283a7;">Our Mission</h2>
                        <p style="font-size: 1.25rem; line-height: 1.8; color: #cbd5e1; margin-bottom: 3rem;">
                            To provide high-quality, affordable, and readily available electronic components to engineers, students, hobbyists, and makers across the Philippines.
                            We believe that innovation grows when access grows—and we are committed to helping every builder turn ideas into reality.
                        </p>
                        
                        <div class="about-mission-grid">
                            <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; backdrop-filter: blur(10px);">
                                <div style="font-size: 2rem; margin-bottom: 1rem;">⭐</div>
                                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #fff;">Quality First</h3>
                                <p style="color: #cbd5e1; font-size: 0.95rem;">We source only authentic, lab-tested components from verified global manufacturers.</p>
                            </div>
                            <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; backdrop-filter: blur(10px);">
                                <div style="font-size: 2rem; margin-bottom: 1rem;">⚡</div>
                                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #fff;">Fast Delivery</h3>
                                <p style="color: #cbd5e1; font-size: 0.95rem;">Same-day Metro Manila shipping and nationwide delivery you can rely on.</p>
                            </div>
                            <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; backdrop-filter: blur(10px);">
                                <div style="font-size: 2rem; margin-bottom: 1rem;">🤝</div>
                                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #fff;">Community Focus</h3>
                                <p style="color: #cbd5e1; font-size: 0.95rem;">Supporting schools, robotics clubs, and DIY communities with technical guidance.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Journey Timeline -->
                <div style="margin-bottom: 6rem;">
                    <div style="text-align: center; margin-bottom: 4rem;">
                        <h2 style="font-size: 2.5rem; color: #1e293b; font-weight: 700;">Our Journey</h2>
                        <p style="color: #64748b; font-size: 1.1rem;">Growing with the Filipino maker community</p>
                    </div>
                    
                    <div style="position: relative; max-width: 800px; margin: 0 auto;">
                        <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: #e2e8f0; transform: translateX(-50%);"></div>
                        
                        <!-- 2020 -->
                        <div style="display: flex; justify-content: flex-end; padding-right: 50%; margin-bottom: 3rem; position: relative;">
                            <div style="position: absolute; right: 50%; top: 0; width: 16px; height: 16px; background: #6366f1; border-radius: 50%; border: 4px solid white; box-shadow: 0 0 0 2px #6366f1; transform: translate(50%, 0); z-index: 2;"></div>
                            <div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; width: 90%; margin-right: 2rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                                <span style="color: #6366f1; font-weight: 700; font-size: 0.9rem;">2020</span>
                                <h3 style="font-size: 1.25rem; margin: 0.5rem 0; color: #1e293b;">Humble Beginnings</h3>
                                <p style="color: #64748b;">Started in a small Makati shop with only 50 products, serving students and hobbyists who struggled to find reliable components.</p>
                            </div>
                        </div>

                        <!-- 2022 -->
                        <div style="display: flex; justify-content: flex-start; padding-left: 50%; margin-bottom: 3rem; position: relative;">
                            <div style="position: absolute; left: 50%; top: 0; width: 16px; height: 16px; background: #6366f1; border-radius: 50%; border: 4px solid white; box-shadow: 0 0 0 2px #6366f1; transform: translate(-50%, 0); z-index: 2;"></div>
                            <div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; width: 90%; margin-left: 2rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                                <span style="color: #6366f1; font-weight: 700; font-size: 0.9rem;">2022</span>
                                <h3 style="font-size: 1.25rem; margin: 0.5rem 0; color: #1e293b;">Growing With the Community</h3>
                                <p style="color: #64748b;">Expanded to 500+ products, formed partnerships with trusted manufacturers, and began supplying schools and university orgs.</p>
                            </div>
                        </div>

                        <!-- 2024 -->
                        <div style="display: flex; justify-content: flex-end; padding-right: 50%; margin-bottom: 3rem; position: relative;">
                            <div style="position: absolute; right: 50%; top: 0; width: 16px; height: 16px; background: #6366f1; border-radius: 50%; border: 4px solid white; box-shadow: 0 0 0 2px #6366f1; transform: translate(50%, 0); z-index: 2;"></div>
                            <div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; width: 90%; margin-right: 2rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                                <span style="color: #6366f1; font-weight: 700; font-size: 0.9rem;">2024</span>
                                <h3 style="font-size: 1.25rem; margin: 0.5rem 0; color: #1e293b;">Serving the Nation</h3>
                                <p style="color: #64748b;">Now offering 1,000+ products, helping over 50,000 customers, and providing same-day shipping and improved support.</p>
                            </div>
                        </div>

                        <!-- Today -->
                        <div style="display: flex; justify-content: flex-start; padding-left: 50%; position: relative;">
                            <div style="position: absolute; left: 50%; top: 0; width: 16px; height: 16px; background: #10b981; border-radius: 50%; border: 4px solid white; box-shadow: 0 0 0 2px #10b981; transform: translate(-50%, 0); z-index: 2;"></div>
                            <div style="background: #f0fdf4; padding: 2rem; border-radius: 12px; border: 1px solid #bbf7d0; width: 90%; margin-left: 2rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                                <span style="color: #10b981; font-weight: 700; font-size: 0.9rem;">TODAY</span>
                                <h3 style="font-size: 1.25rem; margin: 0.5rem 0; color: #064e3b;">Trusted by Filipinos</h3>
                                <p style="color: #065f46;">Lumina Electronics continues to grow as one of the Philippines’ most trusted electronics component suppliers—built by Filipinos, for Filipinos.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Team Section -->
                <div style="margin-bottom: 6rem;">
                    <div style="text-align: center; margin-bottom: 3rem;">
                        <h2 style="font-size: 2.5rem; color: #1e293b; font-weight: 700;">Meet Our Team</h2>
                        <p style="color: #64748b; font-size: 1.1rem;">The people behind Lumina Electronics</p>
                    </div>
                    <div class="about-team-grid">
                        ${e.map(n=>`
                            <div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center; transition: transform 0.2s; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                                <div style="width: 100px; height: 100px; margin: 0 auto 1.5rem; border-radius: 50%; overflow: hidden; border: 4px solid #f1f5f9;">
                                    <img src="${n.image}" alt="${n.name}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #1e293b; font-weight: 600;">${n.name}</h3>
                                <p style="font-size: 0.875rem; color: #6366f1; font-weight: 500;">${n.role}</p>
                            </div>
                        `).join("")}
                    </div>
                </div>

                <!-- Why Choose Us -->
                <div style="background: #f8fafc; border-radius: 24px; padding: 4rem; text-align: center;">
                    <h2 style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b; font-weight: 700;">Why Choose Us</h2>
                    <div class="about-features-grid">
                        <div style="padding: 2rem;">
                            <div style="width: 64px; height: 64px; background: #dcfce7; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #16a34a;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #1e293b; font-weight: 600;">Authentic Components</h3>
                            <p style="color: #64748b; line-height: 1.6;">We only carry genuine parts from trusted manufacturers. No clones, no counterfeits—just reliable components that work.</p>
                        </div>

                        <div style="padding: 2rem;">
                            <div style="width: 64px; height: 64px; background: #fef9c3; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #ca8a04;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #1e293b; font-weight: 600;">Expert Technical Support</h3>
                            <p style="color: #64748b; line-height: 1.6;">Ask us anything—our in-house engineers assist with troubleshooting, product recommendations, and project guidance.</p>
                        </div>

                        <div style="padding: 2rem;">
                            <div style="width: 64px; height: 64px; background: #ede9fe; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #7c3aed;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            </div>
                            <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #1e293b; font-weight: 600;">Fast & Dependable</h3>
                            <p style="color: #64748b; line-height: 1.6;">Same-day shipping within Metro Manila and quick nationwide delivery ensures your projects never get delayed.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `},le=({Breadcrumbs:t,state:e})=>{const i=[{id:1,title:"Getting Started with Arduino",category:"Beginner",topic:"Microcontrollers",duration:"15 min",videoId:"nL34zDTPkcs",featured:!0},{id:2,title:"Raspberry Pi Setup Guide",category:"Beginner",topic:"Microcontrollers",duration:"20 min",videoId:"BpJCAafw2qE",featured:!0},{id:3,title:"Understanding Sensors",category:"Intermediate",topic:"IoT",duration:"18 min",videoId:"DlG6LY84MUU",recent:!0},{id:4,title:"DIY Obstacle Avoidance Car",category:"Intermediate",topic:"IoT",duration:"6 min",videoId:"1n_KjpMfVT0",recent:!0},{id:5,title:"PCB Design Basics",category:"Advanced",topic:"PCB Design",duration:"60 min",videoId:"vaCVh2SAZY4",featured:!0},{id:6,title:"IoT Projects with ESP32",category:"Advanced",topic:"IoT",duration:"50 min",videoId:"xPlN_Tk3VLQ",recent:!0},{id:7,title:"8 Brilliant Projects with 3D Printing and Electronics!",category:"Intermediate",topic:"Microcontrollers",duration:"8 min",videoId:"UkWoPMa6V-M",featured:!0},{id:8,title:"Building a Weather Station",category:"Advanced",topic:"IoT",duration:"42 min",videoId:"U0kPgFcALac",recent:!0}],r=i.filter(d=>d.featured),a=i.filter(d=>d.recent),n=d=>d==="Beginner"?{bg:"#dcfce7",text:"#16a34a"}:d==="Intermediate"?{bg:"#dbeafe",text:"#2563eb"}:{bg:"#f3e8ff",text:"#9333ea"},l=e.filterLearnCategory&&e.filterLearnCategory!=="all",s=l?i.filter(d=>d.category===e.filterLearnCategory):i;return`
        <div style="background: #f8f9fa; min-height: 100vh; padding-bottom: 3rem;">
            <!-- Hero Banner -->
            <div style="width: 100%; margin-top: 2rem; margin-bottom: 2rem; overflow: hidden;">
                <div style="max-width: 1400px; margin: 0 auto;">
                    <img src="assets/learning-hub-banner.png" alt="Lumina Learning Hub" style="width: 100%; max-height: 200px; object-fit: cover; display: block; border-radius: 8px;" />
                </div>
            </div>
            <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                ${t("learn")}
                
                <!-- Filter Chips -->
                <div style="display: flex; gap: 0.75rem; margin-bottom: 2rem; flex-wrap: wrap; overflow-x: auto; padding-bottom: 0.5rem;">
                    ${["all","Beginner","Intermediate","Advanced"].map(d=>`
                        <button class="topic-filter ${e.filterLearnCategory===d?"active":""}" 
                            onclick="window.filterLearningContent('${d}')" 
                            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; 
                                   background: ${e.filterLearnCategory===d?"#6366f1":"white"}; 
                                   color: ${e.filterLearnCategory===d?"white":"#64748b"}; 
                                   border: 2px solid ${e.filterLearnCategory===d?"#6366f1":"#e2e8f0"}; 
                                   border-radius: 24px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                            ${d.charAt(0).toUpperCase()+d.slice(1)}
                        </button>
                    `).join("")}
                </div>
                ${l?`
                    <!-- Filtered Grid View -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
                        ${s.map(d=>`
                            <div class="tutorial-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: transform 0.2s; display: flex; flex-direction: column;">
                                <div style="position: relative; aspect-ratio: 16/9;">
                                    <img src="https://img.youtube.com/vi/${d.videoId}/mqdefault.jpg" alt="${d.title}" style="width: 100%; height: 100%; object-fit: cover;">
                                    <div style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.75); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                        ${d.duration}
                                    </div>
                                </div>
                                <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                                        <span style="background: #e0e7ff; color: #4338ca; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">
                                            ${d.category}
                                        </span>
                                        <span style="color: #94a3b8; font-size: 0.875rem;">${d.topic}</span>
                                    </div>
                                    <h3 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin-bottom: 0.5rem; line-height: 1.4;">${d.title}</h3>
                                    <div style="margin-top: auto; padding-top: 1rem;">
                                        <button class="btn btn-outline" onclick="window.navigateToTutorial(${d.id})" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                            Read More
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                `:`
                    <!-- Default View: Carousels & Resources -->
                    
                    <!-- Featured Playlist Carousel -->
                    <div style="margin-bottom: 3rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                            <h2 style="font-size: 1.5rem; color: #1e293b; font-weight: 600;">Featured Playlist</h2>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                            ${r.map(d=>{const g=n(d.category);return`
                                <div class="tutorial-card" style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column;" 
                                     onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.12)'"
                                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'">
                                    <div style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden;">
                                        <img src="https://img.youtube.com/vi/${d.videoId}/maxresdefault.jpg" alt="${d.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                                        <div style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.85); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                            ⏱ ${d.duration}
                                        </div>
                                        <div style="position: absolute; top: 0.5rem; left: 0.5rem; background: ${g.bg}; color: ${g.text}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
                                            ${d.category}
                                        </div>
                                    </div>
                                    <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">
                                        <h3 style="font-size: 1rem; margin-bottom: 0.5rem; line-height: 1.4; color: #1e293b; font-weight: 600; text-align: left;">${d.title}</h3>
                                        <div style="margin-top: auto; padding-top: 0.5rem;">
                                            <button class="btn btn-outline" onclick="window.navigateToTutorial(${d.id})" style="width: 100%; font-size: 0.875rem; padding: 0.5rem;">
                                                Read More
                                            </button>
                                        </div>
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
                            ${a.map(d=>{const g=n(d.category);return`
                                <div class="tutorial-card" style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column;" 
                                     onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.12)'"
                                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'">
                                    <div style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden;">
                                        <img src="https://img.youtube.com/vi/${d.videoId}/maxresdefault.jpg" alt="${d.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                                        <div style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.85); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                            ⏱ ${d.duration}
                                        </div>
                                        <div style="position: absolute; top: 0.5rem; left: 0.5rem; background: ${g.bg}; color: ${g.text}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
                                            ${d.category}
                                        </div>
                                    </div>
                                    <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column;">
                                        <h3 style="font-size: 1rem; margin-bottom: 0.5rem; line-height: 1.4; color: #1e293b; font-weight: 600; text-align: left;">${d.title}</h3>
                                        <div style="margin-top: auto; padding-top: 0.5rem;">
                                            <button class="btn btn-outline" onclick="window.navigateToTutorial(${d.id})" style="width: 100%; font-size: 0.875rem; padding: 0.5rem;">
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `}).join("")}
                        </div>
                    </div>
                    <!-- Additional Learning Resources -->
                    <div style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; padding: 2.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                        <h2 style="font-size: 1.5rem; margin-bottom: 2rem; color: #1e293b; font-weight: 600;">Additional Learning Resources</h2>
                        <div class="resources-grid">
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
                `}
            </div>
        </div>
    `},ce=({Breadcrumbs:t,state:e})=>{const i=e.params?.id,a=[{id:1,title:"Getting Started with Arduino",category:"Beginner",topic:"Microcontrollers",duration:"15 min",videoId:"nL34zDTPkcs",description:"Dive into the world of Arduino microcontrollers with this comprehensive beginner's guide. You'll learn the fundamental concepts of Arduino programming, understand the hardware components, and create your first working projects. This tutorial covers everything from setting up your development environment to uploading your first sketch onto the Arduino board. Perfect for absolute beginners with no prior programming or electronics experience.",learningPoints:["Setting up the Arduino IDE and connecting your board","Understanding Arduino pin configurations and digital I/O","Writing and uploading your first Arduino sketch","Working with basic sensors and LED circuits"]},{id:2,title:"Raspberry Pi Setup Guide",category:"Beginner",topic:"Microcontrollers",duration:"20 min",videoId:"BpJCAafw2qE",description:"Get your Raspberry Pi up and running with this detailed setup tutorial. Learn how to install the operating system, configure essential settings, and prepare your Pi for your first projects. This guide covers both the hardware setup process and the software configuration you'll need to start building amazing IoT projects. Whether you're using Raspberry Pi 3, 4, or 5, this tutorial will help you get started quickly and correctly.",learningPoints:["Installing Raspberry Pi OS using the official imager","Configuring network settings and enabling SSH","Installing essential packages and development tools","Understanding the GPIO pinout and basic Python programming"]},{id:3,title:"Understanding Sensors",category:"Intermediate",topic:"IoT",duration:"18 min",videoId:"DlG6LY84MUU",description:"Explore the fascinating world of electronic sensors and learn how to integrate them into your projects. This tutorial provides an in-depth look at various sensor types including temperature sensors (DHT11, DS18B20), motion sensors (PIR), ultrasonic distance sensors (HC-SR04), and light sensors (LDR, BH1750). You'll understand how sensors work, how to read their data, and how to calibrate them for accurate measurements in real-world applications.",learningPoints:["Understanding analog vs digital sensors and their applications","Reading data from temperature and humidity sensors","Working with motion detection and ultrasonic distance measurement","Implementing sensor calibration and data filtering techniques"]},{id:4,title:"DIY Obstacle Avoidance Car",category:"Intermediate",topic:"IoT",duration:"6 min",videoId:"1n_KjpMfVT0",description:"Build an intelligent autonomous car that can navigate around obstacles using ultrasonic sensors and Arduino. This hands-on project combines motor control, sensor integration, and basic robotics programming. You'll learn how to read ultrasonic sensor data, implement decision-making logic, and control DC motors using an L298N motor driver. This is a perfect project for understanding the basics of autonomous navigation and robotics.",learningPoints:["Wiring and controlling DC motors with an L298N driver","Reading and processing ultrasonic sensor data for obstacle detection","Implementing autonomous navigation logic and decision trees","Troubleshooting common issues in robotic car projects"]},{id:5,title:"PCB Design Basics",category:"Advanced",topic:"PCB Design",duration:"60 min",videoId:"vaCVh2SAZY4",description:"Master the art of printed circuit board (PCB) design from scratch. This comprehensive tutorial takes you through the entire PCB design workflow using professional tools like KiCad or EasyEDA. Learn how to create schematics, design PCB layouts, route traces efficiently, and prepare your designs for manufacturing. You'll understand design rules, layer stackups, component placement strategies, and how to export Gerber files for fabrication. Essential knowledge for anyone serious about electronics development.",learningPoints:["Creating professional schematics with proper component symbols","PCB layout best practices: trace width, clearances, and ground planes","Routing strategies for signal integrity and EMI reduction","Preparing and exporting Gerber files for PCB manufacturing"]},{id:6,title:"IoT Projects with ESP32",category:"Advanced",topic:"IoT",duration:"50 min",videoId:"xPlN_Tk3VLQ",description:"Unlock the power of the ESP32 microcontroller for advanced IoT applications. This tutorial covers WiFi connectivity, web server creation, MQTT protocol implementation, and cloud integration. You'll build real IoT projects including a web-based temperature monitor, remote-controlled devices, and data logging systems. Learn how to use the ESP32's dual-core processor, Bluetooth capabilities, and low-power modes to create professional-grade IoT solutions.",learningPoints:["Setting up ESP32 development environment and WiFi connectivity","Creating web servers and REST APIs on the ESP32","Implementing MQTT for real-time IoT communication","Integrating with cloud platforms (Firebase, AWS IoT, ThingSpeak)"]},{id:7,title:"8 Brilliant Projects with 3D Printing and Electronics!",category:"Intermediate",topic:"Microcontrollers",duration:"8 min",videoId:"UkWoPMa6V-M",description:"Discover the perfect fusion of 3D printing and electronics in this inspiring project showcase. See how makers are combining custom 3D-printed enclosures with Arduino and Raspberry Pi to create amazing devices. From smart home sensors to robotic mechanisms, this video demonstrates practical applications and design techniques. Learn how to design functional enclosures, integrate electronics seamlessly, and bring your maker ideas to life with the power of additive manufacturing.",learningPoints:["Designing functional 3D-printed enclosures for electronics","Integrating sensors and displays into custom housings","Creating cable management and mounting solutions","Prototyping techniques for iterative design improvements"]},{id:8,title:"Building a Weather Station",category:"Advanced",topic:"IoT",duration:"42 min",videoId:"U0kPgFcALac",description:"Create a complete IoT weather station that measures temperature, humidity, atmospheric pressure, and more. This advanced project teaches you how to interface with BME280/BMP280 sensors, implement accurate data logging, visualize weather data on web dashboards, and even integrate with weather services like Weather Underground. You'll learn about sensor calibration, data averaging techniques, power management for outdoor deployment, and how to create professional data visualizations using Chart.js or similar libraries.",learningPoints:["Interfacing with BME280/BMP280 environmental sensors via I2C","Implementing data logging with timestamps and SD card storage","Creating real-time data visualizations and web dashboards","Power management and weatherproofing for outdoor installations"]}].find(s=>s.id===parseInt(i));if(!a)return`
            <div style="max-width: 1200px; margin: 4rem auto; padding: 2rem; text-align: center;">
                <h1>Tutorial Not Found</h1>
                <p style="color: #64748b; margin: 1rem 0;">The tutorial you're looking for doesn't exist.</p>
                <button class="btn btn-primary" onclick="window.navigate('learn')">Back to Learn</button>
            </div>
        `;const l=(s=>s==="Beginner"?{bg:"#dcfce7",text:"#16a34a"}:s==="Intermediate"?{bg:"#dbeafe",text:"#2563eb"}:{bg:"#f3e8ff",text:"#9333ea"})(a.category);return`
        <div style="background: #f8f9fa; min-height: 100vh; padding: 2rem 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                ${t("learn")}
                
                <!-- Back Button -->
                <button class="btn btn-outline" onclick="window.navigate('learn')" style="margin-bottom: 1.5rem;">
                    ← Back to Tutorials
                </button>

                <!-- Video Section -->
                <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); margin-bottom: 2rem;">
                    <div style="position: relative; padding-bottom: 56.25%; background: #000;">
                        <iframe 
                            src="https://www.youtube.com/embed/${a.videoId}" 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>

                <!-- Tutorial Info -->
                <div style="background: white; border-radius: 12px; padding: 2.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap;">
                        <span style="background: ${l.bg}; color: ${l.text}; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
                            ${a.category}
                        </span>
                        <span style="background: #f1f5f9; color: #64748b; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
                            📚 ${a.topic}
                        </span>
                        <span style="background: #f1f5f9; color: #64748b; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
                            ⏱️ ${a.duration}
                        </span>
                    </div>

                    <h1 style="font-size: 2rem; color: #1e293b; margin-bottom: 1.5rem; font-weight: 700;">
                        ${a.title}
                    </h1>

                    <div style="border-top: 1px solid #e2e8f0; padding-top: 1.5rem;">
                        <h2 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 1rem; font-weight: 600;">
                            About this Tutorial
                        </h2>
                        <p style="color: #64748b; line-height: 1.8; font-size: 1rem;">
                            ${a.description}
                        </p>
                    </div>

                    <!-- What You'll Learn -->
                    <div style="border-top: 1px solid #e2e8f0; margin-top: 2rem; padding-top: 2rem;">
                        <h3 style="font-size: 1.125rem; color: #1e293b; margin-bottom: 1.5rem; font-weight: 600;">
                            What You'll Learn
                        </h3>
                        <ul style="list-style: none; padding: 0; display: grid; gap: 0.75rem;">
                            ${a.learningPoints.map(s=>`
                                <li style="display: flex; align-items: start; gap: 0.75rem;">
                                    <span style="color: #10b981; font-size: 1.25rem;">✓</span>
                                    <span style="color: #64748b; line-height: 1.6;">${s}</span>
                                </li>
                            `).join("")}
                        </ul>
                    </div>

                    <!-- CTA -->
                    <div style="margin-top: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 8px; text-align: center;">
                        <h3 style="color: white; font-size: 1.125rem; margin-bottom: 0.75rem; font-weight: 600;">
                            Ready to start building?
                        </h3>
                        <p style="color: rgba(255,255,255,0.9); margin-bottom: 1rem; font-size: 0.875rem;">
                            Get all the components you need from our store
                        </p>
                        <button class="btn" onclick="window.navigate('products')" style="background: white; color: #6366f1; font-weight: 600; padding: 0.75rem 2rem;">
                            Shop Components →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `},me=({Breadcrumbs:t,state:e})=>`
        <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
            ${t("contact-us")}
            
            <!-- Hero Section -->
            <div style="text-align: center; margin-bottom: 4rem;">
                <h1 style="font-size: 2.5rem; margin-bottom: 1rem; background: linear-gradient(135deg, var(--primary), #0EA5E9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Get in Touch</h1>
                <p style="font-size: 1.125rem; color: var(--text-muted); max-width: 600px; margin: 0 auto;">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            <div class="contact-grid" style="margin-bottom: 4rem;">
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
    `,y=t=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(t),pe=({Breadcrumbs:t,state:e})=>{const i=e.products.slice(0,8).map((r,a)=>({...r,originalPrice:r.price*1.3,discount:[10,15,20,25,30][a%5],category:["Microcontrollers","Sensors","Tools","Robotics","Components"][a%5]}));return e.myCoupons,`
        <div style="background: #f8f9fa; min-height: 100vh; padding: 2rem 0;">
            <!-- Content Container -->
            <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                ${t("deals")}
                
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
                    <div class="coupon-grid">
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
                                    <button onclick="window.claimCoupon('MAKER100')" style="background: #1e293b; color: white; border: none; padding: 0.375rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.25rem;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        Claim Coupon
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
                                    <button onclick="window.claimCoupon('SENSE10')" style="background: #1e293b; color: white; border: none; padding: 0.375rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.25rem;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        Claim Coupon
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
                                   <button onclick="window.claimCoupon('SHIPFREE')" style="background: #1e293b; color: white; border: none; padding: 0.375rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.25rem;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        Claim Coupon
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CATEGORY TABS -->
                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button onclick="window.filterDeals('all')" class="deal-category-tab active" data-category="all" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: #6366f1; color: white; border-radius: 24px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">All Deals</button>
                        <button onclick="window.filterDeals('Microcontrollers')" class="deal-category-tab" data-category="Microcontrollers" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: white; color: #64748b; border-radius: 24px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">Microcontrollers</button>
                        <button onclick="window.filterDeals('Sensors')" class="deal-category-tab" data-category="Sensors" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: white; color: #64748b; border-radius: 24px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">Sensors</button>
                        <button onclick="window.filterDeals('Tools')" class="deal-category-tab" data-category="Tools" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: white; color: #64748b; border-radius: 24px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">Tools</button>
                        <button onclick="window.filterDeals('Robotics')" class="deal-category-tab" data-category="Robotics" style="padding: 0.5rem 1rem; border: 1px solid #e2e8f0; background: white; color: #64748b; border-radius: 24px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">Robotics</button>
                        <button onclick="window.filterDeals('clearance')" class="deal-category-tab" data-category="clearance" style="padding: 0.5rem 1rem; border: 1px solid #dc2626; background: white; color: #dc2626; border-radius: 24px; font-size: 0.875rem; font-weight: 700; cursor: pointer;">🔥 Clearance Bin</button>
                    </div>
                </div>

                <!-- DEALS GRID -->
                <div style="margin-bottom: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <div style="font-size: 0.875rem; color: #64748b;">${i.length} products on sale</div>
                        <select style="padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 0.875rem; outline: none;" onchange="window.sortDeals(this.value)">
                            <option value="featured">Sort: Featured</option>
                            <option value="discount">Highest Discount</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>

                    <div class="deals-product-grid">
                        ${i.map(r=>`
                            <div class="deal-product-card" data-category="${r.category}" style="background: white; border-radius: 4px; border: 1px solid #e2e8f0; overflow: hidden; position: relative; cursor: pointer; transition: border-color 0.15s;" 
                                 onclick="window.viewProduct(${r.id})"
                                 onmouseover="this.style.borderColor='#cbd5e1'" 
                                 onmouseout="this.style.borderColor='#e2e8f0'">
                                <!-- Discount Badge -->
                                <div style="position: absolute; top: 0.5rem; left: 0.5rem; background: #6366f1; color: white; padding: 0.375rem 0.625rem; border-radius: 4px; font-size: 0.875rem; font-weight: 700; z-index: 1; box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);">
                                    -${r.discount}%
                                </div>
                                
                                <!-- Product Image -->
                                <div style="aspect-ratio: 1; background: #f8f9fa; display: flex; align-items: center; justify-content: center; padding: 1.5rem; border-bottom: 1px solid #f1f5f9;">
                                    <img src="${r.image}" alt="${r.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                                </div>
                                
                                <!-- Product Info -->
                                <div style="padding: 1rem;">
                                    <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">${r.category}</div>
                                    <h3 style="margin-bottom: 0.75rem; font-size: 0.875rem; line-height: 1.4; height: 2.8em; overflow: hidden; color: #1e293b; font-weight: 600;">${r.name}</h3>
                                    
                                    <!-- Price Display (Star of the Card) -->
                                    <div style="margin-bottom: 0.75rem;">
                                        <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.25rem;">
                                            <span style="font-size: 1.5rem; font-weight: 700; color: #6366f1;">${y(r.price)}</span>
                                            <span style="font-size: 0.875rem; text-decoration: line-through; color: #94a3b8;">${y(r.originalPrice)}</span>
                                        </div>
                                        <div style="font-size: 0.75rem; color: #16a34a; font-weight: 600;">You save ${y(r.originalPrice-r.price)}</div>
                                    </div>
                                    
                                    <!-- Stock Indicator -->
                                    <div style="margin-bottom: 0.75rem;">
                                        <div style="font-size: 0.75rem; color: ${r.stock<30?"#dc2626":"#16a34a"}; font-weight: 600; margin-bottom: 0.25rem;">
                                            ${r.stock<30?"⚠️ Only "+r.stock+" left!":"✓ In Stock"}
                                        </div>
                                    </div>
                                    
                                    <button class="btn btn-primary" style="width: 100%; padding: 0.625rem; font-size: 0.875rem; font-weight: 500; border-radius: 4px;" onclick="event.stopPropagation(); window.addToCart(${r.id})">
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
                    
                    <div class="bulk-buy-grid">
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
    `};window.adminState={activeTab:"dashboard",isModalOpen:!1,modalType:null,editingId:null,uploadedImage:null,showConfirmModal:!1,confirmTitle:"",confirmMessage:"",confirmCallback:null,confirmItemName:"",productSearch:"",productCategoryFilter:"all",productSortBy:null,productSortOrder:"asc"};window.showConfirmModal=(t,e,i,r)=>{window.adminState.showConfirmModal=!0,window.adminState.confirmTitle=t,window.adminState.confirmMessage=e,window.adminState.confirmItemName=i,window.adminState.confirmCallback=r,window.render()};window.hideConfirmModal=()=>{window.adminState.showConfirmModal=!1,window.adminState.confirmCallback=null,window.render()};window.executeConfirmAction=()=>{window.adminState.confirmCallback&&window.adminState.confirmCallback(),window.hideConfirmModal()};window.switchAdminTab=t=>{window.adminState.activeTab=t,t==="staff"&&window.api&&window.api.getUsers&&window.api.getUsers(),t==="orders"&&window.api&&(window.api.getOrders&&window.api.getOrders(),window.api.getUsers&&window.api.getUsers()),window.render(),t==="dashboard"&&setTimeout(()=>window.initAdminCharts(),100)};window.toggleAdminModal=(t,e=null,i=null)=>{window.adminState.isModalOpen=t,window.adminState.modalType=e,window.adminState.editingId=i,window.adminState.uploadedImage=null,window.render()};document.addEventListener("keydown",t=>{t.key==="Escape"&&window.adminState.isModalOpen&&window.toggleAdminModal(!1)});window.toggleNotifications=()=>{const t=document.getElementById("adminNotifications");t&&t.classList.toggle("show")};let J=null;window.handleProductSearch=t=>{const e=t.target.value;window.adminState.productSearch=e,clearTimeout(J),J=setTimeout(()=>{window.render(),setTimeout(()=>{const i=document.querySelector('input[placeholder*="Search products"]');i&&(i.focus(),i.setSelectionRange(i.value.length,i.value.length))},10)},300)};window.handleProductCategoryFilter=t=>{window.adminState.productCategoryFilter=t.target.value,window.render()};window.handleProductSort=t=>{const{productSortBy:e,productSortOrder:i}=window.adminState;e===t?window.adminState.productSortOrder=i==="asc"?"desc":"asc":(window.adminState.productSortBy=t,window.adminState.productSortOrder="asc"),window.render()};window.clearProductFilters=()=>{window.adminState.productSearch="",window.adminState.productCategoryFilter="all",window.adminState.productSortBy=null,window.adminState.productSortOrder="asc",window.render()};window.handleImageSelect=t=>{const e=t.target.files[0];window.processImageFile(e)};window.handleDragOver=t=>{t.preventDefault(),t.currentTarget.classList.add("dragover")};window.handleDragLeave=t=>{t.currentTarget.classList.remove("dragover")};window.handleDrop=t=>{t.preventDefault(),t.currentTarget.classList.remove("dragover");const e=t.dataTransfer.files[0];window.processImageFile(e)};window.processImageFile=t=>{if(!t)return;if(!["image/jpeg","image/png"].includes(t.type)){window.showToast("Only JPEG and PNG images are allowed.");return}if(t.size>3*1024*1024){window.showToast("File size must be less than 3MB.");return}const e=new FileReader;e.onload=i=>{window.adminState.uploadedImage=i.target.result;const r=document.getElementById("imagePreview"),a=document.getElementById("dropZone"),n=document.getElementById("previewImg");r&&a&&n&&(n.src=i.target.result,r.style.display="block",a.style.display="none")},e.readAsDataURL(t)};window.removeImage=()=>{window.adminState.uploadedImage=null;const t=document.getElementById("imagePreview"),e=document.getElementById("dropZone"),i=document.getElementById("fileInput");t&&e&&(t.style.display="none",e.style.display="flex",i&&(i.value=""))};window.handleSaveProduct=async t=>{t.preventDefault();const e=new FormData(t.target),i=Object.fromEntries(e.entries());if(i.price=parseFloat(i.price),i.stock=parseInt(i.stock),window.adminState.uploadedImage)i.image=window.adminState.uploadedImage;else if(window.adminState.editingId)try{const r=await S(`/products/${window.adminState.editingId}`);r&&r.data&&(i.image=r.data.image)}catch(r){console.warn("Could not fetch existing product image:",r)}else i.image="https://via.placeholder.com/150";try{console.log("Saving product:",i);let r;window.adminState.editingId?(r=await S(`/products/${window.adminState.editingId}`,{method:"PUT",body:JSON.stringify(i)}),console.log("Update response:",r),window.showToast("Product updated successfully!","success")):(r=await S("/products",{method:"POST",body:JSON.stringify(i)}),console.log("Create response:",r),window.showToast("Product added successfully!","success")),window.toggleAdminModal(!1),window.api&&window.api.getProducts&&window.api.getProducts()}catch(r){console.error("Save product error:",r),window.showToast(window.adminState.editingId?"Failed to update product":"Failed to add product","error")}};window.handleDeleteProduct=(t,e="this product")=>{window.showConfirmModal("Delete Product","Are you sure you want to delete",e,async()=>{try{await S(`/products/${t}`,{method:"DELETE"}),window.showToast("Product deleted successfully!","success"),window.api&&window.api.getProducts&&window.api.getProducts()}catch(i){console.error(i),window.showToast("Failed to delete product","error")}})};window.handleSaveStaff=async t=>{t.preventDefault();const e=new FormData(t.target),i=Object.fromEntries(e.entries());try{window.adminState.editingId?(await S(`/users/${window.adminState.editingId}`,{method:"PUT",body:JSON.stringify({name:i.name,email:i.email,role:"staff"})}),window.showToast("Staff member updated!","success")):(await S("/users/register",{method:"POST",body:JSON.stringify({name:i.name,email:i.email,password:i.password,role:"staff"})}),window.showToast("Staff member added!","success")),window.toggleAdminModal(!1),window.api.getUsers&&window.api.getUsers()}catch(r){console.error(r),window.showToast(r.message||"Failed to save staff","error")}};window.handleEditStaff=t=>{window.adminState.editingId=t,window.toggleAdminModal(!0,"editStaff",t)};window.handleDeleteStaff=(t,e="this staff member")=>{window.showConfirmModal("Delete Staff","Are you sure you want to delete",e,async()=>{try{await S(`/users/${t}`,{method:"DELETE"}),window.showToast("Staff member deleted!","success"),window.api.getUsers&&window.api.getUsers()}catch(i){console.error(i),window.showToast("Failed to delete staff","error")}})};window.handleOrderStatusUpdate=async(t,e)=>{try{await S(`/orders/${t}/status`,{method:"PUT",body:JSON.stringify({status:e})}),window.showToast(`Order ${t} updated to ${e}!`,"success"),window.api.getOrders&&window.api.getOrders()}catch(i){console.error(i),window.showToast("Failed to update order status","error")}};const _=t=>{if(!t.currentUser||!["admin","staff"].includes(t.currentUser.role))return setTimeout(()=>window.navigate("home"),0),"";const{activeTab:e}=window.adminState,r=t.currentUser.role==="admin",a=r,n=r,l=r,s=t.orders.reduce((x,p)=>x+(p.total||0),0),d=t.orders.length,g=t.products.filter(x=>x.stock<10).length,b=t.users?t.users.filter(x=>x.role==="customer").length:0,h=[...t.orders].sort((x,p)=>new Date(p.createdAt)-new Date(x.createdAt)).slice(0,5),f=()=>`
        <aside class="admin-sidebar">
            <nav class="sidebar-nav" style="padding-top: 1rem;">
                <div class="sidebar-item ${e==="dashboard"?"active":""}" onclick="window.switchAdminTab('dashboard')">
                    <span>📊</span> Dashboard
                </div>
                <div class="sidebar-item ${e==="products"?"active":""}" onclick="window.switchAdminTab('products')">
                    <span>📦</span> Products
                </div>
                <div class="sidebar-item ${e==="orders"?"active":""}" onclick="window.switchAdminTab('orders')">
                    <span>📋</span> Orders
                </div>
                ${n?`
                <div class="sidebar-item ${e==="staff"?"active":""}" onclick="window.switchAdminTab('staff')">
                    <span>👥</span> Staff
                </div>`:""}
                
                <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div class="sidebar-item" onclick="window.navigate('home')">
                        <span>🏠</span> Back to Home
                    </div>
                </div>
            </nav>
        </aside>
    `,m=()=>`
        <div class="admin-page-header">
            <div>
                <h1 class="admin-title">Overview</h1>
                <p class="text-muted">Welcome back, ${t.currentUser.name}</p>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <div class="notifications-wrapper">
                    <button class="btn-ghost" onclick="window.toggleNotifications()" style="position: relative;">
                        🔔
                        ${g>0?'<span style="position: absolute; top: 0; right: 0; width: 8px; height: 8px; background: red; border-radius: 50%;"></span>':""}
                    </button>
                    <div id="adminNotifications" class="notifications-dropdown">
                        <div class="notification-item unread"><strong>System</strong><br>Dashboard ready.</div>
                        ${g>0?`<div class="notification-item unread"><strong>Alert</strong><br>${g} items low stock.</div>`:""}
                    </div>
                </div>
            </div>
        </div>

        <div class="quick-actions-grid">
            ${a?`<div class="action-card" onclick="window.toggleAdminModal(true, 'addProduct')"><div class="action-icon">➕</div><div>Add Product</div></div>`:""}
            ${n?`<div class="action-card" onclick="window.toggleAdminModal(true, 'addStaff')"><div class="action-icon">👤</div><div>Add Staff</div></div>`:""}
            <div class="action-card" onclick="window.switchAdminTab('products')"><div class="action-icon">📦</div><div>Inventory</div></div>
            <div class="action-card" onclick="window.switchAdminTab('orders')"><div class="action-icon">📄</div><div>Orders</div></div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <div><div class="stat-title">Total Sales</div><div class="stat-value">${y(s)}</div></div>
                    <div class="stat-icon" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">💰</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <div><div class="stat-title">New Orders</div><div class="stat-value">${d}</div></div>
                    <div class="stat-icon" style="background: rgba(6, 182, 212, 0.1); color: #06b6d4;">📄</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <div><div class="stat-title">Low Stock</div><div class="stat-value">${g}</div></div>
                    <div class="stat-icon" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e;">⚠️</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <div><div class="stat-title">Active Customers</div><div class="stat-value">${b}</div></div>
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">👥</div>
                </div>
            </div>
        </div>

        <div class="charts-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
            <div class="chart-card">
                <h3 class="font-bold text-slate-800 mb-4">Revenue vs Target</h3>
                <div style="height: 280px;"><canvas id="revenueChart"></canvas></div>
            </div>
            <div class="chart-card">
                <h3 class="font-bold text-slate-800 mb-4">Sales by Category</h3>
                <div style="height: 280px; display: flex; justify-content: center;"><canvas id="categoryChart"></canvas></div>
            </div>
            <div class="chart-card">
                <h3 class="font-bold text-slate-800 mb-4">Top 5 Products</h3>
                <div style="height: 280px;"><canvas id="topProductsChart"></canvas></div>
            </div>
            <div class="chart-card">
                <h3 class="font-bold text-slate-800 mb-4">Customer Insights</h3>
                <div style="height: 280px;"><canvas id="customersChart"></canvas></div>
            </div>
        </div>

        <div class="table-card">
            <h3 class="font-bold text-slate-800 mb-4">Recent Orders</h3>
            <table class="admin-table">
                <thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
                <tbody>
                    ${h.map(x=>`
                        <tr>
                            <td>#${x.orderId}</td>
                            <td>${new Date(x.createdAt).toLocaleDateString()}</td>
                            <td>${t.users.find(p=>p.id===x.userId)?.name||"Unknown"}</td>
                            <td>${y(x.total)}</td>
                            <td><span class="status-badge status-${x.status?.toLowerCase()||"pending"}">${x.status||"Pending"}</span></td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `,c=()=>{const{productSearch:x,productCategoryFilter:p,productSortBy:w,productSortOrder:A}=window.adminState,O=[...new Set(t.products.map(k=>k.category))].sort(),D=k=>{const L={Microcontrollers:"MIC",Sensors:"SEN",Components:"COM",Robotics:"ROB","Cables & Wires":"CAB","3D Printing":"3DP",Power:"PWR",Displays:"DIS",Modules:"MOD"}[k.category]||k.category?.substring(0,3).toUpperCase()||"GEN",R=(k._id||k.id||"").toString().slice(-4).toUpperCase();return`LUM-${L}-${R}`};let B=t.products.filter(k=>{const z=x.toLowerCase(),L=D(k).toLowerCase(),R=x===""||k.name.toLowerCase().includes(z)||(k._id||k.id).toString().toLowerCase().includes(z)||L.includes(z),re=p==="all"||k.category===p;return R&&re});w&&(B=[...B].sort((k,z)=>{let L=0;switch(w){case"price":L=k.price-z.price;break;case"stock":L=k.stock-z.stock;break;case"status":L=(z.stock>0?1:0)-(k.stock>0?1:0);break}return A==="asc"?L:-L}));const F=k=>w!==k?"⇅":A==="asc"?"↑":"↓",q=k=>w===k?"color: #3b82f6; font-weight: 600;":"";return`
        <div class="admin-page-header">
            <h1 class="admin-title">Product Management</h1>
            ${a?`<button class="btn btn-primary" onclick="window.toggleAdminModal(true, 'addProduct')">+ Add Product</button>`:""}
        </div>
        
        <!-- Search and Filter Bar -->
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; align-items: center;">
            <div style="flex: 1; min-width: 250px; position: relative;">
                <input 
                    type="text" 
                    class="form-input" 
                    placeholder="Search products by name or SKU..." 
                    value="${x}"
                    oninput="window.handleProductSearch(event)"
                    style="padding-left: 2.5rem; width: 100%;"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%);">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
            <div style="min-width: 180px;">
                <select 
                    class="form-input" 
                    onchange="window.handleProductCategoryFilter(event)"
                    style="width: 100%; cursor: pointer;"
                >
                    <option value="all" ${p==="all"?"selected":""}>All Categories</option>
                    ${O.map(k=>`
                        <option value="${k}" ${p===k?"selected":""}>${k}</option>
                    `).join("")}
                </select>
            </div>
            ${x||p!=="all"||w?`
                <button class="btn btn-outline" onclick="window.clearProductFilters()" style="white-space: nowrap;">
                    ✕ Clear Filters
                </button>
            `:""}
        </div>
        
        <!-- Results count -->
        <div style="margin-bottom: 0.75rem; color: #64748b; font-size: 0.875rem;">
            Showing ${B.length} of ${t.products.length} products
            ${x?` matching "${x}"`:""}
            ${p!=="all"?` in ${p}`:""}
        </div>
        
        <div class="admin-table-container">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th onclick="window.handleProductSort('price')" style="cursor: pointer; user-select: none; ${q("price")}">
                            Price <span style="font-size: 0.75rem; opacity: 0.7;">${F("price")}</span>
                        </th>
                        <th onclick="window.handleProductSort('stock')" style="cursor: pointer; user-select: none; ${q("stock")}">
                            Stock <span style="font-size: 0.75rem; opacity: 0.7;">${F("stock")}</span>
                        </th>
                        <th onclick="window.handleProductSort('status')" style="cursor: pointer; user-select: none; ${q("status")}">
                            Status <span style="font-size: 0.75rem; opacity: 0.7;">${F("status")}</span>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${B.length>0?B.map(k=>`
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <img src="${k.image}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                                    <div>
                                        <div style="font-weight: 500;">${k.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">SKU: ${D(k)}</div>
                                    </div>
                                </div>
                            </td>
                            <td>${k.category}</td>
                            <td>${y(k.price)}</td>
                            <td>${k.stock}</td>
                            <td><span class="status-badge ${k.stock>0?"status-instock":"status-outofstock"}">${k.stock>0?"In Stock":"Out of Stock"}</span></td>
                            <td>
                                ${a?`<button class="btn-ghost" onclick="window.toggleAdminModal(true, 'editProduct', '${k._id||k.id}')">✏️</button>`:""}
                                ${l?`<button class="btn-ghost" style="color: var(--danger);" onclick="window.handleDeleteProduct('${k._id||k.id}', '${k.name.replace(/'/g,"\\'")}')">🗑️</button>`:""}
                            </td>
                        </tr>
                    `).join(""):`
                        <tr>
                            <td colspan="6" style="text-align: center; padding: 3rem; color: #64748b;">
                                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
                                No products found${x?` matching "${x}"`:""}${p!=="all"?` in ${p}`:""}
                            </td>
                        </tr>
                    `}
                </tbody>
            </table>
        </div>
    `},$=()=>{const x=[...t.orders].sort((p,w)=>new Date(w.createdAt)-new Date(p.createdAt));return`
        <div class="admin-page-header">
            <h1 class="admin-title">Order Management</h1>
            <div style="display: flex; gap: 0.5rem;">
                <span class="status-badge status-pending">${t.orders.filter(p=>p.status==="Pending").length} Pending</span>
                <span class="status-badge status-processing">${t.orders.filter(p=>p.status==="Processing").length} Processing</span>
            </div>
        </div>
        <div class="admin-table-container">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Delivery Address</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${x.length>0?x.map(p=>{const w=t.users.find(D=>D.id===p.userId),A=w?w.name:"Unknown";let O="No address provided";if(p.shippingInfo&&p.shippingInfo.address){const D=p.shippingInfo;O=`${D.fullName||""}<br>${D.address}, ${D.city||""}, ${D.province||""} ${D.postalCode||""}<br>📞 ${D.phone||""}`}else if(p.shippingAddress)O=p.shippingAddress;else if(w?.address?.street){const D=w.address;O=`${D.street}, ${D.barangay||""}, ${D.city||""}, ${D.province||""} ${D.postalCode||""}`}return`
                        <tr>
                            <td style="font-weight: 600; color: #3b82f6;">#${p.orderId}</td>
                            <td>${new Date(p.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <div class="admin-avatar-circle" style="width: 28px; height: 28px; font-size: 0.75rem;">${A.charAt(0).toUpperCase()}</div>
                                    <span>${A}</span>
                                </div>
                            </td>
                            <td>
                                <div style="max-width: 200px;">
                                    ${p.items.map(D=>`
                                        <div style="font-size: 0.8rem; color: #64748b;">
                                            ${D.quantity}x ${D.productName||"Item"}
                                        </div>
                                    `).join("")}
                                </div>
                            </td>
                            <td>
                                <div style="max-width: 180px; font-size: 0.85rem; color: #64748b;">
                                    ${O}
                                </div>
                            </td>
                            <td style="font-weight: 600;">${y(p.total)}</td>
                            <td>
                                <select 
                                    class="form-input" 
                                    style="padding: 0.4rem 0.6rem; font-size: 0.85rem; min-width: 120px;"
                                    onchange="window.handleOrderStatusUpdate('${p.orderId}', this.value)"
                                >
                                    <option value="Pending" ${p.status==="Pending"?"selected":""}>📦 Pending</option>
                                    <option value="Processing" ${p.status==="Processing"?"selected":""}>🔄 Processing</option>
                                    <option value="Completed" ${p.status==="Completed"?"selected":""}>✅ Completed</option>
                                    <option value="Cancelled" ${p.status==="Cancelled"?"selected":""}>❌ Cancelled</option>
                                </select>
                            </td>
                        </tr>
                        `}).join(""):'<tr><td colspan="7" style="text-align: center; padding: 2rem;">No orders found.</td></tr>'}
                </tbody>
            </table>
        </div>
    `},v=()=>{const x=t.users?t.users.filter(p=>["admin","staff"].includes(p.role)):[];return`
        <div class="admin-page-header">
            <h1 class="admin-title">Staff Management</h1>
            <button class="btn btn-primary" onclick="window.toggleAdminModal(true, 'addStaff')">+ Add Staff</button>
        </div>
        <div class="admin-table-container">
            <table class="admin-table">
                <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Actions</th></tr></thead>
                <tbody>
                    ${x.length>0?x.map(p=>`
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <div class="admin-avatar-circle" style="width: 36px; height: 36px; font-size: 0.875rem;">${p.name.charAt(0).toUpperCase()}</div>
                                    <div style="font-weight: 500;">${p.name}</div>
                                </div>
                            </td>
                            <td><span class="status-badge status-${p.role==="admin"?"admin":"staff"}">${p.role.toUpperCase()}</span></td>
                            <td>${p.email}</td>
                            <td>
                                ${p.role!=="admin"?`
                                    <button class="btn-ghost" onclick="window.handleEditStaff('${p.id}')">✏️</button>
                                    <button class="btn-ghost" style="color: var(--danger);" onclick="window.handleDeleteStaff('${p.id}', '${p.name.replace(/'/g,"\\'")}')">🗑️</button>
                                `:'<span style="color: #94a3b8; font-size: 0.875rem;">Protected</span>'}
                            </td>
                        </tr>
                    `).join(""):'<tr><td colspan="4" style="text-align: center; padding: 2rem;">No staff members found.</td></tr>'}
                </tbody>
            </table>
        </div>
    `},I=()=>{if(!window.adminState.isModalOpen)return"";let x="",p="";if(window.adminState.modalType==="addProduct"||window.adminState.modalType==="editProduct"){const w=window.adminState.editingId?t.products.find(A=>String(A._id||A.id)===String(window.adminState.editingId)):null;x=w?"Edit Product":"Add New Product",p=`
                <form onsubmit="window.handleSaveProduct(event)">
                    <div class="modal-body-grid">
                        <div class="modal-left-col">
                            <div class="form-group">
                                <label class="form-label">Product Name</label>
                                <input type="text" name="name" class="form-input" required placeholder="e.g. Arduino Uno" value="${w?w.name:""}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Category</label>
                                <select name="category" class="form-input">
                                    <option ${w?.category==="Microcontrollers"?"selected":""}>Microcontrollers</option>
                                    <option ${w?.category==="Sensors"?"selected":""}>Sensors</option>
                                    <option ${w?.category==="Components"?"selected":""}>Components</option>
                                    <option ${w?.category==="Robotics"?"selected":""}>Robotics</option>
                                </select>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div class="form-group">
                                    <label class="form-label">Price</label>
                                    <input type="number" name="price" step="0.01" class="form-input" required placeholder="0.00" value="${w?w.price:""}">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Stock</label>
                                    <input type="number" name="stock" class="form-input" required placeholder="0" value="${w?w.stock:""}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Description</label>
                                <textarea name="description" class="form-input" rows="4">${w?.description||""}</textarea>
                            </div>
                        </div>
                        
                        <div class="modal-right-col">
                            <label class="form-label">Product Image</label>
                            ${w&&w.image&&!window.adminState.uploadedImage?`
                                <div class="image-preview-area" style="display: block;" id="currentImagePreview">
                                    <img src="${w.image}" alt="Current Image">
                                </div>
                                <button type="button" class="btn btn-secondary" style="width: 100%; margin-top: 0.75rem;" onclick="document.getElementById('dropZone').style.display='flex'; document.getElementById('currentImagePreview').style.display='none'; this.style.display='none';">Change Image</button>
                                <div class="image-upload-container" id="dropZone" 
                                    ondragover="window.handleDragOver(event)" 
                                    ondragleave="window.handleDragLeave(event)" 
                                    ondrop="window.handleDrop(event)"
                                    style="display: none;">
                                    <div class="upload-icon">☁️</div>
                                    <p style="margin-bottom: 1rem; color: #64748b;">Upload new image</p>
                                    <button type="button" class="btn btn-secondary" onclick="document.getElementById('fileInput').click()">Select files from system</button>
                                    <input type="file" id="fileInput" hidden accept="image/png, image/jpeg" onchange="window.handleImageSelect(event)">
                                    <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #94a3b8;">Max 3MB, JPEG/PNG</p>
                                </div>
                            `:`
                                <div class="image-upload-container" id="dropZone" 
                                    ondragover="window.handleDragOver(event)" 
                                    ondragleave="window.handleDragLeave(event)" 
                                    ondrop="window.handleDrop(event)"
                                    style="display: ${window.adminState.uploadedImage?"none":"flex"};">
                                    <div class="upload-icon">☁️</div>
                                    <p style="margin-bottom: 1rem; color: #64748b;">Drag and drop image here or</p>
                                    <button type="button" class="btn btn-secondary" onclick="document.getElementById('fileInput').click()">Select files from system</button>
                                    <input type="file" id="fileInput" hidden accept="image/png, image/jpeg" onchange="window.handleImageSelect(event)">
                                    <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #94a3b8;">Max 3MB, JPEG/PNG</p>
                                </div>
                            `}
                            <div id="imagePreview" class="image-preview-area" style="display: ${window.adminState.uploadedImage?"block":"none"};">
                                <img id="previewImg" src="${window.adminState.uploadedImage||""}" alt="Preview">
                                <button type="button" class="remove-image-btn" onclick="window.removeImage()">×</button>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn-cancel" onclick="window.toggleAdminModal(false)">Cancel</button>
                        <button type="submit" class="btn btn-primary">${w?"Update Product":"Add Product"}</button>
                    </div>
                </form>
            `}else if(window.adminState.modalType==="addStaff"||window.adminState.modalType==="editStaff"){const w=window.adminState.editingId?t.users.find(A=>String(A.id)===String(window.adminState.editingId)||A._id===window.adminState.editingId):null;x=w?"Edit Staff Member":"Add Staff Member",p=`
                <form onsubmit="window.handleSaveStaff(event)">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" name="name" class="form-input" required value="${w?w.name:""}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" name="email" class="form-input" required value="${w?w.email:""}">
                    </div>
                    ${w?"":`
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" name="password" class="form-input" required>
                    </div>
                    `}
                    <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1rem;">Role: <strong>Staff</strong></p>
                    <div class="modal-footer">
                        <button type="button" class="btn-cancel" onclick="window.toggleAdminModal(false)">Cancel</button>
                        <button type="submit" class="btn btn-primary">${w?"Update Staff":"Add Staff"}</button>
                    </div>
                </form>
            `}return`
            <div class="modal-overlay active" onclick="if(event.target === this) window.toggleAdminModal(false)">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 style="margin: 0;">${x}</h2>
                        <button class="close-modal" onclick="window.toggleAdminModal(false)" style="font-size: 2rem; line-height: 1; cursor: pointer;">&times;</button>
                    </div>
                    ${p}
                </div>
            </div>
        `};return`
        <div class="admin-wrapper">
            <header class="admin-custom-header">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 2rem;">
                    <div class="admin-logo">Lumina <span style="color: #F97316;">Electronics</span></div>
                    <div class="admin-profile-header">
                        <div class="admin-avatar-circle">${t.currentUser.name.charAt(0).toUpperCase()}</div>
                        <span class="admin-role-text">${t.currentUser.role.toUpperCase()}</span>
                    </div>
                </div>
            </header>

            <div class="admin-container">
                ${f()}
                <main class="admin-main">
                    ${e==="dashboard"?m():""}
                    ${e==="products"?c():""}
                    ${e==="orders"?$():""}
                    ${e==="staff"?v():""}
                </main>
            </div>
            ${I()}
            ${window.adminState.showConfirmModal?`
                <div class="modal-overlay active" onclick="if(event.target === this) window.hideConfirmModal()">
                    <div class="modal-content" style="max-width: 420px; text-align: center; background: #ffffff; border: none; padding: 2rem; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.15);">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(239, 68, 68, 0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3,6 5,6 21,6"></polyline>
                                <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </div>
                        <h2 style="margin: 0 0 0.75rem; color: #0F172A; font-size: 1.35rem; font-weight: 600;">${window.adminState.confirmTitle}</h2>
                        <p style="color: #64748b; margin: 0 0 0.5rem; font-size: 0.95rem;">${window.adminState.confirmMessage}</p>
                        <p style="color: #F97316; font-weight: 600; margin: 0 0 1.75rem; font-size: 1rem;">"${window.adminState.confirmItemName}"?</p>
                        <div style="display: flex; gap: 1rem; justify-content: center;">
                            <button type="button" style="flex: 1; padding: 0.85rem 1.5rem; background: #f1f5f9; color: #0F172A; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 0.95rem; transition: all 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'" onclick="window.hideConfirmModal()">Cancel</button>
                            <button type="button" style="flex: 1; padding: 0.85rem 1.5rem; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 0.95rem; transition: all 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#002b5b'" onclick="window.executeConfirmAction()">Delete</button>
                        </div>
                    </div>
                </div>
            `:""}
            
            <!-- Floating Home Button for Mobile -->
            <button class="admin-floating-home-btn" onclick="window.navigate('home')" title="Back to Home">
                🏠
            </button>
        </div>
    `};window.initAdminCharts=()=>{const t=window.state?.orders||[],e=window.state?.products||[];window.state?.users;const i=s=>["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][new Date(s).getMonth()],r=document.getElementById("revenueChart");if(r){window.revenueChartInstance&&window.revenueChartInstance.destroy();const s={},d=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];d.forEach(f=>s[f]=0),t.forEach(f=>{if(f.createdAt&&f.total){const m=i(f.createdAt);s[m]+=f.total}});const g=d.map(f=>s[f]),b=g.reduce((f,m)=>f+m,0)/g.filter(f=>f>0).length||1e3,h=d.map(()=>b*1.2);window.revenueChartInstance=new Chart(r,{type:"bar",data:{labels:d,datasets:[{label:"Revenue",data:g,backgroundColor:"rgba(59, 130, 246, 0.8)",borderRadius:4,order:2},{label:"Target",data:h,type:"line",borderColor:"#F97316",borderWidth:2,borderDash:[5,5],fill:!1,tension:0,pointRadius:0,order:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0}}},scales:{y:{beginAtZero:!0,grid:{borderDash:[2,4]}},x:{grid:{display:!1}}}}})}const a=document.getElementById("categoryChart");if(a){window.categoryChartInstance&&window.categoryChartInstance.destroy();const s={};t.forEach(h=>{h.items&&h.items.forEach(f=>{const c=e.find(v=>v.id===f.productId||v._id===f.productId)?.category||f.category||"Other",$=(f.price||0)*(f.quantity||1);s[c]=(s[c]||0)+$})});const d=Object.keys(s),g=Object.values(s),b=["#0F172A","#3b82f6","#F97316","#10b981","#8b5cf6","#ec4899"];d.length===0&&(d.push("Microcontrollers","Sensors","Components","Robotics"),g.push(4500,3200,2100,1800)),window.categoryChartInstance=new Chart(a,{type:"doughnut",data:{labels:d,datasets:[{data:g,backgroundColor:b.slice(0,d.length),borderWidth:0,hoverOffset:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"right",labels:{usePointStyle:!0,padding:15}}},cutout:"60%"}})}const n=document.getElementById("topProductsChart");if(n){window.topProductsChartInstance&&window.topProductsChartInstance.destroy();const s={};t.forEach(g=>{g.items&&g.items.forEach(b=>{const h=b.productName||b.name||"Unknown",f=(b.price||0)*(b.quantity||1);s[h]=(s[h]||0)+f})});let d=Object.entries(s).sort((g,b)=>b[1]-g[1]).slice(0,5);d.length===0&&(d=[["ESP32 DevKit",5400],["Arduino Uno",3800],["Ultrasonic Sensor",2900],["Servo Motor",2400],["Jumper Wires",1800]]),window.topProductsChartInstance=new Chart(n,{type:"bar",data:{labels:d.map(g=>g[0]),datasets:[{label:"Revenue",data:d.map(g=>g[1]),backgroundColor:["#3b82f6","#0F172A","#F97316","#10b981","#8b5cf6"],borderRadius:4}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0,grid:{borderDash:[2,4]}},y:{grid:{display:!1}}}}})}const l=document.getElementById("customersChart");if(l){window.customersChartInstance&&window.customersChartInstance.destroy();const s={};t.forEach(v=>{v.userId&&(s[v.userId]=(s[v.userId]||0)+1)});const d=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],g={},b={},h=new Set;d.forEach(v=>{g[v]=0,b[v]=0}),[...t].sort((v,I)=>new Date(v.createdAt)-new Date(I.createdAt)).forEach(v=>{if(v.createdAt&&v.userId){const I=i(v.createdAt);h.has(v.userId)?b[I]++:(g[I]++,h.add(v.userId))}});const m=d.map(v=>g[v]),c=d.map(v=>b[v]);m.some(v=>v>0)||c.some(v=>v>0)||(m.splice(0,m.length,15,12,18,10,22,14,8,16,20,12,18,25),c.splice(0,c.length,5,8,12,15,18,20,22,24,26,28,30,32)),window.customersChartInstance=new Chart(l,{type:"bar",data:{labels:d,datasets:[{label:"New Customers",data:m,backgroundColor:"#3b82f6",borderRadius:4},{label:"Returning Customers",data:c,backgroundColor:"#10b981",borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{usePointStyle:!0}}},scales:{x:{stacked:!0,grid:{display:!1}},y:{stacked:!0,beginAtZero:!0,grid:{borderDash:[2,4]}}}}})}};const V=({state:t})=>{if(!t.currentUser)return navigate("login"),"";const e=t.orders.filter(m=>m.userId===t.currentUser.id);e.filter(m=>m.status==="Pending"||m.status==="Processing"),e.filter(m=>m.status==="Shipped"),e.filter(m=>m.status==="Delivered"||m.status==="Completed");const i=t.myCoupons||[],r=sessionStorage.getItem("userActiveTab"),a=t.params&&t.params.tab?t.params.tab:r||"profile";a&&a!==r&&sessionStorage.setItem("userActiveTab",a),window.handleProfileUpdate||(window.handleProfileUpdate=async m=>{m.preventDefault();const c=m.target,$=c.name.value.trim(),v=c.email.value.trim(),I=c.phone.value.trim(),x=c.gender.value,p=`${c.birthYear.value}-${c.birthMonth.value}-${c.birthDay.value}`;if(!$||!v||!I||!x||!c.birthYear.value||!c.birthMonth.value||!c.birthDay.value){showToast("Please fill in all fields.");return}if(/\d/.test($)){showToast("Name should not contain numbers.");return}if(!v.includes("@")){showToast("Please enter a valid email address.");return}if(!/^09\d{9}$/.test(I)){showToast("Phone number must be 11 digits and start with 09.");return}try{await api.updateProfile(t.currentUser.id,{name:$,email:v,phone:I,gender:x,birthDate:p}),window.render()}catch(w){console.error("Profile update failed:",w)}}),window.handleImageUpload||(window.handleImageUpload=async m=>{const c=m.target.files[0];if(!c)return;if(c.size>3*1024*1024){showToast("File size exceeds 3MB limit.");return}if(!["image/jpeg","image/png"].includes(c.type)){showToast("Only .JPEG and .PNG files are allowed.");return}const $=new FileReader;$.onload=async v=>{try{await api.updateAvatar(t.currentUser.id,v.target.result),render()}catch(I){console.error("Avatar upload failed:",I)}},$.readAsDataURL(c)}),window.handleAddressUpdate||(window.handleAddressUpdate=async m=>{m.preventDefault();const c=m.target,$={fullName:c.fullName.value,phone:c.phone.value,region:c.region.value,province:c.province.value,city:c.city.value,barangay:c.barangay.value,postalCode:c.postalCode.value,street:c.street.value,details:c.details.value};if(Object.values($).some(v=>!v)){showToast("Please fill in all address fields.");return}try{await api.updateAddress(t.currentUser.id,$),render()}catch(v){console.error("Address update failed:",v)}}),window.handlePasswordUpdate||(window.handlePasswordUpdate=async m=>{m.preventDefault();const c=m.target,$=c.currentPassword.value,v=c.newPassword.value,I=c.confirmPassword.value;if(v.length<6){showToast("New password must be at least 6 characters.");return}if(v!==I){showToast("New passwords do not match.");return}try{await api.changePassword(t.currentUser.id,$,v),c.reset()}catch(x){console.error("Password change failed:",x)}}),window.switchUserTab||(window.switchUserTab=m=>{sessionStorage.setItem("userActiveTab",m),document.querySelectorAll(".user-tab-content").forEach(v=>v.style.display="none");const c=document.getElementById(`user-tab-${m}`);c&&(c.style.display="block"),document.querySelectorAll(".sidebar-link").forEach(v=>v.classList.remove("active"));const $=document.querySelector(`[data-tab="${m}"]`);$&&$.classList.add("active"),window.scrollTo(0,0)}),window.switchOrderTab||(window.switchOrderTab=m=>{document.querySelectorAll(".order-status-tab").forEach(c=>c.classList.remove("active")),document.querySelector(`.order-status-tab[data-status="${m}"]`).classList.add("active"),document.querySelectorAll(".order-item").forEach(c=>{m==="All"||c.dataset.status===m?c.style.display="block":c.style.display="none"})});const n=(m,c,$)=>{let v="";for(let I=m;I<=c;I++)v+=`<option value="${I}" ${parseInt($)===I?"selected":""}>${I}</option>`;return v},l=["January","February","March","April","May","June","July","August","September","October","November","December"],s=t.currentUser.birthDate?new Date(t.currentUser.birthDate):null,d=s?s.getDate():"",g=s?s.getMonth()+1:"",b=s?s.getFullYear():"",h=t.currentUser.address||{},f=typeof h=="object"&&h!==null;return`
        <div class="user-page-wrapper">
            <div class="container">
                <div class="user-layout">
                    
                    <!-- Sidebar -->
                    <aside class="user-sidebar">
                        <div class="user-brief">
                            <div class="user-avatar-small">
                                ${t.currentUser.avatar?`<img src="${t.currentUser.avatar}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`:t.currentUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div class="user-brief-info">
                                <div class="user-name-truncate">${t.currentUser.name}</div>
                                <a href="#" onclick="window.switchUserTab('profile'); return false;" class="edit-profile-link">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 1.5L10.5 3.5L3.5 10.5H1.5V8.5L8.5 1.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    Edit Profile
                                </a>
                            </div>
                        </div>

                        <nav class="user-nav">
                            <div class="nav-group">
                                <div class="nav-header">
                                    <span class="nav-icon">👤</span>
                                    My Account
                                </div>
                                <ul class="nav-list">
                                    <li><a href="#" class="sidebar-link ${a==="profile"?"active":""}" data-tab="profile" onclick="window.switchUserTab('profile'); return false;">Profile</a></li>
                                    <li><a href="#" class="sidebar-link ${a==="address"?"active":""}" data-tab="address" onclick="window.switchUserTab('address'); return false;">Addresses</a></li>
                                    <li><a href="#" class="sidebar-link ${a==="password"?"active":""}" data-tab="password" onclick="window.switchUserTab('password'); return false;">Change Password</a></li>
                                </ul>
                            </div>
                            <div class="nav-group">
                                <div class="nav-header">
                                    <span class="nav-icon">📦</span>
                                    My Purchase
                                </div>
                                <ul class="nav-list">
                                    <li><a href="#" class="sidebar-link ${a==="orders"?"active":""}" data-tab="orders" onclick="window.switchUserTab('orders'); return false;">Order History</a></li>
                                </ul>
                            </div>
                            <div class="nav-group">
                                <div class="nav-header">
                                    <span class="nav-icon">🎟️</span>
                                    My Vouchers
                                </div>
                                <ul class="nav-list">
                                    <li><a href="#" class="sidebar-link ${a==="coupons"?"active":""}" data-tab="coupons" onclick="window.switchUserTab('coupons'); return false;">My Coupons</a></li>
                                </ul>
                            </div>
                        </nav>
                    </aside>

                    <!-- Main Content -->
                    <main class="user-content">
                        
                        <!-- 1. Profile Tab -->
                        <div id="user-tab-profile" class="user-tab-content" style="display: ${a==="profile"?"block":"none"};">
                            <div class="content-header">
                                <h1>My Profile</h1>
                                <p>Manage and protect your account</p>
                            </div>

                            <div class="profile-layout">
                                <div class="profile-form-section">
                                    <form onsubmit="window.handleProfileUpdate(event)">
                                        <div class="form-row">
                                            <label>Username</label>
                                            <div class="form-value">${t.currentUser.email.split("@")[0]}</div>
                                        </div>
                                        <div class="form-row">
                                            <label>Name</label>
                                            <input type="text" name="name" value="${t.currentUser.name}" class="form-input" required>
                                        </div>
                                        <div class="form-row">
                                            <label>Email</label>
                                            <input type="email" name="email" value="${t.currentUser.email}" class="form-input" required>
                                        </div>
                                        <div class="form-row">
                                            <label>Phone Number</label>
                                            <input type="text" name="phone" value="${t.currentUser.phone||""}" class="form-input" placeholder="09XXXXXXXXX" required>
                                        </div>
                                        <div class="form-row">
                                            <label>Gender</label>
                                            <div class="radio-group">
                                                <label class="radio-label">
                                                    <input type="radio" name="gender" value="Male" ${t.currentUser.gender==="Male"?"checked":""} required> Male
                                                </label>
                                                <label class="radio-label">
                                                    <input type="radio" name="gender" value="Female" ${t.currentUser.gender==="Female"?"checked":""}> Female
                                                </label>
                                                <label class="radio-label">
                                                    <input type="radio" name="gender" value="Other" ${t.currentUser.gender==="Other"?"checked":""}> Other
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <label>Date of Birth</label>
                                            <div class="date-selects">
                                                <select name="birthDay" class="form-select" required>
                                                    <option value="">Day</option>
                                                    ${n(1,31,d)}
                                                </select>
                                                <select name="birthMonth" class="form-select" required>
                                                    <option value="">Month</option>
                                                    ${l.map((m,c)=>`<option value="${c+1}" ${parseInt(g)===c+1?"selected":""}>${m}</option>`).join("")}
                                                </select>
                                                <select name="birthYear" class="form-select" required>
                                                    <option value="">Year</option>
                                                    ${n(1950,2024,b)}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="form-actions">
                                            <button type="submit" class="btn-save">Save</button>
                                        </div>
                                    </form>
                                </div>

                                <div class="profile-avatar-section">
                                    <div class="avatar-preview">
                                        ${t.currentUser.avatar?`<img src="${t.currentUser.avatar}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`:t.currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <input type="file" id="avatarInput" accept=".jpeg, .png, .jpg" style="display: none;" onchange="window.handleImageUpload(event)">
                                    <button class="btn-select-image" onclick="document.getElementById('avatarInput').click()">Select Image</button>
                                    <div class="avatar-help">
                                        File size: maximum 3 MB<br>
                                        File extension: .JPEG, .PNG
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2. Address Tab -->
                        <div id="user-tab-address" class="user-tab-content" style="display: ${a==="address"?"block":"none"};">
                            <div class="content-header">
                                <h1>My Addresses</h1>
                                <p>Manage your shipping addresses</p>
                            </div>
                            <form onsubmit="window.handleAddressUpdate(event)" style="max-width: 600px;">
                                <div class="form-group" style="margin-bottom: 1rem;">
                                    <label class="form-label">Full Name</label>
                                    <input type="text" name="fullName" class="form-input" value="${f&&h.fullName||""}" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1rem;">
                                    <label class="form-label">Phone Number</label>
                                    <input type="text" name="phone" class="form-input" value="${f&&h.phone||""}" placeholder="09XXXXXXXXX" required>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                                    <div class="form-group">
                                        <label class="form-label">Region</label>
                                        <input type="text" name="region" class="form-input" value="${f&&h.region||""}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Province</label>
                                        <input type="text" name="province" class="form-input" value="${f&&h.province||""}" required>
                                    </div>
                                </div>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                                    <div class="form-group">
                                        <label class="form-label">City</label>
                                        <input type="text" name="city" class="form-input" value="${f&&h.city||""}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Barangay</label>
                                        <input type="text" name="barangay" class="form-input" value="${f&&h.barangay||""}" required>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-bottom: 1rem;">
                                    <label class="form-label">Postal Code</label>
                                    <input type="text" name="postalCode" class="form-input" value="${f&&h.postalCode||""}" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1rem;">
                                    <label class="form-label">Street Name, Building, House No.</label>
                                    <input type="text" name="street" class="form-input" value="${f&&h.street||""}" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">Additional Details (Landmark, etc.)</label>
                                    <input type="text" name="details" class="form-input" value="${f&&h.details||""}">
                                </div>
                                <button type="submit" class="btn-save">Save Address</button>
                            </form>
                        </div>

                        <!-- 3. Change Password Tab -->
                        <div id="user-tab-password" class="user-tab-content" style="display: ${a==="password"?"block":"none"};">
                            <div class="content-header">
                                <h1>Change Password</h1>
                                <p>For your account's security, do not share your password with anyone else</p>
                            </div>
                            <form onsubmit="window.handlePasswordUpdate(event)" style="max-width: 400px;">
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">Current Password</label>
                                    <input type="password" name="currentPassword" class="form-input" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">New Password</label>
                                    <input type="password" name="newPassword" class="form-input" required minlength="6">
                                </div>
                                <div class="form-group" style="margin-bottom: 2rem;">
                                    <label class="form-label">Confirm Password</label>
                                    <input type="password" name="confirmPassword" class="form-input" required minlength="6">
                                </div>
                                <button type="submit" class="btn-save">Confirm</button>
                            </form>
                        </div>

                        <!-- 4. Orders Tab -->
                        <div id="user-tab-orders" class="user-tab-content" style="display: ${a==="orders"?"block":"none"};">
                            <div class="content-header">
                                <h1>My Orders</h1>
                            </div>
                            
                            <div class="orders-tabs">
                                <div class="order-status-tab active" data-status="All" onclick="window.switchOrderTab('All')">All</div>
                                <div class="order-status-tab" data-status="Pending" onclick="window.switchOrderTab('Pending')">To Ship</div>
                                <div class="order-status-tab" data-status="Shipped" onclick="window.switchOrderTab('Shipped')">To Receive</div>
                                <div class="order-status-tab" data-status="Completed" onclick="window.switchOrderTab('Completed')">Completed</div>
                            </div>

                            <div class="orders-list">
                                ${e.length>0?e.map(m=>`
                                    <div class="order-item" data-status="${m.status==="Pending"||m.status==="Processing"?"Pending":m.status==="Shipped"?"Shipped":m.status==="Delivered"?"Completed":m.status}">
                                        <div class="order-header">
                                            <span>Order ID: ${m.id||m.orderId}</span>
                                            <span class="order-status status-${m.status.toLowerCase()}">${m.status}</span>
                                        </div>
                                        <div class="order-products">
                                            ${m.items.map(c=>`
                                                <div class="order-product">
                                                    <img src="${c.image||"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22Arial%22 font-size=%2212%22%3ENo Image%3C/text%3E%3C/svg%3E"}" alt="${c.name}">
                                                    <div class="product-details">
                                                        <div class="product-name">${c.name||c.productName}</div>
                                                        <div class="product-qty">x${c.quantity}</div>
                                                    </div>
                                                    <div class="product-price">${y(c.price)}</div>
                                                </div>
                                            `).join("")}
                                        </div>
                                        <div class="order-footer">
                                            <div class="order-total">
                                                Order Total: <span>${y(m.total)}</span>
                                            </div>
                                            <div class="order-actions">
                                                <button class="btn-buy-again">Buy Again</button>
                                            </div>
                                        </div>
                                    </div>
                                `).join(""):`
                                    <div class="no-orders">
                                        <div class="no-orders-icon">📄</div>
                                        <p>No orders yet</p>
                                    </div>
                                `}
                            </div>
                        </div>

                        <!-- 5. My Coupons Tab -->
                        <div id="user-tab-coupons" class="user-tab-content" style="display: ${a==="coupons"?"block":"none"};">
                            <div class="content-header">
                                <h1>My Vouchers</h1>
                                <div style="display: flex; gap: 1rem; font-size: 0.875rem;">
                                    <a href="#" style="color: var(--primary);">Get more vouchers</a>
                                    <span style="color: #ddd;">|</span>
                                    <a href="#" style="color: var(--primary);">View voucher history</a>
                                </div>
                            </div>

                            <!-- Add Voucher Section -->
                            <div class="add-voucher-section" style="background: #f8f9fa; padding: 1rem; border-radius: 4px; display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
                                <span style="font-weight: 500; color: #333; white-space: nowrap;">Add Voucher</span>
                                <input type="text" placeholder="Please enter voucher code" style="flex: 1; min-width: 150px; padding: 0.625rem; border: 1px solid #e0e0e0; border-radius: 2px; outline: none;">
                                <button class="btn-redeem" style="background: #e0e0e0; color: #999; border: none; padding: 0.625rem 1rem; border-radius: 2px; cursor: not-allowed; white-space: nowrap;">Redeem</button>
                            </div>

                            <!-- Voucher Tabs -->
                            <div style="border-bottom: 1px solid #e0e0e0; margin-bottom: 1.5rem;">
                                <div style="display: inline-block; padding: 0.75rem 1.5rem; color: var(--primary); border-bottom: 2px solid var(--primary); font-weight: 500;">
                                    All (${i.length})
                                </div>
                            </div>

                            <!-- Vouchers List -->
                            <div class="vouchers-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
                                ${i.map(m=>`
                                    <div style="display: flex; background: white; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                                        <!-- Left Side (Image/Icon) -->
                                        <div style="width: 120px; background: ${m.color}; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 1rem; position: relative; border-right: 2px dashed white;">
                                            <div style="font-size: 2rem; font-weight: 700;">%</div>
                                            <div style="font-size: 0.75rem; margin-top: 0.25rem;">LUMINA</div>
                                            <!-- Sawtooth border effect simulation -->
                                            <div style="position: absolute; right: -6px; top: 0; bottom: 0; width: 10px; background-image: radial-gradient(circle, white 4px, transparent 5px); background-size: 10px 14px; background-repeat: repeat-y;"></div>
                                        </div>
                                        
                                        <!-- Right Side (Details) -->
                                        <div style="flex: 1; padding: 1rem; display: flex; flex-direction: column; justify-content: center;">
                                            <div style="font-size: 1rem; font-weight: 600; color: #333; margin-bottom: 0.25rem;">${m.description}</div>
                                            <div style="font-size: 0.875rem; color: #666; margin-bottom: 0.25rem;">${m.condition}</div>
                                            <div style="font-size: 0.75rem; color: #999; margin-bottom: 0.5rem;">Valid till: 31.12.2025</div>
                                            
                                            <div style="display: flex; justify-content: flex-end;">
                                                <button style="color: var(--primary); background: white; border: 1px solid var(--primary); padding: 0.25rem 0.75rem; font-size: 0.875rem; border-radius: 2px; cursor: pointer;">Use</button>
                                            </div>
                                        </div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>

        <style>
            .user-page-wrapper {
                background-color: #f5f5f5;
                min-height: calc(100vh - 64px);
                padding: 20px 0;
                font-family: 'Inter', sans-serif;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 16px;
            }
            .user-layout {
                display: flex;
                gap: 20px;
            }
            
            /* Sidebar */
            .user-sidebar {
                width: 250px;
                flex-shrink: 0;
                display: block;
            }
            .user-brief {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 0;
                border-bottom: 1px solid #efefef;
                margin-bottom: 20px;
            }
            .user-avatar-small {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: #e0e0e0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: #555;
                border: 1px solid #d0d0d0;
            }
            .user-brief-info {
                overflow: hidden;
            }
            .user-name-truncate {
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 150px;
            }
            .edit-profile-link {
                font-size: 12px;
                color: #888;
                display: flex;
                align-items: center;
                gap: 4px;
                text-decoration: none;
            }
            .edit-profile-link:hover {
                color: var(--primary);
            }
            
            .user-nav {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .nav-header {
                font-weight: 500;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #333;
            }
            .nav-list {
                list-style: none;
                padding-left: 30px;
                margin: 0;
            }
            .nav-list li {
                margin-bottom: 8px;
            }
            .sidebar-link {
                color: #666;
                text-decoration: none;
                font-size: 14px;
                display: block;
                transition: color 0.2s;
            }
            .sidebar-link:hover {
                color: var(--primary);
            }
            .sidebar-link.active {
                color: var(--accent); /* User requested accent color */
                font-weight: 500;
            }

            /* Main Content */
            .user-content {
                flex: 1;
                background: white;
                box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
                border-radius: 2px;
                padding: 30px;
                min-height: 500px;
            }
            .content-header {
                border-bottom: 1px solid #efefef;
                padding-bottom: 18px;
                margin-bottom: 24px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
            }
            .content-header h1 {
                font-size: 18px;
                font-weight: 500;
                margin: 0;
                color: #333;
            }
            .content-header p {
                font-size: 14px;
                color: #555;
                margin: 4px 0 0;
            }

            /* Forms */
            .profile-layout {
                display: flex;
                gap: 40px;
            }
            .profile-form-section {
                flex: 1;
                padding-right: 40px;
                border-right: 1px solid #efefef;
            }
            .form-row {
                display: flex;
                align-items: center;
                margin-bottom: 24px;
            }
            .form-row label {
                width: 120px;
                text-align: right;
                color: #555;
                font-size: 14px;
                margin-right: 20px;
            }
            .form-value {
                font-size: 14px;
                color: #333;
            }
            .form-input {
                flex: 1;
                padding: 8px 12px;
                border: 1px solid #e0e0e0;
                border-radius: 2px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            }
            .form-input:focus {
                border-color: #888;
            }
            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
                color: #555;
            }
            .radio-group {
                display: flex;
                gap: 16px;
            }
            .radio-label {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 14px;
                cursor: pointer;
            }
            .radio-label input[type="radio"] {
                width: 18px;
                height: 18px;
                margin: 0;
                accent-color: var(--primary);
            }
            .date-selects {
                display: flex;
                gap: 10px;
            }
            .form-select {
                padding: 8px;
                border: 1px solid #e0e0e0;
                border-radius: 2px;
                background: white;
                font-size: 14px;
            }
            .btn-save {
                background: var(--primary);
                color: white;
                border: none;
                padding: 10px 24px;
                border-radius: 2px;
                font-size: 14px;
                cursor: pointer;
                box-shadow: 0 1px 1px rgba(0,0,0,0.1);
            }
            .btn-save:hover {
                opacity: 0.9;
            }
            .form-actions {
                margin-left: 140px;
                margin-top: 30px;
            }

            /* Avatar Section */
            .profile-avatar-section {
                width: 280px;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 20px;
            }
            .avatar-preview {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: #e0e0e0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                color: #555;
                margin-bottom: 20px;
                border: 1px solid #d0d0d0;
                overflow: hidden;
            }
            .btn-select-image {
                background: white;
                border: 1px solid #ddd;
                padding: 8px 16px;
                font-size: 14px;
                color: #555;
                cursor: pointer;
                margin-bottom: 12px;
            }
            .btn-select-image:hover {
                background: #f8f8f8;
            }
            .avatar-help {
                font-size: 12px;
                color: #999;
                text-align: center;
                line-height: 1.5;
            }

            /* Orders Styles */
            .orders-tabs {
                display: flex;
                border-bottom: 1px solid #e0e0e0;
                margin-bottom: 20px;
                background: white;
            }
            .order-status-tab {
                padding: 16px 20px;
                cursor: pointer;
                font-size: 16px;
                color: #555;
                border-bottom: 2px solid transparent;
            }
            .order-status-tab.active {
                color: var(--primary);
                border-bottom-color: var(--primary);
            }
            .order-status-tab:hover {
                color: var(--primary);
            }
            .order-item {
                background: white;
                border: 1px solid #e0e0e0;
                margin-bottom: 16px;
                border-radius: 2px;
            }
            .order-header {
                padding: 12px 24px;
                border-bottom: 1px solid #f0f0f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
            }
            .order-status {
                text-transform: uppercase;
                font-weight: 500;
            }
            .order-product {
                display: flex;
                padding: 12px 24px;
                border-bottom: 1px solid #f8f8f8;
                gap: 12px;
            }
            .order-product img {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border: 1px solid #e0e0e0;
            }
            .product-details {
                flex: 1;
            }
            .product-name {
                font-size: 14px;
                margin-bottom: 4px;
            }
            .product-qty {
                color: #888;
                font-size: 13px;
            }
            .order-footer {
                padding: 16px 24px;
                background: #fffafb;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .order-total {
                font-size: 14px;
            }
            .order-total span {
                font-size: 20px;
                color: var(--primary);
                font-weight: 500;
                margin-left: 8px;
            }
            .btn-buy-again {
                background: var(--primary);
                color: white;
                border: none;
                padding: 8px 20px;
                border-radius: 2px;
                cursor: pointer;
            }

            @media (max-width: 768px) {
                .user-layout {
                    flex-direction: column;
                }
                .user-sidebar {
                    width: 100%;
                    display: none; /* Hidden on mobile for now, or use a drawer */
                }
                .profile-layout {
                    flex-direction: column-reverse;
                }
                .profile-form-section {
                    border-right: none;
                    padding-right: 0;
                }
                .form-row {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .form-row label {
                    text-align: left;
                    margin-bottom: 8px;
                }
                .form-actions {
                    margin-left: 0;
                }
                
                /* Fix radio-group wrapping */
                .radio-group {
                    flex-wrap: wrap;
                    gap: 12px 20px;
                }
                .radio-label {
                    min-width: 80px;
                }
                
                /* Fix date-selects wrapping */
                .date-selects {
                    flex-wrap: wrap;
                }
                .form-select {
                    min-width: 80px;
                }
                
                /* Fix order footer - stack Buy Again button below total */
                .order-footer {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 12px 16px;
                }
                .order-total {
                    width: 100%;
                }
                .order-actions {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                }
                
                /* Fix orders tabs horizontal scroll */
                .orders-tabs {
                    overflow-x: auto;
                    white-space: nowrap;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                }
                .orders-tabs::-webkit-scrollbar {
                    display: none;
                }
                
                /* Fix order product layout */
                .order-product {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .order-product img {
                    width: 60px;
                    height: 60px;
                }
                .product-price {
                    margin-top: 8px;
                }
                
                /* Fix user-content overflow */
                .user-content {
                    overflow-x: hidden;
                    max-width: 100vw;
                    box-sizing: border-box;
                }
            }
            
            /* Extra small mobile fixes */
            @media (max-width: 480px) {
                .order-product img {
                    width: 50px;
                    height: 50px;
                }
                .btn-buy-again {
                    width: 100%;
                    padding: 10px;
                }
            }
        </style>
    `},ue=({Breadcrumbs:t,state:e})=>{let i=[...e.products];switch(e.searchQuery&&(i=i.filter(r=>r.name.toLowerCase().includes(e.searchQuery.toLowerCase())||r.category.toLowerCase().includes(e.searchQuery.toLowerCase())||r.description.toLowerCase().includes(e.searchQuery.toLowerCase()))),e.filterCategory&&(i=i.filter(r=>r.category===e.filterCategory)),e.sortBy){case"price-asc":i.sort((r,a)=>r.price-a.price);break;case"price-desc":i.sort((r,a)=>a.price-r.price);break;case"name-asc":i.sort((r,a)=>r.name.localeCompare(a.name));break;case"name-desc":i.sort((r,a)=>a.name.localeCompare(r.name));break;case"featured":default:i.sort((r,a)=>r.id-a.id);break}return`
        <div style="padding: 2rem 0; max-width: 1200px; margin: 0 auto;">
            <!-- ... Breadcrumbs ... -->
            
            <!-- NEW FILTER BAR -->
            <div class="filter-bar">
                <div style="flex: 1; display: flex; gap: 1rem; align-items: center;">
                    <span style="font-weight: 600;">Filter By:</span>
                    <select class="filter-select" onchange="window.handleCategoryFilter(this.value)">
                        <option value="">All Categories</option>
                        <option value="Components" ${e.filterCategory==="Components"?"selected":""}>Components</option>
                        <option value="Sensors" ${e.filterCategory==="Sensors"?"selected":""}>Sensors</option>
                        <option value="Boards" ${e.filterCategory==="Boards"?"selected":""}>Boards</option>
                    </select>
                </div>
                <div class="sort-container">
                    <span class="sort-label">Sort by:</span>
                    <select class="sort-select" onchange="window.handleSort(this.value)">
                        <option value="featured" ${e.sortBy==="featured"?"selected":""}>Featured</option>
                        <option value="price-asc" ${e.sortBy==="price-asc"?"selected":""}>Price: Low to High</option>
                        <option value="price-desc" ${e.sortBy==="price-desc"?"selected":""}>Price: High to Low</option>
                    </select>
                </div>
            </div>
            <!-- ... Product Grid ... -->
             <div class="product-grid">
                ${i.map(ge).join("")}
            </div>
        </div>
    `},ge=t=>{const e=t.stock<10,i=e?"low-stock":"",r=e?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${t.id})" style="cursor: pointer;">
            <div class="product-badge ${i}">${r}</div>
            <div class="product-image">
                <img src="${t.image}" alt="${t.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${t.category}</div>
                <h3 class="product-title">${t.name}</h3>
                <div class="product-price">${y(t.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${t.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},ve=({Breadcrumbs:t,state:e})=>{const i=e.products.find(l=>l.id===e.currentProductId);if(!i)return navigate("home"),"";i.stock<10;const r=i.stock>0?"In Stock":"Out of Stock",a=i.stock>0?"var(--success)":"var(--danger)",n=e.products.filter(l=>l.id!==i.id).sort(()=>.5-Math.random()).slice(0,4);return`
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
                    <div class="detail-price">${y(i.price)}</div>

                    <div class="detail-section">
                        <span class="detail-label">Description</span>
                        <p style="color: var(--text-muted); line-height: 1.6;">${i.description}</p>
                    </div>

                    <div class="detail-section">
                        <span class="detail-label">Quantity</span>
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="window.adjustDetailQty(-1)">-</button>
                            <input type="number" id="detailQty" class="qty-input" value="1" min="1" max="${i.stock}" oninput="window.handleDetailQtyInput(this)" onblur="window.handleDetailQtyBlur(this)">
                            <button class="qty-btn" onclick="window.adjustDetailQty(1)">+</button>
                        </div>
                    </div>

                    <button class="btn-add-large" onclick="window.addToCartFromDetail(${i.id})">
                        Add To Cart
                    </button>

                    <div class="stock-status" style="color: ${a}">
                        <span class="stock-dot" style="background-color: ${a}"></span>
                        ${r} (${i.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${n.map(W).join("")}
                </div>
            </div>
        </div>
    `},W=t=>{const e=t.stock<10,i=e?"low-stock":"",r=e?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${t.id})" style="cursor: pointer;">
            <div class="product-badge ${i}">${r}</div>
            <div class="product-image">
                <img src="${t.image}" alt="${t.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${t.category}</div>
                <h3 class="product-title">${t.name}</h3>
                <div class="product-price">${y(t.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${t.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},Y=({state:t})=>t.currentUser?(window.handleAdminProfileUpdate||(window.handleAdminProfileUpdate=async e=>{e.preventDefault();const i=e.target,r=i.name.value.trim(),a=i.email.value.trim(),n=i.phone.value.trim();if(!r||!a||!n){showToast("Please fill in all fields.");return}if(/\d/.test(r)){showToast("Name should not contain numbers.");return}if(!a.includes("@")){showToast("Please enter a valid email address.");return}if(!/^09\d{9}$/.test(n)){showToast("Phone number must be 11 digits and start with 09.");return}try{await window.api.updateProfile(t.currentUser.id,{name:r,email:a,phone:n}),window.render()}catch(l){console.error("Profile update failed:",l)}}),window.handleAdminPasswordUpdate||(window.handleAdminPasswordUpdate=async e=>{e.preventDefault();const i=e.target,r=i.currentPassword.value,a=i.newPassword.value,n=i.confirmPassword.value;if(a.length<6){showToast("New password must be at least 6 characters.");return}if(a!==n){showToast("New passwords do not match.");return}try{await window.api.changePassword(t.currentUser.id,r,a),i.reset()}catch(l){console.error("Password change failed:",l)}}),window.switchAdminProfileTab||(window.switchAdminProfileTab=e=>{document.querySelectorAll(".admin-tab-content").forEach(a=>a.style.display="none");const i=document.getElementById(`admin-tab-${e}`);i&&(i.style.display="block"),document.querySelectorAll(".admin-sidebar-link").forEach(a=>a.classList.remove("active"));const r=document.querySelector(`[data-tab="${e}"]`);r&&r.classList.add("active"),window.scrollTo(0,0)}),`
        <div class="user-page-wrapper">
            <div class="container">
                <div class="user-layout">
                    
                    <!-- Sidebar -->
                    <aside class="user-sidebar">
                        <div class="user-brief">
                            <div class="user-avatar-small">
                                ${t.currentUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div class="user-brief-info">
                                <div class="user-name-truncate">${t.currentUser.name}</div>
                                <a href="#" onclick="window.switchAdminProfileTab('profile'); return false;" class="edit-profile-link">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 1.5L10.5 3.5L3.5 10.5H1.5V8.5L8.5 1.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    Edit Profile
                                </a>
                            </div>
                        </div>
                        <nav class="user-nav">
                            <div class="nav-group">
                                <div class="nav-header">
                                    <span class="nav-icon">👤</span>
                                    My Profile
                                </div>
                                <ul class="nav-list">
                                    <li><a href="#" class="admin-sidebar-link active" data-tab="profile" onclick="window.switchAdminProfileTab('profile'); return false;">Profile</a></li>
                                    <li><a href="#" class="admin-sidebar-link" data-tab="password" onclick="window.switchAdminProfileTab('password'); return false;">Change Password</a></li>
                                </ul>
                            </div>
                        </nav>
                    </aside>
                    <!-- Main Content -->
                    <main class="user-content">
                        
                        <!-- Profile Tab -->
                        <div id="admin-tab-profile" class="admin-tab-content">
                            <div class="content-header">
                                <h1>My Profile</h1>
                                <p>Manage your admin account information</p>
                            </div>
                            <form onsubmit="window.handleAdminProfileUpdate(event)" style="max-width: 600px;">
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">Name</label>
                                    <input type="text" name="name" value="${t.currentUser.name}" class="form-input" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" value="${t.currentUser.email}" class="form-input" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 2rem;">
                                    <label class="form-label">Phone Number</label>
                                    <input type="text" name="phone" value="${t.currentUser.phone||""}" class="form-input" placeholder="09XXXXXXXXX" required>
                                </div>
                                <button type="submit" class="btn-save">Save Changes</button>
                            </form>
                        </div>
                        <!-- Change Password Tab -->
                        <div id="admin-tab-password" class="admin-tab-content" style="display: none;">
                            <div class="content-header">
                                <h1>Change Password</h1>
                                <p>Update your account password</p>
                            </div>
                            <form onsubmit="window.handleAdminPasswordUpdate(event)" style="max-width: 400px;">
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">Current Password</label>
                                    <input type="password" name="currentPassword" class="form-input" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">New Password</label>
                                    <input type="password" name="newPassword" class="form-input" required minlength="6">
                                </div>
                                <div class="form-group" style="margin-bottom: 2rem;">
                                    <label class="form-label">Confirm Password</label>
                                    <input type="password" name="confirmPassword" class="form-input" required minlength="6">
                                </div>
                                <button type="submit" class="btn-save">Change Password</button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
        <style>
            /* Reuse UserPage styles */
            .user-page-wrapper {
                background-color: #f5f5f5;
                min-height: calc(100vh - 64px);
                padding: 20px 0;
                font-family: 'Inter', sans-serif;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 16px;
            }
            .user-layout {
                display: flex;
                gap: 20px;
            }
            
            .user-sidebar {
                width: 250px;
                flex-shrink: 0;
            }
            .user-brief {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 0;
                border-bottom: 1px solid #efefef;
                margin-bottom: 20px;
            }
            .user-avatar-small {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: #e0e0e0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: #555;
                border: 1px solid #d0d0d0;
            }
            .user-brief-info {
                overflow: hidden;
            }
            .user-name-truncate {
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 150px;
            }
            .edit-profile-link {
                font-size: 12px;
                color: #888;
                display: flex;
                align-items: center;
                gap: 4px;
                text-decoration: none;
            }
            .edit-profile-link:hover {
                color: var(--primary);
            }
            
            .user-nav {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .nav-header {
                font-weight: 500;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #333;
            }
            .nav-list {
                list-style: none;
                padding-left: 30px;
                margin: 0;
            }
            .nav-list li {
                margin-bottom: 8px;
            }
            .admin-sidebar-link {
                color: #666;
                text-decoration: none;
                font-size: 14px;
                display: block;
                transition: color 0.2s;
            }
            .admin-sidebar-link:hover {
                color: var(--primary);
            }
            .admin-sidebar-link.active {
                color: var(--accent);
                font-weight: 500;
            }
            .user-content {
                flex: 1;
                background: white;
                box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
                border-radius: 2px;
                padding: 30px;
                min-height: 500px;
            }
            .content-header {
                border-bottom: 1px solid #efefef;
                padding-bottom: 18px;
                margin-bottom: 24px;
            }
            .content-header h1 {
                font-size: 18px;
                font-weight: 500;
                margin: 0;
                color: #333;
            }
            .content-header p {
                font-size: 14px;
                color: #555;
                margin: 4px 0 0;
            }
            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
                color: #555;
            }
            .form-input {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid #e0e0e0;
                border-radius: 2px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            }
            .form-input:focus {
                border-color: #888;
            }
            .btn-save {
                background: var(--primary);
                color: white;
                border: none;
                padding: 10px 24px;
                border-radius: 2px;
                font-size: 14px;
                cursor: pointer;
                box-shadow: 0 1px 1px rgba(0,0,0,0.1);
            }
            .btn-save:hover {
                opacity: 0.9;
            }
        </style>
    `):(navigate("login"),""),o={products:[],users:[],orders:[],currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:sessionStorage.getItem("currentRoute")||"home",params:{},mobileMenuOpen:!1,searchQuery:"",showSuggestions:!1,searchSuggestions:[],currentProductId:null,devices:[],currentDeviceId:null,esp32Client:null,deviceStatus:{},telemetryData:{},sortBy:"featured",filterCategory:null,cartSearchQuery:"",isLoading:!1,cartSynced:!1,myCoupons:null,checkoutData:{shipping:{fullName:"",address:"",city:"",province:"",postalCode:"",phone:"",instructions:""},paymentMethod:"cod",shippingFee:50},lastOrderId:null};window.state=o;const M={getProducts:async()=>{try{const t=await S("/products");o.products=t.data,C()}catch(t){console.error("Failed to load products:",t),u("Failed to load products")}},login:async(t,e)=>{console.log("Calling API login...");try{const i=await S("/users/login",{method:"POST",body:JSON.stringify({email:t,password:e})});o.currentUser=i.data,localStorage.setItem("currentUser",JSON.stringify(o.currentUser)),await U.getMyDevices(),await fe(),await M.getMyOrders(),u(`Welcome back, ${o.currentUser.name}!`),P("home")}catch(i){throw u(i.message||"Login failed"),i}},register:async(t,e,i)=>{try{const r=await S("/users/register",{method:"POST",body:JSON.stringify({name:t,email:e,password:i})});o.currentUser=r.data,localStorage.setItem("currentUser",JSON.stringify(o.currentUser)),u("Account created successfully!"),P("home")}catch(r){throw u(r.message||"Registration failed"),r}},createOrder:async t=>{try{const e=await S("/orders",{method:"POST",body:JSON.stringify(t)});return o.cart=[],T(),u("Order placed successfully!"),o.currentUser.role==="admin"&&M.getOrders(),e.data}catch(e){throw u(e.message||"Failed to place order"),e}},getOrders:async()=>{if(!(!o.currentUser||!["admin","staff"].includes(o.currentUser.role)))try{const t=await S("/orders");o.orders=t.data,C()}catch(t){console.error("Failed to load orders:",t)}},getMyOrders:async()=>{if(o.currentUser)try{const t=await S(`/orders/my-orders?userId=${o.currentUser.id}`);o.orders=t.data,C()}catch(t){console.error("Failed to load orders:",t)}},getUsers:async()=>{if(!(!o.currentUser||!["admin","staff"].includes(o.currentUser.role)))try{const t=await S("/users");o.users=t.data,C()}catch(t){console.error("Failed to load users:",t)}},updateProfile:async(t,e)=>{try{const i=await S(`/users/${t}/profile`,{method:"PUT",body:JSON.stringify(e)});return o.currentUser=i.data,localStorage.setItem("currentUser",JSON.stringify(i.data)),window.showToast("Profile updated successfully!"),i.data}catch(i){throw window.showToast(i.message||"Failed to update profile"),i}},updateAddress:async(t,e)=>{try{const i=await S(`/users/${t}/address`,{method:"PUT",body:JSON.stringify(e)});return o.currentUser=i.data,localStorage.setItem("currentUser",JSON.stringify(i.data)),window.showToast("Address saved successfully!"),i.data}catch(i){throw window.showToast(i.message||"Failed to save address"),i}},changePassword:async(t,e,i)=>{try{await S(`/users/${t}/password`,{method:"PUT",body:JSON.stringify({currentPassword:e,newPassword:i})}),window.showToast("Password changed successfully!")}catch(r){throw window.showToast(r.message||"Failed to change password"),r}},updateAvatar:async(t,e)=>{try{const i=await S(`/users/${t}/avatar`,{method:"PUT",body:JSON.stringify({avatar:e})});return o.currentUser=i.data,localStorage.setItem("currentUser",JSON.stringify(i.data)),window.showToast("Profile image saved!"),i.data}catch(i){throw window.showToast(i.message||"Failed to save profile image"),i}},claimCoupon:async t=>{if(!(o.currentUser&&["admin","staff"].includes(o.currentUser.role))){if(!o.currentUser){u("Please login to claim coupons"),window.openLoginModal();return}try{const e=await S("/coupons/claim",{method:"POST",body:JSON.stringify({userId:o.currentUser.id,couponCode:t})});return u("Coupon claimed successfully! 🎉"),e.data}catch(e){throw u(e.message||"Failed to claim coupon"),e}}},getMyCoupons:async()=>{if(o.currentUser)try{const t=await S(`/coupons/my-coupons?userId=${o.currentUser.id}`);o.myCoupons=t.data,C()}catch(t){console.error("Failed to load coupons:",t)}}};window.api=M;const U={getMyDevices:async()=>{if(o.currentUser)try{const t=await S(`/devices/my-devices?userId=${o.currentUser.id}`);o.devices=t.data,he(),C()}catch(t){console.error("Failed to load devices:",t),u("Failed to load devices")}},pairDevice:async(t,e)=>{try{const i=await S("/devices/pair",{method:"POST",body:JSON.stringify({deviceId:t,deviceToken:e,userId:o.currentUser.id})});u("Device paired successfully!"),await U.getMyDevices(),P("my-devices")}catch(i){throw u(i.message||"Device pairing failed"),i}}};let X=!1;function he(){o.esp32Client||(o.esp32Client=new ESP32SocketClient),X||(X=!0,o.esp32Client.on("device:status",t=>{if(console.log("📊 Device status update received:",t),o.deviceStatus[t.deviceId]=t,o.devices&&o.devices.length>0){const e=o.devices.findIndex(i=>i.deviceId===t.deviceId);e!==-1&&(o.devices[e].status=t.status==="online"?"active":"offline",o.devices[e].lastOnline=t.timestamp,console.log(`✅ Updated device ${t.deviceId} status to: ${t.status}`))}(o.route==="my-devices"||o.route==="remote-control")&&C()})),!o.esp32Client.isConnected()&&o.currentUser&&o.esp32Client.connect(o.currentUser.id).then(()=>{console.log("📡 Connected to WebSocket - server will auto-send device status")}).catch(t=>{console.error("Failed to connect to WebSocket:",t)})}const T=()=>{localStorage.setItem("currentUser",JSON.stringify(o.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(o.cart))},fe=async()=>{if(!(!o.currentUser||o.cartSynced))try{const t=await S(`/users/${o.currentUser.id}/cart/sync`,{method:"POST",body:JSON.stringify({localCart:o.cart})});o.cart=t.data.map(e=>({id:e.productId,name:e.name,price:e.price,image:e.image,quantity:e.quantity,category:e.category,selected:e.selected})),o.cartSynced=!0,T(),C(),u("Cart synced!")}catch(t){console.error("Cart sync failed:",t)}},P=(t,e={})=>{o.route=t,o.params=e,o.mobileMenuOpen=!1,sessionStorage.setItem("currentRoute",t),C(),window.scrollTo(0,0)};window.navigate=P;const u=t=>{const e=document.createElement("div");e.className="toast",e.textContent=t,document.body.appendChild(e),setTimeout(()=>e.classList.add("show"),100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.remove(),300)},3e3)};window.showToast=u;const E=t=>`
        <div class="breadcrumbs">
            <a href="#" onclick="window.navigate('home'); return false;">Home</a>
            <span class="breadcrumb-separator">›</span>
            <span>${{deals:"Deals",learn:"Learn","my-devices":"My Devices","device-pair":"Pair Device","remote-control":"Remote Control","about-us":"About Us","contact-us":"Contact Us",products:"Products",cart:"Cart",checkout:"Checkout"}[t]||t}</span>
        </div>
    `,H=()=>{const t=o.currentUser!==null;o.currentUser?.role;const e=["admin","staff"].includes(o.currentUser?.role),i=o.route==="cart",r=o.cart.length;return`
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
                
                ${i?"":`
                    <div class="search-bar">
                        <div class="search-container">
                            <input type="text" id="searchInput" class="search-input" placeholder="Search for Products..." 
                                value="${o.searchQuery}" oninput="window.handleSearchInput(event)"
                                onkeyup="if(event.key === 'Enter') window.handleSearch()" onfocus="window.showSearchSuggestions()">
                            <button class="search-btn" onclick="window.handleSearch()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                        </div>
                    </div>
                `}
                <div class="nav-actions" style="gap: 1.5rem;">
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
                        <div class="user-dropdown">
                            <div class="action-icon" style="cursor: pointer;">
                                <div style="width: 32px; height: 32px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; overflow: hidden;">
                                    ${o.currentUser.avatar&&o.currentUser.role==="customer"?`<img src="${o.currentUser.avatar}" style="width: 100%; height: 100%; object-fit: cover;">`:o.currentUser.name.charAt(0).toUpperCase()}
                                </div>
                                <span>${o.currentUser.name.split(" ")[0]}</span>
                            </div>
                            
                            <!-- Stardust Popover Menu -->
                            <div class="user-menu">
                                <div class="user-menu-header">
                                    <div class="user-menu-name">${o.currentUser.name}</div>
                                    <div class="user-menu-email">${o.currentUser.email}</div>
                                </div>
                                
                            
                                
                                ${["admin","staff"].includes(o.currentUser.role)?`
                                    <!-- Admin/Staff Items -->

                                    <a href="#" class="user-menu-item" onclick="window.navigate('admin-profile'); return false;">
                                        <span class="menu-icon">👤</span>
                                        <span>My Profile</span>
                                    </a>
                                    <a href="#" class="user-menu-item" onclick="window.navigate('admin'); return false;">
                                        <span class="menu-icon">📊</span>
                                        <span>${o.currentUser.role==="admin"?"Admin Dashboard":"Staff Dashboard"}</span>
                                    </a>
                                `:`
                                    <!-- Customer Only Items -->
                                    <a href="#" class="user-menu-item" onclick="window.navigate('user', { tab: 'profile' }); return false;">
                                        <span class="menu-icon">👤</span>
                                        <span>My Account</span>
                                    </a>
                                    <a href="#" class="user-menu-item" onclick="window.navigate('user', { tab: 'orders' }); return false;">
                                        <span class="menu-icon">📦</span>
                                        <span>My Orders</span>
                                    </a>
                                    <a href="#" class="user-menu-item" onclick="window.navigate('my-devices'); return false;">
                                        <span class="menu-icon">📱</span>
                                        <span>My Devices</span>
                                    </a>
                                    <a href="#" class="user-menu-item" onclick="window.navigate('user', { tab: 'coupons' }); return false;">
                                        <span class="menu-icon">🎟️</span>
                                        <span>My Coupons</span>
                                    </a>
                                `}
                                
                                <a href="#" class="user-menu-item logout" onclick="window.logout(); return false;">
                                    <span class="menu-icon">🚪</span>
                                    <span>Logout</span>
                                </a>
                            </div>
                        </div>
                    `:`
                        <a href="#" class="action-icon" onclick="window.openLoginModal(); return false;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span>Login</span>
                        </a>
                    `}
                </div>
            </div>
            
            <nav class="header-nav ${o.mobileMenuOpen?"mobile-open":""}">
                <a href="#" class="nav-link ${o.route==="home"?"active":""}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${o.route==="products"?"active":""}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link ${o.route==="deals"?"active":""}" onclick="window.navigate('deals'); return false;">Deals</a>
                <a href="#" class="nav-link ${o.route==="learn"?"active":""}" onclick="window.navigate('learn'); return false;">Learn</a>
                <a href="#" class="nav-link ${o.route==="about-us"?"active":""}" onclick="window.navigate('about-us'); return false;">About Us</a>
                <a href="#" class="nav-link ${o.route==="contact-us"?"active":""}" onclick="window.navigate('contact-us'); return false;">Contact Us</a>
            </nav>
        </header>
    `},K=()=>{if(o.searchQuery){const i=o.products.filter(r=>r.name.toLowerCase().includes(o.searchQuery.toLowerCase())||r.category.toLowerCase().includes(o.searchQuery.toLowerCase())||r.description.toLowerCase().includes(o.searchQuery.toLowerCase()));return`
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
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Found ${i.length} result${i.length!==1?"s":""} for "${o.searchQuery}"</p>
                ${i.length>0?`
                    <div class="product-grid">
                        ${i.map(W).join("")}
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
                ${o.products.filter(i=>t.includes(i.id)).sort((i,r)=>t.indexOf(i.id)-t.indexOf(r.id)).map(W).join("")}
            </div>
        </div>
    `},ye=()=>`
        <div class="auth-container">
            <h2 class="auth-title">Create Account</h2>
            <form onsubmit="window.handleSignup(event)">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" name="name" class="form-input" required 
                           pattern="[a-zA-Z\\s]+" 
                           title="Please enter letters only."
                           oninput="this.value = this.value.replace(/[^a-zA-Z\\s]/g, '')">
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
                Already have an account? <a href="#" onclick="window.openLoginModal(); return false;" style="color: var(--accent)">Login</a>
            </p>
        </div>
    `,we=()=>{if(o.cart.length===0)return`
            <div class="text-center" style="padding: 4rem; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                <h2 style="margin-bottom: 1rem;">Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('products')">Start Shopping</button>
            </div>
        `;let t=o.cart;return o.cartSearchQuery&&(t=o.cart.filter(e=>e.name.toLowerCase().includes(o.cartSearchQuery.toLowerCase())||e.category.toLowerCase().includes(o.cartSearchQuery.toLowerCase()))),o.cart.reduce((e,i)=>e+i.price*i.quantity,0),`
        <div style="margin: 2rem auto; padding: 0 2rem;">
            <button class="btn btn-outline" onclick="window.navigate('products')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                ← Continue Shopping
            </button>
            
            <div class="cart-container">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0;">Shopping Cart</h2>
                    
                    ${o.cart.length>0?`
                        <div class="search-container" style="max-width: 400px; flex: 1;">
                            <input 
                                type="text" 
                                id="cartSearchInput" 
                                class="search-input" 
                                placeholder="Search items in cart..." 
                                value="${o.cartSearchQuery}"
                                oninput="window.handleCartSearch(event)"
                                style="width: 100%;"
                            >
                            <button class="search-btn" onclick="window.clearCartSearch()">
                                ${o.cartSearchQuery?`
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
                
                <div class="cart-search-message" style="${o.cartSearchQuery&&t.length===0?"":"display: none;"}">
                    ${o.cartSearchQuery&&t.length===0?`
                        <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                            No items found for "${o.cartSearchQuery}"
                        </p>
                    `:""}
                </div>
                
            <div class="cart-items">
                ${t.map(e=>{const i=o.products.filter(r=>r.category===e.category&&r.id!==e.id).slice(0,4);return`
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
                                <p class="text-muted">${y(e.price)}</p>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem; margin-right: 2rem;">
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${e.id}, ${e.quantity-1})">-</button>
                                <span>${e.quantity}</span>
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${e.id}, ${e.quantity+1})">+</button>
                            </div>
                            
                            <div class="cart-item-actions" style="display: flex; align-items: center; gap: 0.5rem;">
                                <button class="btn-find-similar" onclick="window.toggleFindSimilar(${e.id})" style="display: flex; align-items: center; gap: 0.25rem;">
                                    Find Similar 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${e.showSimilar?"rotate(180deg)":"rotate(0deg)"}; transition: transform 0.2s;">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                <button class="btn-delete" onclick="window.removeFromCart(${e.id})" style="color: var(--danger); border-color: var(--danger);">Delete</button>
                            </div>
                        </div>
                        <div class="similar-products-dropdown ${e.showSimilar?"show":""}">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h4 style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Similar Products</h4>
                                <button onclick="window.toggleFindSimilar(${e.id})" style="background: none; border: none; cursor: pointer;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            ${i.length>0?`
                                <div class="similar-products-grid">
                                    ${i.map(r=>`
                                        <div class="similar-product-card" onclick="window.viewProduct(${r.id})">
                                            <img src="${r.image}" alt="${r.name}" class="similar-product-image">
                                            <div class="similar-product-title" title="${r.name}">${r.name}</div>
                                            <div class="similar-product-price">${y(r.price)}</div>
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
                    <span>${y(o.cart.reduce((e,i)=>e+(i.selected!==!1?i.price*i.quantity:0),0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${o.cart.filter(e=>e.selected!==!1).length})
                </button>
            </div>
        </div>
        </div>
    `},be=()=>{if(!o.currentUser)return P("login"),"";const t=o.devices||[];return`
        <div style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            ${E("my-devices")}
            
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
                    ${t.map(e=>{const i=!o.showTokens?.[e.deviceId];return`
                        <div class="device-card">
                            <div class="device-status-badge ${e.status==="active"||o.deviceStatus[e.deviceId]?.status==="online"?"online":"offline"}">
                                <span class="status-dot"></span>
                                ${e.status==="active"||o.deviceStatus[e.deviceId]?.status==="online"?"Online":e.status==="pending"?"Not Configured":"Offline"}
                            </div>
                            
                            <div class="device-icon">
                                🚗
                            </div>
                            
                            <h3 class="device-name">${e.deviceName}</h3>
                            <p class="device-id">ID: ${e.deviceId}</p>
                            <div class="info-row" style="margin-top: 0.5rem;">
                                <span class="label" style="color: var(--text-muted); font-size: 0.85rem;">Token:</span>
                                <div class="token-display" style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,0,0,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">
                                    <span class="token-value ${i?"masked":""}" style="font-family: monospace; font-size: 0.85rem;">
                                        ${i?"••••••••":e.deviceToken}
                                    </span>
                                    <button onclick="window.toggleToken('${e.deviceId}')" style="background:none; border:none; cursor: pointer; padding: 0; display: flex; align-items: center; color: var(--text-muted);">
                                        ${i?"👁️":"🔒"}
                                    </button>
                                </div>
                            </div>
                            
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
                                ${e.status==="active"||o.deviceStatus[e.deviceId]?.status==="online"?`
                                    <button class="btn btn-primary" onclick="window.startRemoteControl('${e.deviceId}')" style="width: 100%;">
                                        🎮 Control
                                    </button>
                                `:e.status==="pending"?`
                                    <button class="btn btn-outline" style="width: 100%;" onclick="window.navigate('device-pair')">
                                        🔧 Awaiting Setup
                                    </button>
                                `:`
                                    <button class="btn btn-outline" style="width: 100%;" disabled>
                                        Offline
                                    </button>
                                `}
                            </div>
                        </div>
                    `}).join("")}
                </div>
            `}
        </div>
    `},xe=()=>o.currentUser?`
        <div style="max-width: 600px; margin: 2rem auto; padding: 0 2rem;">
            ${E("device-pair")}
            
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
        
    `:(P("login"),""),ke=()=>{if(!o.currentUser)return P("login"),"";if(!o.currentDeviceId)return P("my-devices"),"";const t=o.devices?.find(n=>n.deviceId===o.currentDeviceId);if(!t)return P("my-devices"),"";const e=o.deviceStatus[t.deviceId]||{},i=o.telemetryData[t.deviceId]||{},r=e.status==="online",a=i.obstacleAvoidance||!1;return i.speed,`
        <div style="max-width: 1200px; margin: 0 auto; padding: 1rem;">
            <div style="margin-bottom: 1rem;">
                <button class="btn btn-outline" onclick="window.stopRemoteControl()" style="padding: 0.75rem 1.5rem;">
                    ← Back to My Devices
                </button>
            </div>
            <div class="cyber-container">
                <!-- Ultrasonic Sensor HUD -->
                <div class="cyber-hud" style="display: flex; justify-content: space-around; gap: 1rem;">
                    <!-- Left Sensor -->
                    <div class="hud-group" style="text-align: center;">
                        <div class="icon-box" style="font-size: 1.5rem;">⬅️</div>
                        <div class="info">
                            <div class="value" style="font-size: 1.25rem; font-weight: bold;">${i.leftDistance||"--"} cm</div>
                            <div class="label">Left</div>
                        </div>
                    </div>
                    <!-- Front Sensor -->
                    <div class="hud-group" style="text-align: center;">
                        <div class="icon-box" style="font-size: 1.5rem;">⬆️</div>
                        <div class="info">
                            <div class="value" style="font-size: 1.25rem; font-weight: bold; ${i.frontDistance<25?"color: #ef4444;":""}">${i.frontDistance||"--"} cm</div>
                            <div class="label">Front</div>
                        </div>
                    </div>
                    <!-- Right Sensor -->
                    <div class="hud-group" style="text-align: center;">
                        <div class="icon-box" style="font-size: 1.5rem;">➡️</div>
                        <div class="info">
                            <div class="value" style="font-size: 1.25rem; font-weight: bold;">${i.rightDistance||"--"} cm</div>
                            <div class="label">Right</div>
                        </div>
                    </div>
                    <!-- Connection Status -->
                    <div class="hud-group" style="text-align: center;">
                        <div class="icon-box">${r?"🟢":"🔴"}</div>
                        <div class="info">
                            <div class="value">${r?"Online":"Offline"}</div>
                            <div class="label">Status</div>
                        </div>
                    </div>
                </div>
                <!-- Obstacle Avoidance Mode Toggle -->
                <div style="background: ${a?"linear-gradient(135deg, #10b981, #059669)":"var(--cyber-bg-secondary, #1e293b)"}; padding: 1rem; border-radius: 12px; margin: 1rem 0; transition: all 0.3s;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 style="margin: 0 0 0.25rem 0; font-size: 1rem; color: ${a?"#fff":"inherit"};">🚧 Obstacle Avoidance Mode</h3>
                            <p style="margin: 0; font-size: 0.75rem; color: ${a?"rgba(255,255,255,0.8)":"var(--cyber-text-muted, #94a3b8)"};">
                                ${a?"Car is navigating autonomously":"Enable for autonomous navigation"}
                            </p>
                        </div>
                        <button class="btn ${a?"":"btn-primary"}" 
                            onclick="window.toggleObstacleAvoidance()"
                            style="${a?"background: rgba(255,255,255,0.2); border: 1px solid #fff; color: #fff;":""}"
                            ${r?"":"disabled"}>
                            ${a?"Stop":"Start"}
                        </button>
                    </div>
                </div>
                <!-- Control Deck (D-Pad) - disabled when OA mode is on -->
                <div class="control-deck" style="${a?"opacity: 0.5; pointer-events: none;":""}">
                    <div class="d-pad-grid">
                        <button class="d-pad-btn" data-dir="forward"
                            onmousedown="window.sendCarCommand('forward'); this.classList.add('active')"
                            onmouseup="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ontouchstart="window.sendCarCommand('forward'); this.classList.add('active')"
                            ontouchend="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ${!r||a?"disabled":""}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="19" x2="12" y2="5"></line>
                                <polyline points="5 12 12 5 19 12"></polyline>
                            </svg>
                            <span>FWD</span>
                        </button>
                        
                        <button class="d-pad-btn" data-dir="left"
                            onmousedown="window.sendCarCommand('left'); this.classList.add('active')"
                            onmouseup="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ontouchstart="window.sendCarCommand('left'); this.classList.add('active')"
                            ontouchend="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ${!r||a?"disabled":""}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            <span>LEFT</span>
                        </button>
                        
                        <button class="d-pad-btn stop" data-dir="stop"
                            onclick="window.sendCarCommand('stop')"
                            ${!r||a?"disabled":""}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="6" width="12" height="12"></rect>
                            </svg>
                            <span>STOP</span>
                        </button>
                        
                        <button class="d-pad-btn" data-dir="right"
                            onmousedown="window.sendCarCommand('right'); this.classList.add('active')"
                            onmouseup="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ontouchstart="window.sendCarCommand('right'); this.classList.add('active')"
                            ontouchend="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ${!r||a?"disabled":""}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                            <span>RIGHT</span>
                        </button>
                        
                        <button class="d-pad-btn" data-dir="backward"
                            onmousedown="window.sendCarCommand('backward'); this.classList.add('active')"
                            onmouseup="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ontouchstart="window.sendCarCommand('backward'); this.classList.add('active')"
                            ontouchend="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ${!r||a?"disabled":""}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                            </svg>
                            <span>BWD</span>
                        </button>
                    </div>
                </div>
                <!-- Action Bar -->
                <div class="action-bar">
                    <!-- Speed Control -->
                    <div class="speed-control">
                        <div class="label-row">
                            <span>Speed</span>
                            <span id="speedValue">50%</span>
                        </div>
                        <input type="range" min="0" max="100" value="50" class="cyber-slider" id="speedSlider"
                            oninput="document.getElementById('speedValue').textContent = this.value + '%'"
                            onchange="window.setSpeed(this.value)">
                    </div>
                    <!-- Auxiliary Controls -->
                    <div class="aux-controls">
                        <button class="cyber-toggle-btn" id="lightsToggle" onclick="window.toggleLights()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                            <span>Lights</span>
                        </button>
                        <button class="cyber-toggle-btn" id="hornToggle" onclick="window.toggleHorn()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                            </svg>
                            <span>Horn</span>
                        </button>
                    </div>
                </div>
            </div>
            <p style="text-align: center; color: var(--cyber-text-muted); margin-top: 1rem; font-size: 0.875rem;">
                Use WASD or Arrow Keys to control
            </p>
        </div>
    `},Ce=()=>{if(!o.currentUser)return P("login"),"";const t=o.cart.filter(s=>s.selected!==!1);if(t.length===0)return u("No items selected for checkout"),P("cart"),"";const e=o.currentUser.address,i=e&&typeof e=="object"&&e.street,r=!o.checkoutData.shipping.address&&!o.checkoutData.shipping.city;i&&r&&(o.checkoutData.shipping={fullName:e.fullName||o.currentUser.name||"",phone:e.phone||o.currentUser.phone||"",address:[e.street,e.barangay].filter(Boolean).join(", "),city:e.city||"",province:e.province||"",postalCode:e.postalCode||"",instructions:e.details||""});const a=t.reduce((s,d)=>s+d.price*d.quantity,0),n=o.checkoutData.shippingFee,l=a+n;return`
        <div class="checkout-container" style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            <div style="margin-bottom: 2rem;">
                <button class="btn btn-outline" onclick="window.navigate('cart')" style="padding: 0.75rem 1.5rem; margin-bottom: 1.5rem;">
                    ← Back to Cart
                </button>
                <h1 style="font-size: 2.5rem; margin-top: 1rem;">Checkout</h1>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 380px; gap: 3rem;">
                <div class="checkout-form">
                    ${i?"":`
                    <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                        <span style="font-size: 1.25rem;">📍</span>
                        <div>
                            <strong>No saved address found.</strong>
                            <span>Save your address in <a href="#" onclick="window.navigate('user', { tab: 'address' }); return false;" style="color: #d97706; font-weight: 600;">My Account</a> for faster checkout next time.</span>
                        </div>
                    </div>
                    `}
                    <div class="admin-section" style="margin-bottom: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">📍 Shipping Information</h2>
                        <form onsubmit="event.preventDefault();" style="display: grid; gap: 1.5rem;">
                            <div>
                                <label class="form-label">Full Name <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${o.checkoutData.shipping.fullName||(o.currentUser?o.currentUser.name:"")}"
                                    oninput="window.handleNameInput(this)"
                                    placeholder="e.g. Juan Dela Cruz">
                            </div>

                            <div>
                                <label class="form-label">Phone Number <span style="color: red;">*</span></label>
                                <input type="tel" class="form-input" 
                                    value="${o.checkoutData.shipping.phone}"
                                    oninput="window.handlePhoneInput(this)"
                                    maxlength="11"
                                    placeholder="09123456789">
                            </div>

                            <div>
                                <label class="form-label">Address <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${o.checkoutData.shipping.address}"
                                    onchange="window.updateShippingInfo('address', this.value)"
                                    placeholder="House/Unit No., Street Name, Barangay">
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <label class="form-label">City <span style="color: red;">*</span></label>
                                    <input type="text" class="form-input" 
                                        value="${o.checkoutData.shipping.city}"
                                        oninput="window.handleLocationInput(this, 'city')"
                                        placeholder="e.g. Makati">
                                </div>
                                <div>
                                    <label class="form-label">Province <span style="color: red;">*</span></label>
                                    <input type="text" class="form-input" 
                                        value="${o.checkoutData.shipping.province}"
                                        oninput="window.handleLocationInput(this, 'province')"
                                        placeholder="e.g. Metro Manila">
                                </div>
                            </div>

                            <div>
                                <label class="form-label">Postal Code <span style="color: red;">*</span></label>
                                <input type="text" class="form-input" 
                                    value="${o.checkoutData.shipping.postalCode}"
                                    oninput="window.handlePostalInput(this)"
                                    maxlength="4"
                                    placeholder="e.g. 1200">
                            </div>

                            <div>
                                <label class="form-label">Delivery Instructions (Optional)</label>
                                <textarea class="form-input" 
                                    onchange="window.updateShippingInfo('instructions', this.value)"
                                    rows="3"
                                    placeholder="Floor number, landmark, etc.">${o.checkoutData.shipping.instructions||""}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="admin-section">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">💳 Payment Method <span style="color: red;">*</span></h2>
                        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem;">
                            ${[{id:"cod",label:"Cash on Delivery",image:"/lumina/images/payment/cod.png"},{id:"gcash",label:"GCash",image:"/lumina/images/payment/gcash.png"},{id:"maya",label:"Maya",image:"/lumina/images/payment/maya.png"},{id:"card",label:"Credit/Debit Card",image:"/lumina/images/payment/card.png"},{id:"bank",label:"Bank Transfer",image:"/lumina/images/payment/bank.png"}].map(s=>`
                                <div class="payment-method-card" onclick="window.selectPaymentMethod('${s.id}')" style="padding: 0.75rem; border: 2px solid ${o.checkoutData.paymentMethod===s.id?"var(--primary)":"var(--border)"}; border-radius: var(--radius-md); cursor: pointer; text-align: center; transition: all 0.2s; background: ${o.checkoutData.paymentMethod===s.id?"rgba(0, 43, 91, 0.05)":"var(--surface)"};">
                                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                                        <img src="${s.image}" alt="${s.label}" style="max-width: 100%; max-height: 48px; object-fit: contain;">
                                    </div>
                                    <div style="font-size: 0.75rem; font-weight: 600; line-height: 1.2;">${s.label}</div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="cart-summary" style="position: sticky; top: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Order Summary</h2>
                        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem;">
                            ${t.map(s=>`
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                                    <img src="${s.image}" alt="${s.name}" style="width: 60px; height: 60px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${s.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-muted);">Qty: ${s.quantity}</div>
                                    </div>
                                    <div style="font-weight: 700; color: var(--primary);">${y(s.price*s.quantity)}</div>
                                </div>
                            `).join("")}
                        </div>
                        <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Subtotal</span>
                                <span>${y(a)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Shipping Fee</span>
                                <span>${y(n)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                                <span>Total</span>
                                <span style="color: var(--primary);">${y(l)}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="window.placeOrder()" style="width: 100%; padding: 1rem; font-size: 1rem;">Place Order</button>
                        <div style="margin-top: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);">🔒 Your payment information is secure</div>
                    </div>
                </div>
            </div>
        </div>
    `},Se=()=>{if(!o.lastOrderId)return P("home"),"";const t=o.orders.find(n=>n.orderId===o.lastOrderId);if(!t)return P("home"),"";const e=new Date,i=new Date(e);i.setDate(e.getDate()+3);const r=new Date(e);r.setDate(e.getDate()+5);const a=`${i.toLocaleDateString("en-US",{month:"short",day:"numeric"})} - ${r.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} `;return`
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
                        <span class="badge badge-${o.checkoutData.paymentMethod==="cod"?"warning":"success"}" style="font-size: 0.875rem; padding: 0.375rem 0.75rem;">
                            ${o.checkoutData.paymentMethod==="cod"?"Cash on Delivery":"Payment Confirmed"}
                        </span>
                    </div>
                </div>

                <div>
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">3</div>
                        <div style="font-weight: 600;">Shipping Address</div>
                    </div>
                    <div style="padding-left: 2rem; color: var(--text-muted);">
                        ${o.checkoutData.shipping.fullName}<br>
                        ${o.checkoutData.shipping.address}<br>
                        ${o.checkoutData.shipping.city}, ${o.checkoutData.shipping.province} ${o.checkoutData.shipping.postalCode}<br>
                        ${o.checkoutData.shipping.phone}
                    </div>
                </div>
            </div>

            ${t.devices&&t.devices.length>0?`
                <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="font-size: 2rem;">🚗</div>
                        <div>
                            <h3 style="margin: 0; color: #0369a1;">ESP32 Smart Car Credentials</h3>
                            <p style="margin: 0; color: #0c4a6e; font-size: 0.9rem;">Use these details to configure your device</p>
                        </div>
                    </div>

                    ${t.devices.map((n,l)=>`
                        <div style="background: white; padding: 1rem; border-radius: 8px; border: 1px solid #e0f2fe; margin-bottom: ${l<t.devices.length-1?"1rem":"0"};">
                            <h4 style="margin: 0 0 0.5rem 0; color: #0284c7;">${n.productName}</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Device ID</div>
                                    <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #334155; background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block;">${n.deviceId}</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Device Token</div>
                                    <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #334155; background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block;">${n.deviceToken}</div>
                                </div>
                            </div>
                            <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #0c4a6e;">
                                <strong>Setup:</strong> Connect to "ESP32-SmartCar-Setup" WiFi and enter these credentials.
                            </div>
                        </div>
                    `).join("")}
                </div>
            `:""}

            <div class="admin-section" style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Order Items</h3>
                ${t.items.map(n=>`
                    <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${n.productName||n.name}</div>
                            <div style="font-size: 0.875rem; color: var(--text-muted);">Quantity: ${n.quantity}</div>
                        </div>
                        <div style="font-weight: 700; color: var(--primary);">${y(n.price*n.quantity)}</div>
                    </div>
                `).join("")}
                <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                    <span>Total Amount</span>
                    <span style="color: var(--primary);">${y(t.total)}</span>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-primary" onclick="window.printReceipt()" style="padding: 0.875rem 2rem;">🖨️ Print Receipt</button>
                <button class="btn btn-outline" onclick="window.navigate('home')" style="padding: 0.875rem 2rem;">🏠 Back to Shop</button>
            </div>

            <div style="text-align: center; margin-top: 3rem; padding: 1.5rem; background: var(--surface-alt); border-radius: var(--radius-md);">
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">An email confirmation has been sent to <strong>${o.currentUser.email}</strong></p>
                <p style="font-size: 0.875rem; color: var(--text-muted);">Questions? Contact us at support@luminaelectronics.com</p>
            </div>
        </div>
    `};window.navigateToTutorial=t=>{P("tutorial-detail",{id:t})};window.filterLearningContent=t=>{o.filterLearnCategory=t,C()};window.navigateToTutorial=t=>{P("tutorial-detail",{id:t})};window.updateOrderStatus=(t,e)=>{const i=o.orders.find(r=>r.id===t);i&&(i.status=e,T(),u(`Order #${t} updated to ${e}`),C())};window.toggleSelectAll=t=>{document.querySelectorAll(".product-checkbox").forEach(i=>i.checked=t.checked)};window.bulkAction=t=>{const e=document.querySelectorAll(".product-checkbox:checked"),i=Array.from(e).map(r=>parseInt(r.value));if(i.length===0){u("No products selected");return}t==="delete"?confirm(`Delete ${i.length} products?`)&&(o.products=o.products.filter(r=>!i.includes(r.id)),T(),C(),u("Products deleted")):t==="restock"&&(o.products.forEach(r=>{i.includes(r.id)&&(r.stock+=10)}),T(),C(),u("Products restocked"))};window.viewOrderDetails=t=>{const e=o.orders.find(a=>a.id===t);if(!e)return;const i=o.users.find(a=>a.id===e.userId),r=`
        <div class="modal-overlay show" id="orderModal" onclick="if(event.target === this) window.closeModal()">
            <div class="modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Order #${e.id}</h3>
                    <button class="btn-icon" onclick="window.closeModal()">✕</button>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Customer:</strong> ${i?i.name:"Unknown"}</p>
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
                                <td style="padding: 0.5rem;">${y(a.price)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${y(e.total)}
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",r)};window.closeModal=()=>{const t=document.getElementById("orderModal");t&&t.remove()};const $e=(t=null)=>{const e=t?o.products.find(r=>r.id===t):null,i=!!e;return`
        <div class="modal-overlay show" id="productModal" onclick="if(event.target === this) window.closeProductModal()">
            <div class="modal-content" style="max-width: 600px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>${i?"Edit Product":"Add New Product"}</h3>
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
                        <button type="submit" class="btn btn-primary" style="flex: 1;">${i?"Update":"Create"} Product</button>
                    </div>
                </form>
            </div>
        </div>
    `};window.navigate=P;window.toggleMobileMenu=()=>{o.mobileMenuOpen=!o.mobileMenuOpen,C()};window.showProductModal=(t=null)=>{document.body.insertAdjacentHTML("beforeend",$e(t))};window.closeProductModal=()=>{document.getElementById("productModal")?.remove()};window.editProduct=t=>{window.showProductModal(t)};window.deleteProduct=async t=>{if(confirm("Delete this product?"))try{await S(`/products/${t}`,{method:"DELETE"}),await M.getProducts(),u("Product deleted")}catch{u("Delete failed")}};window.handleProductSubmit=async(t,e)=>{t.preventDefault();const i=new FormData(t.target);try{const r=e?"PUT":"POST",a=e?`/products/${e}`:"/products";if(!(await fetch(`${G}${a}`,{method:r,body:i})).ok)throw new Error("Failed");await M.getProducts(),window.closeProductModal(),u(e?"Product updated!":"Product created!")}catch{u("Operation failed")}};window.handleSort=t=>{o.sortBy=t,C()};window.viewProduct=t=>{o.currentProductId=t,sessionStorage.setItem("currentProductId",t);const e=new URL(window.location);e.searchParams.set("product_id",t),window.history.pushState({},"",e),P("product-detail")};window.adjustDetailQty=t=>{const e=document.getElementById("detailQty");let i=parseInt(e.value)+t;i<1&&(i=1),e.value=i};window.handleDetailQtyInput=t=>{};window.handleDetailQtyBlur=t=>{let e=parseInt(t.value);(isNaN(e)||e<1)&&(e=1),t.value=e};window.addToCartFromDetail=t=>{if(o.currentUser&&["admin","staff"].includes(o.currentUser.role))return;const e=parseInt(document.getElementById("detailQty").value);if(!o.currentUser){u("Please login to shop"),window.openLoginModal();return}const i=o.products.find(a=>a.id===t),r=o.cart.find(a=>a.id===t);r?r.quantity+=e:o.cart.push({...i,quantity:e,selected:!0}),T(),u(`Added ${e} item(s) to cart`)};window.addToCart=async t=>{if(o.currentUser&&["admin","staff"].includes(o.currentUser.role))return;if(!o.currentUser){window.showToast("Please login to shop"),window.openLoginModal();return}const e=o.products.find(r=>r.id===t);if(!e)return;const i=o.cart.find(r=>r.id===t);if(i?i.quantity+=1:o.cart.push({...e,quantity:1,selected:!0}),T(),C(),window.showToast(`Added ${e.name} to cart! 🛒`),o.currentUser)try{await S(`/users/${o.currentUser.id}/cart`,{method:"PUT",body:JSON.stringify({cart:o.cart.map(r=>({productId:r.id,name:r.name,price:r.price,image:r.image,quantity:r.quantity,category:r.category,selected:r.selected!==!1}))})})}catch(r){console.error("Failed to sync cart:",r)}};window.updateQuantity=(t,e)=>{let i=parseInt(e);(isNaN(i)||i<1)&&(i=1);const r=o.cart.find(a=>a.id===t);r&&(r.quantity=i,T(),C())};window.handleCartQtyInput=(t,e)=>{};window.handleCartQtyBlur=(t,e)=>{let i=parseInt(e.value);(isNaN(i)||i<1)&&(i=1,e.value=1),window.updateQuantity(t,i)};window.removeFromCart=t=>{o.cart=o.cart.filter(e=>e.id!==t),T(),C()};window.checkout=async()=>{if(o.cart.length===0)return;if(!o.currentUser){u("Please login to checkout"),P("login");return}if(o.cart.filter(e=>e.selected!==!1).length===0){u("No items selected for checkout");return}P("checkout")};window.updateShippingInfo=(t,e)=>{o.checkoutData.shipping[t]=e};window.selectPaymentMethod=t=>{o.checkoutData.paymentMethod=t,C()};window.handlePhoneInput=t=>{const e=t.value.replace(/[^0-9]/g,"");t.value=e,o.checkoutData.shipping.phone=e};window.handleNameInput=t=>{const e=t.value.replace(/[^a-zA-Z\s]/g,"");t.value=e,o.checkoutData.shipping.fullName=e};window.handleLocationInput=(t,e)=>{const i=t.value.replace(/[^a-zA-Z\s]/g,"");t.value=i,o.checkoutData.shipping[e]=i};window.handlePostalInput=t=>{const e=t.value.replace(/[^0-9]/g,"");t.value=e,o.checkoutData.shipping.postalCode=e};window.showPaymentModal=t=>new Promise(e=>{let i="";const r=`
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
                                <span style="font-weight: 700;">${y(t)}</span>
                            </div>
                            <div class="payment-summary-row total">
                                <span>To Pay:</span>
                                <span>${y(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentAmountInput"),l=document.getElementById("paymentError"),s=document.getElementById("paymentChangeDisplay"),d=document.getElementById("changeAmount"),g=document.getElementById("paymentConfirmBtn"),b=document.getElementById("paymentCancelBtn");setTimeout(()=>n.focus(),100),n.addEventListener("input",h=>{let f=h.target.value.replace(/[^0-9.]/g,"");const m=f.split(".");m.length>2&&(f=m[0]+"."+m.slice(1).join("")),h.target.value=f,i=f;const c=parseFloat(f);if(!f||isNaN(c)||c<0){l.textContent="",l.classList.remove("show"),n.classList.remove("error"),g.disabled=!0,s.classList.remove("show");return}if(c<t){const $=t-c;l.textContent=`Insufficient! Need ${y($)} more`,l.classList.add("show"),n.classList.add("error"),g.disabled=!0,s.classList.remove("show")}else{const $=c-t;l.classList.remove("show"),n.classList.remove("error"),g.disabled=!1,s.classList.add("show"),d.textContent=y($)}}),document.querySelectorAll(".quick-amount-btn").forEach(h=>{h.addEventListener("click",()=>{const f=h.getAttribute("data-amount");n.value=f,n.dispatchEvent(new Event("input"))})}),b.addEventListener("click",()=>{a.remove(),e(null)}),a.addEventListener("click",h=>{h.target===a&&(a.remove(),e(null))}),g.addEventListener("click",()=>{const h=parseFloat(i);h>=t&&(a.remove(),e({amountPaid:h,change:h-t}))}),n.addEventListener("keypress",h=>{h.key==="Enter"&&!g.disabled&&g.click()}),document.addEventListener("keydown",function h(f){f.key==="Escape"&&(a.remove(),e(null),document.removeEventListener("keydown",h))})});window.showGCashModal=t=>new Promise(e=>{const i="GCASH-"+Date.now().toString().slice(-8),r=`
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
                                <span>${y(t)}</span>
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
                                value="${i}"
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentConfirmBtn"),l=document.getElementById("paymentCancelBtn"),s=document.getElementById("processingOverlay"),d=document.getElementById("successOverlay");l.addEventListener("click",()=>{a.remove(),e(null)}),n.addEventListener("click",()=>{s.classList.add("show"),setTimeout(()=>{s.classList.remove("show"),d.classList.add("show"),setTimeout(()=>{a.remove(),e({method:"gcash",reference:i})},1e3)},1500)}),a.addEventListener("click",g=>{g.target===a&&(a.remove(),e(null))})});window.showMayaModal=t=>new Promise(e=>{const i="MAYA-"+Date.now().toString().slice(-8),r=`
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
                                <span>${y(t)}</span>
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
                                value="${i}"
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentConfirmBtn"),l=document.getElementById("paymentCancelBtn"),s=document.getElementById("processingOverlay"),d=document.getElementById("successOverlay");l.addEventListener("click",()=>{a.remove(),e(null)}),n.addEventListener("click",()=>{s.classList.add("show"),setTimeout(()=>{s.classList.remove("show"),d.classList.add("show"),setTimeout(()=>{a.remove(),e({method:"maya",reference:i})},1e3)},1500)}),a.addEventListener("click",g=>{g.target===a&&(a.remove(),e(null))})});window.showCardModal=t=>new Promise(e=>{const l=`
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
                                <span>${y(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",l);const s=document.getElementById("paymentModalOverlay"),d=document.getElementById("paymentConfirmBtn"),g=document.getElementById("paymentCancelBtn"),b=document.getElementById("processingOverlay"),h=document.getElementById("successOverlay");g.addEventListener("click",()=>{s.remove(),e(null)}),d.addEventListener("click",()=>{b.classList.add("show"),setTimeout(()=>{b.classList.remove("show"),h.classList.add("show"),setTimeout(()=>{s.remove(),e({method:"card",last4:"1111"})},1e3)},2e3)}),s.addEventListener("click",f=>{f.target===s&&(s.remove(),e(null))})});window.showBankModal=t=>new Promise(e=>{const i="BDO-"+Date.now().toString().slice(-8),r=`
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
                                <span>${y(t)}</span>
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
                                value="${i}"
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentConfirmBtn"),l=document.getElementById("paymentCancelBtn"),s=document.getElementById("processingOverlay"),d=document.getElementById("successOverlay");l.addEventListener("click",()=>{a.remove(),e(null)}),n.addEventListener("click",()=>{s.classList.add("show"),setTimeout(()=>{s.classList.remove("show"),d.classList.add("show"),setTimeout(()=>{a.remove(),e({method:"bank",reference:i})},1e3)},1500)}),a.addEventListener("click",g=>{g.target===a&&(a.remove(),e(null))})});window.placeOrder=async()=>{const t=o.checkoutData.shipping;if(!t.fullName||!t.fullName.trim()){u("Please enter your full name");return}if(!t.address||!t.address.trim()){u("Please enter your address");return}if(!t.city||!t.city.trim()){u("Please enter your city");return}if(!t.province||!t.province.trim()){u("Please enter your province");return}if(!t.phone||!t.phone.trim()){u("Please enter your phone number");return}if(!/^09\d{9}$/.test(t.phone)){u('Phone number must start with "09" and contain exactly 11 digits');return}const i=/^[a-zA-Z\s]+$/;if(!i.test(t.fullName)){u("Full Name must contain letters and spaces only");return}if(!i.test(t.city)){u("City must contain letters and spaces only");return}if(!i.test(t.province)){u("Province must contain letters and spaces only");return}if(t.postalCode&&!/^\d+$/.test(t.postalCode)){u("Postal Code must contain numbers only");return}if(!o.checkoutData.paymentMethod){u("Please select a payment method");return}const r=o.cart.filter(b=>b.selected!==!1),n=r.reduce((b,h)=>b+h.price*h.quantity,0)+o.checkoutData.shippingFee;let l=null;switch(o.checkoutData.paymentMethod){case"cod":l=await showPaymentModal(n);break;case"gcash":l=await showGCashModal(n);break;case"maya":l=await showMayaModal(n);break;case"card":l=await showCardModal(n);break;case"bank":l=await showBankModal(n);break;default:u("Please select a payment method");return}if(!l)return;let s=l.amountPaid||n,d=l.change||0;const g={userId:o.currentUser.id,items:r.map(b=>({productId:b.id,quantity:b.quantity,price:b.price,name:b.name})),total:n,shippingInfo:o.checkoutData.shipping,paymentMethod:o.checkoutData.paymentMethod,shippingFee:o.checkoutData.shippingFee,amountPaid:s,change:d};try{const b=await M.createOrder(g);o.lastOrderId=b.orderId,o.lastOrderPayment={amountPaid:s,change:d},o.orders.push({orderId:b.orderId,...b,items:r,total:n,createdAt:new Date().toISOString(),userId:o.currentUser.id,devices:b.devices||[]}),o.cart=o.cart.filter(h=>h.selected===!1),T(),P("order-confirmation")}catch{}};window.printReceipt=()=>{if(!o.lastOrderId){u("No order found to print");return}const t=o.orders.find(n=>n.orderId===o.lastOrderId);if(!t){u("Order not found");return}const e=o.lastOrderPayment||{},i=new Date,r=`
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
                    <span>${i.toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"})}</span>
                </div>
                <div class="info-row">
                    <span>Time:</span>
                    <span>${i.toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit"})}</span>
                </div>
                <div class="info-row">
                    <span>Cashier:</span>
                    <span>${o.currentUser.name}</span>
                </div>
                <div class="info-row">
                    <span>Payment:</span>
                    <span>${o.checkoutData.paymentMethod.toUpperCase()}</span>
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
                            <div>${y(n.price)}</div>
                            <div class="text-center">x${n.quantity}</div>
                            <div class="text-right"><strong>${y(n.price*n.quantity)}</strong></div>
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div class="totals-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>${y(t.total-o.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping Fee:</span>
                    <span>${y(o.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row grand-total">
                    <span>TOTAL:</span>
                    <span>${y(t.total)}</span>
                </div>
            </div>
            
            ${e.amountPaid?`
                <div class="payment-section">
                    <div class="payment-row">
                        <span>Amount Paid:</span>
                        <span>${y(e.amountPaid)}</span>
                    </div>
                    <div class="payment-row change-row">
                        <span>Change:</span>
                        <span>${y(e.change)}</span>
                    </div>
                </div>
            `:""}
            
            <div class="receipt-footer">
                <div class="thank-you">THANK YOU!</div>
                <div class="footer-note">Please come again</div>
                <div class="footer-note" style="margin-top: 10px;">
                    Shipping to:<br>
                    ${o.checkoutData.shipping.fullName}<br>
                    ${o.checkoutData.shipping.address}<br>
                    ${o.checkoutData.shipping.city}, ${o.checkoutData.shipping.province}<br>
                    Phone: ${o.checkoutData.shipping.phone}
                </div>
                <div style="margin-top: 15px; font-size: 9px;">
                    This serves as your official receipt<br>
                    Keep this for warranty claims
                </div>
            </div>
        </body>
        </html>
    `,a=window.open("","_blank","width=300,height=600");a.document.write(r),a.document.close(),a.onload=function(){setTimeout(()=>{a.print()},250)}};window.handleSearchInput=t=>{const e=t.target.value;if(o.searchQuery=e,e.trim()){const i=new Set;o.products.forEach(r=>{const a=r.name.toLowerCase(),n=r.category.toLowerCase(),l=e.toLowerCase();a.includes(l)&&i.add(r.name),n.includes(l)&&i.add(r.category),a.split(" ").forEach(d=>{d.toLowerCase().startsWith(l)&&d.length>2&&i.add(d.charAt(0).toUpperCase()+d.slice(1))})}),o.searchSuggestions=Array.from(i).slice(0,8),o.showSuggestions=!0}else if(o.searchSuggestions=[],o.showSuggestions=!1,o.route==="home"||o.route==="products"){C();return}ie()};function ie(){const t=document.querySelector(".search-container");if(!t)return;const e=t.querySelector(".search-suggestions");if(e&&e.remove(),o.showSuggestions&&o.searchQuery){const i=`
            <div class="search-suggestions" id="searchSuggestions">
                <div class="suggestions-header">Suggestions</div>
                ${o.searchSuggestions.slice(0,5).map(r=>`
                    <div class="suggestion-item" onclick="window.selectSuggestion('${r.replace(/'/g,"\\'")}')"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <span>${r}</span>
                    </div>
                `).join("")}
                ${o.searchQuery?`
                    <div class="suggestion-search-all" onclick="window.handleSearch()">
                        Search for "${o.searchQuery}" →
                    </div>
                `:""}
            </div>
        `;t.insertAdjacentHTML("beforeend",i)}}window.showSearchSuggestions=()=>{o.searchQuery&&(o.showSuggestions=!0,ie())};window.selectSuggestion=t=>{o.searchQuery=t,o.showSuggestions=!1;const e=document.getElementById("searchInput");e&&(e.value=t),handleSearch()};window.handleSearch=()=>{o.showSuggestions=!1;const t=document.getElementById("searchInput");t&&(o.searchQuery=t.value.trim()),P("products"),setTimeout(()=>{const e=document.querySelector(".product-grid");e&&e.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{o.searchQuery="",o.showSuggestions=!1,o.searchSuggestions=[],C()};document.addEventListener("click",t=>{if(!t.target.closest(".search-container")&&o.showSuggestions){o.showSuggestions=!1;const e=document.querySelector(".search-suggestions");e&&e.remove()}});window.handleLogin=async t=>{console.log("Login attempt started"),t.preventDefault();const e=t.target.email.value,i=t.target.password.value;console.log("Credentials:",{email:e,password:i});try{await M.login(e,i),console.log("Login successful")}catch(r){console.error("Login error:",r)}};window.toggleUserMenu=()=>{const t=document.getElementById("user-menu-dropdown");t&&(t.style.display=t.style.display==="none"?"block":"none")};document.addEventListener("click",t=>{if(!t.target.closest(".user-menu-container")){const e=document.getElementById("user-menu-dropdown");e&&(e.style.display="none")}});window.handleSignup=async t=>{console.log("Signup attempt started"),t.preventDefault();const e=t.target.name.value,i=t.target.email.value,r=t.target.password.value;try{await M.register(e,i,r)}catch(a){console.error("Signup error:",a)}};window.logout=()=>{o.currentUser=null,o.cart=[],localStorage.removeItem("currentUser"),localStorage.removeItem("cart_v2"),u("Logged out successfully"),sessionStorage.removeItem("currentRoute"),P("home")};window.handleContactSubmit=t=>{t.preventDefault();const e=t.target,i={name:e.name.value,email:e.email.value,subject:e.subject.value,message:e.message.value};console.log("Contact form submitted:",i),u("Thank you for your message! We will get back to you soon."),e.reset()};window.deleteProduct=t=>{confirm("Are you sure you want to remove this product?")&&(o.products=o.products.filter(e=>e.id!==t),T(),C(),u("Product removed"))};window.viewOrderDetails=t=>{const e=o.orders.find(l=>l.orderId===t);if(!e){u("Order not found");return}const i=o.users.find(l=>l.id===e.userId),r=i?i.name:`User ID: ${e.userId}`,a=document.createElement("div");a.className="order-details-modal",a.innerHTML=`
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
                    ${e.items.map(l=>`
                        <div class="order-item-row">
                            <div class="item-details">
                                <div class="item-name">${l.productName||"Product ID: "+l.productId}</div>
                                <div class="item-meta">Quantity: ${l.quantity} × ${y(l.price)}</div>
                            </div>
                            <div class="item-total">${y(l.price*l.quantity)}</div>
                        </div>
                    `).join("")}
                </div>
                
                <div class="order-total">
                    <span>Total Amount:</span>
                    <span class="total-amount">${y(e.total)}</span>
                </div>
            </div>
        </div>
    `,document.body.appendChild(a);const n=l=>{l.key==="Escape"&&(a.remove(),document.removeEventListener("keydown",n))};document.addEventListener("keydown",n)};const C=async()=>{const t=document.getElementById("app");let e="";switch(o.route){case"home":e=K();break;case"products":e=ue({Breadcrumbs:E,state:o});break;case"product-detail":e=ve({Breadcrumbs:E,state:o});break;case"signup":e=ye();break;case"cart":e=we();break;case"checkout":e=Ce();break;case"order-confirmation":e=Se();break;case"contact-us":e=me({Breadcrumbs:E});break;case"about-us":e=de({Breadcrumbs:E});break;case"learn":e=le({Breadcrumbs:E,state:o});break;case"tutorial-detail":e=ce({Breadcrumbs:E,state:o});break;case"deals":e=pe({Breadcrumbs:E,state:o});break;case"admin":e=_(o);break;case"user":e=V({state:o});break;case"admin-profile":e=Y({state:o});break;case"my-devices":e=be();break;case"device-pair":e=xe();break;case"remote-control":e=ke();break;default:e=K()}if(o.route==="admin"){t.innerHTML=_(o),window.initAdminCharts&&setTimeout(()=>window.initAdminCharts(),100);return}if(o.route==="admin-profile"){t.innerHTML=H()+Y({state:o});return}if(o.route==="user"){o.currentUser&&o.orders.length===0&&await M.getMyOrders(),o.currentUser&&!o.myCoupons&&await M.getMyCoupons(),t.innerHTML=H()+V({state:o});return}t.innerHTML=`
        ${H()}
        <main>
            ${e}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2025 Lumina Electronics. All rights reserved.
        </footer>
    `,o.route==="admin"&&window.initAdminCharts&&setTimeout(()=>window.initAdminCharts(),100),o.route==="deals"&&setTimeout(()=>window.startDealsTimer(),100)};window.render=C;window.handleCartSearch=t=>{o.cartSearchQuery=t.target.value,j()};window.clearCartSearch=()=>{o.cartSearchQuery="",j()};window.toggleCartItem=t=>{const e=o.cart.find(i=>i.id===t);e&&(e.selected=e.selected===!1,T(),j())};window.toggleFindSimilar=t=>{const e=o.cart.find(i=>i.id===t);e&&(o.cart.forEach(i=>{i.id!==t&&(i.showSimilar=!1)}),e.showSimilar=!e.showSimilar,T(),j())};function j(){const t=document.querySelector(".cart-items"),e=document.querySelector(".cart-summary"),i=document.querySelector(".cart-search-message");if(!t)return;let r=o.cart;if(o.cartSearchQuery&&(r=o.cart.filter(n=>n.name.toLowerCase().includes(o.cartSearchQuery.toLowerCase())||n.category.toLowerCase().includes(o.cartSearchQuery.toLowerCase()))),t.innerHTML=r.map(n=>{const l=o.products.filter(s=>s.category===n.category&&s.id!==n.id).slice(0,4);return`
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
                    <p class="text-muted">${y(n.price)}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-right: 2rem;">
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${n.id}, ${n.quantity-1})">-</button>
                    <input type="number" 
                           value="${n.quantity}" 
                           min="1" 
                           style="width: 50px; text-align: center; border: 1px solid var(--border); border-radius: 4px; padding: 0.25rem;"
                           oninput="window.handleCartQtyInput(${n.id}, this)"
                           onblur="window.handleCartQtyBlur(${n.id}, this)">
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${n.id}, ${n.quantity+1})">+</button>
                </div>
                
                <div class="cart-item-actions" style="display: flex; align-items: center; gap: 0.5rem;">
                    <button class="btn-find-similar" onclick="window.toggleFindSimilar(${n.id})" style="display: flex; align-items: center; gap: 0.25rem;">
                        Find Similar 
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${n.showSimilar?"rotate(180deg)":"rotate(0deg)"}; transition: transform 0.2s;">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <button class="btn-delete" onclick="window.removeFromCart(${n.id})" style="color: var(--danger); border-color: var(--danger);">Delete</button>
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
                        ${l.map(s=>`
                            <div class="similar-product-card" onclick="window.viewProduct(${s.id})">
                                <img src="${s.image}" alt="${s.name}" class="similar-product-image">
                                <div class="similar-product-title" title="${s.name}">${s.name}</div>
                                <div class="similar-product-price">${y(s.price)}</div>
                            </div>
                        `).join("")}
                    </div>
                `:'<p class="text-muted text-center">No similar products found.</p>'}
            </div>
        </div>
    `}).join(""),e){const n=o.cart.reduce((s,d)=>s+(d.selected!==!1?d.price*d.quantity:0),0),l=o.cart.filter(s=>s.selected!==!1).length;e.innerHTML=`
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${y(n)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${l})
            </button>
        `}i&&(o.cartSearchQuery&&r.length===0?(i.innerHTML=`
                <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                    No items found for "${o.cartSearchQuery}"
                </p>
            `,i.style.display="block"):i.style.display="none");const a=document.querySelector("#cartSearchInput + .search-btn");a&&(a.innerHTML=o.cartSearchQuery?`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `:`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `)}let Z=null;window.startDealsTimer=()=>{const t=new Date().getTime()+864e5;Z=setInterval(()=>{const e=new Date().getTime(),i=t-e,r=Math.floor(i%(1e3*60*60*24)/(1e3*60*60)),a=Math.floor(i%(1e3*60*60)/(1e3*60)),n=Math.floor(i%(1e3*60)/1e3),l=document.getElementById("deal-hours"),s=document.getElementById("deal-minutes"),d=document.getElementById("deal-seconds");l&&(l.textContent=String(r).padStart(2,"0")),s&&(s.textContent=String(a).padStart(2,"0")),d&&(d.textContent=String(n).padStart(2,"0")),i<0&&(clearInterval(Z),l&&(l.textContent="00"),s&&(s.textContent="00"),d&&(d.textContent="00"))},1e3)};window.filterLearningContent=t=>{o.filterLearnCategory=t,C()};window.sortDeals=t=>{const e=document.querySelector('[style*="grid-template-columns: repeat(4, 1fr)"]');if(!e)return;const i=Array.from(e.children);i.sort((r,a)=>{const n=s=>{const d=s.querySelector('[style*="font-size: 1.5rem"]')?.textContent;return parseFloat(d?.replace(/[₱,]/g,"")||"0")},l=s=>{const d=s.querySelector('[style*="background: #6366f1"]')?.textContent;return parseInt(d?.replace(/[-%]/g,"")||"0")};switch(t){case"discount":return l(a)-l(r);case"price-low":return n(r)-n(a);case"price-high":return n(a)-n(r);default:return 0}}),i.forEach(r=>e.appendChild(r))};window.currentLearnCategory="all";window.filterTutorials=t=>{window.currentLearnCategory=t;const e=document.querySelectorAll(".tutorial-card");document.querySelectorAll(".category-tab").forEach(r=>{r.classList.remove("active"),r.dataset.category===t&&r.classList.add("active")}),e.forEach(r=>{t==="all"||r.dataset.category===t?r.style.display="block":r.style.display="none"})};window.filterDeals=t=>{document.querySelectorAll(".deal-category-tab").forEach(e=>{const i=e.dataset.category===t;e.style.background=i?"#6366f1":"white",e.style.color=i?"white":"#64748b",e.dataset.category==="clearance"&&(t==="clearance"?(e.style.background="#dc2626",e.style.color="white",e.style.borderColor="#dc2626"):(e.style.background="white",e.style.color="#dc2626",e.style.borderColor="#dc2626"))}),document.querySelectorAll(".deal-product-card").forEach(e=>{const i=e.dataset.category;if(t==="all")e.style.display="block";else if(t==="clearance"){const r=e.querySelector('[style*="background: #6366f1"]')?.textContent,a=parseInt(r?.replace(/[-%]/g,"")||"0");e.style.display=a>=25?"block":"none"}else e.style.display=i===t?"block":"none"})};window.claimCoupon=async t=>{try{await M.claimCoupon(t),navigator.clipboard.writeText(t)}catch(e){console.error("Claim failed:",e)}};window.openVideoModal=t=>{const e=document.createElement("div");e.className="video-modal",e.innerHTML=`
        <div class="video-modal-content">
            <div class="video-modal-close" onclick="this.closest('.video-modal').remove()">✕</div>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${t}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `,document.body.appendChild(e),setTimeout(()=>e.classList.add("show"),10)};const Pe=async()=>{const e=new URLSearchParams(window.location.search).get("product_id"),i=sessionStorage.getItem("currentProductId");e?(o.currentProductId=parseInt(e),sessionStorage.setItem("currentProductId",o.currentProductId),o.route="product-detail"):i&&(o.currentProductId=parseInt(i)),await M.getProducts(),o.currentUser?.role==="admin"?await Promise.all([M.getOrders(),U.getMyDevices(),M.getUsers()]):o.currentUser&&await U.getMyDevices(),C()};window.showLoading=()=>{let t=document.querySelector(".loading-overlay");t||(t=document.createElement("div"),t.className="loading-overlay",t.innerHTML='<div class="spinner"></div>',document.body.appendChild(t)),t.offsetWidth,t.classList.add("active")};window.hideLoading=()=>{const t=document.querySelector(".loading-overlay");t&&(t.classList.remove("active"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300))};window.openLoginModal=()=>{document.body.insertAdjacentHTML("beforeend",`
        <div class="login-modal-overlay" id="loginModal" onclick="window.closeLoginModalOnOverlay(event)">
            <div class="login-modal">
                <div class="login-modal-header">
                    <h2 class="login-modal-title">Welcome Back</h2>
                    <button class="login-modal-close" onclick="window.closeLoginModal()" aria-label="Close">×</button>
                </div>
                <div class="login-modal-body">
                    <form onsubmit="window.handleModalLogin(event)">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="text" name="email" class="form-input" required autocomplete="email">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" name="password" class="form-input" required autocomplete="current-password">
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.875rem;">
                            Login
                        </button>
                    </form>
                </div>
                <div class="login-modal-footer">
                    <p>
                        Don't have an account? 
                        <a href="#" onclick="window.closeLoginModal(); window.navigate('signup'); return false;">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    `),setTimeout(()=>{document.getElementById("loginModal").classList.add("show")},10)};window.closeLoginModal=()=>{const t=document.getElementById("loginModal");t&&(t.classList.remove("show"),setTimeout(()=>t.remove(),300))};window.closeLoginModalOnOverlay=t=>{t.target.id==="loginModal"&&window.closeLoginModal()};window.handleModalLogin=async t=>{t.preventDefault();const e=new FormData(t.target),i=e.get("email"),r=e.get("password");try{await M.login(i,r),window.closeLoginModal()}catch(a){console.error("Login error:",a)}};const Ie=window.navigate;window.navigate=(t,e)=>{if(t!=="product-detail"){sessionStorage.removeItem("currentProductId");const i=new URL(window.location);i.searchParams.has("product_id")&&(i.searchParams.delete("product_id"),window.history.replaceState({},"",i))}window._lastSwitchedTab=null,window.showLoading(),setTimeout(()=>{Ie(t,e),window.hideLoading()},300)};window.handleDevicePairing=async t=>{t.preventDefault();const e=t.target,i=e.deviceId.value.trim(),r=e.deviceToken.value.trim();try{await U.pairDevice(i,r)}catch{}};window.handleDeviceUnpairing=async t=>{try{await U.unpairDevice(t)}catch{}};window.startRemoteControl=async t=>{o.currentDeviceId=t,o.esp32Client||(o.esp32Client=new ESP32SocketClient);try{await o.esp32Client.connect(o.currentUser.id),o.esp32Client.monitorDevice(t),o.esp32Client.on("device:status",e=>{o.deviceStatus[e.deviceId]=e,ee()}),o.esp32Client.on("device:telemetry",e=>{o.telemetryData[e.deviceId]=e,ee()}),o.esp32Client.on("command:sent",e=>{Q(`Command sent: ${e.command}`)}),o.esp32Client.on("command:response",e=>{e.success?Q(`✓ ${e.message||"Command executed"}`):Q(`✗ ${e.error||"Command failed"}`)}),P("remote-control")}catch(e){u("Failed to connect to device"),console.error(e)}};window.stopRemoteControl=()=>{o.esp32Client&&o.esp32Client.stopMonitoring(),o.currentDeviceId=null,P("my-devices")};window.sendCarCommand=t=>{if(!(!o.esp32Client||!o.currentDeviceId))try{if(t==="stop")o.esp32Client.stop(o.currentDeviceId);else{const e=document.getElementById("speedSlider"),i=e?parseInt(e.value):100,r=Math.round(i/100*255);o.esp32Client.move(o.currentDeviceId,t,r)}}catch(e){u("Failed to send command"),console.error(e)}};window.setSpeed=t=>{if(!(!o.esp32Client||!o.currentDeviceId))try{const e=Math.round(t/100*255);o.esp32Client.sendCommand(o.currentDeviceId,"speed",{value:e})}catch(e){console.error("Failed to set speed:",e)}};window.toggleLights=()=>{if(!o.esp32Client||!o.currentDeviceId)return;const t=document.getElementById("lightsToggle");if(t){t.classList.toggle("active");const e=t.classList.contains("active");try{o.esp32Client.sendCommand(o.currentDeviceId,"lights",{state:e?"on":"off"}),u(`Lights ${e?"ON":"OFF"}`)}catch(i){console.error("Failed to toggle lights:",i),t.classList.toggle("active")}}};window.toggleHorn=()=>{if(!o.esp32Client||!o.currentDeviceId)return;const t=document.getElementById("hornToggle");if(t){t.classList.toggle("active");const e=t.classList.contains("active");try{o.esp32Client.sendCommand(o.currentDeviceId,"horn",{state:e?"on":"off"}),u(`Horn ${e?"ON":"OFF"}`)}catch(i){console.error("Failed to toggle horn:",i),t.classList.toggle("active")}}};window.updateSpeedDisplay=t=>{const e=document.getElementById("speedDisplay");e&&(e.textContent=`${Math.round(t/255*100)}%`)};window.setCarSpeed=t=>{if(!(!o.esp32Client||!o.currentDeviceId))try{const e=parseInt(t);o.esp32Client.sendCommand(o.currentDeviceId,"speed",{value:e}),u(`Speed set to ${Math.round(e/255*100)}%`)}catch(e){console.error("Failed to set speed:",e)}};window.toggleObstacleAvoidance=()=>{if(!o.esp32Client||!o.currentDeviceId)return;const i=!((o.telemetryData[o.currentDeviceId]||{}).obstacleAvoidance||!1);try{o.esp32Client.sendCommand(o.currentDeviceId,"obstacle_avoidance",{state:i?"on":"off"}),u(`Obstacle Avoidance ${i?"ON":"OFF"}`)}catch(r){console.error("Failed to toggle obstacle avoidance:",r)}};function ee(){o.route==="remote-control"&&C()}function Q(t){const e=document.getElementById("commandLogContent");if(e){const i=document.createElement("div");for(i.className="log-entry",i.textContent=`[${new Date().toLocaleTimeString()}] ${t}`,e.insertBefore(i,e.firstChild);e.children.length>10;)e.removeChild(e.lastChild)}}window.toggleToken=t=>{o.showTokens||(o.showTokens={}),o.showTokens[t]=!o.showTokens[t],C()};window.handleCategoryFilter=t=>{o.filterCategory=t||null,C()};document.addEventListener("keydown",t=>{if(o.route!=="remote-control")return;const e=t.key.toLowerCase(),i={w:"forward",arrowup:"forward",s:"backward",arrowdown:"backward",a:"left",arrowleft:"left",d:"right",arrowright:"right"," ":"stop"};i[e]&&(t.preventDefault(),window.sendCarCommand(i[e]))});document.addEventListener("keydown",t=>{t.key==="Escape"&&document.getElementById("loginModal")&&window.closeLoginModal()});document.addEventListener("keyup",t=>{if(o.route!=="remote-control")return;const e=t.key.toLowerCase();["w","s","a","d","arrowup","arrowdown","arrowleft","arrowright"].includes(e)&&(t.preventDefault(),window.sendCarCommand("stop"))});Pe()});export default De();
