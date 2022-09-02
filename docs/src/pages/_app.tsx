import { MDXProvider } from '@mdx-js/react';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { MarigoldProvider, SSRProvider } from '@marigold/components';
import * as MarigoldComponents from '@marigold/components';
import * as MarigoldIcons from '@marigold/icons';
import unicornTheme from '@marigold/theme-unicorn';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';

import * as DocsComponents from '~/components';
import * as MdxComponents from '~/mdx/components';
import * as DemoComponents from '~/demos';

import { Layout, MarigoldThemeSwitch } from '~/components';
import { theme } from '~/theme';

import { Aside, Box, Container, Header, Text } from '@marigold/components';

import {
  FigmaLink,
  GradientHeadline,
  ThemeSelect,
  Title,
  TocContainer,
} from '~/components';
import createNavigationTree from '~/navigation.mjs';
import App from 'next/app';

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
  ...MdxComponents,
  ...DemoComponents,
  ...MarigoldComponents,
  ...MarigoldIcons,
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log('PAGEPROPS', pageProps);
  return (
    <SSRProvider>
      <MarigoldProvider theme={theme}>
        <MarigoldThemeSwitch themes={themes} initial="b2bTheme">
          <MDXProvider components={components as any}>
            <DevMode />
            <Layout navigation={process.env.navigation}>
              <Title title={pageProps?.title} />
              {pageProps?.title && (
                <Header>
                  <GradientHeadline>{pageProps.title}</GradientHeadline>
                  {pageProps.caption && (
                    <Text variant="page-caption">{pageProps.caption}</Text>
                  )}
                  {pageProps?.switchTheme && <ThemeSelect />}
                </Header>
              )}
              <Aside side="right" space="large-2">
                <Box
                  as={Container}
                  contentType="content"
                  size="large"
                  css={{ display: 'block' }}
                >
                  {pageProps?.figma && <FigmaLink href={pageProps.figma} />}
                  <Component {...pageProps} />
                </Box>
                <TocContainer />
              </Aside>
            </Layout>
          </MDXProvider>
        </MarigoldThemeSwitch>
      </MarigoldProvider>
    </SSRProvider>
  );
};

MyApp.getInitialProps = async (appContext: any) => {
  // const navigation = await createNavigationTree();
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return {
    pageProps: {
      path: appContext.router.asPath,
    },
  };
};

export default MyApp;
