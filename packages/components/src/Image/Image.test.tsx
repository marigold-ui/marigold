import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { cva } from 'class-variance-authority';
import { Image } from './Image';

const theme: Theme = {
  name: 'test',
  components: {
    Image: cva('items-center', {
      variants: {
        variant: {
          fullWidth: 'items-center',
          cover: 'object-cover object-center',
        },
        size: {
          large: 'w-[1000px]',
        },
      },
    }),
  },
};

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image data-testid="default" alt="test image" />
    </ThemeProvider>
  );
  const img = screen.getByTestId(/default/);

  expect(img instanceof HTMLImageElement).toBeTruthy();
});

test('supports variant from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image data-testid="images" variant="fullWidth" alt="test image" />
    </ThemeProvider>
  );
  const img = screen.getByTestId(/images/);

  expect(img).toHaveClass(`items-center`);
});

test('supports size from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image data-testid="images" size="large" alt="test image" />
    </ThemeProvider>
  );
  const img = screen.getByTestId(/images/);

  expect(img).toHaveClass(`w-[1000px]`);
});

test('set object fit via prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image data-testid="images" alt="test image" fit="cover" />
    </ThemeProvider>
  );

  const img = screen.getByTestId(/images/);

  expect(img).toHaveClass(`object-cover`);
});

test('set object position via prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image data-testid="images" alt="test image" position="leftBottom" />
    </ThemeProvider>
  );

  const img = screen.getByTestId(/images/);

  expect(img).toHaveClass(`object-left-bottom`);
});

test('setting object position and fit via props overrides theme values', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image
        data-testid="images"
        alt="test image"
        variant="cover"
        fit="fill"
        position="bottom"
      />
    </ThemeProvider>
  );
  const img = screen.getByTestId(/images/);

  expect(img).toHaveClass(`object-fill`);
  expect(img).toHaveClass(`object-bottom`);
});

test('accept alt', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image alt="altText" data-testid="default" />
    </ThemeProvider>
  );
  const img = screen.getByTestId(/default/);

  expect(img.getAttribute('alt')).toEqual('altText');
});
