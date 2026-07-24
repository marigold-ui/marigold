import { beforeAll, describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from '../index.js';

// Integration coverage for the arrow-key-navigation orientation fix: the real
// key-press/focus-check loop drives an actual keyboard event against a live
// page, which only a real render can verify. Same self-skip rationale as
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

describe('arrow-key navigation orientation (requires a working render environment)', () => {
  it('does not flag a horizontally-oriented radiogroup as non-navigable', async ctx => {
    if (!renderWorks) return ctx.skip();

    const report = await validate(example('horizontal-radio-group.tsx'), {
      checks: ['spatial'],
      viewport,
    });

    const arrowNavIssues = [...report.errors, ...report.warnings].filter(i =>
      i.message.includes('Arrow key navigation does not work')
    );
    expect(arrowNavIssues).toEqual([]);
  }, 60_000);
});
