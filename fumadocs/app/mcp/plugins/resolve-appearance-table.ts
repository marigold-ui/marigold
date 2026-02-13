import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MdxJsxElement, getJsxAttr } from './shared';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface AppearanceData {
  variant: string[];
  size: string[];
}

type AppearancesMap = Record<string, AppearanceData>;

function loadAppearances(): AppearancesMap {
  try {
    const jsonPath = path.join(__dirname, '..', 'appearances.json');
    const content = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return {};
  }
}

const appearances = loadAppearances();

const SHARED_APPEARANCES: Record<string, string> = {
  LinkButton: 'Button',
  ToggleButtonGroup: 'ToggleButton',
};

function getAppearance(name: string): AppearanceData {
  const componentName = SHARED_APPEARANCES[name] || name;
  return appearances[componentName] || { variant: [], size: [] };
}

function createTableRow(
  cells: string[],
  type: 'text' | 'inlineCode' = 'text',
  codeIndices: number[] = []
): Node {
  return {
    type: 'tableRow',
    children: cells.map((value, i) => ({
      type: 'tableCell',
      children: [
        {
          type: codeIndices.includes(i) ? 'inlineCode' : type,
          value,
        },
      ],
    })),
  } as Parent;
}

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
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (node.name !== 'AppearanceTable') return;
        if (!parent || typeof index !== 'number') return;

        let componentName = getJsxAttr(node, 'component');
        if (!componentName || componentName === 'title') {
          componentName = frontmatterTitle;
        }
        if (!componentName) return;

        const cleanedName = componentName.replace(/^['"]|['"]$/g, '');

        const componentAppearances = getAppearance(cleanedName);

        const variantType =
          componentAppearances.variant.length > 0
            ? componentAppearances.variant.join(' | ')
            : '-';

        const sizeType =
          componentAppearances.size.length > 0
            ? componentAppearances.size.join(' | ')
            : '-';

        const table: Node = {
          type: 'table',
          align: ['left', 'left', 'left'],
          children: [
            createTableRow(['Property', 'Type', 'Description'], 'text'),
            createTableRow(
              [
                'variant',
                variantType,
                'The available variants of this component.',
              ],
              'inlineCode',
              [0, 1]
            ),
            createTableRow(
              ['size', sizeType, 'The available sizes of this component.'],
              'inlineCode',
              [0, 1]
            ),
          ],
        } as Node;

        (parent.children as Node[])[index] = table;
      }
    );
  };
}
