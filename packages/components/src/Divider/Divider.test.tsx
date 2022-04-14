import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Divider } from './Divider';

const theme = {
  space: {
    none: 0,
    small: 2,
    medium: 4,
  },
  colors: {
    text: 'hotpink',
  },
  components: {
    Divider: {
      base: {
        margin: 'small',
      },
      variant: {
        bold: {
          margin: 'medium',
        },
      },
    },
  },
};

test('supports base styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider data-testid="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTestId(/divider/);

  expect(divider).toHaveStyle(`margin: 2px`);
});

test('accepts other variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider variant="bold" data-testid="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTestId(/divider/);

  expect(divider).toHaveStyle(`margin: 4px`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider data-testid="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTestId(/divider/);

  expect(divider instanceof HTMLDivElement).toBeTruthy();
});
