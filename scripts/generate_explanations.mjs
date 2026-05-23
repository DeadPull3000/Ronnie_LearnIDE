import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDFSAqnwUzfnMAjSMURFeagqDk5d_XijEQ';
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

// Read ronnieCode.ts directly
const ronnieCodeRaw = fs.readFileSync('data/ronnieCode.ts', 'utf8');
// Extract just the code string
const match = ronnieCodeRaw.match(/export const RONNIE_CODE = `([\s\S]*?)`;/);
if (!match) {
  console.error('Could not parse RONNIE_CODE from data/ronnieCode.ts');
  process.exit(1);
}
const ronnieCode = match[1];

function getContext(lines, lineNumber, contextSize = 5) {
  const start = Math.max(0, lineNumber - 1 - contextSize);
  const end = Math.min(lines.length, lineNumber + contextSize);
  const contextLines = lines.slice(start, end).map((line, i) => {
    const actualLine = start + i + 1;
    const marker = actualLine === lineNumber ? '>>> ' : '    ';
    return marker + actualLine + ': ' + line;
  });
  return contextLines.join('\n');
}

async function run() {
  const lines = ronnieCode.split('\n');
  const results = {};
  
  const promptTemplate = fs.readFileSync('scripts/prompt.txt', 'utf8');

  for (let i = 0; i < lines.length; i += 30) {
    const chunkLines = lines.slice(i, i + 30);
    const startIndex = i + 1; // 1-indexed
    const endIndex = startIndex + chunkLines.length - 1;
    
    // Skip chunks of empty lines
    if (chunkLines.join('').trim() === '') continue;
    
    console.log('Processing lines ' + startIndex + ' to ' + endIndex + '...');
    
    let chunkString = '';
    chunkLines.forEach((l, idx) => {
      chunkString += (startIndex + idx) + ': ' + l + '\n';
    });

    const contextChunk = getContext(lines, startIndex + 15, 20);

    const prompt = promptTemplate
        .replace(/START_IDX/g, startIndex.toString())
        .replace(/END_IDX/g, endIndex.toString())
        .replace('CODE_CHUNK', chunkString)
        .replace('CONTEXT_CHUNK', contextChunk);

    try {
      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();
      text = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
      
      const parsed = JSON.parse(text);
      for (const [lineStr, explanation] of Object.entries(parsed)) {
        results[lineStr] = explanation;
      }
      console.log('Chunk success!');
    } catch (e) {
      console.error('Failed chunk ' + startIndex, e.message);
    }
    // Small delay to prevent rate limits
    await new Promise(r => setTimeout(r, 2000));
  }

  // Write to file
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

  for (let i = 1; i <= lines.length; i++) {
    if (results[i]) {
      finalFile += '  ' + i + ': ' + JSON.stringify(results[i], null, 4).replace(/\n/g, '\n  ') + ',\n';
    }
  }

  finalFile += '};\n\n' +
  'export default explanations;\n';

  fs.writeFileSync('data/explanations.ts', finalFile);
  console.log('Done! Wrote explanations to data/explanations.ts');
}

run();
