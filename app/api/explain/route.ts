import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('[Ronnie AI] GEMINI_API_KEY is not set');
    return NextResponse.json(
      { error: 'API key not configured', answer: 'AI tutor is not configured. Please set GEMINI_API_KEY in .env.local.' },
      { status: 500 }
    );
  }

  let body: {
    code?: string;
    lineNumber?: number;
    lineContent?: string;
    context?: string;
    question?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { code, lineNumber, lineContent, context, question } = body;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

  try {
    let prompt: string;

    if (question) {
      // AI Assistant panel question
      prompt = `You are Ronnie's friendly robotics tutor. A student is learning embedded systems and robotics through a quadruped robot called Ronnie that runs on an ESP32 microcontroller with a PCA9685 servo driver and 8 servo motors.

The student asks: "${question}"

Here is the full code for context:
\`\`\`cpp
${code}
\`\`\`

Provide a friendly, beginner-focused answer (2-4 sentences). Mention real hardware components when relevant. End with an encouraging sentence. Avoid jargon unless you explain it.`;

      const result = await model.generateContent(prompt);
      const answer = result.response.text();
      return NextResponse.json({ answer });

    } else {
      // Hover explanation for a specific line
      prompt = `You are Ronnie's friendly robotics tutor. A student is learning embedded systems through a quadruped robot (Ronnie) running on an ESP32 + PCA9685 servo driver.

The student hovered over line ${lineNumber} of Ronnie's Arduino/C++ code.

Code context:
\`\`\`cpp
${context}
\`\`\`

The specific line is: \`${lineContent}\`

Respond ONLY with a valid JSON object (no markdown fences, no extra text before or after):
{
  "title": "Short descriptive title (3-6 words)",
  "beginnerExplanation": "1-2 sentences, beginner-friendly. Explain what this code does and how it affects Ronnie physically. Use simple language and relatable analogies.",
  "advancedExplanation": "2-3 sentences with technical depth: registers, protocols, electrical signals, or timing details.",
  "relatedHardware": ["array", "of", "hardware", "component", "names"],
  "tags": ["concept", "tag", "array"]
}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();

      // Strip any accidental markdown fences
      const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

      // Extract first JSON object
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('[Ronnie AI] Could not find JSON in response:', text.slice(0, 200));
        throw new Error('No JSON found in AI response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return NextResponse.json(parsed);
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[Ronnie AI] Gemini API error:', message);

    // Return a helpful fallback (not the generic "check API key" one)
    return NextResponse.json(
      {
        title: 'AI Explanation Unavailable',
        beginnerExplanation: `This line of Ronnie's code couldn't be analyzed right now (${message.slice(0, 80)}). Try hovering a highlighted line (cyan border) for an instant explanation!`,
        advancedExplanation: `Error detail: ${message}`,
        relatedHardware: ['ESP32'],
        tags: ['Arduino', 'C++'],
      },
      { status: 200 }
    );
  }
}
