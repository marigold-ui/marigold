import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Radio } from './Radio';
import { ThemeProvider } from '@marigold/system';

const theme = {
  space: {
    none: 0,
    small: 2,
  },
  colors: {
    disabled: 'gray',
  },
  radio: {
    __default: {
      m: 'small',
    },
  },
  label: {
    above: {
      fontSize: '8px',
    },
    inline: {
      fontSize: '14px',
    },
  },
};

test('supports default labelVariant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="checkbox">
        label
      </Radio>
    </ThemeProvider>
  );

  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`font-size: 14px`);
});

test('supports other labelVariant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="checkbox" labelVariant="above">
        label
      </Radio>
    </ThemeProvider>
  );

  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`font-size: 8px`);
});

test('supports label prop', () => {
  render(
    <Radio id="test" title="radio">
      Test
    </Radio>
  );

  const radioLabel = screen.getByText(/Test/);
  expect(radioLabel).toBeDefined();
});

test('supports required prop and renders required icon', () => {
  render(
    <Radio id="test" required title="radio">
      Test
    </Radio>
  );

  const label = screen.getByText(/Test/);
  // eslint-disable-next-line testing-library/no-node-access
  expect(label.nextSibling).toContainHTML('path d="M10.8');
});

test('supports default type', () => {
  render(
    <Radio id="radio" title="radio">
      test
    </Radio>
  );

  const radio = screen.getByTitle(/radio/);
  expect(radio.getAttribute('type')).toEqual('radio');
});

test('renders <input> element', () => {
  render(
    <Radio id="radio" title="radio">
      test
    </Radio>
  );

  const radio = screen.getByTitle(/radio/);
  expect(radio instanceof HTMLInputElement).toBeTruthy();
});

test('supports disabled prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" disabled>
        label
      </Radio>
    </ThemeProvider>
  );

  const radio = screen.getByTitle(/radio/);
  expect(radio).toHaveAttribute('disabled');
  const label = screen.getByText(/label/);
  expect(label).toHaveStyle(`color: gray`);
});

test('supports error and errorMessage prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" error errorMessage="error">
        test
      </Radio>
    </ThemeProvider>
  );

  const errorMessage = screen.getByText(/error/);
  expect(errorMessage).toBeDefined();
});

test('supports checked radio', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" onChange={() => {}} checked>
        test
      </Radio>{' '}
    </ThemeProvider>
  );

  const radio = screen.getByTitle(/radio/);
  expect(radio).toHaveAttribute('checked');
});

test('supports checked and disabled radio', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" onChange={() => {}} checked disabled>
        test
      </Radio>
    </ThemeProvider>
  );

  const radio = screen.getByTitle(/radio/);
  expect(radio).toHaveAttribute('checked');
  expect(radio).toHaveAttribute('disabled');
});

test('correctly handles interaction', () => {
  const click = jest.fn();
  const change = jest.fn();

  render(
    <ThemeProvider theme={theme}>
      <Radio id="test" title="radio" onClick={click} onChange={change}>
        Test
      </Radio>
    </ThemeProvider>
  );

  const radio = screen.getByTitle(/radio/);
  fireEvent.click(radio);

  expect(click).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalledTimes(1);
});
