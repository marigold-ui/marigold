import { u } from 'unist-builder';
import { visit } from 'unist-util-visit';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { mdxjs } from 'micromark-extension-mdxjs';

export const tableOfContents = (code: string) => {
  const tree = fromMarkdown(code, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  });
  console.log('............', tree);
  return {
    type: 'mdxJsxFlowElement',
    attributes: [],
    children: [...tree.children],
  };
};

// visit(tree, 'leaf', node => {
//   console.log(node);
// });
