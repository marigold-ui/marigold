import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Button } from './Button';

const theme = {
  button: {
    primary: {
      large: {
        fontFamily: 'Inter',
      },
    },
    secondary: {
      large: {
        fontFamily: 'Arial',
      },
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Button>button</Button>
    </MarigoldProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveStyle(`font-family: Inter`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Button variant="secondary.large">button</Button>
    </MarigoldProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveStyle(`font-family: Arial`);
});

test('renders <button> element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Button>button</Button>
    </MarigoldProvider>
  );
  const button = screen.getByText(/button/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Button css={{ fontFamily: 'Arial' }}>button</Button>
    </MarigoldProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).not.toHaveStyle('font-family: Arial');
});
