import { describe, expect, it, vi } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const example = (name: string): string =>
  path.join(__dirname, 'examples', name);

const { setComponentResolutionRoot, setThemeResolutionRoot } = vi.hoisted(
  () => ({
    setComponentResolutionRoot: vi.fn(),
    setThemeResolutionRoot: vi.fn(),
  })
);

vi.mock('./helpers/components.js', async importOriginal => ({
  ...(await importOriginal()),
  setComponentResolutionRoot,
}));
vi.mock('./helpers/design-tokens.js', async importOriginal => ({
  ...(await importOriginal()),
  setThemeResolutionRoot,
}));
// Toolchain-unavailable keeps this test browser-free (mirrors
// index.render-failure.test.ts) — the resolution roots must be set before
// this failure is even reached, not depend on reaching a real render.
vi.mock('./spatial/renderer.js', () => ({
  createRenderer: async () => {
    throw new Error('mock: no Chromium');
  },
}));

describe('validate() resolution root dispatch', () => {
  it('sets both resolution roots even when "technical" is not in the requested checks', async () => {
    const { validate } = await import('./index.js');
    const file = example('valid-button.tsx');

    await validate(file, {
      checks: ['spatial'],
      viewport: { width: 1280, height: 720 },
    });

    // Previously only set inside runTechnicalChecks, gated behind
    // `checks.has('technical')` — a spatial/a11y-only run resolved
    // @marigold/theme-rui and @marigold/components CLI-relative instead of
    // from the validated file's own project.
    expect(setComponentResolutionRoot).toHaveBeenCalledWith(path.dirname(file));
    expect(setThemeResolutionRoot).toHaveBeenCalledWith(path.dirname(file));
  });
});
