import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { TextField } from 'react-aria-components';
import { Basic } from './FieldBase.stories';

// Tests
// ---------------

interface MockedFieldProps {
  children?: ReactNode;
  isInvalid?: boolean;
}

const MockedField = ({ children }: MockedFieldProps) => (
  <div data-testid="mocked-field">{children}</div>
);

test('render passed in field', () => {
  render(<Basic.Component as={MockedField} />);

  const field = screen.getByTestId('mocked-field');
  expect(field).toBeInTheDocument();
});

test('render input element', () => {
  render(<Basic.Component />);

  // The Basic story renders an input with className="border"
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('render Field with label and helptext', () => {
  render(
    <Basic.Component
      label="Label"
      description="This is a helpful text"
      errorMessage="Something went wrong"
    />
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
    <Basic.Component
      as={TextField}
      label="Label"
      isInvalid
      errorMessage="Something went wrong"
    />
  );

  const label = screen.getByText('Label');
  expect(label).toBeInTheDocument();

  const error = screen.getByText('Something went wrong');
  expect(error).toBeInTheDocument();
});

test('render Field with label and errorMessage although description is set', () => {
  render(
    <Basic.Component
      as={TextField}
      label="Label"
      description="This is a helpful text"
      errorMessage="Something went wrong"
      isInvalid
    />
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
    <Basic.Component
      label="Label"
      description="Description"
      variant="blue"
      size="small"
    />
  );

  const label = screen.getByText('Label');
  expect(label).toBeInTheDocument();

  const helptext = screen.getByText('Description');
  expect(helptext).toBeInTheDocument();
});

test('takes full width by default', () => {
  render(<Basic.Component label="Label" description="Description" />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement!;
  expect(container).toHaveClass('w-full');
});
