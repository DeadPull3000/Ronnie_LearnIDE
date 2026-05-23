export interface LineExplanation {
  title: string;
  beginnerExplanation: string;
  advancedExplanation: string;
  relatedHardware: string[];
  tags: string[];
  robotPart?: 'front-left' | 'front-right' | 'rear-left' | 'rear-right' | 'all-legs' | 'body' | 'esp32' | 'pca9685' | 'servo';
  signalFlow?: string[];
}

// Map of line number (1-indexed) to explanation
const explanations: Record<number, LineExplanation> = {
  1: {
    title: "WiFi Library — Wireless Networking",
    beginnerExplanation: "This line brings in WiFi superpowers for Ronnie's brain (the ESP32 chip). It's like installing a wireless radio so Ronnie can talk to your phone or laptop over the air — no cables needed!",
    advancedExplanation: "The ESP32's built-in WiFi stack (802.11 b/g/n) is exposed through the Arduino WiFi.h library. This enables station (STA) mode for connecting to existing networks, or Access Point (AP) mode for creating its own network — which Ronnie uses.",
    relatedHardware: ["ESP32"],
    tags: ["WiFi", "Networking", "ESP32"],
    robotPart: "esp32",
    signalFlow: ["ESP32 WiFi Radio", "802.11 b/g/n", "Your Phone/Browser"]
  },
  2: {
    title: "WebServer Library — HTTP Control Interface",
    beginnerExplanation: "This gives Ronnie its own mini-website! When you connect to Ronnie's WiFi, you visit its built-in web page to send movement commands. Think of it like a tiny web server living inside the robot.",
    advancedExplanation: "WebServer.h implements an HTTP/1.1 server directly on the ESP32. It handles GET/POST requests on port 80, enabling RESTful control endpoints like /cmd?go=forward. Runs cooperatively in the main loop — no RTOS required.",
    relatedHardware: ["ESP32"],
    tags: ["HTTP", "WebServer", "REST API", "Control Interface"],
    robotPart: "esp32"
  },
  3: {
    title: "DNS Server — Captive Portal Magic",
    beginnerExplanation: "This is the magic trick that makes Ronnie's website pop up automatically when you connect to its WiFi! Without this, you'd have to type an IP address. DNSServer makes ANY web address redirect to Ronnie.",
    advancedExplanation: "DNSServer implements a DNS resolver that answers ALL queries with the ESP32's IP address (wildcard DNS). Combined with OS captive portal detection, this triggers automatic browser pop-ups on most modern operating systems.",
    relatedHardware: ["ESP32"],
    tags: ["DNS", "Captive Portal", "UX", "Networking"],
    robotPart: "esp32"
  },
  4: {
    title: "Wire Library — I2C Communication Bus",
    beginnerExplanation: "I2C is a two-wire communication language that the ESP32 uses to talk to the servo controller chip (PCA9685). With just 2 wires (SDA for data, SCL for clock), Ronnie's brain can control all 8 servos simultaneously!",
    advancedExplanation: "Wire.h wraps the ESP32's I2C peripheral (I2C0/I2C1). The I2C protocol uses a master-slave architecture with 7-bit addressing. PCA9685 responds at address 0x40 (default). SCL clocks up to 400kHz (Fast Mode), allowing rapid servo updates.",
    relatedHardware: ["ESP32", "PCA9685"],
    tags: ["I2C", "Communication Protocol", "SDA/SCL", "Bus"],
    robotPart: "pca9685",
    signalFlow: ["ESP32 (I2C Master)", "SDA + SCL wires", "PCA9685 (I2C Slave, addr 0x40)"]
  },
  5: {
    title: "PCA9685 Library — PWM Servo Controller",
    beginnerExplanation: "The PCA9685 is a special chip that acts as a 'servo traffic controller'. Ronnie's ESP32 brain tells it over I2C: 'move servo 3 to 90 degrees!' and the PCA9685 generates the exact electrical signal to make that happen.",
    advancedExplanation: "Adafruit_PWMServoDriver wraps the PCA9685 I2C PWM controller (16 channels, 12-bit resolution). It handles register writes for PWM duty cycle. Each channel can independently control a servo with 4096 PWM steps.",
    relatedHardware: ["PCA9685", "Servo Motors"],
    tags: ["PWM", "PCA9685", "Servo Driver", "I2C"],
    robotPart: "pca9685",
    signalFlow: ["PCA9685 Register", "PWM Signal", "Servo Motor"]
  },
  20: {
    title: "AP_SSID — WiFi Network Name",
    beginnerExplanation: "This defines the name of Ronnie's WiFi network — 'RonnieControl'. When you look for WiFi networks on your phone, you'll see this name appear! You connect to it just like any normal WiFi.",
    advancedExplanation: "AP_SSID configures the SSID (Service Set Identifier) for the ESP32's software Access Point. The ESP32 broadcasts beacon frames with this SSID so devices can discover and connect to Ronnie's network.",
    relatedHardware: ["ESP32"],
    tags: ["WiFi", "SSID", "Access Point", "Configuration"],
    robotPart: "esp32"
  },
  24: {
    title: "frameDelay — Gait Timing Control",
    beginnerExplanation: "This number (100ms) controls how fast Ronnie moves between leg positions when walking. Think of it like animation frames per second — smaller number = faster movement, bigger = slower and smoother. It's the robot's movement rhythm!",
    advancedExplanation: "frameDelay is the inter-frame pause in milliseconds between servo position updates during gait sequences. Lower values increase gait frequency but may cause servo torque issues. Optimal range for quadruped gaits is 50-200ms depending on servo specs.",
    relatedHardware: ["Servo Motors", "ESP32"],
    tags: ["Gait", "Timing", "Animation", "Walking"],
    robotPart: "all-legs"
  },
  25: {
    title: "walkCycles — Walking Step Count",
    beginnerExplanation: "This tells Ronnie how many complete walking steps to take when given a 'walk' command. It's like telling someone: 'take 10 steps forward'. More cycles = longer walking distance per command.",
    advancedExplanation: "walkCycles defines the iteration count for gait loops in movement_sequences.h. A 'cycle' typically represents one complete left-right leg alternation. Tunable at runtime via /setSettings HTTP endpoint.",
    relatedHardware: ["Servo Motors"],
    tags: ["Gait", "Walking", "Configuration", "Loop Control"],
    robotPart: "all-legs"
  },
  26: {
    title: "motorCurrentDelay — Servo Safety Delay",
    beginnerExplanation: "After each servo moves, Ronnie waits 20 milliseconds before moving the next one. This prevents all servos from demanding maximum power at exactly the same moment — which could blow a fuse or reset the ESP32!",
    advancedExplanation: "Sequential servo activation with motorCurrentDelay prevents inrush current spikes. Servo motors draw 5-10x their rated current at stall. Staggered activation with 20ms delays keeps peak current within the power supply's continuous rating.",
    relatedHardware: ["Servo Motors", "Power Supply"],
    tags: ["Current Management", "Servo", "Safety", "Power"],
    robotPart: "servo"
  },
  29: {
    title: "servoSubtrim — Per-Servo Calibration Offsets",
    beginnerExplanation: "Real-world servos aren't perfect — a servo told to go to 90° might actually stop at 87° or 93°. Subtrim lets you add small corrections for each individual servo so all of Ronnie's legs are perfectly balanced!",
    advancedExplanation: "servoSubtrim[8] stores signed 8-bit angular offsets (±90°) per channel. Applied in setServoAngle() via constrain(angle + servoSubtrim[ch], 0, 180). Essential for mechanical calibration in multi-servo systems where manufacturing tolerances stack.",
    relatedHardware: ["Servo Motors", "PCA9685"],
    tags: ["Calibration", "Subtrim", "Mechanical", "Precision"],
    robotPart: "all-legs"
  },
  32: {
    title: "currentCommand — Robot Command State",
    beginnerExplanation: "This variable holds whatever Ronnie is supposed to be doing right now — like 'forward', 'wave', or 'dance'. The main loop checks it every millisecond and keeps doing that action until it changes. It's Ronnie's 'current task'.",
    advancedExplanation: "currentCommand is a shared state string between the HTTP handlers and the main control loop — an event-driven pattern without true interrupts. HTTP handler functions write to it; loop() reads and dispatches. No mutex needed due to single-threaded cooperative scheduling.",
    relatedHardware: ["ESP32"],
    tags: ["State Machine", "Control Flow", "Command Dispatch"],
    robotPart: "esp32"
  },
  35: {
    title: "Adafruit_PWMServoDriver — PCA9685 Instance",
    beginnerExplanation: "This creates the software representation of the PCA9685 servo controller chip. SERVO_SHIELD_ADDR is its I2C address (like a house number on the I2C bus). Now the ESP32 knows exactly who to talk to when controlling servos!",
    advancedExplanation: "Instantiates the Adafruit_PWMServoDriver class with the I2C address (typically 0x40). The address pins on PCA9685 can be shorted to set addresses 0x40–0x7F, allowing up to 62 boards on one I2C bus — 992 servo channels!",
    relatedHardware: ["PCA9685", "ESP32"],
    tags: ["PCA9685", "I2C Address", "Initialization", "PWM"],
    robotPart: "pca9685"
  },
  36: {
    title: "WebServer server(80) — HTTP Server on Port 80",
    beginnerExplanation: "Port 80 is the standard port for web traffic — it's why you don't need to type ':80' when visiting websites. This line creates Ronnie's web server listening on that standard port so any browser can connect to it.",
    advancedExplanation: "WebServer server(80) binds the HTTP server to TCP port 80. The ESP32 lwIP stack handles TCP connection establishment. server.handleClient() in the main loop processes incoming HTTP requests synchronously.",
    relatedHardware: ["ESP32"],
    tags: ["HTTP", "TCP", "Port 80", "Web Server"],
    robotPart: "esp32"
  },
  41: {
    title: "cooperativeDelay() — Non-Blocking Delay",
    beginnerExplanation: "Normally, delay() makes the ESP32 completely freeze for a set time — ignoring WiFi! This smarter version checks for incoming commands during the wait, so Ronnie stays responsive to your controls even while moving.",
    advancedExplanation: "cooperativeDelay implements a polling-based cooperative multitasking pattern. Instead of blocking with delay(), it yields control via server.handleClient() and dnsServer.processNextRequest() in a tight loop. This is a common ESP32 pattern when RTOS is overkill.",
    relatedHardware: ["ESP32"],
    tags: ["Cooperative Multitasking", "Non-blocking", "Timing", "WiFi"],
    robotPart: "esp32"
  },
  51: {
    title: "setServoAngle() — Core Servo Control Function",
    beginnerExplanation: "This is the most important function for making Ronnie move! You tell it which servo (0-7) and what angle (0-180°) you want. It converts that angle into PWM pulses and sends it to the PCA9685 to physically move the servo.",
    advancedExplanation: "setServoAngle() performs: bounds check → subtrim correction → constrain to [0,180] → map angle to microsecond pulse width [SERVO_MIN_US, SERVO_MAX_US] → writeMicroseconds() via PCA9685. Standard servo protocol: 1000μs=0°, 1500μs=90°, 2000μs=180°.",
    relatedHardware: ["PCA9685", "Servo Motors", "ESP32"],
    tags: ["PWM", "Servo Control", "Angle Mapping", "Core Function"],
    robotPart: "servo",
    signalFlow: ["ESP32 (angle value)", "PCA9685 writeMicroseconds()", "PWM Signal (1000-2000μs)", "Servo Motor"]
  },
  52: {
    title: "Channel Bounds Check — Safety Guard",
    beginnerExplanation: "Ronnie only has 8 servo channels (0-7). If somehow a channel number of 8 or higher gets requested, this line immediately stops the function before anything bad happens. It's a safety net!",
    advancedExplanation: "Defensive bounds checking prevents out-of-bounds array access on MOTOR_CHANNELS[]. Without this guard, an invalid channel index could corrupt memory adjacent to the array — a classic embedded systems bug. ch >= 8 catches values exceeding the motor_map array size.",
    relatedHardware: ["PCA9685"],
    tags: ["Safety", "Bounds Check", "Error Handling", "Defensive Programming"],
    robotPart: "pca9685"
  },
  53: {
    title: "constrain() — Angle Safety Clamp",
    beginnerExplanation: "Physical servo motors can only rotate between 0° and 180°. The constrain() function acts like bumpers — even if a math error produces -5° or 200°, it gets clamped to the safe range. This protects Ronnie's servos from stripping their gears!",
    advancedExplanation: "constrain(x, min, max) is an Arduino macro equivalent to min(max(x, min), max). After adding the subtrim offset, the angle might exceed [0,180]. Servo motors sent out-of-range pulses can skip gears, stall, or draw excessive current damaging the driver.",
    relatedHardware: ["Servo Motors"],
    tags: ["Safety", "Clamping", "Servo Protection", "Hardware Safety"],
    robotPart: "servo"
  },
  54: {
    title: "writeMicroseconds() — PWM Signal Generation",
    beginnerExplanation: "This sends the actual electrical signal to the servo! Standard servos understand pulse widths: a 1500 microsecond pulse = center position (90°). The map() function converts your angle to the right pulse timing. It's the language servos speak!",
    advancedExplanation: "writeMicroseconds() sets the PWM duty cycle on the PCA9685 channel. At 50Hz (20ms period), a 1500μs pulse gives 7.5% duty cycle. PCA9685's 12-bit counter counts to 4096 per period — SERVO_MIN_US and SERVO_MAX_US are converted to tick counts internally.",
    relatedHardware: ["PCA9685", "Servo Motors"],
    tags: ["PWM", "Microseconds", "Pulse Width", "Servo Protocol"],
    robotPart: "servo",
    signalFlow: ["Angle (degrees)", "map() → microseconds", "PCA9685 PWM register", "Servo Motor pulse"]
  },
  62: {
    title: "pressingCheck() — Continuous Movement Guard",
    beginnerExplanation: "When you hold a D-pad button, Ronnie keeps walking. But what if you let go mid-step? pressingCheck() monitors the button state during a delay. If you release, it safely stands Ronnie up first before stopping — no awkward freezes mid-stride!",
    advancedExplanation: "pressingCheck() implements graceful gait termination. By polling currentCommand during the inter-frame delay and comparing against the expected cmd, it detects command changes with ~1ms latency. On mismatch, runStandPose(1) ensures the robot ends in a safe, stable pose.",
    relatedHardware: ["ESP32", "Servo Motors"],
    tags: ["State Machine", "Gait Control", "Safety", "Real-time Control"],
    robotPart: "all-legs"
  },
  113: {
    title: "Wire.begin() — I2C Bus Initialization",
    beginnerExplanation: "This turns on the I2C communication bus — the two wires that connect the ESP32 to the PCA9685. The SDA and SCL pin numbers tell the ESP32 which of its physical pins to use for this communication channel.",
    advancedExplanation: "Wire.begin(SDA, SCL) initializes the I2C peripheral in master mode with specified GPIO pins. ESP32 supports any GPIO for I2C via its GPIO matrix. SERVO_SHIELD_SDA/SCL are likely defined as pin 21/22 (default) or custom in motor_map.h.",
    relatedHardware: ["ESP32", "PCA9685"],
    tags: ["I2C", "Initialization", "SDA", "SCL", "GPIO"],
    robotPart: "pca9685",
    signalFlow: ["ESP32 GPIO (SDA/SCL)", "I2C Bus", "PCA9685"]
  },
  114: {
    title: "pwm.begin() — PCA9685 Initialization",
    beginnerExplanation: "This wakes up the PCA9685 servo controller chip and tells it to start working! Before this line, the chip is in sleep mode to save power. After it, Ronnie can start sending servo commands.",
    advancedExplanation: "pwm.begin() sends I2C commands to set the PCA9685 MODE1 register: clears SLEEP bit, sets ALLCALL, and waits 500μs for oscillator stabilization. Also resets the prescaler for the default 200Hz before setPWMFreq() overrides it.",
    relatedHardware: ["PCA9685"],
    tags: ["PCA9685", "Initialization", "I2C", "Mode Register"],
    robotPart: "pca9685"
  },
  115: {
    title: "setOscillatorFrequency() — Clock Calibration",
    beginnerExplanation: "The PCA9685 has an internal clock that times the PWM signals. But every chip is slightly different! This line tells the library the exact clock speed (27 MHz) so the pulse timing is accurate. Wrong clock = jittery servos!",
    advancedExplanation: "PCA9685's internal oscillator nominally runs at 25MHz but varies ±5% between chips. setOscillatorFrequency(27000000) calibrates the prescaler calculation. If off, setPWMFreq() will generate incorrect output frequencies causing servo jitter or miscalibrated angles.",
    relatedHardware: ["PCA9685"],
    tags: ["Oscillator", "Calibration", "PWM Frequency", "Precision"],
    robotPart: "pca9685"
  },
  116: {
    title: "setPWMFreq() — Servo Signal Rate",
    beginnerExplanation: "Standard servo motors need to receive an update signal exactly 50 times per second (50 Hz = 20ms intervals). This line configures the PCA9685 to send signals at that exact rate. Too fast or slow and servos won't respond properly!",
    advancedExplanation: "setPWMFreq(SERVO_FREQ_HZ) sets the PCA9685 prescaler register: prescaler = round(osc_freq / (4096 * freq)) - 1. For 50Hz with 27MHz osc: prescaler = round(27M / (4096×50)) - 1 = 130. This gives exactly 20ms period for the standard servo pulse window.",
    relatedHardware: ["PCA9685", "Servo Motors"],
    tags: ["PWM Frequency", "50Hz", "Servo Standard", "PCA9685"],
    robotPart: "servo",
    signalFlow: ["PCA9685 Prescaler", "50Hz PWM", "Servo Signal"]
  },
  120: {
    title: "WiFi.mode(WIFI_AP) — Access Point Mode",
    beginnerExplanation: "Instead of connecting TO a WiFi network, Ronnie CREATES one! This line switches the ESP32 into 'Access Point' mode — now your phone can connect directly to Ronnie, no router needed. It's like Ronnie becoming its own WiFi hotspot!",
    advancedExplanation: "WIFI_AP mode puts the ESP32 into SoftAP (Software Access Point) mode. Unlike WIFI_STA (station) which connects to existing networks, WIFI_AP creates an independent BSS (Basic Service Set). The ESP32 can simultaneously run WIFI_AP_STA for dual-mode operation.",
    relatedHardware: ["ESP32"],
    tags: ["WiFi", "Access Point", "SoftAP", "Hotspot"],
    robotPart: "esp32"
  },
  121: {
    title: "WiFi.softAP() — Network Broadcasting",
    beginnerExplanation: "This actually turns on Ronnie's WiFi hotspot with the name 'RonnieControl' and the password! After this line runs, you'll see Ronnie's network appear in your phone's WiFi list within a few seconds.",
    advancedExplanation: "softAP() configures the ESP32's AP parameters: SSID, password (WPA2-PSK), channel (1-13), hidden (false), max_connection (default 4). Internally sets the DHCP server to hand out IPs in the 192.168.4.x range, with the ESP32 at 192.168.4.1.",
    relatedHardware: ["ESP32"],
    tags: ["WiFi", "SoftAP", "WPA2", "DHCP"],
    robotPart: "esp32"
  },
  125: {
    title: "dnsServer.start() — Captive Portal DNS",
    beginnerExplanation: "This is the magic trick! When you're connected to Ronnie's WiFi and open any website, this DNS server intercepts the request and redirects you to Ronnie's control page. It's how you get the automatic pop-up without typing an IP address!",
    advancedExplanation: "dnsServer.start() with wildcard '*' makes the ESP32 respond to ALL DNS queries with myIP. When a connected device tries to visit google.com, it gets Ronnie's IP instead. iOS/Android use captive portal detection (checking connectivity to Apple/Google servers) which triggers the automatic browser pop-up.",
    relatedHardware: ["ESP32"],
    tags: ["DNS", "Captive Portal", "Wildcard DNS", "UX"],
    robotPart: "esp32"
  },
  143: {
    title: "loop() — Main Robot Brain",
    beginnerExplanation: "The loop() function runs over and over again, forever, as long as Ronnie is powered on — thousands of times per second! It's like Ronnie's heartbeat. Every loop: check for WiFi commands, check current action, keep doing that action.",
    advancedExplanation: "Arduino's loop() runs on a single core of the ESP32 in a super-loop architecture. The ESP32 runs FreeRTOS internally, but the Arduino framework runs this loop() in one FreeRTOS task. No preemption occurs within loop() — cooperative scheduling via cooperativeDelay handles multitasking.",
    relatedHardware: ["ESP32"],
    tags: ["Main Loop", "Control Architecture", "Real-time", "Super-loop"],
    robotPart: "esp32"
  },
  149: {
    title: "runWalkPose() — Forward Walking Gait",
    beginnerExplanation: "This triggers Ronnie's walking animation! A quadruped walking gait moves legs in a specific order so the robot stays balanced: front-right and rear-left move together, then front-left and rear-right. It's the same pattern dogs use to walk!",
    advancedExplanation: "runWalkPose() likely implements a diagonal-pair trot gait (most energy-efficient for quadrupeds). In trot gait, legs are grouped as diagonal pairs: FL+RR and FR+RL. Each pair swings while the other stance supports body weight. Controlled by frameDelay and walkCycles.",
    relatedHardware: ["Servo Motors", "All Legs"],
    tags: ["Gait", "Walking", "Quadruped", "Locomotion"],
    robotPart: "all-legs"
  },
  151: {
    title: "runTurnLeft() — Left Turn Gait",
    beginnerExplanation: "To turn left, Ronnie's right-side legs push harder than the left-side legs. This asymmetric stepping makes the robot rotate in place! It's similar to how a tank turns — one track goes faster than the other.",
    advancedExplanation: "Differential-drive turning in a quadruped: the right legs (FR, RR) step with larger swing amplitude and stride length than left legs (FL, RL). Net effect is lateral body rotation. Alternatively implemented as pivot: right legs provide thrust, left legs step in place.",
    relatedHardware: ["Servo Motors"],
    tags: ["Gait", "Turning", "Differential Drive", "Locomotion"],
    robotPart: "all-legs"
  },
  157: {
    title: "runWavePose() — Wave Gesture",
    beginnerExplanation: "One of Ronnie's fun tricks! The wave pose lifts a front leg and oscillates it up and down to wave hello. This shows that Ronnie's code goes way beyond just walking — it can do expressive gestures too!",
    advancedExplanation: "Wave pose is a static-dynamic sequence: first servo positions for stable 3-point stance (3 legs on ground), then oscillates the designated wave servo between two angles (e.g., 45° and 135°) for N cycles using a time-parameterized sine interpolation.",
    relatedHardware: ["Servo Motors"],
    tags: ["Pose", "Gesture", "Expression", "Single Leg"],
    robotPart: "front-right"
  },
  158: {
    title: "runDancePose() — Dance Sequence",
    beginnerExplanation: "Ronnie can dance! The dance routine is a pre-programmed sequence of poses and movements strung together. It's like a tiny choreographed robot dance performance — showing that robots can be playful and expressive!",
    advancedExplanation: "Dance is a multi-phase keyframe animation sequence: a series of setServoAngle() calls with timed transitions between body poses. Implementation likely uses arrays of servo positions (keyframes) iterated with cooperativeDelay between frames.",
    relatedHardware: ["Servo Motors"],
    tags: ["Animation", "Keyframe", "Expression", "Multi-servo"],
    robotPart: "all-legs"
  }
};

export default explanations;
