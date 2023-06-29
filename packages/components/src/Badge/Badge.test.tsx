import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Badge } from './Badge';

const theme: Theme = {
  name: 'test',
  components: {
    Badge: cva('p-2', {
      variants: {
        variant: {
          one: ['rounded-sm'],
          two: ['rounded-md'],
        },
      },
    }),
  },
};

test('renders as a "div" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Badge data-testid="badge" />
    </ThemeProvider>
  );

  const badge = screen.getByTestId('badge');
  expect(badge instanceof HTMLDivElement).toBeTruthy();
});

test('uses base styling classes form "Badge" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Badge data-testid="badge" />
    </ThemeProvider>
  );
  const badge = screen.getByTestId('badge');
  expect(badge).toHaveClass('p-2');
});

test('supports "Badge" variants from theme', () => {
  const { rerender } = render(
    <ThemeProvider theme={theme}>
      <Badge variant="one" data-testid="badge" />
    </ThemeProvider>
  );

  let badge = screen.getByTestId('badge');
  expect(badge).toHaveClass('rounded-sm');

  rerender(
    <ThemeProvider theme={theme}>
      <Badge variant="two" data-testid="badge" />
    </ThemeProvider>
  );

  badge = screen.getByTestId('badge');
  expect(badge).toHaveClass('rounded-md');
});
