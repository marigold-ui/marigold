import { beforeAll, describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from '../index.js';

// Integration coverage for the `display:contents` false-positive fix in the
// "disappeared component" check: the real selfHidden computation runs inside
// page.evaluate against live computed styles, which only a real render can
// verify. Same self-skip rationale as renderer.integration.test.ts: a real
// render needs a working Chromium, which isn't available on a bare CI runner.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const example = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

const viewport = { width: 375, height: 720 };

let renderWorks = false;

beforeAll(async () => {
  try {
    const probe = await validate(example('valid-button.tsx'), {
      checks: ['spatial'],
      viewport,
    });
    renderWorks = probe.metadata.renderTimeMs > 0;
  } catch {
    renderWorks = false;
  }
}, 60_000);

describe('responsive disappeared-component check (requires a working render environment)', () => {
  it('does not flag a display:contents element as a genuine zero-dimension collapse', async ctx => {
    if (!renderWorks) return ctx.skip();

    const report = await validate(example('display-contents-wrapper.tsx'), {
      checks: ['spatial'],
      viewport,
    });

    const disappearedIssues = [...report.errors, ...report.warnings].filter(
      i =>
        i.source === 'responsive-checker' &&
        i.message.includes('zero dimensions')
    );
    expect(disappearedIssues).toEqual([]);
  }, 60_000);
});
