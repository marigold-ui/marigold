import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import type { ConfigSchema, Theme } from '@marigold/system';
import { MdxJsxElement, getJsxAttr } from './shared';

// ============================================================================
// Theme Helpers
// ============================================================================

/**
 * Extracts variant and size keys from component config schema.
 * Returns object with arrays of variant and size option names.
 */
const getKeys = (schema: ConfigSchema) => ({
  variant: schema?.variant ? Object.keys(schema.variant) : [],
  size: schema?.size ? Object.keys(schema.size) : [],
});

/**
 * Extracts variant and size keys from slot-based component schema.
 * Aggregates all available variants and sizes across all slots.
 */
const getKeysFromSlots = (
  slots: Record<string, { variants: ConfigSchema }>
) => {
  const v = new Set<string>();
  const s = new Set<string>();

  // Collect all variant and size names from each slot.
  Object.values(slots).forEach(slot => {
    Object.keys(slot.variants?.variant ?? {}).forEach(k => v.add(k));
    Object.keys(slot.variants?.size ?? {}).forEach(k => s.add(k));
  });

  return { variant: [...v], size: [...s] };
};

// Mapping of component names that share appearance variants with other components.
const SHARED_APPEARANCES: Record<string, string> = {
  LinkButton: 'Button',
  ToggleButtonGroup: 'ToggleButton',
};

/**
 * Retrieves appearance variants and sizes for a component from the theme.
 * Handles both direct schema and slot-based component configurations.
 */
function getAppearance(name: string, theme: Theme) {
  // Use mapped component name if this component shares appearances with another.
  const componentName = SHARED_APPEARANCES[name] || name;
  const styles = (theme.components as any)[componentName] || {};

  // Choose extraction method based on component structure.
  return 'variants' in styles
    ? getKeys(styles.variants as ConfigSchema)
    : getKeysFromSlots(styles);
}

// ============================================================================
// Table Creation
// ============================================================================

/**
 * Creates a UNIST table row node with cells containing specified values.
 * Supports formatted text (plain text or inline code) for specific cells.
 */
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
          // Use inline code for specified cell indices, otherwise use default type.
          type: codeIndices.includes(i) ? 'inlineCode' : type,
          value,
        },
      ],
    })),
  } as Parent;
}

// ============================================================================
// Remark Plugin Implementation
// ============================================================================

export interface ResolveAppearanceTableOptions {
  theme?: Theme;
  frontmatterTitle?: string;
}

/**
 * Remark plugin that replaces <AppearanceTable /> JSX with markdown tables.
 * Extracts variant and size options from component theme configuration.
 * Generates table showing available appearance variants and size options.
 */
export function remarkResolveAppearanceTable(
  options: ResolveAppearanceTableOptions = {}
) {
  const { theme, frontmatterTitle } = options;

  return (tree: Node) => {
    // Visit all mdxJsxFlowElement nodes (MDX components) in the AST.
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (node.name !== 'AppearanceTable') return;
        if (!parent || typeof index !== 'number') return;

        // Get component name from attribute or use frontmatter title.
        let componentName = getJsxAttr(node, 'component');
        if (!componentName || componentName === 'title') {
          componentName = frontmatterTitle;
        }
        if (!componentName) return;

        // Extract appearance variants and sizes from theme configuration.
        let variantType = '-';
        let sizeType = '-';

        if (theme) {
          const appearances = getAppearance(componentName, theme);
          // Join variant options with pipe separator for display.
          if (appearances.variant.length > 0) {
            variantType = appearances.variant.join(' | ');
          }
          // Join size options with pipe separator for display.
          if (appearances.size.length > 0) {
            sizeType = appearances.size.join(' | ');
          }
        }

        // Build appearance table with variant and size information.
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

        // Replace JSX component with generated table.
        (parent.children as Node[])[index] = table;
      }
    );
  };
}
