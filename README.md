# ⚡ Lumina Electronics

> A modern, responsive e-commerce platform for electronics components, development boards, sensors, and maker supplies.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://jlfuertes14.github.io/lumina/)
[![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-blue)](https://jlfuertes14.github.io/lumina/)
[![Vite](https://img.shields.io/badge/built%20with-Vite-646CFF?logo=vite)](https://vitejs.dev/)

## 🌐 Live Demo

**Visit the live site:** [https://jlfuertes14.github.io/lumina/](https://jlfuertes14.github.io/lumina/)

## ✨ Features

### 🛒 **E-Commerce Functionality**
- Browse 20+ electronics products across multiple categories
- Advanced product search with live suggestions
- Shopping cart with quantity management
- Complete checkout process
- Order history tracking

### 👤 **User Management**
- User registration and authentication
- Customer and Admin role support
- Persistent login state (localStorage)
- Secure password handling

### 🔧 **Admin Dashboard**
- Sales analytics and statistics
- Inventory management
- Order tracking and monitoring
- Product management (CRUD operations)

### 🎨 **Modern UI/UX**
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Clean, professional interface
- Real-time search with autocomplete
- Toast notifications for user feedback

### 💾 **Data Persistence**
- Client-side storage using localStorage
- Persistent cart and user sessions
- Product inventory tracking

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Vanilla JavaScript** | Core application logic |
| **Vite** | Build tool and dev server |
| **CSS3** | Styling and animations |
| **HTML5** | Semantic markup |
| **LocalStorage API** | Data persistence |
| **Google Fonts** | Typography (Inter, Outfit) |

## 📦 Project Structure

```
lumina/
├── src/
│   └── data.js              # Product catalog, users, orders
├── assets/                  # Built assets (generated)
├── images/
│   └── products/            # Product images
├── public/                  # Static assets
├── main.js                  # Main application logic
├── style.css                # Global styles
├── index.html               # Entry point
├── vite.config.js           # Vite configuration
└── build-and-deploy.bat     # Build script for deployment
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jlfuertes14/lumina.git
   cd lumina
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173/lumina/`

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔑 Demo Accounts

### Admin Account
- **Username:** `adminlumina`
- **Password:** `lumina12`
- **Access:** Admin Dashboard, Inventory Management

### Customer Account
- **Username:** `userlumina`
- **Password:** `lumina123`
- **Access:** Shopping, Cart, Checkout

## 📂 Product Categories

- **Microcontrollers** (ESP32, Arduino)
- **Sensors** (Ultrasonic, IR, Temperature)
- **Motor Drivers** (L298N, Motor Controllers)
- **Motors & Actuators** (Servo Motors)
- **Power Supply** (Buck Converters, Regulators)
- **Cables & Wires** (Jumper Wires, USB Cables)
- **Prototyping** (Breadboards, PCB Boards)
- **3D Printing Filaments** (PLA, PETG, Premium Brands)
- **Storage** (MicroSD Cards)
- **Batteries & Holders** (18650 Batteries)
- **Relays & Switches**

## 🎯 Key Features Breakdown

### Search Functionality
- Real-time product search
- Search suggestions based on product names, categories, and descriptions
- Visual feedback with highlighted results

### Shopping Cart
- Add/remove products
- Quantity adjustment
- Real-time total calculation
- Persistent cart (survives page refresh)
- Philippine Peso (PHP) currency formatting

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized layouts
- Touch-friendly interface

## 🚢 Deployment

The project uses a split deployment model:

- Frontend: GitHub Pages (free)
- Backend API + WebSocket: Render Web Service (free tier)
- Database: MongoDB Atlas (free tier)

### 1) Deploy backend to Render (free)

This repository includes [render.yaml](render.yaml) for one-click Blueprint setup.

Required Render environment variables:

- `MONGODB_URI` (required)
- `NODE_ENV=production`
- `FRONTEND_URL=https://jlfuertes14.github.io`

After deploy, note your Render URL:

`https://your-service-name.onrender.com`

### 2) Build frontend with backend origin

Set your backend origin before build so GitHub Pages calls the Render API:

```powershell
$env:VITE_BACKEND_ORIGIN="https://your-service-name.onrender.com"
npm run build
```

### 3) Publish frontend to GitHub Pages

Deploy steps:

1. **Copy dist files to root** (automated in build-and-deploy.bat)
   ```bash
   xcopy /E /Y /I dist\* .
   ```

2. **Commit and push**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push
   ```

Or simply run the automated script:
```bash
./build-and-deploy.bat
```

## 🐛 Troubleshooting

### Images not loading after deployment?
Visit the cache clearing page: [https://jlfuertes14.github.io/lumina/clear-cache.html](https://jlfuertes14.github.io/lumina/clear-cache.html)

Or perform a hard refresh:
- **Windows/Linux:** `Ctrl + Shift + R`
- **Mac:** `Cmd + Shift + R`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**jlfuertes14**
- GitHub: [@jlfuertes14](https://github.com/jlfuertes14)

## 🌟 Acknowledgments

- Product images sourced from electronics component manufacturers
- Inspired by modern e-commerce platforms
- Built with ❤️ for the maker community

---

**⭐ If you found this project helpful, please consider giving it a star!**
