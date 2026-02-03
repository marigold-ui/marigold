import type { Node, Parent } from 'unist';
import { SKIP, visit } from 'unist-util-visit';
import {
  MdxJsxElement,
  extractText,
  findJsxElements,
  flattenChildren,
  getJsxAttr,
} from './shared';

const REMOVE_COMPONENTS = new Set([
  'Image',
  'TeaserCard',
  'StorybookHintMessage',
  'Toc',
  'Logo',
  'FullsizeView',
  'CopyButton',
  'LatestPost',
  'PostList',
  'iframe',
  'p',
  'svg',
]);

const UNWRAP_COMPONENTS = new Set([
  'GuidelineTiles',
  'Stack',
  'Inline',
  'Center',
  'Columns',
  'Tiles',
  'Scrollable',
  'Inset',
  'Split',
  'div',
]);

const VARIANT_EMOJI: Record<string, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  success: '✅',
};

const UNWRAP_SUB_COMPONENTS = new Set([
  'Do.Description',
  'Dont.Description',
  'SectionMessage.Content',
]);

const REMOVE_SUB_COMPONENTS = new Set(['Do.Figure', 'Dont.Figure']);

function convertTableToMarkdown(tableNode: MdxJsxElement): Node | null {
  const children = tableNode.children || [];
  const headers = findJsxElements(children, 'Table.Header');
  const headerCells =
    headers.length > 0
      ? findJsxElements(headers[0].children || [], 'Table.Column').map(
          extractText
        )
      : [];

  const bodies = findJsxElements(children, 'Table.Body');
  const rows: string[][] = [];

  if (bodies.length > 0) {
    const rowElements = findJsxElements(bodies[0].children || [], 'Table.Row');
    for (const row of rowElements) {
      const cells = findJsxElements(row.children || [], 'Table.Cell').map(
        extractText
      );
      if (cells.length > 0) rows.push(cells);
    }
  }

  if (headerCells.length === 0 && rows.length === 0) return null;

  const tableRows: Node[] = [];

  if (headerCells.length > 0) {
    tableRows.push({
      type: 'tableRow',
      children: headerCells.map(cell => ({
        type: 'tableCell',
        children: [{ type: 'text', value: cell }],
      })),
    });
  }

  for (const cells of rows) {
    tableRows.push({
      type: 'tableRow',
      children: cells.map(cell => ({
        type: 'tableCell',
        children: [{ type: 'text', value: cell }],
      })),
    });
  }

  return tableRows.length > 0
    ? {
        type: 'table',
        align: headerCells.map(() => 'left'),
        children: tableRows,
      }
    : null;
}

// ============================================================================
// Plugin
// ============================================================================

/**
 * Simplifies or removes JSX components that are only for UI rendering.
 */
export function remarkSimplifyJsx() {
  return (tree: Node) => {
    const processElement = (
      node: MdxJsxElement,
      index: number,
      parent: Parent
    ): any => {
      const name = node.name;

      // Remove visual-only components
      if (REMOVE_COMPONENTS.has(name)) {
        (parent.children as Node[]).splice(index, 1);
        return [SKIP, index];
      }

      // Unwrap layout components
      if (UNWRAP_COMPONENTS.has(name)) {
        (parent.children as Node[]).splice(index, 1, ...(node.children || []));
        return [SKIP, index];
      }

      // Do/Dont → ✓/✗ prefixed text
      if (name === 'Do' || name === 'Dont') {
        const prefix = name === 'Do' ? '✓' : '✗';
        const text = extractText(node);

        if (text) {
          (parent.children as Node[])[index] = {
            type: 'paragraph',
            children: [{ type: 'text', value: `${prefix} ${text}` }],
          };
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      // Unwrap sub-components
      if (UNWRAP_SUB_COMPONENTS.has(name)) {
        const children = flattenChildren(node);
        (parent.children as Node[]).splice(index, 1, ...children);
        return [SKIP, index];
      }

      // Remove sub-components
      if (REMOVE_SUB_COMPONENTS.has(name)) {
        (parent.children as Node[]).splice(index, 1);
        return [SKIP, index];
      }

      // SectionMessage → blockquote with emoji
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
          };
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      // SectionMessage.Title → bold
      if (name === 'SectionMessage.Title') {
        const children = flattenChildren(node);
        if (children.length > 0) {
          (parent.children as Node[])[index] = {
            type: 'paragraph',
            children: [
              { type: 'strong', children },
              { type: 'text', value: ': ' },
            ],
          };
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      // Table → Markdown table
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

      // Table sub-components: only remove orphaned flow elements
      if (name.startsWith('Table.')) {
        if (node.type === 'mdxJsxFlowElement') {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }

      // IconList → list of icon names
      if (name === 'IconList') {
        const iconsAttr = node.attributes?.find(
          (a: any) => a.name === 'icons'
        ) as any;
        if (iconsAttr?.value?.type === 'mdxJsxAttributeValueExpression') {
          try {
            // Parse the array expression like ['ArrowUp', 'ArrowDown']
            const expr = iconsAttr.value.value;
            const iconNames = expr
              .replace(/[\[\]'"\s]/g, '')
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
              };
              return;
            }
          } catch {
            // Fall through to removal
          }
        }
        (parent.children as Node[]).splice(index, 1);
        return [SKIP, index];
      }

      // TeaserList → list of links
      if (name === 'TeaserList') {
        const itemsAttr = node.attributes?.find(
          (a: any) => a.name === 'items'
        ) as any;
        if (itemsAttr?.value?.type === 'mdxJsxAttributeValueExpression') {
          try {
            // Parse items array - extract title and href
            const expr = itemsAttr.value.value;
            const items: { title: string; href: string; caption?: string }[] =
              [];

            // Match title and href patterns
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
              };
              return;
            }
          } catch {
            // Fall through to removal
          }
        }
        (parent.children as Node[]).splice(index, 1);
        return [SKIP, index];
      }

      // Badge → text in parentheses
      if (name === 'Badge') {
        const text = extractText(node);
        if (text) {
          (parent.children as Node[])[index] = {
            type: 'text',
            value: `(${text})`,
          };
        } else {
          (parent.children as Node[]).splice(index, 1);
          return [SKIP, index];
        }
        return;
      }
    };

    // Process inline elements first, then block elements
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

    // Remove MDX expression comments (flow and inline)
    const cleanExpression = (node: any, index: number, parent: Parent) => {
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
