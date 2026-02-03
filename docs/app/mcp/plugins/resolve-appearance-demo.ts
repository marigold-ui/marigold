import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import { MdxJsxElement } from './shared';

/**
 * Replaces <AppearanceDemo /> with a simple text note.
 * The actual appearance info comes from AppearanceTable.
 */
export function remarkResolveAppearanceDemo() {
  return (tree: Node) => {
    visit(
      tree,
      'mdxJsxFlowElement',
      (node: MdxJsxElement, index, parent: Parent | undefined) => {
        if (node.name !== 'AppearanceDemo') return;
        if (!parent || typeof index !== 'number') return;

        (parent.children as Node[])[index] = {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value:
                'This component has multiple appearance variants and sizes available.',
            },
          ],
        };
      }
    );
  };
}
