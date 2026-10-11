import type { TypingEngineState } from './types.js';

export function createTestState(
  text: string,
  mode: 'timed' | 'words',
  duration?: number,
  wordCount?: number
): TypingEngineState {
  return {
    text: text.split(''),
    currentIndex: 0,
    startTime: null,
    keystrokes: [],
    mode,
    duration,
    wordCount,
  };
}

export function handleKeystroke(state: TypingEngineState, char: string, timestamp: number): TypingEngineState{
    
    const newStartTime = state.startTime === null ? timestamp : state.startTime;
    const correct = char === state.text[state.currentIndex];
    const newKeystrokes = [...state.keystrokes, { char, correct, timestamp }];
    
    const newIndex = state.currentIndex + 1;
    return {
     ...state,
     startTime: newStartTime,
     keystrokes: newKeystrokes,
     currentIndex: newIndex,
   };
}

export function calculateWPM(state: TypingEngineState, now: number): number {
  if (state.startTime === null) return 0;
  const minutes = (now - state.startTime) / 1000 / 60;
  if (minutes <= 0) return 0;
  const correct = state.keystrokes.filter(k => k.correct).length;
  return (correct / 5) / minutes;
}

export function calculateAccuracy(state: TypingEngineState): number {
  if (state.keystrokes.length === 0) return 0;
  const correct = state.keystrokes.filter(k => k.correct).length;
  return (correct / state.keystrokes.length) * 100;
}