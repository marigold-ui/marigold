import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
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

  expect(link).toContainHTML('<a ');
});
