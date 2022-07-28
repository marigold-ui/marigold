import { MDXProvider } from 'next-mdx-remote';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Box, Text, MarigoldProvider, SSRProvider } from '@marigold/components';
import * as MarigoldComponents from '@marigold/components';

import * as MdxComponents from '../mdx';
import { theme } from '../theme';

import CodeDemo from '../components/Sandpack/CodeDemo';
import { PropsTable } from '../components/PropsTable';
import { MarigoldTheme } from '../components/MarigoldTheme';

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

const components = {
  Head,
  PropsTable,
  MarigoldTheme,
  ...MdxComponents,
  ...MarigoldComponents,
  CodeDemo,
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SSRProvider>
      <MarigoldProvider theme={theme}>
        <MDXProvider components={components as any}>
          <DevMode />
          <Component {...pageProps} />
        </MDXProvider>
      </MarigoldProvider>
    </SSRProvider>
  );
};

export default App;
