import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Card } from './Card';

const theme = {
  space: {
    none: 0,
    'small-1': 4,
    'small-2': 8,
    'medium-1': 16,
    'medium-2': 24,
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

test('accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const card = screen.getByTestId('card');
  expect(card).toHaveStyle(`background: ${theme.colors.yellow}`);
  expect(card).toHaveStyle(`padding: ${theme.space['medium-1']}px`);
});

test('supports padding as style prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="p" p="small-1" />
      <Card data-testid="pxy" px="small-1" py="medium-1" />
      <Card
        data-testid="ptblr"
        pt="small-2"
        pb="small-1"
        pl="medium-1"
        pr="medium-2"
      />
    </ThemeProvider>
  );

  const p = screen.getByTestId('p');
  expect(p).toHaveStyle(`padding: ${theme.space['small-1']}px`);

  const pxy = screen.getByTestId('pxy');
  expect(pxy).toHaveStyle(`padding-left: ${theme.space['small-1']}px`);
  expect(pxy).toHaveStyle(`padding-right: ${theme.space['small-1']}px`);
  expect(pxy).toHaveStyle(`padding-top: ${theme.space['medium-1']}px`);
  expect(pxy).toHaveStyle(`padding-bottom: ${theme.space['medium-1']}px`);

  const ptblr = screen.getByTestId('ptblr');
  expect(ptblr).toHaveStyle(`padding-top: ${theme.space['small-2']}px`);
  expect(ptblr).toHaveStyle(`padding-bottom: ${theme.space['small-1']}px`);
  expect(ptblr).toHaveStyle(`padding-left: ${theme.space['medium-1']}px`);
  expect(ptblr).toHaveStyle(`padding-right: ${theme.space['medium-2']}px`);
});
