# Lumina Electronics Website - Software Development Life Cycle (SDLC) Documentation

---

## Brief Background of the Project

**Lumina Electronics** is a Filipino-owned electronics components supplier founded in **2020** in the heart of Makati City, Philippines. What started as a small 12-square-meter shop with only 50 products has grown into one of the Philippines' most trusted electronics component suppliers.

The company was established by a group of engineers, hobbyists, and DIY enthusiasts who recognized a significant gap in the market: quality electronic components were hard to find locally for Filipino innovators. Their mission from the start was simple—*"Bridge the gap between Filipino innovators and the components they need."*

### Company Journey:
- **2020**: Started in a small Makati shop with 50 products, serving students and hobbyists
- **2022**: Expanded to 500+ products, formed partnerships with trusted manufacturers, and began supplying schools and university organizations
- **2024**: Now offering 1,000+ products, serving over 50,000 customers with same-day shipping and improved support
- **Today**: Lumina Electronics is a trusted national supplier—built by Filipinos, for Filipinos

### Core Values:
1. **Quality First** - Sourcing only authentic, lab-tested components from verified global manufacturers
2. **Fast Delivery** - Same-day Metro Manila shipping and nationwide delivery
3. **Community Focus** - Supporting schools, robotics clubs, and DIY communities with technical guidance

### Leadership Team:
- **Marco Dela Cruz** - Founder & CEO
- **Rina Gonzales** - Operations Manager
- **Luis Navarro** - Technical Support Engineer
- **Ella Ramirez** - Customer Service Lead

---

# PLANNING & REQUIREMENT IDENTIFICATION

## Environmental Scanning

### Primary Environmental Reasons for Website Development:

1. **Digital Transformation Need**
   - The electronics components industry in the Philippines is rapidly moving towards e-commerce
   - Customers expect online ordering capabilities with real-time inventory visibility
   - Traditional physical-only retail limits market reach to Metro Manila

2. **Target Market Analysis**
   - Engineering students requiring components for academic projects
   - Hobbyists and DIY enthusiasts building personal projects
   - Robotics clubs and school organizations needing bulk orders
   - Professional engineers requiring reliable component sources
   - Makers and 3D printing enthusiasts

3. **Competitive Pressure**
   - International e-commerce platforms (AliExpress, Lazada) offering electronic components
   - Need for a local alternative with faster shipping and Filipino customer support
   - Opportunity to provide technical expertise that generic marketplaces cannot

4. **Technology Enablement**
   - Rise of IoT (Internet of Things) projects, especially ESP32-based devices
   - Growing 3D printing community requiring filaments and accessories
   - Need for real-time device management and control capabilities

5. **Business Growth Limitations**
   - Physical store constraints limited to walk-in customers
   - Manual order processing inefficiencies
   - Difficulty tracking inventory across multiple product categories
   - Challenge in maintaining customer relationships without a digital platform

---

## Goals and Objectives

### Primary Goal:
To develop a comprehensive e-commerce website that enables Lumina Electronics to serve Filipino innovators nationwide with an efficient, user-friendly platform for purchasing electronic components.

### Specific Objectives:

1. **E-Commerce Functionality**
   - Enable online product browsing with detailed specifications
   - Implement shopping cart with multi-item selection
   - Support multiple payment methods (COD, GCash, Maya, Bank Transfer, Credit Card)
   - Provide order tracking and history

2. **User Experience**
   - Create intuitive navigation with search functionality
   - Implement responsive design for mobile and desktop users
   - Provide real-time product availability and stock information
   - Enable personalized user accounts with saved addresses

3. **Administrative Efficiency**
   - Develop admin dashboard for product, order, and staff management
   - Implement role-based access control (Admin, Staff, Customer)
   - Enable real-time analytics and sales reporting
   - Support soft-delete functionality for data retention

4. **IoT Integration**
   - Enable customers to register and control ESP32-based devices remotely
   - Provide real-time device status monitoring via WebSocket
   - Support device pairing with secure authentication

5. **Community Building**
   - Provide learning resources and tutorials for electronics projects
   - Offer promotional deals and coupon systems
   - Enable customer support through the contact page

---

## Scope and Limitations

### Scope

The proposed website encompasses the following functional areas:

#### 1. **Customer-Facing Features**
- **Home Page**: Featured products, promotional banners, and navigation
- **Products Page**: Complete product catalog with filtering, sorting, and search
- **Product Detail Page**: Detailed specifications, images, and add-to-cart functionality
- **Shopping Cart**: Multi-item cart with quantity management and item selection
- **Checkout System**: Multi-step checkout with address, shipping, and payment options
- **Order Confirmation**: Order summary with receipt printing capability
- **User Account Management**: Profile editing, address management, password change
- **My Orders**: Order history and status tracking
- **My Devices**: ESP32 device registration and real-time control
- **My Coupons**: Coupon claiming and usage tracking
- **About Us Page**: Company history, mission, and team information
- **Contact Us Page**: Contact form and business information
- **Learn Page**: Educational tutorials and resources
- **Deals Page**: Promotional offers with countdown timers

