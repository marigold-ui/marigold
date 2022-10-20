import React from 'react';
import { render, screen } from '@testing-library/react';
import { XLoader } from './XLoader';
import { ThemeProvider } from '@marigold/system';

const theme = {
  sizes: {
    none: 0,
    small: 100,
  },
  colors: {
    red: '#ffa8a8',
  },
};

test('renders loader', () => {
  render(
    <ThemeProvider theme={theme}>
      <XLoader data-testid="loader" />
    </ThemeProvider>
  );
  const loader = screen.getByTestId('loader');
  expect(loader instanceof SVGElement).toBeTruthy();
});

test('renders loader with differnet size', () => {
  render(
    <ThemeProvider theme={theme}>
      <XLoader data-testid="loader" size="small" />
    </ThemeProvider>
  );
  const loader = screen.getByTestId('loader');
  expect(loader).toHaveStyle(`width: ${theme.sizes['small']}px`);
  expect(loader).toHaveStyle(`height: ${theme.sizes['small']}px`);
});

test('renders loader with differnet color', () => {
  render(
    <ThemeProvider theme={theme}>
      <XLoader data-testid="loader" fill="red" />
    </ThemeProvider>
  );
  const loader = screen.getByTestId('loader');
  expect(loader).toHaveStyle(`fill: ${theme.colors.red}`);
});
