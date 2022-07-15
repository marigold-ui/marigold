import fs from 'fs-extra';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { CONTENT_PATH } from '../config';
import { getContentPaths, getNavigation } from '../navigation.utils';
import { Navigation } from '../components/Navigation';

//import { Sandpack } from '@codesandbox/sandpack-react';

const ContentPage = ({ source, navigation }: any) => (
  <div>
    {/* <Sandpack template="react" />; */}
    <Navigation navigation={navigation} />
    <div className="post-header">
      <h1>{source.frontmatter.title}</h1>
      {source.frontmatter.description && (
        <p className="description">{source.frontmatter.description}</p>
      )}
    </div>
    <main>
      <MDXRemote {...source} />
    </main>
  </div>
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
