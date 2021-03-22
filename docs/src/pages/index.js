import React from 'react';
import { Column, Columns } from '@marigold/components';
import { ThemeProvider } from '@marigold/system';
import b2bTheme from '@marigold/theme-b2b';

import Navigation from '../components/Navigation';

export default function Home({ children }) {
  return (
    <ThemeProvider theme={b2bTheme}>
      <Columns space={4}>
        <Column width={2}>
          <Navigation />
        </Column>
        <Column width={10}>{children}</Column>
      </Columns>
    </ThemeProvider>
  );
}
