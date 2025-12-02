export const TutorialDetailPage = ({ Breadcrumbs, state }) => {
    const tutorialId = state.params?.id;

    // Tutorial data with detailed descriptions and specific learning objectives
    const tutorials = [
        {
            id: 1,
            title: "Getting Started with Arduino",
            category: "Beginner",
            topic: "Microcontrollers",
            duration: "15 min",
            videoId: "nL34zDTPkcs",
            description: "Dive into the world of Arduino microcontrollers with this comprehensive beginner's guide. You'll learn the fundamental concepts of Arduino programming, understand the hardware components, and create your first working projects. This tutorial covers everything from setting up your development environment to uploading your first sketch onto the Arduino board. Perfect for absolute beginners with no prior programming or electronics experience.",
            learningPoints: [
                "Setting up the Arduino IDE and connecting your board",
                "Understanding Arduino pin configurations and digital I/O",
                "Writing and uploading your first Arduino sketch",
                "Working with basic sensors and LED circuits"
            ]
        },
        {
            id: 2,
            title: "Raspberry Pi Setup Guide",
            category: "Beginner",
            topic: "Microcontrollers",
            duration: "20 min",
            videoId: "BpJCAafw2qE",
            description: "Get your Raspberry Pi up and running with this detailed setup tutorial. Learn how to install the operating system, configure essential settings, and prepare your Pi for your first projects. This guide covers both the hardware setup process and the software configuration you'll need to start building amazing IoT projects. Whether you're using Raspberry Pi 3, 4, or 5, this tutorial will help you get started quickly and correctly.",
            learningPoints: [
                "Installing Raspberry Pi OS using the official imager",
                "Configuring network settings and enabling SSH",
                "Installing essential packages and development tools",
                "Understanding the GPIO pinout and basic Python programming"
            ]
        },
        {
            id: 3,
            title: "Understanding Sensors",
            category: "Intermediate",
            topic: "IoT",
            duration: "18 min",
            videoId: "DlG6LY84MUU",
            description: "Explore the fascinating world of electronic sensors and learn how to integrate them into your projects. This tutorial provides an in-depth look at various sensor types including temperature sensors (DHT11, DS18B20), motion sensors (PIR), ultrasonic distance sensors (HC-SR04), and light sensors (LDR, BH1750). You'll understand how sensors work, how to read their data, and how to calibrate them for accurate measurements in real-world applications.",
            learningPoints: [
                "Understanding analog vs digital sensors and their applications",
                "Reading data from temperature and humidity sensors",
                "Working with motion detection and ultrasonic distance measurement",
                "Implementing sensor calibration and data filtering techniques"
            ]
        },
        {
            id: 4,
            title: "DIY Obstacle Avoidance Car",
            category: "Intermediate",
            topic: "IoT",
            duration: "6 min",
            videoId: "1n_KjpMfVT0",
            description: "Build an intelligent autonomous car that can navigate around obstacles using ultrasonic sensors and Arduino. This hands-on project combines motor control, sensor integration, and basic robotics programming. You'll learn how to read ultrasonic sensor data, implement decision-making logic, and control DC motors using an L298N motor driver. This is a perfect project for understanding the basics of autonomous navigation and robotics.",
            learningPoints: [
                "Wiring and controlling DC motors with an L298N driver",
                "Reading and processing ultrasonic sensor data for obstacle detection",
                "Implementing autonomous navigation logic and decision trees",
                "Troubleshooting common issues in robotic car projects"
            ]
        },
        {
            id: 5,
            title: "PCB Design Basics",
            category: "Advanced",
            topic: "PCB Design",
            duration: "60 min",
            videoId: "vaCVh2SAZY4",
            description: "Master the art of printed circuit board (PCB) design from scratch. This comprehensive tutorial takes you through the entire PCB design workflow using professional tools like KiCad or EasyEDA. Learn how to create schematics, design PCB layouts, route traces efficiently, and prepare your designs for manufacturing. You'll understand design rules, layer stackups, component placement strategies, and how to export Gerber files for fabrication. Essential knowledge for anyone serious about electronics development.",
            learningPoints: [
                "Creating professional schematics with proper component symbols",
                "PCB layout best practices: trace width, clearances, and ground planes",
                "Routing strategies for signal integrity and EMI reduction",
                "Preparing and exporting Gerber files for PCB manufacturing"
            ]
        },
        {
            id: 6,
            title: "IoT Projects with ESP32",
            category: "Advanced",
            topic: "IoT",
            duration: "50 min",
            videoId: "xPlN_Tk3VLQ",
            description: "Unlock the power of the ESP32 microcontroller for advanced IoT applications. This tutorial covers WiFi connectivity, web server creation, MQTT protocol implementation, and cloud integration. You'll build real IoT projects including a web-based temperature monitor, remote-controlled devices, and data logging systems. Learn how to use the ESP32's dual-core processor, Bluetooth capabilities, and low-power modes to create professional-grade IoT solutions.",
            learningPoints: [
                "Setting up ESP32 development environment and WiFi connectivity",
                "Creating web servers and REST APIs on the ESP32",
                "Implementing MQTT for real-time IoT communication",
                "Integrating with cloud platforms (Firebase, AWS IoT, ThingSpeak)"
            ]
        },
        {
            id: 7,
            title: "8 Brilliant Projects with 3D Printing and Electronics!",
            category: "Intermediate",
            topic: "Microcontrollers",
            duration: "8 min",
            videoId: "UkWoPMa6V-M",
            description: "Discover the perfect fusion of 3D printing and electronics in this inspiring project showcase. See how makers are combining custom 3D-printed enclosures with Arduino and Raspberry Pi to create amazing devices. From smart home sensors to robotic mechanisms, this video demonstrates practical applications and design techniques. Learn how to design functional enclosures, integrate electronics seamlessly, and bring your maker ideas to life with the power of additive manufacturing.",
            learningPoints: [
                "Designing functional 3D-printed enclosures for electronics",
                "Integrating sensors and displays into custom housings",
                "Creating cable management and mounting solutions",
                "Prototyping techniques for iterative design improvements"
            ]
        },
        {
            id: 8,
            title: "Building a Weather Station",
            category: "Advanced",
            topic: "IoT",
            duration: "42 min",
            videoId: "U0kPgFcALac",
            description: "Create a complete IoT weather station that measures temperature, humidity, atmospheric pressure, and more. This advanced project teaches you how to interface with BME280/BMP280 sensors, implement accurate data logging, visualize weather data on web dashboards, and even integrate with weather services like Weather Underground. You'll learn about sensor calibration, data averaging techniques, power management for outdoor deployment, and how to create professional data visualizations using Chart.js or similar libraries.",
            learningPoints: [
                "Interfacing with BME280/BMP280 environmental sensors via I2C",
                "Implementing data logging with timestamps and SD card storage",
                "Creating real-time data visualizations and web dashboards",
                "Power management and weatherproofing for outdoor installations"
            ]
        }
    ];

    const tutorial = tutorials.find(t => t.id === parseInt(tutorialId));

    if (!tutorial) {
        return `
            <div style="max-width: 1200px; margin: 4rem auto; padding: 2rem; text-align: center;">
                <h1>Tutorial Not Found</h1>
                <p style="color: #64748b; margin: 1rem 0;">The tutorial you're looking for doesn't exist.</p>
                <button class="btn btn-primary" onclick="window.navigate('learn')">Back to Learn</button>
            </div>
        `;
    }

    const getBadgeColor = (category) => {
        if (category === 'Beginner') return { bg: '#dcfce7', text: '#16a34a' };
        if (category === 'Intermediate') return { bg: '#dbeafe', text: '#2563eb' };
        return { bg: '#f3e8ff', text: '#9333ea' };
    };

    const colors = getBadgeColor(tutorial.category);

    return `
        <div style="background: #f8f9fa; min-height: 100vh; padding: 2rem 0;">
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
                ${Breadcrumbs('learn')}
                
                <!-- Back Button -->
                <button class="btn btn-outline" onclick="window.navigate('learn')" style="margin-bottom: 1.5rem;">
                    ← Back to Tutorials
                </button>

                <!-- Video Section -->
                <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); margin-bottom: 2rem;">
                    <div style="position: relative; padding-bottom: 56.25%; background: #000;">
                        <iframe 
                            src="https://www.youtube.com/embed/${tutorial.videoId}" 
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
                        <span style="background: ${colors.bg}; color: ${colors.text}; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">
                            ${tutorial.category}
                        </span>
                        <span style="background: #f1f5f9; color: #64748b; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
                            📚 ${tutorial.topic}
                        </span>
                        <span style="background: #f1f5f9; color: #64748b; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
                            ⏱️ ${tutorial.duration}
                        </span>
                    </div>

                    <h1 style="font-size: 2rem; color: #1e293b; margin-bottom: 1.5rem; font-weight: 700;">
                        ${tutorial.title}
                    </h1>

                    <div style="border-top: 1px solid #e2e8f0; padding-top: 1.5rem;">
                        <h2 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 1rem; font-weight: 600;">
                            About this Tutorial
                        </h2>
                        <p style="color: #64748b; line-height: 1.8; font-size: 1rem;">
                            ${tutorial.description}
                        </p>
                    </div>

                    <!-- What You'll Learn -->
                    <div style="border-top: 1px solid #e2e8f0; margin-top: 2rem; padding-top: 2rem;">
                        <h3 style="font-size: 1.125rem; color: #1e293b; margin-bottom: 1.5rem; font-weight: 600;">
                            What You'll Learn
                        </h3>
                        <ul style="list-style: none; padding: 0; display: grid; gap: 0.75rem;">
                            ${tutorial.learningPoints.map(point => `
                                <li style="display: flex; align-items: start; gap: 0.75rem;">
                                    <span style="color: #10b981; font-size: 1.25rem;">✓</span>
                                    <span style="color: #64748b; line-height: 1.6;">${point}</span>
                                </li>
                            `).join('')}
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
    `;
};
