import React from 'react';
import { render, screen, within } from '@testing-library/react';
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

// Tests
// ---------------
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

test('group and stepper can styled via "NumberField" styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <NumberField label="A Label" data-testid="number-field" />
    </ThemeProvider>
  );

  const group = screen.getByRole('group');
  expect(group).toHaveStyle(`border-color: ${theme.colors.blue}`);

  const steppers = within(group).getAllByRole('button');
  expect(steppers[0]).toHaveStyle(`color: ${theme.colors.black}`);
  expect(steppers[1]).toHaveStyle(`color: ${theme.colors.black}`);
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

test('supports disabled', () => {
  render(<NumberField label="A Label" disabled data-testid="number-field" />);

  const numberField = screen.getByTestId('number-field');
  expect(numberField).toBeDisabled();

  const group = screen.getByRole('group');
  const steppers = within(group).getAllByRole('button');
  expect(steppers[0]).toHaveAttribute('aria-disabled', 'true');
  expect(steppers[1]).toHaveAttribute('aria-disabled', 'true');
});

test('supports required', () => {
  render(<NumberField label="A Label" required data-testid="number-field" />);

  const numberField = screen.getByTestId('number-field');
  expect(numberField).toHaveAttribute('aria-required', 'true');
});

test('supports readonly', () => {
  render(<NumberField label="A Label" readOnly data-testid="number-field" />);

  const numberField = screen.getByTestId('number-field');
  expect(numberField).toHaveAttribute('readonly');
});

test('supports field structure', () => {
  render(
    <NumberField
      label="A Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    />
  );

  const label = screen.queryByText('A Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('Some helpful text');
  expect(description).toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).not.toBeInTheDocument();
});

test('supports field structure (with error)', () => {
  render(
    <NumberField
      label="A Label"
      description="Some helpful text"
      error={true}
      errorMessage="Whoopsie"
    />
  );

  const label = screen.queryByText('A Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('Some helpful text');
  expect(description).not.toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).toBeInTheDocument();
});

test('can have default value', () => {
  render(
    <NumberField data-testid="number-field" label="A Label" defaultValue={50} />
  );

  const input = screen.getByTestId('number-field');
  expect(input).toHaveValue('50');
});

test('can be controlled', () => {
  const Controlled = () => {
    const [value, setValue] = React.useState(0);

    return (
      <>
        <NumberField
          data-testid="number-field"
          label="A Label"
          value={value}
          onChange={setValue}
        />
        <span data-testid="output">{value}</span>
      </>
    );
  };

  render(<Controlled />);

  const input = screen.getByTestId('number-field');
  userEvent.click(input);
  userEvent.type(input, '42');
  userEvent.tab();

  expect(screen.getByTestId('output')).toHaveTextContent('42');
});

// Use stepper
// hide stepper
// stepper increment value
// formating
