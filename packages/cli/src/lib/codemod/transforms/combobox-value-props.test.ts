import { assertEdited } from '../test-helpers.js';
import type { CodemodOutcome } from '../types.js';
import { comboBoxValueProps } from './combobox-value-props.js';

const warningsOf = (result: CodemodOutcome): string[] =>
  result.kind === 'skipped' ? [] : result.warnings;

describe('combobox-value-props', () => {
  test('swaps text and selection props on a v18 element', () => {
    const source = `import { ComboBox } from '@marigold/components';
export const App = () => (
  <ComboBox value={text} onChange={setText} selectedKey={key} onSelectionChange={setKey} label="Animals" />
);
`;

    const result = comboBoxValueProps.apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      '<ComboBox inputValue={text} onInputChange={setText} value={key} onChange={setKey} label="Animals" />'
    );
    expect(result.changes).toHaveLength(4);
  });

  test('renames a selection-only v18 element', () => {
    const source = `import { Autocomplete } from '@marigold/components';
export const App = () => <Autocomplete defaultSelectedKey="cat" />;
`;

    const result = comboBoxValueProps.apply(source);

    assertEdited(result);
    expect(result.output).toContain('<Autocomplete defaultValue="cat" />');
  });

  test('is a no-op on its own output', () => {
    const source = `import { ComboBox } from '@marigold/components';
export const App = () => <ComboBox value={text} selectedKey={key} />;
`;

    const first = comboBoxValueProps.apply(source);
    assertEdited(first);
    const second = comboBoxValueProps.apply(first.output);

    expect(second.kind).toBe('unchanged');
  });

  test('renames text-only v18 props to the input props', () => {
    const source = `import { ComboBox } from '@marigold/components';
export const App = () => <ComboBox value={text} onChange={setText} />;
`;

    const result = comboBoxValueProps.apply(source);

    assertEdited(result);
    expect(result.output).toContain(
      '<ComboBox inputValue={text} onInputChange={setText} />'
    );
  });

  test('warns about spread props, which may carry the text props', () => {
    const source = `import { ComboBox } from '@marigold/components';
export const App = () => <ComboBox {...field} label="Animals" />;
`;

    const result = comboBoxValueProps.apply(source);

    expect(warningsOf(result)).toEqual([
      expect.stringContaining('ComboBox: spread props'),
    ]);
  });

  test('leaves elements that already use the v19 text props alone', () => {
    const source = `import { ComboBox } from '@marigold/components';
export const App = () => <ComboBox inputValue={text} value={key} />;
`;

    const result = comboBoxValueProps.apply(source);

    expect(result.kind).toBe('unchanged');
    expect(warningsOf(result)).toEqual([]);
  });

  test('follows aliased imports and ignores foreign components', () => {
    const source = `import { ComboBox as Combo } from '@marigold/components';
import { ComboBox } from 'react-aria-components';
export const App = () => (
  <>
    <Combo selectedKey={key} />
    <ComboBox selectedKey={key} />
  </>
);
`;

    const result = comboBoxValueProps.apply(source);

    assertEdited(result);
    expect(result.output).toContain('<Combo value={key} />');
    expect(result.output).toContain('<ComboBox selectedKey={key} />');
  });
});
