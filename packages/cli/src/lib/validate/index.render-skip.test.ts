import { afterEach, describe, expect, it, vi } from 'vitest';
import { tmpFile } from './test-support/tmp.js';
import type { ValidateOptions } from './types.js';

// A file the single-file render sandbox cannot load must not launch a browser
// and wait out the render budget. The renderer is mocked so the test can assert
// it was never created, and so it runs without Chromium.
const createRenderer = vi.fn(async () => ({
  render: async () => {
    throw new Error('render() must not be called for a skipped file');
  },
  close: async () => undefined,
}));
vi.mock('./spatial/renderer.js', () => ({ createRenderer }));

const { validate } = await import('./index.js');

const options: ValidateOptions = {
  checks: ['technical', 'spatial', 'a11y'],
  viewport: { width: 1280, height: 720 },
};

afterEach(() => {
  createRenderer.mockClear();
});

describe('validate() on files the render sandbox cannot load', () => {
  it('skips the rendered checks for a file with a local import, with one warning', async () => {
    const file = tmpFile(
      'render-skip/local-import.tsx',
      `import { Button } from '@marigold/components';
      import { format } from './format';
      export default () => <Button>{format('Save')}</Button>;`
    );
    const report = await validate(file, options);

    expect(createRenderer).not.toHaveBeenCalled();
    const skipped = report.warnings.filter(w => w.component === 'Renderer');
    expect(skipped).toHaveLength(1);
    expect(skipped[0]?.message).toMatch(/skipped/i);
    expect(skipped[0]?.message).toContain('./format');
    expect(skipped[0]?.suggestion).toContain('--checks technical');
    // Only the static checks decide the outcome.
    expect(report.errors.filter(e => e.source === 'runtime')).toEqual([]);
  });

  it('skips the rendered checks for a file without a default or App export', async () => {
    const file = tmpFile(
      'render-skip/named-export.tsx',
      `import { Button } from '@marigold/components';
      export const Checkout = () => <Button>Pay</Button>;`
    );
    const report = await validate(file, options);

    expect(createRenderer).not.toHaveBeenCalled();
    const skipped = report.warnings.filter(w => w.component === 'Renderer');
    expect(skipped).toHaveLength(1);
    expect(skipped[0]?.message).toMatch(/"App"/);
    expect(report.errors.filter(e => e.source === 'runtime')).toEqual([]);
  });

  it('reports nothing checked, as a warning, when no static check ran either', async () => {
    const file = tmpFile(
      'render-skip/a11y-only.tsx',
      `import { format } from './format';
      export default () => <p>{format('Save')}</p>;`
    );
    const report = await validate(file, { ...options, checks: ['a11y'] });

    expect(createRenderer).not.toHaveBeenCalled();
    expect(report.errors).toEqual([]);
    const skipped = report.warnings.filter(w => w.component === 'Renderer');
    expect(skipped).toHaveLength(1);
    expect(skipped[0]?.suggestion).toMatch(/Nothing was checked/);
    expect(report.metadata.checksRun).toEqual([]);
  });

  it('lists only the static checks as run when the render is skipped', async () => {
    const file = tmpFile(
      'render-skip/checks-run.tsx',
      `import { format } from './format';
      export default () => <p>{format('Save')}</p>;`
    );
    const report = await validate(file, options);
    expect(report.metadata.checksRun).toEqual(['technical']);
  });

  it('adds no skip warning when a compile error already stops the render', async () => {
    const file = tmpFile(
      'render-skip/fatal.tsx',
      `import { format } from './format';
      export default () => <p>{format(</p>;`
    );
    const report = await validate(file, options);

    expect(createRenderer).not.toHaveBeenCalled();
    expect(
      [...report.errors, ...report.warnings].filter(
        i => i.component === 'Renderer'
      )
    ).toEqual([]);
  });

  it('still renders a self-contained file', async () => {
    const file = tmpFile(
      'render-skip/self-contained.tsx',
      `import { Button } from '@marigold/components';
      export default () => <Button>Save</Button>;`
    );
    await validate(file, options);
    expect(createRenderer).toHaveBeenCalledOnce();
  });
});
