import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Card } from './Card';

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
    Card: {
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

test('renders as a "div" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" />
    </ThemeProvider>
  );

  const card = screen.getByTestId('card');
  expect(card instanceof HTMLDivElement).toBeTruthy();
});

test('uses base styling form "Card" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" />
    </ThemeProvider>
  );
  const card = screen.getByTestId('card');
  expect(card).toHaveStyle(`padding: ${theme.space['small-1']}px`);
});

test('Card accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const card = screen.getByTestId('card');
  expect(card).toHaveStyle(`background: ${theme.colors.yellow}`);
  expect(card).toHaveStyle(`padding: ${theme.space['medium-1']}px`);
});