#### 2. **Administrative Features**
- **Admin Dashboard**: Overview with sales analytics and charts
- **Products Management**: Add, edit, soft-delete products with image upload
- **Orders Management**: View all orders, update order status
- **Staff Management**: Add, edit, delete staff accounts
- **Role-Based Access**: Admin and Staff permissions

#### 3. **Technical Features**
- **User Authentication**: Secure login with password hashing (bcrypt)
- **Real-Time Communication**: WebSocket for device control and status updates
- **Responsive Design**: Mobile-first design with desktop optimization
- **API Architecture**: RESTful API backend with MongoDB database

#### 4. **Product Categories Covered**
- Microcontrollers (ESP32, Arduino)
- Sensors (Ultrasonic, IR Proximity)
- Motor Drivers (L298N)
- Motors & Actuators (Servo Motors)
- Prototyping (Breadboards, PCB Boards)
- Power Supply (Buck Converters, Batteries)
- Cables & Wires
- Relays & Switches
- Storage (MicroSD Cards)
- 3D Printing Filaments (PLA, PETG)

### Limitations

While the website provides essential functions, certain constraints must be acknowledged:

1. **Payment Processing**
   - GCash, Maya, Bank Transfer, and Credit Card payments operate in **Demo Mode**
   - Actual payment gateway integration (e.g., PayMongo, Xendit) not implemented
   - Cash on Delivery (COD) is the only production-ready payment method

2. **Inventory Management**
   - No automated low-stock alerts or reorder notifications
   - Stock synchronization with physical store inventory is manual
   - No integration with warehouse management systems

3. **Shipping Integration**
   - Fixed shipping fee (₱50) regardless of location
   - No real-time courier rate calculation
   - No integration with shipping carriers (LBC, J&T, etc.)

4. **Device Control Limitations**
   - ESP32 device control requires devices to be online and connected
   - WebSocket connection dependent on stable internet connectivity
   - Limited to devices programmed with matching firmware

5. **Analytics**
   - Basic sales analytics without advanced reporting
   - No integration with Google Analytics or similar tools
   - Limited to internal data visualization

6. **Search Functionality**
   - Text-based search without advanced filtering by specifications
   - No AI-powered product recommendations

7. **Multi-Language Support**
   - Website available only in English
   - No Filipino/Tagalog language option

8. **Offline Functionality**
   - No Progressive Web App (PWA) capabilities
   - Requires active internet connection

---

## Operations to be Improved

The website development aims to address and improve the following operational areas:

### 1. **Order Processing**
- **Before**: Manual order taking via phone, social media, or walk-in
- **After**: Automated online order submission with confirmation

### 2. **Inventory Visibility**
- **Before**: Customers must call or visit to check stock
- **After**: Real-time stock display on product pages

### 3. **Customer Data Management**
- **Before**: Physical or scattered digital records
- **After**: Centralized database with user accounts and order history

### 4. **Payment Collection**
- **Before**: Manual tracking of COD payments
- **After**: Multiple payment options with order-linked tracking

### 5. **Product Catalog Updates**
- **Before**: Static price lists or manual communication
- **After**: Dynamic admin panel for instant updates

### 6. **Customer Support Efficiency**
- **Before**: Repeated inquiries about product specs
- **After**: Detailed product pages with specifications

### 7. **Staff Productivity**
- **Before**: Staff handling all inquiries manually
- **After**: Self-service for customers; staff dashboard for order management

### 8. **Market Reach**
- **Before**: Limited to Metro Manila walk-in customers
- **After**: Nationwide customer base with online ordering

---

# DEFINING

## Coverage of the Project to be Developed

The **Lumina Electronics Website** covers a full-stack e-commerce solution including:

| Component | Coverage |
|-----------|----------|
| **Frontend** | Single-page application (SPA) with 10+ page components |
| **Backend** | Node.js/Express.js REST API server |
| **Database** | MongoDB Atlas cloud database |
| **Real-Time** | Socket.IO for web clients, WebSocket for ESP32 devices |
| **Authentication** | JWT-like session management with bcrypt password hashing |
| **Hosting** | Static frontend (GitHub Pages), Backend (Railway) |

### Pages and Components:
1. Home Page
2. Products Page (with category filtering)
3. Product Detail Page
4. Shopping Cart Page
5. Checkout Page
6. Order Confirmation Page
7. User Account Page (Profile, Orders, Devices, Coupons tabs)
8. Admin Dashboard (Dashboard, Products, Orders, Staff tabs)
9. Admin Profile Page
10. About Us Page
11. Contact Us Page
12. Learn Page (Tutorials)
13. Tutorial Detail Page
14. Deals Page
15. Device Pairing Page
16. Remote Control Page

