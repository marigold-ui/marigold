import { MDXProvider } from 'next-mdx-remote';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Box, MarigoldProvider, SSRProvider } from '@marigold/components';
import * as MarigoldComponents from '@marigold/components';

import * as DocsComponents from '../components';
import { mdxComponents } from '../mdx';
import * as demos from '../demos';

import { theme } from '../theme';

import CodeDemo from '../components/Sandpack/CodeDemo';

import { MarigoldThemeSwitch } from '../components';
import unicornTheme from '@marigold/theme-unicorn';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';

const themes = {
  unicornTheme,
  b2bTheme,
  coreTheme,
};

const DevMode = () => {
  const devMode = process.env.NODE_ENV === 'development';
  if (devMode) {
    return (
      <Box
        bg="#f3f3f3"
        css={{
          textAlign: 'center',
          textTransform: 'uppercase',
          fontFamily: 'headline',
        }}
      >
        <Box as="span" color="#1d67b6">
          localhost
        </Box>
      </Box>
    );
  }
  return null;
};

const components = {
  Head,
  ...DocsComponents,
  ...mdxComponents,
  // ...demos,
  ...MarigoldComponents,
  CodeDemo,
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SSRProvider>
      <MarigoldProvider theme={theme}>
        <MarigoldThemeSwitch themes={themes} initial="b2bTheme">
          <MDXProvider components={components as any}>
            <DevMode />
            <Component {...pageProps} />
          </MDXProvider>
        </MarigoldThemeSwitch>
      </MarigoldProvider>
    </SSRProvider>
  );
};

export default App;
