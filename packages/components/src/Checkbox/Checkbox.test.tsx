import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { Checkbox } from './Checkbox';

const theme = {
  colors: {
    gray: '#868e96',
    blue: '#a5d8ff',
    teal: '#099268',
    green: '#2b8a3e',
    red: '#c92a2a',
  },
  fontSizes: {
    'small-1': 12,
    'large-1': 24,
  },
  radii: {
    none: 0,
    'small-1': 2,
  },
  components: {
    Checkbox: {
      base: {
        label: {
          fontSize: 'small-1',
        },
        checkbox: {
          borderRadius: 'small-1',
          '&:focus': {
            outline: '1px solid',
            outlineColor: 'blue',
          },
          '&:checked': {
            color: 'teal',
          },
          '&:disabled': {
            bg: 'gray',
          },
          '&:read-only': {
            opacity: 0.5,
          },
          '&:error': {
            bg: 'red',
          },
        },
      },
      variant: {
        green: {
          label: {
            color: 'green',
          },
          checkbox: {
            '&:checked': {
              color: 'green',
            },
          },
        },
      },
      sies: {
        large: {
          label: {
            fontSize: 'large-1',
          },
          checkbox: {
            width: 32,
            height: 32,
          },
        },
      },
    },
  },
};

// There is no real accesible way to get to the element that acts as checkbox
const getVisibleCheckbox = () => {
  const label = screen.getByText('With Label');
  // eslint-disable-next-line testing-library/no-node-access
  return label.parentElement?.querySelector('[aria-hidden="true"]');
};

// Tests
// ---------------
test('renders label and (hidden) checkbox', () => {
  render(<Checkbox data-testid="checkbox">With Label</Checkbox>);

  const label = screen.getByText('With Label');
  expect(label).toBeInTheDocument();

  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeInstanceOf(HTMLInputElement);
  expect(checkbox).toHaveAttribute('type', 'checkbox');
});

test('allows styling via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox">With Label</Checkbox>
    </ThemeProvider>
  );

  const label = screen.getByText('With Label');
  expect(label).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);

  expect(getVisibleCheckbox()).toHaveStyle(
    `border-radius: ${theme.radii['small-1']}px`
  );
});

test('allows styling "checked" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" checked>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveStyle(`border-radius: ${theme.radii['small-1']}px`);
  expect(checkbox).toHaveStyle(`color: ${theme.colors.teal}`);
});

test('allows styling "focus" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox">With Label</Checkbox>
    </ThemeProvider>
  );
  const input = screen.getByTestId('checkbox');
  input.focus();

  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveStyle(`outline: 1px solid`);
  expect(checkbox).toHaveStyle(`outline-color: ${theme.colors.blue}`);
});

test('allows styling "disabled" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" disabled>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveStyle(`background: ${theme.colors.gray}`);
});

test('allows styling "read-only" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" readOnly>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveStyle(`opacity: 0.5`);
});

test('allows styling "error" state via theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" error>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveStyle(`background: ${theme.colors.red}`);
});

test('support default checked', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" defaultChecked>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  const input = screen.getByTestId('checkbox');
  expect(input).toHaveAttribute('aria-checked', 'true');

  // Visible checkbox looks checked
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveStyle(`border-radius: ${theme.radii['small-1']}px`);
  expect(checkbox).toHaveStyle(`color: ${theme.colors.teal}`);
});

test('supports indeterminate state', () => {
  render(
    <ThemeProvider theme={theme}>
      <Checkbox data-testid="checkbox" indeterminate checked>
        With Label
      </Checkbox>
    </ThemeProvider>
  );
  const input: HTMLInputElement = screen.getByTestId('checkbox');
  expect(input.indeterminate).toBeTruthy();

  // Visible checkbox looks checked
  const checkbox = getVisibleCheckbox();
  expect(checkbox).toHaveStyle(`border-radius: ${theme.radii['small-1']}px`);
  expect(checkbox).toHaveStyle(`color: ${theme.colors.teal}`);
});

test('controlled', () => {
  const onChange = jest.fn();
  render(
    <Checkbox data-testid="checkbox" onChange={onChange}>
      With Label
    </Checkbox>
  );
  const input: HTMLInputElement = screen.getByTestId('checkbox');

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(true);

  fireEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(false);
});
