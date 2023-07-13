import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allComponentPages } from 'contentlayer/generated';

import { Mdx } from '@/ui/mdx';
import { MarigoldThemeSwitch, ThemeMenu } from './_components';

import { b2bTheme, coreTheme } from '@/theme';
import { SSRProvider } from '@/ui';

interface ComponentPageProps {
  params: {
    slug: string[];
  };
}

const themes = {
  b2bTheme,
  coreTheme,
};

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
      <SSRProvider>
        <h1>{page.title}</h1>
        <MarigoldThemeSwitch themes={themes} initial="b2bTheme">
          <ThemeMenu />
          <Mdx title={page.title} code={page.body.code} />
        </MarigoldThemeSwitch>
      </SSRProvider>
    </article>
  );
}
