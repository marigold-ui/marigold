import { beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from '../index.js';
import { probeFailureCause, skipIntegration } from './skipIntegration.js';

// Integration coverage for the render path (renderer + spatial checks), which
// the unit tests deliberately do not exercise. A real render needs a working
// Chromium AND resolvable project modules (the harness). This suite probes once
// whether rendering works. Without it, tests skip locally and fail in CI, which
// installs Chromium (see skipIntegration.ts).
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const example = (name: string): string =>
  path.join(__dirname, '..', 'examples', name);

const viewport = { width: 1280, height: 720 };

let renderWorks = false;
let probeError: unknown;

beforeAll(async () => {
  try {
    const probe = await validate(example('valid-button.tsx'), {
      checks: ['spatial'],
      viewport,
    });
    renderWorks = probe.metadata.renderTimeMs > 0;
    if (!renderWorks) probeError = probeFailureCause(probe);
  } catch (error) {
    renderWorks = false;
    probeError = error;
  }
}, 60_000);

describe('render integration (requires a working render environment)', () => {
  it('renders a valid component with a trustworthy, non-fallback render', async ctx => {
    if (!renderWorks)
      return skipIntegration(ctx, 'No working Chromium render', {
        inCI: 'fail',
        cause: probeError,
      });
    const report = await validate(example('valid-button.tsx'), {
      checks: ['spatial'],
      viewport,
    });
    expect(report.metadata.renderTimeMs).toBeGreaterThan(0);
    // No runtime render error (crash / fallback / failed harness).
    expect(report.errors.some(e => e.source === 'runtime')).toBe(false);
    expect(report.metadata.componentsFound.length).toBeGreaterThan(0);
    // The sandbox's own `context.routeWebSocket` (necessarily) closes Vite's
    // HMR client's WebSocket on every single render, which would otherwise
    // surface as "Console error during render" noise about Vite's own
    // reconnect/error-reporting failures — unrelated to the component under
    // test — on every render regardless of its content.
    expect(
      report.warnings.some(
        w => w.component === 'Console' && /vite|websocket/i.test(w.message)
      )
    ).toBe(false);
  }, 60_000);

  it('accepts a memo()-wrapped default export instead of reporting "no component found"', async ctx => {
    if (!renderWorks)
      return skipIntegration(ctx, 'No working Chromium render', {
        inCI: 'fail',
        cause: probeError,
      });
    // memo/forwardRef/lazy return objects, not functions. A typeof-function
    // gate in the harness rejects them, which surfaces as a runtime error and
    // exit 1 on a file that plainly has a default export — the false-failure
    // class an agent fix-loop then tries to "repair" in correct code.
    const report = await validate(example('memo-default-export.tsx'), {
      checks: ['spatial'],
      viewport,
    });
    expect(report.metadata.renderTimeMs).toBeGreaterThan(0);
    const runtimeErrors = report.errors.filter(e => e.source === 'runtime');
    expect(runtimeErrors).toEqual([]);
    expect(report.metadata.componentsFound.length).toBeGreaterThan(0);
  }, 60_000);

  it('fails fast on an import the sandbox cannot resolve instead of waiting out the render budget', async ctx => {
    if (!renderWorks)
      return skipIntegration(ctx, 'No working Chromium render', {
        inCI: 'fail',
        cause: probeError,
      });
    // Written at runtime, not committed: the repo typecheck covers every .tsx
    // file and would reject the unresolvable import. It sits next to the other
    // examples so @marigold/components resolves from the CLI package.
    const file = example(`unresolvable-import-${process.pid}.tsx`);
    fs.writeFileSync(
      file,
      `import { Button } from '@marigold/components';
      import { track } from '@acme/not-installed';
      export default () => <Button onPress={track}>Save</Button>;`
    );
    try {
      const started = Date.now();
      const report = await validate(file, { checks: ['spatial'], viewport });
      // The render budget is 45s. Vite reports the resolve error through its
      // HMR socket within a few seconds once that socket is allowed through.
      expect(Date.now() - started).toBeLessThan(20_000);
      const renderError = report.errors.find(e => e.component === 'Renderer');
      expect(renderError?.message).toMatch(/could not be resolved/);
    } finally {
      fs.rmSync(file, { force: true });
    }
  }, 60_000);

  it('drives the interaction simulation over a dialog without throwing', async ctx => {
    if (!renderWorks)
      return skipIntegration(ctx, 'No working Chromium render', {
        inCI: 'fail',
        cause: probeError,
      });
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
