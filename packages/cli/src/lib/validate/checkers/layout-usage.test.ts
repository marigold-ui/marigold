import { describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import { validateLayoutUsage } from './layout-usage.js';

describe('validateLayoutUsage (W1 — single-child flow layout)', () => {
  it('flags a flow layout that wraps a single child', () => {
    const file = tmpFile(
      'lu-single.tsx',
      `import { Stack, Button } from '@marigold/components';
      const C = () => (
        <Stack space="regular">
          <Button variant="primary">Save</Button>
        </Stack>
      );`
    );
    const issue = validateLayoutUsage(file).find(i => i.component === 'Stack');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(issue?.source).toBe('layout-usage');
  });

  it('does not flag a flow layout with two or more children', () => {
    const file = tmpFile(
      'lu-two.tsx',
      `import { Stack, Button } from '@marigold/components';
      const C = () => (
        <Stack space="regular">
          <Button>A</Button>
          <Button>B</Button>
        </Stack>
      );`
    );
    expect(validateLayoutUsage(file)).toEqual([]);
  });

  it('does not flag a flow layout whose children are dynamic', () => {
    const file = tmpFile(
      'lu-dynamic.tsx',
      `import { Stack, Button } from '@marigold/components';
      const data = [1, 2, 3];
      const C = () => (
        <Stack space="regular">
          {data.map(d => <Button key={d}>{d}</Button>)}
        </Stack>
      );`
    );
    expect(validateLayoutUsage(file)).toEqual([]);
  });

  it('does not flag the single-child wrappers (Inset/Center/Breakout/Aspect)', () => {
    const file = tmpFile(
      'lu-inset.tsx',
      `import { Inset, Button } from '@marigold/components';
      const C = () => (
        <Inset space="large">
          <Button>Only</Button>
        </Inset>
      );`
    );
    expect(validateLayoutUsage(file)).toEqual([]);
  });
});
