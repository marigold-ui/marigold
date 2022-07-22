import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Link } from './Link';

const theme = {
  fonts: {
    link: 'Inter',
    body: 'Oswald',
  },

  components: {
    Link: {
      base: {
        fontFamily: 'link',
        color: 'blue',
        '&:disabled': {
          color: 'grey',
        },
      },
      variant: {
        second: {
          fontFamily: 'body',
          color: 'green',
        },
      },
    },
  },
};

let warnMock: jest.SpyInstance;

beforeEach(() => {
  warnMock = jest.spyOn(console, 'warn').mockImplementation();
});

afterEach(() => {
  warnMock.mockRestore();
});

test('uses base variant', () => {
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

test('link supports disabled variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Link href="#!" disabled={true}>
        Link
      </Link>
    </ThemeProvider>
  );

  const link = screen.getByText(/Link/);
  expect(link).toHaveStyle(`color: grey`);
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLAnchorElement>();
  render(<Link ref={ref}>Link</Link>);

  expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
});

test('forwards ref (with "as")', () => {
  const ref = React.createRef<HTMLSpanElement>();
  render(
    <Link as="span" ref={ref}>
      Link
    </Link>
  );

  expect(ref.current).toBeInstanceOf(HTMLSpanElement);
});

test('deprecate "onClick"', () => {
  render(<Link onClick={() => {}}>Link</Link>);

  const link = screen.getByText('Link');
  fireEvent.click(link);

  expect(warnMock).toHaveBeenCalledTimes(1);
  expect(warnMock.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "onClick is deprecated, please use onPress",
      ],
    ]
  `);
});

test('supports "onPress"', () => {
  render(<Link onPress={() => {}}>Link</Link>);

  const link = screen.getByText('Link');
  fireEvent.click(link);

  expect(warnMock).not.toHaveBeenCalled();
});
