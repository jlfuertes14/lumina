# ESP32 Firmware Integration Guide

## Overview

This guide explains how to modify your existing ESP32 SoftAP remote car code to connect to the e-commerce website's WebSocket server, enabling remote control from anywhere via the web interface.

---

## Architecture Change

### **Current Setup (SoftAP):**
```
User Phone WiFi → ESP32 (creates its own WiFi) → Direct HTTP control
```

### **New Setup (WebSocket):**
```
User Browser → Website Server (WebSocket) → ESP32 (connects to user's WiFi) → Commands
```

---

## Required Arduino Libraries

Add these to your ESP32 sketch:

```cpp
#include <WiFi.h>
#include <SocketIOclient.h>  // Install via Library Manager
#include <ArduinoJson.h>      // Install via Library Manager
#include <EEPROM.h>           // For storing credentials
```

**Install via Arduino IDE:**
- Sketch → Include Library → Manage Libraries
- Search and install:
  - `Socket.IO Client` by Markus Sattler
  - `ArduinoJson` by Benoit Blanchon

---

## Configuration Structure

```cpp
// EEPROM Memory Layout
#define EEPROM_SIZE 512
#define WIFI_SSID_ADDR 0        // 32 bytes
#define WIFI_PASS_ADDR 32       // 64 bytes
#define DEVICE_ID_ADDR 96       // 32 bytes
#define DEVICE_TOKEN_ADDR 128   // 64 bytes

// Server configuration
const char* websocket_server = "your-website-domain.com";  // or IP
const int websocket_port = 3000;
const char* websocket_path = "/socket.io/?EIO=4&transport=websocket";
```

---

## Code Structure

### 1. WiFi Connection (Replaces SoftAP)

```cpp
String deviceId = "";
String deviceToken = "";
String wifiSSID = "";
String wifiPassword = "";

void loadCredentials() {
    EEPROM.begin(EEPROM_SIZE);
    
    // Load WiFi credentials
    wifiSSID = readStringFromEEPROM(WIFI_SSID_ADDR, 32);
    wifiPassword = readStringFromEEPROM(WIFI_PASS_ADDR, 64);
    
    // Load device credentials (from purchase)
    deviceId = readStringFromEEPROM(DEVICE_ID_ADDR, 32);
    deviceToken = readStringFromEEPROM(DEVICE_TOKEN_ADDR, 64);
    
    EEPROM.end();
}

void connectToWiFi() {
    Serial.println("Connecting to WiFi...");
    WiFi.begin(wifiSSID.c_str(), wifiPassword.c_str());
    
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
        delay(500);
        Serial.print(".");
        attempts++;
    }
    
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\n✅ WiFi Connected!");
        Serial.print("IP: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("\n❌ WiFi Connection Failed");
        // Fall back to SoftAP for configuration
        setupConfigPortal();
    }
}
```

### 2. WebSocket Client Setup

```cpp
SocketIOclient socketIO;

void setupWebSocket() {
    // Configure Socket.IO
    socketIO.begin(websocket_server, websocket_port, websocket_path);
    
    // Event handlers
    socketIO.onEvent(socketIOEvent);
    
    // Enable heartbeat
    socketIO.enableHeartbeat(15000, 3000, 5);
    
    Serial.println("🔌 WebSocket client initialized");
}

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.println("❌ Disconnected from server");
            break;
            
        case sIOtype_CONNECT:
            Serial.println("✅ Connected to WebSocket server");
            authenticateDevice();
            break;
            
        case sIOtype_EVENT:
            handleWebSocketEvent(payload, length);
            break;
            
        case sIOtype_ERROR:
            Serial.printf("❌ WebSocket Error: %s\n", payload);
            break;
    }
}
```

### 3. Device Authentication

```cpp
void authenticateDevice() {
    // Create authentication message
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    
    // Event name
    array.add("authenticate");
    
    // Authentication data
    JsonObject auth = array.createNestedObject();
    auth["deviceId"] = deviceId;
    auth["deviceToken"] = deviceToken;
    
    String output;
    serializeJson(doc, output);
    
    socketIO.sendEVENT(output);
    Serial.println("🔐 Sent authentication");
}
```

### 4. Command Handler (Replaces HTTP Endpoints)

```cpp
void handleWebSocketEvent(uint8_t * payload, size_t length) {
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, payload, length);
    
    if (error) {
        Serial.println("❌ JSON parsing failed");
        return;
    }
    
    String eventName = doc[0];
    
    if (eventName == "control:command") {
        JsonObject data = doc[1];
        String command = data["command"];
        JsonObject cmdPayload = data["payload"];
        
        // Handle commands
        if (command == "move") {
            String direction = cmdPayload["direction"];
            int speed = cmdPayload["speed"] | 255;
            
            handleMovement(direction, speed);
        }
        else if (command == "stop") {
            stopMotors();
        }
        
        // Send acknowledgment
        sendCommandAck(command, true);
    }
}

void handleMovement(String direction, int speed) {
    if (direction == "forward") {
        moveForward(speed);
    }
    else if (direction == "backward") {
        moveBackward(speed);
    }
    else if (direction == "left") {
        turnLeft(speed);
    }
    else if (direction == "right") {
        turnRight(speed);
    }
    
    Serial.printf("🚗 Moving %s at speed %d\n", direction.c_str(), speed);
}
```

