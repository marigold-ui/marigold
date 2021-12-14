import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Button } from './Button';
import { Facebook } from '@marigold/icons';

const theme = {
  button: {
    large: {
      p: '16px',
    },
    small: {
      p: '16px',
    },
    primary: {
      fontFamily: 'Inter',
    },
    secondary: {
      fontFamily: 'Arial',
    },
  },
  space: {
    none: 0,
    small: 2,
  },
};

test('supports default variant', () => {
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
      <Button>button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveStyle(`padding: 16px`);
});

test('accepts other variant than default', () => {
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
  expect(button.firstChild instanceof SVGElement).toBeTruthy();
  expect(icon.getAttribute('fill')).toEqual('red');
  expect(icon.getAttribute('width')).toEqual('30');
});

test('add space to button works as expected', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button title="iconbutton" space="small">
        <Facebook fill="red" size={30} title="facebook" />
        iconbutton
      </Button>
    </ThemeProvider>
  );
  const button = screen.getByTitle(/iconbutton/);

  const style = window.getComputedStyle(button);
  expect(style.columnGap).toBe(`2px`);
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button className="custom-class-name" title="button">
        click
      </Button>
    </ThemeProvider>
  );
  const button = screen.getByTitle(/button/);

  expect(button.className).toMatch('custom-class-name');
});
