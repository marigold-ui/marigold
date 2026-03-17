import { PostList } from '@/components/PostList';
import {
  MarkdownCopyButton,
  ViewOptionsPopover,
} from '@/components/ai/page-actions';
import { getPageImage, source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import {
  AlignmentsX,
  AlignmentsY,
  AppearanceDemo,
  AppearanceTable,
  BorderRadius,
  Center,
  ColorPalettes,
  ColorTokenTable,
  Columns,
  ComponentDemo,
  DateFormat,
  Do,
  DoDescription,
  DoFigure,
  Dont,
  DontDescription,
  DontFigure,
  FeedbackComponentsTable,
  GuidelineTiles,
  IconList,
  RelativeTime,
  Spacing,
  Stack,
  StorybookHintMessage,
  TeaserList,
} from '@/ui';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const Page = async (props: PageProps<'/[...slug]'>) => {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const lastModified = page.data.lastModified;

  const isReleaseBlogPost =
    params.slug?.[0] === 'releases' && params.slug?.[1] === 'blog';
  const isReleasesPage = params.slug?.[0] === 'releases';
  const toc = isReleasesPage && !isReleaseBlogPost ? undefined : page.data.toc;

  return (
    <DocsPage
      tableOfContent={{
        single: true,
      }}
      toc={toc}
      full={page.data.full}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pt-2 pb-6">
        <MarkdownCopyButton markdownUrl={`/mcp${page.url}.md`} />
        <ViewOptionsPopover
          markdownUrl={`/mcp${page.url}.md`}
          githubUrl={`https://github.com/marigold-ui/marigold/blob/main/docs/content/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page) as any,

            Columns,
            Stack,
            Center,

            ImageZoom,
            ColorTokenTable,
            ColorPalettes,

            Spacing,
            BorderRadius,
            AlignmentsX,
            AlignmentsY,

            IconList,
            PostList,

            DateFormat,

            Do,
            DoFigure,
            DoDescription,
            Dont,
            DontFigure,
            DontDescription,
            GuidelineTiles,

            TeaserList,

            FeedbackComponentsTable,

            AppearanceDemo,
            AppearanceTable,
            ComponentDemo,
            StorybookHintMessage,
          })}
        />
        {lastModified && (
          <div className="text-fd-muted-foreground pt-8 text-xs italic">
            Last update: <RelativeTime date={lastModified} />
          </div>
        )}
      </DocsBody>
    </DocsPage>
  );
};

export const generateStaticParams = async () => {
  const params = await source.generateParams();
  // Filter out empty slugs (root path) - handled by home page
  return params.filter(param => param.slug && param.slug.length > 0);
};

export const generateMetadata = async (
  props: PageProps<'/[...slug]'>
): Promise<Metadata> => {
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
};

export default Page;
