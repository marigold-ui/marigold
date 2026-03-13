// source.config.ts
import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';

var customFrontmatterSchema = frontmatterSchema.extend({
  date: z
    .date()
    .transform(d => d.toISOString().split('T')[0])
    .optional(),
  /** Status badge shown in sidebar (e.g. "new", "beta", "alpha", "updated") */
  badge: z.string().optional(),
});
var blogPosts = defineCollections({
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
var docs = defineDocs({
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
var source_config_default = defineConfig({
  mdxOptions: {
    // MDX options
  },
  plugins: [lastModified()],
});
export { blogPosts, source_config_default as default, docs };
