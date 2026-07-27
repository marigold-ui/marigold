/* eslint-disable testing-library/no-render-in-lifecycle, testing-library/render-result-naming-convention -- `renderer.render` is this package's own Playwright-backed SharedRenderer, unrelated to React Testing Library's render(); the plugin's name-based heuristic false-positives on it. */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { driveInteractions } from './interaction-driver.js';
import { type SharedRenderer, createRenderer } from './renderer.js';

// Integration coverage for the disclosure-detection fix: driving a real
// Accordion (built on react-aria-components' Disclosure, whose panel renders
// role="group") only reproduces through an actual render — OVERLAY_ROLES not
// including "group" is exactly the gap this regression test targets. Same
// self-skip rationale as renderer.integration.test.ts: a real render needs a
// working Chromium, which isn't available on a bare CI runner.
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

describe('driveInteractions disclosure detection (requires a working render environment)', () => {
  it('detects an Accordion panel (role="group") as revealed, not just toggled', async ctx => {
    if (!renderWorks || !renderer) return ctx.skip();

    const handle = await renderer.render(
      example('accordion-disclosure.tsx'),
      viewport
    );
    try {
      const { page } = handle.result;
      const opened: string[] = [];
      const { states } = await driveInteractions(page, {
        onOpen: async selector => {
          opened.push(selector);
          return [];
        },
      });

      const disclosureState = states.find(s => s.trigger.kind === 'disclosure');
      expect(disclosureState).toBeDefined();
      // Regression: visibleOverlays()/OVERLAY_ROLES doesn't include "group",
      // so this used to stay null even though Enter/click genuinely opened
      // the panel — meaning onOpen (and the extra contrast/axe checks it
      // drives) never ran for Marigold's Accordion at all.
      expect(disclosureState?.revealedRootSelector).not.toBeNull();
      expect(disclosureState?.revealedRole).toBe('group');
      expect(opened).toHaveLength(1);
    } finally {
      await handle.close();
    }
  }, 60_000);
});
