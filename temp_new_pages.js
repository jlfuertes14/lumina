
// --- Additional Pages ---

const ContactUsPage = () => {
    return `
        <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
            <div class="breadcrumbs" style="margin-bottom: 2rem;">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a>
                <span>&gt;</span>
                <span>Contact Us</span>
            </div>
            
            <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary);">Get In Touch</h1>
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 3rem;">We're here to help! Reach out to us with any questions or concerns.</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
                <div>
                    <form onsubmit="event.preventDefault(); window.showToast('Message sent! We\\'ll get back to you soon.');" style="background: var(--surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
                        <h2 style="margin-bottom: 1.5rem;">Send us a message</h2>
                        <div class="form-group" style="margin-bottom: 1.5rem;">
                            <label class="form-label">Your Name</label>
                            <input type="text" class="form-input" required>
                        </div>
                        <div class="form-group" style="margin-bottom: 1.5rem;">
                            <label class="form-label">Email Address</label>
                            <input type="email" class="form-input" required>
                        </div>
                        <div class="form-group" style="margin-bottom: 1.5rem;">
                            <label class="form-label">Subject</label>
                            <input type="text" class="form-input" required>
                        </div>
                        <div class="form-group" style="margin-bottom: 1.5rem;">
                            <label class="form-label">Message</label>
                            <textarea class="form-input" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                    </form>
                </div>
                
                <div>
                    <div style="background: var(--surface); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border); margin-bottom: 2rem;">
                        <h3 style="margin-bottom: 1.5rem;">Contact Information</h3>
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="font-size: 0.875rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Address</h4>
                            <p>123 Electronics Avenue, Makati City, Philippines</p>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="font-size: 0.875rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Phone</h4>
                            <p>+63 917 123 4567</p>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h4 style="font-size: 0.875rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Email</h4>
                            <p>support@luminaelectronics.com</p>
                        </div>
                        <div>
                            <h4 style="font-size: 0.875rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Business Hours</h4>
                            <p>Monday - Friday: 9:00 AM - 6:00 PM<br>Saturday: 10:00 AM - 4:00 PM<br>Sunday: Closed</p>
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
    `;
};

const AboutUsPage = () => {
    return `
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
    `;
};

