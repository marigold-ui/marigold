import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

// Plugins
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { DEMO_PATH } from '~/config';
import { remarkCodeDemo } from '~/mdx/remark-code-demo';
import { rehypeTableOfContents } from './rehype-toc';

export const serialize = async (content: string) => {
  return await mdx(content, {
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
        [rehypeTableOfContents, { tocSelector: '#toc' }],
      ],
    },
    parseFrontmatter: true,
  });
};

export const getFrontmatter = async <T extends object = { [key: string]: any }>(
  filePath: string
) => {
  const file = await read(filePath);
  matter(file);

  return (file.data.matter || {}) as T;
};
