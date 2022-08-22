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
        cover: {
          objectFit: 'cover',
          position: 'center',
        },
      },
      size: {
        large: {
          width: 1000,
        },
      },
    },
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

  expect(img).toHaveStyle(`align-items: center`);
});

test('supports size from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Image data-testid="images" size="large" alt="test image" />
    </ThemeProvider>
  );
  const img = screen.getByTestId(/images/);

  expect(img).toHaveStyle(`width: 1000px`);
});

test('set object fit via prop', () => {
  render(<Image data-testid="images" alt="test image" fit="cover" />);

  const img = screen.getByTestId(/images/);

  expect(img).toHaveStyle(`object-fit: cover`);
});

test('set object position via prop', () => {
  render(
    <Image data-testid="images" alt="test image" position="left bottom" />
  );

  const img = screen.getByTestId(/images/);

  expect(img).toHaveStyle(`object-position: left bottom`);
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

  expect(img).toHaveStyle(`object-fit: fill`);
  expect(img).toHaveStyle(`object-position: bottom`);
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
