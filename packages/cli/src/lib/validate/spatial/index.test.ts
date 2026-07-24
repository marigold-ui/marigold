import type { Page } from 'playwright';
import { describe, expect, it, vi } from 'vitest';
import { ThemeCssNotFoundError } from '../helpers/design-tokens.js';
import { runSpatialChecks } from './index.js';
import type { RenderHandle, SharedRenderer } from './renderer.js';

const getTrackedProperties = vi.fn(() => {
  throw new ThemeCssNotFoundError();
});
vi.mock('../helpers/design-tokens.js', async importOriginal => {
  const actual =
    await importOriginal<typeof import('../helpers/design-tokens.js')>();
  return {
    ...actual,
    getTrackedProperties: () => getTrackedProperties(),
  };
});

const extractBoundingBoxes = vi.fn(async () => [] as unknown[]);
vi.mock('./bounding-box.js', () => ({
  extractBoundingBoxes: () => extractBoundingBoxes(),
  flattenBounds: (bounds: unknown[]) => bounds,
}));

vi.mock('./overflow.js', () => ({
  extractOverflowData: async () => ({ wrapping: [], overflows: [] }),
  wrappingToValidationIssues: () => [],
  overflowToValidationIssues: () => [],
}));

const fakeRenderer = (): SharedRenderer => {
  const handle: RenderHandle = {
    result: {
      page: {} as Page,
      context: {} as never,
      consoleErrors: [],
      pageErrors: [],
      renderErrors: [],
      renderTimeMs: 1,
    },
    close: async () => undefined,
  };
  return {
    render: async () => handle,
    close: async () => undefined,
  };
};

describe('runSpatialChecks', () => {
  it('reports a missing/unbuilt theme as a warning, not an error', async () => {
    // Regression: an unbuilt theme (ThemeCssNotFoundError from
    // getTrackedProperties) used to surface as severity 'error' here, even
    // though the static theme-variants checker treats the exact same
    // condition as a silent skip — an environment precondition must not fail
    // the exit code the way a real finding would.
    const result = await runSpatialChecks(
      'irrelevant.tsx',
      {
        enableSpatial: true,
        enableA11y: false,
        enableResponsive: false,
        enableKeyboardA11y: false,
        enableTextSpacing: false,
        enableRevealed: false,
        enableContentHoverFocus: false,
        viewport: { width: 1280, height: 720 },
      },
      fakeRenderer()
    );

    const themeIssue = result.styleIssues.find(
      i => i.source === 'token-compliance'
    );
    expect(themeIssue).toBeDefined();
    expect(themeIssue?.severity).toBe('warning');
    expect(themeIssue?.message).toContain(new ThemeCssNotFoundError().message);
  });

  it('isolates a non-theme token-compliance failure as a warning instead of aborting every later check', async () => {
    // Regression: the token-compliance block used to `throw err` for any
    // failure other than ThemeCssNotFoundError, escalating a transient
    // page.evaluate hiccup ("Execution context was destroyed") to a gating
    // error and discarding every check after it (overflow, a11y, responsive,
    // keyboard…) — the one sub-check in this function that didn't match the
    // per-check isolation every sibling block already has.
    getTrackedProperties.mockImplementationOnce(() => {
      throw new Error('Execution context was destroyed');
    });

    const result = await runSpatialChecks(
      'irrelevant.tsx',
      {
        enableSpatial: true,
        enableA11y: false,
        enableResponsive: false,
        enableKeyboardA11y: false,
        enableTextSpacing: false,
        enableRevealed: false,
        enableContentHoverFocus: false,
        viewport: { width: 1280, height: 720 },
      },
      fakeRenderer()
    );

    const tokenIssue = result.styleIssues.find(
      i => i.source === 'token-compliance'
    );
    expect(tokenIssue).toBeDefined();
    expect(tokenIssue?.severity).toBe('warning');
    expect(tokenIssue?.message).toContain('Execution context was destroyed');
  });

  it('times out and force-closes the handle when a check hangs past the inspection budget', async () => {
    // Regression: page.evaluate has no default timeout, so generated code
    // that spins the main thread after mount used to wedge every check
    // (and, since handle.close() only ran in this function's own `finally`,
    // never actually reached that finally either) — leaking the render
    // handle forever instead of settling.
    vi.useFakeTimers();
    try {
      extractBoundingBoxes.mockImplementationOnce(() => new Promise(() => {}));
      const handleClose = vi.fn(async () => undefined);
      const renderer: SharedRenderer = {
        render: async () => ({
          result: {
            page: {} as Page,
            context: {} as never,
            consoleErrors: [],
            pageErrors: [],
            renderErrors: [],
            renderTimeMs: 1,
          },
          close: handleClose,
        }),
        close: async () => undefined,
      };

      const resultPromise = runSpatialChecks(
        'irrelevant.tsx',
        {
          enableSpatial: true,
          enableA11y: false,
          enableResponsive: false,
          enableKeyboardA11y: false,
          enableTextSpacing: false,
          enableRevealed: false,
          enableContentHoverFocus: false,
          viewport: { width: 1280, height: 720 },
        },
        renderer
      );

      await Promise.all([
        expect(resultPromise).rejects.toThrow(/inspection phase exceeded/i),
        vi.advanceTimersByTimeAsync(60_000),
      ]);
      expect(handleClose).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });
});
