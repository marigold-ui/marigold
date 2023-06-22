import React, { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { screen, within } from '@testing-library/react';
import { Theme } from '@marigold/system';
import { setup } from '../test.utils';

import { FieldBase } from './FieldBase';

// Setup
// ---------------

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(),
    Label: {
      container: cva('', {
        variants: {
          variant: {
            blue: 'text-blue-600',
          },
          size: {
            small: 'text-base',
          },
        },
      }),
      indicator: cva(''),
    },
    HelpText: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-blue-600',
          },
          size: {
            small: 'text-base',
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
  },
};

const { render } = setup({ theme });

interface MockedTestFieldProps extends AriaTextFieldOptions<'input'> {
  disabled?: boolean;
  required?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
}

const MockedTextField = (props: MockedTestFieldProps) => {
  const ref = React.useRef(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <FieldBase
      {...props}
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <input {...inputProps} ref={ref} />
    </FieldBase>
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
      errorMessage="Something went wrong"
      error={true}
    />
  );

  const label = screen.getByText('Label');
  expect(label).toBeInTheDocument();
  const error = screen.getByText('Something went wrong');
  expect(error).toBeInTheDocument();
});

test('render Field with label and errorMessage although description is set', () => {
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
  expect(requiredIcon).toBeInTheDocument();
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
    `"text-blue-600 text-base flex w-[var(--labelWidth)]"`
  );

  const helptext = screen.getByText('Description');
  expect(helptext.className).toMatchInlineSnapshot(
    `"flex items-center gap-1 text-base"`
  );
});

test('takes full width by default', () => {
  render(
    <FieldBase label="Label" description="Description">
      <input type="text" />
    </FieldBase>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement!;
  expect(container.getAttribute('style')).toMatchInlineSnapshot(
    `"--fieldWidth: 100%;"`
  );
});

test('allows to set custom width', () => {
  render(
    <FieldBase label="Label" description="Description" width="60px">
      <input type="text" />
    </FieldBase>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement!;
  expect(container.getAttribute('style')).toMatchInlineSnapshot(
    `"--fieldWidth: 60px;"`
  );
});
