import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Image } from '@marigold/components';

const theme = {
  content: {
    images: {
      alignItems: 'center',
    },
    logos: {
      alignItems: 'right',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Image title="images" />
    </MarigoldProvider>
  );
  const img = screen.getByTitle(/images/);

  expect(img).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Image title="logos" variant="logos" />
    </MarigoldProvider>
  );
  const img = screen.getByTitle(/logos/);

  expect(img).toHaveStyle(`align-items: right`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Image title="default" />
    </MarigoldProvider>
  );
  const img = screen.getByTitle(/default/);

  expect(img instanceof HTMLImageElement).toBeTruthy();
});

test('accept alt', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Image alt="altText" title="default" />
    </MarigoldProvider>
  );
  const img = screen.getByTitle(/default/);

  expect(img.getAttribute('alt')).toEqual('altText');
});

test('accepts custom styles prop className', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Image className="custom-class-name" title="image" />
    </MarigoldProvider>
  );
  const image = screen.getByTitle(/image/);

  expect(image.className).toMatch('custom-class-name');
});
