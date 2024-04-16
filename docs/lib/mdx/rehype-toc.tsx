import { visit } from 'unist-util-visit';

export const rehypeTableOfContents = () => {
  return (tree: any) => {
    const items: any[] = [];
    // going through all the node tree
    visit(tree, 'element', node => {
      if (!['h2', 'h3'].includes(node.tagName)) return;
      // if a headline than go through the headline children and get the `a` tag
      return items.push(node);
    });

    const set = Array.from(new Set(items));
    const data = set.map(link => {
      return {
        anchor: link.children[0].properties.href,
        title: link?.children[0]?.children[0].value,
        id: link.properties.id,
      };
    });

    //  append it again to mdx
    tree.children.unshift({
      type: 'mdxJsxFlowElement',
      name: 'Toc',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'items',
          value: JSON.stringify(data),
        },
      ],
      children: [],
    });
  };
};
