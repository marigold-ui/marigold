import type { Node, Parent } from 'unist';
import { SKIP, visit } from 'unist-util-visit';
import {
  MdxJsxElement,
  extractText,
  findJsxElements,
  flattenChildren,
  getJsxAttr,
} from './shared';

// ============================================================================
// Component Classification
// ============================================================================

// Components to remove entirely (rendering-only, no semantic value for Markdown).
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

// Components to unwrap (keep content, discard wrapper).
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

// Emoji prefixes for semantic message types.
const VARIANT_EMOJI: Record<string, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  success: '✅',
};

// Sub-components to unwrap while preserving content.
const UNWRAP_SUB_COMPONENTS = new Set([
  'Do.Description',
  'Dont.Description',
  'SectionMessage.Content',
]);

// Sub-components to remove entirely.
const REMOVE_SUB_COMPONENTS = new Set(['Do.Figure', 'Dont.Figure']);

// ============================================================================
// Table Conversion
// ============================================================================

/**
 * Converts JSX Table component structure to UNIST table node format.
 * Extracts header and body rows, preserving cell text content.
 * Returns null if no valid table content found.
 */
function convertTableToMarkdown(tableNode: MdxJsxElement): Node | null {
  const children = tableNode.children || [];
  // Find Table.Header element and extract column headers.
  const headers = findJsxElements(children, 'Table.Header');
  const headerCells =
    headers.length > 0
      ? findJsxElements(headers[0].children || [], 'Table.Column').map(
          extractText
        )
      : [];

  // Find Table.Body element and extract all rows and cells.
  const bodies = findJsxElements(children, 'Table.Body');
  const rows: string[][] = [];

  if (bodies.length > 0) {
    const rowElements = findJsxElements(bodies[0].children || [], 'Table.Row');
    for (const row of rowElements) {
      // Extract cell content from each Table.Cell in the row.
      const cells = findJsxElements(row.children || [], 'Table.Cell').map(
        extractText
      );
      if (cells.length > 0) rows.push(cells);
    }
  }

  if (headerCells.length === 0 && rows.length === 0) return null;

  // Build UNIST table structure with rows.
  const tableRows: Node[] = [];

  if (headerCells.length > 0) {
    // Create header row from column headers.
    tableRows.push({
      type: 'tableRow',
      children: headerCells.map(cell => ({
        type: 'tableCell',
        children: [{ type: 'text', value: cell }],
      })),
    } as Node);
  }

  // Add data rows.
  for (const cells of rows) {
    tableRows.push({
      type: 'tableRow',
      children: cells.map(cell => ({
        type: 'tableCell',
        children: [{ type: 'text', value: cell }],
      })),
    } as Node);
  }

  return tableRows.length > 0
    ? ({
        type: 'table',
        align: headerCells.map(() => 'left'),
        children: tableRows,
      } as Node)
    : null;
}

// ============================================================================
// Remark Plugin Implementation
// ============================================================================

/**
 * Remark plugin that simplifies or removes JSX components intended only for UI rendering.
 * Converts semantic components (Table, Message) to Markdown equivalents.
 * Unwraps layout-only components and removes purely presentational elements.
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
          } as Node;
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
          } as Node;
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
          } as Node;
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
              } as Node;
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
          } as Node;
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
