import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Theme, cva } from '@marigold/system';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import { setup } from '../test.utils';
import { TextField } from './TextField';

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(),
    Label: cva('', {
      variants: {
        variant: {
          lime: 'text-lime-600',
        },
        size: {
          small: 'p-1',
        },
      },
    }),
    HelpText: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'p-2',
          },
        },
      }),
      icon: cva(''),
    },
    Input: {
      input: cva('border-blue-700'),
      icon: cva(),
      action: cva(),
    },
    Button: cva('align-center flex disabled:bg-gray-600', {
      variants: {
        variant: {
          primary: 'text-primary-500',
          secondary: 'text-secondary-800',
        },
        size: {
          small: 'size-10',
          large: 'w-50 h-50',
        },
      },
    }),
  },
};

const user = userEvent.setup();
const { render } = setup({ theme });

test('renders an text input', () => {
  render(<TextField label="Label" data-testid="text-field" />);

  const textField = screen.getByRole('textbox');

  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'text');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('allows to change the input type', () => {
  render(<TextField label="Label" type="email" data-testid="text-field" />);

  const textField = screen.getByRole('textbox');

  expect(textField).toHaveAttribute('type', 'email');
});

test('takes full width by default', () => {
  render(<TextField label="Label" />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container).toHaveStyle('width: full');
});

test('allows to set custom width', () => {
  render(<TextField label="Label" width="1/2" />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container?.className).toMatchInlineSnapshot(
    `"group/field flex flex-col w-1/2"`
  );
});

test('supports disabled', () => {
  render(<TextField label="A Label" disabled data-testid="text-field" />);

  const textField = screen.getByRole('textbox');
  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(<TextField label="A Label" required data-testid="text-field" />);

  const textField = screen.getByRole('textbox');
  /** Note that the required attribute is not passed down! */
  expect(textField).toBeRequired();
});

test('supports readonly', () => {
  render(<TextField label="A Label" readOnly data-testid="text-field" />);

  const textField = screen.getByRole('textbox');
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
  const input = screen.getByRole('textbox');
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
  const input = screen.getByRole('textbox');
  const error = screen.getByText('Whoopsie');

  const htmlFor = label.getAttribute('for');
  const labelId = label.getAttribute('id');
  const inputId = input.getAttribute('id');

  expect(label).toHaveAttribute('for', inputId);
  expect(htmlFor).toEqual(inputId);
  expect(input).toHaveAttribute('aria-labelledby', labelId);
  expect(input).toHaveAttribute(
    'aria-describedby',
    // eslint-disable-next-line testing-library/no-node-access
    expect.stringContaining(error?.parentElement?.getAttribute('id') || '')
  );

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

  const input = screen.getByRole('textbox');
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
          value={value}
          onChange={setValue}
        />
        <span data-testid="output">{value}</span>
      </>
    );
  };

  render(<Controlled />);

  await user.type(screen.getByRole('textbox'), 'Hello there!');

  expect(screen.getByTestId('output')).toHaveTextContent('Hello there!');
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLInputElement>();
  render(<TextField data-testid="text-field" label="A Label" ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});

test('render multiple error messages', () => {
  render(
    <TextField
      data-testid="text-field"
      label="A Label"
      errorMessage={['One error ', 'two errors ', 'third error']}
      error={true}
    />
  );

  expect(screen.getByTestId('text-field')).toHaveTextContent(
    'One error two errors third error'
  );
});

test('render error message from custom validation', async () => {
  render(
    <TextField
      data-testid="text-field"
      label="Email Address"
      name="email"
      type="email"
      placeholder="Enter your email address"
      required
      validate={val =>
        val.length && /^\S+@\S+\.\S+$/.test(val)
          ? ''
          : 'Please enter a valid email address!'
      }
    />
  );

  const input = screen.getByRole('textbox');
  await user.click(input);
  await user.type(input, 'invalid_email');
  await user.tab();

  const textFieldElement = screen.getByTestId('text-field');

  expect(textFieldElement).toHaveTextContent(
    'Please enter a valid email address!'
  );
});

test('render custom validation error message', async () => {
  render(
    <Form>
      <TextField
        data-testid="text-field"
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email address"
        required
        errorMessage={({ validationDetails }) =>
          validationDetails.valueMissing
            ? 'Please enter your email address!'
            : ''
        }
      />
      <Button variant="primary" type="submit" data-testid="button">
        Subscribe
      </Button>
    </Form>
  );

  const button = screen.getByTestId('button');
  fireEvent.click(button);

  expect(screen.getByTestId('text-field')).toHaveTextContent(
    'Please enter your email address!'
  );
});
