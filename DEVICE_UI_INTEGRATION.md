# ESP32 Device UI Integration Guide

## Files Created
✅ `device-pages.js` - Page components and logic  
✅ `css/device-control.css` - Styles for device UI  
✅ `socket-client.js` - Already created  

---

## Step 1: Add to `index.html`

Add these lines to your `<head>` section:

```html
<!-- In index.html <head> -->
<link rel="stylesheet" href="css/device-control.css">
<script src="socket-client.js"></script>
```

---

## Step 2: Update `main.js` State

Add to the `state` object (around line 35):

```javascript
const state = {
    // ... existing properties ...
    devices: [],
    currentDeviceId: null,
    esp32Client: null,
    deviceStatus: {},
    telemetryData: {}
};
```

---

## Step 3: Add Device API to `api` object

Add after line 128 (after existing API methods):

```javascript
// Inside the existing `api` object:
getMyDevices: async () => {
    if (!state.currentUser) return;
    try {
        const response = await apiCall(`/devices/my-devices?userId=${state.currentUser._id}`);
        state.devices = response.data;
        render();
    } catch (error) {
        console.error('Failed to load devices:', error);
    }
},

pairDevice: async (deviceId, deviceToken) => {
    try {
        const response = await apiCall('/devices/pair', {
            method: 'POST',
            body: JSON.stringify({
                deviceId,
                deviceToken,
                userId: state.currentUser._id
            })
        });
        showToast('Device paired successfully!');
        await api.getMyDevices();
        navigate('my-devices');
    } catch (error) {
        showToast(error.message || 'Device pairing failed');
        throw error;
    }
}
```

---

## Step 4: Copy Page Components from `device-pages.js`

Copy these three functions after the existing page components (around line 630, after `CartPage`):

1. `MyDevicesPage()` 
2. `DevicePairingPage()`
3. `RemoteControlPage()`

(Full code in `device-pages.js`)

---

## Step 5: Update Breadcrumbs (Optional)

Add to `Breadcrumbs` function pages object (around line 200):

```javascript
const pages = {
    'deals': 'Deals',
    'learn': 'Learn',
    // ... existing ...
    'my-devices': 'My Devices',
    'device-pair': 'Pair Device',
    'remote-control': 'Remote Control'
};
```

---

## Step 6: Update Header Navigation

Add "My Devices" link to the header (around line 304, in the `<nav>` section):

```javascript
${isLoggedIn && !isAdmin ? `
    <a href="#" class="nav-link ${state.route === 'my-devices' ? 'active' : ''}" 
       onclick="window.navigate('my-devices'); return false;">My Devices 🚗</a>
` : ''}
```

---

## Step 7: Update Render Switch Statement

Add these cases to the `render()` function switch statement (around line 2074):

```javascript
switch (state.route) {
    case 'home': content = HomePage(); break;
    case 'products': content = ProductsPage(); break;
    // ... existing cases ...
    case 'my-devices': content = MyDevicesPage(); break;
    case 'device-pair': content = DevicePairingPage(); break;
    case 'remote-control': content = RemoteControlPage(); break;
    default: content = HomePage();
}
```

---

## Step 8: Add Event Handlers

Copy these from `device-pages.js` to the bottom of `main.js` (before `initApp()`):

```javascript
// Device Management Handlers
window.handleDevicePairing = async (event) => { /* ... */ };
window.startRemoteControl = async (deviceId) => { /* ... */ };
window.stopRemoteControl = () => { /* ... */ };
window.sendCarCommand = (direction) => { /* ... */ };

// Helper functions
function updateRemoteControlUI() { /* ... */ }
function addCommandLog(message) { /* ... */ }

// Keyboard event listeners
document.addEventListener('keydown', (e) => { /* ... */ });
document.addEventListener('keyup', (e) => { /* ... */ });
```

---

## Step 9: Load Devices on Login

Add to the `api.login` function (around line 52), after setting currentUser:

```javascript
// Inside api.login, after login success:
state.currentUser = response.data;
localStorage.setItem('currentUser', JSON.stringify(state.currentUser));

// Add this:
await api.getMyDevices(); // Load user's devices

// Sync cart after login!
await syncCartWithServer();
```

---

## Step 10: Initialize on Page Load

Add after `initApp()` function (around line 4040):

```javascript
// Load devices if logged in
if (state.currentUser) {
    api.getMyDevices();
}
```

---

## Testing

1. **Login** to your account
2. **Click "My Devices"** in navigation
3. **Click "Pair New Device"**
4. **Enter device credentials** from order
5. **Device should appear** in list
6. **Click "Control"** when device is online
7. **Use arrow buttons or WASD keys** to control

---

## Full Integration Script

If you prefer, I can create a single patch file or do the integration automatically. Let me know!

**Estimated Time:** 10-15 minutes manual integration  
**Lines Added:** ~400 lines to main.js
