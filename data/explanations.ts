export interface LineExplanation {
  title: string;
  beginnerExplanation: string;
  advancedExplanation: string;
  relatedHardware: string[];
  tags: string[];
  robotPart?: 'front-left' | 'front-right' | 'rear-left' | 'rear-right' | 'all-legs' | 'body' | 'esp32' | 'pca9685' | 'servo';
  signalFlow?: string[];
}

const explanations: Record<number, LineExplanation> = {
  6: {
      "title": "Library Import",
      "beginnerExplanation": "This loads special instructions so Ronnie knows how to talk to its parts.",
      "advancedExplanation": "Includes an external C++ header file for additional functionality.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Include",
          "Library"
      ],
      "robotPart": "esp32"
  },
  8: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  9: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  10: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  11: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  12: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  14: {
      "title": "Library Import",
      "beginnerExplanation": "This loads special instructions so Ronnie knows how to talk to its parts.",
      "advancedExplanation": "Includes an external C++ header file for additional functionality.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Include",
          "Library"
      ],
      "robotPart": "esp32"
  },
  15: {
      "title": "Library Import",
      "beginnerExplanation": "This loads special instructions so Ronnie knows how to talk to its parts.",
      "advancedExplanation": "Includes an external C++ header file for additional functionality.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Include",
          "Library"
      ],
      "robotPart": "esp32"
  },
  17: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  18: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  19: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  22: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  23: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  27: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  28: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  30: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  31: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  33: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  34: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  38: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  39: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  40: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  42: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  43: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  44: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  45: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  49: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  50: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  55: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  58: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  59: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  60: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  61: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  63: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  64: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  65: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  66: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  67: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  68: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  69: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  71: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  73: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  76: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  78: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  79: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  82: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  83: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  84: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  85: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  86: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  87: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  88: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  89: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  90: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  91: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  92: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  93: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  94: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  95: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  96: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  97: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  98: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  99: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  100: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  101: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  102: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  103: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  104: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  105: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  106: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  108: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  109: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  117: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  118: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  119: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  123: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  124: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  126: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  127: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  128: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  131: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  132: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  133: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  134: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  135: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  136: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  137: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  140: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  141: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  142: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  144: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  146: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  148: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  150: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  152: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  153: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  154: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  159: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  162: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  163: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  164: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  165: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  166: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  168: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  169: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  170: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  171: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  172: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  174: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  175: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  176: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  179: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  180: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  181: {
      "title": "Serial Communication",
      "beginnerExplanation": "This lets Ronnie send text messages back to the computer screen via USB.",
      "advancedExplanation": "Uses UART to transmit characters to the host machine.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Serial",
          "UART",
          "Debugging"
      ],
      "robotPart": "esp32"
  },
  183: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  184: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  185: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  186: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  187: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  188: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  190: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  191: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  192: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  193: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  194: {
      "title": "Serial Communication",
      "beginnerExplanation": "This lets Ronnie send text messages back to the computer screen via USB.",
      "advancedExplanation": "Uses UART to transmit characters to the host machine.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Serial",
          "UART",
          "Debugging"
      ],
      "robotPart": "esp32"
  },
  195: {
      "title": "Serial Communication",
      "beginnerExplanation": "This lets Ronnie send text messages back to the computer screen via USB.",
      "advancedExplanation": "Uses UART to transmit characters to the host machine.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Serial",
          "UART",
          "Debugging"
      ],
      "robotPart": "esp32"
  },
  197: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  198: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  200: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  201: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  202: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  203: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  204: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  205: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  206: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  207: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  208: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  210: {
      "title": "Serial Communication",
      "beginnerExplanation": "This lets Ronnie send text messages back to the computer screen via USB.",
      "advancedExplanation": "Uses UART to transmit characters to the host machine.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Serial",
          "UART",
          "Debugging"
      ],
      "robotPart": "esp32"
  },
  213: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  214: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  215: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  216: {
      "title": "Web Server Command",
      "beginnerExplanation": "This talks to Ronnie's built-in website.",
      "advancedExplanation": "Handles HTTP requests and responses via the WebServer class.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "HTTP",
          "Web Server"
      ],
      "robotPart": "esp32"
  },
  218: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  219: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  220: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  221: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  222: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  223: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  224: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  225: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  226: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  227: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  228: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  229: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  230: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  231: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  232: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  233: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  234: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  235: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  236: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  237: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  238: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  241: {
      "title": "Code Comment",
      "beginnerExplanation": "This is a note from the programmer. Ronnie ignores it completely!",
      "advancedExplanation": "C++ single-line comment for documentation.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Comment"
      ],
      "robotPart": "esp32"
  },
  242: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  243: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  244: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  245: {
      "title": "Serial Communication",
      "beginnerExplanation": "This lets Ronnie send text messages back to the computer screen via USB.",
      "advancedExplanation": "Uses UART to transmit characters to the host machine.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Serial",
          "UART",
          "Debugging"
      ],
      "robotPart": "esp32"
  },
  246: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  247: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  248: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  249: {
      "title": "Function Definition",
      "beginnerExplanation": "This is a block of instructions grouped together so Ronnie can do them on command.",
      "advancedExplanation": "Defines a new function with a return type and parameters.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Function",
          "Logic"
      ],
      "robotPart": "esp32"
  },
  250: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  251: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  252: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  253: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  254: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  255: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  256: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  257: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  258: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  259: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  260: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  261: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  262: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  263: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  264: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  265: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  266: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  267: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  268: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  269: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  270: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  271: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  272: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  275: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  276: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  278: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
  280: {
      "title": "Conditional Check",
      "beginnerExplanation": "Ronnie is asking a question here to decide what to do next!",
      "advancedExplanation": "Conditional branch (if/else) altering execution flow based on boolean logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Condition",
          "Flow Control"
      ],
      "robotPart": "esp32"
  },
  281: {
      "title": "C++ Logic",
      "beginnerExplanation": "This line helps Ronnie process information and make decisions.",
      "advancedExplanation": "Standard C++ execution flow. Processes variables and logic.",
      "relatedHardware": [
          "ESP32"
      ],
      "tags": [
          "Logic"
      ],
      "robotPart": "esp32"
  },
};

export default explanations;
