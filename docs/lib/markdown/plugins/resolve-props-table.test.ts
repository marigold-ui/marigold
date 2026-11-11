import type { DocEntry } from 'fumadocs-typescript';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { describe, expect, it, vi } from 'vitest';
import { remarkResolvePropsTable } from './resolve-props-table';

const entry = (overrides: Partial<DocEntry> & { name: string }): DocEntry => ({
  description: '',
  tags: [],
  type: 'string | undefined',
  simplifiedType: 'union',
  required: false,
  deprecated: false,
  ...overrides,
});

const entries: DocEntry[] = [
  entry({
    name: 'orientation',
    description: 'The size of the button, see [sizes](/sizes) and `size`.',
    tags: [{ name: 'default', text: "'default'" }],
    type: '"default" | "small" | (string & {}) | undefined',
  }),
  entry({
    name: 'disabled',
    description: 'Disables the button.',
    tags: [{ name: 'default', text: 'false' }],
    type: 'boolean | undefined',
  }),
  entry({
    name: 'value',
    description: 'Value to be formatted.',
    type: 'Date | [Date, Date]',
    simplifiedType: 'union',
    required: true,
  }),
  entry({
    name: 'selectedKey',
    description: 'The selected key.',
    tags: [{ name: 'deprecated', text: 'Use `value` instead.' }],
    type: 'Key | null | undefined',
    deprecated: true,
  }),
  entry({
    name: 'onPress',
    description: 'Called when the press is released.',
    type: '((e: RAC.PressEvent) => void) | undefined',
    simplifiedType: 'function',
  }),
  entry({
    name: 'items',
    type: `Array<{ ${'key: string; '.repeat(30)} }> | undefined`,
    simplifiedType: 'array',
  }),
];

vi.mock('../../props-data', () => ({
  getPropTable: () => ({ entries }),
}));

const toMarkdown = async (mdx: string) =>
  String(
    await unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(remarkGfm)
      .use(remarkResolvePropsTable)
      .use(remarkStringify)
      .process(mdx)
  );

const rows = async () => {
  const md = await toMarkdown(
    '<AutoTypeTable path="Button" name="ButtonProps" />'
  );
  const cells = (line: string) =>
    line
      .split(/(?<!\\)\|/)
      .slice(1, -1)
      .map(cell => cell.trim());
  const lines = md.split('\n').filter(line => line.trim().startsWith('|'));
  return Object.fromEntries(
    lines.slice(2).map(line => {
      const [prop, type, fallback, description] = cells(line);
      return [prop, { type, default: fallback, description }];
    })
  );
};

describe('remarkResolvePropsTable', () => {
  it('prints the real type instead of the kind of type', async () => {
    const table = await rows();

    expect(table.orientation.type).toBe(
      '`"default" \\| "small" \\| (string & {})`'
    );
    expect(table.disabled.type).toBe('`boolean`');
    expect(table.onPress.type).toBe('`(e: RAC.PressEvent) => void`');
  });

  it('falls back to the kind of type when the real one is too long to read', async () => {
    const table = await rows();

    expect(table.items.type).toBe('`array`');
  });

  it('prints the default from the `@default` tag', async () => {
    const table = await rows();

    expect(table.orientation.default).toBe("`'default'`");
    expect(table.disabled.default).toBe('`false`');
    expect(table.onPress.default).toBe('-');
  });

  it('marks required and deprecated props in the description', async () => {
    const table = await rows();

    expect(table.value.description).toBe(
      '**Required.** Value to be formatted.'
    );
    expect(table.selectedKey.description).toBe(
      '**Deprecated.** Use `value` instead. The selected key.'
    );
    expect(table.orientation.description).toBe(
      'The size of the button, see [sizes](/sizes) and `size`.'
    );
  });
});
