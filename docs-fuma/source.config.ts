import { RehypeCodeOptions, rehypeCode } from 'fumadocs-core/mdx-plugins';
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';

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

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: 'material-theme-palenight',
    dark: 'material-theme-palenight',
  },
};

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
    rehypePlugins: v => [...v, [rehypeCode, rehypeCodeOptions]],
    remarkPlugins: v => [...v],
  },
  plugins: [lastModified()],
});
