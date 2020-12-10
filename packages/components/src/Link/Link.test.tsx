import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Link } from '@marigold/components';

const theme = {
  link: {
    normal: {
      fontFamily: 'Inter',
    },
    second: {
      fontFamily: 'Oswald',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" title="link">
        Link
      </Link>
    </ThemeProvider>
  );
  const link = screen.getByTitle(/link/);

  expect(link).toHaveStyle(`font-family: Inter`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" title="link" variant="second">
        Link
      </Link>
    </ThemeProvider>
  );
  const link = screen.getByTitle(/link/);

  expect(link).toHaveStyle(`font-family: Oswald`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" title="link">
        Link
      </Link>
    </ThemeProvider>
  );
  const link = screen.getByTitle(/link/);

  expect(link instanceof HTMLAnchorElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" className="custom-class-name" title="link">
        link
      </Link>
    </ThemeProvider>
  );
  const link = screen.getByTitle(/link/);

  expect(link.className).toMatch('custom-class-name');
});
