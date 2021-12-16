import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Image } from './Image';

const theme = {
  colors: {
    primary: 'hotpink',
  },
  image: {
    fullWidth: {
      alignItems: 'center',
    },
    logos: {
      alignItems: 'right',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image title="images" />
    </ThemeProvider>
  );
  const img = screen.getByTitle(/images/);

  expect(img).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image title="logos" variant="logos" />
    </ThemeProvider>
  );
  const img = screen.getByTitle(/logos/);

  expect(img).toHaveStyle(`align-items: right`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image title="default" />
    </ThemeProvider>
  );
  const img = screen.getByTitle(/default/);

  expect(img instanceof HTMLImageElement).toBeTruthy();
});

test('accept alt', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image alt="altText" title="default" />
    </ThemeProvider>
  );
  const img = screen.getByTitle(/default/);

  expect(img.getAttribute('alt')).toEqual('altText');
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image className="custom-class-name" title="image" />
    </ThemeProvider>
  );
  const image = screen.getByTitle(/image/);

  expect(image.className).toMatch('custom-class-name');
});
