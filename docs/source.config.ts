import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import {
  defineCollections,
  defineConfig,
  defineDocs,
} from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';

// `date` must be coerced: since fumadocs-mdx 15.1.1 parses YAML 1.2, a bare
// `date: 2026-07-07` arrives as a string instead of a Date.
const customFrontmatterSchema = pageSchema.extend({
  date: z.coerce
    .date()
    .transform(d => d.toISOString().split('T')[0])
    .optional(),
  /** Status badge shown in sidebar (e.g. "new", "beta", "alpha", "updated") */
  badge: z.string().optional(),
});

// Define blog collection for release blog posts
export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/releases/blog',
  schema: pageSchema.extend({
    date: z.coerce.date(),
    type: z.string().optional(),
    changed: z.array(z.string()).optional(),
  }),
  postprocess: {
    includeProcessedMarkdown: true,
  },
});

/**
 * Impressum and Datenschutzerklärung — MDX so Legal and the DPO can edit the
 * prose without JSX escaping.
 *
 * In `legal/`, not `content/`: the docs collection globs all of `content`, so
 * anything there joins the page tree, sidebar, search and MCP index. These are
 * statutory pages, rendered by their own routes under `app/(legal)`.
 */
export const legal = defineCollections({
  type: 'doc',
  dir: 'legal',
  schema: pageSchema,
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
