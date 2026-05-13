import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { appearances } from '@marigold/theme-rui/appearances';
import { MdxJsxElement, getJsxAttr } from './shared';

interface AppearanceData {
  variant: string[];
  size: string[];
}

const EMPTY: AppearanceData = { variant: [], size: [] };

const getAppearance = (name: string): AppearanceData =>
  (appearances as Record<string, AppearanceData>)[name] ?? EMPTY;

const toTypeString = (values: string[]) =>
  values.length > 0 ? values.join(' | ') : '-';

const createTableRow = (cells: string[], codeIndices: number[] = []): Node =>
  ({
    type: 'tableRow',
    children: cells.map((value, i) => ({
      type: 'tableCell',
      children: [
        { type: codeIndices.includes(i) ? 'inlineCode' : 'text', value },
      ],
    })),
  }) as unknown as Node;

export interface ResolveAppearanceTableOptions {
  frontmatterTitle?: string;
}

export function remarkResolveAppearanceTable(
  options: ResolveAppearanceTableOptions = {}
) {
  const { frontmatterTitle } = options;

  return (tree: Node) => {
    visit(
      tree,
      'mdxJsxFlowElement',
      (
        node: MdxJsxElement,
        index: number | undefined,
        parent: Parent | undefined
      ) => {
        if (node.name !== 'AppearanceTable') return;
        if (!parent || typeof index !== 'number') return;

        let componentName = getJsxAttr(node, 'component');
        if (!componentName || componentName === 'title') {
          componentName = frontmatterTitle;
        }
        if (!componentName) return;

        const cleanedName = componentName.replace(/^['"]|['"]$/g, '');
        const data = getAppearance(cleanedName);

        const table: Node = {
          type: 'table',
          align: ['left', 'left', 'left'],
          children: [
            createTableRow(['Property', 'Type', 'Description']),
            createTableRow(
              [
                'variant',
                toTypeString(data.variant),
                'The available variants of this component.',
              ],
              [0, 1]
            ),
            createTableRow(
              [
                'size',
                toTypeString(data.size),
                'The available sizes of this component.',
              ],
              [0, 1]
            ),
          ],
        } as Node;

        (parent.children as Node[])[index] = table;
      }
    );
  };
}
