import { MDXProvider } from 'next-mdx-remote';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Box, MarigoldProvider } from '@marigold/components';
import * as MarigoldComponents from '@marigold/components';

import * as MdxComponents from '../mdx';
import { theme } from '../theme';

import CodeDemo from '../components/Sandpack/CodeDemo';

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
  ...MdxComponents,
  ...MarigoldComponents,
  CodeDemo,
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MarigoldProvider theme={theme}>
      <MDXProvider components={components as any}>
        <DevMode />
        <Component {...pageProps} />
      </MDXProvider>
    </MarigoldProvider>
  );
};

export default App;
