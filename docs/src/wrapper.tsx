import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import { MarigoldProvider } from '@marigold/components';
import { theme } from './theme';

import { Layout } from './components/Layout';
import { MarigoldThemeSwitch, themes } from './components/ThemeSwitch';
import * as mdxComponents from './mdx';

export const WrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;

export const WrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <MarigoldProvider theme={theme}>
    <MarigoldThemeSwitch themes={themes} initial="b2bTheme">
      <MDXProvider components={mdxComponents}>{element}</MDXProvider>
    </MarigoldThemeSwitch>
  </MarigoldProvider>
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
