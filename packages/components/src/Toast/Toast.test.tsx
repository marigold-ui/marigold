import { composeStories } from '@storybook/react';
import { MockInstance, vi } from 'vitest';
import * as stories from './Toast.stories';

const { Basic } = composeStories(stories);
let warnMock: MockInstance;
beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
});
afterEach(() => {
  warnMock.mockRestore();
});

describe('Toast', () => {});
