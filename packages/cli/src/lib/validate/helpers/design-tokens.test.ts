import { afterEach, describe, expect, it } from 'vitest';
import {
  ThemeCssNotFoundError,
  __resetDesignTokenCacheForTests,
  loadDesignTokens,
} from './design-tokens.js';

afterEach(() => {
  __resetDesignTokenCacheForTests();
});

describe('loadDesignTokens', () => {
  it('returns a non-empty token map when theme.css exists', () => {
    const tokens = loadDesignTokens();
    expect(Object.keys(tokens).length).toBeGreaterThan(0);
  });

  it('caches results across calls', () => {
    const first = loadDesignTokens();
    const second = loadDesignTokens();
    expect(first).toBe(second);
  });
});

describe('ThemeCssNotFoundError', () => {
  it('has a descriptive message with build instructions', () => {
    const err = new ThemeCssNotFoundError();
    expect(err.message).toContain('theme.css not found');
    expect(err.message).toContain('pnpm --filter @marigold/theme-rui build');
    expect(err.name).toBe('ThemeCssNotFoundError');
    expect(err).toBeInstanceOf(Error);
  });
});