const LearnPage = () => {
    const tutorials = [
        { id: 1, title: 'Getting Started with Arduino', category: 'Beginner', duration: '15 min', image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop' },
        { id: 2, title: 'ESP32 WiFi Projects', category: 'Intermediate', duration: '30 min', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop' },
        { id: 3, title: 'Raspberry Pi Home Automation', category: 'Advanced', duration: '45 min', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop' },
        { id: 4, title: 'Sensor Integration Guide', category: 'Intermediate', duration: '25 min', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop' },
        { id: 5, title: 'Soldering Basics', category: 'Beginner', duration: '20 min', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop' },
        { id: 6, title: 'PCB Design Fundamentals', category: 'Advanced', duration: '60 min', image: 'https://images.unsplash.com/photo-1530819568329-97653eafbbfa?w=400&h=300&fit=crop' }
    ];

    return `
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
                ${tutorials.map(tutorial => `
                    <div style="background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border); overflow: hidden; transition: all 0.3s ease; cursor: pointer;" 
                         onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='var(--shadow-xl)'"
                         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
                         onclick="state.currentTutorialId = ${tutorial.id}; window.navigate('tutorial-detail');">
                        <div style="width: 100%; height: 200px; background: linear-gradient(135deg, var(--primary), var(--accent)); background-image: url('${tutorial.image}'); background-size: cover; background-position: center;"></div>
                        <div style="padding: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                                <span style="background: var(--accent); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem; font-weight: 600;">${tutorial.category}</span>
                                <span style="color: var(--text-muted); font-size: 0.875rem; display: flex; align-items: center; gap: 0.25rem;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    ${tutorial.duration}
                                </span>
                            </div>
                            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text-main);">${tutorial.title}</h3>
                            <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">Learn step-by-step how to implement this project with detailed instructions and code examples.</p>
                            <button class="btn btn-primary" style="width: 100%;">Start Learning</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--border); margin-top: 3rem; text-align: center;">
                <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">Can't Find What You're Looking For?</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                    We're constantly adding new tutorials. Request a specific topic and our team will prioritize it.
                </p>
                <button class="btn btn-outline" onclick="window.showToast('Request submitted! We\\'ll look into it.')">Request a Tutorial</button>
            </div>
        </div>
    `;
};

const TutorialDetailPage = () => {
    const tutorials = [
        { id: 1, title: 'Getting Started with Arduino', category: 'Beginner', duration: '15 min', image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop', content: '<h3>Introduction</h3><p>Arduino is an open-source electronics platform based on easy-to-use hardware and software.</p><h3>Step 1: Setup</h3><p>Download the Arduino IDE from the official website and install it on your computer.</p><h3>Step 2: Connect</h3><p>Connect your Arduino board to your computer using a USB cable.</p>' },
        { id: 2, title: 'ESP32 WiFi Projects', category: 'Intermediate', duration: '30 min', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop', content: '<h3>Connecting to WiFi</h3><p>The ESP32 is a powerful microcontroller with built-in WiFi and Bluetooth.</p>' },
        { id: 3, title: 'Raspberry Pi Home Automation', category: 'Advanced', duration: '45 min', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop', content: '<h3>Home Automation Basics</h3><p>Learn how to control lights and appliances with Raspberry Pi.</p>' },
        { id: 4, title: 'Sensor Integration Guide', category: 'Intermediate', duration: '25 min', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', content: '<h3>Working with Sensors</h3><p>Understand how to read data from temperature, humidity, and motion sensors.</p>' },
        { id: 5, title: 'Soldering Basics', category: 'Beginner', duration: '20 min', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop', content: '<h3>Safety First</h3><p>Always work in a well-ventilated area and wear safety glasses.</p>' },
        { id: 6, title: 'PCB Design Fundamentals', category: 'Advanced', duration: '60 min', image: 'https://images.unsplash.com/photo-1530819568329-97653eafbbfa?w=400&h=300&fit=crop', content: '<h3>Schematic Design</h3><p>Start by creating a clear and correct schematic diagram.</p>' }
    ];

    const tutorial = tutorials.find(t => t.id === state.currentTutorialId) || tutorials[0];

    return `
        <div style="max-width: 800px; margin: 0 auto; padding: 3rem 2rem;">
            <div class="breadcrumbs" style="margin-bottom: 2rem;">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a>
                <span>&gt;</span>
                <a href="#" onclick="window.navigate('learn'); return false;">Learn</a>
                <span>&gt;</span>
                <span>${tutorial.title}</span>
            </div>

            <img src="${tutorial.image}" alt="${tutorial.title}" style="width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 2rem;">

            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <span class="badge badge-success" style="background: var(--accent); color: white;">${tutorial.category}</span>
                <span style="color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    ${tutorial.duration}
                </span>
            </div>

            <h1 style="font-size: 2.5rem; margin-bottom: 2rem; color: var(--primary);">${tutorial.title}</h1>

            <div class="tutorial-content" style="line-height: 1.8; font-size: 1.1rem; color: var(--text-main);">
                ${tutorial.content || '<p>Full tutorial content coming soon...</p>'}
                
                <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--primary);">What you will learn</h3>
                <ul style="margin-bottom: 2rem; padding-left: 1.5rem;">
                    <li>Understanding the basics</li>
                    <li>Setting up your environment</li>
                    <li>Writing your first code</li>
                    <li>Troubleshooting common issues</li>
                </ul>

                <div style="background: var(--surface-alt); padding: 1.5rem; border-radius: var(--radius-md); margin: 2rem 0; border-left: 4px solid var(--accent);">
                    <h4 style="margin-bottom: 0.5rem; color: var(--primary);">Pro Tip</h4>
                    <p style="margin: 0;">Always double check your connections before powering up the board!</p>
                </div>
            </div>

            <div style="margin-top: 4rem; border-top: 1px solid var(--border); padding-top: 2rem; display: flex; justify-content: space-between;">
                <button class="btn btn-outline" onclick="window.navigate('learn')">← Back to Tutorials</button>
                <button class="btn btn-primary" onclick="window.showToast('Tutorial marked as complete!')">Mark as Complete</button>
            </div>
        </div>
    `;
};

const DealsPage = () => {
    const promotions = [
        { id: 1, name: 'Arduino Starter Kit Bundle', originalPrice: 2500, salePrice: 1999, discount: 20, category: 'Development Boards', image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop', endsIn: '2 days' },
        { id: 2, name: 'Sensor Pack - 20 Types', originalPrice: 1800, salePrice: 1299, discount: 28, category: 'Sensors', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', endsIn: '5 days' },
        { id: 6, name: 'Servo Motor Bundle (5pcs)', originalPrice: 800, salePrice: 599, discount: 25, category: 'Motors', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop', endsIn: '1 week' },
        { id: 12, name: 'Premium Jumper Wire Set', originalPrice: 350, salePrice: 249, discount: 29, category: 'Accessories', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop', endsIn: '3 days' }
    ];

    return `
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
                ${promotions.map(promo => `
                    <div style="background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border); overflow: hidden; transition: all 0.3s ease; position: relative; cursor: pointer;"
                         onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='var(--shadow-xl)'"
                         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
                         onclick="window.showToast('Added to cart: ${promo.name}')">
                        <div style="position: absolute; top: 1rem; right: 1rem; background: var(--accent); color: white; padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 700; font-size: 0.875rem; z-index: 10;">
                            -${promo.discount}%
                        </div>
                        <div style="width: 100%; height: 200px; background: linear-gradient(135deg, var(--primary), var(--accent)); background-image: url('${promo.image}'); background-size: cover; background-position: center;"></div>
                        <div style="padding: 1.5rem;">
                            <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">${promo.category}</div>
                            <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--text-main); font-weight: 700;">${promo.name}</h3>
                            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                                <span style="font-size: 1.5rem; font-weight: 800; color: var(--accent);">${formatCurrency(promo.salePrice)}</span>
                                <span style="text-decoration: line-through; color: var(--text-muted); font-size: 1rem;">${formatCurrency(promo.originalPrice)}</span>
                            </div>
                            <div class="deal-timer" data-ends-in="${promo.endsIn}" style="background: var(--surface-alt); padding: 0.5rem; border-radius: var(--radius-sm); margin-bottom: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted); font-weight: 600;">
                                ⏰ Ends in ${promo.endsIn}
                            </div>
                            <button class="btn btn-primary" style="width: 100%;" onclick="event.stopPropagation(); window.addToCart(${promo.id})">Add to Cart</button>
                        </div>
                    </div>
                `).join('')}
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
    `;
};
