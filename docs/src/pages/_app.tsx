import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';

import { MarigoldProvider, SSRProvider } from '@marigold/components';
import * as MarigoldComponents from '@marigold/components';
import * as MarigoldIcons from '@marigold/icons';
import unicornTheme from '@marigold/theme-unicorn';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core22';

import * as DocsComponents from '~/components';
import * as MdxComponents from '~/mdx/components';
import * as DemoComponents from '~/demos';

import { Layout, MarigoldThemeSwitch } from '~/components';
import { theme } from '~/theme';

import {
  Box,
  Container,
  Header,
  Inline,
  Split,
  Text,
} from '@marigold/components';

import {
  IconLinksList,
  GradientHeadline,
  ThemeMenu,
  Title,
  TocContainer,
  ScrollToTop,
} from '~/components';

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
        css={{
          textAlign: 'center',
          textTransform: 'uppercase',
          fontFamily: 'headline',
          bg: '#f3f3f3',
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

export interface PageProps {
  title?: string;
  caption?: string;
  switchTheme?: boolean;
  figma?: string;
  github?: string;
  edit?: string;
  badge?: string;
}

const MyApp = ({ Component, pageProps }: AppProps<PageProps>) => {
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
                </Header>
              )}
              <Box css={{ display: 'flex', gap: 'large-2' }}>
                <Container contentType="content" size="large">
                  <Box as={Inline} css={{ mb: 'small-1' }}>
                    {pageProps?.switchTheme && <ThemeMenu />}
                    <Split />
                    {(pageProps?.figma ||
                      pageProps?.github ||
                      pageProps?.edit) && (
                      <IconLinksList
                        figma={pageProps?.figma ? pageProps?.figma : undefined}
                        github={
                          pageProps?.github ? pageProps?.github : undefined
                        }
                        edit={pageProps?.edit ? pageProps?.edit : undefined}
                      />
                    )}
                  </Box>
                  <Component {...pageProps} />
                </Container>
                <TocContainer />
              </Box>
              <ScrollToTop />
            </Layout>
          </MDXProvider>
        </MarigoldThemeSwitch>
      </MarigoldProvider>
    </SSRProvider>
  );
};

export default MyApp;
