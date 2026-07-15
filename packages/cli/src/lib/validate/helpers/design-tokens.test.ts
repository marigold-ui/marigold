import { afterEach, describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import {
  ThemeCssNotFoundError,
  __resetDesignTokenCacheForTests,
  extractTokenScopes,
  loadDesignTokens,
  resolveCssImports,
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

describe('resolveCssImports', () => {
  it('inlines a bare relative @import', () => {
    tmpFile('rci-bare/tokens.css', '--color-primary: #123456;');
    const entry = tmpFile('rci-bare/theme.css', `@import './tokens.css';`);
    expect(resolveCssImports(entry)).toContain('--color-primary: #123456;');
  });

  it('inlines a url()-wrapped @import', () => {
    tmpFile('rci-url/tokens.css', '--color-primary: #123456;');
    const entry = tmpFile('rci-url/theme.css', `@import url('./tokens.css');`);
    expect(resolveCssImports(entry)).toContain('--color-primary: #123456;');
  });

  it('inlines a media-qualified @import', () => {
    tmpFile('rci-media/tokens.css', '--color-primary: #123456;');
    const entry = tmpFile(
      'rci-media/theme.css',
      `@import './tokens.css' screen;`
    );
    expect(resolveCssImports(entry)).toContain('--color-primary: #123456;');
  });

  it('resolves imports nested more than one level deep', () => {
    tmpFile('rci-nested/tokens.css', '--color-primary: #123456;');
    tmpFile('rci-nested/ui.css', `@import './tokens.css';`);
    const entry = tmpFile('rci-nested/theme.css', `@import './ui.css';`);
    expect(resolveCssImports(entry)).toContain('--color-primary: #123456;');
  });

  it('does not infinite-loop on a circular import', () => {
    tmpFile('rci-cycle/a.css', `@import './b.css';`);
    const entry = tmpFile('rci-cycle/b.css', `@import './a.css';`);
    expect(() => resolveCssImports(entry)).not.toThrow();
  });

  it('leaves a non-local (bare specifier) @import untouched', () => {
    const entry = tmpFile(
      'rci-bare-specifier/theme.css',
      `@import 'some-package/tokens.css';\n--color-primary: #123456;`
    );
    const resolved = resolveCssImports(entry);
    expect(resolved).toContain(`@import 'some-package/tokens.css';`);
    expect(resolved).toContain('--color-primary: #123456;');
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
