/* eslint-disable testing-library/no-node-access */
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
    error: 'red',
  },
  checkbox: {
    __default: {
      fill: 'white',
    },
    custom: {
      fill: 'blue',
    },
    ':checked': {
      fill: 'orange',
    },
    ':disabled': {
      fill: 'disabled',
    },
    ':error': {
      fill: 'error',
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

test('supports default variant', () => {
  const { rerender } = render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="label">
        label
      </Checkbox>
    </ThemeProvider>
  );
  // eslint-disable-next-line testing-library/no-node-access
  const label = screen.getByLabelText(/label/).closest('label')!;
  // eslint-disable-next-line testing-library/no-node-access
  const rect = label.querySelector('rect');
  expect(rect).toHaveStyle(`fill: white`);

  rerender(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" checked>
        label
      </Checkbox>
    </ThemeProvider>
  );
  expect(rect).toHaveStyle(`fill: orange`);

  rerender(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" disabled>
        label
      </Checkbox>
    </ThemeProvider>
  );
  expect(rect).toHaveStyle(`fill: gray`);

  rerender(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" error>
        label
      </Checkbox>
    </ThemeProvider>
  );
  expect(rect).toHaveStyle(`fill: red`);
});

test('supports other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" variant="custom">
        label
      </Checkbox>
    </ThemeProvider>
  );
  const label = screen.getByLabelText(/label/).closest('label')!;
  const rect = label.querySelector('rect');
  expect(rect).toHaveStyle(`fill: blue`);
});

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
});

test('renders correct svg checkbox icon', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" checked>
        label
      </Checkbox>
    </ThemeProvider>
  );
  const svg = screen.getByText(/label/).firstChild!;
  expect(svg.lastChild).toContainHTML('d="M13.9571');
});

test('supports indeterminated prop and renders correct svg checkbox icon', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" checked indeterminated>
        label
      </Checkbox>
    </ThemeProvider>
  );
  const svg = screen.getByText(/label/).firstChild!;
  expect(svg.lastChild).toContainHTML('d="M13.5');
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
