import type { DocEntry } from 'fumadocs-typescript';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { type Pkg, getPropTable } from '../../props-data';
import { MdxJsxElement, getJsxAttr } from './shared';

const FILTERED_PROPS = new Set(['variant', 'size']);

const buildTable = (entries: DocEntry[]): Node =>
  ({
    type: 'table',
    align: ['left', 'left', 'left', 'left'],
    children: [
      {
        type: 'tableRow',
        children: ['Prop', 'Type', 'Default', 'Description'].map(c => ({
          type: 'tableCell',
          children: [{ type: 'text', value: c }],
        })),
      },
      ...entries.map(entry => ({
        type: 'tableRow',
        children: [
          {
            type: 'tableCell',
            children: [{ type: 'text', value: entry.name }],
          },
          {
            type: 'tableCell',
            children: [{ type: 'inlineCode', value: entry.simplifiedType }],
          },
          {
            type: 'tableCell',
            children: [{ type: 'text', value: '-' }],
          },
          {
            type: 'tableCell',
            children: [
              {
                type: 'text',
                value: entry.description.replace(/\s+/g, ' ').trim(),
              },
            ],
          },
        ],
      })),
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
