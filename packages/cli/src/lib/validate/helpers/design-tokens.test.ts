import { afterEach, describe, expect, it } from 'vitest';
import {
  ThemeCssNotFoundError,
  __resetDesignTokenCacheForTests,
  extractTokenScopes,
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

describe('extractTokenScopes', () => {
  it('keeps declarations inside @theme and drops component-scoped --vars', () => {
    const css = `
      @theme static {
        --color-primary: #123456;
        --spacing-1: 4px;
      }
      .button {
        --color-primary: red; /* component-local, NOT a token */
        color: var(--color-primary);
      }
    `;
    const scoped = extractTokenScopes(css);
    expect(scoped).toContain('--color-primary: #123456');
    expect(scoped).toContain('--spacing-1: 4px');
    expect(scoped).not.toContain('red');
  });

  it('supports :root blocks', () => {
    const scoped = extractTokenScopes(`:root { --radius-md: 8px; }`);
    expect(scoped).toContain('--radius-md: 8px');
  });

  it('falls back to the whole file when no :root/@theme block exists', () => {
    const css = `.x { --local: 1px; }`;
    expect(extractTokenScopes(css)).toBe(css);
  });

  it('handles nested braces inside a scope block', () => {
    const css = `@theme { --a: 1; @media (x) { --b: 2; } --c: 3; }`;
    const scoped = extractTokenScopes(css);
    expect(scoped).toContain('--a: 1');
    expect(scoped).toContain('--b: 2');
    expect(scoped).toContain('--c: 3');
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
