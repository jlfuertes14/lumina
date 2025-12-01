/*
 * ESP32 Smart Car - AsyncWebSocket Edition
 * Clean, reliable WebSocket implementation using AsyncWebSocket library
 * 
 * Required Libraries (install via Arduino Library Manager):
 * - ESPAsyncWebServer by me-no-dev
 * - AsyncTCP by me-no-dev
 * - ArduinoJson by Benoit Blanchon
 * 
 * Features:
 * - Direct WebSocket connection (no Socket.IO complexity)
 * - SSL/TLS support for Railway
 * - Device authentication with token
 * - Obstacle detection (IR sensors)
 * - Real-time status updates
 * - Configuration portal (SoftAP fallback)
 */

#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <WebSocketsClient.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <EEPROM.h>
#include <esp_task_wdt.h>

// ========== Motor Pins ==========
const int in1 = 32;
const int in2 = 33;
const int in3 = 26;
const int in4 = 25;

// ========== IR Sensor Pins ==========
const int irFront = 34;
const int irLeft  = 35;
const int irRight = 39;

// ========== EEPROM Memory Layout ==========
#define EEPROM_SIZE 512
#define WIFI_SSID_ADDR 0
#define WIFI_PASS_ADDR 64
#define DEVICE_ID_ADDR 128
#define DEVICE_TOKEN_ADDR 192
#define CONFIGURED_FLAG_ADDR 320

// ========== WebSocket Configuration ==========
const char* websocket_server = "lumina-production-a4bb.up.railway.app";
const int websocket_port = 443;
const char* websocket_path = "/ws/device";

// ========== Global Variables ==========
WebSocketsClient webSocket;
WebServer configServer(80);

String deviceId = "";
String deviceToken = "";
String wifiSSID = "";
String wifiPassword = "";
bool isConfigured = false;
bool isConnected = false;
bool isAuthenticated = false;
bool isConfigMode = false;

unsigned long lastStatusUpdate = 0;
const unsigned long STATUS_INTERVAL = 5000; // 5 seconds

// ========== Setup ==========
void setup() {
  Serial.begin(115200);
  delay(1000);
  
  // Configure watchdog
  esp_task_wdt_deinit();
  esp_task_wdt_config_t wdt_config = {
    .timeout_ms = 30000,
    .idle_core_mask = 0,
    .trigger_panic = false
  };
  esp_task_wdt_init(&wdt_config);
  
  Serial.println("\n========================================");
  Serial.println("ESP32 Smart Car - AsyncWebSocket");
  Serial.println("========================================\n");

  // Initialize pins
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  pinMode(irFront, INPUT);
  pinMode(irLeft, INPUT);
  pinMode(irRight, INPUT);
  
  stopMotors();
  
  // Load credentials
  loadCredentials();

  // Check configuration
  if (!isConfigured || deviceId.length() == 0) {
    Serial.println("⚠️  No configuration. Starting config portal...");
    isConfigMode = true;
    startConfigPortal();
  } else {
    Serial.println("✅ Configuration found!");
    Serial.println("Device ID: " + deviceId);
    Serial.println("WiFi SSID: " + wifiSSID);
    
    connectToWiFi();
    
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("🔌 Setting up WebSocket...");
      isConfigMode = false;
      setupWebSocket();
      Serial.println("✅ Setup complete!");
    } else {
      Serial.println("⚠️  WiFi failed. Starting config portal...");
      isConfigMode = true;
      startConfigPortal();
    }
  }
}

// ========== Main Loop ==========
void loop() {
  // Serial command check
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    command.toUpperCase();
    if (command == "RESET") {
      factoryReset();
    }
  }
  
  if (isConfigMode) {
    configServer.handleClient();
  } else {
    webSocket.loop();
    
    // Send status updates when connected and authenticated
    if (isConnected && isAuthenticated && millis() - lastStatusUpdate > STATUS_INTERVAL) {
      sendStatusUpdate();
      lastStatusUpdate = millis();
    }
  }
  
  delay(10);
}

