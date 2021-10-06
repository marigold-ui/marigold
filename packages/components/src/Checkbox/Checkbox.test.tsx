import React from 'react';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { ThemeProvider } from '@marigold/system';

const theme = {
  checkbox: {
    default: {
      m: '2px',
    },
  },
};

test('supports label prop', () => {
  render(<Checkbox label="Test" id="test" title="checkbox" />);

  const checkboxLabel = screen.getByText(/Test/);
  expect(checkboxLabel).toBeDefined();
});

test('supports required prop and renders required icon', () => {
  render(<Checkbox label="Test" id="test" required title="checkbox" />);

  const label = screen.getByText(/Test/);
  expect(label.nextSibling).toContainHTML('path d="M10.8');
});

test('supports default type', () => {
  render(<Checkbox id="checkbox" title="checkbox" />);

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox.getAttribute('type')).toEqual('checkbox');
});

test('renders <input> element', () => {
  render(<Checkbox id="checkbox" title="checkbox" />);

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox instanceof HTMLInputElement).toBeTruthy();
});

test('supports disabled prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" label="label" disabled />
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox).toHaveAttribute('disabled');
});

test('supports error prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" label="test" error="error" />
    </ThemeProvider>
  );

  const errorMessage = screen.getByText(/error/);
  expect(errorMessage).toBeDefined();
});

test('supports checked checkbox', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" onChange={() => {}} checked />
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox).toBeDefined();
});

test('supports checked and disabled checkbox', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox
        id="test"
        title="checkbox"
        onChange={() => {}}
        checked
        disabled
      />
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox).toBeDefined();
  expect(checkbox).toHaveAttribute('disabled');
});
