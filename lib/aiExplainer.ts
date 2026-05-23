// AIExplanationResponse type for Ronnie's AI fallback system

export interface AIExplanationResponse {
  title: string;
  beginnerExplanation: string;
  advancedExplanation: string;
  relatedHardware: string[];
  tags: string[];
}

const AI_CACHE_PREFIX = 'ronnie_ai_cache_';

export function getCachedExplanation(lineNumber: number, codeHash: string): AIExplanationResponse | null {
  try {
    const key = `${AI_CACHE_PREFIX}${lineNumber}_${codeHash}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // localStorage not available
  }
  return null;
}

export function setCachedExplanation(lineNumber: number, codeHash: string, data: AIExplanationResponse): void {
  try {
    const key = `${AI_CACHE_PREFIX}${lineNumber}_${codeHash}`;
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // localStorage not available
  }
}

export function getLineContext(code: string, lineNumber: number, contextSize: number = 5): string {
  const lines = code.split('\n');
  const start = Math.max(0, lineNumber - 1 - contextSize);
  const end = Math.min(lines.length, lineNumber + contextSize);
  const contextLines = lines.slice(start, end).map((line, i) => {
    const actualLine = start + i + 1;
    const marker = actualLine === lineNumber ? '>>> ' : '    ';
    return `${marker}${actualLine}: ${line}`;
  });
  return contextLines.join('\n');
}

export function hashCode(str: string): string {
  let hash = 0;
  for (let i = 0; i < Math.min(str.length, 100); i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export async function fetchAIExplanation(
  code: string,
  lineNumber: number,
  lineContent: string
): Promise<AIExplanationResponse> {
  const context = getLineContext(code, lineNumber);
  const codeHash = hashCode(lineContent);

  const cached = getCachedExplanation(lineNumber, codeHash);
  if (cached) return cached;

  const response = await fetch('/api/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, lineNumber, lineContent, context }),
  });

  if (!response.ok) {
    throw new Error('AI explanation failed');
  }

  const data = await response.json();
  setCachedExplanation(lineNumber, codeHash, data);
  return data;
}
