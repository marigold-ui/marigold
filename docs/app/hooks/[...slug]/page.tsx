import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allHookPages } from 'contentlayer/generated';

import { Headline } from '@/ui';
import { Mdx } from '@/ui/mdx';

interface HookPageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: HookPageProps['params']) {
  const slug = params?.slug?.join('/');
  const page = allHookPages.find(page => page.slugAsParams === slug);

  if (!page) {
    return null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: HookPageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
  };
}

export async function generateStaticParams(): Promise<
  HookPageProps['params'][]
> {
  return allHookPages.map(page => ({
    slug: page.slugAsParams.split('/'),
  }));
}

export default async function ContentPage({ params }: HookPageProps) {
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
