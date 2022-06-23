import { Box } from '@marigold/components';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
  const { content } = getAllPosts();

  return (
    <Layout>
      <Box as="main" maxWidth="700px" pt="medium">
        {content}
      </Box>
    </Layout>
  );
};

import { remark } from 'remark';
import html from 'remark-html';
import { getPostBySlug, getAllPosts } from '../../posts';

export async function getStaticProps() {
  const post = getPostBySlug();
  const markdown = await remark()
    .use(html)
    .process(post.content || '');
  const content = markdown.toString();

  return {
    props: {
      ...post,
      content,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  console.log(posts);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

interface PageProps {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        title?: string;
      };
      headings: { value: string }[];
    };
  };
}

export default Page;
