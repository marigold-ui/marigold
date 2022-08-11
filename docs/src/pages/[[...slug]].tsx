import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Aside, Container, Header, Text } from '@marigold/components';

import { GradientHeadline, ThemeSelect, TocContainer } from '~/components';
import { getMdxFromSlug, getMdxPaths } from '~/mdx/pages';
import { serialize } from '~/mdx/serialize';

export interface ContentPageProps {
  source: MDXRemoteSerializeResult;
}

const ContentPage = ({ source }: ContentPageProps) => {
  const frontmatter = source.frontmatter as { [key: string]: any } | undefined;
  return (
    <>
      {frontmatter?.title && (
        <Header>
          <GradientHeadline>{frontmatter.title}</GradientHeadline>
          {frontmatter.caption && (
            <Text variant="page-caption">{frontmatter.caption}</Text>
          )}
          {frontmatter?.switch && <ThemeSelect />}
        </Header>
      )}
      <Aside side="right" space="large-2">
        <Container contentType="content" size="large">
          <MDXRemote {...source} />
        </Container>
        <TocContainer />
      </Aside>
    </>
  );
};

export default ContentPage;

export const getStaticProps = async ({ params }: any) => {
  const content = await getMdxFromSlug(params.slug || ['index']);
  const source = await serialize(content);

  return {
    props: {
      source,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getMdxPaths();
  return {
    paths,
    fallback: false,
  };
};
