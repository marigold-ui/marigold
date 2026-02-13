import type { Node, Parent } from 'unist';
import { SKIP, visit } from 'unist-util-visit';
import {
  HTML_TABLE_ELEMENTS,
  REMOVE_COMPONENTS,
  REMOVE_SUB_COMPONENTS,
  UNWRAP_COMPONENTS,
  UNWRAP_SUB_COMPONENTS,
  VARIANT_EMOJI,
} from './jsx-config';
import {
  MdxJsxElement,
  extractText,
  findJsxElements,
  flattenChildren,
  getJsxAttr,
} from './shared';
import {
  convertHtmlTableToMarkdown,
  convertTableToMarkdown,
} from './table-converters';

export function remarkSimplifyJsx() {
  return (tree: Node) => {
    const processElement = (
      node: MdxJsxElement,
      index: number,
      parent: Parent
    ): any => {
      const name = node.name;

      if (REMOVE_COMPONENTS.has(name)) {
        (parent.children as Node[]).splice(index, 1);
        return [SKIP, index];
      }

      if (UNWRAP_COMPONENTS.has(name)) {
        (parent.children as Node[]).splice(index, 1, ...(node.children || []));
        return [SKIP, index];
      }

      if (name === 'Do' || name === 'Dont') {
        const prefix = name === 'Do' ? '✓' : '✗';
        const text = extractText(node);

        if (text) {
          (parent.children as Node[])[index] = {
            type: 'paragraph',
            children: [{ type: 'text', value: `${prefix} ${text}` }],
          } as Node;
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      if (UNWRAP_SUB_COMPONENTS.has(name)) {
        const children = flattenChildren(node);
        (parent.children as Node[]).splice(index, 1, ...children);
        return [SKIP, index];
      }

      if (REMOVE_SUB_COMPONENTS.has(name)) {
        (parent.children as Node[]).splice(index, 1);
        return [SKIP, index];
      }

      if (name === 'SectionMessage') {
        const variant = getJsxAttr(node, 'variant') || 'info';
        const children = flattenChildren(node);

        if (children.length > 0) {
          (parent.children as Node[])[index] = {
            type: 'blockquote',
            children: [
              {
                type: 'paragraph',
                children: [
                  { type: 'text', value: `${VARIANT_EMOJI[variant] || 'ℹ️'} ` },
                  ...children,
                ],
              },
            ],
          } as Node;
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      if (name === 'Callout') {
        const type = getJsxAttr(node, 'type') || 'info';
        const title = getJsxAttr(node, 'title');
        const children = flattenChildren(node);
        const emoji = VARIANT_EMOJI[type] || 'ℹ️';

        if (children.length > 0 || title) {
          const paragraphChildren: Node[] = [
            { type: 'text', value: `${emoji} ` } as Node,
          ];

          if (title) {
            paragraphChildren.push({
              type: 'text',
              value: `${title}: `,
            } as Node);
          }

          paragraphChildren.push(...children);

          (parent.children as Node[])[index] = {
            type: 'blockquote',
            children: [
              {
                type: 'paragraph',
                children: paragraphChildren,
              },
            ],
          } as Node;
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      if (name === 'SectionMessage.Title') {
        const children = flattenChildren(node);
        if (children.length > 0) {
          (parent.children as Node[])[index] = {
            type: 'paragraph',
            children: [
              { type: 'strong', children },
              { type: 'text', value: ': ' },
            ],
          } as Node;
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      if (name === 'Table') {
        const markdownTable = convertTableToMarkdown(node);
        if (markdownTable) {
          (parent.children as Node[])[index] = markdownTable;
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      if (name === 'table') {
        const markdownTable = convertHtmlTableToMarkdown(node);
        if (markdownTable) {
          (parent.children as Node[])[index] = markdownTable;
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      if (['thead', 'tbody', 'tr', 'th', 'td'].includes(name)) {
        if (node.type === 'mdxJsxFlowElement') {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      if (name.startsWith('Table.')) {
        if (node.type === 'mdxJsxFlowElement') {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      if (name === 'IconList') {
        const iconsAttr = node.attributes?.find(
          (a: any) => a.name === 'icons'
        ) as any;
        if (iconsAttr?.value?.type === 'mdxJsxAttributeValueExpression') {
          try {
            const expr = iconsAttr.value.value;
            const iconNames = expr
              .replace(/[[\]'"\s]/g, '')
              .split(',')
              .filter(Boolean);
            if (iconNames.length > 0) {
              const iconList = iconNames.map((icon: string) => ({
                type: 'listItem',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'inlineCode', value: icon }],
                  },
                ],
              }));
              (parent.children as Node[])[index] = {
                type: 'list',
                ordered: false,
                children: iconList,
              } as Node;
              return;
            }
          } catch {
            // Silently ignore parsing errors
          }
        }
        (parent.children as Node[]).splice(index, 1);
        return [SKIP, index];
      }

      if (name === 'TeaserList') {
        const itemsAttr = node.attributes?.find(
          (a: any) => a.name === 'items'
        ) as any;
        if (itemsAttr?.value?.type === 'mdxJsxAttributeValueExpression') {
          try {
            const expr = itemsAttr.value.value;
            const items: { title: string; href: string; caption?: string }[] =
              [];

            const titleMatches = expr.matchAll(/title:\s*['"]([^'"]+)['"]/g);
            const hrefMatches = expr.matchAll(/href:\s*['"]([^'"]+)['"]/g);
            const captionMatches = expr.matchAll(
              /caption:\s*['"]([^'"]+)['"]/g
            );

            const titles = [...titleMatches].map(m => m[1]);
            const hrefs = [...hrefMatches].map(m => m[1]);
            const captions = [...captionMatches].map(m => m[1]);

            for (let i = 0; i < titles.length; i++) {
              items.push({
                title: titles[i],
                href: hrefs[i] || '',
                caption: captions[i],
              });
            }

            if (items.length > 0) {
              const listItems = items.map(item => ({
                type: 'listItem',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'link',
                        url: item.href,
                        children: [{ type: 'text', value: item.title }],
                      },
                      ...(item.caption
                        ? [{ type: 'text', value: ` - ${item.caption}` }]
                        : []),
                    ],
                  },
                ],
              }));
              (parent.children as Node[])[index] = {
                type: 'list',
                ordered: false,
                children: listItems,
              } as Node;
              return;
            }
          } catch {
            //
          }
        }
        (parent.children as Node[]).splice(index, 1);
        return [SKIP, index];
      }

      if (name === 'Badge') {
        const text = extractText(node);
        if (text) {
          (parent.children as Node[])[index] = {
            type: 'text',
            value: `(${text})`,
          } as Node;
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }
    };

    visit(
      tree,
      'mdxJsxTextElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (parent && typeof index === 'number') {
          return processElement(node, index, parent);
        }
      }
    );

    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (parent && typeof index === 'number') {
          return processElement(node, index, parent);
        }
      }
    );

    const cleanExpression = (
      node: any,
      index: number,
      parent: Parent
    ): [typeof SKIP, number] | void => {
      const value = node.value?.trim() || '';
      if (
        value.startsWith('/*') ||
        value === '' ||
        value.includes('prettier-ignore')
      ) {
        (parent.children as Node[]).splice(index, 1);
        return [SKIP, index];
      }
    };

    visit(
      tree,
      'mdxFlowExpression',
      (node: any, index, parent: Parent | undefined) => {
        if (parent && typeof index === 'number')
          return cleanExpression(node, index, parent);
      }
    );

    visit(
      tree,
      'mdxTextExpression',
      (node: any, index, parent: Parent | undefined) => {
        if (parent && typeof index === 'number')
          return cleanExpression(node, index, parent);
      }
    );
  };
}
