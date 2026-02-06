import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { MdxJsxElement } from './shared';

// ============================================================================
// Remark Plugin Implementation
// ============================================================================

/**
 * Remark plugin that replaces <AppearanceDemo /> with descriptive text note.
 * The actual appearance information and variants are provided by AppearanceTable plugin.
 * Converts JSX component to paragraph explaining available variants.
 */
export function remarkResolveAppearanceDemo() {
  return (tree: Node) => {
    // Visit all mdxJsxFlowElement nodes (MDX components) in the AST.
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (node.name !== 'AppearanceDemo') return;
        if (!parent || typeof index !== 'number') return;

        // Replace JSX component with informational paragraph.
        (parent.children as Node[])[index] = {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value:
                'This component has multiple appearance variants and sizes available.',
            },
          ],
        } as Node;
      }
    );
  };
}