// ========== WebSocket Setup ==========
void setupWebSocket() {
  Serial.println("🔌 Initializing WebSocket client...");
  
  // Configure WebSocket with SSL
  webSocket.beginSSL(websocket_server, websocket_port, websocket_path);
  
  // Set reconnect interval
  webSocket.setReconnectInterval(5000);
  
  // Set event handler
  webSocket.onEvent(webSocketEvent);
  
  Serial.println("✅ WebSocket client initialized");
  Serial.println("Server: " + String(websocket_server) + ":" + String(websocket_port));
  Serial.println("Path: " + String(websocket_path));
}

// ========== WebSocket Event Handler ==========
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("❌ Disconnected from server");
      isConnected = false;
      isAuthenticated = false;
      break;
      
    case WStype_CONNECTED:
      Serial.println("✅ Connected to WebSocket server!");
      isConnected = true;
      Serial.println("🔐 Authenticating...");
      authenticateDevice();
      break;
      
    case WStype_TEXT:
      Serial.printf("📨 Received: %s\n", payload);
      handleWebSocketMessage(payload, length);
      break;
      
    case WStype_ERROR:
      Serial.printf("❌ WebSocket Error: %s\n", payload);
      break;
      
    default:
      break;
  }
}

// ========== Authentication ==========
void authenticateDevice() {
  DynamicJsonDocument doc(512);
  
  doc["type"] = "authenticate";
  doc["deviceId"] = deviceId;
  doc["deviceToken"] = deviceToken;
  
  String output;
  serializeJson(doc, output);
  webSocket.sendTXT(output);
  
  Serial.println("Sent: " + output);
}

// ========== Message Handler ==========
void handleWebSocketMessage(uint8_t * payload, size_t length) {
  DynamicJsonDocument doc(1024);
  DeserializationError error = deserializeJson(doc, payload, length);
  
  if (error) {
    Serial.println("❌ JSON parsing failed");
    return;
  }
  
  String type = doc["type"];
  
  if (type == "auth_success") {
    Serial.println("✅ Authentication successful!");
    isAuthenticated = true;
  }
  else if (type == "auth_error") {
    Serial.println("❌ Authentication failed: " + String(doc["message"].as<const char*>()));
    isAuthenticated = false;
  }
  else if (type == "command") {
    String command = doc["command"];
    JsonObject cmdPayload = doc["payload"];
    
    Serial.println("🎮 Command: " + command);
    
    if (command == "move") {
      String direction = cmdPayload["direction"];
      handleMovement(direction);
    }
    else if (command == "stop") {
      stopMotors();
      sendCommandAck("stop", true, "Stopped");
    }
    else {
      sendCommandAck(command, false, "Unknown command");
    }
  }
  else if (type == "ping") {
    // Respond to heartbeat
    DynamicJsonDocument pong(128);
    pong["type"] = "pong";
    String output;
    serializeJson(pong, output);
    webSocket.sendTXT(output);
  }
}

// ========== Movement Handler ==========
void handleMovement(String direction) {
  String result = "";
  bool success = true;
  
  if (direction == "forward") {
    if (frontBlocked()) {
      stopMotors();
      result = "Blocked: Front obstacle!";
      success = false;
    } else {
      moveForward();
      result = "Moving forward";
    }
  }
  else if (direction == "backward") {
    moveBackward();
    result = "Moving backward";
  }
  else if (direction == "left") {
    if (leftBlocked()) {
      stopMotors();
      result = "Blocked: Left obstacle!";
      success = false;
    } else {
      turnLeft();
      result = "Turning left";
    }
  }
  else if (direction == "right") {
    if (rightBlocked()) {
      stopMotors();
      result = "Blocked: Right obstacle!";
      success = false;
    } else {
      turnRight();
      result = "Turning right";
    }
  }
  
  Serial.println("🚗 " + result);
  sendCommandAck("move", success, result);
}

