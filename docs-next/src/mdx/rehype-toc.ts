import { visit } from 'unist-util-visit';
import { Element, Root } from 'hast';

import type { Transformer } from 'unified';

export const rehypeTableOfContents = (): Transformer<Root> => {
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

    const toc: Element = {
      type: 'element',
      tagName: 'toc',
      children: [
        {
          type: 'element',
          tagName: 'ul',
          children: links.map(link => ({
            type: 'element',
            tagName: 'li',
            children: [link],
          })),
        },
      ],
    };

    tree.children.unshift(toc);
  };
};
