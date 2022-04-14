import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Card } from './Card';

const theme = {
  space: {
    none: 0,
    'small-1': 4,
    'medium-1': 16,
    'large-1': 24,
  },
  colors: {
    grey: '#dee2e6',
    yellow: '#fff9db',
    blue: '#339af0',
  },
  components: {
    Card: {
      base: {
        container: {
          p: 'small-1',
          border: '1px solid',
          borderColor: 'grey',
        },
      },
      variant: {
        yellow: {
          container: {
            bg: 'yellow',
          },
          title: {
            textTransform: 'uppercase',
          },
        },
        blue: {
          container: {
            bg: 'blue',
          },
        },
      },
      size: {
        medium: {
          container: {
            p: 'medium-1',
          },
        },
        large: {
          container: {
            p: 'large-1',
          },
          title: {
            p: 'small-1',
          },
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
      <Card data-testid="card" variant="yellow" size="large" />
    </ThemeProvider>
  );
  const card = screen.getByTestId('card');
  expect(card).toHaveStyle(`background: ${theme.colors.yellow}`);
  expect(card).toHaveStyle(`padding: ${theme.space['large-1']}px`);
});

test('Card passes down variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" variant="yellow" size="large">
        <Card.Title data-testid="card-title">This is the title!</Card.Title>
      </Card>
    </ThemeProvider>
  );
  const cardTitle = screen.getByTestId('card-title');
  expect(cardTitle).toHaveStyle(`text-transform: uppercase`);
  expect(cardTitle).toHaveStyle(`padding: ${theme.space['small-1']}px`);
});

test('CardTitle can use variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card">
        <Card.Title data-testid="card-title" variant="yellow" size="large">
          This is the title!
        </Card.Title>
      </Card>
    </ThemeProvider>
  );
  const cardTitle = screen.getByTestId('card-title');
  expect(cardTitle).toHaveStyle(`text-transform: uppercase`);
  expect(cardTitle).toHaveStyle(`padding: ${theme.space['small-1']}px`);
});

test("CardTitle's variant and size are not overriden from Card", () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" variant="blue" size="medium">
        <Card.Title data-testid="card-title" variant="yellow" size="large">
          This is the title!
        </Card.Title>
      </Card>
    </ThemeProvider>
  );
  const card = screen.getByTestId('card');
  expect(card).toHaveStyle(`background: ${theme.colors.blue}`);
  expect(card).toHaveStyle(`padding: ${theme.space['medium-1']}px`);

  const cardTitle = screen.getByTestId('card-title');
  expect(cardTitle).toHaveStyle(`text-transform: uppercase`);
  expect(cardTitle).toHaveStyle(`padding: ${theme.space['small-1']}px`);
});
