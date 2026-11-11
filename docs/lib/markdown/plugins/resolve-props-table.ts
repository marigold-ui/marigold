import type { DocEntry } from 'fumadocs-typescript';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { type Pkg, getPropTable } from '../../props-data';
import { MdxJsxElement, getJsxAttr } from './shared';

const FILTERED_PROPS = new Set(['variant', 'size']);

// Longer than this and the type stops being readable in a table cell.
const MAX_TYPE_LENGTH = 200;

// The checker prints every optional prop as `T | undefined`. The table marks
// required props instead, so the suffix is noise.
const printType = (entry: DocEntry): string => {
  const type = (entry.type ?? '').replace(/\s*\|\s*undefined$/, '').trim();
  // `((e: Event) => void) | undefined` leaves a pair of redundant parentheses.
  const unwrapped = /^\(\(.*\) => [^()]*\)$/.test(type)
    ? type.slice(1, -1)
    : type;
  return unwrapped && unwrapped.length <= MAX_TYPE_LENGTH
    ? unwrapped
    : entry.simplifiedType;
};

const tagText = (entry: DocEntry, name: string): string | undefined =>
  entry.tags?.find(tag => tag.name === name)?.text.trim() || undefined;

const text = (value: string): Node => ({ type: 'text', value }) as Node;

// JSDoc is written in Markdown. As a plain text node its links and code spans
// came out escaped (`\[MDN]\(https\://…)`), so parse it into inline nodes.
const inline = (markdown: string): Node[] => {
  const source = markdown.replace(/\s+/g, ' ').trim();
  if (!source) return [];
  const tree = unified().use(remarkParse).parse(source) as Parent;
  const [first, ...rest] = tree.children;
  return rest.length === 0 && first?.type === 'paragraph'
    ? ((first as Parent).children as Node[])
    : [text(source)];
};

const describe = (entry: DocEntry): Node[] => {
  const nodes: Node[] = [];
  const label = (value: string) =>
    nodes.push({ type: 'strong', children: [text(value)] } as Node, text(' '));

  if (entry.required) label('Required.');
  if (entry.deprecated) {
    label('Deprecated.');
    const reason = inline(tagText(entry, 'deprecated') ?? '');
    if (reason.length > 0) nodes.push(...reason, text(' '));
  }
  nodes.push(...inline(entry.description));

  // No trailing space when the prop has no description.
  const last = nodes.at(-1) as { type: string; value?: string } | undefined;
  if (last?.type === 'text' && last.value === ' ') nodes.pop();
  return nodes;
};

const buildTable = (entries: DocEntry[]): Node =>
  ({
    type: 'table',
    align: ['left', 'left', 'left', 'left'],
    children: [
      {
        type: 'tableRow',
        children: ['Prop', 'Type', 'Default', 'Description'].map(c => ({
          type: 'tableCell',
          children: [text(c)],
        })),
      },
      ...entries.map(entry => {
        const fallback = tagText(entry, 'default');
        return {
          type: 'tableRow',
          children: [
            { type: 'tableCell', children: [text(entry.name)] },
            {
              type: 'tableCell',
              children: [{ type: 'inlineCode', value: printType(entry) }],
            },
            {
              type: 'tableCell',
              children: [
                fallback ? { type: 'inlineCode', value: fallback } : text('-'),
              ],
            },
            { type: 'tableCell', children: describe(entry) },
          ],
        };
      }),
    ],
  }) as unknown as Node;

export function remarkResolvePropsTable() {
  return (tree: Node) => {
    visit(
      tree,
      'mdxJsxFlowElement',
      (
        node: MdxJsxElement,
        index: number | undefined,
        parent: Parent | undefined
      ) => {
        if (node.name !== 'AutoTypeTable' || !parent || index === undefined)
          return;

        const pathAttr = getJsxAttr(node, 'path');
        const nameAttr = getJsxAttr(node, 'name');
        const pkgAttr = getJsxAttr(node, 'package') as Pkg | undefined;

        const children = parent.children as Node[];

        if (!pathAttr || !nameAttr) {
          children.splice(index, 1);
          return;
        }

        const data = getPropTable({
          path: pathAttr,
          name: nameAttr,
          package: pkgAttr ?? 'components',
        });

        const entries = (data?.entries ?? [])
          .filter(entry => !FILTERED_PROPS.has(entry.name))
          .sort((a, b) => a.name.localeCompare(b.name));

        if (entries.length === 0) {
          children.splice(index, 1);
          return;
        }

        children[index] = buildTable(entries);
      }
    );
  };
}
