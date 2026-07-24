import { describe, expect, it, vi } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from './index.js';

// Exercise the render-failure path with no browser. The render toolchain is
// mocked so createRenderer yields a renderer whose render() rejects. This covers
// the gating behaviour in index.ts — a render failure must surface as a `runtime`
// ERROR (which steers the correction loop) while the technical findings are
// still returned, and validate() must NOT throw. Previously only the
// self-skipping render integration test touched this path, so it never ran on a
// bare CI runner.
vi.mock('./spatial/renderer.js', () => ({
  createRenderer: async () => ({
    render: async () => {
      throw new Error('mock render failure');
    },
    close: async () => undefined,
  }),
}));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const example = (name: string): string =>
  path.join(__dirname, 'examples', name);

describe('validate() render-failure handling', () => {
  it('turns a render failure into a gating runtime error instead of throwing, and still runs the technical checks', async () => {
    const report = await validate(example('valid-button.tsx'), {
      checks: ['technical', 'spatial'],
      viewport: { width: 1280, height: 720 },
    });

    const renderError = report.errors.find(e => e.source === 'runtime');
    expect(renderError).toBeDefined();
    expect(renderError?.message).toMatch(/render failed|mock render failure/i);

    // The technical pass still ran despite the render failure.
    expect(report.metadata.checksRun).toContain('technical');
  });
});

describe('validate() toolchain-unavailable handling', () => {
  it('reports a missing/unlaunchable render toolchain as a warning, not an error', async () => {
    // Regression: createRenderer() failing (no Chromium, toolchain not
    // installed) used to surface as the same severity 'error' as a genuine
    // render crash — indistinguishable by exit code from a real defect in
    // the file under test. It's an environment precondition instead.
    vi.doMock('./spatial/renderer.js', () => ({
      createRenderer: async () => {
        throw new Error('Executable doesn’t exist (mock: no Chromium)');
      },
    }));
    vi.resetModules();
    const { validate: validateWithMock } = await import('./index.js');

    const report = await validateWithMock(example('valid-button.tsx'), {
      checks: ['technical', 'spatial'],
      viewport: { width: 1280, height: 720 },
    });

    const runtimeIssue = [...report.errors, ...report.warnings].find(
      i => i.source === 'runtime'
    );
    expect(runtimeIssue).toBeDefined();
    expect(runtimeIssue?.severity).toBe('warning');
    expect(report.errors.find(e => e.source === 'runtime')).toBeUndefined();

    vi.doUnmock('./spatial/renderer.js');
    vi.resetModules();
  });
});
