import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';

// Extend frontmatter schema to include date field for blog posts
// Fumadocs auto-parses date strings to Date objects, so we accept Date and convert back to string
const customFrontmatterSchema = frontmatterSchema.extend({
  date: z
    .date()
    .transform(d => d.toISOString().split('T')[0])
    .optional(),
});

// Define blog collection for release blog posts
export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/releases/blog',
  schema: frontmatterSchema.extend({
    date: z.date().or(z.string().transform(s => new Date(s))),
    type: z.string().optional(),
    changed: z.array(z.string()).optional(),
  }),
  postprocess: {
    includeProcessedMarkdown: true,
  },
});

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
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
    // MDX options
  },
  plugins: [lastModified()],
});
