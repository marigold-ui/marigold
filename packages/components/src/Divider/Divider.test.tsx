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
  divider: {
    __default: {
      margin: 'small',
    },
    bold: {
      margin: 'medium',
    },
  },
};

test('has base styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider data-testid="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTestId(/divider/);

  // __baseCSS
  expect(divider).toHaveStyle(`background: hotpink`);
  expect(divider).toHaveStyle(`width: 100%`);
  expect(divider).toHaveStyle(`height: 1px`);
  // margin from default variant
  expect(divider).toHaveStyle(`margin: 2px`);
});

test('supports default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Divider data-testid="divider" />
    </ThemeProvider>
  );
  const divider = screen.getByTestId(/divider/);

  expect(divider).toHaveStyle(`margin: 2px`);
});

test('accepts other variant than default', () => {
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
