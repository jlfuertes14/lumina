# Railway Deployment Configuration

## 🚂 Your Setup

You already have Railway connected! Here's what you need to configure:

---

## Step 1: Get Your Railway URL

1. Go to your Railway dashboard: https://railway.app/dashboard
2. Click on your project
3. Find your backend service
4. Copy the public URL (looks like `https://xxxxx.up.railway.app`)

---

## Step 2: Update Frontend API Configuration

Your GitHub Pages frontend needs to know where your Railway backend is.

### Option A: Create a config file (Recommended)

Create `config.js` in your project root:

```javascript
// config.js
const CONFIG = {
    // Replace with your actual Railway URL
    API_URL: 'https://your-backend.up.railway.app',
    WEBSOCKET_URL: 'https://your-backend.up.railway.app'
};
```

Then include it in your `index.html`:
```html
<script src="config.js"></script>
<script src="socket-client.js"></script>
<script src="main.js"></script>
```

And use it in your code:
```javascript
// In main.js when making API calls
fetch(`${CONFIG.API_URL}/api/products`)

// For WebSocket client
const esp32Client = new ESP32SocketClient(CONFIG.WEBSOCKET_URL);
```

### Option B: Direct update in socket-client.js

Change line 7 in `socket-client.js`:

**FROM:**
```javascript
constructor(serverUrl = 'http://localhost:3000') {
```

**TO:**
```javascript
constructor(serverUrl = 'https://your-backend.up.railway.app') {
```

---

## Step 3: Update ESP32 Code

In `ESP32_SmartCar_WebSocket.ino`, line 28:

**Change from:**
```cpp
const char* websocket_server = "your-website-domain.com";
```

**To:**
```cpp
const char* websocket_server = "your-backend.up.railway.app";
const int websocket_port = 443;  // HTTPS (Railway uses SSL)
```

⚠️ **Important:** Remove `https://` - only use the domain name!

---

## Step 4: Railway Environment Variables

Make sure you have these environment variables set in Railway:

1. Go to Railway → Your Project → Variables
2. Add these:

```
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
PORT=3000
```

Railway will automatically assign a public URL and handle SSL.

---

## Step 5: Deploy Changes

### Push server code to Railway:

```bash
git add .
git commit -m "Add WebSocket server for ESP32 control"
git push
```

Railway will automatically deploy! Watch the logs in Railway dashboard.

---

## Step 6: Test Everything

### Test Backend is Running:

Open in browser:
```
https://your-backend.up.railway.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-11-30T10:00:00.000Z"
}
```

### Test WebSocket:

Open browser console on your GitHub Pages site:
```javascript
const client = new ESP32SocketClient('https://your-backend.up.railway.app');
await client.connect(YOUR_USER_ID);
// Should see: "✅ Connected to ESP32 WebSocket server"
```

### Test ESP32:

1. Upload code to ESP32
2. Configure via WiFi portal (http://192.168.4.1)
3. Check Serial Monitor for:
```
✅ Connected to WebSocket server!
🔐 Authenticating with server...
```

---

## 🔒 Important CORS Configuration

Your Railway backend already has CORS enabled:

```javascript
app.use(cors({
    origin: '*', // Allows GitHub Pages
}));
```

This allows your GitHub Pages frontend to connect to Railway backend.

---

## 📋 Complete Architecture

```
┌────────────────────────────────────────┐
│  GitHub Pages (Frontend)               │
│  https://jlfuertes14.github.io/lumina/ │
│  - Product catalog                     │
│  - Remote control UI                   │
└────────────┬───────────────────────────┘
             │
             │ HTTPS API + WebSocket
             │
             ▼
┌────────────────────────────────────────┐
│  Railway (Backend)                     │
│  https://xxxxx.up.railway.app          │
│  - Node.js + Express                   │
│  - WebSocket server                    │
│  - MongoDB connection                  │
└────────────┬───────────────────────────┘
             │
             │ WebSocket /device
             │
             ▼
┌────────────────────────────────────────┐
│  ESP32 Smart Cars                      │
│  - Connect via home WiFi               │
│  - Authenticate with token             │
│  - Receive real-time commands          │
└────────────────────────────────────────┘
```

---

## 🎯 Quick Checklist

- [ ] Get Railway URL from dashboard
- [ ] Update `socket-client.js` with Railway URL
- [ ] Update all `fetch()` calls in `main.js` to use Railway URL
- [ ] Update ESP32 code with Railway domain
- [ ] Set `websocket_port = 443` in ESP32
- [ ] Verify MongoDB Atlas connection string in Railway
- [ ] Push code to GitHub (triggers Railway deploy)
- [ ] Test `/api/health` endpoint
- [ ] Upload ESP32 code
- [ ] Configure ESP32 via WiFi portal
- [ ] Test remote control from website

---

## 💡 Pro Tips

1. **Railway Free Tier:** Keep your server active with uptime monitoring (e.g., UptimeRobot pings `/api/health` every 5 minutes)

2. **Debugging:** Watch Railway logs in dashboard for WebSocket connections

3. **SSL Certificate:** Railway handles this automatically - just use `https://` and port `443`

4. **MongoDB Atlas:** Make sure IP whitelist includes `0.0.0.0/0` (allow from anywhere) for Railway

---

Ready to configure! Just replace `your-backend.up.railway.app` with your actual Railway URL! 🚂
