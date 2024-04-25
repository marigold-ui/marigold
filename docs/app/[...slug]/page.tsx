import { Headline } from '@/ui';
import { allContentPages } from 'contentlayer/generated';
import { Metadata } from 'next';

import { notFound } from 'next/navigation';

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
    <article className="grid grid-cols-1 gap-x-20 gap-y-14 2xl:grid-cols-[minmax(min-content,70ch)_1fr]">
      <div className="col-span-full">
        <Headline level={1}>{page.title}</Headline>
        <div className="text-text-primary-muted">{page.caption}</div>
      </div>
      <div className="prose max-w-[70ch]">
        <Mdx className="" title={page.title} code={page.body.code} />
      </div>
      <div className="col-start-2 hidden 2xl:block">
        <TocContainer />
      </div>
    </article>
  );
}
