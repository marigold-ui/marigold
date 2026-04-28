import { type Symbol as MorphSymbol, type Project, SyntaxKind } from 'ts-morph';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { getProject, resolveComponentPath } from '../../typescript';
import { MdxJsxElement, getJsxAttr } from './shared';

interface AppearanceData {
  variant: string[];
  size: string[];
}

function extractStringLiterals(typeString: string): string[] {
  return [...typeString.matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
}

function getAppearance(name: string, proj: Project): AppearanceData {
  try {
    const componentPath = resolveComponentPath({ path: name });

    const sourceFile =
      proj.getSourceFile(componentPath) ??
      proj.addSourceFileAtPath(componentPath);

    if (!sourceFile) return { variant: [], size: [] };

    const exportedDecl = sourceFile
      .getExportedDeclarations()
      .get(`${name}Props`)?.[0];

    if (!exportedDecl?.isKind(SyntaxKind.InterfaceDeclaration)) {
      return { variant: [], size: [] };
    }

    const appearanceData: AppearanceData = { variant: [], size: [] };

    exportedDecl
      .getType()
      .getProperties()
      .forEach((prop: MorphSymbol) => {
        const propName = prop.getName();
        if (propName !== 'variant' && propName !== 'size') return;

        const typeStr = prop
          .getTypeAtLocation(sourceFile)
          .getText()
          .replace(/\s+/g, ' ');
        appearanceData[propName] = extractStringLiterals(typeStr);
      });

    return appearanceData;
  } catch {
    return { variant: [], size: [] };
  }
}

const toTypeString = (values: string[]) =>
  values.length > 0 ? values.join(' | ') : '-';

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

  return async (tree: Node) => {
    const proj = await getProject();

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
        const componentAppearances = getAppearance(cleanedName, proj);

        const variantType = toTypeString(componentAppearances.variant);
        const sizeType = toTypeString(componentAppearances.size);

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