---

## Stakeholders / Intended Users of the Project

### Primary Stakeholders:

| Stakeholder | Role | Interactions |
|-------------|------|--------------|
| **Customers** | End users purchasing products | Browse products, place orders, manage account, control devices |
| **Admin Users** | Business owners/managers | Full system access, analytics, user management |
| **Staff Users** | Store employees | Order processing, product management (limited access) |

### Secondary Stakeholders:

| Stakeholder | Interest |
|-------------|----------|
| **Schools & Universities** | Bulk ordering for laboratory supplies |
| **Robotics Clubs** | Group purchases and project support |
| **DIY Community** | Access to learning resources and specialized components |
| **Courier Partners** | Order delivery fulfillment |

### User Roles and Permissions:

| Feature | Customer | Staff | Admin |
|---------|----------|-------|-------|
| Browse Products | ✓ | ✓ | ✓ |
| Add to Cart | ✓ | ✗ | ✗ |
| Place Orders | ✓ | ✗ | ✗ |
| Manage Own Profile | ✓ | ✓ | ✓ |
| View All Orders | ✗ | ✓ | ✓ |
| Update Order Status | ✗ | ✓ | ✓ |
| Manage Products | ✗ | ✗ | ✓ |
| Manage Staff | ✗ | ✗ | ✓ |
| View Analytics | ✗ | ✗ | ✓ |

---

## Expected Project End Results

Upon successful completion, the project will deliver:

### 1. **Fully Functional E-Commerce Website**
- Responsive, mobile-friendly user interface
- Complete product catalog with 20+ initial products
- Shopping cart and checkout workflow
- User authentication and account management

### 2. **Administrative Dashboard**
- Real-time sales analytics with visual charts
- Complete CRUD operations for products and staff
- Order management with status updates
- Soft-delete functionality for data retention

### 3. **IoT Device Integration**
- ESP32 device registration and pairing
- Real-time device control interface
- WebSocket-based communication
- Device status monitoring

### 4. **Backend Infrastructure**
- RESTful API with 6 route modules
- MongoDB database with 8 collection schemas
- Secure authentication with password hashing
- Error handling and validation

### 5. **Documentation and Codebase**
- Clean, maintainable JavaScript codebase
- Structured project organization
- README documentation
- SDLC documentation

---

## Expected Benefits and Improvements

### Business Benefits:

1. **Revenue Growth**
   - Expanded market reach beyond Metro Manila
   - 24/7 online ordering capability
   - Increased average order value through product suggestions

2. **Operational Efficiency**
   - Reduced manual order processing time by ~70%
   - Automated inventory visibility updates
   - Centralized order and customer management

3. **Customer Satisfaction**
   - Convenient shopping experience
   - Transparent pricing and availability
   - Order tracking and history access

4. **Data-Driven Decisions**
   - Sales analytics and trends
   - Popular product identification
   - Customer behavior insights

### Technical Benefits:

1. **Scalability**
   - Cloud-based infrastructure (MongoDB Atlas, Railway)
   - Modular architecture for easy feature additions
   - API-first design for future mobile app development

2. **Maintainability**
   - Separated frontend and backend concerns
   - Reusable component structure
   - Consistent coding patterns

3. **Security**
   - Password hashing with bcrypt
   - Role-based access control
   - CORS-protected API endpoints

---

## Identified Business Operational Importance

### Critical Business Processes Supported:

| Process | Importance Level | Impact |
|---------|------------------|--------|
| Online Sales | **Critical** | Primary revenue channel |
| Inventory Display | **High** | Customer purchase decisions |
| Order Management | **Critical** | Fulfillment accuracy |
| Customer Accounts | **Medium** | Repeat customer retention |
| Analytics | **Medium** | Business intelligence |
| Device Control | **Low** | Value-added service |

### Key Performance Indicators (KPIs) Enabled:

1. **Sales Metrics**: Total orders, revenue, average order value
2. **Product Metrics**: Top-selling products, category performance
3. **Customer Metrics**: New registrations, repeat customers
4. **Operational Metrics**: Order processing time, fulfillment rate

---

# DESIGNING

## Development Concept

The Lumina Electronics website follows a **Modern Single-Page Application (SPA)** architecture with the following design principles:

