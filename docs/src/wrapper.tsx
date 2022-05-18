import React from 'react';
import { Helmet } from 'react-helmet';
import { GatsbyBrowser } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import { Box, MarigoldProvider, SSRProvider, Text } from '@marigold/components';
import * as MarigoldComponents from '@marigold/components';
import * as MarigoldIcons from '@marigold/icons';

import { theme } from './theme';
import { MarigoldThemeSwitch, themes } from './components/ThemeSwitch';
import * as mdxComponents from './mdx';
import { MarigoldTheme } from './components/MarigoldTheme';

const DevMode = () => {
  const devMode = process.env.NODE_ENV === 'development';
  if (devMode) {
    return (
      <Box
        bg="#f3f3f3"
        css={{ textAlign: 'center', textTransform: 'uppercase' }}
      >
        <Text color="#1d67b6">localhost</Text>
      </Box>
    );
  }
  return null;
};

export const WrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  return (
    <>
      {/* @ts-expect-error  */}
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Marigold Design System</title>
      </Helmet>
      <DevMode />
      {element}
    </>
  );
};

export const WrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
  <SSRProvider>
    <MarigoldProvider theme={theme}>
      <MarigoldThemeSwitch themes={themes} initial="b2bTheme">
        <MDXProvider
          components={{
            ...mdxComponents,
            ...(MarigoldComponents as any),
            ...(MarigoldIcons as any),
            MarigoldTheme,
          }}
        >
          {element}
        </MDXProvider>
      </MarigoldThemeSwitch>
    </MarigoldProvider>
  </SSRProvider>
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
