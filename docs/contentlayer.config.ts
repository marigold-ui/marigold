import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
  type FieldDefs,
} from 'contentlayer/source-files';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
  documentTypes: [ContentPage, ComponentPage],
});
