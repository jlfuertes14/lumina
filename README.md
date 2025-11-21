# Lumina Electronics E-commerce Website

A modern, responsive e-commerce platform for electronics components and maker supplies. Built with Vanilla JavaScript, CSS, and Vite.

## 🚀 Features

### 🛒 Shopping Experience
- **Product Catalog**: Browse a wide range of electronics components (ESP32, Sensors, Motors, Filaments).
- **Advanced Search**: Real-time search with auto-suggestions, category matching, and keyword highlighting.
- **Shopping Cart**: Add items, adjust quantities, and checkout.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Local Currency**: All prices displayed in Philippine Peso (₱).

### 👤 User Accounts
- **User Authentication**: Login and Sign-up functionality.
- **Role-Based Access**: Separate interfaces for Customers and Admins.
- **Order History**: Users can view their past orders.

### 🛠️ Admin Dashboard
- **Sales Overview**: View total sales, total orders, and products in stock.
- **Inventory Management**: View and delete products.
- **Transaction Log**: Monitor recent orders and their status.

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3 (Custom Properties, Flexbox/Grid), JavaScript (ES6+)
- **Build Tool**: Vite
- **State Management**: LocalStorage-based persistence
- **Icons**: Lucide Icons (SVG)
- **Fonts**: Inter & Outfit (Google Fonts)

## 📦 Installation & Setup

1. **Clone the repository** (or download the files):
   ```bash
   git clone <repository-url>
   cd companyweb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Visit `http://localhost:5173/` (or the URL shown in your terminal).

## 🔑 Login Credentials

### Admin Account
- **Username**: `adminlumina`
- **Password**: `lumina12`
- **Access**: Full dashboard, inventory management, sales tracking.

### Customer Account
- **Username**: `userlumina`
- **Password**: `lumina123`
- **Access**: Shopping, cart, checkout, order history.

## 📂 Project Structure

```
companyweb/
├── public/
│   ├── images/          # Product images
│   └── clear-cache.html # Utility to reset app state
├── src/
│   └── data.js          # Initial product and user data
├── index.html           # Main entry point
├── main.js              # Core application logic (Router, State, Components)
├── style.css            # Global styles and variables
├── search-fix.css       # Specific styles for the search component
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## 🎨 Design System

- **Primary Color**: Deep Navy (`#002B5B`)
- **Accent Color**: Vibrant Orange (`#FF6B35`)
- **Secondary Color**: Bright Blue (`#2563EB`)
- **Typography**: 'Outfit' for headings, 'Inter' for body text.

## 🧹 Troubleshooting

If you encounter issues with old data or images not loading:
1. Visit `http://localhost:5173/clear-cache.html`
2. Click the **"Clear Cache & Reload"** button.
3. This will reset the application to the latest state.

---
© 2024 Lumina Electronics. All rights reserved.
