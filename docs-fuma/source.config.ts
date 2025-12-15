import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

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
    remarkPlugins: [],
  },
});
