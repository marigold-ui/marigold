import React from 'react';
import { Column, Columns, Text } from '@marigold/components';
import { ThemeProvider } from '@marigold/system';
import b2bTheme from '@marigold/theme-b2b';

import { Navigation } from './Navigation';

export const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={b2bTheme}>
      <Columns space={4}>
        <Column width={4}>
          <Navigation />
        </Column>
        <Column width={8}>
          <Text>{children}</Text>
        </Column>
      </Columns>
    </ThemeProvider>
  );
};
