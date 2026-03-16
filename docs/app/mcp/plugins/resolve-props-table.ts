import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { getComponentPath, getSharedProject } from './project';
import { MdxJsxElement, getJsxAttr } from './shared';

function simplifyType(typeText: string): string {
  typeText = typeText.replace(/import\([^)]+\)\./g, '');

  typeText = typeText.replace(/React\./g, '');

  typeText = typeText.replace(/\s*\|\s*undefined$/g, '');

  typeText = typeText.replace(/\s+/g, ' ').trim();

  return typeText;
}

function cleanDescription(desc: string): string {
  const entities: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    '#x27': "'",
    '#xA': ' ',
  };

  return desc
    .replace(/&([a-z#0-9]+);/gi, (match, entity) => entities[entity] || match)
    .replace(/\s+/g, ' ')
    .trim();
}

export function remarkResolvePropsTable() {
  const proj = getSharedProject();

  return (tree: Node) => {
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, i, p: Parent | undefined) => {
        if (node.name !== 'AutoTypeTable' || !p || i === undefined) return;

        const path = getJsxAttr(node, 'path');
        const name = getJsxAttr(node, 'name');
        if (!path || !name) return;

        try {
          const file = getComponentPath(path);

          const sf = proj.getSourceFile(file) ?? proj.addSourceFileAtPath(file);
          const exports = sf.getExportedDeclarations();
          const decl = exports.get(name)?.[0];

          let props: any[] = [];
          if (decl) {
            const type = decl.getType();
            props = type.getProperties();
          }

          if (!props.length) {
            p.children.splice(i, 1);
            return;
          }

          props = props.filter(
            prop => !['variant', 'size'].includes(prop.getName())
          );

          props.sort((a, b) => a.getName().localeCompare(b.getName()));

          (p.children as any)[i] = {
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
              ...props.map(prop => {
                const decl = prop.getDeclarations()[0];
                const rawDescription =
                  decl?.getJsDocs()[0]?.getDescription() || '';
                const description = cleanDescription(rawDescription);

                const rawType = prop.getTypeAtLocation(decl).getText();
                const type = simplifyType(rawType);

                return {
                  type: 'tableRow',
                  children: [
                    {
                      type: 'tableCell',
                      children: [{ type: 'text', value: prop.getName() }],
                    },
                    {
                      type: 'tableCell',
                      children: [{ type: 'inlineCode', value: type }],
                    },
                    {
                      type: 'tableCell',
                      children: [{ type: 'text', value: '-' }],
                    },
                    {
                      type: 'tableCell',
                      children: [{ type: 'text', value: description }],
                    },
                  ],
                };
              }),
            ],
          };
        } catch (e) {
          p.children.splice(i, 1);
        }
      }
    );
  };
}
