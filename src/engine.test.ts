import { describe, it, expect } from 'vitest';
import { createTestState, handleKeystroke } from './engine.js';

describe('handleKeystroke', () => {
  it('advances currentIndex when a correct character is typed', () => {
    const state = createTestState('abc', 'words', undefined, 3);
    const newState = handleKeystroke(state, 'a', 1000);

    expect(newState.currentIndex).toBe(1);
  });
});