/*
 * Minimal ESP32 Test - Just blink and serial output
 * Use this to verify ESP32 hardware is working
 */

void setup() {
  Serial.begin(115200);
  delay(2000); // Give serial time to initialize
  
  Serial.println("\n\n========================================");
  Serial.println("ESP32 MINIMAL TEST");
  Serial.println("========================================");
  Serial.println("If you see this, ESP32 is working!");
  Serial.println();
  
  pinMode(2, OUTPUT); // Built-in LED on most ESP32 boards
}

void loop() {
  Serial.print("Loop running... millis: ");
  Serial.println(millis());
  
  digitalWrite(2, HIGH);
  delay(500);
  digitalWrite(2, LOW);
  delay(500);
}