### 5. Status Updates to Server

```cpp
unsigned long lastStatusUpdate = 0;
const unsigned long STATUS_INTERVAL = 5000; // 5 seconds

void loop() {
    socketIO.loop();
    
    // Send periodic status updates
    if (millis() - lastStatusUpdate > STATUS_INTERVAL) {
        sendStatusUpdate();
        lastStatusUpdate = millis();
    }
    
    // Your existing car logic here...
}

void sendStatusUpdate() {
    DynamicJsonDocument doc(512);
    JsonArray array = doc.to<JsonArray>();
    
    array.add("status:update");
    
    JsonObject status = array.createNestedObject();
    status["battery"] = getBatteryLevel();  // Implement this
    status["isMoving"] = isCarMoving();     // Implement this
    status["firmwareVersion"] = "1.0.0";
    
    String output;
    serializeJson(doc, output);
    socketIO.sendEVENT(output);
}

void sendCommandAck(String command, bool success) {
    DynamicJsonDocument doc(256);
    JsonArray array = doc.to<JsonArray>();
    
    array.add("command:ack");
    
    JsonObject ack = array.createNestedObject();
    ack["command"] = command;
    ack["success"] = success;
    
    String output;
    serializeJson(doc, output);
    socketIO.sendEVENT(output);
}
```

---

## Initial Setup Flow (First Time)

When users receive the ESP32 car, they need to configure it:

### Option A: SoftAP Configuration Portal

```cpp
void setup() {
    Serial.begin(115200);
    
    loadCredentials();
    
    // If no WiFi credentials stored, start config portal
    if (wifiSSID.length() == 0 || deviceId.length() == 0) {
        setupConfigPortal();
    } else {
        connectToWiFi();
        if (WiFi.status() == WL_CONNECTED) {
            setupWebSocket();
        }
    }
    
    // Initialize motors, sensors, etc.
    initializeHardware();
}

void setupConfigPortal() {
    Serial.println("🔧 Starting configuration portal...");
    
    // Create SoftAP
    WiFi.softAP("ESP32-SmartCar-Setup", "12345678");
    
    Serial.print("Config Portal IP: ");
    Serial.println(WiFi.softAPIP());
    
    // Start web server for configuration
    // Users connect to this AP and enter:
    // - Their WiFi SSID/Password
    // - Device ID and Token (from order confirmation)
    startConfigServer();
}
```

---

## Complete `setup()` and `loop()`

```cpp
void setup() {
    Serial.begin(115200);
    delay(1000);
    
    Serial.println("\n=============================");
    Serial.println("ESP32 Smart Car - WebSocket");
    Serial.println("=============================\n");
    
    // Load saved credentials
    loadCredentials();
    
    // Check if configured
    if (deviceId.length() == 0) {
        Serial.println("⚠️  No device credentials found");
        setupConfigPortal();
    } else {
        connectToWiFi();
        
        if (WiFi.status() == WL_CONNECTED) {
            setupWebSocket();
        } else {
            setupConfigPortal(); // Fallback
        }
    }
    
    // Initialize car hardware
    pinMode(MOTOR_A_PIN1, OUTPUT);
    pinMode(MOTOR_A_PIN2, OUTPUT);
    pinMode(MOTOR_B_PIN1, OUTPUT);
    pinMode(MOTOR_B_PIN2, OUTPUT);
    // ... etc
}

void loop() {
    // Handle WebSocket communication
    socketIO.loop();
    
    // Send status updates every 5 seconds
    static unsigned long lastUpdate = 0;
    if (millis() - lastUpdate > 5000) {
        sendStatusUpdate();
        lastUpdate = millis();
    }
    
    // Your existing sensor readings, obstacle detection, etc.
    
    delay(10);
}
```

---

## Helper Functions

```cpp
String readStringFromEEPROM(int addr, int maxLength) {
    String result = "";
    for (int i = 0; i < maxLength; i++) {
        char c = EEPROM.read(addr + i);
        if (c == '\0') break;
        result += c;
    }
    return result;
}

void writeStringToEEPROM(int addr, String data, int maxLength) {
    for (int i = 0; i < maxLength; i++) {
        if (i < data.length()) {
            EEPROM.write(addr + i, data[i]);
        } else {
            EEPROM.write(addr + i, '\0');
            break;
        }
    }
    EEPROM.commit();
}
```

---

## Testing

1. **Upload modified firmware to ESP32**
2. **Connect to config portal** (if first time)
3. **Enter WiFi and device credentials**
4. **ESP32 connects to your server**
5. **Open website remote control page**
6. **Test movement commands**

---

## Advantages Over SoftAP

✅ **Control from anywhere** (not limited to direct WiFi range)  
✅ **Multiple users** can monitor (but only owner can control)  
✅ **Status updates** (battery, sensors) visible on web dashboard  
✅ **Firmware updates** possible via OTA  
✅ **Command history** and logging  
✅ **More secure** with token authentication  

---

## Next Steps

When you provide your existing ESP32 code, I can:
1. Integrate WebSocket client into your code
2. Map your existing motor functions to WebSocket commands
3. Add the configuration portal
4. Test the integration

**Ready to proceed with your ESP32 code!** 🚗🤖
