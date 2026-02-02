import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { MockInstance, vi } from 'vitest';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Link } from './Link';

const user = userEvent.setup();

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

let warnMock: MockInstance;

beforeEach(() => {
  warnMock = vi.spyOn(console, 'warn').mockImplementation(() => null);
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

test('renders anchor element', () => {
  const ref = createRef<HTMLAnchorElement>();
  render(
    <Link href="/" ref={ref}>
      Link
    </Link>
  );

  expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
});

test('renders span element when no href', () => {
  const ref = createRef<HTMLAnchorElement>();
  render(<Link ref={ref}>Link</Link>);

  expect(ref.current).toBeInstanceOf(HTMLSpanElement);
});

test('supports "onPress"', async () => {
  render(<Link onPress={() => {}}>Link</Link>);

  const link = screen.getByText('Link');
  await user.click(link);

  expect(warnMock).not.toHaveBeenCalled();
});
