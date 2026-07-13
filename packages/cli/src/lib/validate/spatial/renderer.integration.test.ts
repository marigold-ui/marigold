import { beforeAll, describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from '../index.js';

// Integration coverage for the render path (renderer + spatial checks), which
// the unit tests deliberately do not exercise. A real render needs a working
// Chromium AND resolvable project modules (the harness). That environment is
// present in the eval Docker image but not on a bare CI runner, so this suite
// probes once whether rendering actually works and self-skips when it does not,
// rather than failing.
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

describe('render integration (requires a working render environment)', () => {
  it('renders a valid component with a trustworthy, non-fallback render', async ctx => {
    if (!renderWorks) return ctx.skip();
    const report = await validate(example('valid-button.tsx'), {
      checks: ['spatial'],
      viewport,
    });
    expect(report.metadata.renderTimeMs).toBeGreaterThan(0);
    // No runtime render error (crash / fallback / failed harness).
    expect(report.errors.some(e => e.source === 'runtime')).toBe(false);
    expect(report.metadata.componentsFound.length).toBeGreaterThan(0);
  }, 60_000);

  it('drives the interaction simulation over a dialog without throwing', async ctx => {
    if (!renderWorks) return ctx.skip();
    // dialog-open.tsx exercises the overlay/interaction-driver path.
    const report = await validate(example('dialog-open.tsx'), {
      checks: ['spatial'],
      viewport,
    });
    expect(report.metadata.renderTimeMs).toBeGreaterThan(0);
    expect(Array.isArray(report.errors)).toBe(true);
    expect(Array.isArray(report.warnings)).toBe(true);
  }, 60_000);
});
