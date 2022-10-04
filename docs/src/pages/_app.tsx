import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MDXProvider } from '@mdx-js/react';

import { Badge, MarigoldProvider, SSRProvider } from '@marigold/components';
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
  ThemeSelect,
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

const badgeNameToLowercase = (badge: string) => {
  return badge.toLowerCase();
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
                  {pageProps?.badge && (
                    <Badge variant={badgeNameToLowercase(pageProps.badge)}>
                      {pageProps.badge}
                    </Badge>
                  )}
                  <GradientHeadline>{pageProps.title}</GradientHeadline>
                  {pageProps.caption && (
                    <Text variant="page-caption">{pageProps.caption}</Text>
                  )}
                </Header>
              )}
              <Box css={{ display: 'flex', gap: 'large-2' }}>
                <Container contentType="content" size="large">
                  <Box as={Inline} mb={'small-1'}>
                    {pageProps?.switchTheme && <ThemeSelect />}
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
