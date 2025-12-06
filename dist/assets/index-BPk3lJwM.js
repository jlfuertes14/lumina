var J=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var we=J((ke,z)=>{(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}})();let G=class{constructor(t="https://lumina-production-a4bb.up.railway.app"){this.serverUrl=t,this.socket=null,this.connected=!1,this.currentDeviceId=null,this.eventHandlers=new Map}async connect(t,o=""){if(this.socket&&this.connected){console.warn("Already connected to WebSocket");return}return new Promise((r,a)=>{if(typeof io>"u"){const n=document.createElement("script");n.src="https://cdn.socket.io/4.5.4/socket.io.min.js",n.onload=()=>this._initializeSocket(t,o,r,a),n.onerror=()=>a(new Error("Failed to load Socket.IO")),document.head.appendChild(n)}else this._initializeSocket(t,o,r,a)})}_initializeSocket(t,o,r,a){try{this.socket=io(`${this.serverUrl}/control`,{auth:{userId:t,sessionToken:o},transports:["websocket","polling"]}),this.socket.on("connect",()=>{console.log("✅ Connected to ESP32 WebSocket server"),this.connected=!0,this._triggerEvent("connected"),r()}),this.socket.on("connect_error",n=>{console.error("❌ Connection error:",n.message),this.connected=!1,this._triggerEvent("error",n),a(n)}),this.socket.on("disconnect",()=>{console.log("❌ Disconnected from WebSocket server"),this.connected=!1,this._triggerEvent("disconnected")}),this.socket.on("device:status",n=>{console.log("📊 Device status:",n),this._triggerEvent("device:status",n)}),this.socket.on("device:telemetry",n=>{this._triggerEvent("device:telemetry",n)}),this.socket.on("command:response",n=>{this._triggerEvent("command:response",n)}),this.socket.on("command:sent",n=>{this._triggerEvent("command:sent",n)}),this.socket.on("device:error",n=>{console.error("Device error:",n),this._triggerEvent("device:error",n)}),this.socket.on("devices:list",n=>{this._triggerEvent("devices:list",n)}),this.socket.on("error",n=>{console.error("System error:",n),this._triggerEvent("error",n)})}catch(n){a(n)}}monitorDevice(t){if(!this.connected)throw new Error("Not connected to WebSocket server");this.currentDeviceId=t,this.socket.emit("monitor:device",t),console.log(`👁️ Monitoring device: ${t}`)}stopMonitoring(){this.currentDeviceId&&this.connected&&(this.socket.emit("monitor:stop",this.currentDeviceId),this.currentDeviceId=null)}sendCommand(t,o,r={}){if(!this.connected)throw new Error("Not connected to WebSocket server");this.socket.emit("control:command",{deviceId:t,command:o,payload:r}),console.log(`📤 Sent command to ${t}:`,o,r)}move(t,o,r=255){this.sendCommand(t,"move",{direction:o,speed:r})}stop(t){this.sendCommand(t,"stop")}turnLeft(t,o=200){this.sendCommand(t,"move",{direction:"left",speed:o})}turnRight(t,o=200){this.sendCommand(t,"move",{direction:"right",speed:o})}forward(t,o=255){this.sendCommand(t,"move",{direction:"forward",speed:o})}backward(t,o=255){this.sendCommand(t,"move",{direction:"backward",speed:o})}requestDeviceList(){if(!this.connected)throw new Error("Not connected to WebSocket server");this.socket.emit("devices:list")}on(t,o){this.eventHandlers.has(t)||this.eventHandlers.set(t,[]),this.eventHandlers.get(t).push(o)}off(t,o){if(!this.eventHandlers.has(t))return;const r=this.eventHandlers.get(t),a=r.indexOf(o);a>-1&&r.splice(a,1)}_triggerEvent(t,o=null){if(!this.eventHandlers.has(t))return;this.eventHandlers.get(t).forEach(a=>{try{a(o)}catch(n){console.error(`Error in event handler for ${t}:`,n)}})}disconnect(){this.socket&&(this.stopMonitoring(),this.socket.disconnect(),this.socket=null,this.connected=!1,console.log("👋 Disconnected from WebSocket"))}isConnected(){return this.connected}getCurrentDevice(){return this.currentDeviceId}};typeof z<"u"&&z.exports&&(z.exports=G);typeof window<"u"&&(window.ESP32SocketClient=G);const X="https://lumina-production-a4bb.up.railway.app",K="http://localhost:3000",V=window.location.hostname==="jlfuertes14.github.io",j=V?`${X}/api`:`${K}/api`;async function x(e,t={}){const o=`${j}${e}`;try{const r=await fetch(o,{...t,headers:{"Content-Type":"application/json",...t.headers}}),a=await r.json();if(!r.ok)throw new Error(a.error||a.message||"API request failed");return a}catch(r){throw console.error("API Error:",r),r}}console.log(`🌍 Environment: ${V?"PRODUCTION":"DEVELOPMENT"}`);console.log(`🔗 API URL: ${j}`);const Z=({Breadcrumbs:e})=>{const t=[{name:"Marco Dela Cruz",role:"Founder & CEO",image:"https://ui-avatars.com/api/?name=Marco+Dela+Cruz&background=6366f1&color=fff&size=120"},{name:"Rina Gonzales",role:"Operations Manager",image:"https://ui-avatars.com/api/?name=Rina+Gonzales&background=6366f1&color=fff&size=120"},{name:"Luis Navarro",role:"Technical Support Engineer",image:"https://ui-avatars.com/api/?name=Luis+Navarro&background=6366f1&color=fff&size=120"},{name:"Ella Ramirez",role:"Customer Service Lead",image:"https://ui-avatars.com/api/?name=Ella+Ramirez&background=6366f1&color=fff&size=120"}];return`
        <div class="about-us-page">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                ${e("about-us")}
                
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
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; margin-bottom: 6rem;">
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
                        
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: left;">
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
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;">
                        ${t.map(n=>`
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
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
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
    `},ee=({Breadcrumbs:e,state:t})=>{const o=[{id:1,title:"Getting Started with Arduino",category:"Beginner",topic:"Microcontrollers",duration:"15 min",videoId:"nL34zDTPkcs",featured:!0},{id:2,title:"Raspberry Pi Setup Guide",category:"Beginner",topic:"Microcontrollers",duration:"20 min",videoId:"BpJCAafw2qE",featured:!0},{id:3,title:"Understanding Sensors",category:"Intermediate",topic:"IoT",duration:"18 min",videoId:"DlG6LY84MUU",recent:!0},{id:4,title:"DIY Obstacle Avoidance Car",category:"Intermediate",topic:"IoT",duration:"6 min",videoId:"1n_KjpMfVT0",recent:!0},{id:5,title:"PCB Design Basics",category:"Advanced",topic:"PCB Design",duration:"60 min",videoId:"vaCVh2SAZY4",featured:!0},{id:6,title:"IoT Projects with ESP32",category:"Advanced",topic:"IoT",duration:"50 min",videoId:"xPlN_Tk3VLQ",recent:!0},{id:7,title:"8 Brilliant Projects with 3D Printing and Electronics!",category:"Intermediate",topic:"Microcontrollers",duration:"8 min",videoId:"UkWoPMa6V-M",featured:!0},{id:8,title:"Building a Weather Station",category:"Advanced",topic:"IoT",duration:"42 min",videoId:"U0kPgFcALac",recent:!0}],r=o.filter(d=>d.featured),a=o.filter(d=>d.recent),n=d=>d==="Beginner"?{bg:"#dcfce7",text:"#16a34a"}:d==="Intermediate"?{bg:"#dbeafe",text:"#2563eb"}:{bg:"#f3e8ff",text:"#9333ea"},s=t.filterLearnCategory&&t.filterLearnCategory!=="all",m=s?o.filter(d=>d.category===t.filterLearnCategory):o;return`
        <div style="background: #f8f9fa; min-height: 100vh; padding-bottom: 3rem;">
            <!-- Hero Banner -->
            <div style="width: 100%; margin-top: 2rem; margin-bottom: 2rem; overflow: hidden;">
                <div style="max-width: 1400px; margin: 0 auto;">
                    <img src="assets/learning-hub-banner.png" alt="Lumina Learning Hub" style="width: 100%; max-height: 200px; object-fit: cover; display: block; border-radius: 8px;" />
                </div>
            </div>
            <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                ${e("learn")}
                
                <!-- Filter Chips -->
                <div style="display: flex; gap: 0.75rem; margin-bottom: 2rem; flex-wrap: wrap; overflow-x: auto; padding-bottom: 0.5rem;">
                    ${["all","Beginner","Intermediate","Advanced"].map(d=>`
                        <button class="topic-filter ${t.filterLearnCategory===d?"active":""}" 
                            onclick="window.filterLearningContent('${d}')" 
                            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.25rem; 
                                   background: ${t.filterLearnCategory===d?"#6366f1":"white"}; 
                                   color: ${t.filterLearnCategory===d?"white":"#64748b"}; 
                                   border: 2px solid ${t.filterLearnCategory===d?"#6366f1":"#e2e8f0"}; 
                                   border-radius: 24px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;">
                            ${d.charAt(0).toUpperCase()+d.slice(1)}
                        </button>
                    `).join("")}
                </div>
                ${s?`
                    <!-- Filtered Grid View -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
                        ${m.map(d=>`
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
                            ${r.map(d=>{const h=n(d.category);return`
                                <div class="tutorial-card" style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column;" 
                                     onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.12)'"
                                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'">
                                    <div style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden;">
                                        <img src="https://img.youtube.com/vi/${d.videoId}/maxresdefault.jpg" alt="${d.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                                        <div style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.85); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                            ⏱ ${d.duration}
                                        </div>
                                        <div style="position: absolute; top: 0.5rem; left: 0.5rem; background: ${h.bg}; color: ${h.text}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
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
                            ${a.map(d=>{const h=n(d.category);return`
                                <div class="tutorial-card" style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column;" 
                                     onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.12)'"
                                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'">
                                    <div style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden;">
                                        <img src="https://img.youtube.com/vi/${d.videoId}/maxresdefault.jpg" alt="${d.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                                        <div style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.85); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                            ⏱ ${d.duration}
                                        </div>
                                        <div style="position: absolute; top: 0.5rem; left: 0.5rem; background: ${h.bg}; color: ${h.text}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
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
                `}
            </div>
        </div>
    `},te=({Breadcrumbs:e,state:t})=>{const o=t.params?.id,a=[{id:1,title:"Getting Started with Arduino",category:"Beginner",topic:"Microcontrollers",duration:"15 min",videoId:"nL34zDTPkcs",description:"Dive into the world of Arduino microcontrollers with this comprehensive beginner's guide. You'll learn the fundamental concepts of Arduino programming, understand the hardware components, and create your first working projects. This tutorial covers everything from setting up your development environment to uploading your first sketch onto the Arduino board. Perfect for absolute beginners with no prior programming or electronics experience.",learningPoints:["Setting up the Arduino IDE and connecting your board","Understanding Arduino pin configurations and digital I/O","Writing and uploading your first Arduino sketch","Working with basic sensors and LED circuits"]},{id:2,title:"Raspberry Pi Setup Guide",category:"Beginner",topic:"Microcontrollers",duration:"20 min",videoId:"BpJCAafw2qE",description:"Get your Raspberry Pi up and running with this detailed setup tutorial. Learn how to install the operating system, configure essential settings, and prepare your Pi for your first projects. This guide covers both the hardware setup process and the software configuration you'll need to start building amazing IoT projects. Whether you're using Raspberry Pi 3, 4, or 5, this tutorial will help you get started quickly and correctly.",learningPoints:["Installing Raspberry Pi OS using the official imager","Configuring network settings and enabling SSH","Installing essential packages and development tools","Understanding the GPIO pinout and basic Python programming"]},{id:3,title:"Understanding Sensors",category:"Intermediate",topic:"IoT",duration:"18 min",videoId:"DlG6LY84MUU",description:"Explore the fascinating world of electronic sensors and learn how to integrate them into your projects. This tutorial provides an in-depth look at various sensor types including temperature sensors (DHT11, DS18B20), motion sensors (PIR), ultrasonic distance sensors (HC-SR04), and light sensors (LDR, BH1750). You'll understand how sensors work, how to read their data, and how to calibrate them for accurate measurements in real-world applications.",learningPoints:["Understanding analog vs digital sensors and their applications","Reading data from temperature and humidity sensors","Working with motion detection and ultrasonic distance measurement","Implementing sensor calibration and data filtering techniques"]},{id:4,title:"DIY Obstacle Avoidance Car",category:"Intermediate",topic:"IoT",duration:"6 min",videoId:"1n_KjpMfVT0",description:"Build an intelligent autonomous car that can navigate around obstacles using ultrasonic sensors and Arduino. This hands-on project combines motor control, sensor integration, and basic robotics programming. You'll learn how to read ultrasonic sensor data, implement decision-making logic, and control DC motors using an L298N motor driver. This is a perfect project for understanding the basics of autonomous navigation and robotics.",learningPoints:["Wiring and controlling DC motors with an L298N driver","Reading and processing ultrasonic sensor data for obstacle detection","Implementing autonomous navigation logic and decision trees","Troubleshooting common issues in robotic car projects"]},{id:5,title:"PCB Design Basics",category:"Advanced",topic:"PCB Design",duration:"60 min",videoId:"vaCVh2SAZY4",description:"Master the art of printed circuit board (PCB) design from scratch. This comprehensive tutorial takes you through the entire PCB design workflow using professional tools like KiCad or EasyEDA. Learn how to create schematics, design PCB layouts, route traces efficiently, and prepare your designs for manufacturing. You'll understand design rules, layer stackups, component placement strategies, and how to export Gerber files for fabrication. Essential knowledge for anyone serious about electronics development.",learningPoints:["Creating professional schematics with proper component symbols","PCB layout best practices: trace width, clearances, and ground planes","Routing strategies for signal integrity and EMI reduction","Preparing and exporting Gerber files for PCB manufacturing"]},{id:6,title:"IoT Projects with ESP32",category:"Advanced",topic:"IoT",duration:"50 min",videoId:"xPlN_Tk3VLQ",description:"Unlock the power of the ESP32 microcontroller for advanced IoT applications. This tutorial covers WiFi connectivity, web server creation, MQTT protocol implementation, and cloud integration. You'll build real IoT projects including a web-based temperature monitor, remote-controlled devices, and data logging systems. Learn how to use the ESP32's dual-core processor, Bluetooth capabilities, and low-power modes to create professional-grade IoT solutions.",learningPoints:["Setting up ESP32 development environment and WiFi connectivity","Creating web servers and REST APIs on the ESP32","Implementing MQTT for real-time IoT communication","Integrating with cloud platforms (Firebase, AWS IoT, ThingSpeak)"]},{id:7,title:"8 Brilliant Projects with 3D Printing and Electronics!",category:"Intermediate",topic:"Microcontrollers",duration:"8 min",videoId:"UkWoPMa6V-M",description:"Discover the perfect fusion of 3D printing and electronics in this inspiring project showcase. See how makers are combining custom 3D-printed enclosures with Arduino and Raspberry Pi to create amazing devices. From smart home sensors to robotic mechanisms, this video demonstrates practical applications and design techniques. Learn how to design functional enclosures, integrate electronics seamlessly, and bring your maker ideas to life with the power of additive manufacturing.",learningPoints:["Designing functional 3D-printed enclosures for electronics","Integrating sensors and displays into custom housings","Creating cable management and mounting solutions","Prototyping techniques for iterative design improvements"]},{id:8,title:"Building a Weather Station",category:"Advanced",topic:"IoT",duration:"42 min",videoId:"U0kPgFcALac",description:"Create a complete IoT weather station that measures temperature, humidity, atmospheric pressure, and more. This advanced project teaches you how to interface with BME280/BMP280 sensors, implement accurate data logging, visualize weather data on web dashboards, and even integrate with weather services like Weather Underground. You'll learn about sensor calibration, data averaging techniques, power management for outdoor deployment, and how to create professional data visualizations using Chart.js or similar libraries.",learningPoints:["Interfacing with BME280/BMP280 environmental sensors via I2C","Implementing data logging with timestamps and SD card storage","Creating real-time data visualizations and web dashboards","Power management and weatherproofing for outdoor installations"]}].find(m=>m.id===parseInt(o));if(!a)return`
            <div style="max-width: 1200px; margin: 4rem auto; padding: 2rem; text-align: center;">
                <h1>Tutorial Not Found</h1>
                <p style="color: #64748b; margin: 1rem 0;">The tutorial you're looking for doesn't exist.</p>
                <button class="btn btn-primary" onclick="window.navigate('learn')">Back to Learn</button>
            </div>
        `;const s=(m=>m==="Beginner"?{bg:"#dcfce7",text:"#16a34a"}:m==="Intermediate"?{bg:"#dbeafe",text:"#2563eb"}:{bg:"#f3e8ff",text:"#9333ea"})(a.category);return`
        <div style="background: #f8f9fa; min-height: 100vh; padding: 2rem 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                ${e("learn")}
                
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
                        <span style="background: ${s.bg}; color: ${s.text}; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
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
                            ${a.learningPoints.map(m=>`
                                <li style="display: flex; align-items: start; gap: 0.75rem;">
                                    <span style="color: #10b981; font-size: 1.25rem;">✓</span>
                                    <span style="color: #64748b; line-height: 1.6;">${m}</span>
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
    `},ie=({Breadcrumbs:e,state:t})=>`
        <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
            ${e("contact-us")}
            
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
    `,u=e=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(e),oe=({Breadcrumbs:e,state:t})=>{const o=t.products.slice(0,8).map((r,a)=>({...r,originalPrice:r.price*1.3,discount:[10,15,20,25,30][a%5],category:["Microcontrollers","Sensors","Tools","Robotics","Components"][a%5]}));return t.myCoupons,`
        <div style="background: #f8f9fa; min-height: 100vh; padding: 2rem 0;">
            <!-- Content Container -->
            <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                ${e("deals")}
                
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
                        <div style="font-size: 0.875rem; color: #64748b;">${o.length} products on sale</div>
                        <select style="padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 0.875rem; outline: none;" onchange="window.sortDeals(this.value)">
                            <option value="featured">Sort: Featured</option>
                            <option value="discount">Highest Discount</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
                        ${o.map(r=>`
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
                                            <span style="font-size: 1.5rem; font-weight: 700; color: #6366f1;">${u(r.price)}</span>
                                            <span style="font-size: 0.875rem; text-decoration: line-through; color: #94a3b8;">${u(r.originalPrice)}</span>
                                        </div>
                                        <div style="font-size: 0.75rem; color: #16a34a; font-weight: 600;">You save ${u(r.originalPrice-r.price)}</div>
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
    `};window.adminState={activeTab:"dashboard",isModalOpen:!1,modalType:null,editingId:null,uploadedImage:null,showConfirmModal:!1,confirmTitle:"",confirmMessage:"",confirmCallback:null,confirmItemName:""};window.showConfirmModal=(e,t,o,r)=>{window.adminState.showConfirmModal=!0,window.adminState.confirmTitle=e,window.adminState.confirmMessage=t,window.adminState.confirmItemName=o,window.adminState.confirmCallback=r,window.render()};window.hideConfirmModal=()=>{window.adminState.showConfirmModal=!1,window.adminState.confirmCallback=null,window.render()};window.executeConfirmAction=()=>{window.adminState.confirmCallback&&window.adminState.confirmCallback(),window.hideConfirmModal()};window.switchAdminTab=e=>{window.adminState.activeTab=e,e==="staff"&&window.api&&window.api.getUsers&&window.api.getUsers(),e==="orders"&&window.api&&(window.api.getOrders&&window.api.getOrders(),window.api.getUsers&&window.api.getUsers()),window.render(),e==="dashboard"&&setTimeout(()=>window.initAdminCharts(),100)};window.toggleAdminModal=(e,t=null,o=null)=>{window.adminState.isModalOpen=e,window.adminState.modalType=t,window.adminState.editingId=o,window.adminState.uploadedImage=null,window.render()};document.addEventListener("keydown",e=>{e.key==="Escape"&&window.adminState.isModalOpen&&window.toggleAdminModal(!1)});window.toggleNotifications=()=>{const e=document.getElementById("adminNotifications");e&&e.classList.toggle("show")};window.handleImageSelect=e=>{const t=e.target.files[0];window.processImageFile(t)};window.handleDragOver=e=>{e.preventDefault(),e.currentTarget.classList.add("dragover")};window.handleDragLeave=e=>{e.currentTarget.classList.remove("dragover")};window.handleDrop=e=>{e.preventDefault(),e.currentTarget.classList.remove("dragover");const t=e.dataTransfer.files[0];window.processImageFile(t)};window.processImageFile=e=>{if(!e)return;if(!["image/jpeg","image/png"].includes(e.type)){window.showToast("Only JPEG and PNG images are allowed.");return}if(e.size>3*1024*1024){window.showToast("File size must be less than 3MB.");return}const t=new FileReader;t.onload=o=>{window.adminState.uploadedImage=o.target.result;const r=document.getElementById("imagePreview"),a=document.getElementById("dropZone"),n=document.getElementById("previewImg");r&&a&&n&&(n.src=o.target.result,r.style.display="block",a.style.display="none")},t.readAsDataURL(e)};window.removeImage=()=>{window.adminState.uploadedImage=null;const e=document.getElementById("imagePreview"),t=document.getElementById("dropZone"),o=document.getElementById("fileInput");e&&t&&(e.style.display="none",t.style.display="flex",o&&(o.value=""))};window.handleSaveProduct=async e=>{e.preventDefault();const t=new FormData(e.target),o=Object.fromEntries(t.entries());if(o.price=parseFloat(o.price),o.stock=parseInt(o.stock),window.adminState.uploadedImage)o.image=window.adminState.uploadedImage;else if(window.adminState.editingId){const r=window.state.products.find(a=>String(a.id)===String(window.adminState.editingId)||a._id===window.adminState.editingId);r&&(o.image=r.image)}else o.image="https://via.placeholder.com/150";try{console.log("Saving product:",o);let r;window.adminState.editingId?(r=await x(`/products/${window.adminState.editingId}`,{method:"PUT",body:JSON.stringify(o)}),console.log("Update response:",r),window.showToast("Product updated successfully!","success")):(r=await x("/products",{method:"POST",body:JSON.stringify(o)}),console.log("Create response:",r),window.showToast("Product added successfully!","success")),window.toggleAdminModal(!1),window.api&&window.api.getProducts&&window.api.getProducts()}catch(r){console.error("Save product error:",r),window.showToast(window.adminState.editingId?"Failed to update product":"Failed to add product","error")}};window.handleDeleteProduct=(e,t="this product")=>{window.showConfirmModal("Delete Product","Are you sure you want to delete",t,async()=>{try{await x(`/products/${e}`,{method:"DELETE"}),window.showToast("Product deleted successfully!","success"),window.api&&window.api.getProducts&&window.api.getProducts()}catch(o){console.error(o),window.showToast("Failed to delete product","error")}})};window.handleSaveStaff=async e=>{e.preventDefault();const t=new FormData(e.target),o=Object.fromEntries(t.entries());try{window.adminState.editingId?(await x(`/users/${window.adminState.editingId}`,{method:"PUT",body:JSON.stringify({name:o.name,email:o.email,role:"staff"})}),window.showToast("Staff member updated!","success")):(await x("/users/register",{method:"POST",body:JSON.stringify({name:o.name,email:o.email,password:o.password,role:"staff"})}),window.showToast("Staff member added!","success")),window.toggleAdminModal(!1),window.api.getUsers&&window.api.getUsers()}catch(r){console.error(r),window.showToast(r.message||"Failed to save staff","error")}};window.handleEditStaff=e=>{window.adminState.editingId=e,window.toggleAdminModal(!0,"editStaff",e)};window.handleDeleteStaff=(e,t="this staff member")=>{window.showConfirmModal("Delete Staff","Are you sure you want to delete",t,async()=>{try{await x(`/users/${e}`,{method:"DELETE"}),window.showToast("Staff member deleted!","success"),window.api.getUsers&&window.api.getUsers()}catch(o){console.error(o),window.showToast("Failed to delete staff","error")}})};window.handleOrderStatusUpdate=async(e,t)=>{try{await x(`/orders/${e}/status`,{method:"PUT",body:JSON.stringify({status:t})}),window.showToast(`Order ${e} updated to ${t}!`,"success"),window.api.getOrders&&window.api.getOrders()}catch(o){console.error(o),window.showToast("Failed to update order status","error")}};const q=e=>{if(!e.currentUser||!["admin","staff"].includes(e.currentUser.role))return setTimeout(()=>window.navigate("home"),0),"";const{activeTab:t}=window.adminState,r=e.currentUser.role==="admin",a=r,n=r,s=r,m=e.orders.reduce((v,g)=>v+(g.total||0),0),d=e.orders.length,h=e.products.filter(v=>v.stock<10).length,f=e.users?e.users.filter(v=>v.role==="customer").length:0,l=[...e.orders].sort((v,g)=>new Date(g.createdAt)-new Date(v.createdAt)).slice(0,5),c=()=>`
        <aside class="admin-sidebar">
            <nav class="sidebar-nav" style="padding-top: 1rem;">
                <div class="sidebar-item ${t==="dashboard"?"active":""}" onclick="window.switchAdminTab('dashboard')">
                    <span>📊</span> Dashboard
                </div>
                <div class="sidebar-item ${t==="products"?"active":""}" onclick="window.switchAdminTab('products')">
                    <span>📦</span> Products
                </div>
                <div class="sidebar-item ${t==="orders"?"active":""}" onclick="window.switchAdminTab('orders')">
                    <span>📋</span> Orders
                </div>
                ${n?`
                <div class="sidebar-item ${t==="staff"?"active":""}" onclick="window.switchAdminTab('staff')">
                    <span>👥</span> Staff
                </div>`:""}
                
                <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div class="sidebar-item" onclick="window.navigate('home')">
                        <span>🏠</span> Back to Home
                    </div>
                </div>
            </nav>
        </aside>
    `,C=()=>`
        <div class="admin-page-header">
            <div>
                <h1 class="admin-title">Overview</h1>
                <p class="text-muted">Welcome back, ${e.currentUser.name}</p>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <div class="notifications-wrapper">
                    <button class="btn-ghost" onclick="window.toggleNotifications()" style="position: relative;">
                        🔔
                        ${h>0?'<span style="position: absolute; top: 0; right: 0; width: 8px; height: 8px; background: red; border-radius: 50%;"></span>':""}
                    </button>
                    <div id="adminNotifications" class="notifications-dropdown">
                        <div class="notification-item unread"><strong>System</strong><br>Dashboard ready.</div>
                        ${h>0?`<div class="notification-item unread"><strong>Alert</strong><br>${h} items low stock.</div>`:""}
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
                    <div><div class="stat-title">Total Sales</div><div class="stat-value">${u(m)}</div></div>
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
                    <div><div class="stat-title">Low Stock</div><div class="stat-value">${h}</div></div>
                    <div class="stat-icon" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e;">⚠️</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <div><div class="stat-title">Active Customers</div><div class="stat-value">${f}</div></div>
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">👥</div>
                </div>
            </div>
        </div>

        <div class="charts-grid">
            <div class="chart-card">
                <h3 class="font-bold text-slate-800 mb-4">Sales Overview</h3>
                <div style="height: 300px;"><canvas id="salesChart"></canvas></div>
            </div>
            <div class="chart-card">
                <h3 class="font-bold text-slate-800 mb-4">Customers</h3>
                <div style="height: 300px; display: flex; justify-content: center;"><canvas id="demographicsChart"></canvas></div>
            </div>
        </div>

        <div class="table-card">
            <h3 class="font-bold text-slate-800 mb-4">Recent Orders</h3>
            <table class="admin-table">
                <thead><tr><th>Order ID</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
                <tbody>
                    ${l.map(v=>`
                        <tr>
                            <td>#${v.orderId}</td>
                            <td>${new Date(v.createdAt).toLocaleDateString()}</td>
                            <td>${e.users.find(g=>g.id===v.userId)?.name||"Unknown"}</td>
                            <td>${u(v.total)}</td>
                            <td><span class="status-badge status-${v.status?.toLowerCase()||"pending"}">${v.status||"Pending"}</span></td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `,w=()=>`
        <div class="admin-page-header">
            <h1 class="admin-title">Product Management</h1>
            ${a?`<button class="btn btn-primary" onclick="window.toggleAdminModal(true, 'addProduct')">+ Add Product</button>`:""}
        </div>
        <div class="admin-table-container">
            <table class="admin-table">
                <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                    ${e.products.map(v=>`
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <img src="${v.image}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                                    <div>
                                        <div style="font-weight: 500;">${v.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">SKU: ${v.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td>${v.category}</td>
                            <td>${u(v.price)}</td>
                            <td>${v.stock}</td>
                            <td><span class="status-badge ${v.stock>0?"status-instock":"status-outofstock"}">${v.stock>0?"In Stock":"Out of Stock"}</span></td>
                            <td>
                                ${a?`<button class="btn-ghost" onclick="window.toggleAdminModal(true, 'editProduct', '${v._id||v.id}')">✏️</button>`:""}
                                ${s?`<button class="btn-ghost" style="color: var(--danger);" onclick="window.handleDeleteProduct('${v._id||v.id}', '${v.name.replace(/'/g,"\\'")}')">🗑️</button>`:""}
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `,$=()=>{const v=[...e.orders].sort((g,y)=>new Date(y.createdAt)-new Date(g.createdAt));return`
        <div class="admin-page-header">
            <h1 class="admin-title">Order Management</h1>
            <div style="display: flex; gap: 0.5rem;">
                <span class="status-badge status-pending">${e.orders.filter(g=>g.status==="Pending").length} Pending</span>
                <span class="status-badge status-processing">${e.orders.filter(g=>g.status==="Processing").length} Processing</span>
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
                    ${v.length>0?v.map(g=>{const y=e.users.find(E=>E.id===g.userId),M=y?y.name:"Unknown",T=y?.address||{},_=g.shippingAddress||(T.street?`${T.street}, ${T.barangay||""}, ${T.city||""}, ${T.province||""} ${T.postalCode||""}`:"No address provided");return`
                        <tr>
                            <td style="font-weight: 600; color: #3b82f6;">#${g.orderId}</td>
                            <td>${new Date(g.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <div class="admin-avatar-circle" style="width: 28px; height: 28px; font-size: 0.75rem;">${M.charAt(0).toUpperCase()}</div>
                                    <span>${M}</span>
                                </div>
                            </td>
                            <td>
                                <div style="max-width: 200px;">
                                    ${g.items.map(E=>`
                                        <div style="font-size: 0.8rem; color: #64748b;">
                                            ${E.quantity}x ${E.productName||"Item"}
                                        </div>
                                    `).join("")}
                                </div>
                            </td>
                            <td>
                                <div style="max-width: 180px; font-size: 0.85rem; color: #64748b;">
                                    ${_}
                                </div>
                            </td>
                            <td style="font-weight: 600;">${u(g.total)}</td>
                            <td>
                                <select 
                                    class="form-input" 
                                    style="padding: 0.4rem 0.6rem; font-size: 0.85rem; min-width: 120px;"
                                    onchange="window.handleOrderStatusUpdate('${g.orderId}', this.value)"
                                >
                                    <option value="Pending" ${g.status==="Pending"?"selected":""}>📦 Pending</option>
                                    <option value="Processing" ${g.status==="Processing"?"selected":""}>🔄 Processing</option>
                                    <option value="Completed" ${g.status==="Completed"?"selected":""}>✅ Completed</option>
                                    <option value="Cancelled" ${g.status==="Cancelled"?"selected":""}>❌ Cancelled</option>
                                </select>
                            </td>
                        </tr>
                        `}).join(""):'<tr><td colspan="7" style="text-align: center; padding: 2rem;">No orders found.</td></tr>'}
                </tbody>
            </table>
        </div>
    `},D=()=>{const v=e.users?e.users.filter(g=>["admin","staff"].includes(g.role)):[];return`
        <div class="admin-page-header">
            <h1 class="admin-title">Staff Management</h1>
            <button class="btn btn-primary" onclick="window.toggleAdminModal(true, 'addStaff')">+ Add Staff</button>
        </div>
        <div class="admin-table-container">
            <table class="admin-table">
                <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Actions</th></tr></thead>
                <tbody>
                    ${v.length>0?v.map(g=>`
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <div class="admin-avatar-circle" style="width: 36px; height: 36px; font-size: 0.875rem;">${g.name.charAt(0).toUpperCase()}</div>
                                    <div style="font-weight: 500;">${g.name}</div>
                                </div>
                            </td>
                            <td><span class="status-badge status-${g.role==="admin"?"admin":"staff"}">${g.role.toUpperCase()}</span></td>
                            <td>${g.email}</td>
                            <td>
                                ${g.role!=="admin"?`
                                    <button class="btn-ghost" onclick="window.handleEditStaff('${g._id||g.id}')">✏️</button>
                                    <button class="btn-ghost" style="color: var(--danger);" onclick="window.handleDeleteStaff('${g._id||g.id}', '${g.name.replace(/'/g,"\\'")}')">🗑️</button>
                                `:'<span style="color: #94a3b8; font-size: 0.875rem;">Protected</span>'}
                            </td>
                        </tr>
                    `).join(""):'<tr><td colspan="4" style="text-align: center; padding: 2rem;">No staff members found.</td></tr>'}
                </tbody>
            </table>
        </div>
    `},O=()=>{if(!window.adminState.isModalOpen)return"";let v="",g="";if(window.adminState.modalType==="addProduct"||window.adminState.modalType==="editProduct"){const y=window.adminState.editingId?e.products.find(M=>String(M.id)===String(window.adminState.editingId)||M._id===window.adminState.editingId):null;v=y?"Edit Product":"Add New Product",g=`
                <form onsubmit="window.handleSaveProduct(event)">
                    <div class="modal-body-grid">
                        <div class="modal-left-col">
                            <div class="form-group">
                                <label class="form-label">Product Name</label>
                                <input type="text" name="name" class="form-input" required placeholder="e.g. Arduino Uno" value="${y?y.name:""}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Category</label>
                                <select name="category" class="form-input">
                                    <option ${y?.category==="Microcontrollers"?"selected":""}>Microcontrollers</option>
                                    <option ${y?.category==="Sensors"?"selected":""}>Sensors</option>
                                    <option ${y?.category==="Components"?"selected":""}>Components</option>
                                    <option ${y?.category==="Robotics"?"selected":""}>Robotics</option>
                                </select>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div class="form-group">
                                    <label class="form-label">Price</label>
                                    <input type="number" name="price" step="0.01" class="form-input" required placeholder="0.00" value="${y?y.price:""}">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Stock</label>
                                    <input type="number" name="stock" class="form-input" required placeholder="0" value="${y?y.stock:""}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Description</label>
                                <textarea name="description" class="form-input" rows="4">${y?.description||""}</textarea>
                            </div>
                        </div>
                        
                        <div class="modal-right-col">
                            <label class="form-label">Product Image</label>
                            ${y&&y.image&&!window.adminState.uploadedImage?`
                                <div class="image-preview-area" style="display: block;" id="currentImagePreview">
                                    <img src="${y.image}" alt="Current Image">
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
                        <button type="submit" class="btn btn-primary">${y?"Update Product":"Add Product"}</button>
                    </div>
                </form>
            `}else if(window.adminState.modalType==="addStaff"||window.adminState.modalType==="editStaff"){const y=window.adminState.editingId?e.users.find(M=>String(M.id)===String(window.adminState.editingId)||M._id===window.adminState.editingId):null;v=y?"Edit Staff Member":"Add Staff Member",g=`
                <form onsubmit="window.handleSaveStaff(event)">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" name="name" class="form-input" required value="${y?y.name:""}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" name="email" class="form-input" required value="${y?y.email:""}">
                    </div>
                    ${y?"":`
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" name="password" class="form-input" required>
                    </div>
                    `}
                    <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1rem;">Role: <strong>Staff</strong></p>
                    <div class="modal-footer">
                        <button type="button" class="btn-cancel" onclick="window.toggleAdminModal(false)">Cancel</button>
                        <button type="submit" class="btn btn-primary">${y?"Update Staff":"Add Staff"}</button>
                    </div>
                </form>
            `}return`
            <div class="modal-overlay active" onclick="if(event.target === this) window.toggleAdminModal(false)">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 style="margin: 0;">${v}</h2>
                        <button class="close-modal" onclick="window.toggleAdminModal(false)" style="font-size: 2rem; line-height: 1; cursor: pointer;">&times;</button>
                    </div>
                    ${g}
                </div>
            </div>
        `};return`
        <div class="admin-wrapper">
            <header class="admin-custom-header">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 2rem;">
                    <div class="admin-logo">Lumina <span style="color: #F97316;">Electronics</span></div>
                    <div class="admin-profile-header">
                        <div class="admin-avatar-circle">${e.currentUser.name.charAt(0).toUpperCase()}</div>
                        <span class="admin-role-text">${e.currentUser.role.toUpperCase()}</span>
                    </div>
                </div>
            </header>

            <div class="admin-container">
                ${c()}
                <main class="admin-main">
                    ${t==="dashboard"?C():""}
                    ${t==="products"?w():""}
                    ${t==="orders"?$():""}
                    ${t==="staff"?D():""}
                </main>
            </div>
            ${O()}
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
        </div>
    `};window.initAdminCharts=()=>{const e=document.getElementById("salesChart");e&&(window.salesChartInstance&&window.salesChartInstance.destroy(),window.salesChartInstance=new Chart(e,{type:"line",data:{labels:["Jan","Feb","Mar","Apr","May","Jun","Jul"],datasets:[{label:"Sales",data:[4e3,3e3,5e3,2780,6890,2390,3490],borderColor:"#3b82f6",tension:.4,fill:!0,backgroundColor:"rgba(59, 130, 246, 0.1)"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,grid:{borderDash:[2,4]}},x:{grid:{display:!1}}}}}));const t=document.getElementById("demographicsChart");t&&(window.demoChartInstance&&window.demoChartInstance.destroy(),window.demoChartInstance=new Chart(t,{type:"doughnut",data:{labels:["Male","Female","Other"],datasets:[{data:[400,300,100],backgroundColor:["#0F172A","#F97316","#CBD5E1"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom"}}}}))};const F=({state:e})=>{if(!e.currentUser)return navigate("login"),"";const t=e.orders.filter(l=>l.userId===e.currentUser.id);t.filter(l=>l.status==="Pending"||l.status==="Processing"),t.filter(l=>l.status==="Shipped"),t.filter(l=>l.status==="Delivered"||l.status==="Completed");const o=e.myCoupons||[];e.params&&e.params.tab&&window.switchUserTab&&(!window._lastSwitchedTab||window._lastSwitchedTab!==e.params.tab)&&(window._lastSwitchedTab=e.params.tab,setTimeout(()=>window.switchUserTab(e.params.tab),50)),window.handleProfileUpdate||(window.handleProfileUpdate=async l=>{l.preventDefault();const c=l.target,C=c.name.value.trim(),w=c.email.value.trim(),$=c.phone.value.trim(),D=c.gender.value,O=`${c.birthYear.value}-${c.birthMonth.value}-${c.birthDay.value}`;if(!C||!w||!$||!D||!c.birthYear.value||!c.birthMonth.value||!c.birthDay.value){showToast("Please fill in all fields.");return}if(/\d/.test(C)){showToast("Name should not contain numbers.");return}if(!w.includes("@")){showToast("Please enter a valid email address.");return}if(!/^09\d{9}$/.test($)){showToast("Phone number must be 11 digits and start with 09.");return}try{await api.updateProfile(e.currentUser.id,{name:C,email:w,phone:$,gender:D,birthDate:O}),window.render()}catch(v){console.error("Profile update failed:",v)}}),window.handleImageUpload||(window.handleImageUpload=l=>{const c=l.target.files[0];if(!c)return;if(c.size>3*1024*1024){showToast("File size exceeds 3MB limit.");return}if(!["image/jpeg","image/png"].includes(c.type)){showToast("Only .JPEG and .PNG files are allowed.");return}const C=new FileReader;C.onload=w=>{const $={...e.currentUser,avatar:w.target.result};e.currentUser=$,localStorage.setItem("currentUser",JSON.stringify($)),showToast("Profile image updated!"),render()},C.readAsDataURL(c)}),window.handleAddressUpdate||(window.handleAddressUpdate=async l=>{l.preventDefault();const c=l.target,C={fullName:c.fullName.value,phone:c.phone.value,region:c.region.value,province:c.province.value,city:c.city.value,barangay:c.barangay.value,postalCode:c.postalCode.value,street:c.street.value,details:c.details.value};if(Object.values(C).some(w=>!w)){showToast("Please fill in all address fields.");return}try{await api.updateAddress(e.currentUser.id,C),render()}catch(w){console.error("Address update failed:",w)}}),window.handlePasswordUpdate||(window.handlePasswordUpdate=async l=>{l.preventDefault();const c=l.target,C=c.currentPassword.value,w=c.newPassword.value,$=c.confirmPassword.value;if(w.length<6){showToast("New password must be at least 6 characters.");return}if(w!==$){showToast("New passwords do not match.");return}try{await api.changePassword(e.currentUser.id,C,w),c.reset()}catch(D){console.error("Password change failed:",D)}}),window.switchUserTab||(window.switchUserTab=l=>{document.querySelectorAll(".user-tab-content").forEach(w=>w.style.display="none");const c=document.getElementById(`user-tab-${l}`);c&&(c.style.display="block"),document.querySelectorAll(".sidebar-link").forEach(w=>w.classList.remove("active"));const C=document.querySelector(`[data-tab="${l}"]`);C&&C.classList.add("active"),window.scrollTo(0,0)}),window.switchOrderTab||(window.switchOrderTab=l=>{document.querySelectorAll(".order-status-tab").forEach(c=>c.classList.remove("active")),document.querySelector(`.order-status-tab[data-status="${l}"]`).classList.add("active"),document.querySelectorAll(".order-item").forEach(c=>{l==="All"||c.dataset.status===l?c.style.display="block":c.style.display="none"})});const r=(l,c,C)=>{let w="";for(let $=l;$<=c;$++)w+=`<option value="${$}" ${parseInt(C)===$?"selected":""}>${$}</option>`;return w},a=["January","February","March","April","May","June","July","August","September","October","November","December"],n=e.currentUser.birthDate?new Date(e.currentUser.birthDate):null,s=n?n.getDate():"",m=n?n.getMonth()+1:"",d=n?n.getFullYear():"",h=e.currentUser.address||{},f=typeof h=="object"&&h!==null;return`
        <div class="user-page-wrapper">
            <div class="container">
                <div class="user-layout">
                    
                    <!-- Sidebar -->
                    <aside class="user-sidebar">
                        <div class="user-brief">
                            <div class="user-avatar-small">
                                ${e.currentUser.avatar?`<img src="${e.currentUser.avatar}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`:e.currentUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div class="user-brief-info">
                                <div class="user-name-truncate">${e.currentUser.name}</div>
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
                                    <li><a href="#" class="sidebar-link active" data-tab="profile" onclick="window.switchUserTab('profile'); return false;">Profile</a></li>
                                    <li><a href="#" class="sidebar-link" data-tab="address" onclick="window.switchUserTab('address'); return false;">Addresses</a></li>
                                    <li><a href="#" class="sidebar-link" data-tab="password" onclick="window.switchUserTab('password'); return false;">Change Password</a></li>
                                </ul>
                            </div>
                            <div class="nav-group">
                                <div class="nav-header">
                                    <span class="nav-icon">📦</span>
                                    My Purchase
                                </div>
                                <ul class="nav-list">
                                    <li><a href="#" class="sidebar-link" data-tab="orders" onclick="window.switchUserTab('orders'); return false;">Order History</a></li>
                                </ul>
                            </div>
                            <div class="nav-group">
                                <div class="nav-header">
                                    <span class="nav-icon">🎟️</span>
                                    My Vouchers
                                </div>
                                <ul class="nav-list">
                                    <li><a href="#" class="sidebar-link" data-tab="coupons" onclick="window.switchUserTab('coupons'); return false;">My Coupons</a></li>
                                </ul>
                            </div>
                        </nav>
                    </aside>

                    <!-- Main Content -->
                    <main class="user-content">
                        
                        <!-- 1. Profile Tab -->
                        <div id="user-tab-profile" class="user-tab-content">
                            <div class="content-header">
                                <h1>My Profile</h1>
                                <p>Manage and protect your account</p>
                            </div>

                            <div class="profile-layout">
                                <div class="profile-form-section">
                                    <form onsubmit="window.handleProfileUpdate(event)">
                                        <div class="form-row">
                                            <label>Username</label>
                                            <div class="form-value">${e.currentUser.email.split("@")[0]}</div>
                                        </div>
                                        <div class="form-row">
                                            <label>Name</label>
                                            <input type="text" name="name" value="${e.currentUser.name}" class="form-input" required>
                                        </div>
                                        <div class="form-row">
                                            <label>Email</label>
                                            <input type="email" name="email" value="${e.currentUser.email}" class="form-input" required>
                                        </div>
                                        <div class="form-row">
                                            <label>Phone Number</label>
                                            <input type="text" name="phone" value="${e.currentUser.phone||""}" class="form-input" placeholder="09XXXXXXXXX" required>
                                        </div>
                                        <div class="form-row">
                                            <label>Gender</label>
                                            <div class="radio-group">
                                                <label class="radio-label">
                                                    <input type="radio" name="gender" value="Male" ${e.currentUser.gender==="Male"?"checked":""} required> Male
                                                </label>
                                                <label class="radio-label">
                                                    <input type="radio" name="gender" value="Female" ${e.currentUser.gender==="Female"?"checked":""}> Female
                                                </label>
                                                <label class="radio-label">
                                                    <input type="radio" name="gender" value="Other" ${e.currentUser.gender==="Other"?"checked":""}> Other
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <label>Date of Birth</label>
                                            <div class="date-selects">
                                                <select name="birthDay" class="form-select" required>
                                                    <option value="">Day</option>
                                                    ${r(1,31,s)}
                                                </select>
                                                <select name="birthMonth" class="form-select" required>
                                                    <option value="">Month</option>
                                                    ${a.map((l,c)=>`<option value="${c+1}" ${parseInt(m)===c+1?"selected":""}>${l}</option>`).join("")}
                                                </select>
                                                <select name="birthYear" class="form-select" required>
                                                    <option value="">Year</option>
                                                    ${r(1950,2024,d)}
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
                                        ${e.currentUser.avatar?`<img src="${e.currentUser.avatar}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`:e.currentUser.name.charAt(0).toUpperCase()}
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
                        <div id="user-tab-address" class="user-tab-content" style="display: none;">
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
                        <div id="user-tab-password" class="user-tab-content" style="display: none;">
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
                        <div id="user-tab-orders" class="user-tab-content" style="display: none;">
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
                                ${t.length>0?t.map(l=>`
                                    <div class="order-item" data-status="${l.status==="Pending"||l.status==="Processing"?"Pending":l.status==="Shipped"?"Shipped":l.status==="Delivered"?"Completed":l.status}">
                                        <div class="order-header">
                                            <span>Order ID: ${l.id||l.orderId}</span>
                                            <span class="order-status status-${l.status.toLowerCase()}">${l.status}</span>
                                        </div>
                                        <div class="order-products">
                                            ${l.items.map(c=>`
                                                <div class="order-product">
                                                    <img src="${c.image||"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-family=%22Arial%22 font-size=%2212%22%3ENo Image%3C/text%3E%3C/svg%3E"}" alt="${c.name}">
                                                    <div class="product-details">
                                                        <div class="product-name">${c.name||c.productName}</div>
                                                        <div class="product-qty">x${c.quantity}</div>
                                                    </div>
                                                    <div class="product-price">${u(c.price)}</div>
                                                </div>
                                            `).join("")}
                                        </div>
                                        <div class="order-footer">
                                            <div class="order-total">
                                                Order Total: <span>${u(l.total)}</span>
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
                        <div id="user-tab-coupons" class="user-tab-content" style="display: none;">
                            <div class="content-header">
                                <h1>My Vouchers</h1>
                                <div style="display: flex; gap: 1rem; font-size: 0.875rem;">
                                    <a href="#" style="color: var(--primary);">Get more vouchers</a>
                                    <span style="color: #ddd;">|</span>
                                    <a href="#" style="color: var(--primary);">View voucher history</a>
                                </div>
                            </div>

                            <!-- Add Voucher Section -->
                            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 4px; display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                                <span style="font-weight: 500; color: #333;">Add Voucher</span>
                                <input type="text" placeholder="Please enter voucher code" style="flex: 1; padding: 0.625rem; border: 1px solid #e0e0e0; border-radius: 2px; outline: none;">
                                <button style="background: #e0e0e0; color: #999; border: none; padding: 0.625rem 1.5rem; border-radius: 2px; cursor: not-allowed;">Redeem</button>
                            </div>

                            <!-- Voucher Tabs -->
                            <div style="border-bottom: 1px solid #e0e0e0; margin-bottom: 1.5rem;">
                                <div style="display: inline-block; padding: 0.75rem 1.5rem; color: var(--primary); border-bottom: 2px solid var(--primary); font-weight: 500;">
                                    All (${o.length})
                                </div>
                            </div>

                            <!-- Vouchers List -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                ${o.map(l=>`
                                    <div style="display: flex; background: white; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                                        <!-- Left Side (Image/Icon) -->
                                        <div style="width: 120px; background: ${l.color}; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 1rem; position: relative; border-right: 2px dashed white;">
                                            <div style="font-size: 2rem; font-weight: 700;">%</div>
                                            <div style="font-size: 0.75rem; margin-top: 0.25rem;">LUMINA</div>
                                            <!-- Sawtooth border effect simulation -->
                                            <div style="position: absolute; right: -6px; top: 0; bottom: 0; width: 10px; background-image: radial-gradient(circle, white 4px, transparent 5px); background-size: 10px 14px; background-repeat: repeat-y;"></div>
                                        </div>
                                        
                                        <!-- Right Side (Details) -->
                                        <div style="flex: 1; padding: 1rem; display: flex; flex-direction: column; justify-content: center;">
                                            <div style="font-size: 1rem; font-weight: 600; color: #333; margin-bottom: 0.25rem;">${l.description}</div>
                                            <div style="font-size: 0.875rem; color: #666; margin-bottom: 0.25rem;">${l.condition}</div>
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
            }
        </style>
    `},re=({Breadcrumbs:e,state:t})=>{let o=[...t.products];switch(t.searchQuery&&(o=o.filter(r=>r.name.toLowerCase().includes(t.searchQuery.toLowerCase())||r.category.toLowerCase().includes(t.searchQuery.toLowerCase())||r.description.toLowerCase().includes(t.searchQuery.toLowerCase()))),t.filterCategory&&(o=o.filter(r=>r.category===t.filterCategory)),t.sortBy){case"price-asc":o.sort((r,a)=>r.price-a.price);break;case"price-desc":o.sort((r,a)=>a.price-r.price);break;case"name-asc":o.sort((r,a)=>r.name.localeCompare(a.name));break;case"name-desc":o.sort((r,a)=>a.name.localeCompare(r.name));break;case"featured":default:o.sort((r,a)=>r.id-a.id);break}return`
        <div style="padding: 2rem 0; max-width: 1200px; margin: 0 auto;">
            <!-- ... Breadcrumbs ... -->
            
            <!-- NEW FILTER BAR -->
            <div class="filter-bar">
                <div style="flex: 1; display: flex; gap: 1rem; align-items: center;">
                    <span style="font-weight: 600;">Filter By:</span>
                    <select class="filter-select" onchange="window.handleCategoryFilter(this.value)">
                        <option value="">All Categories</option>
                        <option value="Components" ${t.filterCategory==="Components"?"selected":""}>Components</option>
                        <option value="Sensors" ${t.filterCategory==="Sensors"?"selected":""}>Sensors</option>
                        <option value="Boards" ${t.filterCategory==="Boards"?"selected":""}>Boards</option>
                    </select>
                </div>
                <div class="sort-container">
                    <span class="sort-label">Sort by:</span>
                    <select class="sort-select" onchange="window.handleSort(this.value)">
                        <option value="featured" ${t.sortBy==="featured"?"selected":""}>Featured</option>
                        <option value="price-asc" ${t.sortBy==="price-asc"?"selected":""}>Price: Low to High</option>
                        <option value="price-desc" ${t.sortBy==="price-desc"?"selected":""}>Price: High to Low</option>
                    </select>
                </div>
            </div>
            <!-- ... Product Grid ... -->
             <div class="product-grid">
                ${o.map(ae).join("")}
            </div>
        </div>
    `},ae=e=>{const t=e.stock<10,o=t?"low-stock":"",r=t?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${e.id})" style="cursor: pointer;">
            <div class="product-badge ${o}">${r}</div>
            <div class="product-image">
                <img src="${e.image}" alt="${e.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${e.category}</div>
                <h3 class="product-title">${e.name}</h3>
                <div class="product-price">${u(e.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${e.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},ne=({Breadcrumbs:e,state:t})=>{const o=t.products.find(s=>s.id===t.currentProductId);if(!o)return navigate("home"),"";o.stock<10;const r=o.stock>0?"In Stock":"Out of Stock",a=o.stock>0?"var(--success)":"var(--danger)",n=t.products.filter(s=>s.id!==o.id).sort(()=>.5-Math.random()).slice(0,4);return`
        <div class="product-detail-container">
            <div class="breadcrumbs">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a> &gt; 
                <a href="#" onclick="window.navigate('products'); return false;">Products</a> &gt; 
                <span>${o.name}</span>
            </div>

            <div class="product-main">
                <div class="product-gallery">
                    <img src="${o.image}" alt="${o.name}">
                </div>

                <div class="product-details-info">
                    <div class="product-sku">SKU: LUM-${o.id.toString().padStart(4,"0")}</div>
                    <h1 class="detail-title">${o.name}</h1>
                    <div class="detail-price">${u(o.price)}</div>

                    <div class="detail-section">
                        <span class="detail-label">Description</span>
                        <p style="color: var(--text-muted); line-height: 1.6;">${o.description}</p>
                    </div>

                    <div class="detail-section">
                        <span class="detail-label">Quantity</span>
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="window.adjustDetailQty(-1)">-</button>
                            <input type="number" id="detailQty" class="qty-input" value="1" min="1" max="${o.stock}" readonly>
                            <button class="qty-btn" onclick="window.adjustDetailQty(1)">+</button>
                        </div>
                    </div>

                    <button class="btn-add-large" onclick="window.addToCartFromDetail(${o.id})">
                        Add To Cart
                    </button>

                    <div class="stock-status" style="color: ${a}">
                        <span class="stock-dot" style="background-color: ${a}"></span>
                        ${r} (${o.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${n.map(N).join("")}
                </div>
            </div>
        </div>
    `},N=e=>{const t=e.stock<10,o=t?"low-stock":"",r=t?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${e.id})" style="cursor: pointer;">
            <div class="product-badge ${o}">${r}</div>
            <div class="product-image">
                <img src="${e.image}" alt="${e.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${e.category}</div>
                <h3 class="product-title">${e.name}</h3>
                <div class="product-price">${u(e.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${e.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},R=({state:e})=>e.currentUser?(window.handleAdminProfileUpdate||(window.handleAdminProfileUpdate=async t=>{t.preventDefault();const o=t.target,r=o.name.value.trim(),a=o.email.value.trim(),n=o.phone.value.trim();if(!r||!a||!n){showToast("Please fill in all fields.");return}if(/\d/.test(r)){showToast("Name should not contain numbers.");return}if(!a.includes("@")){showToast("Please enter a valid email address.");return}if(!/^09\d{9}$/.test(n)){showToast("Phone number must be 11 digits and start with 09.");return}try{await window.api.updateProfile(e.currentUser.id,{name:r,email:a,phone:n}),window.render()}catch(s){console.error("Profile update failed:",s)}}),window.handleAdminPasswordUpdate||(window.handleAdminPasswordUpdate=async t=>{t.preventDefault();const o=t.target,r=o.currentPassword.value,a=o.newPassword.value,n=o.confirmPassword.value;if(a.length<6){showToast("New password must be at least 6 characters.");return}if(a!==n){showToast("New passwords do not match.");return}try{await window.api.changePassword(e.currentUser.id,r,a),o.reset()}catch(s){console.error("Password change failed:",s)}}),window.switchAdminProfileTab||(window.switchAdminProfileTab=t=>{document.querySelectorAll(".admin-tab-content").forEach(a=>a.style.display="none");const o=document.getElementById(`admin-tab-${t}`);o&&(o.style.display="block"),document.querySelectorAll(".admin-sidebar-link").forEach(a=>a.classList.remove("active"));const r=document.querySelector(`[data-tab="${t}"]`);r&&r.classList.add("active"),window.scrollTo(0,0)}),`
        <div class="user-page-wrapper">
            <div class="container">
                <div class="user-layout">
                    
                    <!-- Sidebar -->
                    <aside class="user-sidebar">
                        <div class="user-brief">
                            <div class="user-avatar-small">
                                ${e.currentUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div class="user-brief-info">
                                <div class="user-name-truncate">${e.currentUser.name}</div>
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
                                    <input type="text" name="name" value="${e.currentUser.name}" class="form-input" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 1.5rem;">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" value="${e.currentUser.email}" class="form-input" required>
                                </div>
                                <div class="form-group" style="margin-bottom: 2rem;">
                                    <label class="form-label">Phone Number</label>
                                    <input type="text" name="phone" value="${e.currentUser.phone||""}" class="form-input" placeholder="09XXXXXXXXX" required>
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
    `):(navigate("login"),""),i={products:[],users:[],orders:[],currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:sessionStorage.getItem("currentRoute")||"home",mobileMenuOpen:!1,searchQuery:"",showSuggestions:!1,searchSuggestions:[],currentProductId:null,devices:[],currentDeviceId:null,esp32Client:null,deviceStatus:{},telemetryData:{},sortBy:"featured",filterCategory:null,cartSearchQuery:"",isLoading:!1,cartSynced:!1,myCoupons:null,checkoutData:{shipping:{fullName:"",address:"",city:"",province:"",postalCode:"",phone:"",instructions:""},paymentMethod:"cod",shippingFee:50},lastOrderId:null},S={getProducts:async()=>{try{const e=await x("/products");i.products=e.data,b()}catch(e){console.error("Failed to load products:",e),p("Failed to load products")}},login:async(e,t)=>{console.log("Calling API login...");try{const o=await x("/users/login",{method:"POST",body:JSON.stringify({email:e,password:t})});i.currentUser=o.data,localStorage.setItem("currentUser",JSON.stringify(i.currentUser)),await L.getMyDevices(),await de(),await S.getMyOrders(),p(`Welcome back, ${i.currentUser.name}!`),k("home")}catch(o){throw p(o.message||"Login failed"),o}},register:async(e,t,o)=>{try{const r=await x("/users/register",{method:"POST",body:JSON.stringify({name:e,email:t,password:o})});i.currentUser=r.data,localStorage.setItem("currentUser",JSON.stringify(i.currentUser)),p("Account created successfully!"),k("home")}catch(r){throw p(r.message||"Registration failed"),r}},createOrder:async e=>{try{const t=await x("/orders",{method:"POST",body:JSON.stringify(e)});return i.cart=[],P(),p("Order placed successfully!"),i.currentUser.role==="admin"&&S.getOrders(),t.data}catch(t){throw p(t.message||"Failed to place order"),t}},getOrders:async()=>{if(!(!i.currentUser||!["admin","staff"].includes(i.currentUser.role)))try{const e=await x("/orders");i.orders=e.data,b()}catch(e){console.error("Failed to load orders:",e)}},getMyOrders:async()=>{if(i.currentUser)try{const e=await x(`/orders/my-orders?userId=${i.currentUser.id}`);i.orders=e.data,b()}catch(e){console.error("Failed to load orders:",e)}},getUsers:async()=>{if(!(!i.currentUser||!["admin","staff"].includes(i.currentUser.role)))try{const e=await x("/users");i.users=e.data,b()}catch(e){console.error("Failed to load users:",e)}},updateProfile:async(e,t)=>{try{const o=await x(`/users/${e}/profile`,{method:"PUT",body:JSON.stringify(t)});return i.currentUser=o.data,localStorage.setItem("currentUser",JSON.stringify(o.data)),window.showToast("Profile updated successfully!"),o.data}catch(o){throw window.showToast(o.message||"Failed to update profile"),o}},updateAddress:async(e,t)=>{try{const o=await x(`/users/${e}/address`,{method:"PUT",body:JSON.stringify(t)});return i.currentUser=o.data,localStorage.setItem("currentUser",JSON.stringify(o.data)),window.showToast("Address saved successfully!"),o.data}catch(o){throw window.showToast(o.message||"Failed to save address"),o}},changePassword:async(e,t,o)=>{try{await x(`/users/${e}/password`,{method:"PUT",body:JSON.stringify({currentPassword:t,newPassword:o})}),window.showToast("Password changed successfully!")}catch(r){throw window.showToast(r.message||"Failed to change password"),r}},claimCoupon:async e=>{if(!(i.currentUser&&["admin","staff"].includes(i.currentUser.role))){if(!i.currentUser){p("Please login to claim coupons"),window.openLoginModal();return}try{const t=await x("/coupons/claim",{method:"POST",body:JSON.stringify({userId:i.currentUser.id,couponCode:e})});return p("Coupon claimed successfully! 🎉"),t.data}catch(t){throw p(t.message||"Failed to claim coupon"),t}}},getMyCoupons:async()=>{if(i.currentUser)try{const e=await x(`/coupons/my-coupons?userId=${i.currentUser.id}`);i.myCoupons=e.data,b()}catch(e){console.error("Failed to load coupons:",e)}}};window.api=S;const L={getMyDevices:async()=>{if(i.currentUser)try{const e=await x(`/devices/my-devices?userId=${i.currentUser.id}`);i.devices=e.data,se(),b()}catch(e){console.error("Failed to load devices:",e),p("Failed to load devices")}},pairDevice:async(e,t)=>{try{const o=await x("/devices/pair",{method:"POST",body:JSON.stringify({deviceId:e,deviceToken:t,userId:i.currentUser.id})});p("Device paired successfully!"),await L.getMyDevices(),k("my-devices")}catch(o){throw p(o.message||"Device pairing failed"),o}}};function se(){i.esp32Client||(i.esp32Client=new ESP32SocketClient),!i.esp32Client.isConnected()&&i.currentUser&&i.esp32Client.connect(i.currentUser.id).catch(e=>{console.error("Failed to connect to WebSocket:",e)}),i.esp32Client.on("device:status",e=>{if(console.log("📊 Device status update:",e),i.devices){const t=i.devices.findIndex(o=>o.deviceId===e.deviceId);t!==-1&&(i.devices[t].status=e.status==="online"?"active":"offline",i.devices[t].lastOnline=e.timestamp,i.deviceStatus[e.deviceId]=e,i.route==="my-devices"&&b())}})}const P=()=>{localStorage.setItem("currentUser",JSON.stringify(i.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(i.cart))},de=async()=>{if(!(!i.currentUser||i.cartSynced))try{const e=await x(`/users/${i.currentUser.id}/cart/sync`,{method:"POST",body:JSON.stringify({localCart:i.cart})});i.cart=e.data.map(t=>({id:t.productId,name:t.name,price:t.price,image:t.image,quantity:t.quantity,category:t.category,selected:t.selected})),i.cartSynced=!0,P(),b(),p("Cart synced!")}catch(e){console.error("Cart sync failed:",e)}},k=(e,t={})=>{i.route=e,i.params=t,i.mobileMenuOpen=!1,sessionStorage.setItem("currentRoute",e),b(),window.scrollTo(0,0)};window.navigate=k;const p=e=>{const t=document.createElement("div");t.className="toast",t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3e3)};window.showToast=p;const I=e=>`
        <div class="breadcrumbs">
            <a href="#" onclick="window.navigate('home'); return false;">Home</a>
            <span class="breadcrumb-separator">›</span>
            <span>${{deals:"Deals",learn:"Learn","my-devices":"My Devices","device-pair":"Pair Device","remote-control":"Remote Control","about-us":"About Us","contact-us":"Contact Us",products:"Products",cart:"Cart",checkout:"Checkout"}[e]||e}</span>
        </div>
    `,U=()=>{const e=i.currentUser!==null;i.currentUser?.role;const t=["admin","staff"].includes(i.currentUser?.role),o=i.route==="cart",r=i.cart.length;return`
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
                            <input type="text" id="searchInput" class="search-input" placeholder="Search for Products..." 
                                value="${i.searchQuery}" oninput="window.handleSearchInput(event)"
                                onkeyup="if(event.key === 'Enter') window.handleSearch()" onfocus="window.showSearchSuggestions()">
                            <button class="search-btn" onclick="window.handleSearch()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                        </div>
                    </div>
                `}
                <div class="nav-actions" style="gap: 1.5rem;">
                    ${t?"":`
                    <a href="#" class="action-icon" onclick="window.navigate('cart'); return false;">
                        <div style="position: relative;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            ${r>0?`<span class="cart-count">${r}</span>`:""}
                        </div>
                        <span>Cart</span>
                    </a>
                    `}
                    
                    ${e?`
                        <div class="user-dropdown">
                            <div class="action-icon" style="cursor: pointer;">
                                <div style="width: 32px; height: 32px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                                    ${i.currentUser.name.charAt(0).toUpperCase()}
                                </div>
                                <span>${i.currentUser.name.split(" ")[0]}</span>
                            </div>
                            
                            <!-- Stardust Popover Menu -->
                            <div class="user-menu">
                                <div class="user-menu-header">
                                    <div class="user-menu-name">${i.currentUser.name}</div>
                                    <div class="user-menu-email">${i.currentUser.email}</div>
                                </div>
                                
                            
                                
                                ${["admin","staff"].includes(i.currentUser.role)?`
                                    <!-- Admin/Staff Items -->

                                    <a href="#" class="user-menu-item" onclick="window.navigate('admin-profile'); return false;">
                                        <span class="menu-icon">👤</span>
                                        <span>My Profile</span>
                                    </a>
                                    <a href="#" class="user-menu-item" onclick="window.navigate('admin'); return false;">
                                        <span class="menu-icon">📊</span>
                                        <span>${i.currentUser.role==="admin"?"Admin Dashboard":"Staff Dashboard"}</span>
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
            
            <nav class="header-nav ${i.mobileMenuOpen?"mobile-open":""}">
                <a href="#" class="nav-link ${i.route==="home"?"active":""}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${i.route==="products"?"active":""}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link ${i.route==="deals"?"active":""}" onclick="window.navigate('deals'); return false;">Deals</a>
                <a href="#" class="nav-link ${i.route==="learn"?"active":""}" onclick="window.navigate('learn'); return false;">Learn</a>
                <a href="#" class="nav-link ${i.route==="about-us"?"active":""}" onclick="window.navigate('about-us'); return false;">About Us</a>
                <a href="#" class="nav-link ${i.route==="contact-us"?"active":""}" onclick="window.navigate('contact-us'); return false;">Contact Us</a>
            </nav>
        </header>
    `},H=()=>{if(i.searchQuery){const o=i.products.filter(r=>r.name.toLowerCase().includes(i.searchQuery.toLowerCase())||r.category.toLowerCase().includes(i.searchQuery.toLowerCase())||r.description.toLowerCase().includes(i.searchQuery.toLowerCase()));return`
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
                        ${o.map(N).join("")}
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
                ${i.products.filter(o=>e.includes(o.id)).sort((o,r)=>e.indexOf(o.id)-e.indexOf(r.id)).map(N).join("")}
            </div>
        </div>
    `},le=()=>`
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
    `,ce=()=>{if(i.cart.length===0)return`
            <div class="text-center" style="padding: 4rem; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                <h2 style="margin-bottom: 1rem;">Your cart is empty</h2>
                <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
                <button class="btn btn-primary" onclick="window.navigate('products')">Start Shopping</button>
            </div>
        `;let e=i.cart;return i.cartSearchQuery&&(e=i.cart.filter(t=>t.name.toLowerCase().includes(i.cartSearchQuery.toLowerCase())||t.category.toLowerCase().includes(i.cartSearchQuery.toLowerCase()))),i.cart.reduce((t,o)=>t+o.price*o.quantity,0),`
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
                
                <div class="cart-search-message" style="${i.cartSearchQuery&&e.length===0?"":"display: none;"}">
                    ${i.cartSearchQuery&&e.length===0?`
                        <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                            No items found for "${i.cartSearchQuery}"
                        </p>
                    `:""}
                </div>
                
            <div class="cart-items">
                ${e.map(t=>{const o=i.products.filter(r=>r.category===t.category&&r.id!==t.id).slice(0,4);return`
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
                                <p class="text-muted">${u(t.price)}</p>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem; margin-right: 2rem;">
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${t.id}, ${t.quantity-1})">-</button>
                                <span>${t.quantity}</span>
                                <button class="btn btn-outline" style="padding: 0.25rem 0.5rem;" onclick="window.updateQuantity(${t.id}, ${t.quantity+1})">+</button>
                            </div>
                            
                            <div class="cart-item-actions" style="display: flex; align-items: center; gap: 0.5rem;">
                                <button class="btn-find-similar" onclick="window.toggleFindSimilar(${t.id})" style="display: flex; align-items: center; gap: 0.25rem;">
                                    Find Similar 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${t.showSimilar?"rotate(180deg)":"rotate(0deg)"}; transition: transform 0.2s;">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                <button class="btn-delete" onclick="window.removeFromCart(${t.id})" style="color: var(--danger); border-color: var(--danger);">Delete</button>
                            </div>
                        </div>
                        <div class="similar-products-dropdown ${t.showSimilar?"show":""}">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                                <h4 style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Similar Products</h4>
                                <button onclick="window.toggleFindSimilar(${t.id})" style="background: none; border: none; cursor: pointer;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            ${o.length>0?`
                                <div class="similar-products-grid">
                                    ${o.map(r=>`
                                        <div class="similar-product-card" onclick="window.viewProduct(${r.id})">
                                            <img src="${r.image}" alt="${r.name}" class="similar-product-image">
                                            <div class="similar-product-title" title="${r.name}">${r.name}</div>
                                            <div class="similar-product-price">${u(r.price)}</div>
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
                    <span>${u(i.cart.reduce((t,o)=>t+(o.selected!==!1?o.price*o.quantity:0),0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${i.cart.filter(t=>t.selected!==!1).length})
                </button>
            </div>
        </div>
        </div>
    `},me=()=>{if(!i.currentUser)return k("login"),"";const e=i.devices||[];return`
        <div style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            ${I("my-devices")}
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 2rem 0;">
                <h1 style="font-size: 2.5rem; margin: 0;">My Devices</h1>
                <button class="btn btn-primary" onclick="window.navigate('device-pair')">
                    + Pair New Device
                </button>
            </div>
            ${e.length===0?`
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
                    ${e.map(t=>{const o=!i.showTokens?.[t.deviceId];return`
                        <div class="device-card">
                            <div class="device-status-badge ${t.status==="active"||i.deviceStatus[t.deviceId]?.status==="online"?"online":"offline"}">
                                <span class="status-dot"></span>
                                ${t.status==="active"||i.deviceStatus[t.deviceId]?.status==="online"?"Online":t.status==="pending"?"Not Configured":"Offline"}
                            </div>
                            
                            <div class="device-icon">
                                🚗
                            </div>
                            
                            <h3 class="device-name">${t.deviceName}</h3>
                            <p class="device-id">ID: ${t.deviceId}</p>
                            <div class="info-row" style="margin-top: 0.5rem;">
                                <span class="label" style="color: var(--text-muted); font-size: 0.85rem;">Token:</span>
                                <div class="token-display" style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,0,0,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">
                                    <span class="token-value ${o?"masked":""}" style="font-family: monospace; font-size: 0.85rem;">
                                        ${o?"••••••••":t.deviceToken}
                                    </span>
                                    <button onclick="window.toggleToken('${t.deviceId}')" style="background:none; border:none; cursor: pointer; padding: 0; display: flex; align-items: center; color: var(--text-muted);">
                                        ${o?"👁️":"🔒"}
                                    </button>
                                </div>
                            </div>
                            
                            <div class="device-info">
                                <div class="info-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
                                        <path d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                    ${t.lastOnline?new Date(t.lastOnline).toLocaleDateString():"Never"}
                                </div>
                                <div class="info-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.5-12.5v5.793l2.646 2.647a.5.5 0 0 1-.707.707l-3-3A.5.5 0 0 1 7 8V3.5a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                    v${t.firmwareVersion||"1.0.0"}
                                </div>
                            </div>
                            
                            <div class="device-actions">
                                ${t.status==="active"||i.deviceStatus[t.deviceId]?.status==="online"?`
                                    <button class="btn btn-primary" onclick="window.startRemoteControl('${t.deviceId}')" style="width: 100%;">
                                        🎮 Control
                                    </button>
                                `:t.status==="pending"?`
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
    `},pe=()=>i.currentUser?`
        <div style="max-width: 600px; margin: 2rem auto; padding: 0 2rem;">
            ${I("device-pair")}
            
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
        
    `:(k("login"),""),ue=()=>{if(!i.currentUser)return k("login"),"";if(!i.currentDeviceId)return k("my-devices"),"";const e=i.devices?.find(d=>d.deviceId===i.currentDeviceId);if(!e)return k("my-devices"),"";const t=i.deviceStatus[e.deviceId]||{},o=i.telemetryData[e.deviceId]||{},r=t.status==="online",a=o.battery||0,n=2*Math.PI*20,s=n-a/100*n,m=Math.min(4,Math.max(0,Math.round((o.signal||0)/25)));return`
        <div style="max-width: 1200px; margin: 0 auto; padding: 1rem;">
            <div style="margin-bottom: 1rem;">
                <button class="btn btn-outline" onclick="window.stopRemoteControl()" style="padding: 0.75rem 1.5rem;">
                    ← Back to My Devices
                </button>
            </div>
            <div class="cyber-container">
                <!-- HUD Strip -->
                <div class="cyber-hud">
                    <!-- Battery Gauge -->
                    <div class="hud-group">
                        <div class="cyber-gauge">
                            <svg width="48" height="48" viewBox="0 0 48 48">
                                <circle class="gauge-bg" cx="24" cy="24" r="20" stroke-dasharray="${n}" stroke-dashoffset="0"></circle>
                                <circle class="gauge-fill" cx="24" cy="24" r="20" stroke-dasharray="${n}" stroke-dashoffset="${s}"></circle>
                            </svg>
                            <div class="gauge-text">${a}%</div>
                        </div>
                        <div class="info">
                            <div class="label">Battery</div>
                            <div class="value">${a>=70?"Good":a>=30?"Low":"Critical"}</div>
                        </div>
                    </div>
                    <!-- Signal Strength -->
                    <div class="hud-group">
                        <div class="icon-box">
                            <div class="signal-bars">
                                <div class="bar ${m>=1?"active":""}"></div>
                                <div class="bar ${m>=2?"active":""}"></div>
                                <div class="bar ${m>=3?"active":""}"></div>
                                <div class="bar ${m>=4?"active":""}"></div>
                            </div>
                        </div>
                        <div class="info">
                            <div class="label">Signal</div>
                            <div class="value">${o.signal||0}%</div>
                        </div>
                    </div>
                    <!-- Movement Status -->
                    <div class="hud-group">
                        <div class="icon-box">⚡</div>
                        <div class="info">
                            <div class="label">Status</div>
                            <div class="value">${o.isMoving?"Moving":"Idle"}</div>
                        </div>
                    </div>
                    <!-- Connection Status -->
                    <div class="hud-group">
                        <div class="icon-box">${r?"🟢":"🔴"}</div>
                        <div class="info">
                            <div class="label">Connection</div>
                            <div class="value">${r?"Online":"Offline"}</div>
                        </div>
                    </div>
                </div>
                <!-- Obstacle Alert (only show if detected) -->
                ${o.frontSensor?`
                    <div class="obstacle-alert">
                        ⚠️ OBSTACLE DETECTED AHEAD
                    </div>
                `:""}
                <!-- Control Deck (D-Pad) -->
                <div class="control-deck">
                    <div class="d-pad-grid">
                        <button class="d-pad-btn" data-dir="forward"
                            onmousedown="window.sendCarCommand('forward'); this.classList.add('active')"
                            onmouseup="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ontouchstart="window.sendCarCommand('forward'); this.classList.add('active')"
                            ontouchend="window.sendCarCommand('stop'); this.classList.remove('active')"
                            ${r?"":"disabled"}>
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
                            ${r?"":"disabled"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            <span>LEFT</span>
                        </button>
                        
                        <button class="d-pad-btn stop" data-dir="stop"
                            onclick="window.sendCarCommand('stop')"
                            ${r?"":"disabled"}>
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
                            ${r?"":"disabled"}>
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
                            ${r?"":"disabled"}>
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
                            oninput="document.getElementById('speedValue').textContent = this.value + '%'">
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
    `},ge=()=>{if(!i.currentUser)return k("login"),"";const e=i.cart.filter(a=>a.selected!==!1);if(e.length===0)return p("No items selected for checkout"),k("cart"),"";const t=e.reduce((a,n)=>a+n.price*n.quantity,0),o=i.checkoutData.shippingFee,r=t+o;return`
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
                            ${e.map(a=>`
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                                    <img src="${a.image}" alt="${a.name}" style="width: 60px; height: 60px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${a.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-muted);">Qty: ${a.quantity}</div>
                                    </div>
                                    <div style="font-weight: 700; color: var(--primary);">${u(a.price*a.quantity)}</div>
                                </div>
                            `).join("")}
                        </div>
                        <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Subtotal</span>
                                <span>${u(t)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Shipping Fee</span>
                                <span>${u(o)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                                <span>Total</span>
                                <span style="color: var(--primary);">${u(r)}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="window.placeOrder()" style="width: 100%; padding: 1rem; font-size: 1rem;">Place Order</button>
                        <div style="margin-top: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);">🔒 Your payment information is secure</div>
                    </div>
                </div>
            </div>
        </div>
    `},ve=()=>{if(!i.lastOrderId)return k("home"),"";const e=i.orders.find(n=>n.orderId===i.lastOrderId);if(!e)return k("home"),"";const t=new Date,o=new Date(t);o.setDate(t.getDate()+3);const r=new Date(t);r.setDate(t.getDate()+5);const a=`${o.toLocaleDateString("en-US",{month:"short",day:"numeric"})} - ${r.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} `;return`
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

            ${e.devices&&e.devices.length>0?`
                <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="font-size: 2rem;">🚗</div>
                        <div>
                            <h3 style="margin: 0; color: #0369a1;">ESP32 Smart Car Credentials</h3>
                            <p style="margin: 0; color: #0c4a6e; font-size: 0.9rem;">Use these details to configure your device</p>
                        </div>
                    </div>

                    ${e.devices.map((n,s)=>`
                        <div style="background: white; padding: 1rem; border-radius: 8px; border: 1px solid #e0f2fe; margin-bottom: ${s<e.devices.length-1?"1rem":"0"};">
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
                ${e.items.map(n=>`
                    <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${n.productName||n.name}</div>
                            <div style="font-size: 0.875rem; color: var(--text-muted);">Quantity: ${n.quantity}</div>
                        </div>
                        <div style="font-weight: 700; color: var(--primary);">${u(n.price*n.quantity)}</div>
                    </div>
                `).join("")}
                <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                    <span>Total Amount</span>
                    <span style="color: var(--primary);">${u(e.total)}</span>
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
    `};window.navigateToTutorial=e=>{k("tutorial-detail",{id:e})};window.filterLearningContent=e=>{i.filterLearnCategory=e,b()};window.navigateToTutorial=e=>{k("tutorial-detail",{id:e})};window.updateOrderStatus=(e,t)=>{const o=i.orders.find(r=>r.id===e);o&&(o.status=t,P(),p(`Order #${e} updated to ${t}`),b())};window.toggleSelectAll=e=>{document.querySelectorAll(".product-checkbox").forEach(o=>o.checked=e.checked)};window.bulkAction=e=>{const t=document.querySelectorAll(".product-checkbox:checked"),o=Array.from(t).map(r=>parseInt(r.value));if(o.length===0){p("No products selected");return}e==="delete"?confirm(`Delete ${o.length} products?`)&&(i.products=i.products.filter(r=>!o.includes(r.id)),P(),b(),p("Products deleted")):e==="restock"&&(i.products.forEach(r=>{o.includes(r.id)&&(r.stock+=10)}),P(),b(),p("Products restocked"))};window.viewOrderDetails=e=>{const t=i.orders.find(a=>a.id===e);if(!t)return;const o=i.users.find(a=>a.id===t.userId),r=`
        <div class="modal-overlay show" id="orderModal" onclick="if(event.target === this) window.closeModal()">
            <div class="modal-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>Order #${t.id}</h3>
                    <button class="btn-icon" onclick="window.closeModal()">✕</button>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p><strong>Customer:</strong> ${o?o.name:"Unknown"}</p>
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
                                <td style="padding: 0.5rem;">${u(a.price)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${u(t.total)}
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",r)};window.closeModal=()=>{const e=document.getElementById("orderModal");e&&e.remove()};const he=(e=null)=>{const t=e?i.products.find(r=>r.id===e):null,o=!!t;return`
        <div class="modal-overlay show" id="productModal" onclick="if(event.target === this) window.closeProductModal()">
            <div class="modal-content" style="max-width: 600px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3>${o?"Edit Product":"Add New Product"}</h3>
                    <button class="btn-icon" onclick="window.closeProductModal()">✕</button>
                </div>
                
                <form id="productForm" onsubmit="window.handleProductSubmit(event, ${e||"null"})" enctype="multipart/form-data">
                    <div class="form-group">
                        <label class="form-label">Product Name *</label>
                        <input type="text" name="name" class="form-input" value="${t?.name||""}" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Category *</label>
                        <input type="text" name="category" class="form-input" value="${t?.category||""}" required>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label class="form-label">Price (₱) *</label>
                            <input type="number" name="price" class="form-input" value="${t?.price||""}" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Stock *</label>
                            <input type="number" name="stock" class="form-input" value="${t?.stock||""}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Description *</label>
                        <textarea name="description" class="form-input" rows="3" required>${t?.description||""}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Image</label>
                        <input type="file" name="image" class="form-input" accept="image/*">
                        ${t?.image?`<div style="margin-top: 0.5rem;">Current: <img src="${t.image}" style="max-width: 100px;"></div>`:""}
                    </div>
                    
                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <button type="button" class="btn btn-outline" style="flex: 1;" onclick="window.closeProductModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary" style="flex: 1;">${o?"Update":"Create"} Product</button>
                    </div>
                </form>
            </div>
        </div>
    `};window.navigate=k;window.toggleMobileMenu=()=>{i.mobileMenuOpen=!i.mobileMenuOpen,b()};window.showProductModal=(e=null)=>{document.body.insertAdjacentHTML("beforeend",he(e))};window.closeProductModal=()=>{document.getElementById("productModal")?.remove()};window.editProduct=e=>{window.showProductModal(e)};window.deleteProduct=async e=>{if(confirm("Delete this product?"))try{await x(`/products/${e}`,{method:"DELETE"}),await S.getProducts(),p("Product deleted")}catch{p("Delete failed")}};window.handleProductSubmit=async(e,t)=>{e.preventDefault();const o=new FormData(e.target);try{const r=t?"PUT":"POST",a=t?`/products/${t}`:"/products";if(!(await fetch(`${j}${a}`,{method:r,body:o})).ok)throw new Error("Failed");await S.getProducts(),window.closeProductModal(),p(t?"Product updated!":"Product created!")}catch{p("Operation failed")}};window.handleSort=e=>{i.sortBy=e,b()};window.viewProduct=e=>{i.currentProductId=e,k("product-detail")};window.adjustDetailQty=e=>{const t=document.getElementById("detailQty");let o=parseInt(t.value)+e;o<1&&(o=1),t.value=o};window.addToCartFromDetail=e=>{if(i.currentUser&&["admin","staff"].includes(i.currentUser.role))return;const t=parseInt(document.getElementById("detailQty").value);if(!i.currentUser){p("Please login to shop"),window.openLoginModal();return}const o=i.products.find(a=>a.id===e),r=i.cart.find(a=>a.id===e);r?r.quantity+=t:i.cart.push({...o,quantity:t,selected:!0}),P(),p(`Added ${t} item(s) to cart`)};window.addToCart=async e=>{if(i.currentUser&&["admin","staff"].includes(i.currentUser.role))return;if(!i.currentUser){window.showToast("Please login to shop"),window.openLoginModal();return}const t=i.products.find(r=>r.id===e);if(!t)return;const o=i.cart.find(r=>r.id===e);if(o?o.quantity+=1:i.cart.push({...t,quantity:1,selected:!0}),P(),b(),window.showToast(`Added ${t.name} to cart! 🛒`),i.currentUser)try{await x(`/users/${i.currentUser.id}/cart`,{method:"PUT",body:JSON.stringify({cart:i.cart.map(r=>({productId:r.id,name:r.name,price:r.price,image:r.image,quantity:r.quantity,category:r.category,selected:r.selected!==!1}))})})}catch(r){console.error("Failed to sync cart:",r)}};window.updateQuantity=(e,t)=>{if(t<1){window.removeFromCart(e);return}const o=i.cart.find(r=>r.id===e);o&&(o.quantity=t,P(),b())};window.removeFromCart=e=>{i.cart=i.cart.filter(t=>t.id!==e),P(),b()};window.checkout=async()=>{if(i.cart.length===0)return;if(!i.currentUser){p("Please login to checkout"),k("login");return}if(i.cart.filter(t=>t.selected!==!1).length===0){p("No items selected for checkout");return}k("checkout")};window.updateShippingInfo=(e,t)=>{i.checkoutData.shipping[e]=t};window.selectPaymentMethod=e=>{i.checkoutData.paymentMethod=e,b()};window.handlePhoneInput=e=>{const t=e.value.replace(/[^0-9]/g,"");e.value=t,i.checkoutData.shipping.phone=t};window.handleNameInput=e=>{const t=e.value.replace(/[^a-zA-Z\s]/g,"");e.value=t,i.checkoutData.shipping.fullName=t};window.handleLocationInput=(e,t)=>{const o=e.value.replace(/[^a-zA-Z\s]/g,"");e.value=o,i.checkoutData.shipping[t]=o};window.handlePostalInput=e=>{const t=e.value.replace(/[^0-9]/g,"");e.value=t,i.checkoutData.shipping.postalCode=t};window.showPaymentModal=e=>new Promise(t=>{let o="";const r=`
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
                                <span style="font-weight: 700;">${u(e)}</span>
                            </div>
                            <div class="payment-summary-row total">
                                <span>To Pay:</span>
                                <span>${u(e)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentAmountInput"),s=document.getElementById("paymentError"),m=document.getElementById("paymentChangeDisplay"),d=document.getElementById("changeAmount"),h=document.getElementById("paymentConfirmBtn"),f=document.getElementById("paymentCancelBtn");setTimeout(()=>n.focus(),100),n.addEventListener("input",l=>{let c=l.target.value.replace(/[^0-9.]/g,"");const C=c.split(".");C.length>2&&(c=C[0]+"."+C.slice(1).join("")),l.target.value=c,o=c;const w=parseFloat(c);if(!c||isNaN(w)||w<0){s.textContent="",s.classList.remove("show"),n.classList.remove("error"),h.disabled=!0,m.classList.remove("show");return}if(w<e){const $=e-w;s.textContent=`Insufficient! Need ${u($)} more`,s.classList.add("show"),n.classList.add("error"),h.disabled=!0,m.classList.remove("show")}else{const $=w-e;s.classList.remove("show"),n.classList.remove("error"),h.disabled=!1,m.classList.add("show"),d.textContent=u($)}}),document.querySelectorAll(".quick-amount-btn").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-amount");n.value=c,n.dispatchEvent(new Event("input"))})}),f.addEventListener("click",()=>{a.remove(),t(null)}),a.addEventListener("click",l=>{l.target===a&&(a.remove(),t(null))}),h.addEventListener("click",()=>{const l=parseFloat(o);l>=e&&(a.remove(),t({amountPaid:l,change:l-e}))}),n.addEventListener("keypress",l=>{l.key==="Enter"&&!h.disabled&&h.click()}),document.addEventListener("keydown",function l(c){c.key==="Escape"&&(a.remove(),t(null),document.removeEventListener("keydown",l))})});window.showGCashModal=e=>new Promise(t=>{const o="GCASH-"+Date.now().toString().slice(-8),r=`
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
                                <span>${u(e)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentConfirmBtn"),s=document.getElementById("paymentCancelBtn"),m=document.getElementById("processingOverlay"),d=document.getElementById("successOverlay");s.addEventListener("click",()=>{a.remove(),t(null)}),n.addEventListener("click",()=>{m.classList.add("show"),setTimeout(()=>{m.classList.remove("show"),d.classList.add("show"),setTimeout(()=>{a.remove(),t({method:"gcash",reference:o})},1e3)},1500)}),a.addEventListener("click",h=>{h.target===a&&(a.remove(),t(null))})});window.showMayaModal=e=>new Promise(t=>{const o="MAYA-"+Date.now().toString().slice(-8),r=`
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
                                <span>${u(e)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentConfirmBtn"),s=document.getElementById("paymentCancelBtn"),m=document.getElementById("processingOverlay"),d=document.getElementById("successOverlay");s.addEventListener("click",()=>{a.remove(),t(null)}),n.addEventListener("click",()=>{m.classList.add("show"),setTimeout(()=>{m.classList.remove("show"),d.classList.add("show"),setTimeout(()=>{a.remove(),t({method:"maya",reference:o})},1e3)},1500)}),a.addEventListener("click",h=>{h.target===a&&(a.remove(),t(null))})});window.showCardModal=e=>new Promise(t=>{const s=`
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
                                <span>${u(e)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",s);const m=document.getElementById("paymentModalOverlay"),d=document.getElementById("paymentConfirmBtn"),h=document.getElementById("paymentCancelBtn"),f=document.getElementById("processingOverlay"),l=document.getElementById("successOverlay");h.addEventListener("click",()=>{m.remove(),t(null)}),d.addEventListener("click",()=>{f.classList.add("show"),setTimeout(()=>{f.classList.remove("show"),l.classList.add("show"),setTimeout(()=>{m.remove(),t({method:"card",last4:"1111"})},1e3)},2e3)}),m.addEventListener("click",c=>{c.target===m&&(m.remove(),t(null))})});window.showBankModal=e=>new Promise(t=>{const o="BDO-"+Date.now().toString().slice(-8),r=`
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
                                <span>${u(e)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.getElementById("paymentModalOverlay"),n=document.getElementById("paymentConfirmBtn"),s=document.getElementById("paymentCancelBtn"),m=document.getElementById("processingOverlay"),d=document.getElementById("successOverlay");s.addEventListener("click",()=>{a.remove(),t(null)}),n.addEventListener("click",()=>{m.classList.add("show"),setTimeout(()=>{m.classList.remove("show"),d.classList.add("show"),setTimeout(()=>{a.remove(),t({method:"bank",reference:o})},1e3)},1500)}),a.addEventListener("click",h=>{h.target===a&&(a.remove(),t(null))})});window.placeOrder=async()=>{const e=i.checkoutData.shipping;if(!e.fullName||!e.fullName.trim()){p("Please enter your full name");return}if(!e.address||!e.address.trim()){p("Please enter your address");return}if(!e.city||!e.city.trim()){p("Please enter your city");return}if(!e.province||!e.province.trim()){p("Please enter your province");return}if(!e.phone||!e.phone.trim()){p("Please enter your phone number");return}if(!/^09\d{9}$/.test(e.phone)){p('Phone number must start with "09" and contain exactly 11 digits');return}const o=/^[a-zA-Z\s]+$/;if(!o.test(e.fullName)){p("Full Name must contain letters and spaces only");return}if(!o.test(e.city)){p("City must contain letters and spaces only");return}if(!o.test(e.province)){p("Province must contain letters and spaces only");return}if(e.postalCode&&!/^\d+$/.test(e.postalCode)){p("Postal Code must contain numbers only");return}if(!i.checkoutData.paymentMethod){p("Please select a payment method");return}const r=i.cart.filter(f=>f.selected!==!1),n=r.reduce((f,l)=>f+l.price*l.quantity,0)+i.checkoutData.shippingFee;let s=null;switch(i.checkoutData.paymentMethod){case"cod":s=await showPaymentModal(n);break;case"gcash":s=await showGCashModal(n);break;case"maya":s=await showMayaModal(n);break;case"card":s=await showCardModal(n);break;case"bank":s=await showBankModal(n);break;default:p("Please select a payment method");return}if(!s)return;let m=s.amountPaid||n,d=s.change||0;const h={userId:i.currentUser.id,items:r.map(f=>({productId:f.id,quantity:f.quantity,price:f.price,name:f.name})),total:n,shippingInfo:i.checkoutData.shipping,paymentMethod:i.checkoutData.paymentMethod,shippingFee:i.checkoutData.shippingFee,amountPaid:m,change:d};try{const f=await S.createOrder(h);i.lastOrderId=f.orderId,i.lastOrderPayment={amountPaid:m,change:d},i.orders.push({orderId:f.orderId,...f,items:r,total:n,createdAt:new Date().toISOString(),userId:i.currentUser.id,devices:f.devices||[]}),i.cart=i.cart.filter(l=>l.selected===!1),P(),k("order-confirmation")}catch{}};window.printReceipt=()=>{if(!i.lastOrderId){p("No order found to print");return}const e=i.orders.find(n=>n.orderId===i.lastOrderId);if(!e){p("Order not found");return}const t=i.lastOrderPayment||{},o=new Date,r=`
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
                
                ${e.items.map(n=>`
                    <div class="item-row">
                        <div class="item-name">${n.productName||n.name}</div>
                        <div class="item-details">
                            <div>${u(n.price)}</div>
                            <div class="text-center">x${n.quantity}</div>
                            <div class="text-right"><strong>${u(n.price*n.quantity)}</strong></div>
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div class="totals-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>${u(e.total-i.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping Fee:</span>
                    <span>${u(i.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row grand-total">
                    <span>TOTAL:</span>
                    <span>${u(e.total)}</span>
                </div>
            </div>
            
            ${t.amountPaid?`
                <div class="payment-section">
                    <div class="payment-row">
                        <span>Amount Paid:</span>
                        <span>${u(t.amountPaid)}</span>
                    </div>
                    <div class="payment-row change-row">
                        <span>Change:</span>
                        <span>${u(t.change)}</span>
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
    `,a=window.open("","_blank","width=300,height=600");a.document.write(r),a.document.close(),a.onload=function(){setTimeout(()=>{a.print()},250)}};window.handleSearchInput=e=>{const t=e.target.value;if(i.searchQuery=t,t.trim()){const o=new Set;i.products.forEach(r=>{const a=r.name.toLowerCase(),n=r.category.toLowerCase(),s=t.toLowerCase();a.includes(s)&&o.add(r.name),n.includes(s)&&o.add(r.category),a.split(" ").forEach(d=>{d.toLowerCase().startsWith(s)&&d.length>2&&o.add(d.charAt(0).toUpperCase()+d.slice(1))})}),i.searchSuggestions=Array.from(o).slice(0,8),i.showSuggestions=!0}else if(i.searchSuggestions=[],i.showSuggestions=!1,i.route==="home"||i.route==="products"){b();return}Y()};function Y(){const e=document.querySelector(".search-container");if(!e)return;const t=e.querySelector(".search-suggestions");if(t&&t.remove(),i.showSuggestions&&i.searchQuery){const o=`
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
        `;e.insertAdjacentHTML("beforeend",o)}}window.showSearchSuggestions=()=>{i.searchQuery&&(i.showSuggestions=!0,Y())};window.selectSuggestion=e=>{i.searchQuery=e,i.showSuggestions=!1;const t=document.getElementById("searchInput");t&&(t.value=e),handleSearch()};window.handleSearch=()=>{i.showSuggestions=!1;const e=document.getElementById("searchInput");e&&(i.searchQuery=e.value.trim()),k("products"),setTimeout(()=>{const t=document.querySelector(".product-grid");t&&t.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{i.searchQuery="",i.showSuggestions=!1,i.searchSuggestions=[],b()};document.addEventListener("click",e=>{if(!e.target.closest(".search-container")&&i.showSuggestions){i.showSuggestions=!1;const t=document.querySelector(".search-suggestions");t&&t.remove()}});window.handleLogin=async e=>{console.log("Login attempt started"),e.preventDefault();const t=e.target.email.value,o=e.target.password.value;console.log("Credentials:",{email:t,password:o});try{await S.login(t,o),console.log("Login successful")}catch(r){console.error("Login error:",r)}};window.toggleUserMenu=()=>{const e=document.getElementById("user-menu-dropdown");e&&(e.style.display=e.style.display==="none"?"block":"none")};document.addEventListener("click",e=>{if(!e.target.closest(".user-menu-container")){const t=document.getElementById("user-menu-dropdown");t&&(t.style.display="none")}});window.handleSignup=async e=>{console.log("Signup attempt started"),e.preventDefault();const t=e.target.name.value,o=e.target.email.value,r=e.target.password.value;try{await S.register(t,o,r)}catch(a){console.error("Signup error:",a)}};window.logout=()=>{i.currentUser=null,i.cart=[],localStorage.removeItem("currentUser"),localStorage.removeItem("cart_v2"),p("Logged out successfully"),sessionStorage.removeItem("currentRoute"),k("home")};window.handleContactSubmit=e=>{e.preventDefault();const t=e.target,o={name:t.name.value,email:t.email.value,subject:t.subject.value,message:t.message.value};console.log("Contact form submitted:",o),p("Thank you for your message! We will get back to you soon."),t.reset()};window.deleteProduct=e=>{confirm("Are you sure you want to remove this product?")&&(i.products=i.products.filter(t=>t.id!==e),P(),b(),p("Product removed"))};window.viewOrderDetails=e=>{const t=i.orders.find(s=>s.orderId===e);if(!t){p("Order not found");return}const o=i.users.find(s=>s.id===t.userId),r=o?o.name:`User ID: ${t.userId}`,a=document.createElement("div");a.className="order-details-modal",a.innerHTML=`
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
                        <span class="info-value">${r}</span>
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
                    ${t.items.map(s=>`
                        <div class="order-item-row">
                            <div class="item-details">
                                <div class="item-name">${s.productName||"Product ID: "+s.productId}</div>
                                <div class="item-meta">Quantity: ${s.quantity} × ${u(s.price)}</div>
                            </div>
                            <div class="item-total">${u(s.price*s.quantity)}</div>
                        </div>
                    `).join("")}
                </div>
                
                <div class="order-total">
                    <span>Total Amount:</span>
                    <span class="total-amount">${u(t.total)}</span>
                </div>
            </div>
        </div>
    `,document.body.appendChild(a);const n=s=>{s.key==="Escape"&&(a.remove(),document.removeEventListener("keydown",n))};document.addEventListener("keydown",n)};const b=async()=>{const e=document.getElementById("app");let t="";switch(i.route){case"home":t=H();break;case"products":t=re({Breadcrumbs:I,state:i});break;case"product-detail":t=ne({Breadcrumbs:I,state:i});break;case"signup":t=le();break;case"cart":t=ce();break;case"checkout":t=ge();break;case"order-confirmation":t=ve();break;case"contact-us":t=ie({Breadcrumbs:I});break;case"about-us":t=Z({Breadcrumbs:I});break;case"learn":t=ee({Breadcrumbs:I,state:i});break;case"tutorial-detail":t=te({Breadcrumbs:I,state:i});break;case"deals":t=oe({Breadcrumbs:I,state:i});break;case"admin":t=q(i);break;case"user":t=F({state:i});break;case"admin-profile":t=R({state:i});break;case"my-devices":t=me();break;case"device-pair":t=pe();break;case"remote-control":t=ue();break;default:t=H()}if(i.route==="admin"){e.innerHTML=q(i),window.initAdminCharts&&setTimeout(()=>window.initAdminCharts(),100);return}if(i.route==="admin-profile"){e.innerHTML=U()+R({state:i});return}if(i.route==="user"){i.currentUser&&i.orders.length===0&&await S.getMyOrders(),i.currentUser&&!i.myCoupons&&await S.getMyCoupons(),e.innerHTML=U()+F({state:i});return}e.innerHTML=`
        ${U()}
        <main>
            ${t}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2025 Lumina Electronics. All rights reserved.
        </footer>
    `,i.route==="admin"&&window.initAdminCharts&&setTimeout(()=>window.initAdminCharts(),100),i.route==="deals"&&setTimeout(()=>window.startDealsTimer(),100)};window.render=b;window.handleCartSearch=e=>{i.cartSearchQuery=e.target.value,A()};window.clearCartSearch=()=>{i.cartSearchQuery="",A()};window.toggleCartItem=e=>{const t=i.cart.find(o=>o.id===e);t&&(t.selected=t.selected===!1,P(),A())};window.toggleFindSimilar=e=>{const t=i.cart.find(o=>o.id===e);t&&(i.cart.forEach(o=>{o.id!==e&&(o.showSimilar=!1)}),t.showSimilar=!t.showSimilar,P(),A())};function A(){const e=document.querySelector(".cart-items"),t=document.querySelector(".cart-summary"),o=document.querySelector(".cart-search-message");if(!e)return;let r=i.cart;if(i.cartSearchQuery&&(r=i.cart.filter(n=>n.name.toLowerCase().includes(i.cartSearchQuery.toLowerCase())||n.category.toLowerCase().includes(i.cartSearchQuery.toLowerCase()))),e.innerHTML=r.map(n=>{const s=i.products.filter(m=>m.category===n.category&&m.id!==n.id).slice(0,4);return`
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
                ${s.length>0?`
                    <div class="similar-products-grid">
                        ${s.map(m=>`
                            <div class="similar-product-card" onclick="window.viewProduct(${m.id})">
                                <img src="${m.image}" alt="${m.name}" class="similar-product-image">
                                <div class="similar-product-title" title="${m.name}">${m.name}</div>
                                <div class="similar-product-price">${u(m.price)}</div>
                            </div>
                        `).join("")}
                    </div>
                `:'<p class="text-muted text-center">No similar products found.</p>'}
            </div>
        </div>
    `}).join(""),t){const n=i.cart.reduce((m,d)=>m+(d.selected!==!1?d.price*d.quantity:0),0),s=i.cart.filter(m=>m.selected!==!1).length;t.innerHTML=`
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${u(n)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${s})
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
        `)}let Q=null;window.startDealsTimer=()=>{const e=new Date().getTime()+864e5;Q=setInterval(()=>{const t=new Date().getTime(),o=e-t,r=Math.floor(o%(1e3*60*60*24)/(1e3*60*60)),a=Math.floor(o%(1e3*60*60)/(1e3*60)),n=Math.floor(o%(1e3*60)/1e3),s=document.getElementById("deal-hours"),m=document.getElementById("deal-minutes"),d=document.getElementById("deal-seconds");s&&(s.textContent=String(r).padStart(2,"0")),m&&(m.textContent=String(a).padStart(2,"0")),d&&(d.textContent=String(n).padStart(2,"0")),o<0&&(clearInterval(Q),s&&(s.textContent="00"),m&&(m.textContent="00"),d&&(d.textContent="00"))},1e3)};window.filterLearningContent=e=>{i.filterLearnCategory=e,b()};window.sortDeals=e=>{const t=document.querySelector('[style*="grid-template-columns: repeat(4, 1fr)"]');if(!t)return;const o=Array.from(t.children);o.sort((r,a)=>{const n=m=>{const d=m.querySelector('[style*="font-size: 1.5rem"]')?.textContent;return parseFloat(d?.replace(/[₱,]/g,"")||"0")},s=m=>{const d=m.querySelector('[style*="background: #6366f1"]')?.textContent;return parseInt(d?.replace(/[-%]/g,"")||"0")};switch(e){case"discount":return s(a)-s(r);case"price-low":return n(r)-n(a);case"price-high":return n(a)-n(r);default:return 0}}),o.forEach(r=>t.appendChild(r))};window.currentLearnCategory="all";window.filterTutorials=e=>{window.currentLearnCategory=e;const t=document.querySelectorAll(".tutorial-card");document.querySelectorAll(".category-tab").forEach(r=>{r.classList.remove("active"),r.dataset.category===e&&r.classList.add("active")}),t.forEach(r=>{e==="all"||r.dataset.category===e?r.style.display="block":r.style.display="none"})};window.filterDeals=e=>{document.querySelectorAll(".deal-category-tab").forEach(t=>{const o=t.dataset.category===e;t.style.background=o?"#6366f1":"white",t.style.color=o?"white":"#64748b",t.dataset.category==="clearance"&&(e==="clearance"?(t.style.background="#dc2626",t.style.color="white",t.style.borderColor="#dc2626"):(t.style.background="white",t.style.color="#dc2626",t.style.borderColor="#dc2626"))}),document.querySelectorAll(".deal-product-card").forEach(t=>{const o=t.dataset.category;if(e==="all")t.style.display="block";else if(e==="clearance"){const r=t.querySelector('[style*="background: #6366f1"]')?.textContent,a=parseInt(r?.replace(/[-%]/g,"")||"0");t.style.display=a>=25?"block":"none"}else t.style.display=o===e?"block":"none"})};window.claimCoupon=async e=>{try{await S.claimCoupon(e),navigator.clipboard.writeText(e)}catch(t){console.error("Claim failed:",t)}};window.openVideoModal=e=>{const t=document.createElement("div");t.className="video-modal",t.innerHTML=`
        <div class="video-modal-content">
            <div class="video-modal-close" onclick="this.closest('.video-modal').remove()">✕</div>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${e}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `,document.body.appendChild(t),setTimeout(()=>t.classList.add("show"),10)};const fe=async()=>{await S.getProducts(),i.currentUser?.role==="admin"?await Promise.all([S.getOrders(),L.getMyDevices(),S.getUsers()]):i.currentUser&&await L.getMyDevices(),b()};window.showLoading=()=>{let e=document.querySelector(".loading-overlay");e||(e=document.createElement("div"),e.className="loading-overlay",e.innerHTML='<div class="spinner"></div>',document.body.appendChild(e)),e.offsetWidth,e.classList.add("active")};window.hideLoading=()=>{const e=document.querySelector(".loading-overlay");e&&(e.classList.remove("active"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300))};window.openLoginModal=()=>{document.body.insertAdjacentHTML("beforeend",`
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
    `),setTimeout(()=>{document.getElementById("loginModal").classList.add("show")},10)};window.closeLoginModal=()=>{const e=document.getElementById("loginModal");e&&(e.classList.remove("show"),setTimeout(()=>e.remove(),300))};window.closeLoginModalOnOverlay=e=>{e.target.id==="loginModal"&&window.closeLoginModal()};window.handleModalLogin=async e=>{e.preventDefault();const t=new FormData(e.target),o=t.get("email"),r=t.get("password");try{await S.login(o,r),window.closeLoginModal()}catch(a){console.error("Login error:",a)}};const ye=window.navigate;window.navigate=(e,t)=>{window.showLoading(),setTimeout(()=>{ye(e,t),window.hideLoading()},300)};window.handleDevicePairing=async e=>{e.preventDefault();const t=e.target,o=t.deviceId.value.trim(),r=t.deviceToken.value.trim();try{await L.pairDevice(o,r)}catch{}};window.handleDeviceUnpairing=async e=>{try{await L.unpairDevice(e)}catch{}};window.startRemoteControl=async e=>{i.currentDeviceId=e,i.esp32Client||(i.esp32Client=new ESP32SocketClient);try{await i.esp32Client.connect(i.currentUser.id),i.esp32Client.monitorDevice(e),i.esp32Client.on("device:status",t=>{i.deviceStatus[t.deviceId]=t,W()}),i.esp32Client.on("device:telemetry",t=>{i.telemetryData[t.deviceId]=t,W()}),i.esp32Client.on("command:sent",t=>{B(`Command sent: ${t.command}`)}),i.esp32Client.on("command:response",t=>{t.success?B(`✓ ${t.message||"Command executed"}`):B(`✗ ${t.error||"Command failed"}`)}),k("remote-control")}catch(t){p("Failed to connect to device"),console.error(t)}};window.stopRemoteControl=()=>{i.esp32Client&&i.esp32Client.stopMonitoring(),i.currentDeviceId=null,k("my-devices")};window.sendCarCommand=e=>{if(!(!i.esp32Client||!i.currentDeviceId))try{e==="stop"?i.esp32Client.stop(i.currentDeviceId):i.esp32Client.move(i.currentDeviceId,e,255)}catch(t){p("Failed to send command"),console.error(t)}};window.toggleLights=()=>{if(!i.esp32Client||!i.currentDeviceId)return;const e=document.getElementById("lightsToggle");if(e){e.classList.toggle("active");const t=e.classList.contains("active");try{i.esp32Client.sendCommand(i.currentDeviceId,"lights",{state:t?"on":"off"}),p(`Lights ${t?"ON":"OFF"}`)}catch(o){console.error("Failed to toggle lights:",o),e.classList.toggle("active")}}};window.toggleHorn=()=>{if(!i.esp32Client||!i.currentDeviceId)return;const e=document.getElementById("hornToggle");if(e){e.classList.toggle("active");const t=e.classList.contains("active");try{i.esp32Client.sendCommand(i.currentDeviceId,"horn",{state:t?"on":"off"}),p(`Horn ${t?"ON":"OFF"}`)}catch(o){console.error("Failed to toggle horn:",o),e.classList.toggle("active")}}};function W(){i.route==="remote-control"&&b()}function B(e){const t=document.getElementById("commandLogContent");if(t){const o=document.createElement("div");for(o.className="log-entry",o.textContent=`[${new Date().toLocaleTimeString()}] ${e}`,t.insertBefore(o,t.firstChild);t.children.length>10;)t.removeChild(t.lastChild)}}window.toggleToken=e=>{i.showTokens||(i.showTokens={}),i.showTokens[e]=!i.showTokens[e],b()};window.handleCategoryFilter=e=>{i.filterCategory=e||null,b()};document.addEventListener("keydown",e=>{if(i.route!=="remote-control")return;const t=e.key.toLowerCase(),o={w:"forward",arrowup:"forward",s:"backward",arrowdown:"backward",a:"left",arrowleft:"left",d:"right",arrowright:"right"," ":"stop"};o[t]&&(e.preventDefault(),window.sendCarCommand(o[t]))});document.addEventListener("keydown",e=>{e.key==="Escape"&&document.getElementById("loginModal")&&window.closeLoginModal()});document.addEventListener("keyup",e=>{if(i.route!=="remote-control")return;const t=e.key.toLowerCase();["w","s","a","d","arrowup","arrowdown","arrowleft","arrowright"].includes(t)&&(e.preventDefault(),window.sendCarCommand("stop"))});fe()});export default we();
