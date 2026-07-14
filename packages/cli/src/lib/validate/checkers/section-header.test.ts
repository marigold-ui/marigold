import { describe, expect, it } from 'vitest';
import { tmpFile } from '../test-support/tmp.js';
import { validateSectionHeader } from './section-header.js';

describe('validateSectionHeader', () => {
  it('flags a Select.Section without a header prop', () => {
    const file = tmpFile(
      'sh-select-no-header.tsx',
      `import { Select } from '@marigold/components';
      const C = () => (
        <Select label="pick">
          <Select.Section>
            <Select.Option id="a">A</Select.Option>
          </Select.Section>
        </Select>
      );`
    );
    const issue = validateSectionHeader(file).find(
      i => i.component === 'Select.Section'
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(issue?.message).toContain('header');
  });

  it('accepts a Select.Section with a header prop', () => {
    const file = tmpFile(
      'sh-select-header.tsx',
      `import { Select } from '@marigold/components';
      const C = () => (
        <Select label="pick">
          <Select.Section header="Group A">
            <Select.Option id="a">A</Select.Option>
          </Select.Section>
        </Select>
      );`
    );
    expect(validateSectionHeader(file)).toEqual([]);
  });

  it('does not flag non-section sub-components', () => {
    const file = tmpFile(
      'sh-option.tsx',
      `import { Select } from '@marigold/components';
      const C = () => (
        <Select label="pick">
          <Select.Option id="a">A</Select.Option>
        </Select>
      );`
    );
    expect(validateSectionHeader(file)).toEqual([]);
  });

  it('does not flag a Select.Section with spread props (header may be inside)', () => {
    const file = tmpFile(
      'sh-select-spread.tsx',
      `import { Select } from '@marigold/components';
      const C = (sectionProps: any) => (
        <Select label="pick">
          <Select.Section {...sectionProps}>
            <Select.Option id="a">A</Select.Option>
          </Select.Section>
        </Select>
      );`
    );
    expect(validateSectionHeader(file)).toEqual([]);
  });

  it('ignores a non-Marigold X.Section tag', () => {
    const file = tmpFile(
      'sh-non-marigold.tsx',
      `const Page = { Section: (props: any) => null } as any;
      const C = () => <Page.Section>x</Page.Section>;`
    );
    expect(validateSectionHeader(file)).toEqual([]);
  });

  it('does not flag a local component that shares the Select name', () => {
    // A project's own <Select> imported from a local module must not be held
    // to Marigold's required-header rule for `.Section` (regression: this was
    // a false-positive error on non-Marigold components).
    const file = tmpFile(
      'sh-local-select.tsx',
      `import { Select } from './my-select';
      const C = () => (
        <Select label="pick">
          <Select.Section>
            <Select.Option id="a">A</Select.Option>
          </Select.Section>
        </Select>
      );`
    );
    expect(validateSectionHeader(file)).toEqual([]);
  });

  it('still flags an aliased Marigold Select.Section without a header', () => {
    const file = tmpFile(
      'sh-alias-select.tsx',
      `import { Select as S } from '@marigold/components';
      const C = () => (
        <S label="pick">
          <S.Section>
            <S.Option id="a">A</S.Option>
          </S.Section>
        </S>
      );`
    );
    const issue = validateSectionHeader(file).find(
      i => i.component === 'S.Section'
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
  });
});
