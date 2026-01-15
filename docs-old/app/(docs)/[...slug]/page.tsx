import { baseUrl } from '@/lib/config';
import { Headline } from '@/ui';
import { allContentPages } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RelativeTime } from '@/ui/RelativeTime';
import { TocContainer } from '@/ui/Toc';
import { Mdx } from '@/ui/mdx';

interface ContentPageProps {
  params: Promise<{ slug: string[] }>;
}

async function getPageFromParams(params: ContentPageProps['params']) {
  const slug = (await params)?.slug?.join('/');
  const page = allContentPages.find(page => page.slug === slug);

  return page || null;
}

export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  return page
    ? {
        title: page.title,
        description: page.caption,
        applicationName: 'Marigold Design System',
        appleWebApp: {
          title: 'Marigold Design System',
        },
        metadataBase: new URL(baseUrl),
        openGraph: {
          siteName: 'Marigold Design System',
          title: page.title,
          description: page.caption,
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

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allContentPages.map(page => ({
    slug: page.slug.split('/'),
  }));
}

export default async function ContentPage({ params }: ContentPageProps) {
  const page = await getPageFromParams(params);
  if (!page) {
    notFound();
  }

  return (
    <article className="grid grid-cols-1 gap-x-24 gap-y-14 min-[1400px]:grid-cols-[minmax(min-content,70ch)_1fr]">
      <div className="col-span-full">
        <Headline level={1}>{page.title}</Headline>
        <div className="text-secondary-400 pt-1">{page.caption}</div>
      </div>
      <div className="prose max-w-[70ch]">
        <Mdx title={page.title} code={page.body.code} />
        <div className="text-text-primary-muted pt-8 text-xs italic">
          Last update: <RelativeTime date={new Date(page.modified)} />
        </div>
      </div>
      {page.toc === false ? null : (
        <div className="col-start-2 hidden min-[1400px]:block">
          <TocContainer />
        </div>
      )}
    </article>
  );
}
