import { visit } from 'unist-util-visit';

export const rehypeTableOfContents = () => {
  return (tree: any) => {
    const items: any[] = [];
    visit(tree, 'element', node => {
      if (!['h2', 'h3'].includes(node.tagName)) return;
      return items.push(node);
    });

    const data = Array.from(new Set(items)).map(link => {
      return {
        anchor: link.children[0].properties.href,
        title: link.children[0].children[0].value,
        id: link.properties.id,
        level: link.tagName,
      };
    });

    tree.children.unshift({
      type: 'mdxJsxFlowElement',
      name: 'Toc',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'data',
          value: JSON.stringify(data),
        },
      ],
      children: [],
    });
  };
};
