import { describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import { validateComposition } from './composition.js';

describe('validateComposition treats opaque dynamic children as non-empty', () => {
  it('treats {items.map(...)} as dynamic — no false composition warning', () => {
    const file = tmpFile(
      'dc-map.tsx',
      `import { Dialog } from '@marigold/components';
      const items = ['a', 'b'];
      const C = () => (
        <Dialog>
          {items.map(i => <Dialog.Content key={i}>{i}</Dialog.Content>)}
        </Dialog>
      );`
    );
    const issues = validateComposition(file);
    expect(issues.filter(i => i.component === 'Dialog')).toEqual([]);
  });

  it('treats {items.filter().map()} chains as dynamic — no false warning', () => {
    const file = tmpFile(
      'dc-chain.tsx',
      `import { Dialog } from '@marigold/components';
      const items = [{ ok: true, text: 'a' }];
      const C = () => (
        <Dialog>
          {items.filter(i => i.ok).map(i => <Dialog.Content key={i.text}>{i.text}</Dialog.Content>)}
        </Dialog>
      );`
    );
    const issues = validateComposition(file);
    expect(issues.filter(i => i.component === 'Dialog')).toEqual([]);
  });

  it('treats {items.flatMap()} children as dynamic — no false empty-compound error', () => {
    const file = tmpFile(
      'dc-flatmap.tsx',
      `import { Select } from '@marigold/components';
      const groups = [['a', 'b'], ['c']];
      const C = () => (
        <Select label="pick">
          {groups.flatMap(g => g.map(i => <Select.Option id={i} key={i}>{i}</Select.Option>))}
        </Select>
      );`
    );
    const issues = validateComposition(file);
    const emptyCompoundErrors = issues.filter(
      i =>
        i.component === 'Select' &&
        i.severity === 'error' &&
        i.message.includes('without any of its sub-components')
    );
    expect(emptyCompoundErrors).toEqual([]);
  });

  it('bare identifier {children} is recognized as dynamic — no false warning', () => {
    const file = tmpFile(
      'dc-bare.tsx',
      `import { Dialog } from '@marigold/components';
      const C = ({ children }: { children: React.ReactNode }) => (
        <Dialog>{children}</Dialog>
      );`
    );
    const issues = validateComposition(file);
    expect(issues.filter(i => i.component === 'Dialog')).toEqual([]);
  });

  it('truly empty compound component is still an error', () => {
    const file = tmpFile(
      'dc-empty.tsx',
      `import { Dialog } from '@marigold/components';
      const C = () => <Dialog><p>bare</p></Dialog>;`
    );
    const issues = validateComposition(file);
    const dialogError = issues.find(
      i => i.component === 'Dialog' && i.severity === 'error'
    );
    expect(dialogError).toBeDefined();
  });
});
