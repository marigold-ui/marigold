import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { RadioButton } from '@marigold/components';

const theme = {
  form: {
    radio: {
      bg: '#eee',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <RadioButton title="radioButton" />
    </MarigoldProvider>
  );
  const radioButton = screen.getByTitle(/radioButton/);

  expect(radioButton).toHaveStyle(`background-color: #eee`);
});

test('supports default type', () => {
  render(<RadioButton title="radioButton" />);
  const radioButton = screen.getByTitle(/radioButton/);

  expect(radioButton.getAttribute('type')).toEqual('radio');
});

test('supports HTMl radio default props', () => {
  render(<RadioButton title="radioButton" id="RadioTest" disabled />);
  const radioButton = screen.getByTitle(/radioButton/);

  expect(radioButton.getAttribute('id')).toEqual('RadioTest');
  expect(radioButton.getAttribute('disabled')).toBeDefined();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <RadioButton title="radioButton" css={{ background: 'blue' }} />
    </MarigoldProvider>
  );
  const radioButton = screen.getByTitle(/radioButton/);

  expect(radioButton).not.toHaveStyle('background-color: blue');
});

test('renders <input> element', () => {
  render(<RadioButton title="radioButton" />);
  const radioButton = screen.getByTitle(/radioButton/);

  expect(radioButton instanceof HTMLInputElement).toBeTruthy();
});
