import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { CONTENT_PATH } from '../config';

const ContentPage = ({ source }: any) => (
  <div>
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
  const contentFilePath = path.join(CONTENT_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(contentFilePath, 'utf8');
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    parseFrontmatter: true,
  });

  return {
    props: {
      source: mdxSource,
    },
  };
};

export const getStaticPaths = async () => {
  const contentFilePaths = fs
    .readdirSync(CONTENT_PATH)
    .filter(p => /\.mdx?$/.test(p));

  const paths = contentFilePaths
    .map(path => path.replace(/\.mdx?$/, ''))
    .map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
