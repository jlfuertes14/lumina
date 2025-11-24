# 🚀 Quick Start: Deploy Backend for GitHub Pages

## Current Situation
- ✅ Your frontend is live: `https://jlfuertes14.github.io/lumina/`
- ❌ Your backend is on `localhost:3000` (only works on your computer)
- ❌ Orders from GitHub Pages **cannot** reach localhost

## What You Need to Do

You need to deploy your backend to a cloud service so GitHub Pages can access it.

---

## 🎯 Fastest Solution: Deploy to Railway (5 Minutes)

### **1. Install Railway CLI**
```bash
npm install -g @railway/cli
```

### **2. Login to Railway**
```bash
railway login
```
> This opens your browser - create a free account with GitHub

### **3. Deploy Your Backend**
```bash
cd C:\Users\Lenovo\Desktop\companyweb
railway init
```

Choose:
- ✅ Create new project
- ✅ Name it: `lumina-backend`

Then deploy:
```bash
railway up
```

### **4. Set Environment Variables**
```bash
railway variables set MONGODB_URI="mongodb+srv://lumina:admin1234@mydeployment.3hpj9sl.mongodb.net/lumina-electronics?retryWrites=true&w=majority"
railway variables set NODE_ENV=production
```

### **5. Get Your Backend URL**
```bash
railway domain
```

Copy the URL you get (e.g., `https://lumina-backend-production.railway.app`)

### **6. Update Frontend Configuration**

Edit `src/api-config.js` and replace:
```javascript
const PRODUCTION_API_URL = 'YOUR-BACKEND-URL-HERE';
```

With your Railway URL:
```javascript
const PRODUCTION_API_URL = 'https://lumina-backend-production.railway.app';
```

### **7. Rebuild and Deploy Frontend**
```bash
npm run build
git add .
git commit -m "Connect to deployed backend"
git push
```

### **8. Test!**
Visit `https://jlfuertes14.github.io/lumina/`
- Make a purchase
- Check MongoDB Atlas - the order should be there!

---

## 🌐 Alternative: Deploy to Render (Web Interface)

If you prefer a visual interface:

### **1. Go to Render**
Visit [render.com](https://render.com) and sign in with GitHub

### **2. Create Web Service**
- Click "New +" → "Web Service"
- Connect: `jlfuertes14/lumina` repository
- **Build Command**: `npm install`
- **Start Command**: `node server/server.js`

### **3. Add Environment Variables**
In Render dashboard, add:
- Key: `MONGODB_URI`
  Value: `mongodb+srv://lumina:admin1234@mydeployment.3hpj9sl.mongodb.net/lumina-electronics`
- Key: `NODE_ENV`
  Value: `production`

### **4. Deploy**
Click "Create Web Service" - Render will give you a URL

### **5. Update `src/api-config.js`**
Use the Render URL (e.g., `https://lumina-backend.onrender.com`)

---

## 📊 How It Works

### **Before (Not Working)**
```
GitHub Pages (Static Files)
    ↓ tries to call
localhost:3000 ❌ (doesn't exist on internet)
```

### **After (Working!)**
```
GitHub Pages
    ↓ API calls
Railway/Render (Your Backend)
    ↓ connects to
MongoDB Atlas (Database)
```

---

## ✅ Verification Checklist

After deployment:

1. ✅ **Backend is Live**
   ```bash
   curl https://your-backend-url.railway.app/api/health
   ```
   Should return: `{"status":"ok","database":"connected"}`

2. ✅ **CORS is Working**
   Open browser console on `https://jlfuertes14.github.io/lumina/` and run:
   ```javascript
   fetch('https://your-backend-url.railway.app/api/products')
       .then(r => r.json())
       .then(console.log);
   ```
   Should return your products

3. ✅ **Orders Save to Database**
   - Make a purchase on your live site
   - Check MongoDB Atlas → Collections → Orders
   - Should see the new order!

---

## 🎓 Understanding the Setup

### **Two Separate Deployments**

1. **Frontend (GitHub Pages)**
   - URL: `https://jlfuertes14.github.io/lumina/`
   - Contains: HTML, CSS, JavaScript
   - Purpose: User interface
   - Cost: **FREE**

2. **Backend (Railway/Render)**
   - URL: `https://your-backend.railway.app`
   - Contains: Express server, MongoDB connection
   - Purpose: API and database operations
   - Cost: **FREE** (with limits)

### **They Talk to Each Other**
```
User visits → GitHub Pages (Frontend)
    ↓
Frontend makes API calls → Railway/Render (Backend)
    ↓
Backend queries → MongoDB Atlas (Database)
    ↓
Data flows back to user
```

---

## 💰 Cost Breakdown

### **Railway Free Tier**
- ✅ 500 hours/month (~20 days of 24/7 runtime)
- ✅ $5 in free credits
- ✅ Sleeps after 15min of inactivity (saves hours)
- **Cost**: $0/month

### **Render Free Tier**
- ✅ 750 hours/month (enough for one app 24/7)
- ✅ Sleeps after 15min of inactivity
- **Cost**: $0/month

### **MongoDB Atlas**
- ✅ 512MB storage
- **Cost**: $0/month

### **GitHub Pages**
- ✅ Unlimited bandwidth
- **Cost**: $0/month

**Total**: **$0/month** 🎉

---

## 🔧 Troubleshooting

### **"CORS Error" in Browser Console**
- ✅ CORS is already configured in `server/server.js`
- ✅ Your GitHub Pages domain is whitelisted
- ⚠️ Make sure you deployed the latest code

### **"Failed to Fetch" Error**
- Check if backend is running: Visit `https://your-backend-url/api/health`
- If it says "Service unavailable", the backend might be sleeping
- First request will wake it up (takes ~30 seconds)

### **Orders Not Saving**
- Open browser console and check for errors
- Verify `src/api-config.js` has correct backend URL
- Test backend directly: `curl https://your-backend-url/api/health`

---

## 🎯 Next Steps

1. **Deploy Backend** (Railway or Render)
2. **Update API Config** (`src/api-config.js`)
3. **Rebuild & Push Frontend**
4. **Test on Live Site**
5. **Start Getting Real Orders!** 🎊

---

## 📞 Need Help?

If you get stuck:
1. Check Railway/Render deployment logs
2. Check browser console for errors
3. Test backend health endpoint
4. Verify MongoDB Atlas connection

The backend is already configured and ready to deploy - just run the commands above!

---

**Your backend is ready to deploy right now!** 🚀  
Pick Railway or Render and follow the steps above.
