import { useMemo } from 'react';
import explanations from '@/data/explanations';

export type RobotPart = 'front-left' | 'front-right' | 'rear-left' | 'rear-right' | 'all-legs' | 'body' | 'esp32' | 'pca9685' | 'servo' | null;

export function useRobotHighlight(lineNumber: number | null): RobotPart {
  return useMemo(() => {
    if (lineNumber === null) return null;
    const exp = explanations[lineNumber];
    return exp?.robotPart || null;
  }, [lineNumber]);
}
