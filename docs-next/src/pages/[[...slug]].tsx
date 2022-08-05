import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Container, Header, Text } from '@marigold/components';

import { GradientHeadline, Layout, NavigationMenu } from '~/components';
import { getNavigation } from '~/navigation.utils';
import { getMdxFromSlug, getMdxPaths } from '~/mdx/pages';
import { serialize } from '~/mdx/serialize';

export interface ContentPageProps {
  source: MDXRemoteSerializeResult;
  navigation: NavigationMenu;
}

const ContentPage = ({ source, navigation }: ContentPageProps) => {
  const frontmatter = source.frontmatter as { [key: string]: any } | undefined;
  return (
    <Layout navigation={navigation}>
      <main>
        {frontmatter?.title && (
          <Header>
            <GradientHeadline>{frontmatter.title}</GradientHeadline>
            {frontmatter.caption && (
              <Text variant="page-caption">{frontmatter.caption}</Text>
            )}
          </Header>
        )}
        <Container contentType="content" size="large">
          <MDXRemote {...source} />
        </Container>
      </main>
    </Layout>
  );
};

export default ContentPage;

export const getStaticProps = async ({ params }: any) => {
  const content = await getMdxFromSlug(params.slug || ['index']);
  const source = await serialize(content);

  const navigation = await getNavigation();

  return {
    props: {
      source,
      navigation,
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
