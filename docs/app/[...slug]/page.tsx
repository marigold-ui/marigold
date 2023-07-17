import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allContentPages } from 'contentlayer/generated';

import { Headline } from '@/ui';
import { Mdx } from '@/ui/mdx';

interface ContentPageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: ContentPageProps['params']) {
  const slug = params?.slug?.join('/');
  const page = allContentPages.find(page => page.slugAsParams === slug);

  if (!page) {
    return null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
  };
}

export async function generateStaticParams(): Promise<
  ContentPageProps['params'][]
> {
  return allContentPages.map(page => ({
    slug: page.slugAsParams.split('/'),
  }));
}

export default async function ContentPage({ params }: ContentPageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article className="prose py-6">
      <Headline level="1">{page.title}</Headline>
      <Mdx code={page.body.code} />
    </article>
  );
}
