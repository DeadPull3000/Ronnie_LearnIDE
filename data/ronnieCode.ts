// Ronnie's actual Arduino/C++ source code
export const RONNIE_CODE = `#include <WiFi.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "motor_map.h"

// Forward-declare functions used by movement_sequences.h
// (defined later in this file — legal in a single translation unit)
void cooperativeDelay(unsigned long ms);
void setServoAngle(uint8_t channel, int angle);
bool pressingCheck(String cmd, unsigned long ms);

#include "movement_sequences.h"
#include "captive_portal.h"

// ─── Network config ───────────────────────────────────────────────
#define AP_SSID  "RonnieControl"
#define AP_PASS  "Big67Mac!"
#define DNS_PORT 53

// ─── Tunable globals (extern-declared in movement_sequences.h) ────
int frameDelay       = 100;
int walkCycles       = 10;
int motorCurrentDelay = 20;

// ─── Subtrim: per-servo angle offset (±90°) ──────────────────────
int8_t servoSubtrim[8] = {0, 0, 0, 0, 0, 0, 0, 0};

// ─── Command state (extern-declared in movement_sequences.h) ──────
String currentCommand = "";

// ─── Hardware ─────────────────────────────────────────────────────
Adafruit_PWMServoDriver pwm(SERVO_SHIELD_ADDR);
WebServer server(80);
DNSServer dnsServer;

// ─── Cooperative delay ────────────────────────────────────────────
// Replaces delayWithFace(): keeps HTTP/DNS alive during pose waits.
void cooperativeDelay(unsigned long ms) {
  unsigned long start = millis();
  while (millis() - start < ms) {
    server.handleClient();
    dnsServer.processNextRequest();
    delay(5);
  }
}

// ─── Servo control ────────────────────────────────────────────────
void setServoAngle(uint8_t ch, int angle) {
  if (ch >= 8) return;
  int adj = constrain(angle + servoSubtrim[ch], 0, 180);
  pwm.writeMicroseconds(MOTOR_CHANNELS[ch],
                        (uint16_t)map(adj, 0, 180, SERVO_MIN_US, SERVO_MAX_US));
  cooperativeDelay(motorCurrentDelay);
}

// ─── pressingCheck ────────────────────────────────────────────────
// Used by continuous movement loops. Polls during the wait; if the
// command changes (D-pad released), commands stand and returns false
// so the gait loop exits rather than leaving the robot mid-stride.
bool pressingCheck(String cmd, unsigned long ms) {
  unsigned long start = millis();
  while (millis() - start < ms) {
    server.handleClient();
    dnsServer.processNextRequest();
    if (currentCommand != cmd) {
      runStandPose(1);
      return false;
    }
    yield();
  }
  return true;
}

// ─── HTTP handlers ────────────────────────────────────────────────

void handleRoot() {
  server.send(200, "text/html", index_html);
}

// GET /cmd?go=forward|backward|left|right|stop
// GET /cmd?pose=wave|dance|...
// GET /cmd?motor=N&value=V  (N: 1-based index or name like "R1")
void handleCommandWeb() {
  if (server.hasArg("pose")) {
    currentCommand = server.arg("pose");
    server.send(200, "text/plain", "OK");
  } else if (server.hasArg("go")) {
    currentCommand = server.arg("go");
    server.send(200, "text/plain", "OK");
  } else if (server.hasArg("stop")) {
    currentCommand = "";
    server.send(200, "text/plain", "OK");
  } else if (server.hasArg("motor") && server.hasArg("value")) {
    int motorNum = server.arg("motor").toInt();
    int servoIdx = servoNameToIndex(server.arg("motor"));
    int angle    = server.arg("value").toInt();
    if (motorNum >= 1 && motorNum <= 8 && angle >= 0 && angle <= 180) {
      setServoAngle(motorNum - 1, angle);
      server.send(200, "text/plain", "OK");
    } else if (servoIdx != -1 && angle >= 0 && angle <= 180) {
      setServoAngle(servoIdx, angle);
      server.send(200, "text/plain", "OK");
    } else {
      server.send(400, "text/plain", "Invalid motor or angle");
    }
  } else {
    server.send(400, "text/plain", "Bad Args");
  }
}

// GET /getSettings → {"frameDelay":100,"walkCycles":10,"motorCurrentDelay":20}
void handleGetSettings() {
  String json = "{";
  json += "\\"frameDelay\\":" + String(frameDelay) + ",";
  json += "\\"walkCycles\\":" + String(walkCycles) + ",";
  json += "\\"motorCurrentDelay\\":" + String(motorCurrentDelay);
  json += "}";
  server.send(200, "application/json", json);
}

// GET /setSettings?frameDelay=X&walkCycles=Y&motorCurrentDelay=Z
void handleSetSettings() {
  if (server.hasArg("frameDelay"))        { int v = server.arg("frameDelay").toInt();        frameDelay        = v > 0 ? v : 1; }
  if (server.hasArg("walkCycles"))        { int v = server.arg("walkCycles").toInt();        walkCycles        = v > 0 ? v : 1; }
  if (server.hasArg("motorCurrentDelay")) { int v = server.arg("motorCurrentDelay").toInt(); motorCurrentDelay = v >= 0 ? v : 0; }
  server.send(200, "text/plain", "OK");
}

// GET /api/status → {"currentCommand":"...","apIP":"192.168.4.1"}
void handleGetStatus() {
  String json = "{";
  json += "\\"currentCommand\\":\\"" + currentCommand + "\\",";
  json += "\\"apIP\\":\\"" + WiFi.softAPIP().toString() + "\\"";
  json += "}";
  server.send(200, "application/json", json);
}

// POST /api/command  body: {"command":"wave"} or {"face":"happy"} (face ignored)
void handleApiCommand() {
  if (server.method() != HTTP_POST) {
    server.send(405, "application/json", "{\\"error\\":\\"Method not allowed\\"}");
    return;
  }
  String body = server.arg("plain");

  bool hasFace    = (body.indexOf("\\"face\\":\\"") != -1 || body.indexOf("\\"face\\": \\"") != -1);
  bool hasCommand = (body.indexOf("\\"command\\":") != -1 || body.indexOf("\\"command\\": ") != -1);
  bool faceOnly   = hasFace && !hasCommand;

  if (faceOnly) {
    server.send(200, "application/json", "{\\"status\\":\\"ok\\"}");
    return;
  }

  if (!hasCommand) {
    server.send(400, "application/json", "{\\"error\\":\\"Missing command field\\"}");
    return;
  }

  int cmdStart = body.indexOf("\\"command\\":\\"");
  if (cmdStart == -1) cmdStart = body.indexOf("\\"command\\": \\"");
  if (cmdStart == -1) {
    server.send(400, "application/json", "{\\"error\\":\\"Invalid command format\\"}");
    return;
  }
  cmdStart = body.indexOf("\\"", cmdStart + 10) + 1;
  int cmdEnd = body.indexOf("\\"", cmdStart);
  if (cmdEnd <= cmdStart) {
    server.send(400, "application/json", "{\\"error\\":\\"Invalid command format\\"}");
    return;
  }
  String command = body.substring(cmdStart, cmdEnd);
  currentCommand = (command == "stop") ? "" : command;
  server.send(200, "application/json", "{\\"status\\":\\"ok\\"}");
}

// ─── Setup ────────────────────────────────────────────────────────
void setup() {
  Serial.begin(115200);

  // PCA9685 init
  Wire.begin(SERVO_SHIELD_SDA, SERVO_SHIELD_SCL);
  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(SERVO_FREQ_HZ);
  delay(10);

  // WiFi access point
  WiFi.mode(WIFI_AP);
  WiFi.softAP(AP_SSID, AP_PASS);
  IPAddress myIP = WiFi.softAPIP();
  Serial.println("AP: " + String(AP_SSID) + "  IP: " + myIP.toString());
  Serial.print(F("Password: ")); Serial.println(AP_PASS);

  // Captive portal DNS: redirect any domain → robot IP
  dnsServer.start(DNS_PORT, "*", myIP);

  // HTTP routes
  server.on("/",             handleRoot);
  server.on("/cmd",          handleCommandWeb);
  server.on("/getSettings",  handleGetSettings);
  server.on("/setSettings",  handleSetSettings);
  server.on("/api/status",   handleGetStatus);
  server.on("/api/command",  handleApiCommand);
  server.onNotFound(handleRoot);
  server.begin();

  Serial.println(F("Ready."));
}

// ─── Loop ─────────────────────────────────────────────────────────
void loop() {
  dnsServer.processNextRequest();
  server.handleClient();

  if (currentCommand != "") {
    String cmd = currentCommand;
    if      (cmd == "forward")  runWalkPose();
    else if (cmd == "backward") runWalkBackward();
    else if (cmd == "left")     runTurnLeft();
    else if (cmd == "right")    runTurnRight();
    else if (cmd == "rest")     { runRestPose();   if (currentCommand == "rest")  currentCommand = ""; }
    else if (cmd == "stand")    { runStandPose(1); if (currentCommand == "stand") currentCommand = ""; }
    else if (cmd == "wave")     runWavePose();
    else if (cmd == "dance")    runDancePose();
    else if (cmd == "swim")     runSwimPose();
    else if (cmd == "point")    runPointPose();
    else if (cmd == "pushup")   runPushupPose();
    else if (cmd == "bow")      runBowPose();
    else if (cmd == "cute")     runCutePose();
    else if (cmd == "freaky")   runFreakyPose();
    else if (cmd == "worm")     runWormPose();
    else if (cmd == "shake")    runShakePose();
    else if (cmd == "shrug")    runShrugPose();
    else if (cmd == "dead")     runDeadPose();
    else if (cmd == "crab")     runCrabPose();
  }

  // ─── Serial CLI ───────────────────────────────────────────────
  if (Serial.available()) {
    static char buf[32];
    static byte pos = 0;
    char c = Serial.read();
    if (c == '\\n' || c == '\\r') {
      if (pos > 0) {
        buf[pos] = '\\0';
        int m, a;
        if      (strcmp(buf, "rn wf") == 0 || strcmp(buf, "run walk") == 0)  { currentCommand = "forward";  runWalkPose();     currentCommand = ""; }
        else if (strcmp(buf, "rn wb") == 0)                                  { currentCommand = "backward"; runWalkBackward(); currentCommand = ""; }
        else if (strcmp(buf, "rn tl") == 0)                                  { currentCommand = "left";     runTurnLeft();     currentCommand = ""; }
        else if (strcmp(buf, "rn tr") == 0)                                  { currentCommand = "right";    runTurnRight();    currentCommand = ""; }
        else if (strcmp(buf, "rn rs") == 0 || strcmp(buf, "run rest")  == 0) runRestPose();
        else if (strcmp(buf, "rn st") == 0 || strcmp(buf, "run stand") == 0) runStandPose(1);
        else if (strcmp(buf, "rn wv") == 0) runWavePose();
        else if (strcmp(buf, "rn dn") == 0) runDancePose();
        else if (strcmp(buf, "rn sw") == 0) runSwimPose();
        else if (strcmp(buf, "rn pt") == 0) runPointPose();
        else if (strcmp(buf, "rn pu") == 0) runPushupPose();
        else if (strcmp(buf, "rn bw") == 0) runBowPose();
        else if (strcmp(buf, "rn ct") == 0) runCutePose();
        else if (strcmp(buf, "rn fk") == 0) runFreakyPose();
        else if (strcmp(buf, "rn wm") == 0) runWormPose();
        else if (strcmp(buf, "rn sk") == 0) runShakePose();
        else if (strcmp(buf, "rn sg") == 0) runShrugPose();
        else if (strcmp(buf, "rn dd") == 0) runDeadPose();
        else if (strcmp(buf, "rn cb") == 0) runCrabPose();
        else if (strcmp(buf, "rn sd") == 0) { currentCommand = ""; runStandPose(1); }
        else if (strncmp(buf, "all ", 4) == 0) {
          if (sscanf(buf + 4, "%d", &a) == 1) {
            for (int i = 0; i < 8; i++) setServoAngle(i, a);
          }
        }
        else if (sscanf(buf, "%d %d", &m, &a) == 2 && m >= 0 && m < 8) {
          setServoAngle(m, a);
        }
        pos = 0;
      }
    } else if (pos < (byte)(sizeof(buf) - 1)) {
      buf[pos++] = c;
    }
  }
}`;

export default RONNIE_CODE;
