import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { NumberField } from './NumberField';
import userEvent from '@testing-library/user-event';

const theme = {
  colors: {
    black: '#111',
    gray: '#868e96',
    blue: '#00f',
    lime: '#82c91e',
    red: '#c92a2a',
  },
  fontSizes: {
    'small-1': 12,
    'large-1': 24,
  },
  components: {
    Label: {
      variant: {
        lime: {
          color: 'lime',
        },
      },
      size: {
        small: {
          fontSize: 'small-1',
        },
      },
    },
    HelpText: {
      variant: {
        lime: {
          container: {
            color: 'lime',
          },
        },
      },
      size: {
        small: {
          container: {
            fontSize: 'small-1',
          },
        },
      },
    },
    Input: {
      base: {
        borderColor: 'blue',
      },
      variant: {
        lime: {
          color: 'lime',
        },
      },
      size: {
        small: {
          fontSize: 'small-1',
        },
      },
    },
    NumberField: {
      base: {
        group: {
          borderColor: 'blue',

          '&:hover': {
            borderColor: 'lime',
          },

          '&:focus': {
            outline: '1px solid',
            outlineColor: 'blue',
          },

          '&:disabled': {
            bg: 'gray',
          },

          '&:error': {
            borderColor: 'red',
          },
        },
        stepper: {
          color: 'black',
          border: '1px solid transparent',

          '&:hover': {
            color: 'lime',
          },

          '&:disabled': {
            color: 'gray',
          },

          '&:hover-group': {
            borderColor: 'lime',
          },

          '&:focus-group': {
            borderColor: 'blue',
          },

          '&:error-group': {
            borderColor: 'red',
          },
        },
      },
    },
  },
};

test('renders an input', () => {
  render(<NumberField label="Label" data-testid="number-field" />);

  const numberField = screen.getByTestId('number-field');
  expect(numberField).toBeInTheDocument();
  expect(numberField).toHaveAttribute('type', 'text');
  expect(numberField).toBeInstanceOf(HTMLInputElement);
});

test('input can be styled via "Input" styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <NumberField label="A Label" data-testid="number-field" />
    </ThemeProvider>
  );
  const numberField = screen.getByTestId('number-field');
  expect(numberField).toHaveStyle(`border-color: ${theme.colors.blue}`);
});

test('passes down variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <NumberField
        data-testid="number-field"
        label="Label"
        description="Description"
        variant="lime"
        size="small"
      />
    </ThemeProvider>
  );

  const numberField = screen.getByTestId('number-field');
  expect(numberField).toHaveStyle(`color: ${theme.colors.lime}`);
  expect(numberField).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);

  const label = screen.getByText('Label');
  expect(label).toHaveStyle(`color: ${theme.colors.lime}`);
  expect(label).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);

  const description = screen.getByText('Description');
  expect(description).toHaveStyle(`color: ${theme.colors.lime}`);
  expect(description).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);
});
