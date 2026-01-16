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
  order: z.number().optional(),
  badge: z.string().optional(),
  toc: z.boolean().optional(),
});

const blogFrontmatterSchema = frontmatterSchema.extend({
  date: z.string().or(z.date()),
  type: z.string().optional(),
  changed: z.array(z.string()).optional(),
  introduction: z.string().optional(),
});

// Extract introduction from raw MDX content
const extractIntroduction = (source: string): string => {
  const withoutFrontmatter = source.replace(/^---[\s\S]*?---\n\n?/, '');
  const regex = /^([\s\S]*?\n\n[\s\S]*?)\n\n/;
  const match = withoutFrontmatter.match(regex);
  return match ? match[1].trim() : '';
};

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
    schema: ({ source }) => {
      return blogFrontmatterSchema.transform(data => ({
        ...data,
        introduction: extractIntroduction(source),
      }));
    },
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: v => [...v, [rehypeCode, rehypeCodeOptions]],
    remarkPlugins: v => [...v],
  },
  plugins: [lastModified()],
});
