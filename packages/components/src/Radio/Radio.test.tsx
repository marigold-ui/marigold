import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Radio } from '@marigold/components';

const theme = {
  form: {
    radio: {
      color: '#4b4b4b',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Radio title="radio" />
    </MarigoldProvider>
  );
  const radio = screen.getByTitle(/radio/);

  expect(radio).toHaveStyle(`color: (75, 75, 75)`);
});

test('supports default type', () => {
  render(<Radio title="radio" />);
  const radio = screen.getByTitle(/radio/);

  expect(radio.getAttribute('type')).toEqual('radio');
});

test('supports checked prop', () => {
  render(<Radio title="radio" checked />);
  const radio = screen.getByTitle(/radio/);

  expect(radio.getAttribute('checked')).toBeDefined();
});

test('supports HTMl radio default props', () => {
  render(<Radio title="radio" id="RadioTest" disabled />);
  const radio = screen.getByTitle(/radio/);

  expect(radio.getAttribute('id')).toEqual('RadioTest');
  expect(radio.getAttribute('disabled')).toBeDefined();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Radio title="radio" css={{ background: 'blue' }} />
    </MarigoldProvider>
  );
  const radio = screen.getByTitle(/radio/);

  expect(radio).not.toHaveStyle('background-color: blue');
});

test('renders <input> element', () => {
  render(<Radio title="radio" />);
  const radio = screen.getByTitle(/radio/);

  expect(radio instanceof HTMLInputElement).toBeTruthy();
});
