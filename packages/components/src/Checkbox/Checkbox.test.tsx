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
      <Checkbox id="test" title="checkbox">
        label
      </Checkbox>
    </ThemeProvider>
  );

  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`font-size: 14px`);
});

test('supports other labelVariant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" labelVariant="above">
        label
      </Checkbox>
    </ThemeProvider>
  );

  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`font-size: 8px`);
});

test('supports label prop', () => {
  render(
    <Checkbox id="test" title="checkbox">
      Test
    </Checkbox>
  );

  const checkboxLabel = screen.getByText(/Test/);
  expect(checkboxLabel).toBeDefined();
});

test('supports required prop and renders required icon', () => {
  render(
    <Checkbox id="test" required title="checkbox">
      Test
    </Checkbox>
  );

  const label = screen.getByText(/Test/);
  expect(label.nextSibling).toContainHTML('path d="M10.8');
});

test('supports default type', () => {
  render(
    <Checkbox id="checkbox" title="checkbox">
      Test
    </Checkbox>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox.getAttribute('type')).toEqual('checkbox');
});

test('renders <input> element', () => {
  render(
    <Checkbox id="checkbox" title="checkbox">
      Test
    </Checkbox>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox instanceof HTMLInputElement).toBeTruthy();
});

test('supports disabled prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" disabled>
        label
      </Checkbox>
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
      <Checkbox id="test" error errorMessage="error">
        test
      </Checkbox>
    </ThemeProvider>
  );

  const errorMessage = screen.getByText(/error/);
  expect(errorMessage).toBeDefined();
});

test('supports checked checkbox', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" onChange={() => {}} checked>
        Test
      </Checkbox>
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  expect(checkbox).toHaveAttribute('checked');
});

test('supports checked and disabled checkbox', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" onChange={() => {}} checked disabled>
        Test
      </Checkbox>
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
      <Checkbox id="test" title="checkbox" onClick={click} onChange={change}>
        Test
      </Checkbox>
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  fireEvent.click(checkbox);

  expect(click).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalledTimes(1);
});
