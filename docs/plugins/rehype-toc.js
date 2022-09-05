import { visit } from 'unist-util-visit';

export const rehypeTableOfContents = options => {
  return tree => {
    const links = [];

    visit(tree, 'element', node => {
      if (node.tagName !== 'h2' && node.tagName !== 'h3') {
        return;
      }

      const link = node.children.find(child => child.tagName === 'a');
      if (link) {
        links.push(link);
      }
    });
    const data = links.map(link => {
      return {
        anchor: link?.properties?.href,
        title: link?.children[0]?.value,
      };
    });

    tree.children.unshift({
      type: 'mdxJsxFlowElement',
      name: 'Toc',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'selector',
          value: options.tocSelector,
        },
        // this is how the data should be passed but it's not working
        //
        // const value = {
        //   type: 'mdxJsxAttribute',
        //   name: 'props',
        //   value: {
        //     type: 'mdxJsxAttributeValueExpression',
        //     value: '<json>',
        //   },
        // };
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
