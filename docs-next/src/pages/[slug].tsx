import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';

import * as MdxComponents from '../mdx';
import * as MarigoldComponents from '@marigold/components';

import { CONTENT_PATH } from '../config';

const components = {
  Head,
  ...MdxComponents,
  ...MarigoldComponents,
};

const ContentPage = ({ source, frontMatter }: any) => (
  <div>
    <div className="post-header">
      <h1>{frontMatter.title}</h1>
      {frontMatter.description && (
        <p className="description">{frontMatter.description}</p>
      )}
    </div>
    <main>
      <MDXRemote {...source} components={components} />
    </main>
  </div>
);

export default ContentPage;

export const getStaticProps = async ({ params }: any) => {
  const contentFilePath = path.join(CONTENT_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(contentFilePath);

  const { content, data: frontMatter } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: frontMatter,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter,
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
