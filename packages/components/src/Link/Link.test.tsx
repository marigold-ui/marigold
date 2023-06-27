import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Link } from './Link';
import { setup } from '../test.utils';

const theme: Theme = {
  name: 'test',
  components: {
    Link: cva('font-link text-blue-700 disabled:text-gray-500', {
      variants: {
        variant: {
          second: 'font-body text-green-700',
        },
      },
    }),
  },
};

const { render } = setup({ theme });

let warnMock: jest.SpyInstance;

beforeEach(() => {
  warnMock = jest.spyOn(console, 'warn').mockImplementation();
});

afterEach(() => {
  warnMock.mockRestore();
});

test('uses base classnames', () => {
  render(<Link href="#!">Link</Link>);
  const link = screen.getByText(/Link/);

  expect(link).toHaveClass('font-link text-blue-700 disabled:text-gray-500');
});

test('allows to change variants via `variant` prop (with "text" prefix)', () => {
  render(
    <Link href="#!" variant="second">
      Link
    </Link>
  );
  const link = screen.getByText(/Link/);

  expect(link).toHaveClass(`font-body`);
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
    <Link as={RouterLink} to="/Home">
      Link
    </Link>
  );

  const link = screen.getByText('I am a Router Link!');
  expect(link).toBeTruthy();
});

test('a link can be disabled via aria attributes', () => {
  render(
    <Link href="#!" disabled={true}>
      Link
    </Link>
  );
  const link = screen.getByText(/Link/);
  expect(link.getAttribute('aria-disabled')).toEqual('true');
});

test('link supports disabled variant', () => {
  render(
    <Link href="#!" disabled={true}>
      Link
    </Link>
  );

  const link = screen.getByText(/Link/);
  expect(link).toHaveClass(`disabled:text-gray-500`);
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
