import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from '@/components/layout/docs/page';
import {
  MDXHeadline2,
  MDXHeadline3,
  MDXHeadline4,
  MDXHeadline5,
  MDXHeadline6,
  MDXText,
  SectionMessage,
  SectionMessageContent,
  SectionMessageTitle,
  TeaserList,
} from '@/components/mdx-wrapper-components';
import { getPageImage, source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;
  return (
    <DocsPage toc={page.data.toc}>
      <div className="col-span-full">
        <DocsTitle className="max-w-(--maxHeadlineWidth) scroll-m-20 text-left text-5xl font-extrabold tracking-tight *:no-underline lg:text-6xl">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="text-secondary-400 pt-1">
          {page.data.description}
        </DocsDescription>
      </div>
      <DocsBody id="docs-body" className="pt-4 pb-10">
        <MDX
          components={{
            ...getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
              // h2: (props) => <h2 className='*:no-underline scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl max-w-(--maxHeadlineWidth) text-left' {...props} />,
              p: MDXText,
              h2: MDXHeadline2,
              h3: MDXHeadline3,
              h4: MDXHeadline4,
              h5: MDXHeadline5,
              h6: MDXHeadline6,
              TeaserList,
              SectionMessage,
              SectionMessageTitle,
              SectionMessageContent,
            }),
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
