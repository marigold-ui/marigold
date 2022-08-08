import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Aside, Container, Header, Text } from '@marigold/components';

import { GradientHeadline, Layout, TocContainer } from '~/components';

import {
  getContentPaths,
  getNavigation,
  NavigationMenu,
} from '~/navigation.utils';
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
        <Aside side="right" space="large-2">
          <Container contentType="content" size="large">
            <MDXRemote {...source} />
          </Container>
          <TocContainer />
        </Aside>
      </main>
    </Layout>
  );
};

export default ContentPage;

export const getStaticProps = async ({ params }: any) => {
  const source = await serialize(params.slug);

  const navigation = await getNavigation();

  return {
    props: {
      source,
      navigation,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getContentPaths();
  return {
    paths,
    fallback: false,
  };
};
