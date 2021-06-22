import React from 'react';
import { Text, Heading } from '@marigold/components';
import { ThemeProvider } from '@marigold/system';
import b2bTheme from '@marigold/theme-b2b';

export default function LandingPage() {
  return (
    <ThemeProvider theme={b2bTheme}>
      <Heading variant="h1">Welcome to Marigold</Heading>
      <Text>The design system based on Emotion and theme-ui</Text>
    </ThemeProvider>
  );
}
