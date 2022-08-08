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
    console.log(links);
    // const toc: Element = {
    //   type: 'element',
    //   tagName: 'toc',
    //   children: [
    //     {
    //       type: 'element',
    //       tagName: 'ul',
    //       children: links.map(link => ({
    //         type: 'element',
    //         tagName: 'li',
    //         children: [link],
    //       })),
    //     },
    //   ],
    // };

    // tree.children.unshift(toc);

    // {
    //   type: 'mdxJsxFlowElement',
    //   name: 'PropsTable',
    //   attributes: [ [Object] ],
    //   children: [],
    //   position: { start: [Object], end: [Object] },
    //   data: { _mdxExplicitJsx: true }
    // },

    // tree.children.unshift({
    //   type: 'mdxJsxFlowElement',
    //   name: 'Toc',
    //   attributes: [
    //     { type: 'mdxJsxAttribute', name: 'messageTitle', value: 'Hint' },
    //   ],
    //   children: [],
    // });

    const data = links.map(link => {
      console.log(link.children);
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
