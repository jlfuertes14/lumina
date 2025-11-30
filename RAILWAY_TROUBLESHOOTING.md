# Railway Deployment Not Working - Troubleshooting Guide

## Problem
CORS errors persist despite pushing fixes to GitHub. Railway backend is still blocking GitHub Pages.

## Root Cause
Railway may not have deployed the latest code changes yet.

## Check Railway Deployment Status

### Step 1: Visit Railway Dashboard
1. Go to https://railway.app/
2. Login to your account
3. Click on your project "lumina"
4. Click on "Deployments" tab

### Step 2: Check Latest Deployment
Look for the most recent deployment:
- **Status:** Should show "Success" (green checkmark)
- **Time:** Should be within last 5-10 minutes
- **Commit:** Should match your latest commit message: "Fix: Server listen on 0.0.0.0 for Railway deployment"

### Step 3: Check Build Logs
Click on the latest deployment and check logs for:
```
✅ Connected to MongoDB Atlas
🚀 Server running on port 3000
📊 Database: MongoDB Atlas
```

## If Deployment Failed or Didn't Trigger

### Option A: Manual Trigger (Recommended)
1. In Railway dashboard, go to your service
2. Click "Settings" tab
3. Scroll to "Deploy Trigger"
4. Click "Deploy" button manually

### Option B: Force Push
```bash
git commit --allow-empty -m "Trigger Railway deployment"
git push
```

### Option C: Check Auto-Deploy Settings
1. In Railway settings
2. Go to "Source" section
3. Verify "Auto-Deploy" is enabled
4. Check that it's watching the `main` branch

## Verify Server Code on Railway

### Test if server is running:
Visit this URL in browser:
```
https://lumina-production-a4bb.up.railway.app/api/products
```

**Expected Response:**
- ✅ JSON data with products list
- ✅ Should NOT show 502 error

**If you see 502 error:**
- Railway server crashed
- Check deployment logs for errors

**If you see CORS error in browser console:**
- Server is running but CORS not configured properly
- Railway is running old code

## Current Server Code Should Have:

```javascript
// In server/server.js
app.use(cors({
    origin: ['https://jlfuertes14.github.io', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// And:
httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
```

## Quick Test

Try accessing Railway API directly by visiting:
```
https://lumina-production-a4bb.up.railway.app/api/products
```

in your browser (NOT from GitHub Pages).

- If it loads → Server is running, CORS issue
- If 502 error → Server crashed
- If timeout → Server not listening on 0.0.0.0

## Emergency Fix

If Railway still won't deploy, try this:

### 1. Check Environment Variables in Railway
- Go to Railway → Your Service → Variables
- Ensure `MONGODB_URI` is set
- `PORT` should NOT be set (Railway sets it automatically)

### 2. Restart Service
- Railway Dashboard → Your Service
- Click "⋮" menu → "Restart"

### 3. Check Logs in Real-Time
- Railway Dashboard → Deployments
- Click latest deployment
- Watch logs for any errors

## Once Railway Shows "Success"

1. Wait 10-30 seconds for DNS/routing to update
2. Refresh https://jlfuertes14.github.io/lumina/
3. Check browser console - CORS errors should be gone
4. Products should load automatically

## Still Not Working?

Share the following info:
1. Railway deployment status (Success/Failed/Building)
2. Latest deployment logs (last 20 lines)
3. Error message when visiting Railway API directly

---

**TL;DR: Check Railway dashboard and manually trigger deployment if needed!**
