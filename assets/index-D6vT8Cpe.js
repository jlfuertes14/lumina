var U=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ce=U((ue,S)=>{(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();let A=class{constructor(e="https://lumina-production-a4bb.up.railway.app"){this.serverUrl=e,this.socket=null,this.connected=!1,this.currentDeviceId=null,this.eventHandlers=new Map}async connect(e,o=""){if(this.socket&&this.connected){console.warn("Already connected to WebSocket");return}return new Promise((r,n)=>{if(typeof io>"u"){const a=document.createElement("script");a.src="https://cdn.socket.io/4.5.4/socket.io.min.js",a.onload=()=>this._initializeSocket(e,o,r,n),a.onerror=()=>n(new Error("Failed to load Socket.IO")),document.head.appendChild(a)}else this._initializeSocket(e,o,r,n)})}_initializeSocket(e,o,r,n){try{this.socket=io(`${this.serverUrl}/control`,{auth:{userId:e,sessionToken:o},transports:["websocket","polling"]}),this.socket.on("connect",()=>{console.log("✅ Connected to ESP32 WebSocket server"),this.connected=!0,this._triggerEvent("connected"),r()}),this.socket.on("connect_error",a=>{console.error("❌ Connection error:",a.message),this.connected=!1,this._triggerEvent("error",a),n(a)}),this.socket.on("disconnect",()=>{console.log("❌ Disconnected from WebSocket server"),this.connected=!1,this._triggerEvent("disconnected")}),this.socket.on("device:status",a=>{console.log("📊 Device status:",a),this._triggerEvent("device:status",a)}),this.socket.on("device:telemetry",a=>{this._triggerEvent("device:telemetry",a)}),this.socket.on("command:response",a=>{this._triggerEvent("command:response",a)}),this.socket.on("command:sent",a=>{this._triggerEvent("command:sent",a)}),this.socket.on("device:error",a=>{console.error("Device error:",a),this._triggerEvent("device:error",a)}),this.socket.on("devices:list",a=>{this._triggerEvent("devices:list",a)}),this.socket.on("error",a=>{console.error("System error:",a),this._triggerEvent("error",a)})}catch(a){n(a)}}monitorDevice(e){if(!this.connected)throw new Error("Not connected to WebSocket server");this.currentDeviceId=e,this.socket.emit("monitor:device",e),console.log(`👁️ Monitoring device: ${e}`)}stopMonitoring(){this.currentDeviceId&&this.connected&&(this.socket.emit("monitor:stop",this.currentDeviceId),this.currentDeviceId=null)}sendCommand(e,o,r={}){if(!this.connected)throw new Error("Not connected to WebSocket server");this.socket.emit("control:command",{deviceId:e,command:o,payload:r}),console.log(`📤 Sent command to ${e}:`,o,r)}move(e,o,r=255){this.sendCommand(e,"move",{direction:o,speed:r})}stop(e){this.sendCommand(e,"stop")}turnLeft(e,o=200){this.sendCommand(e,"move",{direction:"left",speed:o})}turnRight(e,o=200){this.sendCommand(e,"move",{direction:"right",speed:o})}forward(e,o=255){this.sendCommand(e,"move",{direction:"forward",speed:o})}backward(e,o=255){this.sendCommand(e,"move",{direction:"backward",speed:o})}requestDeviceList(){if(!this.connected)throw new Error("Not connected to WebSocket server");this.socket.emit("devices:list")}on(e,o){this.eventHandlers.has(e)||this.eventHandlers.set(e,[]),this.eventHandlers.get(e).push(o)}off(e,o){if(!this.eventHandlers.has(e))return;const r=this.eventHandlers.get(e),n=r.indexOf(o);n>-1&&r.splice(n,1)}_triggerEvent(e,o=null){if(!this.eventHandlers.has(e))return;this.eventHandlers.get(e).forEach(n=>{try{n(o)}catch(a){console.error(`Error in event handler for ${e}:`,a)}})}disconnect(){this.socket&&(this.stopMonitoring(),this.socket.disconnect(),this.socket=null,this.connected=!1,console.log("👋 Disconnected from WebSocket"))}isConnected(){return this.connected}getCurrentDevice(){return this.currentDeviceId}};typeof S<"u"&&S.exports&&(S.exports=A);typeof window<"u"&&(window.ESP32SocketClient=A);const q="https://lumina-production-a4bb.up.railway.app",F="http://localhost:3000",j=window.location.hostname==="jlfuertes14.github.io",M=j?`${q}/api`:`${F}/api`;async function f(t,e={}){const o=`${M}${t}`;try{const r=await fetch(o,{...e,headers:{"Content-Type":"application/json",...e.headers}}),n=await r.json();if(!r.ok)throw new Error(n.error||n.message||"API request failed");return n}catch(r){throw console.error("API Error:",r),r}}console.log(`🌍 Environment: ${j?"PRODUCTION":"DEVELOPMENT"}`);console.log(`🔗 API URL: ${M}`);const R=({Breadcrumbs:t})=>{const e=[{name:"Marco Dela Cruz",role:"Founder & CEO",image:"https://ui-avatars.com/api/?name=Marco+Dela+Cruz&background=6366f1&color=fff&size=120"},{name:"Rina Gonzales",role:"Operations Manager",image:"https://ui-avatars.com/api/?name=Rina+Gonzales&background=6366f1&color=fff&size=120"},{name:"Luis Navarro",role:"Technical Support Engineer",image:"https://ui-avatars.com/api/?name=Luis+Navarro&background=6366f1&color=fff&size=120"},{name:"Ella Ramirez",role:"Customer Service Lead",image:"https://ui-avatars.com/api/?name=Ella+Ramirez&background=6366f1&color=fff&size=120"}];return`
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
                        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; font-weight: 700;">Our Mission</h2>
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
                        ${e.map(a=>`
                            <div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center; transition: transform 0.2s; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                                <div style="width: 100px; height: 100px; margin: 0 auto 1.5rem; border-radius: 50%; overflow: hidden; border: 4px solid #f1f5f9;">
                                    <img src="${a.image}" alt="${a.name}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #1e293b; font-weight: 600;">${a.name}</h3>
                                <p style="font-size: 0.875rem; color: #6366f1; font-weight: 500;">${a.role}</p>
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
    `},H=({Breadcrumbs:t,state:e})=>{const o=[{id:1,title:"Getting Started with Arduino",category:"Beginner",topic:"Microcontrollers",duration:"15 min",videoId:"nL34zDTPkcs",featured:!0},{id:2,title:"Raspberry Pi Setup Guide",category:"Beginner",topic:"Microcontrollers",duration:"20 min",videoId:"BpJCAafw2qE",featured:!0},{id:3,title:"Understanding Sensors",category:"Intermediate",topic:"IoT",duration:"18 min",videoId:"DlG6LY84MUU",recent:!0},{id:4,title:"DIY Obstacle Avoidance Car",category:"Intermediate",topic:"IoT",duration:"6 min",videoId:"1n_KjpMfVT0",recent:!0},{id:5,title:"PCB Design Basics",category:"Advanced",topic:"PCB Design",duration:"60 min",videoId:"vaCVh2SAZY4",featured:!0},{id:6,title:"IoT Projects with ESP32",category:"Advanced",topic:"IoT",duration:"50 min",videoId:"xPlN_Tk3VLQ",recent:!0},{id:7,title:"8 Brilliant Projects with 3D Printing and Electronics!",category:"Intermediate",topic:"Microcontrollers",duration:"8 min",videoId:"UkWoPMa6V-M",featured:!0},{id:8,title:"Building a Weather Station",category:"Advanced",topic:"IoT",duration:"42 min",videoId:"U0kPgFcALac",recent:!0}],r=o.filter(d=>d.featured),n=o.filter(d=>d.recent),a=d=>d==="Beginner"?{bg:"#dcfce7",text:"#16a34a"}:d==="Intermediate"?{bg:"#dbeafe",text:"#2563eb"}:{bg:"#f3e8ff",text:"#9333ea"},c=e.filterLearnCategory&&e.filterLearnCategory!=="all",s=c?o.filter(d=>d.category===e.filterLearnCategory):o;return`
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
                ${c?`
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
                            ${r.map(d=>{const u=a(d.category);return`
                                <div class="tutorial-card" style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column;" 
                                     onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.12)'"
                                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'">
                                    <div style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden;">
                                        <img src="https://img.youtube.com/vi/${d.videoId}/maxresdefault.jpg" alt="${d.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                                        <div style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.85); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                            ⏱ ${d.duration}
                                        </div>
                                        <div style="position: absolute; top: 0.5rem; left: 0.5rem; background: ${u.bg}; color: ${u.text}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
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
                            ${n.map(d=>{const u=a(d.category);return`
                                <div class="tutorial-card" style="background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column;" 
                                     onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.12)'"
                                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'">
                                    <div style="position: relative; aspect-ratio: 16/9; background: #000; overflow: hidden;">
                                        <img src="https://img.youtube.com/vi/${d.videoId}/maxresdefault.jpg" alt="${d.title}" style="width: 100%; height: 100%; object-fit: cover;" />
                                        <div style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.85); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                                            ⏱ ${d.duration}
                                        </div>
                                        <div style="position: absolute; top: 0.5rem; left: 0.5rem; background: ${u.bg}; color: ${u.text}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
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
    `},Q=({Breadcrumbs:t,state:e})=>{const o=e.params?.id,n=[{id:1,title:"Getting Started with Arduino",category:"Beginner",topic:"Microcontrollers",duration:"15 min",videoId:"nL34zDTPkcs",description:"Dive into the world of Arduino microcontrollers with this comprehensive beginner's guide. You'll learn the fundamental concepts of Arduino programming, understand the hardware components, and create your first working projects. This tutorial covers everything from setting up your development environment to uploading your first sketch onto the Arduino board. Perfect for absolute beginners with no prior programming or electronics experience.",learningPoints:["Setting up the Arduino IDE and connecting your board","Understanding Arduino pin configurations and digital I/O","Writing and uploading your first Arduino sketch","Working with basic sensors and LED circuits"]},{id:2,title:"Raspberry Pi Setup Guide",category:"Beginner",topic:"Microcontrollers",duration:"20 min",videoId:"BpJCAafw2qE",description:"Get your Raspberry Pi up and running with this detailed setup tutorial. Learn how to install the operating system, configure essential settings, and prepare your Pi for your first projects. This guide covers both the hardware setup process and the software configuration you'll need to start building amazing IoT projects. Whether you're using Raspberry Pi 3, 4, or 5, this tutorial will help you get started quickly and correctly.",learningPoints:["Installing Raspberry Pi OS using the official imager","Configuring network settings and enabling SSH","Installing essential packages and development tools","Understanding the GPIO pinout and basic Python programming"]},{id:3,title:"Understanding Sensors",category:"Intermediate",topic:"IoT",duration:"18 min",videoId:"DlG6LY84MUU",description:"Explore the fascinating world of electronic sensors and learn how to integrate them into your projects. This tutorial provides an in-depth look at various sensor types including temperature sensors (DHT11, DS18B20), motion sensors (PIR), ultrasonic distance sensors (HC-SR04), and light sensors (LDR, BH1750). You'll understand how sensors work, how to read their data, and how to calibrate them for accurate measurements in real-world applications.",learningPoints:["Understanding analog vs digital sensors and their applications","Reading data from temperature and humidity sensors","Working with motion detection and ultrasonic distance measurement","Implementing sensor calibration and data filtering techniques"]},{id:4,title:"DIY Obstacle Avoidance Car",category:"Intermediate",topic:"IoT",duration:"6 min",videoId:"1n_KjpMfVT0",description:"Build an intelligent autonomous car that can navigate around obstacles using ultrasonic sensors and Arduino. This hands-on project combines motor control, sensor integration, and basic robotics programming. You'll learn how to read ultrasonic sensor data, implement decision-making logic, and control DC motors using an L298N motor driver. This is a perfect project for understanding the basics of autonomous navigation and robotics.",learningPoints:["Wiring and controlling DC motors with an L298N driver","Reading and processing ultrasonic sensor data for obstacle detection","Implementing autonomous navigation logic and decision trees","Troubleshooting common issues in robotic car projects"]},{id:5,title:"PCB Design Basics",category:"Advanced",topic:"PCB Design",duration:"60 min",videoId:"vaCVh2SAZY4",description:"Master the art of printed circuit board (PCB) design from scratch. This comprehensive tutorial takes you through the entire PCB design workflow using professional tools like KiCad or EasyEDA. Learn how to create schematics, design PCB layouts, route traces efficiently, and prepare your designs for manufacturing. You'll understand design rules, layer stackups, component placement strategies, and how to export Gerber files for fabrication. Essential knowledge for anyone serious about electronics development.",learningPoints:["Creating professional schematics with proper component symbols","PCB layout best practices: trace width, clearances, and ground planes","Routing strategies for signal integrity and EMI reduction","Preparing and exporting Gerber files for PCB manufacturing"]},{id:6,title:"IoT Projects with ESP32",category:"Advanced",topic:"IoT",duration:"50 min",videoId:"xPlN_Tk3VLQ",description:"Unlock the power of the ESP32 microcontroller for advanced IoT applications. This tutorial covers WiFi connectivity, web server creation, MQTT protocol implementation, and cloud integration. You'll build real IoT projects including a web-based temperature monitor, remote-controlled devices, and data logging systems. Learn how to use the ESP32's dual-core processor, Bluetooth capabilities, and low-power modes to create professional-grade IoT solutions.",learningPoints:["Setting up ESP32 development environment and WiFi connectivity","Creating web servers and REST APIs on the ESP32","Implementing MQTT for real-time IoT communication","Integrating with cloud platforms (Firebase, AWS IoT, ThingSpeak)"]},{id:7,title:"8 Brilliant Projects with 3D Printing and Electronics!",category:"Intermediate",topic:"Microcontrollers",duration:"8 min",videoId:"UkWoPMa6V-M",description:"Discover the perfect fusion of 3D printing and electronics in this inspiring project showcase. See how makers are combining custom 3D-printed enclosures with Arduino and Raspberry Pi to create amazing devices. From smart home sensors to robotic mechanisms, this video demonstrates practical applications and design techniques. Learn how to design functional enclosures, integrate electronics seamlessly, and bring your maker ideas to life with the power of additive manufacturing.",learningPoints:["Designing functional 3D-printed enclosures for electronics","Integrating sensors and displays into custom housings","Creating cable management and mounting solutions","Prototyping techniques for iterative design improvements"]},{id:8,title:"Building a Weather Station",category:"Advanced",topic:"IoT",duration:"42 min",videoId:"U0kPgFcALac",description:"Create a complete IoT weather station that measures temperature, humidity, atmospheric pressure, and more. This advanced project teaches you how to interface with BME280/BMP280 sensors, implement accurate data logging, visualize weather data on web dashboards, and even integrate with weather services like Weather Underground. You'll learn about sensor calibration, data averaging techniques, power management for outdoor deployment, and how to create professional data visualizations using Chart.js or similar libraries.",learningPoints:["Interfacing with BME280/BMP280 environmental sensors via I2C","Implementing data logging with timestamps and SD card storage","Creating real-time data visualizations and web dashboards","Power management and weatherproofing for outdoor installations"]}].find(s=>s.id===parseInt(o));if(!n)return`
            <div style="max-width: 1200px; margin: 4rem auto; padding: 2rem; text-align: center;">
                <h1>Tutorial Not Found</h1>
                <p style="color: #64748b; margin: 1rem 0;">The tutorial you're looking for doesn't exist.</p>
                <button class="btn btn-primary" onclick="window.navigate('learn')">Back to Learn</button>
            </div>
        `;const c=(s=>s==="Beginner"?{bg:"#dcfce7",text:"#16a34a"}:s==="Intermediate"?{bg:"#dbeafe",text:"#2563eb"}:{bg:"#f3e8ff",text:"#9333ea"})(n.category);return`
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
                            src="https://www.youtube.com/embed/${n.videoId}" 
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
                        <span style="background: ${c.bg}; color: ${c.text}; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
                            ${n.category}
                        </span>
                        <span style="background: #f1f5f9; color: #64748b; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
                            📚 ${n.topic}
                        </span>
                        <span style="background: #f1f5f9; color: #64748b; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
                            ⏱️ ${n.duration}
                        </span>
                    </div>

                    <h1 style="font-size: 2rem; color: #1e293b; margin-bottom: 1.5rem; font-weight: 700;">
                        ${n.title}
                    </h1>

                    <div style="border-top: 1px solid #e2e8f0; padding-top: 1.5rem;">
                        <h2 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 1rem; font-weight: 600;">
                            About this Tutorial
                        </h2>
                        <p style="color: #64748b; line-height: 1.8; font-size: 1rem;">
                            ${n.description}
                        </p>
                    </div>

                    <!-- What You'll Learn -->
                    <div style="border-top: 1px solid #e2e8f0; margin-top: 2rem; padding-top: 2rem;">
                        <h3 style="font-size: 1.125rem; color: #1e293b; margin-bottom: 1.5rem; font-weight: 600;">
                            What You'll Learn
                        </h3>
                        <ul style="list-style: none; padding: 0; display: grid; gap: 0.75rem;">
                            ${n.learningPoints.map(s=>`
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
    `},W=({Breadcrumbs:t,state:e})=>`
        <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
            ${t("contact-us")}
            
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
    `,p=t=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(t),V=({Breadcrumbs:t,state:e})=>{const o=e.products.slice(0,8).map((r,n)=>({...r,originalPrice:r.price*1.3,discount:[10,15,20,25,30][n%5],stock:[45,67,23,89,12][n%5],category:["Microcontrollers","Sensors","Tools","Robotics","Components"][n%5]}));return`
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
                                            <span style="font-size: 1.5rem; font-weight: 700; color: #6366f1;">${p(r.price)}</span>
                                            <span style="font-size: 0.875rem; text-decoration: line-through; color: #94a3b8;">${p(r.originalPrice)}</span>
                                        </div>
                                        <div style="font-size: 0.75rem; color: #16a34a; font-weight: 600;">You save ${p(r.originalPrice-r.price)}</div>
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
    `},Y=t=>{if(!t.currentUser||t.currentUser.role!=="admin")return navigate("home"),"";t.orders.length===0&&api.getOrders();const e=t.orders.reduce((l,y)=>l+y.total,0),o=t.orders.length;t.products.length;const r=t.users.filter(l=>l.role==="customer").length,n=t.products.filter(l=>l.stock<10);t.products.filter(l=>l.stock===0);const a=t.orders.slice(0,5),c=o>0?e/o:0,s={};t.products.forEach(l=>{s[l.category]=(s[l.category]||0)+1});const d=Object.entries(s).map(([l,y])=>({name:l,count:y})),u=[450,720,550,890,600,950,1200],h=Math.max(...u);return`
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
                        ${u.map(l=>`
                            <div class="chart-bar" style="height: ${l/h*100}%" data-value="${formatCurrency(l)}"></div>
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
                            ${d.length} Cats
                        </div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        ${d.slice(0,3).map(l=>`<span class="badge badge-info">${l.name}: ${l.count}</span>`).join("")}
                    </div>
                </div>

                <!-- Top Products -->
                <div class="admin-section">
                    <div class="section-header">
                        <h3>🏆 Top Products</h3>
                    </div>
                    <div class="top-products-list">
                        ${t.products.slice(0,4).map(l=>`
                            <div class="top-product-item">
                                <img src="${l.image}" style="width: 32px; height: 32px; object-fit: contain;">
                                <div style="flex: 1;">
                                    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
                                        <span>${l.name}</span>
                                        <span>${formatCurrency(l.price)}</span>
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
                        <div class="metric-value">${formatCurrency(e)}</div>
                        <div class="metric-change positive">+15.3%</div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">🛍️</div>
                    <div class="metric-content">
                        <div class="metric-label">Total Orders</div>
                        <div class="metric-value">${o}</div>
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
                        <div class="metric-value">${formatCurrency(c)}</div>
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
                            ${a.length>0?a.map(l=>{const y=t.users.find(C=>C.id===l.userId);return`
                                    <tr>
                                        <td><strong>#${l.orderId}</strong></td>
                                        <td>${new Date(l.createdAt).toLocaleDateString()}</td>
                                        <td>${y?y.name:"Unknown (ID: "+l.userId+")"}</td>
                                        <td>${l.items.length} items</td>
                                        <td><strong>${formatCurrency(l.total)}</strong></td>
                                        <td>
                                            <select class="status-select" onchange="window.updateOrderStatus('${l.orderId}', this.value)">
                                                <option value="Pending" ${l.status==="Pending"?"selected":""}>Pending</option>
                                                <option value="Shipped" ${l.status==="Shipped"?"selected":""}>Shipped</option>
                                                <option value="Delivered" ${l.status==="Delivered"?"selected":""}>Delivered</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button class="btn-icon" onclick="window.viewOrderDetails('${l.orderId}')" title="Quick View">👁️</button>
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
                            ${t.products.map(l=>`
                                <tr>
                                    <td><input type="checkbox" class="product-checkbox" value="${l.id}"></td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                                            <img src="${l.image}" style="width: 40px; height: 40px; object-fit: contain; background: #f1f5f9; border-radius: 6px; padding: 4px;">
                                            <span>${l.name}</span>
                                        </div>
                                    </td>
                                    <td><span class="category-tag">${l.category}</span></td>
                                    <td>${formatCurrency(l.price)}</td>
                                    <td>
                                        <span class="stock-badge ${l.stock<10?"low":""} ${l.stock===0?"out":""}" style="${l.stock<10?"color: var(--danger); font-weight: bold;":""}">
                                            ${l.stock}
                                        </span>
                                    </td>
                                    <td>${l.stock>0?Math.floor(l.stock/2)+" days":"Out of Stock"}</td>
                                    <td>
                                        <button class="btn-icon" onclick="window.showToast('Editing ${l.name}...')" title="Edit">✏️</button>
                                        <button class="btn-icon danger" onclick="window.deleteProduct(${l.id})" title="Delete">🗑️</button>
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
                            ${t.users.filter(l=>l.role==="customer").slice(0,3).map(l=>`
                                <li style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                                    <span>${l.name}</span>
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
    `},E=({state:t})=>{if(!t.currentUser)return navigate("login"),"";const e=t.orders.filter(s=>s.userId===t.currentUser.id),o=e.filter(s=>s.status==="Pending"),r=e.filter(s=>s.status==="Shipped"),n=e.filter(s=>s.status==="Delivered"),a=[{code:"WELCOME10",description:"10% Off First Order",validUntil:"2024-12-31",claimed:!1},{code:"FREESHIP",description:"Free Shipping Voucher",validUntil:"2024-12-31",claimed:!0},{code:"LOYALTY5",description:"5% Off for Loyal Customers",validUntil:"2024-06-30",claimed:!1}];window.handleProfileUpdate||(window.handleProfileUpdate=s=>{s.preventDefault();const d=s.target,u={...t.currentUser,name:d.name.value,email:d.email.value,phone:d.phone.value,address:d.address.value};t.currentUser=u,localStorage.setItem("currentUser",JSON.stringify(u));const h=t.users.findIndex(l=>l.id===u.id);h!==-1&&(t.users[h]=u),alert("Profile updated successfully!"),render()}),window.switchOrderTab||(window.switchOrderTab=s=>{document.querySelectorAll(".order-tab-content").forEach(d=>d.style.display="none"),document.getElementById(`tab-${s}`).style.display="block",document.querySelectorAll(".tab-btn").forEach(d=>d.classList.remove("active")),document.querySelector(`[data-tab="${s}"]`).classList.add("active")}),window.claimCoupon||(window.claimCoupon=s=>{alert(`Coupon ${s} claimed!`)});const c=s=>`
        <div class="order-card" style="border: 1px solid var(--border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem; background: white;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
                <span style="font-weight: 600;">Order #${s.orderId}</span>
                <span style="color: var(--text-muted); font-size: 0.875rem;">${new Date(s.createdAt).toLocaleDateString()}</span>
            </div>
            <div style="margin-bottom: 0.5rem;">
                ${s.items.map(d=>`
                    <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem;">
                        <img src="${d.image||"assets/placeholder.png"}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                        <div>
                            <div style="font-size: 0.9rem;">${d.name}</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">x${d.quantity}</div>
                        </div>
                    </div>
                `).join("")}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.5rem; border-top: 1px solid var(--border);">
                <span style="font-weight: 600;">Total: ${formatCurrency(s.total)}</span>
                <span class="status-badge status-${s.status.toLowerCase()}">${s.status}</span>
            </div>
        </div>
    `;return`
        <div class="user-page-container" style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
            <!-- Header -->
            <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--primary), #0EA5E9); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;">
                    ${t.currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 style="margin: 0; font-size: 1.75rem;">${t.currentUser.name}</h1>
                    <p style="color: var(--text-muted); margin: 0.25rem 0 0;">${t.currentUser.email}</p>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
                <!-- Left Column: Orders & Coupons -->
                <div class="main-content">
                    
                    <!-- Coupons Section -->
                    <div class="section-card" style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 2rem;">
                        <h2 style="font-size: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            🎟️ My Coupons
                        </h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
                            ${a.map(s=>`
                                <div style="border: 2px dashed ${s.claimed?"#cbd5e1":"var(--primary)"}; border-radius: 8px; padding: 1rem; background: ${s.claimed?"#f8fafc":"#eff6ff"}; position: relative;">
                                    <div style="font-weight: 700; color: ${s.claimed?"#94a3b8":"var(--primary)"};">${s.code}</div>
                                    <div style="font-size: 0.875rem; margin: 0.5rem 0;">${s.description}</div>
                                    ${s.claimed?'<span style="font-size: 0.75rem; color: #64748b; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">Claimed</span>':`<button onclick="window.claimCoupon('${s.code}')" style="font-size: 0.75rem; padding: 4px 8px; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer;">Claim</button>`}
                                </div>
                            `).join("")}
                        </div>
                    </div>

                    <!-- Orders Section -->
                    <div class="section-card" style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">📦 My Orders</h2>
                        
                        <!-- Tabs -->
                        <div style="display: flex; border-bottom: 1px solid var(--border); margin-bottom: 1.5rem;">
                            <button class="tab-btn active" data-tab="to-ship" onclick="window.switchOrderTab('to-ship')" style="padding: 0.75rem 1.5rem; background: none; border: none; border-bottom: 2px solid var(--primary); color: var(--primary); font-weight: 600; cursor: pointer;">To Ship (${o.length})</button>
                            <button class="tab-btn" data-tab="to-receive" onclick="window.switchOrderTab('to-receive')" style="padding: 0.75rem 1.5rem; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer;">To Receive (${r.length})</button>
                            <button class="tab-btn" data-tab="completed" onclick="window.switchOrderTab('completed')" style="padding: 0.75rem 1.5rem; background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer;">Completed (${n.length})</button>
                        </div>

                        <!-- Tab Contents -->
                        <div id="tab-to-ship" class="order-tab-content">
                            ${o.length>0?o.map(c).join(""):'<p class="text-muted">No orders to ship.</p>'}
                        </div>
                        <div id="tab-to-receive" class="order-tab-content" style="display: none;">
                            ${r.length>0?r.map(c).join(""):'<p class="text-muted">No orders to receive.</p>'}
                        </div>
                        <div id="tab-completed" class="order-tab-content" style="display: none;">
                            ${n.length>0?n.map(c).join(""):'<p class="text-muted">No completed orders yet.</p>'}
                        </div>
                    </div>
                </div>

                <!-- Right Column: Edit Profile -->
                <div class="sidebar">
                    <div class="section-card" style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); position: sticky; top: 2rem;">
                        <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">✏️ Edit Profile</h2>
                        <form onsubmit="window.handleProfileUpdate(event)">
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Full Name</label>
                                <input type="text" name="name" value="${t.currentUser.name}" required style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Email</label>
                                <input type="email" name="email" value="${t.currentUser.email}" required style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Phone</label>
                                <input type="tel" name="phone" value="${t.currentUser.phone||""}" placeholder="0912 345 6789" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">
                            </div>
                            <div style="margin-bottom: 1.5rem;">
                                <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Address</label>
                                <textarea name="address" rows="3" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: 4px;">${t.currentUser.address||""}</textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <style>
            .tab-btn.active {
                color: var(--primary) !important;
                border-bottom-color: var(--primary) !important;
            }
            .tab-btn:hover {
                color: var(--primary) !important;
            }
        </style>
    `},G=({Breadcrumbs:t,state:e})=>{let o=[...e.products];switch(e.searchQuery&&(o=o.filter(r=>r.name.toLowerCase().includes(e.searchQuery.toLowerCase())||r.category.toLowerCase().includes(e.searchQuery.toLowerCase())||r.description.toLowerCase().includes(e.searchQuery.toLowerCase()))),e.filterCategory&&(o=o.filter(r=>r.category===e.filterCategory)),e.sortBy){case"price-asc":o.sort((r,n)=>r.price-n.price);break;case"price-desc":o.sort((r,n)=>n.price-r.price);break;case"name-asc":o.sort((r,n)=>r.name.localeCompare(n.name));break;case"name-desc":o.sort((r,n)=>n.name.localeCompare(r.name));break;case"featured":default:o.sort((r,n)=>r.id-n.id);break}return`
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
                ${o.map(_).join("")}
            </div>
        </div>
    `},_=t=>{const e=t.stock<10,o=e?"low-stock":"",r=e?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${t.id})" style="cursor: pointer;">
            <div class="product-badge ${o}">${r}</div>
            <div class="product-image">
                <img src="${t.image}" alt="${t.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${t.category}</div>
                <h3 class="product-title">${t.name}</h3>
                <div class="product-price">${p(t.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${t.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},J=({Breadcrumbs:t,state:e})=>{const o=e.products.find(c=>c.id===e.currentProductId);if(!o)return navigate("home"),"";o.stock<10;const r=o.stock>0?"In Stock":"Out of Stock",n=o.stock>0?"var(--success)":"var(--danger)",a=e.products.filter(c=>c.id!==o.id).sort(()=>.5-Math.random()).slice(0,4);return`
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
                    <div class="detail-price">${p(o.price)}</div>

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

                    <div class="stock-status" style="color: ${n}">
                        <span class="stock-dot" style="background-color: ${n}"></span>
                        ${r} (${o.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${a.map(L).join("")}
                </div>
            </div>
        </div>
    `},L=t=>{const e=t.stock<10,o=e?"low-stock":"",r=e?"Low Stock":"In Stock";return`
        <div class="product-card" onclick="window.viewProduct(${t.id})" style="cursor: pointer;">
            <div class="product-badge ${o}">${r}</div>
            <div class="product-image">
                <img src="${t.image}" alt="${t.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${t.category}</div>
                <h3 class="product-title">${t.name}</h3>
                <div class="product-price">${p(t.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${t.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `},i={products:[],users:[],orders:[],currentUser:JSON.parse(localStorage.getItem("currentUser"))||null,cart:JSON.parse(localStorage.getItem("cart_v2"))||[],route:sessionStorage.getItem("currentRoute")||"home",mobileMenuOpen:!1,searchQuery:"",showSuggestions:!1,searchSuggestions:[],currentProductId:null,devices:[],currentDeviceId:null,esp32Client:null,deviceStatus:{},telemetryData:{},sortBy:"featured",filterCategory:null,cartSearchQuery:"",isLoading:!1,cartSynced:!1,checkoutData:{shipping:{fullName:"",address:"",city:"",province:"",postalCode:"",phone:"",instructions:""},paymentMethod:"cod",shippingFee:50},lastOrderId:null},x={getProducts:async()=>{try{const t=await f("/products");i.products=t.data,v()}catch(t){console.error("Failed to load products:",t),m("Failed to load products")}},login:async(t,e)=>{console.log("Calling API login...");try{const o=await f("/users/login",{method:"POST",body:JSON.stringify({email:t,password:e})});i.currentUser=o.data,localStorage.setItem("currentUser",JSON.stringify(i.currentUser)),await k.getMyDevices(),await X(),m(`Welcome back, ${i.currentUser.name}!`),g("home")}catch(o){throw m(o.message||"Login failed"),o}},register:async(t,e,o)=>{try{const r=await f("/users/register",{method:"POST",body:JSON.stringify({name:t,email:e,password:o})});i.currentUser=r.data,localStorage.setItem("currentUser",JSON.stringify(i.currentUser)),m("Account created successfully!"),g("home")}catch(r){throw m(r.message||"Registration failed"),r}},createOrder:async t=>{try{const e=await f("/orders",{method:"POST",body:JSON.stringify(t)});return i.cart=[],b(),m("Order placed successfully!"),i.currentUser.role==="admin"&&x.getOrders(),e.data}catch(e){throw m(e.message||"Failed to place order"),e}},getOrders:async()=>{if(!(!i.currentUser||i.currentUser.role!=="admin"))try{const t=await f("/orders");i.orders=t.data,v()}catch(t){console.error("Failed to load orders:",t)}},getUsers:async()=>{if(!(!i.currentUser||i.currentUser.role!=="admin"))try{const t=await f("/users");i.users=t.data,v()}catch(t){console.error("Failed to load users:",t)}}},k={getMyDevices:async()=>{if(i.currentUser)try{const t=await f(`/devices/my-devices?userId=${i.currentUser.id}`);i.devices=t.data,K(),v()}catch(t){console.error("Failed to load devices:",t),m("Failed to load devices")}},pairDevice:async(t,e)=>{try{const o=await f("/devices/pair",{method:"POST",body:JSON.stringify({deviceId:t,deviceToken:e,userId:i.currentUser.id})});m("Device paired successfully!"),await k.getMyDevices(),g("my-devices")}catch(o){throw m(o.message||"Device pairing failed"),o}}};function K(){i.esp32Client||(i.esp32Client=new ESP32SocketClient),!i.esp32Client.isConnected()&&i.currentUser&&i.esp32Client.connect(i.currentUser.id).catch(t=>{console.error("Failed to connect to WebSocket:",t)}),i.esp32Client.on("device:status",t=>{if(console.log("📊 Device status update:",t),i.devices){const e=i.devices.findIndex(o=>o.deviceId===t.deviceId);e!==-1&&(i.devices[e].status=t.status==="online"?"active":"offline",i.devices[e].lastOnline=t.timestamp,i.deviceStatus[t.deviceId]=t,i.route==="my-devices"&&v())}})}const b=()=>{localStorage.setItem("currentUser",JSON.stringify(i.currentUser)),localStorage.setItem("cart_v2",JSON.stringify(i.cart))},X=async()=>{if(!(!i.currentUser||i.cartSynced))try{const t=await f(`/users/${i.currentUser.id}/cart/sync`,{method:"POST",body:JSON.stringify({localCart:i.cart})});i.cart=t.data.map(e=>({id:e.productId,name:e.name,price:e.price,image:e.image,quantity:e.quantity,category:e.category,selected:e.selected})),i.cartSynced=!0,b(),v(),m("Cart synced!")}catch(t){console.error("Cart sync failed:",t)}},g=(t,e={})=>{i.route=t,i.params=e,i.mobileMenuOpen=!1,sessionStorage.setItem("currentRoute",t),v(),window.scrollTo(0,0)};window.navigate=g;const m=t=>{const e=document.createElement("div");e.className="toast",e.textContent=t,document.body.appendChild(e),setTimeout(()=>e.classList.add("show"),100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.remove(),300)},3e3)},w=t=>`
        <div class="breadcrumbs">
            <a href="#" onclick="window.navigate('home'); return false;">Home</a>
            <span class="breadcrumb-separator">›</span>
            <span>${{deals:"Deals",learn:"Learn","my-devices":"My Devices","device-pair":"Pair Device","remote-control":"Remote Control","about-us":"About Us","contact-us":"Contact Us",products:"Products",cart:"Cart",checkout:"Checkout"}[t]||t}</span>
        </div>
    `,z=()=>{const t=i.currentUser!==null,e=i.currentUser?.role==="admin",o=i.route==="cart",r=i.cart.length;return`
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
                    <!-- Search Bar Code (Keep existing search bar code here) -->
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
                <div class="nav-actions" style="gap: 1.5rem;"> <!-- Increased gap -->
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
                            <div class="action-icon">
                                <div style="width: 32px; height: 32px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                                    ${i.currentUser.name.charAt(0).toUpperCase()}
                                </div>
                                <span>${i.currentUser.name.split(" ")[0]}</span>
                            </div>
                            <div class="user-menu">
                                <a href="#" class="user-menu-item" onclick="window.navigate('profile'); return false;">
                                    <span>👤 My Profile</span>
                                </a>
                                <a href="#" class="user-menu-item" onclick="window.navigate('my-devices'); return false;">
                                    <span>🚗 My Devices</span>
                                </a>
                                <div class="user-menu-item" onclick="window.logout()" style="cursor: pointer; color: var(--danger);">
                                    <span>🚪 Logout</span>
                                </div>
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
            <!-- Keep existing nav links below -->
            <nav class="header-nav ${i.mobileMenuOpen?"mobile-open":""}">
                <a href="#" class="nav-link ${i.route==="home"?"active":""}" onclick="window.navigate('home'); return false;">Home</a>
                <a href="#" class="nav-link ${i.route==="products"?"active":""}" onclick="window.navigate('products'); return false;">Products</a>
                <a href="#" class="nav-link ${i.route==="deals"?"active":""}" onclick="window.navigate('deals'); return false;">Deals</a>
                <a href="#" class="nav-link ${i.route==="learn"?"active":""}" onclick="window.navigate('learn'); return false;">Learn</a>
                <!-- Removed My Devices from here as it's in dropdown now, but can keep for mobile if desired -->
                 <a href="#" class="nav-link ${i.route==="about-us"?"active":""}" onclick="window.navigate('about-us'); return false;">About Us</a>
                  <a href="#" class="nav-link ${i.route==="contact-us"?"active":""}" onclick="window.navigate('contact-us'); return false;">Contact Us</a>
            </nav>
        </header>
    `},T=()=>{if(i.searchQuery){const o=i.products.filter(r=>r.name.toLowerCase().includes(i.searchQuery.toLowerCase())||r.category.toLowerCase().includes(i.searchQuery.toLowerCase())||r.description.toLowerCase().includes(i.searchQuery.toLowerCase()));return`
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
                        ${o.map(L).join("")}
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
                ${i.products.filter(o=>t.includes(o.id)).sort((o,r)=>t.indexOf(o.id)-t.indexOf(r.id)).map(L).join("")}
            </div>
        </div>
    `},Z=()=>`
        <div class="auth-container">
            <h2 class="auth-title">Welcome Back</h2>
            <form onsubmit="window.handleLogin(event)">
                <div class="form-group">
                    <label class="form-label">Email</label>
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
    `,ee=()=>`
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
    `,te=()=>{if(i.cart.length===0)return`
            <div class="text-center" style="padding: 4rem; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                <h2 style="margin-bottom: 1rem;">Your cart is empty</h2>
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
                                <p class="text-muted">${p(e.price)}</p>
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
                            ${o.length>0?`
                                <div class="similar-products-grid">
                                    ${o.map(r=>`
                                        <div class="similar-product-card" onclick="window.viewProduct(${r.id})">
                                            <img src="${r.image}" alt="${r.name}" class="similar-product-image">
                                            <div class="similar-product-title" title="${r.name}">${r.name}</div>
                                            <div class="similar-product-price">${p(r.price)}</div>
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
                    <span>${p(i.cart.reduce((e,o)=>e+(o.selected!==!1?o.price*o.quantity:0),0))}</span>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                    Proceed to Checkout (${i.cart.filter(e=>e.selected!==!1).length})
                </button>
            </div>
        </div>
        </div>
    `},ie=()=>{if(!i.currentUser)return g("login"),"";const t=i.devices||[];return`
        <div style="max-width: 1200px; margin: 2rem auto; padding: 0 2rem;">
            ${w("my-devices")}
            
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
                    ${t.map(e=>{const o=!i.showTokens?.[e.deviceId];return`
                        <div class="device-card">
                            <div class="device-status-badge ${e.status==="active"||i.deviceStatus[e.deviceId]?.status==="online"?"online":"offline"}">
                                <span class="status-dot"></span>
                                ${e.status==="active"||i.deviceStatus[e.deviceId]?.status==="online"?"Online":e.status==="pending"?"Not Configured":"Offline"}
                            </div>
                            
                            <div class="device-icon">
                                🚗
                            </div>
                            
                            <h3 class="device-name">${e.deviceName}</h3>
                            <p class="device-id">ID: ${e.deviceId}</p>
                            <div class="info-row" style="margin-top: 0.5rem;">
                                <span class="label" style="color: var(--text-muted); font-size: 0.85rem;">Token:</span>
                                <div class="token-display" style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,0,0,0.05); padding: 0.25rem 0.5rem; border-radius: 4px;">
                                    <span class="token-value ${o?"masked":""}" style="font-family: monospace; font-size: 0.85rem;">
                                        ${o?"••••••••":e.deviceToken}
                                    </span>
                                    <button onclick="window.toggleToken('${e.deviceId}')" style="background:none; border:none; cursor: pointer; padding: 0; display: flex; align-items: center; color: var(--text-muted);">
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
                                ${e.status==="active"||i.deviceStatus[e.deviceId]?.status==="online"?`
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
    `},oe=()=>i.currentUser?`
        <div style="max-width: 600px; margin: 2rem auto; padding: 0 2rem;">
            ${w("device-pair")}
            
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
        
    `:(g("login"),""),re=()=>{if(!i.currentUser)return g("login"),"";if(!i.currentDeviceId)return g("my-devices"),"";const t=i.devices?.find(d=>d.deviceId===i.currentDeviceId);if(!t)return g("my-devices"),"";const e=i.deviceStatus[t.deviceId]||{},o=i.telemetryData[t.deviceId]||{},r=e.status==="online",n=o.battery||0,a=2*Math.PI*20,c=a-n/100*a,s=Math.min(4,Math.max(0,Math.round((o.signal||0)/25)));return`
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
                                <circle class="gauge-bg" cx="24" cy="24" r="20" stroke-dasharray="${a}" stroke-dashoffset="0"></circle>
                                <circle class="gauge-fill" cx="24" cy="24" r="20" stroke-dasharray="${a}" stroke-dashoffset="${c}"></circle>
                            </svg>
                            <div class="gauge-text">${n}%</div>
                        </div>
                        <div class="info">
                            <div class="label">Battery</div>
                            <div class="value">${n>=70?"Good":n>=30?"Low":"Critical"}</div>
                        </div>
                    </div>
                    <!-- Signal Strength -->
                    <div class="hud-group">
                        <div class="icon-box">
                            <div class="signal-bars">
                                <div class="bar ${s>=1?"active":""}"></div>
                                <div class="bar ${s>=2?"active":""}"></div>
                                <div class="bar ${s>=3?"active":""}"></div>
                                <div class="bar ${s>=4?"active":""}"></div>
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
    `},ne=()=>{if(!i.currentUser)return g("login"),"";const t=i.cart.filter(n=>n.selected!==!1);if(t.length===0)return m("No items selected for checkout"),g("cart"),"";const e=t.reduce((n,a)=>n+a.price*a.quantity,0),o=i.checkoutData.shippingFee,r=e+o;return`
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
                            ${[{id:"cod",label:"Cash on Delivery",image:"/lumina/images/payment/cod.png"},{id:"gcash",label:"GCash",image:"/lumina/images/payment/gcash.png"},{id:"maya",label:"Maya",image:"/lumina/images/payment/maya.png"},{id:"card",label:"Credit/Debit Card",image:"/lumina/images/payment/card.png"},{id:"bank",label:"Bank Transfer",image:"/lumina/images/payment/bank.png"}].map(n=>`
                                <div class="payment-method-card" onclick="window.selectPaymentMethod('${n.id}')" style="padding: 0.75rem; border: 2px solid ${i.checkoutData.paymentMethod===n.id?"var(--primary)":"var(--border)"}; border-radius: var(--radius-md); cursor: pointer; text-align: center; transition: all 0.2s; background: ${i.checkoutData.paymentMethod===n.id?"rgba(0, 43, 91, 0.05)":"var(--surface)"};">
                                    <div style="height: 48px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem;">
                                        <img src="${n.image}" alt="${n.label}" style="max-width: 100%; max-height: 48px; object-fit: contain;">
                                    </div>
                                    <div style="font-size: 0.75rem; font-weight: 600; line-height: 1.2;">${n.label}</div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
                <div>
                    <div class="cart-summary" style="position: sticky; top: 2rem;">
                        <h2 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Order Summary</h2>
                        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem;">
                            ${t.map(n=>`
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                                    <img src="${n.image}" alt="${n.name}" style="width: 60px; height: 60px; object-fit: contain; background: #f1f5f9; border-radius: 8px;">
                                    <div style="flex: 1;">
                                        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${n.name}</div>
                                        <div style="font-size: 0.875rem; color: var(--text-muted);">Qty: ${n.quantity}</div>
                                    </div>
                                    <div style="font-weight: 700; color: var(--primary);">${p(n.price*n.quantity)}</div>
                                </div>
                            `).join("")}
                        </div>
                        <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Subtotal</span>
                                <span>${p(e)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--text-muted);">Shipping Fee</span>
                                <span>${p(o)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                                <span>Total</span>
                                <span style="color: var(--primary);">${p(r)}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="window.placeOrder()" style="width: 100%; padding: 1rem; font-size: 1rem;">Place Order</button>
                        <div style="margin-top: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);">🔒 Your payment information is secure</div>
                    </div>
                </div>
            </div>
        </div>
    `},ae=()=>{if(!i.lastOrderId)return g("home"),"";const t=i.orders.find(a=>a.orderId===i.lastOrderId);if(!t)return g("home"),"";const e=new Date,o=new Date(e);o.setDate(e.getDate()+3);const r=new Date(e);r.setDate(e.getDate()+5);const n=`${o.toLocaleDateString("en-US",{month:"short",day:"numeric"})} - ${r.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} `;return`
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
                    <div style="padding-left: 2rem; color: var(--text-muted);">${n}</div>
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

            ${t.devices&&t.devices.length>0?`
                <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="font-size: 2rem;">🚗</div>
                        <div>
                            <h3 style="margin: 0; color: #0369a1;">ESP32 Smart Car Credentials</h3>
                            <p style="margin: 0; color: #0c4a6e; font-size: 0.9rem;">Use these details to configure your device</p>
                        </div>
                    </div>

                    ${t.devices.map((a,c)=>`
                        <div style="background: white; padding: 1rem; border-radius: 8px; border: 1px solid #e0f2fe; margin-bottom: ${c<t.devices.length-1?"1rem":"0"};">
                            <h4 style="margin: 0 0 0.5rem 0; color: #0284c7;">${a.productName}</h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div>
                                    <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Device ID</div>
                                    <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #334155; background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block;">${a.deviceId}</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Device Token</div>
                                    <div style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #334155; background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block;">${a.deviceToken}</div>
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
                ${t.items.map(a=>`
                    <div style="display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border);">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${a.productName||a.name}</div>
                            <div style="font-size: 0.875rem; color: var(--text-muted);">Quantity: ${a.quantity}</div>
                        </div>
                        <div style="font-weight: 700; color: var(--primary);">${p(a.price*a.quantity)}</div>
                    </div>
                `).join("")}
                <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--border);">
                    <span>Total Amount</span>
                    <span style="color: var(--primary);">${p(t.total)}</span>
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
    `};window.navigateToTutorial=t=>{g("tutorial-detail",{id:t})};window.filterLearningContent=t=>{i.filterLearnCategory=t,v()};window.navigateToTutorial=t=>{g("tutorial-detail",{id:t})};window.updateOrderStatus=(t,e)=>{const o=i.orders.find(r=>r.id===t);o&&(o.status=e,b(),m(`Order #${t} updated to ${e}`),v())};window.toggleSelectAll=t=>{document.querySelectorAll(".product-checkbox").forEach(o=>o.checked=t.checked)};window.bulkAction=t=>{const e=document.querySelectorAll(".product-checkbox:checked"),o=Array.from(e).map(r=>parseInt(r.value));if(o.length===0){m("No products selected");return}t==="delete"?confirm(`Delete ${o.length} products?`)&&(i.products=i.products.filter(r=>!o.includes(r.id)),b(),v(),m("Products deleted")):t==="restock"&&(i.products.forEach(r=>{o.includes(r.id)&&(r.stock+=10)}),b(),v(),m("Products restocked"))};window.viewOrderDetails=t=>{const e=i.orders.find(n=>n.id===t);if(!e)return;const o=i.users.find(n=>n.id===e.userId),r=`
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
                        ${e.items.map(n=>`
                            <tr style="border-bottom: 1px solid var(--border);">
                                <td style="padding: 0.5rem;">${n.name}</td>
                                <td style="padding: 0.5rem;">${n.quantity}</td>
                                <td style="padding: 0.5rem;">${p(n.price)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="text-align: right; font-size: 1.25rem; font-weight: bold;">
                    Total: ${p(e.total)}
                </div>
            </div>
        </div>
    `;document.body.insertAdjacentHTML("beforeend",r)};window.closeModal=()=>{const t=document.getElementById("orderModal");t&&t.remove()};const se=(t=null)=>{const e=t?i.products.find(r=>r.id===t):null,o=!!e;return`
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
    `};window.navigate=g;window.toggleMobileMenu=()=>{i.mobileMenuOpen=!i.mobileMenuOpen,v()};window.showProductModal=(t=null)=>{document.body.insertAdjacentHTML("beforeend",se(t))};window.closeProductModal=()=>{document.getElementById("productModal")?.remove()};window.editProduct=t=>{window.showProductModal(t)};window.deleteProduct=async t=>{if(confirm("Delete this product?"))try{await f(`/products/${t}`,{method:"DELETE"}),await x.getProducts(),m("Product deleted")}catch{m("Delete failed")}};window.handleProductSubmit=async(t,e)=>{t.preventDefault();const o=new FormData(t.target);try{const r=e?"PUT":"POST",n=e?`/products/${e}`:"/products";if(!(await fetch(`${M}${n}`,{method:r,body:o})).ok)throw new Error("Failed");await x.getProducts(),window.closeProductModal(),m(e?"Product updated!":"Product created!")}catch{m("Operation failed")}};window.handleSort=t=>{i.sortBy=t,v()};window.viewProduct=t=>{i.currentProductId=t,g("product-detail")};window.adjustDetailQty=t=>{const e=document.getElementById("detailQty");let o=parseInt(e.value)+t;o<1&&(o=1),e.value=o};window.addToCartFromDetail=t=>{const e=parseInt(document.getElementById("detailQty").value);if(!i.currentUser){m("Please login to shop"),g("login");return}const o=i.products.find(n=>n.id===t),r=i.cart.find(n=>n.id===t);r?r.quantity+=e:i.cart.push({...o,quantity:e,selected:!0}),b(),m(`Added ${e} item(s) to cart`)};window.addToCart=async t=>{if(!i.currentUser){window.showToast("Please login to shop"),window.navigate("login");return}const e=i.products.find(r=>r.id===t);if(!e)return;const o=i.cart.find(r=>r.id===t);if(o?o.quantity+=1:i.cart.push({...e,quantity:1,selected:!0}),b(),v(),window.showToast(`Added ${e.name} to cart! 🛒`),i.currentUser)try{await f(`/users/${i.currentUser.id}/cart`,{method:"PUT",body:JSON.stringify({cart:i.cart.map(r=>({productId:r.id,name:r.name,price:r.price,image:r.image,quantity:r.quantity,category:r.category,selected:r.selected!==!1}))})})}catch(r){console.error("Failed to sync cart:",r)}};window.updateQuantity=(t,e)=>{if(e<1){window.removeFromCart(t);return}const o=i.cart.find(r=>r.id===t);o&&(o.quantity=e,b(),v())};window.removeFromCart=t=>{i.cart=i.cart.filter(e=>e.id!==t),b(),v()};window.checkout=async()=>{if(i.cart.length===0)return;if(!i.currentUser){m("Please login to checkout"),g("login");return}if(i.cart.filter(e=>e.selected!==!1).length===0){m("No items selected for checkout");return}g("checkout")};window.updateShippingInfo=(t,e)=>{i.checkoutData.shipping[t]=e};window.selectPaymentMethod=t=>{i.checkoutData.paymentMethod=t,v()};window.handlePhoneInput=t=>{const e=t.value.replace(/[^0-9]/g,"");t.value=e,i.checkoutData.shipping.phone=e};window.handleNameInput=t=>{const e=t.value.replace(/[^a-zA-Z\s]/g,"");t.value=e,i.checkoutData.shipping.fullName=e};window.handleLocationInput=(t,e)=>{const o=t.value.replace(/[^a-zA-Z\s]/g,"");t.value=o,i.checkoutData.shipping[e]=o};window.handlePostalInput=t=>{const e=t.value.replace(/[^0-9]/g,"");t.value=e,i.checkoutData.shipping.postalCode=e};window.showPaymentModal=t=>new Promise(e=>{let o="";const r=`
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
                                <span style="font-weight: 700;">${p(t)}</span>
                            </div>
                            <div class="payment-summary-row total">
                                <span>To Pay:</span>
                                <span>${p(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",r);const n=document.getElementById("paymentModalOverlay"),a=document.getElementById("paymentAmountInput"),c=document.getElementById("paymentError"),s=document.getElementById("paymentChangeDisplay"),d=document.getElementById("changeAmount"),u=document.getElementById("paymentConfirmBtn"),h=document.getElementById("paymentCancelBtn");setTimeout(()=>a.focus(),100),a.addEventListener("input",l=>{let y=l.target.value.replace(/[^0-9.]/g,"");const C=y.split(".");C.length>2&&(y=C[0]+"."+C.slice(1).join("")),l.target.value=y,o=y;const $=parseFloat(y);if(!y||isNaN($)||$<0){c.textContent="",c.classList.remove("show"),a.classList.remove("error"),u.disabled=!0,s.classList.remove("show");return}if($<t){const I=t-$;c.textContent=`Insufficient! Need ${p(I)} more`,c.classList.add("show"),a.classList.add("error"),u.disabled=!0,s.classList.remove("show")}else{const I=$-t;c.classList.remove("show"),a.classList.remove("error"),u.disabled=!1,s.classList.add("show"),d.textContent=p(I)}}),document.querySelectorAll(".quick-amount-btn").forEach(l=>{l.addEventListener("click",()=>{const y=l.getAttribute("data-amount");a.value=y,a.dispatchEvent(new Event("input"))})}),h.addEventListener("click",()=>{n.remove(),e(null)}),n.addEventListener("click",l=>{l.target===n&&(n.remove(),e(null))}),u.addEventListener("click",()=>{const l=parseFloat(o);l>=t&&(n.remove(),e({amountPaid:l,change:l-t}))}),a.addEventListener("keypress",l=>{l.key==="Enter"&&!u.disabled&&u.click()}),document.addEventListener("keydown",function l(y){y.key==="Escape"&&(n.remove(),e(null),document.removeEventListener("keydown",l))})});window.showGCashModal=t=>new Promise(e=>{const o="GCASH-"+Date.now().toString().slice(-8),r=`
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
                                <span>${p(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",r);const n=document.getElementById("paymentModalOverlay"),a=document.getElementById("paymentConfirmBtn"),c=document.getElementById("paymentCancelBtn"),s=document.getElementById("processingOverlay"),d=document.getElementById("successOverlay");c.addEventListener("click",()=>{n.remove(),e(null)}),a.addEventListener("click",()=>{s.classList.add("show"),setTimeout(()=>{s.classList.remove("show"),d.classList.add("show"),setTimeout(()=>{n.remove(),e({method:"gcash",reference:o})},1e3)},1500)}),n.addEventListener("click",u=>{u.target===n&&(n.remove(),e(null))})});window.showMayaModal=t=>new Promise(e=>{const o="MAYA-"+Date.now().toString().slice(-8),r=`
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
                                <span>${p(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",r);const n=document.getElementById("paymentModalOverlay"),a=document.getElementById("paymentConfirmBtn"),c=document.getElementById("paymentCancelBtn"),s=document.getElementById("processingOverlay"),d=document.getElementById("successOverlay");c.addEventListener("click",()=>{n.remove(),e(null)}),a.addEventListener("click",()=>{s.classList.add("show"),setTimeout(()=>{s.classList.remove("show"),d.classList.add("show"),setTimeout(()=>{n.remove(),e({method:"maya",reference:o})},1e3)},1500)}),n.addEventListener("click",u=>{u.target===n&&(n.remove(),e(null))})});window.showCardModal=t=>new Promise(e=>{const c=`
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
                                <span>${p(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",c);const s=document.getElementById("paymentModalOverlay"),d=document.getElementById("paymentConfirmBtn"),u=document.getElementById("paymentCancelBtn"),h=document.getElementById("processingOverlay"),l=document.getElementById("successOverlay");u.addEventListener("click",()=>{s.remove(),e(null)}),d.addEventListener("click",()=>{h.classList.add("show"),setTimeout(()=>{h.classList.remove("show"),l.classList.add("show"),setTimeout(()=>{s.remove(),e({method:"card",last4:"1111"})},1e3)},2e3)}),s.addEventListener("click",y=>{y.target===s&&(s.remove(),e(null))})});window.showBankModal=t=>new Promise(e=>{const o="BDO-"+Date.now().toString().slice(-8),r=`
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
                                <span>${p(t)}</span>
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
        `;document.body.insertAdjacentHTML("beforeend",r);const n=document.getElementById("paymentModalOverlay"),a=document.getElementById("paymentConfirmBtn"),c=document.getElementById("paymentCancelBtn"),s=document.getElementById("processingOverlay"),d=document.getElementById("successOverlay");c.addEventListener("click",()=>{n.remove(),e(null)}),a.addEventListener("click",()=>{s.classList.add("show"),setTimeout(()=>{s.classList.remove("show"),d.classList.add("show"),setTimeout(()=>{n.remove(),e({method:"bank",reference:o})},1e3)},1500)}),n.addEventListener("click",u=>{u.target===n&&(n.remove(),e(null))})});window.placeOrder=async()=>{const t=i.checkoutData.shipping;if(!t.fullName||!t.fullName.trim()){m("Please enter your full name");return}if(!t.address||!t.address.trim()){m("Please enter your address");return}if(!t.city||!t.city.trim()){m("Please enter your city");return}if(!t.province||!t.province.trim()){m("Please enter your province");return}if(!t.phone||!t.phone.trim()){m("Please enter your phone number");return}if(!/^09\d{9}$/.test(t.phone)){m('Phone number must start with "09" and contain exactly 11 digits');return}const o=/^[a-zA-Z\s]+$/;if(!o.test(t.fullName)){m("Full Name must contain letters and spaces only");return}if(!o.test(t.city)){m("City must contain letters and spaces only");return}if(!o.test(t.province)){m("Province must contain letters and spaces only");return}if(t.postalCode&&!/^\d+$/.test(t.postalCode)){m("Postal Code must contain numbers only");return}if(!i.checkoutData.paymentMethod){m("Please select a payment method");return}const r=i.cart.filter(h=>h.selected!==!1),a=r.reduce((h,l)=>h+l.price*l.quantity,0)+i.checkoutData.shippingFee;let c=null;switch(i.checkoutData.paymentMethod){case"cod":c=await showPaymentModal(a);break;case"gcash":c=await showGCashModal(a);break;case"maya":c=await showMayaModal(a);break;case"card":c=await showCardModal(a);break;case"bank":c=await showBankModal(a);break;default:m("Please select a payment method");return}if(!c)return;let s=c.amountPaid||a,d=c.change||0;const u={userId:i.currentUser.id,items:r.map(h=>({productId:h.id,quantity:h.quantity,price:h.price,name:h.name})),total:a,shippingInfo:i.checkoutData.shipping,paymentMethod:i.checkoutData.paymentMethod,shippingFee:i.checkoutData.shippingFee,amountPaid:s,change:d};try{const h=await x.createOrder(u);i.lastOrderId=h.orderId,i.lastOrderPayment={amountPaid:s,change:d},i.orders.push({orderId:h.orderId,...h,items:r,total:a,createdAt:new Date().toISOString(),userId:i.currentUser.id,devices:h.devices||[]}),i.cart=i.cart.filter(l=>l.selected===!1),b(),g("order-confirmation")}catch{}};window.printReceipt=()=>{if(!i.lastOrderId){m("No order found to print");return}const t=i.orders.find(a=>a.orderId===i.lastOrderId);if(!t){m("Order not found");return}const e=i.lastOrderPayment||{},o=new Date,r=`
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
                
                ${t.items.map(a=>`
                    <div class="item-row">
                        <div class="item-name">${a.productName||a.name}</div>
                        <div class="item-details">
                            <div>${p(a.price)}</div>
                            <div class="text-center">x${a.quantity}</div>
                            <div class="text-right"><strong>${p(a.price*a.quantity)}</strong></div>
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div class="totals-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>${p(t.total-i.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping Fee:</span>
                    <span>${p(i.checkoutData.shippingFee)}</span>
                </div>
                <div class="total-row grand-total">
                    <span>TOTAL:</span>
                    <span>${p(t.total)}</span>
                </div>
            </div>
            
            ${e.amountPaid?`
                <div class="payment-section">
                    <div class="payment-row">
                        <span>Amount Paid:</span>
                        <span>${p(e.amountPaid)}</span>
                    </div>
                    <div class="payment-row change-row">
                        <span>Change:</span>
                        <span>${p(e.change)}</span>
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
    `,n=window.open("","_blank","width=300,height=600");n.document.write(r),n.document.close(),n.onload=function(){setTimeout(()=>{n.print()},250)}};window.handleSearchInput=t=>{const e=t.target.value;if(i.searchQuery=e,e.trim()){const o=new Set;i.products.forEach(r=>{const n=r.name.toLowerCase(),a=r.category.toLowerCase(),c=e.toLowerCase();n.includes(c)&&o.add(r.name),a.includes(c)&&o.add(r.category),n.split(" ").forEach(d=>{d.toLowerCase().startsWith(c)&&d.length>2&&o.add(d.charAt(0).toUpperCase()+d.slice(1))})}),i.searchSuggestions=Array.from(o).slice(0,8),i.showSuggestions=!0}else if(i.searchSuggestions=[],i.showSuggestions=!1,i.route==="home"||i.route==="products"){v();return}N()};function N(){const t=document.querySelector(".search-container");if(!t)return;const e=t.querySelector(".search-suggestions");if(e&&e.remove(),i.showSuggestions&&i.searchQuery){const o=`
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
        `;t.insertAdjacentHTML("beforeend",o)}}window.showSearchSuggestions=()=>{i.searchQuery&&(i.showSuggestions=!0,N())};window.selectSuggestion=t=>{i.searchQuery=t,i.showSuggestions=!1;const e=document.getElementById("searchInput");e&&(e.value=t),handleSearch()};window.handleSearch=()=>{i.showSuggestions=!1;const t=document.getElementById("searchInput");t&&(i.searchQuery=t.value.trim()),g("products"),setTimeout(()=>{const e=document.querySelector(".product-grid");e&&e.scrollIntoView({behavior:"smooth",block:"start"})},100)};window.clearSearch=()=>{i.searchQuery="",i.showSuggestions=!1,i.searchSuggestions=[],v()};document.addEventListener("click",t=>{if(!t.target.closest(".search-container")&&i.showSuggestions){i.showSuggestions=!1;const e=document.querySelector(".search-suggestions");e&&e.remove()}});window.handleLogin=async t=>{console.log("Login attempt started"),t.preventDefault();const e=t.target.email.value,o=t.target.password.value;console.log("Credentials:",{email:e,password:o});try{await x.login(e,o),console.log("Login successful")}catch(r){console.error("Login error:",r)}};window.handleSignup=async t=>{console.log("Signup attempt started"),t.preventDefault();const e=t.target.name.value,o=t.target.email.value,r=t.target.password.value;try{await x.register(e,o,r)}catch(n){console.error("Signup error:",n)}};window.logout=()=>{i.currentUser=null,i.cart=[],localStorage.removeItem("currentUser"),localStorage.removeItem("cart_v2"),m("Logged out successfully"),sessionStorage.removeItem("currentRoute"),g("home")};window.handleContactSubmit=t=>{t.preventDefault();const e=t.target,o={name:e.name.value,email:e.email.value,subject:e.subject.value,message:e.message.value};console.log("Contact form submitted:",o),m("Thank you for your message! We will get back to you soon."),e.reset()};window.deleteProduct=t=>{confirm("Are you sure you want to remove this product?")&&(i.products=i.products.filter(e=>e.id!==t),b(),v(),m("Product removed"))};window.viewOrderDetails=t=>{const e=i.orders.find(c=>c.orderId===t);if(!e){m("Order not found");return}const o=i.users.find(c=>c.id===e.userId),r=o?o.name:`User ID: ${e.userId}`,n=document.createElement("div");n.className="order-details-modal",n.innerHTML=`
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
                    ${e.items.map(c=>`
                        <div class="order-item-row">
                            <div class="item-details">
                                <div class="item-name">${c.productName||"Product ID: "+c.productId}</div>
                                <div class="item-meta">Quantity: ${c.quantity} × ${p(c.price)}</div>
                            </div>
                            <div class="item-total">${p(c.price*c.quantity)}</div>
                        </div>
                    `).join("")}
                </div>
                
                <div class="order-total">
                    <span>Total Amount:</span>
                    <span class="total-amount">${p(e.total)}</span>
                </div>
            </div>
        </div>
    `,document.body.appendChild(n);const a=c=>{c.key==="Escape"&&(n.remove(),document.removeEventListener("keydown",a))};document.addEventListener("keydown",a)};const v=()=>{const t=document.getElementById("app");let e="";switch(i.route){case"home":e=T();break;case"products":e=G({Breadcrumbs:w,state:i});break;case"product-detail":e=J({Breadcrumbs:w,state:i});break;case"login":e=Z();break;case"signup":e=ee();break;case"cart":e=te();break;case"checkout":e=ne();break;case"order-confirmation":e=ae();break;case"contact-us":e=W({Breadcrumbs:w});break;case"about-us":e=R({Breadcrumbs:w});break;case"learn":e=H({Breadcrumbs:w,state:i});break;case"tutorial-detail":e=Q({Breadcrumbs:w,state:i});break;case"deals":e=V({Breadcrumbs:w,state:i});break;case"admin":e=Y(i);break;case"user":e=E(i);break;case"my-devices":e=ie();break;case"device-pair":e=oe();break;case"remote-control":e=re();break;default:e=T()}if(i.route==="user"){t.innerHTML=z()+E({state:i});return}t.innerHTML=`
        ${z()}
        <main>
            ${e}
        </main>
        <footer style="text-align: center; padding: 2rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto;">
            &copy; 2024 Lumina Electronics. All rights reserved.
        </footer>
    `,i.route==="deals"&&setTimeout(()=>window.startDealsTimer(),100)};window.handleCartSearch=t=>{i.cartSearchQuery=t.target.value,P()};window.clearCartSearch=()=>{i.cartSearchQuery="",P()};window.toggleCartItem=t=>{const e=i.cart.find(o=>o.id===t);e&&(e.selected=e.selected===!1,b(),P())};window.toggleFindSimilar=t=>{const e=i.cart.find(o=>o.id===t);e&&(i.cart.forEach(o=>{o.id!==t&&(o.showSimilar=!1)}),e.showSimilar=!e.showSimilar,b(),P())};function P(){const t=document.querySelector(".cart-items"),e=document.querySelector(".cart-summary"),o=document.querySelector(".cart-search-message");if(!t)return;let r=i.cart;if(i.cartSearchQuery&&(r=i.cart.filter(a=>a.name.toLowerCase().includes(i.cartSearchQuery.toLowerCase())||a.category.toLowerCase().includes(i.cartSearchQuery.toLowerCase()))),t.innerHTML=r.map(a=>{const c=i.products.filter(s=>s.category===a.category&&s.id!==a.id).slice(0,4);return`
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
                    <p class="text-muted">${p(a.price)}</p>
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
                ${c.length>0?`
                    <div class="similar-products-grid">
                        ${c.map(s=>`
                            <div class="similar-product-card" onclick="window.viewProduct(${s.id})">
                                <img src="${s.image}" alt="${s.name}" class="similar-product-image">
                                <div class="similar-product-title" title="${s.name}">${s.name}</div>
                                <div class="similar-product-price">${p(s.price)}</div>
                            </div>
                        `).join("")}
                    </div>
                `:'<p class="text-muted text-center">No similar products found.</p>'}
            </div>
        </div>
    `}).join(""),e){const a=i.cart.reduce((s,d)=>s+(d.selected!==!1?d.price*d.quantity:0),0),c=i.cart.filter(s=>s.selected!==!1).length;e.innerHTML=`
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 700;">
                <span>Total</span>
                <span>${p(a)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; padding: 1rem;" onclick="window.checkout()">
                Proceed to Checkout (${c})
            </button>
        `}o&&(i.cartSearchQuery&&r.length===0?(o.innerHTML=`
                <p style="color: var(--text-muted); margin-bottom: 1rem; text-align: center;">
                    No items found for "${i.cartSearchQuery}"
                </p>
            `,o.style.display="block"):o.style.display="none");const n=document.querySelector("#cartSearchInput + .search-btn");n&&(n.innerHTML=i.cartSearchQuery?`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `:`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        `)}let O=null;window.startDealsTimer=()=>{const t=new Date().getTime()+864e5;O=setInterval(()=>{const e=new Date().getTime(),o=t-e,r=Math.floor(o%(1e3*60*60*24)/(1e3*60*60)),n=Math.floor(o%(1e3*60*60)/(1e3*60)),a=Math.floor(o%(1e3*60)/1e3),c=document.getElementById("deal-hours"),s=document.getElementById("deal-minutes"),d=document.getElementById("deal-seconds");c&&(c.textContent=String(r).padStart(2,"0")),s&&(s.textContent=String(n).padStart(2,"0")),d&&(d.textContent=String(a).padStart(2,"0")),o<0&&(clearInterval(O),c&&(c.textContent="00"),s&&(s.textContent="00"),d&&(d.textContent="00"))},1e3)};window.filterLearningContent=t=>{const e=document.querySelectorAll(".tutorial-card");document.querySelectorAll(".topic-filter").forEach(r=>{r.dataset.filter===t?(r.style.background="#6366f1",r.style.color="white",r.style.borderColor="#6366f1"):(r.style.background="white",r.style.color="#64748b",r.style.borderColor="#e2e8f0")}),e.forEach(r=>{const n=r.dataset.category,a=r.dataset.topic;t==="all"||n===t||a===t?r.style.display="block":r.style.display="none"})};window.currentLearnCategory="all";window.filterTutorials=t=>{window.currentLearnCategory=t;const e=document.querySelectorAll(".tutorial-card");document.querySelectorAll(".category-tab").forEach(r=>{r.classList.remove("active"),r.dataset.category===t&&r.classList.add("active")}),e.forEach(r=>{t==="all"||r.dataset.category===t?r.style.display="block":r.style.display="none"})};window.filterDeals=t=>{const e=document.querySelectorAll(".deal-product-card");document.querySelectorAll(".deal-category-tab").forEach(r=>{r.dataset.category===t?(r.style.background="#6366f1",r.style.color="white"):(r.style.background="white",r.style.color="#64748b")}),e.forEach(r=>{t==="all"||t==="clearance"||r.dataset.category===t?r.style.display="block":r.style.display="none"})};window.openVideoModal=t=>{const e=document.createElement("div");e.className="video-modal",e.innerHTML=`
        <div class="video-modal-content">
            <div class="video-modal-close" onclick="this.closest('.video-modal').remove()">✕</div>
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${t}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `,document.body.appendChild(e),setTimeout(()=>e.classList.add("show"),10)};const de=async()=>{await x.getProducts(),i.currentUser?.role==="admin"?await Promise.all([x.getOrders(),k.getMyDevices(),x.getUsers()]):i.currentUser&&await k.getMyDevices(),v()};window.showLoading=()=>{let t=document.querySelector(".loading-overlay");t||(t=document.createElement("div"),t.className="loading-overlay",t.innerHTML='<div class="spinner"></div>',document.body.appendChild(t)),t.offsetWidth,t.classList.add("active")};window.hideLoading=()=>{const t=document.querySelector(".loading-overlay");t&&(t.classList.remove("active"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300))};window.openLoginModal=()=>{document.body.insertAdjacentHTML("beforeend",`
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
    `),setTimeout(()=>{document.getElementById("loginModal").classList.add("show")},10)};window.closeLoginModal=()=>{const t=document.getElementById("loginModal");t&&(t.classList.remove("show"),setTimeout(()=>t.remove(),300))};window.closeLoginModalOnOverlay=t=>{t.target.id==="loginModal"&&window.closeLoginModal()};window.handleModalLogin=async t=>{t.preventDefault();const e=new FormData(t.target),o=e.get("email"),r=e.get("password");try{const n=i.users.find(a=>a.email===o&&a.password===r);n?(i.currentUser=n,localStorage.setItem("currentUser",JSON.stringify(n)),window.closeLoginModal(),m(`Welcome back, ${n.name}!`),v()):alert("Invalid email or password")}catch(n){console.error("Login error:",n),alert("Login failed. Please try again.")}};const le=window.navigate;window.navigate=(t,e)=>{window.showLoading(),setTimeout(()=>{le(t,e),window.hideLoading()},300)};window.handleDevicePairing=async t=>{t.preventDefault();const e=t.target,o=e.deviceId.value.trim(),r=e.deviceToken.value.trim();try{await k.pairDevice(o,r)}catch{}};window.handleDeviceUnpairing=async t=>{try{await k.unpairDevice(t)}catch{}};window.startRemoteControl=async t=>{i.currentDeviceId=t,i.esp32Client||(i.esp32Client=new ESP32SocketClient);try{await i.esp32Client.connect(i.currentUser.id),i.esp32Client.monitorDevice(t),i.esp32Client.on("device:status",e=>{i.deviceStatus[e.deviceId]=e,B()}),i.esp32Client.on("device:telemetry",e=>{i.telemetryData[e.deviceId]=e,B()}),i.esp32Client.on("command:sent",e=>{D(`Command sent: ${e.command}`)}),i.esp32Client.on("command:response",e=>{e.success?D(`✓ ${e.message||"Command executed"}`):D(`✗ ${e.error||"Command failed"}`)}),g("remote-control")}catch(e){m("Failed to connect to device"),console.error(e)}};window.stopRemoteControl=()=>{i.esp32Client&&i.esp32Client.stopMonitoring(),i.currentDeviceId=null,g("my-devices")};window.sendCarCommand=t=>{if(!(!i.esp32Client||!i.currentDeviceId))try{t==="stop"?i.esp32Client.stop(i.currentDeviceId):i.esp32Client.move(i.currentDeviceId,t,255)}catch(e){m("Failed to send command"),console.error(e)}};window.toggleLights=()=>{if(!i.esp32Client||!i.currentDeviceId)return;const t=document.getElementById("lightsToggle");if(t){t.classList.toggle("active");const e=t.classList.contains("active");try{i.esp32Client.sendCommand(i.currentDeviceId,"lights",{state:e?"on":"off"}),m(`Lights ${e?"ON":"OFF"}`)}catch(o){console.error("Failed to toggle lights:",o),t.classList.toggle("active")}}};window.toggleHorn=()=>{if(!i.esp32Client||!i.currentDeviceId)return;const t=document.getElementById("hornToggle");if(t){t.classList.toggle("active");const e=t.classList.contains("active");try{i.esp32Client.sendCommand(i.currentDeviceId,"horn",{state:e?"on":"off"}),m(`Horn ${e?"ON":"OFF"}`)}catch(o){console.error("Failed to toggle horn:",o),t.classList.toggle("active")}}};function B(){i.route==="remote-control"&&v()}function D(t){const e=document.getElementById("commandLogContent");if(e){const o=document.createElement("div");for(o.className="log-entry",o.textContent=`[${new Date().toLocaleTimeString()}] ${t}`,e.insertBefore(o,e.firstChild);e.children.length>10;)e.removeChild(e.lastChild)}}window.toggleToken=t=>{i.showTokens||(i.showTokens={}),i.showTokens[t]=!i.showTokens[t],v()};window.handleCategoryFilter=t=>{i.filterCategory=t||null,v()};document.addEventListener("keydown",t=>{if(i.route!=="remote-control")return;const e=t.key.toLowerCase(),o={w:"forward",arrowup:"forward",s:"backward",arrowdown:"backward",a:"left",arrowleft:"left",d:"right",arrowright:"right"," ":"stop"};o[e]&&(t.preventDefault(),window.sendCarCommand(o[e]))});document.addEventListener("keydown",t=>{t.key==="Escape"&&document.getElementById("loginModal")&&window.closeLoginModal()});document.addEventListener("keyup",t=>{if(i.route!=="remote-control")return;const e=t.key.toLowerCase();["w","s","a","d","arrowup","arrowdown","arrowleft","arrowright"].includes(e)&&(t.preventDefault(),window.sendCarCommand("stop"))});de()});export default ce();
