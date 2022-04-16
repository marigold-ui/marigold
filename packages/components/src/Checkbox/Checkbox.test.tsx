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
