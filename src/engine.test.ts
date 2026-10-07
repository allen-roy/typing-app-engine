import { describe, it, expect } from 'vitest';
import { createTestState, handleKeystroke } from './engine.js';

describe('handleKeystroke', () => {
  it('advances currentIndex when a correct character is typed', () => {
    const state = createTestState('abc', 'words', undefined, 3);
    const newState = handleKeystroke(state, 'a', 1000);

    expect(newState.currentIndex).toBe(1);
  });

  it('advances even when a wrong character is typed', ()=>{
    const state = createTestState('abc', 'words', undefined, 3);
    const newState = handleKeystroke(state,'x',1000);

    expect(newState.currentIndex).toBe(1)
    expect(newState.keystrokes[0]?.correct).toBe(false);
  })

  it('setting the start time for the first keystroke', ()=>{
    const state = createTestState('abc','words', undefined, 3);
    const startTime = 1000;
    const newState = handleKeystroke(state,'x',startTime);

    expect(newState.startTime).toBe(1000);
  })

  it('does not change start time on the second keystroke', () => {
  const state = createTestState('abc', 'words', undefined, 3);
  const afterFirst = handleKeystroke(state, 'a', 1000);
  const afterSecond = handleKeystroke(afterFirst, 'b', 2000);

  expect(afterSecond.startTime).toBe(1000);
  });
});

