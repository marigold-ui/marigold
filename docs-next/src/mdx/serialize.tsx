import path from 'node:path';
import fs from 'fs-extra';
import { serialize as mdx } from 'next-mdx-remote/serialize';

// Plugins
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { remarkCodeDemo } from '~/mdx/remark-code-demo';

import { CONTENT_PATH, DEMO_PATH } from '~/config';

export const serialize = async (slug = ['index']) => {
  const file = path.join(CONTENT_PATH, slug.join('/'));

  // Read file with "index" fallback
  let source: string;
  try {
    source = await fs.readFile(`${file}.mdx`, 'utf8');
  } catch {
    source = await fs.readFile(`${file}/index.mdx`, 'utf8');
  }

  return await mdx(source, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [
          remarkCodeDemo,
          {
            demoPath: DEMO_PATH,
            wrapperComponent: 'Preview',
          },
        ],
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    },
    parseFrontmatter: true,
  });
};
