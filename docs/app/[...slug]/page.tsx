import { Headline } from '@/ui';
import { allContentPages } from 'contentlayer/generated';
import { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { RelativeTime } from '@/ui/RelativeTime';
import { TocContainer } from '@/ui/Toc';
import { Mdx } from '@/ui/mdx';

interface ContentPageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: ContentPageProps['params']) {
  const slug = params?.slug?.join('/');
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
      }
    : {};
}

export async function generateStaticParams(): Promise<
  ContentPageProps['params'][]
> {
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
        <Mdx className="" title={page.title} code={page.body.code} />
      </div>
      <div className="col-start-2 hidden min-[1400px]:block">
        <TocContainer />
      </div>
      <div className="text-right">
        <RelativeTime date={new Date(page.modified)} />
      </div>
    </article>
  );
}
