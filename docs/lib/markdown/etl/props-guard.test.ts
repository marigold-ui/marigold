import { describe, expect, it } from 'vitest';
import { assertPropsTables, hasPropsTable } from './props-guard';

const table =
  '| Prop | Type | Default | Description | \n| :--- | :--- | :--- | :--- |\n| size | `string` | - | The size. |';

describe('hasPropsTable', () => {
  it('finds a props table', () => {
    expect(hasPropsTable(`Intro.\n\n${table}`)).toBe(true);
  });

  it('ignores other tables', () => {
    expect(
      hasPropsTable('| Key | Action |\n| --- | --- |\n| Tab | Next |')
    ).toBe(false);
  });
});

describe('assertPropsTables', () => {
  it('returns how many chunks carry a props table', () => {
    expect(
      assertPropsTables([{ originalText: table }, { originalText: 'Prose.' }])
    ).toBe(1);
  });

  it('throws when no chunk carries a props table', () => {
    expect(() => assertPropsTables([{ originalText: 'Prose.' }])).toThrow(
      /No chunk contains a props table/
    );
  });
});
