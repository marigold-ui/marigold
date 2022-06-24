import { Box } from '@marigold/components';
import { Layout } from '../components/Layout';
import type { NextPageWithLayout } from './_app';

import { getAllPosts, getPostBySlug } from '../../lib/posts';
import markdownToHtml from '../../lib/markdownToHtml';

export async function getStaticProps({ params }: any) {
  const doc = getPostBySlug(params.slug);
  console.log(doc);
  const content = await markdownToHtml(doc.content || '');
  return {
    props: {
      ...doc,
      content,
    },
  };
}

export async function getStaticPaths() {
  const docs = getAllPosts();
  return {
    paths: docs.map(doc => {
      return {
        params: {
          slug: doc.slug,
        },
      };
    }),
    fallback: false,
  };
}

// export function Doc({ content }: any) {
//   return (
//     <Layout>
//       <Box as="main" maxWidth="700px" pt="medium">
//         {content}
//       </Box>
//     </Layout>
//   );
// }

// export async function getStaticProps({ params }: any) {
//   const doc = getPostBySlug(params.slug);
//   const content = await markdownToHtml(doc.content || '');

//   return {
//     props: {
//       ...doc,
//       content,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const docs = getAllPosts();
//   return {
//     paths: docs.map(doc => {
//       return {
//         params: {
//           slug: doc.slug,
//         },
//       };
//     }),
//     fallback: false,
//   };
// }

// const Page: NextPageWithLayout = ({}) => {
//   const postsDirectory = join(process.cwd(), 'src', 'content', 'introduction');

//   return (
//     <Layout>
//       <Box as="main" maxWidth="700px" pt="medium">
//         {body}
//       </Box>
//     </Layout>
//   );
// };

// interface PageProps {
//   data: {
//     mdx: {
//       body: string;
//       frontmatter: {
//         title?: string;
//       };
//       headings: { value: string }[];
//     };
//   };
// }

// export default Page;
