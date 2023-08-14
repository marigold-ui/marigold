import { defineDocumentType, makeSource } from 'contentlayer/source-files';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getHighlighter } from 'shiki';
import { visit } from 'unist-util-visit';

import { rehypeComponentDemo } from './lib/mdx/rehype-component-demo';

/**
 * Normalizaiton supports "grouped pages". E.g. when we want to put
 * the page next to its demos.
 *
 * Outpu:
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

    /**
     * flattened Path:
     *
     * - pages/concepts/layouts
     * - components/button/button
     * - hooks/useTheme/useTheme
     *
     * [ 'components', 'footer', 'footer' ] footer footer
     */

    // section: {
    //   type: 'string',
    //   resolve: doc => doc._raw.sourceFileDir.split('/').at(-1),
    // },
    // slug: {
    //   type: 'string',
    //   resolve: doc => doc._raw.flattenedPath.replace('pages', ''),
    // },
    // slugAsParams: {
    //   type: 'string',
    //   resolve: doc => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    // },
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
      [rehypeComponentDemo, { contentDirPath }],
      rehypeSlug,
      // to inject the source code and other stuff inside `pre` element props
      // needed to copy code
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children;
            if (codeEl.tagName !== 'code') return;
            node.raw = codeEl.children?.[0].value;
          }
        });
      },
      [
        rehypePrettyCode,
        {
          theme: 'material-theme-palenight',
          keepBackground: false,

          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },

          onVisitHighlightedLine(node: any) {
            node.properties.className = [
              ...(node.properties.className || []),
              'bg-white/10 px-2 py-0.5 rounded-sm',
            ];
          },
          onVisitHighlightedChars(node: any) {
            node.properties.className = ['bg-white/10 px-2 py-0.5 rounded-sm'];
          },
        },
      ],
      // needed to copy code
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) {
              return;
            }
            for (const child of node.children) {
              if (child.tagName === 'pre') {
                child.properties['raw'] = node.raw;
              }
            }
          }
        });
      },
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            class: [
              'relative',
              'no-underline',
              'before:absolute',
              'before:-left-6',
              'before:inset-y-0',
              'before:flex',
              'before:items-center',
              'before:text-secondary-400',
              'before:text-2xl',
              `hover:before:content-['#']`,
            ].join(' '),
          },
        },
      ],
    ],
  },
});
