import { getPageImage, source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import {
  AlignmentsX,
  AlignmentsY,
  BorderRadius,
  Center,
  ColorPalettes,
  ColorTokenTable,
  Columns,
  Do,
  DoDescription,
  DoFigure,
  Dont,
  DontDescription,
  DontFigure,
  FeedbackComponentsTable,
  FontSizes,
  FontStyle,
  FontWeights,
  GuidelineTiles,
  Headlines,
  IconList,
  RelativeTime,
  Spacing,
  SpacingTokensTable,
  Stack,
  TeaserList,
  TextAlign,
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

const Page = async (props: PageProps<'/[[...slug]]'>) => {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const lastModified = page.data.lastModified;

  return (
    <DocsPage
      tableOfContent={{
        single: true,
      }}
      toc={page.data.toc}
      full={page.data.full}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
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
            img: ImageZoom,

            Headlines,
            FontWeights,
            FontSizes,
            FontStyle,
            TextAlign,
            SpacingTokens: SpacingTokensTable,

            Spacing,
            BorderRadius,
            AlignmentsX,
            AlignmentsY,

            IconList,

            Do,
            DoFigure,
            DoDescription,
            Dont,
            DontFigure,
            DontDescription,
            GuidelineTiles,

            TeaserList,

            FeedbackComponentsTable,
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
  return source.generateParams();
};

export const generateMetadata = async (
  props: PageProps<'/[[...slug]]'>
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
