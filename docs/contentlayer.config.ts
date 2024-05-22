import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode, { LineElement } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

import { rehypeComponentDemo } from './lib/mdx/rehype-component-demo';
import { rehypeTableOfContents } from './lib/mdx/rehype-toc';

/**
 * Normalizaiton supports "grouped pages". E.g. when we want to put
 * the page next to its demos.
 *
 * Output:
 * - concepts/layouts -> concepts/layouts
 * - components/form/button/button -> components/form/button
 */
const getNormalizedPath = (val: string) => {
  let paths = val.split('/');

  // Support pages that are grouped with their demos into a folder
  if (paths.at(-1) === paths.at(-2)) {
    paths.pop();
  }

  return paths;
};

// Page Types
// ---------------
export const ContentPage = defineDocumentType(() => ({
  name: 'ContentPage',
  filePathPattern: '{**,*}/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    caption: {
      type: 'string',
      required: true,
    },
    order: {
      type: 'number',
    },
    badge: {
      type: 'string',
    },
  },
  computedFields: {
    // Transforms the page's path to a slug to use with next.js API
    slug: {
      type: 'string',
      resolve: doc => getNormalizedPath(doc._raw.flattenedPath).join('/'),
    },
    // Subsection is the 1st folder level of a page.
    section: {
      type: 'string',
      resolve: doc => {
        const path = getNormalizedPath(doc._raw.flattenedPath);
        return path.length < 2 ? null : path.at(0);
      },
    },
    // Subsection is the 2nd folder level of a page.
    subsection: {
      type: 'string',
      resolve: doc => {
        const path = getNormalizedPath(doc._raw.flattenedPath);
        return path.length < 3 ? null : path.at(1);
      },
    },
  },
}));

// Config
// ---------------
const contentDirPath = './content';

export default makeSource({
  contentDirPath,
  documentTypes: [ContentPage],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      // Code Highliting and Demos
      // ---------------
      [rehypeComponentDemo, { contentDirPath }],
      /**
       * Store the raw code text inside the properties of <pre> elements,
       * so we can later retrieve it and use it for the copy code feature.
       *
       * Note that these <pre> elements will be transformed to <figure> elements by
       * `rehype-pretty-code`.
       */
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [child] = node.children;
            if (child.tagName !== 'code') return;
            node.properties.raw = child.children?.[0].value;
          }
        });
      },
      [
        rehypePrettyCode,
        {
          theme: 'material-theme-palenight',
          onVisitLine(node: LineElement) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node: LineElement) {
            node.properties.className = [
              ...(node.properties.className || []),
              'bg-code-800',
              'px-[--pre-padding-x] -mx-[--pre-padding-x]',
            ];
          },
          onVisitHighlightedChars(node: LineElement) {
            node.properties.className = ['bg-gray-700 px-2 py-0.5 rounded-sm'];
          },
        },
      ],

      // Headings and TOC Plugins
      // ---------------
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
        },
      ],
      [rehypeTableOfContents, { selector: '#toc' }],
    ],
  },
});