### Architecture Pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (SPA)                           │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐ │
│  │ Components  │   Pages     │   State     │   Router    │ │
│  │ (Header,    │   (Home,    │ Management  │ (Navigate)  │ │
│  │  Footer,    │   Products, │ (Global)    │             │ │
│  │  Cards)     │   Cart...)  │             │             │ │
│  └─────────────┴─────────────┴─────────────┴─────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API Calls
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js/Express)                │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐ │
│  │   Routes    │ Controllers │   Models    │ Middleware  │ │
│  │ (/products  │ (Business   │ (MongoDB    │ (CORS,      │ │
│  │  /users     │  Logic)     │  Schemas)   │  Auth)      │ │
│  │  /orders)   │             │             │             │ │
│  └─────────────┴─────────────┴─────────────┴─────────────┘ │
└────────────────────────┬───────────────┬────────────────────┘
                         │               │
              ┌──────────▼───────┐   ┌───▼───────────┐
              │   MongoDB Atlas  │   │  WebSocket    │
              │    Database      │   │  (Real-Time)  │
              └──────────────────┘   └───────────────┘
```

### Design Principles:
1. **Component-Based Architecture**: Reusable UI components
2. **State-Driven Rendering**: Single source of truth for data
3. **RESTful API Design**: Standard HTTP methods for CRUD
4. **Separation of Concerns**: Frontend, backend, and database layers
5. **Mobile-First Responsive**: Prioritizing mobile user experience

---

## Back-End Development (Server-Side)

### Core Functional Modules:

#### 1. **User Management Module** (`/api/users`)
| Endpoint | Method | Function |
|----------|--------|----------|
| `/login` | POST | User authentication |
| `/register` | POST | New user registration |
| `/:id` | PUT | Update user profile |
| `/:id/address` | PUT | Update shipping address |
| `/:id/password` | PUT | Change password |
| `/:id/cart` | PUT | Sync shopping cart |
| `/` | GET | Get all users (admin) |
| `/:id` | DELETE | Soft-delete user |

#### 2. **Product Management Module** (`/api/products`)
| Endpoint | Method | Function |
|----------|--------|----------|
| `/` | GET | Get all products |
| `/:id` | GET | Get product by ID |
| `/` | POST | Create product (admin) |
| `/:id` | PUT | Update product (admin) |
| `/:id` | DELETE | Soft-delete product (admin) |

#### 3. **Order Management Module** (`/api/orders`)
| Endpoint | Method | Function |
|----------|--------|----------|
| `/` | GET | Get all orders (admin) |
| `/my-orders` | GET | Get user's orders |
| `/` | POST | Create new order |
| `/:id/status` | PATCH | Update order status |

#### 4. **Device Management Module** (`/api/devices`)
| Endpoint | Method | Function |
|----------|--------|----------|
| `/my-devices` | GET | Get user's paired devices |
| `/pair` | POST | Pair new device |
| `/:id` | DELETE | Unpair device |

#### 5. **Coupon Management Module** (`/api/coupons`)
| Endpoint | Method | Function |
|----------|--------|----------|
| `/claim` | POST | Claim a coupon |
| `/my-coupons` | GET | Get user's coupons |

#### 6. **Analytics Module** (`/api/analytics`)
| Endpoint | Method | Function |
|----------|--------|----------|
| `/sales` | GET | Get sales data |
| `/products` | GET | Get product analytics |

### Database Models:

| Model | Purpose | Key Fields |
|-------|---------|------------|
| **User** | User accounts | name, email, password, role, address, savedCart |
| **Product** | Product catalog | name, category, price, stock, description, image |
| **Order** | Purchase orders | orderId, userId, items, total, status, shippingAddress |
| **UserDevice** | Paired devices | userId, deviceId, deviceToken, nickname |
| **UserCoupon** | Claimed coupons | userId, couponCode, usedAt |
| **DeletedUser** | Soft-deleted users | Original user data + deletedAt |
| **DeletedProduct** | Soft-deleted products | Original product data + deletedAt |
| **SalesAnalytics** | Sales metrics | date, revenue, orderCount |

---

## Operational Concept

The operational flow of the website is designed for seamless user experience:

### Customer Journey:

```
┌─────────┐     ┌─────────────┐     ┌──────────┐     ┌──────────┐     ┌─────────────┐
│  Visit  │────▶│   Browse    │────▶│   Add    │────▶│ Checkout │────▶│   Order     │
│  Home   │     │  Products   │     │ to Cart  │     │          │     │ Confirmation│
└─────────┘     └─────────────┘     └──────────┘     └──────────┘     └─────────────┘
                      │                   │                │                  │
                      ▼                   ▼                ▼                  ▼
               ┌─────────────┐    ┌────────────┐  ┌─────────────┐    ┌──────────────┐
               │ View Detail │    │ View Cart  │  │  Payment    │    │ Print Receipt│
               │ Page        │    │ Manage Qty │  │  Processing │    │ Track Order  │
               └─────────────┘    └────────────┘  └─────────────┘    └──────────────┘
