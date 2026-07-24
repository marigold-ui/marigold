/* eslint-disable testing-library/no-render-in-lifecycle, testing-library/render-result-naming-convention -- `renderer.render` is this package's own Playwright-backed SharedRenderer, unrelated to React Testing Library's render(); the plugin's name-based heuristic false-positives on it. */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type SharedRenderer, createRenderer } from './renderer.js';

// Integration coverage for the render sandbox's network egress control.
// page.route only ever covers the single Page it's registered on — a popup
// (window.open) is a brand-new Page that would otherwise inherit no filter
// at all and reach the open network. Same self-skip rationale as
// renderer.integration.test.ts: a real render needs a working Chromium,
// which isn't available on a bare CI runner.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const example = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

const viewport = { width: 1280, height: 720 };

let renderer: SharedRenderer | undefined;
let renderWorks = false;

beforeAll(async () => {
  try {
    renderer = await createRenderer();
    const handle = await renderer.render(example('valid-button.tsx'), viewport);
    renderWorks = handle.result.renderTimeMs > 0;
    await handle.close();
  } catch {
    renderWorks = false;
  }
}, 60_000);

afterAll(async () => {
  await renderer?.close();
});

describe('render sandbox network egress (requires a working render environment)', () => {
  it('closes a popup opened by the rendered component instead of letting it reach the network', async ctx => {
    if (!renderWorks || !renderer) return ctx.skip();

    const handle = await renderer.render(
      example('popup-attempt.tsx'),
      viewport
    );
    type PopupWindow = Window & { __popupClosed?: boolean };
    try {
      // The sandbox must close the popup outright — it must never be left
      // open to navigate to the external origin it was opened with. Checked
      // from the opener's own `.closed` view of the popup, not by racing a
      // Playwright-level page event against how fast the sandbox reacts.
      await handle.result.page.waitForFunction(
        () => (window as PopupWindow).__popupClosed === true,
        undefined,
        { timeout: 10_000 }
      );
      const popupClosed = await handle.result.page.evaluate(
        () => (window as PopupWindow).__popupClosed
      );
      expect(popupClosed).toBe(true);
    } finally {
      await handle.close();
    }
  }, 60_000);
});
