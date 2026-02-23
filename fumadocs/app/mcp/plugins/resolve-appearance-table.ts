import { Project, SyntaxKind } from 'ts-morph';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { getComponentPath, getSharedProject } from './project';
import { MdxJsxElement, getJsxAttr } from './shared';

interface AppearanceData {
  variant: string[];
  size: string[];
}

function extractStringLiterals(typeString: string): string[] {
  const literals: string[] = [];
  const regex = /['"]([^'"]+)['"]/g;
  let match;
  while ((match = regex.exec(typeString)) !== null) {
    literals.push(match[1]);
  }
  return literals;
}

function getAppearance(name: string): AppearanceData {
  try {
    const componentPath = getComponentPath(name);
    const proj = getSharedProject();

    // Use addSourceFileAtPath to ensure the file is loaded into the project
    let sourceFile;
    try {
      sourceFile =
        proj.getSourceFile(componentPath) ??
        proj.addSourceFileAtPath(componentPath);
    } catch {
      return { variant: [], size: [] };
    }

    if (!sourceFile) return { variant: [], size: [] };

    const exportedDecl = sourceFile
      .getExportedDeclarations()
      .get(`${name}Props`)?.[0];

    if (
      !exportedDecl ||
      !exportedDecl.isKind(SyntaxKind.InterfaceDeclaration)
    ) {
      return { variant: [], size: [] };
    }

    const type = exportedDecl.getType();
    const props = type.getProperties();

    const appearanceData: AppearanceData = { variant: [], size: [] };

    props.forEach((prop: any) => {
      const propName = prop.getName();
      if (propName === 'variant' || propName === 'size') {
        const typeStr = prop
          .getTypeAtLocation(sourceFile)
          .getText()
          .replace(/\s+/g, ' ');
        const values = extractStringLiterals(typeStr);
        if (propName === 'variant') {
          appearanceData.variant = values;
        } else {
          appearanceData.size = values;
        }
      }
    });

    return appearanceData;
  } catch {
    return { variant: [], size: [] };
  }
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
      (node: MdxJsxElement, index: any, parent: Parent | undefined) => {
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
