import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import { MdxJsxElement, getJsxAttr } from './shared';

// ============================================================================
// Types
// ============================================================================

interface PropDefinition {
  name: string;
  type: { name: string; value: string };
  defaultValue: { value: string } | null;
  description: string;
  required: boolean;
}

type PropsJson = Record<string, Record<string, PropDefinition>>;

// ============================================================================
// Helpers
// ============================================================================

/**
 * Cleans text by removing HTML tags and normalizing whitespace.
 * Simple regex-based approach sufficient for prop type/description text.
 */
function cleanText(text: string): string {
  return text
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Creates a UNIST table row node with cells containing specified values.
 * Supports mixed content: plain text and inline code nodes.
 */
function createTableRow(
  cells: Array<{ value: string; code?: boolean; strong?: boolean }>
): Node {
  return {
    type: 'tableRow',
    children: cells.map(cell => {
      let cellChildren;

      if (cell.strong) {
        cellChildren = [
          {
            type: 'strong',
            children: [{ type: 'text', value: cell.value }],
          },
        ];
      } else if (cell.code) {
        cellChildren = [{ type: 'inlineCode', value: cell.value }];
      } else {
        cellChildren = [{ type: 'text', value: cell.value }];
      }

      return { type: 'tableCell', children: cellChildren };
    }),
  } as Node;
}

// ============================================================================
// Table Generation
// ============================================================================

/**
 * Creates a UNIST table node representing component props.
 * Formats props with name, type, default value, and description columns.
 * Returns paragraph with message if no props found.
 */
function createPropsTable(props: Record<string, PropDefinition>): Node {
  const entries = Object.values(props);

  if (entries.length === 0) {
    return {
      type: 'paragraph',
      children: [{ type: 'text', value: 'This component has no props.' }],
    } as Node;
  }

  const rows: Node[] = [
    createTableRow([
      { value: 'Prop' },
      { value: 'Type' },
      { value: 'Default' },
      { value: 'Description' },
    ]),
  ];

  for (const prop of entries) {
    const nameValue = prop.required ? `${prop.name} (required)` : prop.name;
    const typeValue = cleanText(prop.type.name);
    const defaultValue = prop.defaultValue
      ? cleanText(prop.defaultValue.value)
      : '-';
    const descValue = cleanText(prop.description).replace(/\n/g, ' ');

    rows.push(
      createTableRow([
        { value: nameValue, strong: prop.required },
        { value: typeValue, code: true },
        { value: defaultValue, code: defaultValue !== '-' },
        { value: descValue },
      ])
    );
  }

  return {
    type: 'table',
    align: ['left', 'left', 'left', 'left'],
    children: rows,
  } as Node;
}

// ============================================================================
// Remark Plugin Implementation
// ============================================================================

export interface ResolvePropsTableOptions {
  propsJsonPath: string;
  frontmatterTitle?: string;
}

/**
 * Remark plugin that replaces <PropsTable component="..." /> JSX with markdown tables.
 * Loads component prop definitions from JSON registry and generates formatted tables.
 * Falls back to "not found" message if component props unavailable.
 */
export function remarkResolvePropsTable(options: ResolvePropsTableOptions) {
  const { propsJsonPath, frontmatterTitle } = options;

  let propsJson: PropsJson = {};
  try {
    propsJson = JSON.parse(fs.readFileSync(propsJsonPath, 'utf-8'));
  } catch {
    console.warn('[PropsTable] Could not load props.json');
  }

  return (tree: Node) => {
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (node.name !== 'PropsTable') return;
        if (!parent || typeof index !== 'number') return;

        let componentName = getJsxAttr(node, 'component');
        if (componentName === 'title' && frontmatterTitle) {
          componentName = frontmatterTitle;
        }

        if (!componentName) return;

        const props = propsJson[componentName];
        const tableNode = props
          ? createPropsTable(props)
          : ({
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  value: `Props for "${componentName}" not found.`,
                },
              ],
            } as Node);

        (parent.children as Node[])[index] = tableNode;
      }
    );
  };
}
