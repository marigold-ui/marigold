import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import { Layout } from './components/Layout';
import * as mdxComponents from './mdx';

export const WrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;

export const WrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return <MDXProvider components={mdxComponents}>{element}</MDXProvider>;
};
