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
      <Link href="#!">Link</Link>
    </ThemeProvider>
  );
  const link = screen.getByText(/Link/);

  expect(link).toHaveStyle(`font-family: Inter`);
});

test('allows to change variants via `variant` prop (with "text" prefix)', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" variant="second">
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
      <Link href="#!">Link</Link>
    </ThemeProvider>
  );
  const link = screen.getByText(/Link/);

  expect(link instanceof HTMLAnchorElement).toBeTruthy();
});

test('accepts custom className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" className="custom-class-name">
        Link
      </Link>
    </ThemeProvider>
  );
  const link = screen.getByText(/Link/);

  expect(link.className).toMatch('custom-class-name');
});

test('accepts other routing components', () => {
  const RouterLink = React.forwardRef<
    HTMLSpanElement,
    { to: string; children?: React.ReactNode }
  >(() => <span>I am a Router Link!</span>);

  render(
    <ThemeProvider theme={theme}>
      <Link as={RouterLink} to="/Home">
        Link
      </Link>
    </ThemeProvider>
  );

  const link = screen.getByText('I am a Router Link!');
  expect(link).toBeTruthy();
});

test('a link can be disabled via aria attributes', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" disabled={true}>
        Link
      </Link>
    </ThemeProvider>
  );
  const link = screen.getByText(/Link/);
  expect(link.getAttribute('aria-disabled')).toEqual('true');
});