// ========== Motor Control ==========
void moveForward() {
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
}

void moveBackward() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
}

void turnLeft() {
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
}

void turnRight() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
}

void stopMotors() {
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}

// ========== IR Sensors ==========
bool frontBlocked() {
  return digitalRead(irFront) == LOW;
}

bool leftBlocked() {
  return digitalRead(irLeft) == LOW;
}

bool rightBlocked() {
  return digitalRead(irRight) == LOW;
}

bool isCarMoving() {
  return digitalRead(in2) || digitalRead(in4);
}

// ========== WebSocket Communication ==========
void sendCommandAck(String command, bool success, String message) {
  DynamicJsonDocument doc(512);
  
  doc["type"] = "command_ack";
  JsonObject payload = doc.createNestedObject("payload");
  payload["command"] = command;
  payload["success"] = success;
  payload["message"] = message;
  payload["timestamp"] = millis();
  
  String output;
  serializeJson(doc, output);
  webSocket.sendTXT(output);
}

void sendStatusUpdate() {
  DynamicJsonDocument doc(512);
  
  doc["type"] = "status";
  JsonObject payload = doc.createNestedObject("payload");
  payload["battery"] = 85; // TODO: Implement actual battery reading
  payload["frontSensor"] = frontBlocked();
  payload["leftSensor"] = leftBlocked();
  payload["rightSensor"] = rightBlocked();
  payload["isMoving"] = isCarMoving();
  payload["firmwareVersion"] = "2.0.0-AsyncWS";
  payload["uptime"] = millis() / 1000;
  
  String output;
  serializeJson(doc, output);
  webSocket.sendTXT(output);
}

// ========== WiFi Connection ==========
void connectToWiFi() {
  Serial.println("Connecting to WiFi: " + wifiSSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(wifiSSID.c_str(), wifiPassword.c_str());
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi Connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n❌ WiFi Connection Failed!");
  }
}

// ========== EEPROM Functions ==========
void loadCredentials() {
  EEPROM.begin(EEPROM_SIZE);
  
  isConfigured = EEPROM.read(CONFIGURED_FLAG_ADDR) == 1;
  
  if (isConfigured) {
    wifiSSID = readStringFromEEPROM(WIFI_SSID_ADDR, 64);
    wifiPassword = readStringFromEEPROM(WIFI_PASS_ADDR, 64);
    deviceId = readStringFromEEPROM(DEVICE_ID_ADDR, 64);
    deviceToken = readStringFromEEPROM(DEVICE_TOKEN_ADDR, 128);
  }
  
  EEPROM.end();
}

void saveCredentials(String ssid, String pass, String devId, String token) {
  EEPROM.begin(EEPROM_SIZE);
  
  writeStringToEEPROM(WIFI_SSID_ADDR, ssid, 64);
  writeStringToEEPROM(WIFI_PASS_ADDR, pass, 64);
  writeStringToEEPROM(DEVICE_ID_ADDR, devId, 64);
  writeStringToEEPROM(DEVICE_TOKEN_ADDR, token, 128);
  EEPROM.write(CONFIGURED_FLAG_ADDR, 1);
  
  EEPROM.commit();
  EEPROM.end();
  
  Serial.println("✅ Credentials saved!");
}

