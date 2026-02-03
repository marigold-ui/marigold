import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import type { ConfigSchema, Theme } from '@marigold/system';
import { MdxJsxElement, getJsxAttr } from './shared';

// ============================================================================
// Theme Helpers
// ============================================================================

const getKeys = (schema: ConfigSchema) => ({
  variant: schema?.variant ? Object.keys(schema.variant) : [],
  size: schema?.size ? Object.keys(schema.size) : [],
});

const getKeysFromSlots = (
  slots: Record<string, { variants: ConfigSchema }>
) => {
  const v = new Set<string>();
  const s = new Set<string>();

  Object.values(slots).forEach(slot => {
    Object.keys(slot.variants?.variant ?? {}).forEach(k => v.add(k));
    Object.keys(slot.variants?.size ?? {}).forEach(k => s.add(k));
  });

  return { variant: [...v], size: [...s] };
};

const SHARED_APPEARANCES: Record<string, string> = {
  LinkButton: 'Button',
  ToggleButtonGroup: 'ToggleButton',
};

function getAppearance(name: string, theme: Theme) {
  const componentName = SHARED_APPEARANCES[name] || name;
  const styles = (theme.components as any)[componentName] || {};

  return 'variants' in styles
    ? getKeys(styles.variants as ConfigSchema)
    : getKeysFromSlots(styles);
}

// ============================================================================
// Plugin
// ============================================================================

export interface ResolveAppearanceTableOptions {
  theme?: Theme;
  frontmatterTitle?: string;
}

/**
 * Replaces <AppearanceTable /> with a markdown table showing variants/sizes.
 */
export function remarkResolveAppearanceTable(
  options: ResolveAppearanceTableOptions = {}
) {
  const { theme, frontmatterTitle } = options;

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

        // Get appearance from theme
        let variantType = '-';
        let sizeType = '-';

        if (theme) {
          const appearances = getAppearance(componentName, theme);
          if (appearances.variant.length > 0) {
            variantType = appearances.variant.join(' | ');
          }
          if (appearances.size.length > 0) {
            sizeType = appearances.size.join(' | ');
          }
        }

        // Build table
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
