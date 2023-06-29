import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allComponentPages } from 'contentlayer/generated';

import { Mdx } from '@/ui/mdx';

interface ComponentPageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: ComponentPageProps['params']) {
  const slug = params?.slug?.join('/');
  const page = allComponentPages.find(page => page.slugAsParams === slug);

  if (!page) {
    return null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
  };
}

export async function generateStaticParams(): Promise<
  ComponentPageProps['params'][]
> {
  return allComponentPages.map(page => ({
    slug: page.slugAsParams.split('/'),
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert py-6">
      <h1>{page.title}</h1>
      <Mdx code={page.body.code} />
    </article>
  );
}
