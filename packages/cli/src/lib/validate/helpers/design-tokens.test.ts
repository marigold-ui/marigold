import { afterEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpFile } from '../test-support/tmp.js';
import {
  ThemeCssNotFoundError,
  extractTokenScopes,
  loadDesignTokens,
  resetDesignTokenCache,
  resolveCssImports,
  setThemeResolutionRoot,
} from './design-tokens.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

afterEach(() => {
  resetDesignTokenCache();
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

  it('captures a multi-line shadow token in full, not just its first layer', () => {
    // theme-rui writes multi-layer shadow tokens (--shadow-elevation-overlay,
    // -raised) across several lines, terminated by a single trailing `;`.
    const tokens = loadDesignTokens();
    const overlay = tokens['shadow-elevation-overlay'];
    expect(overlay).toBeDefined();
    // A single-layer capture would end right after the first comma-joined
    // layer; the real token has (at least) six comma-separated layers.
    expect(overlay.split(',').length).toBeGreaterThan(1);
    expect(overlay.trim().endsWith(',')).toBe(false);
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

  it('propagates a non-ENOENT read failure instead of silently swallowing it', () => {
    // Only ENOENT (missing/renamed partial) is the intended degrade case.
    // An EACCES (or similar) on a file that DOES exist is a real environment
    // misconfiguration — must still surface (the caller already handles it:
    // spatial/index.ts's token-compliance check wraps any other error in its
    // own generic catch-all warning), not disappear into an empty map with
    // no signal at all.
    const dir = fs.mkdtempSync(
      path.join(os.tmpdir(), `rci-unreadable-${Date.now()}-`)
    );
    const unreadable = path.join(dir, 'unreadable.css');
    fs.writeFileSync(unreadable, '--color-primary: #123456;');
    fs.chmodSync(unreadable, 0o000);
    try {
      expect(() => resolveCssImports(unreadable)).toThrow(
        expect.objectContaining({ code: 'EACCES' })
      );
    } finally {
      fs.chmodSync(unreadable, 0o644); // restore so the tmp dir can be cleaned up
    }
  });

  it('degrades a missing/renamed imported partial instead of throwing', () => {
    // A present-but-malformed theme.css (survives loadDesignTokens' own
    // existence check) that @imports a partial which doesn't exist — must
    // skip that partial, not throw an uncaught ENOENT out of the whole load.
    const entry = tmpFile(
      'rci-missing-partial/theme.css',
      `@import './does-not-exist.css';\n--color-primary: #123456;`
    );
    expect(() => resolveCssImports(entry)).not.toThrow();
    const resolved = resolveCssImports(entry);
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

describe('setThemeResolutionRoot', () => {
  // packages/cli has @marigold/theme-rui as a real dependency (unlike the
  // workspace root), so pointing the root there exercises the
  // project-relative resolution path, not just its fallback.
  const cliPackageDir = path.resolve(__dirname, '..', '..', '..', '..');

  afterEach(() => {
    setThemeResolutionRoot(process.cwd());
    resetDesignTokenCache();
  });

  it('invalidates the cached tokens when the resolution root actually changes', () => {
    // Same bug shape as helpers/components.ts's setComponentResolutionRoot:
    // validate() can run against two different projects in one process, and
    // loadDesignTokens() memoizes globally with no key on the root.
    setThemeResolutionRoot(os.tmpdir());
    resetDesignTokenCache();
    const first = loadDesignTokens();

    setThemeResolutionRoot(cliPackageDir);
    const second = loadDesignTokens();

    // Different object instance proves the switch rebuilt the token map
    // instead of handing back the first root's cached result.
    expect(second).not.toBe(first);
  });

  it('does not rebuild the cache when the root is set to its current value', () => {
    setThemeResolutionRoot(cliPackageDir);
    resetDesignTokenCache();
    const first = loadDesignTokens();

    setThemeResolutionRoot(cliPackageDir);
    const second = loadDesignTokens();

    expect(second).toBe(first);
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
