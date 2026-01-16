import { StorybookHintMessage } from '@/app/_components/mdx-wrapper-components';
import { getPageImage, source } from '@/lib/source';
import type { DocsPageData } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RelativeTime } from '@/ui/RelativeTime';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from '@/ui/layout/docs/page';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const data = page.data as DocsPageData;
  const MDX = data.body;

  // Filter TOC to only show headings from level 1 to 3
  const filteredToc =
    data.toc === false
      ? []
      : data.toc.filter((item: any) => item.depth >= 1 && item.depth <= 3);

  return (
    <DocsPage toc={filteredToc}>
      <div className="col-span-full">
        <DocsTitle className="max-w-(--maxHeadlineWidth) scroll-m-20 text-left text-5xl font-extrabold tracking-tight *:no-underline lg:text-6xl">
          {data.title}
        </DocsTitle>
        <DocsDescription className="text-secondary-400 pt-1">
          {data.description}
        </DocsDescription>
      </div>

      <DocsBody id="docs-body" className="pt-4 pb-10">
        <MDX components={getMdxComponentsConfig(page)} />
        {data.lastModified && (
          <div className="text-text-primary-muted pt-8 text-xs italic">
            Last update: <RelativeTime date={new Date(data.lastModified)} />
          </div>
        )}
      </DocsBody>
    </DocsPage>
  );
}

function getMdxComponentsConfig(page: any) {
  return getMDXComponents({
    // Relative linking
    a: createRelativeLink(source, page) as any,

    // Page-specific component that needs access to page data
    StorybookHintMessage: (props: any) => (
      <StorybookHintMessage {...props} component={page.data.title} />
    ),
  });
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
