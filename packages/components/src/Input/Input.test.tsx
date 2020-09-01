import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Input } from '@marigold/components';

const theme = {
  form: {
    input: {
      fontFamily: 'Inter',
    },
    input2: {
      fontFamily: 'Roboto',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Input title="input" />
    </MarigoldProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).toHaveStyle(`font-family: Inter`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Input title="input" variant="input2" />
    </MarigoldProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).toHaveStyle(`font-family: Roboto`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Input title="input" />
    </MarigoldProvider>
  );
  const input = screen.getByTitle('input');

  expect(input instanceof HTMLInputElement).toBeTruthy();
});

test('supports custom prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Input title="input" placeholder="placeholder" />
    </MarigoldProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).toHaveAttribute('placeholder');
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Input title="input" css={{ fontFamily: 'Oswald Regular' }} />
    </MarigoldProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).not.toHaveStyle(`font-family: Oswald Regular`);
  expect(input).toHaveStyle(`font-family: Inter`);
});
