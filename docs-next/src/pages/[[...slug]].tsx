import fs from 'fs-extra';
import path from 'path';
import { globby } from 'globby';
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
  const contentFilePath = path.join(
    CONTENT_PATH,
    (params.slug || ['index']).join('/')
  );
  // TODO: try file path, if not exis add /"index.mdx"
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

  return {
    props: {
      source: mdxSource,
    },
  };
};

export const getStaticPaths = async () => {
  const contentFilePaths = await globby([CONTENT_PATH]);

  const paths = contentFilePaths
    .filter(p => /\.mdx?$/.test(p))
    .map(p => p.replace(/\.mdx?$/, ''))
    .map(p => path.relative(CONTENT_PATH, p))
    .map(slug => ({ params: { slug: slug.split('/') } }));

  paths.push({ params: { slug: [] } });
  paths.push({ params: { slug: ['introduction'] } });

  return {
    paths,
    fallback: false,
  };
};
