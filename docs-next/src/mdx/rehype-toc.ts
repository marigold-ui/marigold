import { visit } from 'unist-util-visit';
import type { Element, Root, Text } from 'hast';

import type { Transformer } from 'unified';

export interface Options {
  tocSelector: string;
}

export const rehypeTableOfContents = (options: Options): Transformer<Root> => {
  return tree => {
    const links: Element[] = [];

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'h2') {
        return;
      }
      const link = (node.children as Element[]).find(
        child => child.tagName === 'a'
      );
      if (link) {
        links.push(link);
      }
    });
    const data = links.map(link => {
      return {
        anchor: link?.properties?.href,
        title: (link?.children[0] as Text)?.value,
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
