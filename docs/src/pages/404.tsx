import React from 'react';
import { Text, Heading } from '@marigold/components';
import { ThemeProvider } from '@marigold/system';
import b2bTheme from '@marigold/theme-b2b';

export default function NotFoundPage() {
  return (
    <ThemeProvider theme={b2bTheme}>
      <Heading variant="h1">404</Heading>
      <Text>oooops</Text>
    </ThemeProvider>
  );
}
