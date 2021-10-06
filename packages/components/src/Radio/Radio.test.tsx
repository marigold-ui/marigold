import React from 'react';
import { render, screen } from '@testing-library/react';
import { Radio } from './Radio';
import { ThemeProvider } from '@marigold/system';

const theme = {
  radio: {
    default: {
      m: '2px',
    },
  },
  label: {
    inline: {
      p: '4px',
    },
    disabled: {
      p: '8px',
    },
  },
};

test('supports label prop', () => {
  render(<Radio label="Test" id="test" title="radio" />);
  const radioLabel = screen.getByText(/Test/);

  expect(radioLabel).toBeDefined();
});

test('supports required prop and renders required icon', () => {
  render(<Radio label="Test" id="test" required title="radio" />);
  const label = screen.getByText(/Test/);
  expect(label.nextSibling).toContainHTML('path d="M10.8');
});

test('supports default type', () => {
  render(<Radio id="radio" title="radio" />);
  const radio = screen.getByTitle(/radio/);

  expect(radio.getAttribute('type')).toEqual('radio');
});

test('renders <input> element', () => {
  render(<Radio id="radio" title="radio" />);
  const radio = screen.getByTitle(/radio/);

  expect(radio instanceof HTMLInputElement).toBeTruthy();
});

test('supports disabled prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" label="label" disabled />
    </ThemeProvider>
  );

  const radio = screen.getByTitle(/radio/);
  expect(radio).toHaveAttribute('disabled');
});

test('supports error prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" label="test" error="error" />
    </ThemeProvider>
  );
  const errorMessage = screen.getByText(/error/);
  expect(errorMessage).toBeDefined();
});

test('supports checked radio', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" onChange={() => {}} checked />
    </ThemeProvider>
  );

  const radio = screen.getByTitle(/radio/);
  expect(radio).toBeDefined();
});

test('supports checked and disabled radio', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" onChange={() => {}} checked disabled />
    </ThemeProvider>
  );

  const radio = screen.getByTitle(/radio/);
  expect(radio).toBeDefined();
  expect(radio).toHaveAttribute('disabled');
});
