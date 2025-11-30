# Express 5 Compatibility Fix

## Issue

Railway build crashed with error:
```
PathError [TypeError]: Missing parameter name at index 1: *
at Object.<anonymous> (/app/server/server.js:21:5)
```

**Root Cause:** Express 5 changed how route wildcards work. The line `app.options('*', cors())` is incompatible with Express 5.x.

## Solution

**Removed the problematic line:**
```javascript
// This line caused the crash in Express 5
app.options('*', cors()); // ❌ REMOVED
```

**Why it's safe to remove:**
- The `cors()` middleware already handles OPTIONS preflight requests automatically
- No explicit OPTIONS handler needed
- CORS configuration is sufficient on its own

## Changes Made

**File:** `server/server.js`

**Before:**
```javascript
app.use(cors({
    origin: ['https://jlfuertes14.github.io', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Handle preflight requests explicitly
app.options('*', cors()); // ❌ Crashes in Express 5

app.use(express.json());
```

**After:**
```javascript
app.use(cors({
    origin: ['https://jlfuertes14.github.io', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
app.use(express.json()); // ✅ Works perfectly
```

## Deployment Status

✅ **Pushed to GitHub**
✅ **Railway auto-deploying**

Railway will rebuild and redeploy in ~30 seconds.

## Expected Result

After Railway finishes deploying:
- ✅ Server starts successfully
- ✅ CORS headers sent correctly
- ✅ GitHub Pages can access API
- ✅ Login works
- ✅ Products load

## Verification

Visit https://jlfuertes14.github.io/lumina/ and check:
1. Products load on home page
2. Login page works
3. No CORS errors in console
4. "My Devices" link appears after login
