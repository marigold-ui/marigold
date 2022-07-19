import { MDXProvider } from 'next-mdx-remote';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Box, Text, MarigoldProvider } from '@marigold/components';
import * as MarigoldComponents from '@marigold/components';

import * as MdxComponents from '../mdx';
import { theme } from '../theme';

import CodeEditorPreview from '../components/CodeEditorPreview';
import CodeEditorPreviewProvider from '../components/CodeEditorPreviewProvider';

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
  ...MdxComponents,
  ...MarigoldComponents,
  CodeEditorPreview,
  CodeEditorPreviewProvider,
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
