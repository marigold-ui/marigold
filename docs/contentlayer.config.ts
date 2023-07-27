import {
  defineDocumentType,
  makeSource,
  type FieldDefs,
} from 'contentlayer/source-files';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';

import { rehypeComponentDemo } from './lib/mdx/rehype-component-demo';

import { siteConfig } from './lib/config';

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
      resolve: doc => {
        let paths = doc._raw.flattenedPath.split('/');

        // Support pages that are grouped with their demos into a folder
        if (paths.at(-1) === paths.at(-2)) {
          paths.pop();
        }

        return paths.join('/');
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
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children;
            if (codeEl.tagName !== 'code') {
              return;
            }

            if (codeEl.data?.meta) {
              // Extract event from meta and pass it down the tree.
              const regex = /event="([^"]*)"/;
              const match = codeEl.data?.meta.match(regex);
              if (match) {
                node.__event__ = match ? match[1] : null;
                codeEl.data.meta = codeEl.data.meta.replace(regex, '');
              }
            }
            node.__rawString__ = codeEl.children?.[0].value;
          }
        });
      },
      [
        rehypePrettyCode,
        {
          theme: 'material-theme-palenight',
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) {
              return;
            }
            const preElement = node.children.at(-1);
            if (preElement.tagName !== 'pre') {
              return;
            }
            preElement.properties['__rawString__'] = node.__rawString__;
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
