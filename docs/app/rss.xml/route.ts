import { getAllBlogPosts } from '@/lib/blog';
import { buildRssFeed } from '@/lib/rss';

// Emitted at build time like the rest of the site; `GET` handlers are dynamic
// by default.
export const dynamic = 'force-static';

export const GET = () =>
  new Response(buildRssFeed(getAllBlogPosts()), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
