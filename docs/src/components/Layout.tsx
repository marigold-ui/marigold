import React from 'react';
import { Helmet } from 'react-helmet';
import { Column, Columns } from '@marigold/components';
import { ThemeProvider } from '@marigold/system';
import b2bTheme from '@marigold/theme-b2b';

import { Navigation } from './Navigation';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <title>Marigold Design System</title>
      </Helmet>
      <ThemeProvider theme={b2bTheme}>
        <Columns space={4}>
          <Column width={4}>
            <Navigation />
          </Column>
          <Column width={10}>{children}</Column>
        </Columns>
      </ThemeProvider>
    </>
  );
};
