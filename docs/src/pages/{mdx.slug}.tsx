import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Box } from 'packages/components/src/Box';

type PageProps = {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        title?: string;
      };
      headings: { value: string }[];
    };
  };
};

const Page = ({ data: { mdx } }: PageProps) => {
  const { body } = mdx;
  return (
    <Box as="main" maxWidth="700px" pt="medium">
      <MDXRenderer>{body}</MDXRenderer>
    </Box>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
      headings(depth: h1) {
        value
      }
    }
  }
`;

export default Page;
