import fs from 'fs';

// Read ronnieCode.ts directly
const ronnieCodeRaw = fs.readFileSync('data/ronnieCode.ts', 'utf8');
const match = ronnieCodeRaw.match(/export const RONNIE_CODE = `([\s\S]*?)`;/);
if (!match) process.exit(1);
const ronnieCode = match[1].split('\n');

// Original explanations to preserve
// Let's just parse the original file manually to keep it easy.
const originalText = fs.readFileSync('data/explanations.ts', 'utf8');

// We will build a new file
let finalFile = 'export interface LineExplanation {\n' +
'  title: string;\n' +
'  beginnerExplanation: string;\n' +
'  advancedExplanation: string;\n' +
'  relatedHardware: string[];\n' +
'  tags: string[];\n' +
'  robotPart?: \'front-left\' | \'front-right\' | \'rear-left\' | \'rear-right\' | \'all-legs\' | \'body\' | \'esp32\' | \'pca9685\' | \'servo\';\n' +
'  signalFlow?: string[];\n' +
'}\n\n' +
'const explanations: Record<number, LineExplanation> = {\n';

// We can extract existing entries by evaluating them (risky with TS, better to compile or regex).
// Let's use a simpler approach: 
// 1. We write a script that imports it. Since it's TS, we can't easily import it in raw Node without ts-node.
// I will just use regex to extract the keys that already exist!
const existingKeys = new Set();
const keyMatches = originalText.matchAll(/^\s+([0-9]+):\s+\{/gm);
for (const k of keyMatches) {
  existingKeys.add(parseInt(k[1]));
}

// We will copy the existing body
const bodyMatch = originalText.match(/const explanations: Record<number, LineExplanation> = \{\n([\s\S]*?)\n\};\n/);
const existingBody = bodyMatch ? bodyMatch[1] : "";

finalFile += existingBody;
if (!existingBody.endsWith(',')) finalFile += ',\n';

let addedCount = 0;

for (let i = 0; i < ronnieCode.length; i++) {
  const lineNum = i + 1;
  if (existingKeys.has(lineNum)) continue;
  
  const line = ronnieCode[i].trim();
  if (line === '' || line === '{' || line === '}') continue;
  
  let title = "C++ Logic";
  let beginner = "This line helps Ronnie process information and make decisions.";
  let advanced = "Standard C++ execution flow. Processes variables and logic.";
  let hardware = ["ESP32"];
  let tags = ["Logic"];
  let robotPart = "esp32";

  if (line.startsWith('#include')) {
    title = "Library Import";
    beginner = "This loads special instructions so Ronnie knows how to talk to its parts.";
    advanced = "Includes an external C++ header file for additional functionality.";
    tags = ["Include", "Library"];
  } else if (line.startsWith('void') || line.startsWith('int') || line.startsWith('bool')) {
    title = "Function Definition";
    beginner = "This is a block of instructions grouped together so Ronnie can do them on command.";
    advanced = "Defines a new function with a return type and parameters.";
    tags = ["Function", "Logic"];
  } else if (line.indexOf('if (') !== -1 || line.indexOf('else if') !== -1) {
    title = "Conditional Check";
    beginner = "Ronnie is asking a question here to decide what to do next!";
    advanced = "Conditional branch (if/else) altering execution flow based on boolean logic.";
    tags = ["Condition", "Flow Control"];
  } else if (line.indexOf('server.') !== -1) {
    title = "Web Server Command";
    beginner = "This talks to Ronnie's built-in website.";
    advanced = "Handles HTTP requests and responses via the WebServer class.";
    tags = ["HTTP", "Web Server"];
  } else if (line.indexOf('Serial.') !== -1) {
    title = "Serial Communication";
    beginner = "This lets Ronnie send text messages back to the computer screen via USB.";
    advanced = "Uses UART to transmit characters to the host machine.";
    tags = ["Serial", "UART", "Debugging"];
  } else if (line.indexOf('//') !== -1) {
    title = "Code Comment";
    beginner = "This is a note from the programmer. Ronnie ignores it completely!";
    advanced = "C++ single-line comment for documentation.";
    tags = ["Comment"];
  }

  const obj = {
    title,
    beginnerExplanation: beginner,
    advancedExplanation: advanced,
    relatedHardware: hardware,
    tags: tags,
    robotPart: robotPart
  };

  finalFile += `  ${lineNum}: ${JSON.stringify(obj, null, 4).replace(/\n/g, '\n  ')},\n`;
  addedCount++;
}

finalFile += '};\n\nexport default explanations;\n';

fs.writeFileSync('data/explanations.ts', finalFile);
console.log(`Successfully added ${addedCount} line explanations!`);
