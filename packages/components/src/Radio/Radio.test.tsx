import React from 'react';
import { render, screen } from '@testing-library/react';
import { Radio } from './Radio';
import { ThemeProvider } from '@marigold/system';

const theme = {
  radio: {
    default: {
      m: '2px',
    },
    circleChecked: {
      __default: {
        p: '0px',
      },
      disabled: {
        p: '2px',
      },
    },
    circleUnchecked: {
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
  const radio = screen.getByText(/Test/);

  expect(radio).toBeDefined();
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

test('supports disabled prop with unchecked radio', () => {
  const { rerender } = render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" label="label" />
    </ThemeProvider>
  );

  const radio = screen.getByTitle(/radio/);
  const label = screen.getByText(/label/);
  const svgElement = radio.nextSibling;
  expect(svgElement?.firstChild).toHaveStyle(`padding: 4px`);
  expect(label).toHaveStyle(`padding: 4px`);

  rerender(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" label="label" disabled />
    </ThemeProvider>
  );
  expect(svgElement?.firstChild).toHaveStyle(`padding: 8px`);
  expect(label).toHaveStyle(`padding: 8px`);
});

test('supports disabled prop with checked radio', () => {
  const { rerender } = render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" onChange={() => {}} checked />
    </ThemeProvider>
  );

  const radio = screen.getByTitle(/radio/);
  const svgElement = radio.nextSibling;
  expect(svgElement?.firstChild).toHaveStyle(`padding: 0px`);

  rerender(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" onChange={() => {}} checked disabled />
    </ThemeProvider>
  );
  expect(svgElement?.firstChild).toHaveStyle(`padding: 2px`);
});

test('supports error prop with unchecked radio', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" label="test" error="error" />
    </ThemeProvider>
  );

  const radio = screen.getByTitle(/radio/);
  const svgElement = radio.nextSibling;
  expect(svgElement?.firstChild).toHaveStyle(`padding: 12px`);

  const errorMessage = screen.getByText(/error/);
  expect(errorMessage).toBeDefined();
});
