import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import { Layout } from './src/components/Layout';
import { mdxComponents } from './src/components/MdxComponents';

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={mdxComponents}>{element}</MDXProvider>;
};

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
