import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Image } from './Image';

const theme = {
  colors: {
    primary: 'hotpink',
  },
  components: {
    Image: {
      base: {
        alignItems: 'center',
      },
      variant: {
        fullWidth: {
          alignItems: 'center',
        },
      },
    },
  },
};

test('supports Image variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image data-testid="images" variant="fullWidth" />
    </ThemeProvider>
  );
  const img = screen.getByTestId(/images/);

  expect(img).toHaveStyle(`align-items: center`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image data-testid="default" />
    </ThemeProvider>
  );
  const img = screen.getByTestId(/default/);

  expect(img instanceof HTMLImageElement).toBeTruthy();
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

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image className="custom-class-name" data-testid="image" />
    </ThemeProvider>
  );
  const image = screen.getByTestId(/image/);

  expect(image.className).toMatch('custom-class-name');
});
