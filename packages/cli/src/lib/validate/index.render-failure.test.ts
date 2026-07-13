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
