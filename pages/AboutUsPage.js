
export const AboutUsPage = ({ Breadcrumbs }) => {
    const teamMembers = [
        { name: "Marco Dela Cruz", role: "Founder & CEO", image: "https://ui-avatars.com/api/?name=Marco+Dela+Cruz&background=6366f1&color=fff&size=120" },
        { name: "Rina Gonzales", role: "Operations Manager", image: "https://ui-avatars.com/api/?name=Rina+Gonzales&background=6366f1&color=fff&size=120" },
        { name: "Luis Navarro", role: "Technical Support Engineer", image: "https://ui-avatars.com/api/?name=Luis+Navarro&background=6366f1&color=fff&size=120" },
        { name: "Ella Ramirez", role: "Customer Service Lead", image: "https://ui-avatars.com/api/?name=Ella+Ramirez&background=6366f1&color=fff&size=120" }
    ];

    const heroImage = "assets/about_us_hero.png";
    const originImage = "assets/about_us_origin.png";
    const communityImage = "assets/about_us_community.png";

    return `
        <div class="about-us-page">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                ${Breadcrumbs('about-us')}
                
                <!-- Hero Section -->
                <div class="about-hero" style="
                    position: relative; 
                    border-radius: 12px; 
                    overflow: hidden; 
                    margin: 2rem 0 4rem; 
                    height: 400px; 
                    background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('${heroImage}'); 
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
                        <img src="${originImage}" alt="Our humble beginnings" style="width: 100%; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); transform: rotate(2deg);">
                    </div>
                </div>

                <!-- Mission Section -->
                <div style="background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('${communityImage}'); background-size: cover; background-position: center; border-radius: 24px; padding: 4rem; margin-bottom: 6rem; text-align: center; color: white; position: relative; overflow: hidden;">
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
                        ${teamMembers.map(member => `
                            <div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center; transition: transform 0.2s; cursor: pointer;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                                <div style="width: 100px; height: 100px; margin: 0 auto 1.5rem; border-radius: 50%; overflow: hidden; border: 4px solid #f1f5f9;">
                                    <img src="${member.image}" alt="${member.name}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #1e293b; font-weight: 600;">${member.name}</h3>
                                <p style="font-size: 0.875rem; color: #6366f1; font-weight: 500;">${member.role}</p>
                            </div>
                        `).join('')}
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
    `;
};
