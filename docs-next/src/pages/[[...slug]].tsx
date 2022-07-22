import fs from 'fs-extra';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { CONTENT_PATH } from '../config';
import { getContentPaths, getNavigation } from '../navigation.utils';
import { Layout } from '../components/Layout';

const ContentPage = ({ source, navigation }: any) => (
  <Layout navigation={navigation}>
    <main>
      <MDXRemote {...source} />
    </main>
  </Layout>
);

export default ContentPage;

export const getStaticProps = async ({ params }: any) => {
  const contentFilePath = path.join(
    CONTENT_PATH,
    (params.slug || ['index']).join('/')
  );

  let source;
  try {
    source = await fs.readFile(`${contentFilePath}.mdx`, 'utf8');
  } catch {
    source = await fs.readFile(`${contentFilePath}/index.mdx`, 'utf8');
  }

  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    parseFrontmatter: true,
  });

  const navigation = await getNavigation();

  return {
    props: {
      source: mdxSource,
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
