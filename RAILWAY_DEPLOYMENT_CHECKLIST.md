# 🔄 UPDATED Railway Commands (Current CLI Version)

## ✅ Corrected Steps

### **Step 1: Login** ✓
```bash
railway login
```

### **Step 2: Initialize Project** ✓
```bash
railway init
```
- Choose: "Create a new project"
- Name: `lumina-backend`

### **Step 3: Link to Your Project** ✓
```bash
railway link
```

### **Step 4: Add Variables (NEW SYNTAX)** ✓

The new Railway CLI uses a different approach. You have TWO options:

#### **Option A: Use Railway Dashboard (Easiest)**
1. Run: `railway open`
2. Browser opens → Click "Variables" tab
3. Click "+ New Variable"
4. Add these:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://lumina:admin1234@mydeployment.3hpj9sl.mongodb.net/lumina-electronics?retryWrites=true&w=majority`
   
   - **Name**: `NODE_ENV`
   - **Value**: `production`

5. Click "Deploy" to apply

#### **Option B: Use Command Line**
Run this command to open the variables editor:
```bash
railway vars
```
Then in the interactive prompt:
- Type: `MONGODB_URI=mongodb+srv://lumina:admin1234@mydeployment.3hpj9sl.mongodb.net/lumina-electronics?retryWrites=true&w=majority`
- Press Enter
- Type: `NODE_ENV=production`
- Press Enter
- Type: `exit` to save

#### **Option C: Set Variables One at a Time**
Use the `--set` flag:
```bash
railway variables --set MONGODB_URI=mongodb+srv://lumina:admin1234@mydeployment.3hpj9sl.mongodb.net/lumina-electronics?retryWrites=true&w=majority

railway variables --set NODE_ENV=production
```

### **Step 5: Deploy!** 🚀
```bash
railway up
```

### **Step 6: Get Your URL** 🌐
After deployment completes:
```bash
railway domain
```

If no domain exists, create one:
```bash
railway domain --generate
```

---

## 🎯 Recommended Flow (Simplest)

```bash
# 1. Login
railway login

# 2. Initialize
railway init

# 3. Open dashboard to set variables (easiest!)
railway open

# 4. In browser: Add MONGODB_URI and NODE_ENV in Variables tab

# 5. Deploy
railway up

# 6. Generate domain
railway domain
```

---

## 📋 Alternative: All-CLI Approach

```bash
# Login
railway login

# Init
railway init

# Set variables using --set flag
railway variables --set MONGODB_URI=mongodb+srv://lumina:admin1234@mydeployment.3hpj9sl.mongodb.net/lumina-electronics?retryWrites=true&w=majority
railway variables --set NODE_ENV=production

# Deploy
railway up

# Get/generate domain
railway domain
```

---

## 🆘 Quick Fix for Your Current Situation

Since you're already logged in and initialized, just do:

```bash
# Option 1: Use dashboard (easiest)
railway open
# → Go to Variables tab → Add MONGODB_URI and NODE_ENV

# Then deploy
railway up

# Get domain
railway domain
```

**OR**

```bash
# Option 2: Use CLI with correct syntax
railway variables --set MONGODB_URI=mongodb+srv://lumina:admin1234@mydeployment.3hpj9sl.mongodb.net/lumina-electronics?retryWrites=true&w=majority
railway variables --set NODE_ENV=production

railway up
railway domain
```

---

## ✅ Summary

The Railway CLI changed from:
- ❌ OLD: `railway variables set KEY="value"`
- ✅ NEW: `railway variables --set KEY=value`
- ✅ OR: `railway open` (use web dashboard)

**I recommend using `railway open` to set variables in the browser - it's easier!**
