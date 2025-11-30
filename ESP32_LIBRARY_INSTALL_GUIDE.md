# ESP32 Firmware - Library Installation Guide

## ✅ Updated for WebSockets_Generic Library

The firmware has been updated to use the correct **WebSockets_Generic** library by Markus Sattler and Khoi Hoang.

---

## Required Libraries

Install these in Arduino IDE via **Sketch → Include Library → Manage Libraries**:

### 1. WebSockets_Generic
- **Author:** Markus Sattler and Khoi Hoang
- **Version:** Latest (2.x.x or higher)
- **Search for:** `WebSockets_Generic`
- **Install:** Click "Install" button

### 2. ArduinoJson
- **Author:** Benoit Blanchon
- **Version:** 6.x.x (use version 6, NOT version 7)
- **Search for:** `ArduinoJson`
- **Install:** Click "Install" button

---

## Library Includes (Now Correct ✅)

```cpp
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <WebSocketsClient_Generic.h>
#include <SocketIOclient_Generic.h>
#include <EEPROM.h>
```

---

## Upload Instructions

### 1. Install Libraries
1. Open Arduino IDE
2. Go to **Sketch → Include Library → Manage Libraries**
3. Search and install:
   - `WebSockets_Generic` by Khoi Hoang
   - `ArduinoJson` by Benoit Blanchon (version 6.x)

### 2. Select Board
1. Go to **Tools → Board → ESP32 Arduino**
2. Select **ESP32 Dev Module** (or your specific ESP32 board)

### 3. Configure Port
1. Connect ESP32 to computer via USB
2. Go to **Tools → Port**
3. Select the COM port showing your ESP32

### 4. Upload Firmware
1. Open **ESP32_SmartCar_WebSocket.ino**
2. Click **Upload** button (→)
3. Wait for "Done uploading" message

### 5. Monitor Serial Output
1. Go to **Tools → Serial Monitor**
2. Set baud rate to **115200**
3. You should see:
   ```
   ========================================
   ESP32 Smart Car - WebSocket Edition
   ========================================
   ```

---

## First-Time Setup

### If Not Configured:
```
⚠️  No configuration found. Starting config portal...
✅ Access Point Started
SSID: ESP32-SmartCar-Setup
Password: 12345678
IP Address: 192.168.4.1
```

**Setup Steps:**
1. **Connect phone/laptop** to WiFi: `ESP32-SmartCar-Setup`
2. **Password:** `12345678`
3. **Open browser:** http://192.168.4.1
4. **Enter details:**
   - WiFi SSID (your home WiFi)
   - WiFi Password
   - Device ID (from order confirmation)
   - Device Token (from order confirmation)
5. **Click "Save & Connect"**
6. ESP32 restarts and connects to website!

### Expected Serial Output After Configuration:
```
✅ Configuration found!
Device ID: ESP32-XXXXXXXX
WiFi SSID: YourWiFiName
Connecting to WiFi: YourWiFiName
...........
✅ WiFi Connected!
IP Address: 192.168.x.x
🔌 Initializing WebSocket client...
✅ WebSocket client initialized
✅ Connected to WebSocket server!
🔐 Authenticating with server...
```

---

## Troubleshooting

### Library Not Found Errors
```
fatal error: WebSocketsClient_Generic.h: No such file or directory
```
**Fix:** Install `WebSockets_Generic` library via Library Manager

### Compilation Errors
```
'SocketIOclient_Generic' was not declared in this scope
```
**Fix:** Make sure you installed `WebSockets_Generic` NOT the old `WebSockets` library

### WiFi Connection Failed
```
❌ WiFi Connection Failed!
⚠️  WiFi failed. Starting config portal...
```
**Fix:** 
- Check WiFi SSID and password are correct
- Ensure ESP32 is in range of WiFi router
- Use 2.4GHz WiFi (ESP32 doesn't support 5GHz)

### WebSocket Connection Failed
```
❌ Disconnected from server
```
**Fix:**
- Check internet connection
- Verify device ID and token are correct
- Ensure Railway backend is running

---

## Testing

### 1. Verify Serial Monitor Output
Should see successful WiFi and WebSocket connection.

### 2. Check Website
1. Go to https://jlfuertes14.github.io/lumina/
2. Login to your account
3. Navigate to "My Devices"
4. Your ESP32 should appear as "Online"

### 3. Test Remote Control
1. Click "Control" button
2. Try arrow buttons or WASD keys
3. ESP32 should respond to commands
4. Serial monitor should show:
   ```
   📩 Received: ["control:command",{"command":"move","payload":{"direction":"forward","speed":255}}]
   🎮 Command: move
   🚗 Moving forward
   ```

---

## Hardware Connections

### Motor Driver (L298N)
```
ESP32 Pin → L298N Pin
-----------------------
GPIO 32   → IN1
GPIO 33   → IN2
GPIO 26   → IN3
GPIO 25   → IN4
```

### IR Sensors (Obstacle Detection)
```
ESP32 Pin → IR Sensor
-----------------------
GPIO 34   → Front IR OUT
GPIO 35   → Left IR OUT
GPIO 39   → Right IR OUT
```

### Power
- ESP32: USB or 5V power supply
- Motors: L298N 12V input (separate power)
- **Important:** Connect ESP32 GND to L298N GND

---

## Next Steps

1. ✅ Upload firmware to ESP32
2. ✅ Configure via web portal
3. ✅ Verify connection in serial monitor
4. ✅ Test from website remote control
5. 🎮 Enjoy controlling your smart car!

**Your ESP32 is now ready for remote control through the website!** 🚗💨
