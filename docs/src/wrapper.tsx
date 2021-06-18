import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import { ThemeProvider } from '@marigold/system';
import b2bTheme from '@marigold/theme-b2b';

import { Layout } from './components/Layout';
import * as mdxComponents from './mdx';

export const WrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;

export const WrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <ThemeProvider theme={b2bTheme}>
    <MDXProvider components={mdxComponents}>{element}</MDXProvider>;
  </ThemeProvider>
);
