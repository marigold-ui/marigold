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

    console.log(links.map(link => link.children.map(child => child.value)));
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
          value: JSON.stringify(
            links.map(link => link.children.map(child => child.value))
          ),
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
