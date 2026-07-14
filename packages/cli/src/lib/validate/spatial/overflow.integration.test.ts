import { beforeAll, describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from '../index.js';

// Integration coverage for the auto-fit/auto-fill grid detection fix: the
// real `declaresAutoFitGrid` (overflow.ts) has to scan stylesheet rules
// against a live DOM, which only a real render can verify — a unit test
// feeding a pre-resolved `gridTemplateColumns` string (as this suite used to)
// never exercises it. Same self-skip rationale as renderer.integration.test.ts:
// a real render needs a working Chromium, which isn't available on a bare CI
// runner.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const example = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

// Narrow enough that 8 x 150px tiles cannot fit on one row, forcing the
// auto-fit grid to wrap into multiple rows — the exact condition the fix
// targets.
const viewport = { width: 400, height: 720 };

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

describe('auto-fit/auto-fill grid overflow detection (requires a working render environment)', () => {
  it('does not flag a wrapping Tiles (auto-fit) grid as an overflow/wrapping defect', async ctx => {
    if (!renderWorks) return ctx.skip();

    const report = await validate(example('auto-fit-tiles.tsx'), {
      checks: ['spatial'],
      viewport,
    });

    const overflowIssues = [...report.errors, ...report.warnings].filter(
      i => i.source === 'overflow-detector'
    );
    expect(overflowIssues).toEqual([]);
  }, 60_000);
});
