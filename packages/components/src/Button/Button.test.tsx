import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Button } from './Button';
import { Facebook } from '@marigold/icons';

const theme = {
  fonts: {
    body: 'Arial',
    fancy: 'Inter',
  },
  colors: {
    red: '#ffa8a8',
    gray: '#e3e3e3',
  },
  space: {
    none: 0,
    small: 2,
    large: 16,
  },
  components: {
    Button: {
      base: {
        fontFamily: 'fancy',
        '&[data-focus]': {
          bg: 'red',
        },
        '&:disabled': {
          bg: 'gray',
        },
      },
      size: {
        large: {
          p: '16px',
        },
        small: {
          p: 'large',
        },
      },
      variant: {
        primary: {
          fontFamily: 'fancy',
        },
        secondary: {
          fontFamily: 'body',
        },
      },
    },
  },
};

test('sets some base styles', () => {
  render(<Button>button</Button>);
  const button = screen.getByText(/button/);

  expect(button).toHaveStyle({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5ch',
  });
});

test('supports base style', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button>button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveStyle(`font-family: Inter`);
});

test('supports default size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button size="large">button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveStyle(`padding: 16px`);
});

test('accepts other variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button variant="secondary">button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveStyle(`font-family: Arial`);
});

test('accepts other size than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button size="small">button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveStyle(`padding: 16px`);
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
        <Facebook fill="red" size={30} data-testid="facebook" />
        iconbutton
      </Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/iconbutton/);
  const icon = screen.getByTestId(/facebook/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
  expect(button).toHaveStyle('display: inline-flex');
  expect(icon).toHaveStyle(`fill: ${theme.colors.red}`);
  expect(icon).toHaveStyle('width: 30px');
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
  expect(button).toHaveStyle('backgroundColor: #e3e3e3');
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
  expect(button).toHaveStyle('width: 100%');
});
