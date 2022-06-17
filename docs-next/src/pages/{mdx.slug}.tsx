import { Box } from '@marigold/components';
import { NextPage } from 'next';
import { Layout } from '../components/Layout';

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

const Page: NextPage<PageProps> = ({ data: { mdx } }) => {
  const { body } = mdx;
  console.log('mdx', mdx);
  return (
    <Layout>
      <Box as="main" maxWidth="700px" pt="medium">
        {body}
      </Box>
    </Layout>
  );
};

// const Page: NextPage<PageProps> = ({ userAgent }) => (
//   <main>Your user agent: {userAgent}</main>
// );

export default Page;