```

### Admin Workflow:

```
┌───────────────────────────────────────────────────────────────────┐
│                      ADMIN DASHBOARD                               │
├─────────────┬─────────────┬─────────────┬─────────────────────────┤
│  Dashboard  │  Products   │   Orders    │        Staff            │
│             │             │             │                         │
│ - Analytics │ - Add/Edit  │ - View All  │ - Add Staff             │
│ - Charts    │ - Delete    │ - Update    │ - Edit                  │
│ - Summary   │ - Stock Mgmt│   Status    │ - Remove                │
└─────────────┴─────────────┴─────────────┴─────────────────────────┘
```

---

## Integration Concept

The integration concept highlights how different components work together:

### System Integration Points:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND APPLICATION                         │
│                         (main.js, pages/*.js)                       │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │    API Configuration  │
                    │   (api-config.js)     │
                    └───────────┬───────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│  REST API     │      │  Socket.IO    │      │  WebSocket    │
│  (HTTP)       │      │  (Web Users)  │      │  (ESP32)      │
└───────┬───────┘      └───────┬───────┘      └───────┬───────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Express Server    │
                    │   (server.js)       │
                    └──────────┬──────────┘
                               │
            ┌──────────────────┼──────────────────────┐
            │                  │                      │
            ▼                  ▼                      ▼
     ┌────────────┐     ┌────────────┐        ┌────────────┐
     │   Routes   │     │   Models   │        │  Middleware│
     │(/products, │     │ (Mongoose) │        │ (CORS,     │
     │ /users...) │     │            │        │  Auth)     │
     └─────┬──────┘     └──────┬─────┘        └────────────┘
           │                   │
           └───────────────────┘
                    │
                    ▼
          ┌─────────────────┐
          │  MongoDB Atlas  │
          │   (Cloud)       │
          └─────────────────┘
```

### Data Flow Integration:

1. **User Authentication Flow**
   - Frontend → Login API → bcrypt comparison → Session storage
   
2. **Product Catalog Flow**
   - Database → Products API → Frontend State → UI Render
   
3. **Order Processing Flow**
   - Cart State → Checkout API → Order Creation → Database → Confirmation

4. **Device Control Flow**
   - Frontend Action → Socket.IO → Server → WebSocket → ESP32 Device

---

## Organizational Benefit Concept

The website delivers organizational benefits across multiple dimensions:

### Strategic Benefits:

| Area | Benefit | Measurement |
|------|---------|-------------|
| **Market Expansion** | Nationwide customer reach | Geographic distribution of orders |
| **Brand Building** | Professional online presence | Website traffic, engagement |
| **Competitive Edge** | Local expertise + online convenience | Customer retention rate |

### Operational Benefits:

| Area | Benefit | Measurement |
|------|---------|-------------|
| **Efficiency** | Reduced manual processing | Orders processed per hour |
| **Accuracy** | Automated calculations | Order error rate reduction |
| **Visibility** | Real-time inventory | Stock discrepancy reduction |

### Financial Benefits:

| Area | Benefit | Measurement |
|------|---------|-------------|
| **Revenue** | Additional sales channel | Online vs in-store revenue |
| **Cost Reduction** | Lower transaction costs | Cost per order processed |
| **Cash Flow** | Prepaid order options | Payment collection speed |

---

## Improvement Concept

The improvement concept emphasizes how the website enhances existing operations:

### Process Improvements:

| Current State | Improved State | Impact |
|---------------|----------------|--------|
| Phone/walk-in orders | Online self-service ordering | 24/7 availability |
| Manual stock checking | Real-time web display | Customer self-service |
| Paper receipts | Digital receipts with printing | Record keeping |
| Personal follow-ups | Automated order status | Reduced inquiries |
| Word-of-mouth marketing | Online product discovery | Broader reach |

### Customer Experience Improvements:

1. **Convenience**: Shop anytime, anywhere
2. **Information**: Detailed product specifications
3. **Transparency**: Clear pricing and availability
4. **Speed**: Quick checkout process
5. **Support**: Learning resources and tutorials

### Technical Improvements:

1. **IoT Integration**: Remote device control capability
2. **Data Analytics**: Business intelligence access
3. **Scalability**: Cloud infrastructure ready for growth
4. **Security**: Password hashing and access control

---

# BUILDING

## Available Technology to be Used

### Frontend Technologies:

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | - | Structure and semantics |
| **CSS3** | - | Styling, animations, responsiveness |
| **JavaScript (ES6+)** | ES2020+ | Application logic |
| **Vite** | 7.2.4 | Build tool and dev server |

### Backend Technologies:

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | v18+ | Runtime environment |
| **Express.js** | 5.1.0 | Web framework |
| **Mongoose** | 9.0.0 | MongoDB ODM |
| **bcryptjs** | 3.0.3 | Password hashing |
| **Socket.IO** | 4.8.1 | Real-time communication (web) |
| **ws** | 8.18.0 | WebSocket (ESP32 devices) |
| **Multer** | 2.0.2 | File upload handling |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **dotenv** | 17.2.3 | Environment configuration |

