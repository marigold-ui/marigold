import type { Content, Heading, PhrasingContent, Root } from 'mdast';

// Minimal local definition to avoid adding unified types as a dependency
type Plugin<Params extends any[] = [], Tree extends object = any> = (
  ...args: Params
) => (tree: Tree) => void;

type MdxJsxTextElement = PhrasingContent & {
  type: 'mdxJsxTextElement';
  name: string | null;
  attributes?: Array<{
    type: 'mdxJsxAttribute';
    name: string;
    value: string | boolean | number | null;
  }>;
  children?: PhrasingContent[];
};

function isHeading(node: Content): node is Heading {
  return node.type === 'heading';
}

function isBadgeTextElement(node: any): node is MdxJsxTextElement {
  return node && node.type === 'mdxJsxTextElement' && node.name === 'Badge';
}

function getAttr(
  el: MdxJsxTextElement,
  name: string
): string | boolean | number | null | undefined {
  const attrs = el.attributes ?? [];
  for (const a of attrs) {
    if (a && a.type === 'mdxJsxAttribute' && a.name === name)
      return a.value as any;
  }
  return undefined;
}

// Replace <Badge> inside headings with a plain <span> so MDX does not require
// the Badge component during module evaluation. This preserves inline content.
export const inlineBadgeInHeadings: Plugin<[], Root> = () => (tree: Root) => {
  function visit(node: any) {
    if (!node || !node.children) return;
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];

      // If this is a heading, scan its immediate children for <Badge>
      if (isHeading(node)) {
        if (isBadgeTextElement(child)) {
          // Base classes mimic @marigold/theme-docs Badge default
          const base =
            'inline-flex items-center truncate rounded-[20px] px-2 py-0.5 text-xs align-middle ms-2';

          // Map supported variant -> theme-docs classes
          const variant = (getAttr(child, 'variant') as string) ?? 'dark';
          let variantClass = '';
          switch (variant) {
            case 'warning':
              variantClass = 'bg-bg-warning text-text-primary';
              break;
            case 'dark':
            default:
              variantClass = 'bg-bg-inverted text-white';
          }

          const spanNode: MdxJsxTextElement = {
            type: 'mdxJsxTextElement',
            name: 'span',
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'data-mdx-badge',
                value: 'true',
              },
              {
                type: 'mdxJsxAttribute',
                name: 'className',
                value: `${base} ${variantClass}`,
              },
            ],
            children: child.children ?? [],
          };
          node.children[i] = spanNode;
          continue;
        }
      }

      // Recurse
      if (child && typeof child === 'object' && 'children' in child) {
        visit(child);
      }
    }
  }

  visit(tree);
};

export default inlineBadgeInHeadings;
