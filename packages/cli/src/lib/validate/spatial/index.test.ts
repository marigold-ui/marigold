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
    // An unbuilt theme (ThemeCssNotFoundError from getTrackedProperties) is
    // an environment precondition, not a defect in the file under test — the
    // static theme-variants checker treats the same condition as a silent
    // skip, so this must surface as a warning, never an error that fails the
    // exit code.
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
    // A transient page.evaluate hiccup (e.g. "Execution context was
    // destroyed") in the token-compliance block must not escalate to a
    // gating error that discards every check after it (overflow, a11y,
    // responsive, keyboard…) — matches the per-check isolation every sibling
    // block has.
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
    // page.evaluate has no default timeout, so generated code that spins the
    // main thread after mount could otherwise wedge every check indefinitely
    // — and since handle.close() only runs in this function's own `finally`,
    // a wedged check means that finally never runs either, leaking the
    // render handle forever instead of settling.
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

  it('returns the successful result even when closing the handle afterward rejects', async () => {
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
        close: async () => {
          throw new Error('context already closed');
        },
      }),
      close: async () => undefined,
    };

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
      renderer
    );

    expect(result.renderTimeMs).toBe(1);
  });
});