### Database & Hosting:

| Technology | Purpose |
|------------|---------|
| **MongoDB Atlas** | Cloud database |
| **GitHub Pages** | Static frontend hosting |
| **Railway** | Backend server hosting |
| **gh-pages** | Deployment automation |

### Development Tools:

| Tool | Purpose |
|------|---------|
| **npm** | Package management |
| **Git** | Version control |
| **VS Code** | Development IDE |
| **Concurrently** | Parallel command execution |

---

## Operational and Integration Plan

This plan outlines how technological components and functional modules work together:

### System Architecture:

```
                    ┌───────────────────────────────────────┐
                    │           INTERNET                    │
                    └───────────────┬───────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
         ▼                          ▼                          ▼
┌─────────────────┐      ┌─────────────────┐        ┌─────────────────┐
│   Web Browser   │      │   ESP32 Device  │        │    Mobile       │
│   (Customer)    │      │   (IoT)         │        │   (Responsive)  │
└────────┬────────┘      └────────┬────────┘        └────────┬────────┘
         │                        │                          │
         │ HTTPS                  │ WSS                      │ HTTPS
         │                        │                          │
         └────────────────────────┼──────────────────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │     Railway Backend       │
                    │     (Node.js Server)      │
                    │  ┌─────────────────────┐  │
                    │  │    Express App      │  │
                    │  ├─────────────────────┤  │
                    │  │  REST API Routes    │  │
                    │  │  - /api/products    │  │
                    │  │  - /api/users       │  │
                    │  │  - /api/orders      │  │
                    │  │  - /api/devices     │  │
                    │  │  - /api/coupons     │  │
                    │  │  - /api/analytics   │  │
                    │  ├─────────────────────┤  │
                    │  │  WebSocket Handlers │  │
                    │  │  - Socket.IO (Web)  │  │
                    │  │  - WS (ESP32)       │  │
                    │  └─────────────────────┘  │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │     MongoDB Atlas         │
                    │    (Cloud Database)       │
                    │  ┌─────────────────────┐  │
                    │  │    Collections      │  │
                    │  │  - users            │  │
                    │  │  - products         │  │
                    │  │  - orders           │  │
                    │  │  - userdevices      │  │
                    │  │  - usercoupons      │  │
                    │  │  - deletedusers     │  │
                    │  │  - deletedproducts  │  │
                    │  │  - salesanalytics   │  │
                    │  └─────────────────────┘  │
                    └───────────────────────────┘
```

### Integration Workflows:

#### 1. Customer Shopping Workflow
```
Browser → [Products API] → MongoDB → Response → UI Render
       → [Add to Cart] → State Update → [Cart Sync API] → MongoDB
       → [Checkout API] → Order Creation → [Order Confirmation]
```

#### 2. Admin Management Workflow
```
Admin Dashboard → [Auth Check] → [Products CRUD API] → MongoDB
               → [Orders API] → Status Update → MongoDB
               → [Users API] → Staff Management → MongoDB
```

#### 3. Device Control Workflow
```
Remote Control Page → Socket.IO → Server → WebSocket → ESP32
                   ← Status Update ← Server ← ESP32 Telemetry
```

---

## Cost Considerations

### Development Costs:

| Item | Estimated Cost | Notes |
|------|----------------|-------|
| **Development Labor** | In-house | Student/team project |
| **Design Assets** | Minimal | Custom CSS, free icons |
| **Third-party Libraries** | Free | Open-source packages |

### Hosting Costs:

| Service | Cost (Monthly) | Notes |
|---------|----------------|-------|
| **GitHub Pages** | Free | Static frontend hosting |
| **Railway** | Free tier / $5+ | Backend hosting |
| **MongoDB Atlas** | Free tier / $9+ | Cloud database (512MB free) |

### Potential Future Costs:

