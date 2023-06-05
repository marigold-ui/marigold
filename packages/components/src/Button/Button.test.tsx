import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { Button } from './Button';
import { Facebook } from '@marigold/icons';
import { cva } from 'class-variance-authority';

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva('align-center flex disabled:bg-gray-600', {
      variants: {
        variant: {
          primary: 'text-primary-500',
          secondary: 'text-secondary-800',
        },
        size: {
          small: 'h-10 w-10',
          large: 'w-50 h-50',
        },
      },
    }),
  },
};

test('sets some base styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button>button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveClass('flex align-center');
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
      class="align-center flex disabled:bg-gray-600"
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

  expect(button).toHaveClass(`w-10 h-10`);
});

test('accepts other variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button variant="secondary">button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveClass('text-secondary-800');
  expect(button).toMatchInlineSnapshot(`
    <button
      class="align-center flex disabled:bg-gray-600 text-secondary-800"
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
  expect(button).toHaveClass('flex align-center');
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
    <ThemeProvider theme={theme}>
      <Button onPress={onPress} data-testid="button">
        Some Button
      </Button>
    </ThemeProvider>
  );

  const button = screen.getByTestId('button');
  fireEvent.click(button);

  expect(onPress).toHaveBeenCalled();
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <ThemeProvider theme={theme}>
      <Button ref={ref}>button</Button>
    </ThemeProvider>
  );

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
  render(
    <ThemeProvider theme={theme}>
      <Button onMouseEnter={spy}>button</Button>
    </ThemeProvider>
  );

  const button = screen.getByText(/button/);
  fireEvent.mouseEnter(button);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('allows to take full width', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button fullWidth>button</Button>
    </ThemeProvider>
  );

  const button = screen.getByText(/button/);
  expect(button).toHaveClass('w-full');
});
