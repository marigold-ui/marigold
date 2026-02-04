import { screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { TextField } from 'react-aria-components';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { FieldBase } from './FieldBase';

// Setup
// ---------------

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva({}),
    Label: cva({
      base: '',
      variants: {
        variant: {
          blue: 'text-blue-600',
        },
        size: {
          small: 'text-base',
        },
      },
    }),
    HelpText: {
      container: cva({
        base: 'p-1',
        variants: {
          variant: {
            lime: 'text-blue-600',
          },
          size: {
            small: 'text-base',
          },
        },
      }),
      icon: cva({}),
    },
    Input: {
      input: cva({ base: 'border-blue-700' }),
      icon: cva({}),
      action: cva({}),
    },
  },
};

const { render } = setup({ theme });

interface MockedFieldProps {
  children?: ReactNode;
  isInvalid?: boolean;
}

const MockedField = ({ children }: MockedFieldProps) => (
  <div data-testid="mocked-field">{children}</div>
);

// Tests
// ---------------
test('render passed in field', () => {
  render(
    <FieldBase as={MockedField}>
      <input />
    </FieldBase>
  );

  const field = screen.getByTestId('mocked-field');
  expect(field).toBeInTheDocument();
});

test('render passed in input', () => {
  render(
    <FieldBase as={MockedField}>
      <input data-testid="test-input" />
    </FieldBase>
  );

  const input = screen.getByTestId('test-input');
  expect(input).toBeInTheDocument();
});

test('render Field with label and helptext', () => {
  render(
    <FieldBase
      label="Label"
      description="This is a helpful text"
      errorMessage="Something went wrong"
    >
      <input />
    </FieldBase>
  );

  const label = screen.getByText('Label');
  expect(label).toBeInTheDocument();
  const description = screen.getByText('This is a helpful text');
  expect(description).toBeInTheDocument();
  const error = screen.queryByText('Something went wrong');
  expect(error).not.toBeInTheDocument();
});

test('render Field with label and errorMessage', () => {
  render(
    <FieldBase
      as={TextField}
      label="Label"
      isInvalid
      errorMessage="Something went wrong"
    ></FieldBase>
  );

  const label = screen.getByText('Label');
  expect(label).toBeInTheDocument();

  const error = screen.getByText('Something went wrong');
  expect(error).toBeInTheDocument();
});

test('render Field with label and errorMessage although description is set', () => {
  render(
    <FieldBase
      as={TextField}
      label="Label"
      description="This is a helpful text"
      errorMessage="Something went wrong"
      isInvalid
    >
      <input />
    </FieldBase>
  );

  const label = screen.getByText('Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('This is a helpful text');
  expect(description).not.toBeInTheDocument();

  const error = screen.getByText('Something went wrong');
  expect(error).toBeInTheDocument();
});

test('passes down variant and size', () => {
  render(
    <FieldBase
      label="Label"
      description="Description"
      variant="blue"
      size="small"
    >
      <input type="text" />
    </FieldBase>
  );

  const label = screen.getByText('Label');
  expect(label.className).toMatchInlineSnapshot(
    `"text-blue-600 text-base inline-flex"`
  );

  const helptext = screen.getByText('Description');
  expect(helptext).toBeInTheDocument();
});

test('takes full width by default', () => {
  render(
    <FieldBase label="Label" description="Description">
      <input type="text" />
    </FieldBase>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement!;
  expect(container.className).toMatchInlineSnapshot(
    `"group/field flex flex-col w-full"`
  );
});