String readStringFromEEPROM(int addr, int maxLength) {
  String result = "";
  for (int i = 0; i < maxLength; i++) {
    char c = EEPROM.read(addr + i);
    if (c == '\0' || c == 255) break;
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
}

// ========== Configuration Portal ==========
void startConfigPortal() {
  Serial.println("🔧 Starting Configuration Portal...");
  
  WiFi.mode(WIFI_AP);
  WiFi.softAP("ESP32-SmartCar-Setup", "12345678");
  
  Serial.println("✅ Access Point Started");
  Serial.println("SSID: ESP32-SmartCar-Setup");
  Serial.println("Password: 12345678");
  Serial.print("IP: ");
  Serial.println(WiFi.softAPIP());
  
  configServer.on("/", handleConfigPage);
  configServer.on("/save", handleSaveConfig);
  configServer.begin();
  
  Serial.println("📱 Config server ready at http://192.168.4.1");
}

void handleConfigPage() {
  String html = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>ESP32 Car Setup</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      max-width: 500px;
      width: 100%;
    }
    h1 {
      color: #667eea;
      margin-bottom: 10px;
      font-size: 28px;
      text-align: center;
    }
    p {
      color: #666;
      margin-bottom: 30px;
      text-align: center;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      color: #333;
      font-weight: 600;
      margin-bottom: 8px;
      font-size: 14px;
    }
    input {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 16px;
      transition: border-color 0.3s;
    }
    input:focus {
      outline: none;
      border-color: #667eea;
    }
    button {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:hover {
      transform: translateY(-2px);
    }
    .info {
      background: #f0f4ff;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚗 ESP32 Smart Car Setup</h1>
    <p>Configure your car to connect to the website</p>
    
    <div class="info">
      Enter your WiFi details and device credentials from your order confirmation email.
    </div>
    
    <form action="/save" method="POST">
      <div class="form-group">
        <label>WiFi Network Name (SSID)</label>
        <input type="text" name="ssid" required placeholder="Your WiFi SSID">
      </div>
      
      <div class="form-group">
        <label>WiFi Password</label>
        <input type="password" name="password" required placeholder="WiFi Password">
      </div>
      
      <div class="form-group">
        <label>Device ID</label>
        <input type="text" name="deviceId" required placeholder="ESP32-XXXXXXXX">
      </div>
      
      <div class="form-group">
        <label>Device Token</label>
        <input type="text" name="deviceToken" required placeholder="Your device token">
      </div>
      
      <button type="submit">💾 Save & Connect</button>
    </form>
  </div>
</body>
</html>
  )rawliteral";
  
  configServer.send(200, "text/html", html);
}

void handleSaveConfig() {
  String ssid = configServer.arg("ssid");
  String password = configServer.arg("password");
  String devId = configServer.arg("deviceId");
  String token = configServer.arg("deviceToken");
  
  Serial.println("\n📝 New Configuration:");
  Serial.println("SSID: " + ssid);
  Serial.println("Device ID: " + devId);
  
  saveCredentials(ssid, password, devId, token);
  
  String html = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Configuration Saved</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      text-align: center;
      max-width: 500px;
    }
    h1 { color: #4CAF50; font-size: 32px; margin-bottom: 20px; }
    p { color: #666; font-size: 18px; line-height: 1.6; }
    .emoji { font-size: 64px; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">✅</div>
    <h1>Configuration Saved!</h1>
    <p>Your ESP32 car will now restart and connect to the website server.</p>
    <p style="margin-top: 20px; font-size: 14px; color: #999;">
      You can close this page and control your car from the website!
    </p>
  </div>
  <script>
    setTimeout(() => {
      document.body.innerHTML = '<div class="container"><div class="emoji">🔄</div><h1>Restarting...</h1></div>';
    }, 3000);
  </script>
</body>
</html>
  )rawliteral";
  
  configServer.send(200, "text/html", html);
  
  delay(3000);
  Serial.println("🔄 Restarting ESP32...");
  Serial.flush();
  delay(500);
  ESP.restart();
}

// ========== Factory Reset ==========
void factoryReset() {
  Serial.println("\n🔴 FACTORY RESET!");
  Serial.println("Clearing configuration...");
  
  EEPROM.begin(EEPROM_SIZE);
  for (int i = 0; i < EEPROM_SIZE; i++) {
    EEPROM.write(i, 0);
  }
  EEPROM.commit();
  EEPROM.end();
  
  Serial.println("✅ Configuration cleared!");
  Serial.println("🔄 Restarting...");
  Serial.flush();
  
  delay(2000);
  ESP.restart();
}
