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