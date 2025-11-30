// CommonJS version of data for server-side seeding
const products = [
    {
        id: 1,
        name: "ESP32 Development Board (Type-C)",
        category: "Microcontrollers",
        price: 350,
        image: "images/products/esp32.png",
        stock: 45,
        description: "Type C ESP32 Development Board with 30/38 pins. Supported interfaces: UART, SPI, SDIO, I2C, PWM, I2S, IR, ADC, DAC. Perfect for IoT projects."
    },
    {
        id: 2,
        name: "Ultrasonic Sensor HC-SR04",
        category: "Sensors",
        price: 89,
        image: "images/products/hc-sr04.png",
        stock: 120,
        description: "Popular and cost-effective module used for non-contact distance measurement. Works by emitting ultrasonic waves."
    },
    {
        id: 3,
        name: "L298N DC Motor Driver Module",
        category: "Motor Drivers",
        price: 75,
        image: "images/products/l298n.png",
        stock: 67,
        description: "Dual H-Bridge Motor Driver Module. High voltage, dual H-bridge manufactured by ST company. Perfect for controlling DC motors and stepper motors."
    },
    {
        id: 4,
        name: "40-Pin Jumper Wires (10cm)",
        category: "Cables & Wires",
        price: 25,
        image: "images/products/jumper-wires.png",
        stock: 200,
        description: "Essential tools for breadboarding and prototyping. 40-pin jumper wires allow easy connections between components."
    },
    {
        id: 5,
        name: "Breadboard 830 Points",
        category: "Prototyping",
        price: 99,
        image: "images/products/breadboard.png",
        stock: 85,
        description: "Solderless breadboard SYB-MB102 with 830 tie points. Completely reusable, perfect for creating temporary circuits without soldering."
    },
    {
        id: 6,
        name: "SG90 Micro Servo Motor (9g)",
        category: "Motors & Actuators",
        price: 95,
        image: "images/products/sg90.png",
        stock: 150,
        description: "SG92R/SG90 Micro Servo with nylon carbon fiber gears. Stall Torque: 2.5kg/cm at 4.8V. Perfect for RC models and robotics."
    },
    {
        id: 7,
        name: "Tower Pro MG996R Servo Motor",
        category: "Motors & Actuators",
        price: 275,
        image: "images/products/mg996r.png",
        stock: 42,
        description: "Digital servo motor with 180° rotation. High torque for robotics applications. Metal gears for durability."
    },
    {
        id: 8,
        name: "1-4 Channel 5V Relay Module",
        category: "Relays & Switches",
        price: 125,
        image: "images/products/relay.png",
        stock: 95,
        description: "5V/12V 10A relay module with optocoupler. Compatible with Arduino, Orange Pi, and Raspberry Pi (use 5V version)."
    },
    {
        id: 9,
        name: "LM2596S DC-DC Buck Converter",
        category: "Power Supply",
        price: 45,
        image: "images/products/buck-converter.png",
        stock: 78,
        description: "Step-down voltage regulator module. Adjustable output voltage. Perfect for powering projects with different voltage requirements."
    },
    {
        id: 10,
        name: "IR Proximity Sensor",
        category: "Sensors",
        price: 35,
        image: "images/products/ir-sensor.png",
        stock: 110,
        description: "Multipurpose infrared sensor for obstacle sensing, color detection, and line following applications."
    },
    {
        id: 11,
        name: "18650 Battery Holder (1S/2S/3S)",
        category: "Batteries & Holders",
        price: 35,
        image: "images/products/battery-holder.png",
        stock: 140,
        description: "Series battery holder for 18650 cells with wire. Available in 1, 2, or 3 cell configurations for various voltage requirements."
    },
    {
        id: 12,
        name: "PKCELL 18650 3.7V Battery (3000mAh)",
        category: "Batteries & Holders",
        price: 175,
        image: "images/products/battery-18650.png",
        stock: 88,
        description: "True rated lithium-ion 18650 battery. Available in 2200mAh, 3000mAh, 3350mAh capacities. Perfect for power banks and flashlights."
    },
    {
        id: 13,
        name: "USB Cable for Arduino Nano/Uno",
        category: "Cables & Wires",
        price: 25,
        image: "images/products/usb-cable.png",
        stock: 165,
        description: "25cm Mini USB cable for Arduino Nano or Uno/Mega boards. Blue color, quality connectors."
    },
    {
        id: 14,
        name: "FR4 Universal PCB Board (Double-Sided)",
        category: "Prototyping",
        price: 55,
        image: "images/products/pcb-board.png",
        stock: 95,
        description: "Fiberglass universal protoboard, more durable than phenolic paper PCB. Double-sided for complex circuits."
    },
    {
        id: 15,
        name: "SanDisk MicroSD Card (16GB-256GB)",
        category: "Storage",
        price: 299,
        image: "images/products/microsd.png",
        stock: 75,
        description: "SanDisk Ultra Class 10 memory card for Raspberry Pi and phones. Fast transfer speeds. Available in multiple capacities."
    },
    {
        id: 16,
        name: "eSUN PLA+ 3D Printer Filament (1.75mm, 1kg)",
        category: "3D Printing",
        price: 799,
        image: "images/products/esun-pla-plus.png",
        stock: 55,
        description: "Environmentally friendly PLA+ filament with smooth surface finish. Easy to print with excellent layer adhesion."
    },
    {
        id: 17,
        name: "eSUN PETG Filament (1.75mm, 1kg)",
        category: "3D Printing",
        price: 1099,
        image: "images/products/esun-petg.png",
        stock: 48,
        description: "High-performance PETG filament combining ABS strength with PLA ease of printing. Excellent durability."
    },
    {
        id: 18,
        name: "Polymaker Matte PLA Filament",
        category: "3D Printing",
        price: 1350,
        image: "images/products/polymaker-matte.png",
        stock: 35,
        description: "Panchroma™ Matte bioplastic 3D printing filament. Next generation matte finish for stunning prints."
    },
    {
        id: 19,
        name: "ELEGOO PLA Filament (1.75mm, 1kg)",
        category: "3D Printing",
        price: 749,
        image: "images/products/elegoo-pla.png",
        stock: 62,
        description: "High-quality PLA with lower melting temperature. Easy to use, multiple color options available."
    },
    {
        id: 20,
        name: "Bambu Lab PLA Basic Filament (1kg)",
        category: "3D Printing",
        price: 999,
        image: "images/products/bambu-lab.png",
        stock: 40,
        description: "Easy to print, beginner-friendly PLA with smooth surface finish. Biodegradable and reliable quality."
    },
    {
        id: 21,
        name: "10x Arduino Nano Bulk Pack",
        category: "Microcontrollers",
        price: 1500,
        image: "assets/bulk-arduino.png",
        stock: 50,
        description: "Bulk pack of 10 Arduino Nano boards. Perfect for classrooms and workshops. Save ₱300!"
    },
    {
        id: 22,
        name: "20x Assorted Sensors Bundle",
        category: "Sensors",
        price: 2400,
        image: "assets/bulk-sensors.png",
        stock: 30,
        description: "Comprehensive kit of 20 different sensors including temperature, motion, light, and more. Save ₱600!"
    },
    {
        id: 23,
        name: "500x Resistors Pack (Assorted)",
        category: "Components",
        price: 800,
        image: "assets/bulk-resistors.png",
        stock: 100,
        description: "Huge pack of 500 resistors with various resistance values. Essential for any electronics lab. Save ₱400!"
    },
    {
        id: 24,
        name: "Raspberry Pi 5 Starter Kit",
        category: "Microcontrollers",
        price: 7499,
        image: "assets/raspberry-pi-5-kit.png",
        stock: 25,
        description: "The latest Raspberry Pi 5 (8GB RAM) complete starter kit. Includes case, power supply, cooling fan, HDMI cables, and 64GB microSD card."
    }
];

const users = [
    {
        id: 1,
        name: "Admin User",
        email: "adminlumina",
        password: "lumina12",
        role: "admin"
    },
    {
        id: 2,
        name: "John Doe",
        email: "userlumina",
        password: "lumina123",
        role: "customer"
    }
];

const orders = [
    {
        id: "ORD-001",
        userId: 2,
        date: "2023-10-25",
        total: 1598.00,
        status: "Completed",
        items: [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 1 }
        ]
    }
];

module.exports = { products, users, orders };
