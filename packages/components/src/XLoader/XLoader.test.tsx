import { render, screen } from '@testing-library/react';
import React from 'react';

import { Theme, ThemeProvider } from '@marigold/system';

import { XLoader } from './XLoader';

const theme: Theme = {
  name: 'test',
  components: {},
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
      <XLoader data-testid="loader" size={24} />
    </ThemeProvider>
  );
  const loader = screen.getByTestId('loader');

  expect(loader).toHaveClass('flex-none fill-current');
  expect(loader).toHaveAttribute('width', '24px');
  expect(loader).toHaveAttribute('height', '24px');
});

test('renders loader with differnet color through classname', () => {
  render(
    <ThemeProvider theme={theme}>
      <XLoader data-testid="loader" className="fill-red-500" />
    </ThemeProvider>
  );
  const loader = screen.getByTestId('loader');
  expect(loader).toHaveClass(`fill-red-500`);
});
