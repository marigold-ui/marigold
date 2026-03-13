import { badgePlugin } from '@/lib/badge-plugin';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { blogPosts, docs } from 'fumadocs-mdx:collections/server';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin(), badgePlugin()],
});

// Blog loader for release blog posts
// Collections created with create.doc() need to be converted using toFumadocsSource
export const blog = loader({
  baseUrl: '/releases/blog',
  source: toFumadocsSource(blogPosts, []),
});

export const getPageImage = (page: InferPageType<typeof source>) => {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/${segments.join('/')}`,
  };
};
