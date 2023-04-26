import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { Button } from './Button';
import { Facebook } from '@marigold/icons';
import { tv } from 'tailwind-variants';

const theme: Theme = {
  name: 'test',
  components: {
    Button: tv({
      base: ['font-[fancy]', 'focus:bg-red-600 disabled:bg-gray-600'],
      variants: {
        variant: {
          primary: ['font-[fancy]'],
          secondary: ['font-body'],
        },
        size: {
          large: ['p-[16px]'],
          small: ['p-[8-px]'],
        },
      },
    }),
  },
};

test('sets some base styles', () => {
  render(<Button>button</Button>);
  const button = screen.getByText(/button/);

  expect(button).toHaveClass(
    'inline-flex items-center justify-center gap-[0.5ch]'
  );
});

test('supports base styling classes', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button>button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toMatchInlineSnapshot(`
    <button
      class="inline-flex items-center justify-center gap-[0.5ch] cursor-pointer disabled:cursor-not-allowed focus:outline-0 font-[fancy] focus:bg-red-600 disabled:bg-gray-600"
      type="button"
    >
      button
    </button>
  `);
});

test('supports default size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button size="small">button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveClass(`p-[8-px]`);
});

test('accepts other variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button variant="secondary">button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveClass('font-body');
  expect(button).toMatchInlineSnapshot(`
    <button
      class="inline-flex items-center justify-center gap-[0.5ch] cursor-pointer disabled:cursor-not-allowed focus:outline-0 focus:bg-red-600 disabled:bg-gray-600 font-body"
      type="button"
    >
      button
    </button>
  `);
});

test('renders <button> element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button>button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
});

test('accepts other button components', () => {
  const CustomButton = React.forwardRef<
    HTMLSpanElement,
    { children?: React.ReactNode }
  >(() => <span>I am a Button!</span>);

  render(
    <ThemeProvider theme={theme}>
      <Button as={CustomButton}>Button</Button>
    </ThemeProvider>
  );

  const button = screen.getByText('I am a Button!');
  expect(button).toBeTruthy();
});

test('add icon in button works as expected', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button>
        <Facebook size={30} data-testid="facebook" />
        iconbutton
      </Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/iconbutton/);
  const icon = screen.getByTestId(/facebook/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
  expect(button).toHaveClass('inline-flex');
  expect(icon).toHaveAttribute('width', '30px');
});

test('can be used as a "link button"', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button as="a" href="https://karriere.reservix.net" data-testid="button">
        I am a Link!
      </Button>
    </ThemeProvider>
  );
  const button = screen.getByTestId('button');
  expect(button).toBeInstanceOf(HTMLAnchorElement);
});

test('can be used as a "link button" and has button styling', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button
        as="a"
        href="https://karriere.reservix.net"
        variant="primary"
        data-testid="button"
      >
        I am a Link!
      </Button>
    </ThemeProvider>
  );
  const button = screen.getByTestId('button');
  expect(button).toBeTruthy();
});

test('supports onPress', () => {
  const onPress = jest.fn();
  render(
    <Button onPress={onPress} data-testid="button">
      Some Button
    </Button>
  );

  const button = screen.getByTestId('button');
  fireEvent.click(button);

  expect(onPress).toHaveBeenCalled();
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(<Button ref={ref}>button</Button>);

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

test('supports disabled prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button disabled>button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);
  expect(button).toHaveAttribute('disabled');
  expect(button).toHaveClass('disabled:bg-gray-600');
});

test('pass through native props', () => {
  const spy = jest.fn();
  render(<Button onMouseEnter={spy}>button</Button>);

  const button = screen.getByText(/button/);
  fireEvent.mouseEnter(button);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('allows to take full width', () => {
  render(<Button fullWidth>button</Button>);

  const button = screen.getByText(/button/);
  expect(button).toHaveClass('w-full');
});
