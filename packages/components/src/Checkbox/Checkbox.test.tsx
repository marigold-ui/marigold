import React from 'react';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { ThemeProvider } from '@marigold/system';

const theme = {
  checkbox: {
    default: {
      m: '2px',
    },
    squareChecked: {
      __default: {
        p: '0px',
      },
      disabled: {
        p: '2px',
      },
    },
    squareUnchecked: {
      __default: {
        p: '4px',
      },
      disabled: {
        p: '8px',
      },
      error: {
        p: '12px',
      },
    },
  },
};

test('supports label prop', () => {
  render(<Checkbox label="Test" id="test" title="checkbox" />);
  const checkbox = screen.getByText(/Test/);

  expect(checkbox).toBeDefined();
});

test('supports required prop and renders required icon', () => {
  render(<Checkbox label="Test" id="test" required title="checkbox" />);
  const label = screen.getByText(/Test/);

  expect(label.nextSibling).toContainHTML('path d="M10.8');
});

test('supports default type', () => {
  render(<Checkbox id="test" title="checkbox" />);
  const checkbox = screen.getByTitle(/checkbox/);

  expect(checkbox.getAttribute('type')).toEqual('checkbox');
});

test('renders <input> element', () => {
  render(<Checkbox id="test" title="checkbox" />);
  const checkbox = screen.getByTitle(/checkbox/);

  expect(checkbox instanceof HTMLInputElement).toBeTruthy();
});

test('supports disabled prop with unchecked checkbox', () => {
  const { rerender } = render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" />
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  const svgElement = checkbox.nextSibling;
  expect(svgElement?.firstChild).toHaveStyle(`padding: 4px`);

  rerender(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" disabled />
    </ThemeProvider>
  );
  expect(svgElement?.firstChild).toHaveStyle(`padding: 8px`);
});

test('supports disabled prop with checked checkbox', () => {
  const { rerender } = render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" checked />
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  const svgElement = checkbox.nextSibling;
  expect(svgElement?.firstChild).toHaveStyle(`padding: 0px`);

  rerender(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" checked disabled />
    </ThemeProvider>
  );
  expect(svgElement?.firstChild).toHaveStyle(`padding: 2px`);
});

test('supports error prop with unchecked checkbox', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox id="test" title="checkbox" label="test" error="error" />
    </ThemeProvider>
  );

  const checkbox = screen.getByTitle(/checkbox/);
  const svgElement = checkbox.nextSibling;
  expect(svgElement?.firstChild).toHaveStyle(`padding: 12px`);

  const errorMessage = screen.getByText(/error/);
  expect(errorMessage).toBeDefined();
});
