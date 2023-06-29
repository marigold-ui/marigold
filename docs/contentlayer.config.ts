import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
} from 'contentlayer/source-files';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: doc => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    // Slugs are matched agains the name of the component or rather the file name
    resolve: doc => doc._raw.sourceFileName.split('.')[0],
  },
};

export const ComponentPage = defineDocumentType(() => ({
  name: 'ComponentPage',
  filePathPattern: 'components/**/*.mdx',
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
  computedFields,
}));

export default makeSource({
  contentDirPath: './content',
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
  documentTypes: [ComponentPage],
});
