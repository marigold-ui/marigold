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
  space: {
    none: 0,
    small: 2,
    large: 16,
  },
  components: {
    Button: {
      base: {
        fontFamily: 'fancy',
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
        <Facebook fill="red" size={30} title="facebook" />
        iconbutton
      </Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/iconbutton/);
  const icon = screen.getByTitle(/facebook/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
  expect(button).toHaveStyle('display: inline-flex');
  expect(icon).toHaveStyle('fill: red');
  expect(icon).toHaveStyle('width: 30px');
});

test('add space to button works as expected', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button data-testid="iconbutton" space="small">
        <Facebook fill="red" size={30} title="facebook" />
        iconbutton
      </Button>
    </ThemeProvider>
  );
  const button = screen.getByTestId('iconbutton');

  const style = window.getComputedStyle(button);
  expect(style.gap).toBe(`0.5ch`);
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
  expect(button).toBeTruthy();
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
    <Button onPress={onPress} href={onPress} data-testid="button">
      Some Button
    </Button>
  );

  const button = screen.getByTestId('button');
  fireEvent.click(button);

  expect(onPress).toHaveBeenCalled();
});
