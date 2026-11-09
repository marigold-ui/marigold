import MagicString from 'magic-string';
import { type AnyNode, jsxOpeningName } from '../../tsx-ast.js';
import {
  attrName,
  jsxAttributes,
  jsxCodemod,
  jsxElements,
} from '../primitives/jsx.js';
import type { Codemod } from '../types.js';

// v19 (DST-1775): on ComboBox and Autocomplete, `value`/`defaultValue`/
// `onChange` moved from the input text to the selected key. In v18 they always
// meant the text, so both sets are swapped in one pass. Elements already
// carrying a v19 text prop are skipped; a selection-only element is the one
// case a re-run would rename again, which is why the changeset says to run once.

const COMPONENTS = ['ComboBox', 'Autocomplete'];

const TEXT_RENAMES = new Map([
  ['value', 'inputValue'],
  ['defaultValue', 'defaultInputValue'],
  ['onChange', 'onInputChange'],
]);

const SELECTION_RENAMES = new Map([
  ['selectedKey', 'value'],
  ['defaultSelectedKey', 'defaultValue'],
  ['onSelectionChange', 'onChange'],
]);

const V19_TEXT_PROPS = new Set(TEXT_RENAMES.values());

export const comboBoxValueProps: Codemod = jsxCodemod(
  {
    name: 'combobox-value-props',
    description:
      'move ComboBox/Autocomplete text props to inputValue, selection props to value',
  },
  COMPONENTS,
  ({ file, source, locals }) => {
    const s = new MagicString(source);
    const changes: string[] = [];
    const warnings: string[] = [];
    for (const el of jsxElements(file)) {
      const component = locals.get(jsxOpeningName(el) ?? '');
      if (!component) continue;
      const opening = el.openingElement as AnyNode | undefined;
      const attrs = jsxAttributes(opening);
      const names = attrs.map(attrName);

      // any v19 text prop means the element is already migrated
      if (names.some(name => name && V19_TEXT_PROPS.has(name))) continue;

      const hasSpread = (
        (opening?.attributes as AnyNode[] | undefined) ?? []
      ).some(a => a.type === 'JSXSpreadAttribute');
      if (hasSpread) {
        warnings.push(
          `${component}: spread props may carry \`value\`/\`onChange\`, which now mean the selected key — if they hold the input text, pass them as \`inputValue\`/\`onInputChange\``
        );
      }

      for (const attr of attrs) {
        const name = attrName(attr);
        const to = name
          ? (TEXT_RENAMES.get(name) ?? SELECTION_RENAMES.get(name))
          : undefined;
        if (!name || !to) continue;
        const nameNode = attr.name as AnyNode;
        s.overwrite(nameNode.start as number, nameNode.end as number, to);
        changes.push(`${component}: renamed \`${name}\` to \`${to}\``);
      }
    }
    if (changes.length === 0) return { kind: 'unchanged', warnings };
    return { kind: 'edited', output: s.toString(), changes, warnings };
  }
);
