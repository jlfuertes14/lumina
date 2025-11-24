# 🚀 Backend Deployment Guide for GitHub Pages Integration

## The Problem
- **GitHub Pages** only hosts static files (HTML, CSS, JS)
- **Cannot run Node.js/Express backend** on GitHub Pages
- Your backend must be deployed **separately**

## The Solution
Deploy your backend to a **free cloud service**, then connect your GitHub Pages site to it.

---

## 🌟 Recommended: Deploy to Railway (Free Tier)

Railway offers a generous free tier perfect for your backend.

### **Step 1: Install Railway CLI**

```bash
# Install Railway CLI globally
npm install -g @railway/cli

# Or use without installing
npx @railway/cli
```

### **Step 2: Login to Railway**

```bash
railway login
```

This will open your browser for authentication.

### **Step 3: Initialize Railway in Your Project**

```bash
cd C:\Users\Lenovo\Desktop\companyweb
railway init
```

Select:
- Create a new project
- Name it: `lumina-backend` (or your choice)

### **Step 4: Add Start Script**

Your `package.json` already has the server script, but let's add a start command:

```json
{
  "scripts": {
    "start": "node server/server.js",
    "server": "node server/server.js",
    "dev": "vite",
    "build": "vite build"
  }
}
```

### **Step 5: Create Railway Configuration**

Railway will automatically detect your Node.js app, but you can create `railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **Step 6: Add Environment Variables**

```bash
# Add your MongoDB connection string
railway variables set MONGODB_URI="mongodb+srv://lumina:admin1234@mydeployment.3hpj9sl.mongodb.net/lumina-electronics?retryWrites=true&w=majority"

# Set port
railway variables set PORT=3000

# Set environment
railway variables set NODE_ENV=production
```

### **Step 7: Deploy!**

```bash
railway up
```

Railway will:
1. Upload your code
2. Install dependencies
3. Start your server
4. Give you a public URL like: `https://lumina-backend-production.up.railway.app`

### **Step 8: Get Your Backend URL**

```bash
railway domain
```

Copy the URL (e.g., `https://lumina-backend-production.up.railway.app`)

---

## 🔧 Alternative: Deploy to Render (Also Free)

### **Step 1: Create Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### **Step 2: Create New Web Service**
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `lumina-backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/server.js`
   - **Environment**: `Node`

### **Step 3: Add Environment Variables**
In Render dashboard:
- `MONGODB_URI`: Your connection string
- `PORT`: `3000`
- `NODE_ENV`: `production`

### **Step 4: Deploy**
Click "Create Web Service" - Render will automatically deploy!

---

## 🌍 Update CORS for GitHub Pages

Once your backend is deployed, update `server/server.js`:

```javascript
// Current (only works locally)
app.use(cors());

// Update to allow GitHub Pages
app.use(cors({
    origin: [
        'http://localhost:5173',  // Local dev
        'https://jlfuertes14.github.io'  // GitHub Pages
    ],
    credentials: true
}));
```

---

## 🔄 Update Frontend to Use Deployed Backend

### **Option 1: Environment-Based API URL**

Create a config file `src/config.js`:

```javascript
// src/config.js
export const API_BASE_URL = 
    window.location.hostname === 'jlfuertes14.github.io'
        ? 'https://your-backend.railway.app/api'  // Production
        : 'http://localhost:3000/api';  // Local development
```

Then in your `main.js`:

```javascript
import { API_BASE_URL } from './src/config.js';

// Use it in API calls
async function loadProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    const { data } = await response.json();
    return data;
}
```

### **Option 2: Direct Replacement**

Update all API calls in `main.js`:

```javascript
// Before
const response = await fetch('http://localhost:3000/api/products');

// After
const response = await fetch('https://your-backend.railway.app/api/products');
```

---

## 📦 What Gets Deployed Where

### **GitHub Pages** (Static Frontend)
- ✅ `index.html`
- ✅ `main.js`
- ✅ `style.css`
- ✅ All CSS files
- ✅ Image assets
- ✅ Built dist folder

### **Railway/Render** (Backend API)
- ✅ `server/` directory
- ✅ `node_modules` (auto-installed)
- ✅ MongoDB connection
- ✅ API endpoints

---

## 🔐 Security Checklist

Before deploying:

1. ✅ **Environment Variables**: MongoDB URI in `.env`
2. ✅ **CORS Configuration**: Allow GitHub Pages domain
3. ✅ **Port Configuration**: Use `process.env.PORT`
4. ✅ **Git Ignore**: `.env` is gitignored
5. ⏭️ **Rate Limiting**: Add in production
6. ⏭️ **JWT Auth**: Implement for protected routes

---

## 🧪 Testing After Deployment

1. **Test Backend Directly**:
   ```bash
   curl https://your-backend.railway.app/api/health
   ```

2. **Test from GitHub Pages**:
   Open browser console on `https://jlfuertes14.github.io/lumina/` and run:
   ```javascript
   fetch('https://your-backend.railway.app/api/products')
       .then(r => r.json())
       .then(console.log);
   ```

3. **Test Orders**:
   Make a purchase on your live site and verify it saves to MongoDB

---

## ⚡ Quick Railway Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash
echo "🚀 Deploying backend to Railway..."

# Login (if not already)
railway login

# Link to project (if first time)
railway link

# Set environment variables
railway variables set MONGODB_URI="mongodb+srv://lumina:admin1234@mydeployment.3hpj9sl.mongodb.net/lumina-electronics"
railway variables set PORT=3000
railway variables set NODE_ENV=production

# Deploy
railway up

# Get the URL
echo "✅ Deployment complete!"
echo "Your backend URL:"
railway domain

echo ""
echo "🔗 Next steps:"
echo "1. Copy the URL above"
echo "2. Update src/config.js with this URL"
echo "3. Push to GitHub to update your site"
```

---

## 📊 Cost Breakdown

### **Railway Free Tier**
- ✅ 500 hours/month (enough for 24/7)
- ✅ $5 free credits
- ✅ Auto-sleep after 15min idle
- ✅ Custom domains
- **Cost**: FREE

### **Render Free Tier**
- ✅ 750 hours/month
- ✅ Auto-sleep after 15min idle
- ✅ Custom domains
- **Cost**: FREE

### **MongoDB Atlas**
- ✅ 512MB storage
- ✅ Shared cluster
- **Cost**: FREE

**Total Monthly Cost**: $0 🎉

---

## 🎯 Summary

1. **Deploy backend** to Railway/Render
2. **Get the deployment URL** (e.g., `https://lumina-backend.railway.app`)
3. **Update CORS** to allow GitHub Pages domain
4. **Update frontend** API calls to use deployed URL
5. **Push to GitHub** to update your site
6. **Test orders** - they will now save to MongoDB!

---

## 🆘 Troubleshooting

### **CORS Errors**
Add your GitHub Pages domain to CORS whitelist in `server.js`

### **Connection Timeout**
Check MongoDB Atlas IP whitelist (should allow `0.0.0.0/0`)

### **Build Failures**
- Ensure `package.json` has `start` script
- Check Railway/Render logs

### **Environment Variables Missing**
Double-check you've set all required variables in deployment dashboard

---

**Next**: Run the deployment and I'll help you update your frontend!
