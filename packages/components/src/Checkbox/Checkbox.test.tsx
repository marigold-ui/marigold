import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { ThemeProvider } from '@marigold/system';

const theme = {
  space: {
    none: 0,
    small: 2,
  },
  colors: {
    disabled: 'gray',
  },
  checkbox: {
    __default: {
      m: 'small',
    },
  },
  label: {
    inline: {
      fontSize: '14px',
    },
    above: {
      fontSize: '8px',
    },
  },
};

test('supports default labelVariant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" label="label" />
    </ThemeProvider>
  );

  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`font-size: 14px`);
});

test('supports other labelVariant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" label="label" labelVariant="above" />
    </ThemeProvider>
  );

  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`font-size: 8px`);
});

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
  render(<Checkbox id="checkbox" title="checkbox" label="Test" />);

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox.getAttribute('type')).toEqual('checkbox');
});

test('renders <input> element', () => {
  render(<Checkbox id="checkbox" title="checkbox" label="Test" />);

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
  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`color: gray`);
});

test('supports error and errorMessage prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox
        id="test"
        title="checkbox"
        label="test"
        error
        errorMessage="error"
      />
    </ThemeProvider>
  );

  const errorMessage = screen.getByText(/error/);
  expect(errorMessage).toBeDefined();
});

test('supports checked checkbox', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox
        id="test"
        title="checkbox"
        label="Test"
        onChange={() => {}}
        checked
      />
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox).toHaveAttribute('checked');
});

test('supports checked and disabled checkbox', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox
        id="test"
        title="checkbox"
        label="Test"
        onChange={() => {}}
        checked
        disabled
      />
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox).toHaveAttribute('checked');
  expect(checkbox).toHaveAttribute('disabled');
});

test('correctly handles interaction', () => {
  const click = jest.fn();
  const change = jest.fn();

  render(
    <ThemeProvider theme={theme}>
      <Checkbox
        id="test"
        title="checkbox"
        label="Test"
        onClick={click}
        onChange={change}
      />
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  fireEvent.click(checkbox);

  expect(click).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalledTimes(1);
});
