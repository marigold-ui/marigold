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

// Whether the `(` at the start of `type` is closed by the `)` at its end, and
// not earlier, as in `((a: A) => void) | ((b: B) => void)`.
const isWrapped = (type: string): boolean => {
  if (!type.startsWith('(') || !type.endsWith(')')) return false;
  let depth = 0;
  for (let i = 0; i < type.length; i++) {
    if (type[i] === '(') depth++;
    else if (type[i] === ')') depth--;
    if (depth === 0 && i < type.length - 1) return false;
  }
  return true;
};

// The checker prints every optional prop as `T | undefined`. The table marks
// required props instead, so the suffix is noise.
const printType = (entry: DocEntry): string => {
  const type = (entry.type ?? '').replace(/\s*\|\s*undefined$/, '').trim();
  // `((e: Event) => void) | undefined` leaves a pair of redundant parentheses.
  const unwrapped =
    /^\(\(.*\) => [^()]*\)$/.test(type) && isWrapped(type)
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

// Every component that spreads onto a DOM element inherits about 70 handlers
// (`onClick`, `onMouseDownCapture`, …) with no JSDoc. One row each made them
// two thirds of a props table without telling a reader anything.
const isBareDomHandler = (entry: DocEntry): boolean =>
  /^on[A-Z]/.test(entry.name) && !entry.description.trim();

const listDomHandlers = (entries: DocEntry[]): Node | null => {
  const names = new Set(entries.map(entry => entry.name));
  // `xCapture` is folded into `x` only when `x` is in the same list. Otherwise
  // it stays as its own name, so the line never claims a variant it can't back.
  const base = [...names].filter(
    name => !name.endsWith('Capture') || !names.has(name.slice(0, -7))
  );
  if (base.length === 0) return null;

  const hasCapture = base.some(name => names.has(`${name}Capture`));
  const children: Node[] = [text('Also accepts the DOM event handlers ')];
  base.forEach((name, i) => {
    if (i > 0) children.push(text(i === base.length - 1 ? ' and ' : ', '));
    children.push({ type: 'inlineCode', value: name } as Node);
  });
  if (hasCapture) {
    children.push(
      text(', and their '),
      { type: 'inlineCode', value: 'Capture' } as Node,
      text(' variants where React defines one.')
    );
  } else {
    children.push(text('.'));
  }
  return { type: 'paragraph', children } as unknown as Node;
};

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

        const rows = entries.filter(entry => !isBareDomHandler(entry));
        const handlers = listDomHandlers(entries.filter(isBareDomHandler));

        children.splice(
          index,
          1,
          ...(rows.length > 0 ? [buildTable(rows)] : []),
          ...(handlers ? [handlers] : [])
        );
      }
    );
  };
}
