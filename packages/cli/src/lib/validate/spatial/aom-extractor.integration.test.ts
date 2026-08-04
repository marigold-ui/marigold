/* eslint-disable testing-library/no-render-in-lifecycle, testing-library/render-result-naming-convention -- `renderer.render` is this package's own Playwright-backed SharedRenderer, unrelated to React Testing Library's render(); the plugin's name-based heuristic false-positives on it. */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runAxeAudit } from './aom-extractor.js';
import { type SharedRenderer, createRenderer } from './renderer.js';

// The axe audit is invoked behind a per-check try/catch in spatial/index.ts, so
// a run that silently returns nothing is indistinguishable from a clean page —
// which is exactly how the finishRun blank-page defect stayed invisible for
// several review rounds while every test stayed green. Nothing else asserts
// that the audit actually *produces* results, and the current fix depends on
// renderer.ts discriminating axe's Node-created aggregation page via opener();
// if a future axe-core or Playwright changes how that page is created, this
// degrades back to a swallowed warning. This test is the tripwire for that.
//
// Same self-skip rationale as renderer.integration.test.ts: a real render needs
// a working Chromium, which isn't available on a bare CI runner.
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

describe('axe audit (requires a working render environment)', () => {
  it('returns a non-empty violation set for a page axe has findings on', async ctx => {
    if (!renderWorks || !renderer) return ctx.skip();

    const handle = await renderer.render(example('valid-button.tsx'), viewport);
    try {
      const issues = await runAxeAudit(handle.result.page);

      // A bare harness page renders the component with no landmark and no
      // heading, so these two best-practice rules always fire. Asserting the
      // specific rule ids (not just a count) means a run that returns results
      // for an unrelated reason cannot make this pass vacuously.
      expect(issues.length).toBeGreaterThan(0);
      expect(issues.every(i => i.source === 'aom-extractor')).toBe(true);
      const ruleIds = issues.map(i => i.details?.ruleId);
      expect(ruleIds).toContain('landmark-one-main');
      expect(ruleIds).toContain('page-has-heading-one');
    } finally {
      await handle.close();
    }
  }, 60_000);
});
