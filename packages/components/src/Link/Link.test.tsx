import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Link } from './Link';

const theme = {
  text: {
    link: {
      fontFamily: 'Inter',
    },
    second: {
      fontFamily: 'Oswald',
    },
  },
};

test('uses `text.link` as default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" title="link">
        Link
      </Link>
    </ThemeProvider>
  );
  const link = screen.getByText(/Link/);

  expect(link).toHaveStyle(`font-family: Inter`);
});

test('allows to change variants via `variant` prop (with "text" prefix)', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" title="link" variant="second">
        Link
      </Link>
    </ThemeProvider>
  );
  const link = screen.getByText(/Link/);

  expect(link).toHaveStyle(`font-family: Oswald`);
});

test('renders a <a> element by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" title="link">
        Link
      </Link>
    </ThemeProvider>
  );
  const link = screen.getByText(/Link/);

  expect(link instanceof HTMLAnchorElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" className="custom-class-name" title="link">
        Link
      </Link>
    </ThemeProvider>
  );
  const link = screen.getByText(/Link/);

  expect(link.className).toMatch('custom-class-name');
});
