import type { DocEntry } from 'fumadocs-typescript';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { autoTypeTableTransform } from '../../auto-type-table-transform';
import { getGenerator, resolveComponentPath } from '../../typescript';
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
  return async (tree: Node) => {
    const targets: Array<{
      node: MdxJsxElement;
      index: number;
      parent: Parent;
    }> = [];
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, i, p: Parent | undefined) => {
        if (node.name === 'AutoTypeTable' && p && i !== undefined) {
          targets.push({ node, index: i, parent: p });
        }
      }
    );

    if (targets.length === 0) return;

    const generator = await getGenerator();

    // Reverse so splice indices stay valid as we mutate parent.children.
    for (const { node, index, parent } of targets.reverse()) {
      const pathAttr = getJsxAttr(node, 'path');
      const nameAttr = getJsxAttr(node, 'name');
      const pkgAttr = getJsxAttr(node, 'package') as
        | 'components'
        | 'system'
        | undefined;

      if (!pathAttr || !nameAttr) {
        (parent.children as Node[]).splice(index, 1);
        continue;
      }

      try {
        const filePath = resolveComponentPath({
          path: pathAttr,
          package: pkgAttr,
        });
        const docs = await generator.generateTypeTable(
          { path: filePath, name: nameAttr },
          { transform: autoTypeTableTransform }
        );
        const entries = docs
          .flatMap(d => d.entries)
          .filter(entry => !FILTERED_PROPS.has(entry.name))
          .sort((a, b) => a.name.localeCompare(b.name));

        if (entries.length === 0) {
          (parent.children as Node[]).splice(index, 1);
          continue;
        }

        (parent.children as Node[])[index] = buildTable(entries);
      } catch {
        (parent.children as Node[]).splice(index, 1);
      }
    }
  };
}
