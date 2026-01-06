import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';
import inlineBadgeInHeadings from './lib/remark/inline-badge-in-headings';

const customFrontmatterSchema = frontmatterSchema.extend({
  caption: z.string().optional(),
  order: z.number().optional(),
  badge: z.string().optional(),
  toc: z.boolean().optional(),
});

export const docs = defineDocs({
  dir: 'content',
  docs: {
    schema: customFrontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: v => [inlineBadgeInHeadings, ...v],
  },
  plugins: [lastModified()],
});
