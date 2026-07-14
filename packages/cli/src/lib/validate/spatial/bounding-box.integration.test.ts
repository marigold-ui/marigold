import { beforeAll, describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from '../index.js';

// Integration coverage for the visibility:hidden bounding-box fix: the real
// extractBoundingBoxes walk runs inside page.evaluate against live computed
// styles, which only a real render can verify. Same self-skip rationale as
// renderer.integration.test.ts: a real render needs a working Chromium, which
// isn't available on a bare CI runner.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const example = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

const viewport = { width: 1280, height: 720 };

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

describe('bounding-box extraction (requires a working render environment)', () => {
  it('does not flag a visibility:hidden sibling as overlapping a visible one', async ctx => {
    if (!renderWorks) return ctx.skip();

    const report = await validate(example('visibility-hidden-sibling.tsx'), {
      checks: ['spatial'],
      viewport,
    });

    const overlapIssues = [...report.errors, ...report.warnings].filter(
      i => i.source === 'overlap-detector'
    );
    expect(overlapIssues).toEqual([]);
  }, 60_000);
});
