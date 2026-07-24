/* eslint-disable testing-library/no-render-in-lifecycle, testing-library/render-result-naming-convention -- `renderer.render` is this package's own Playwright-backed SharedRenderer, unrelated to React Testing Library's render(); the plugin's name-based heuristic false-positives on it. */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { type SharedRenderer, createRenderer } from './renderer.js';

// Integration coverage for the render sandbox's network egress control.
// page.route only intercepts HTTP(S); a WebSocket opened by untrusted
// generated code would otherwise bypass it and reach an external origin.
// Same self-skip rationale as renderer.integration.test.ts: a real render
// needs a working Chromium, which isn't available on a bare CI runner.
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
  it('closes a WebSocket opened by the rendered component instead of letting it connect', async ctx => {
    if (!renderWorks || !renderer) return ctx.skip();

    const handle = await renderer.render(
      example('websocket-attempt.tsx'),
      viewport
    );
    type WsWindow = Window & { __wsAttemptStatus?: string };
    try {
      await handle.result.page.waitForFunction(
        () => (window as WsWindow).__wsAttemptStatus !== 'pending',
        undefined,
        { timeout: 10_000 }
      );
      const status = await handle.result.page.evaluate(
        () => (window as WsWindow).__wsAttemptStatus
      );
      // The sandbox must never let the socket reach `open` — it should be
      // closed (or errored) before the handshake completes.
      expect(status).not.toBe('open');
    } finally {
      await handle.close();
    }
  }, 60_000);
});
