import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

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
    <main>
      <MDXRenderer>{body}</MDXRenderer>
    </main>
  );
};

export const query = graphql`
  query($id: String) {
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
