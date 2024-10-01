import { baseUrl } from '@/lib/config';
import { DateFormat, Headline } from '@/ui';
import { allBlogs } from 'contentlayer/generated';
import { notFound, usePathname } from 'next/navigation';
import { TocContainer } from '@/ui/Toc';
import { Mdx } from '@/ui/mdx';

export const getPost = () => {
  const pathname = usePathname();
  const currentPost = allBlogs.find(
    post => post.slug === pathname.replace(/^\//, '')
  );

  return currentPost;
};

export function generateMetadata() {
  const page = getPost();

  return page
    ? {
        title: page.title,
        description: page.date,
        applicationName: 'Marigold Design System',
        appleWebApp: {
          title: 'Marigold Design System',
        },
        metadataBase: new URL(baseUrl),
        openGraph: {
          siteName: 'Marigold Design System',
          title: page.title,
          description: page.date,
          images: `${baseUrl}/api/og.png?title=${encodeURIComponent(page.title)}`,
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          creator: '@reservix',
        },
      }
    : {};
}

const BlogPost = () => {
  const currentPost = getPost();

  if (!currentPost) {
    notFound();
  }

  return (
    <article
      key={currentPost.title}
      className="grid grid-cols-1 gap-x-24 gap-y-14 min-[1400px]:grid-cols-[minmax(min-content,70ch)_1fr]"
    >
      <div className="col-span-full">
        <Headline level={1}>{currentPost.title}</Headline>
        <div className="text-secondary-400 pt-1">
          <DateFormat value={new Date(currentPost.date)} dateStyle="medium" />
        </div>
      </div>
      <div className="prose max-w-[70ch]">
        <Mdx title={currentPost.title} code={currentPost.body.code} />
      </div>
      <div className="col-start-2 hidden min-[1400px]:block">
        <TocContainer />
      </div>
    </article>
  );
};

export default BlogPost;