| Item | Estimated Cost | When Needed |
|------|----------------|-------------|
| **Custom Domain** | ₱500-2,000/year | Brand customization |
| **SSL Certificate** | Free (Let's Encrypt) | HTTPS security |
| **Payment Gateway** | 2-3% per transaction | GCash/Maya integration |
| **SMS Notifications** | ₱0.50-1/SMS | Order confirmations |
| **Cloud Scaling** | Variable | High traffic periods |

### Total Estimated Monthly Cost:

| Scenario | Monthly Cost |
|----------|--------------|
| **Minimal (Free Tiers)** | ₱0 |
| **Basic Production** | ~₱500-1,000 |
| **Scaled Production** | ~₱2,000-5,000 |

---

### Building Phase Conclusion:

The Lumina Electronics website is built using a modern, cost-effective technology stack that balances functionality with affordability. The choice of open-source technologies and cloud services with free tiers makes it accessible for a small business while providing room for growth. The modular architecture ensures that individual components can be upgraded or replaced as needs evolve.

---

# TESTING

## Test / Validation Procedure

### Testing Levels:

#### 1. **Unit Testing** (Component Level)
| Component | Test Focus |
|-----------|------------|
| User Authentication | Login/logout, password hashing |
| Cart Functions | Add, remove, update quantity |
| Order Processing | Create order, status updates |
| Product CRUD | Add, edit, delete operations |

#### 2. **Integration Testing** (API Level)
| Integration Point | Test Cases |
|-------------------|------------|
| Frontend ↔ Backend | API endpoint connectivity |
| Backend ↔ Database | Data persistence and retrieval |
| WebSocket ↔ Devices | Real-time communication |

#### 3. **Functional Testing** (User Workflows)
| Workflow | Test Scenario |
|----------|---------------|
| Guest Browsing | View products without login |
| Customer Purchase | Complete end-to-end purchase |
| Admin Product Management | Add and edit product |
| Staff Order Processing | Update order status |

#### 4. **User Interface Testing**
| Aspect | Test Focus |
|--------|------------|
| Responsiveness | Mobile, tablet, desktop views |
| Navigation | All links and buttons functional |
| Forms | Validation and error messages |
| Modals | Open, close, action execution |

#### 5. **Security Testing**
| Security Aspect | Test Focus |
|-----------------|------------|
| Authentication | Password hashing verification |
| Authorization | Role-based access enforcement |
| Input Validation | XSS and injection prevention |
| CORS | Cross-origin request handling |

### Testing Procedures:

#### Manual Testing Checklist:

**User Registration & Login:**
- [ ] Register new customer account
- [ ] Login with valid credentials
- [ ] Reject invalid credentials
- [ ] Logout functionality

**Product Browsing:**
- [ ] Load all products
- [ ] Filter by category
- [ ] Sort by price/name
- [ ] Search functionality
- [ ] View product details

**Shopping Cart:**
- [ ] Add product to cart
- [ ] Update quantity
- [ ] Remove item
- [ ] Select/deselect items
- [ ] Cart persistence after refresh

**Checkout:**
- [ ] Validate shipping address fields
- [ ] Select payment method
- [ ] Complete order
- [ ] Print receipt
- [ ] Order confirmation display

**Admin Functions:**
- [ ] Access admin dashboard
- [ ] Add new product
- [ ] Edit existing product
- [ ] Delete (soft-delete) product
- [ ] View all orders
- [ ] Update order status
- [ ] Add/remove staff

---

## Metrics to be Used to Validate

### Performance Metrics:

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Page Load Time** | < 3 seconds | Browser DevTools |
| **API Response Time** | < 500ms | Server logs |
| **Time to Interactive** | < 4 seconds | Lighthouse |

### Functional Metrics:

| Metric | Target | Validation |
|--------|--------|------------|
| **Cart Accuracy** | 100% | Manual testing |
| **Order Processing** | 100% success | Transaction logs |
| **Login Success Rate** | 100% for valid credentials | Testing |

### Usability Metrics:

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Mobile Responsiveness** | All breakpoints | Device testing |
| **Navigation Clarity** | Intuitive flow | User feedback |
| **Error Message Clarity** | Descriptive messages | Review |

### Reliability Metrics:

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Uptime** | 99%+ | Monitoring tools |
| **Error Rate** | < 1% | Server logs |
| **Data Integrity** | 100% | Database validation |

### Test Success Criteria:

| Category | Passing Threshold |
|----------|-------------------|
| **Core Functionality** | 100% test cases pass |
| **UI/UX** | No critical issues |
| **Performance** | Meets target metrics |
| **Security** | No vulnerabilities found |

---

# DEPLOYMENT

## Deployment Plan

### Deployment Architecture:

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRODUCTION DEPLOYMENT                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────┐      ┌─────────────────────┐          │
│   │   GitHub Repository │      │   MongoDB Atlas     │          │
│   │   (Source Code)     │      │   (Database)        │          │
│   └──────────┬──────────┘      └─────────────────────┘          │
│              │                           ▲                       │
│              ▼                           │                       │
│   ┌─────────────────────┐      ┌────────┴──────────┐            │
│   │   GitHub Actions    │      │   Railway         │            │
│   │   (CI/CD)           │      │   (Backend)       │◄──┐        │
│   └──────────┬──────────┘      └───────────────────┘   │        │
│              │                                          │        │
│              ▼                                          │        │
│   ┌─────────────────────┐                              │        │
│   │   GitHub Pages      │       ┌──────────────────┐   │        │
│   │   (Frontend)        │──────▶│   End Users      │───┘        │
│   └─────────────────────┘       └──────────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Deployment Steps:

#### Phase 1: Pre-Deployment Preparation
1. **Code Review**: Ensure all code is tested and reviewed
2. **Environment Variables**: Configure production `.env` settings
3. **Database Setup**: Ensure MongoDB Atlas cluster is ready
4. **Seed Data**: Run seed script for initial products

#### Phase 2: Backend Deployment (Railway)
1. Connect GitHub repository to Railway
2. Configure environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `PORT`
3. Deploy server
4. Verify health check endpoint (`/api/health`)

#### Phase 3: Frontend Deployment (GitHub Pages)
1. Build production bundle:
   ```bash
   npm run build:frontend
   ```
2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```
3. Update API base URL for production

#### Phase 4: Post-Deployment Verification
1. Test all critical user flows
2. Verify database connectivity
3. Check WebSocket connections
4. Monitor error logs

### Deployment Commands:

```bash
# Backend (Railway auto-deploys from main branch)
git push origin main

# Frontend
npm run build:frontend
npm run deploy

# Seed database
npm run seed
```

### Environment Configuration:

| Environment | Frontend URL | Backend URL |
|-------------|-------------|-------------|
| Development | `http://localhost:5173` | `http://localhost:3000` |
| Production | `https://jlfuertes14.github.io` | Railway URL |

---

## User Readiness Plan

### Training and Onboarding:

#### For Customers:
| Activity | Purpose |
|----------|---------|
| **Website Walkthrough** | Guided tour of features |
| **FAQ Section** | Common questions answered |
| **Contact Support** | Help channels available |
| **Tutorial Content** | Learning resources on site |

#### For Staff:
| Activity | Duration | Content |
|----------|----------|---------|
| **Admin Dashboard Training** | 1-2 hours | Product and order management |
| **Order Processing Guide** | 30 mins | Status updates and handling |
| **Customer Support Training** | 1 hour | Inquiry handling |

#### For Administrators:
| Activity | Duration | Content |
|----------|----------|---------|
| **Full System Overview** | 2-3 hours | All administrative functions |
| **Staff Management** | 30 mins | Adding and managing staff |
| **Analytics Interpretation** | 1 hour | Using dashboard metrics |
| **Technical Maintenance** | 1 hour | Basic troubleshooting |

### User Documentation:

| Document | Audience | Content |
|----------|----------|---------|
| **User Guide** | Customers | Shopping, account management |
| **Admin Manual** | Admin/Staff | Dashboard operations |
| **FAQ** | All Users | Common issues and solutions |
| **API Documentation** | Developers | Endpoint references |

### Support Channels:

| Channel | Purpose | Response Time |
|---------|---------|---------------|
| **Contact Form** | General inquiries | 24-48 hours |
| **Email Support** | Technical issues | 24 hours |
| **Phone** | Urgent matters | Business hours |

### Go-Live Checklist:

- [ ] All staff trained on new system
- [ ] Customer communication sent (email/social media)
- [ ] Help documentation published
- [ ] Support channels active
- [ ] Fallback procedures documented
- [ ] Monitoring tools configured

---

# CONCLUSION

The **Lumina Electronics Website** represents a comprehensive digital transformation initiative that aligns with the company's mission of making electronics accessible to Filipino innovators. Through the systematic application of the Software Development Life Cycle (SDLC), this project has been carefully planned, designed, built, tested, and prepared for deployment.

### Key Achievements:

1. **Full E-Commerce Functionality**: Complete online shopping experience from browsing to checkout
2. **Role-Based Administration**: Secure admin and staff management capabilities
3. **IoT Integration**: Innovative ESP32 device control feature
4. **Scalable Architecture**: Cloud-based infrastructure ready for growth
5. **Modern Technology Stack**: Using current, well-supported technologies

### Business Impact:

- Expanded market reach from Metro Manila to nationwide
- 24/7 online ordering capability
- Reduced manual order processing
- Improved customer experience and convenience
- Data-driven business insights through analytics

### Future Enhancement Opportunities:

1. Payment gateway integration (PayMongo, Xendit)
2. Shipping carrier API integration
3. Mobile application development
4. AI-powered product recommendations
5. Multi-language support
6. Progressive Web App (PWA) capabilities

### Final Notes:

The Lumina Electronics website embodies the company's core values of quality, service, and community focus. By providing a reliable platform for Filipino engineers, students, and hobbyists, Lumina Electronics continues its mission of bridging the gap between innovators and the components they need.

---

**Document Version**: 1.0  
**Date**: December 11, 2025  
**Prepared For**: Lumina Electronics SDLC Documentation  
**Status**: Complete

---

*"Bridge the gap between Filipino innovators and the components they need."*
— Lumina Electronics Mission Statement
