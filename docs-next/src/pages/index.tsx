import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import * as mdxComponents from '../mdx';
import { MarigoldTheme } from '../components/MarigoldTheme';

import { theme } from '../theme';
import { Helmet } from 'react-helmet';

import {
  Button,
  Stack,
  Box,
  Text,
  MarigoldProvider,
  SSRProvider,
} from '@marigold/components';
import { MarigoldThemeSwitch, themes } from '../components/ThemeSwitch';
import * as MarigoldComponents from '@marigold/components';
import * as MarigoldIcons from '@marigold/icons';

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

export default function WrapPageElement() {
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
                ...(MarigoldComponents as any),
                ...(MarigoldIcons as any),
                MarigoldTheme,
              }}
              children={undefined}
            ></MDXProvider>
          </MarigoldThemeSwitch>
        </MarigoldProvider>
      </SSRProvider>
    </div>
  );
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
