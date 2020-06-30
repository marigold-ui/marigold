import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Link } from '@marigold/components';

const theme = {
  link: {
    link: {
      fontFamily: 'Inter',
    },
    second: {
      fontFamily: 'Oswald',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Link href="#!" title="link">
        Link
      </Link>
    </MarigoldProvider>
  );
  const link = screen.getByTitle(/link/);

  expect(link).toHaveStyle(`font-family: Inter`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Link href="#!" title="link" variant="second">
        Link
      </Link>
    </MarigoldProvider>
  );
  const link = screen.getByTitle(/link/);

  expect(link).toHaveStyle(`font-family: Oswald`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Link href="#!" title="link">
        Link
      </Link>
    </MarigoldProvider>
  );
  const link = screen.getByTitle(/link/);

  expect(link).toContainHTML('<a href=');
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Link href="#!" title="link" css={{ fontFamily: 'Roboto' }}>
        Link
      </Link>
    </MarigoldProvider>
  );
  const link = screen.getByTitle(/link/);

  expect(link).not.toHaveStyle(`font-family: Roboto`);
  expect(link).toHaveStyle(`font-family: Inter`);
});
