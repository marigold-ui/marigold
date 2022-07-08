import { MDXProvider } from '@mdx-js/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { MarigoldProvider } from '@marigold/components';
import * as MarigoldComponents from '@marigold/components';

import * as MdxComponents from '../mdx';
import { theme } from '../theme';

const components = {
  Head,
  ...MdxComponents,
  ...MarigoldComponents,
};
const App = ({ Component, pageProps }: AppProps) => (
  <MarigoldProvider theme={theme}>
    <MDXProvider components={components as any}>
      <Component {...pageProps} />
    </MDXProvider>
  </MarigoldProvider>
);

export default App;
