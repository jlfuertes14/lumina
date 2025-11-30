# ESP32 Smart Car - Setup Guide

## 🎯 Quick Start Guide

Your ESP32 smart car code has been converted from SoftAP to WebSocket control! Follow these steps to get it running.

---

## 📋 Prerequisites

### Arduino Libraries Required

Install these libraries via Arduino IDE Library Manager:

1. **SocketIOclient** by Markus Sattler
   - Sketch → Include Library → Manage Libraries
   - Search "SocketIOclient"
   - Click Install

2. **ArduinoJson** by Benoit Blanchon
   - Search "ArduinoJson"
   - Install version 6.x (NOT version 7)

3. **WiFi** (Built-in for ESP32)
4. **WebServer** (Built-in for ESP32)
5. **EEPROM** (Built-in for ESP32)

---

## ⚙️ Configuration

### 1. Update Server Address

Open `ESP32_SmartCar_WebSocket.ino` and change this line:

```cpp
const char* websocket_server = "your-website-domain.com";  // Line 28
```

**Options:**
- **Local Testing:** `"192.168.1.100"` (your computer's local IP)
- **Production:** `"your-domain.com"` or server IP address

**To find your local IP:**
- Windows: Open CMD, type `ipconfig`, look for "IPv4 Address"
- Mac/Linux: Open Terminal, type `ifconfig`, look for "inet"

### 2. Upload to ESP32

1. Connect ESP32 to computer via USB
2. Select **Board:** ESP32 Dev Module (Tools → Board)
3. Select **Port:** COM port for your ESP32 (Tools → Port)
4. Click **Upload** button (→)

---

## 🚗 First Time Setup

### Step 1: Initial Configuration

When ESP32 boots for the first time (no saved config):

1. **ESP32 creates WiFi network:**
   - SSID: `ESP32-SmartCar-Setup`
   - Password: `12345678`

2. **Connect to this network** from your phone/computer

3. **Open browser and go to:** `http://192.168.4.1`

4. **Enter your details:**
   - WiFi Network Name (your home WiFi SSID)
   - WiFi Password
   - Device ID (from order confirmation: `ESP32-XXXXXXXX`)
   - Device Token (from order confirmation email)

5. **Click "Save & Connect"**

6. **ESP32 will restart** and connect to your WiFi + Website server

### Step 2: Verification

Open **Serial Monitor** (Tools → Serial Monitor, 115200 baud):

```
========================================
ESP32 Smart Car - WebSocket Edition
========================================

✅ Configuration found!
Device ID: ESP32-A3F2C1B8
WiFi SSID: YourWiFi
Connecting to WiFi: YourWiFi
..........
✅ WiFi Connected!
IP Address: 192.168.1.150
🔌 Initializing WebSocket client...
✅ WebSocket client initialized
✅ Connected to WebSocket server!
🔐 Authenticating with server...
```

---

## 🎮 Testing Control

### From Website:
1. Log into your account
2. Go to "My Devices"  
3. Find your ESP32 car
4. Click "Control"
5. Use arrow buttons or WASD keys

### Serial Monitor Output:
```
📩 Received: ["control:command",{"command":"move","payload":{"direction":"forward","speed":255}}]
🎮 Command: move
🚗 Moving forward
```

---

## 🔄 What Changed from Original Code

| Feature | Original (SoftAP) | New (WebSocket) |
|---------|------------------|-----------------|
| **Connection** | Creates own WiFi | Connects to your WiFi |
| **Control** | Direct HTTP | WebSocket via server |
| **Range** | WiFi range only | Unlimited (internet) |
| **Interface** | Local web page | Website remote control |
| **Setup** | Always available | Config portal first time |
| **Sensors** | Obstacle detection | ✅ Preserved |
| **Motors** | Same control | ✅ Preserved |

---

## 🔧 Troubleshooting

### ESP32 doesn't connect to WiFi

**Check:**
- ✅ WiFi credentials are correct
- ✅ ESP32 supports 2.4GHz WiFi only (not 5GHz)
- ✅ WiFi network is visible

**Solution:** Press reset button on ESP32 to restart config portal

---

### WebSocket won't connect

**Check Serial Monitor for:**

```
❌ WebSocket Error: Connection refused
```

**Solutions:**
1. Verify `websocket_server` address is correct
2. Ensure server is running (`node server/server.js`)
3. Check firewall isn't blocking port 3000
4. Try using IP address instead of domain name

---

### Obstacle detection not working

IR sensors work the same as before:
- `frontBlocked()` - Front sensor (pin 34)
- `leftBlocked()` - Left sensor (pin 35)  
- `rightBlocked()` - Right sensor (pin 39)

**Test in Serial Monitor:**
Move hand in front of sensor, should see:
```
Blocked: Front obstacle detected!
```

---

### Reset to factory (clear config)

Upload this simple sketch to erase EEPROM:

```cpp
#include <EEPROM.h>
void setup() {
  EEPROM.begin(512);
  for (int i = 0; i < 512; i++) {
    EEPROM.write(i, 0);
  }
  EEPROM.commit();
  Serial.begin(115200);
  Serial.println("EEPROM cleared!");
}
void loop() {}
```

Then re-upload the main code.

---

## 📊 Status Updates

ESP32 sends status to website every 5 seconds:

```json
{
  "battery": 85,
  "frontSensor": false,
  "leftSensor": false,
  "rightSensor": false,
  "isMoving": true,
  "firmwareVersion": "1.0.0",
  "uptime": 3600
}
```

**Battery Monitoring:** Currently returns fixed value (85%). To add real battery reading, implement voltage divider on analog pin and update `sendStatusUpdate()`.

---

## 🎯 Next Steps

### Add Battery Monitoring

```cpp
#define BATTERY_PIN 36  // ADC pin

float getBatteryVoltage() {
  int raw = analogRead(BATTERY_PIN);
  float voltage = (raw / 4095.0) * 3.3 * 2; // voltage divider
  return voltage;
}

// In sendStatusUpdate():
float voltage = getBatteryVoltage();
int batteryPercent = map(voltage * 100, 600, 840, 0, 100);
status["battery"] = constrain(batteryPercent, 0, 100);
```

### Add Camera (ESP32-CAM)

For Deluxe Kit with ESP32-CAM:
1. Replace ESP32 board with ESP32-CAM
2. Add camera streaming library
3. Stream to website (separate implementation)

---

## 📝 Code Highlights

### Motor Control Functions (Unchanged)
```cpp
void moveForward()  // in1=LOW, in2=HIGH, in3=LOW, in4=HIGH
void moveBackward() // in1=HIGH, in2=LOW, in3=HIGH, in4=LOW
void turnLeft()     // in1=LOW, in2=HIGH, in3=HIGH, in4=LOW
void turnRight()    // in1=HIGH, in2=LOW, in3=LOW, in4=HIGH
void stopMotors()   // All LOW
```

### Obstacle Detection (Preserved)
```cpp
bool frontBlocked() // Returns true if obstacle detected
bool leftBlocked()
bool rightBlocked()
```

### New WebSocket Functions
```cpp
void authenticateDevice()       // Auth with server
void handleWebSocketMessage()   // Process commands
void sendCommandAck()           // Confirm command executed
void sendStatusUpdate()         // Broadcast car status
```

---

## ✅ Summary

Your ESP32 smart car is now:
- ✅ Connected to your website
- ✅ Controllable from anywhere
- ✅ Authenticating securely
- ✅ Reporting real-time status
- ✅ Preserving obstacle detection
- ✅ Easy to reconfigure via portal

**Enjoy controlling your smart car via the web!** 🚗💨
