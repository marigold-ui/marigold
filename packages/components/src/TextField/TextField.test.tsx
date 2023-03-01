/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';

import { TextField } from './TextField';
import userEvent from '@testing-library/user-event';

const theme = {
  colors: {
    blue: '#00f',
    lime: '#82c91e',
  },
  fontSizes: {
    'small-1': 12,
  },
  sizes: {
    none: 0,
    large: 140,
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
    },
  },
};

const user = userEvent.setup();

test('renders an text input', () => {
  render(<TextField label="Label" data-testid="text-field" />);

  const textField = screen.getByTestId('text-field');
  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'text');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('allows to change the input type', () => {
  render(<TextField label="Label" type="email" data-testid="text-field" />);

  const textField = screen.getByTestId('text-field');
  expect(textField).toHaveAttribute('type', 'email');
});

test('input can be styled via "Input" styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <TextField label="A Label" data-testid="text-field" />
    </ThemeProvider>
  );
  const textField = screen.getByTestId('text-field');
  expect(textField.parentElement).toHaveStyle(
    `border-color: ${theme.colors.blue}`
  );
});

test('takes full width by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <TextField label="Label" />
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container).toHaveStyle('width: 100%');
});

test('allows to set custom width', () => {
  render(
    <ThemeProvider theme={theme}>
      <TextField label="Label" width="large" />
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container).toHaveStyle(`width: ${theme.sizes.large}px`);
});

test('supports disabled', () => {
  render(<TextField label="A Label" disabled data-testid="text-field" />);

  const textField = screen.getByTestId('text-field');
  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(<TextField label="A Label" required data-testid="text-field" />);

  const textField = screen.getByTestId('text-field');
  /** Note that the required attribute is not passed down! */
  expect(textField).toHaveAttribute('aria-required', 'true');
});

test('supports readonly', () => {
  render(<TextField label="A Label" readOnly data-testid="text-field" />);

  const textField = screen.getByTestId('text-field');
  expect(textField).toHaveAttribute('readonly');
});

test('supports field structure', () => {
  render(
    <TextField
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
    <TextField
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

test('correctly sets up aria attributes', () => {
  render(
    <TextField
      data-testid="text-field"
      label="A Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    />
  );

  const label = screen.getByText('A Label');
  const input = screen.getByTestId('text-field');
  const description = screen.getByText('Some helpful text');

  const htmlFor = label.getAttribute('for');
  const labelId = label.getAttribute('id');
  const inputId = input.getAttribute('id');

  expect(label).toHaveAttribute('for', inputId);
  expect(htmlFor).toEqual(inputId);
  expect(input).toHaveAttribute('aria-labelledby', labelId);

  expect(input).toHaveAttribute(
    'aria-describedby',
    description.getAttribute('id')
  );

  expect(input).not.toHaveAttribute('aria-invalid');
  expect(input).not.toHaveAttribute('aria-errormessage');
});

test('correctly sets up aria attributes (with error)', () => {
  render(
    <TextField
      data-testid="text-field"
      label="A Label"
      description="Some helpful text"
      error={true}
      errorMessage="Whoopsie"
    />
  );

  const label = screen.getByText('A Label');
  const input = screen.getByTestId('text-field');
  const error = screen.getByText('Whoopsie');

  const htmlFor = label.getAttribute('for');
  const labelId = label.getAttribute('id');
  const inputId = input.getAttribute('id');

  expect(label).toHaveAttribute('for', inputId);
  expect(htmlFor).toEqual(inputId);
  expect(input).toHaveAttribute('aria-labelledby', labelId);

  expect(input).toHaveAttribute('aria-describedby', error.getAttribute('id'));

  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).not.toHaveAttribute('aria-errormessage');
});

test('can have default value', () => {
  render(
    <TextField
      data-testid="text-field"
      label="A Label"
      defaultValue="Default Value"
    />
  );

  const input = screen.getByTestId('text-field');
  expect(input).toHaveValue('Default Value');
});

test('can be controlled', async () => {
  const Controlled = () => {
    const [value, setValue] = React.useState('');
    return (
      <>
        <TextField
          data-testid="text-field"
          label="A Label"
          onChange={setValue}
        />
        <span data-testid="output">{value}</span>
      </>
    );
  };

  render(<Controlled />);

  user.type(screen.getByTestId('text-field'), 'Hello there!');
  await waitFor(() => {
    expect(screen.getByTestId('output')).toHaveTextContent('Hello there!');
  });
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLInputElement>();
  render(
    <ThemeProvider theme={theme}>
      <TextField data-testid="text-field" label="A Label" ref={ref} />
    </ThemeProvider>
  );

  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});
