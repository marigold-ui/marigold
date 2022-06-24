import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import * as mdxComponents from '../mdx';
import { MarigoldTheme } from '../components/MarigoldTheme';

import { theme } from '../theme';
import { Helmet } from 'react-helmet';
import { LandingPage } from './landingpage';
import * as MarigoldComponents from '@marigold/components';
import * as MarigoldIcons from '@marigold/icons';
import { getAllPosts, getPostBySlug } from '../../lib/posts';

import { Box, Text, MarigoldProvider, SSRProvider } from '@marigold/components';
import { MarigoldThemeSwitch, themes } from '../components/ThemeSwitch';
import type { ReactElement } from 'react';
import markdownToHtml from 'docs-next/lib/markdownToHtml';

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

export function Page({ children }: { children: ReactElement }) {
  return (
    <div>
      <Helmet>
        <title>Marigold Design System</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <DevMode />

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
              {/* for testing landingpage */}
              <LandingPage />
            </MDXProvider>
          </MarigoldThemeSwitch>
        </MarigoldProvider>
      </SSRProvider>
    </div>
  );
}

export async function getStaticProps({ params }: any) {
  const doc = getPostBySlug(params.slug);
  console.log(doc);
  const content = await markdownToHtml(doc.content || '');
  return {
    props: {
      ...doc,
      content,
    },
  };
}

export async function getStaticPaths() {
  const docs = getAllPosts();
  return {
    paths: docs.map(doc => {
      return {
        params: {
          slug: doc.slug,
        },
      };
    }),
    fallback: false,
  };
}

/**
 * Enforce reloading to update styles.
 */
if (module.hot) {
  module.hot.accept('../theme', () => {
    console.log('🏵  UPDATE THEME!');
    window.location.reload();
  });
}

export default Page;
