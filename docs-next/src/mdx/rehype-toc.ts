import { visit } from 'unist-util-visit';
import { Element, Root } from 'hast';

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

    const tocc: Element = {
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

    tree.children.unshift(tocc);

    // {
    //   type: 'mdxJsxFlowElement',
    //   name: 'PropsTable',
    //   attributes: [ [Object] ],
    //   children: [],
    //   position: { start: [Object], end: [Object] },
    //   data: { _mdxExplicitJsx: true }
    // },

    const child = tree.children.find(
      child => child.type === 'mdxJsxFlowElement'
    );
    console.log(child.attributes);

    const value = {
      type: 'mdxJsxAttribute',
      name: 'props',
      value: {
        type: 'mdxJsxAttributeValueExpression',
        value: '<json>',
      },
    };

    const toc = {
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
          value: {
            type: 'mdxJsxAttributeValueExpression',
            value: '<json>',
          },
        },
      ],
      children: [],
    };

    tree.children.unshift(toc);

    tree.children.unshift({
      type: 'mdxJsxFlowElement',
      name: 'Message',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'messageTitle', value: 'Hint' },
      ],
      children: [],
    });
  };
};

/**
 * 1. Portal
 *
 * - create a dedicate placeholder "#toc"
 * - ceate a <TOC selector={options.tocSelector}> components
 *    - that uses ReactDOM.createPortal(<ul>...</ul>, #toc)
 *
 * 2. Context
 *
 * - inside rehype render a "info component"
 *   -> renders "null", but `useToC(<data>)`
 * - create <TOC> that uses context to get the set data from `useToC`
 */
