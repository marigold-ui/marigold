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
 * Cleans text by normalizing whitespace.
 * Input comes from react-docgen-typescript (trusted source),
 * so we don't need to sanitize HTML or decode entities.
 */
function cleanText(text: string): string {
  return text.trim();
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
      // Build cell children based on formatting requirements.
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

  // Build table rows with proper AST structure.
  const rows: Node[] = [
    createTableRow([
      { value: 'Prop' },
      { value: 'Type' },
      { value: 'Default' },
      { value: 'Description' },
    ]),
  ];

  // Generate a row for each prop with proper formatting.
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

  // Load props.json at plugin initialization time.
  let propsJson: PropsJson = {};
  try {
    propsJson = JSON.parse(fs.readFileSync(propsJsonPath, 'utf-8'));
  } catch {
    // Log warning but allow plugin to continue with empty registry.
    console.warn('[PropsTable] Could not load props.json');
  }

  return (tree: Node) => {
    // Visit all mdxJsxFlowElement nodes (MDX components) in the AST.
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (node.name !== 'PropsTable') return;
        if (!parent || typeof index !== 'number') return;

        // Get component name from JSX attribute or use frontmatter title.
        let componentName = getJsxAttr(node, 'component');
        if (componentName === 'title' && frontmatterTitle) {
          componentName = frontmatterTitle;
        }

        if (!componentName) return;

        // Look up component props and generate table or not-found message.
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

        // Replace JSX component node with generated table or message.
        (parent.children as Node[])[index] = tableNode;
      }
    );
  };
}
