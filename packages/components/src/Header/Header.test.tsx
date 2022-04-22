import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Header } from './Header';

const theme = {
  space: {
    none: 0,
    'small-1': 4,
    'medium-1': 16,
  },
  colors: {
    grey: '#dee2e6',
    yellow: '#fff9db',
  },
  components: {
    Header: {
      base: {
        p: 'small-1',
        border: '1px solid',
        borderColor: 'grey',
      },
      variant: {
        yellow: {
          bg: 'yellow',
        },
      },
      size: {
        medium: {
          p: 'medium-1',
        },
      },
    },
  },
};

test('renders as a "header" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Header data-testid="header" />
    </ThemeProvider>
  );

  const header = screen.getByTestId('header');
  expect(header.tagName).toEqual('HEADER');
});

test('uses base styling form "header" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Header data-testid="header" />
    </ThemeProvider>
  );
  const header = screen.getByTestId('header');
  expect(header).toHaveStyle(`padding: ${theme.space['small-1']}px`);
});

test('header accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Header data-testid="header" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const header = screen.getByTestId('header');
  expect(header).toHaveStyle(`background: ${theme.colors.yellow}`);
  expect(header).toHaveStyle(`padding: ${theme.space['medium-1']}px`);
});
