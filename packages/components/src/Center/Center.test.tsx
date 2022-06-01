import React from 'react';
import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '@marigold/system';

import { Box } from '../Box';
import { Center } from './Center';

const theme = {
  sizes: {
    none: 0,
    large: 120,
  },
  space: {
    none: 0,
    medium: 16,
  },
};

test('supports maxWidth', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center maxWidth="50ch" data-testid="center">
        <Box>content</Box>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`maxInlineSize: 50ch`);
});

test('supports maxWidth from theme sizes', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center maxWidth="large" data-testid="center">
        <Box>content</Box>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`maxInlineSize: 120px`);
});

test('supports space prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Center space="medium" data-testid="center">
        <Box>content</Box>
        <Box>content2</Box>
      </Center>
    </ThemeProvider>
  );
  const center = screen.getByTestId(/center/);
  expect(center).toHaveStyle(`gap: 16px`);
});
