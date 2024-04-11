import { toc } from 'mdast-util-toc';
import { visit } from 'unist-util-visit';

// go through all mdast elements and find the h2 and h3
// if not return
// if found than put in a list

export const rehypeTableOfContents = options => {
  return (tree: any) => {
    const items: any[] = [];
    // going through all the node tree
    visit(tree, 'element', node => {
      // if no headline than return
      if (node.tagName !== 'h2' && node.tagName !== 'h3') {
        return;
      }

      // if a headline than go through the headline children and get the `a` tag
      const headline = node;

      // pushes the headline list  in an array
      return items.push(headline);
    });

    const set = Array.from(new Set(items));
    const data = set.map(link => {
      return {
        anchor: link.children[0].properties.href,
        title: link?.children[0]?.children[0].value,
      };
    });

    console.log('UNI', data);

    //  zum mdx hinzufügen
    tree.children.unshift({
      type: 'mdxJsxFlowElement',
      name: 'Toc',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'selector',
          value: options.tocSelector,
        },
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
