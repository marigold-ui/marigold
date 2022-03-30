import React, { ReactNode } from 'react';
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { render, screen, within } from '@testing-library/react';

import { Field } from './Field';

// Setup
// ---------------
interface MockedTestFieldProps extends AriaTextFieldOptions<'input'> {
  disabled?: boolean;
  required?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
}

const MockedTextField = (props: MockedTestFieldProps) => {
  let ref = React.useRef(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <Field
      {...props}
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <input {...inputProps} ref={ref} />
    </Field>
  );
};

// Tests
// ---------------
test('render Field with label and helptext', () => {
  render(
    <MockedTextField
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
    <MockedTextField
      label="Label"
      description="This is a helpful text"
      errorMessage="Something went wrong"
      error={true}
    />
  );

  const label = screen.getByText('Label');
  expect(label).toBeInTheDocument();
  const description = screen.queryByText('This is a helpful text');
  expect(description).not.toBeInTheDocument();
  const error = screen.getByText('Something went wrong');
  expect(error).toBeInTheDocument();
});

test('field label shows requried indicator', () => {
  render(
    <MockedTextField
      label="Label"
      required
      description="This is a helpful text"
      errorMessage="Something went wrong"
    />
  );

  const label = screen.getByText('Label');
  const requiredIcon = within(label).getByRole('presentation');
});
