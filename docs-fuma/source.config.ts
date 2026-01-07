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

const blogFrontmatterSchema = frontmatterSchema.extend({
  date: z.string().or(z.date()),
  type: z.string().optional(),
  changed: z.array(z.string()).optional(),
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

export const blog = defineDocs({
  dir: 'content/releases/blog',
  docs: {
    schema: blogFrontmatterSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: v => [inlineBadgeInHeadings, ...v],
  },
  plugins: [lastModified()],
});
