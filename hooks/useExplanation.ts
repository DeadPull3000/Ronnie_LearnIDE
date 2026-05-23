import { useState, useCallback, useRef } from 'react';
import explanations, { LineExplanation } from '@/data/explanations';
import { fetchAIExplanation, AIExplanationResponse } from '@/lib/aiExplainer';
import RONNIE_CODE from '@/data/ronnieCode';

export type ExplanationState = {
  type: 'prewritten' | 'ai' | 'loading' | 'none';
  data?: LineExplanation | AIExplanationResponse;
  lineNumber?: number;
};

export function useExplanation() {
  const [state, setState] = useState<ExplanationState>({ type: 'none' });
  const abortRef = useRef<AbortController | null>(null);

  const getExplanation = useCallback(async (lineNumber: number, lineContent: string) => {
    // Cancel any pending AI request
    if (abortRef.current) {
      abortRef.current.abort();
    }

    // Check prewritten first (instant)
    const prewritten = explanations[lineNumber];
    if (prewritten) {
      setState({ type: 'prewritten', data: prewritten, lineNumber });
      return;
    }

    // Check if line is meaningful (not blank, not just a comment delimiter)
    const trimmed = lineContent.trim();
    if (!trimmed || trimmed === '{' || trimmed === '}' || trimmed === '' || trimmed.startsWith('//──')) {
      setState({ type: 'none' });
      return;
    }

    // AI fallback
    setState({ type: 'loading', lineNumber });
    abortRef.current = new AbortController();

    try {
      const result = await fetchAIExplanation(RONNIE_CODE, lineNumber, lineContent);
      setState({ type: 'ai', data: result, lineNumber });
    } catch {
      setState({ type: 'none' });
    }
  }, []);

  const clearExplanation = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setState({ type: 'none' });
  }, []);

  return { state, getExplanation, clearExplanation };
}
