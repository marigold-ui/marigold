import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
  type FieldDefs,
} from 'contentlayer/source-files';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getHighlighter, loadTheme } from 'shiki';
import { visit } from 'unist-util-visit';

import path from 'node:path';

import { rehypeComponentDemo } from './lib/mdx/rehype-component-demo';

// Helpers
// ---------------
const commonFields: FieldDefs = {
  title: {
    type: 'string',
    required: true,
  },
  caption: {
    type: 'string',
    required: true,
  },
};

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: doc => `/${doc._raw.flattenedPath}`,
  },
};

// Page Types
// ---------------
export const ContentPage = defineDocumentType(() => ({
  name: 'ContentPage',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    ...commonFields,
    order: {
      type: 'number',
    },
  },
  computedFields: {
    ...computedFields,
    slugAsParams: {
      type: 'string',
      resolve: doc => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}));

export const ComponentPage = defineDocumentType(() => ({
  name: 'ComponentPage',
  filePathPattern: 'components/**/*.mdx',
  contentType: 'mdx',
  fields: {
    ...commonFields,
    group: {
      type: 'enum',
      options: [
        'applicaiton',
        'collection',
        'content',
        'form',
        'layout',
        'navigation',
        'overlay',
      ],
      required: true,
    },
  },
  computedFields: {
    ...computedFields,
    slugAsParams: {
      type: 'string',
      // Slugs are matched agains the name of the component or rather the file name
      resolve: doc => doc._raw.sourceFileName.split('.')[0],
    },
  },
}));

// Config
// ---------------
const contentDirPath = './content';

export default makeSource({
  contentDirPath,
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
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypePrettyCode,
        {
          getHighlighter: async () => {
            const theme = await loadTheme(
              // loading theme file
              path.join(process.cwd(), './light.json')
            );
            return await getHighlighter({ theme });
          },
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
    ],
  },
  documentTypes: [ContentPage, ComponentPage],
});
