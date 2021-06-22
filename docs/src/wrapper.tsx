import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import { ThemeProvider } from '@marigold/system';
import { theme } from './theme';

import { Layout } from './components/Layout';
import * as mdxComponents from './mdx';

export const WrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;

export const WrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <ThemeProvider theme={theme}>
    <MDXProvider components={mdxComponents}>{element}</MDXProvider>;
  </ThemeProvider>
);

/**
 * Enforce reloading to update styles.
 */
if (module.hot) {
  module.hot.accept('./theme', () => {
    console.log('🏵  UPDATE THEME!');
    window.location.reload();
  });
}
