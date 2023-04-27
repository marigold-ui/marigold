import React, { ReactNode } from 'react';
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { render, screen, within } from '@testing-library/react';
import { FieldBase } from './FieldBase';
import { Theme, ThemeProvider } from '@marigold/system';
import { field } from './../../../../themes/tailwind-core/src/components/Field.style';
import { tv } from 'tailwind-variants';

// Setup
// ---------------
const theme: Theme = {
  name: 'test',
  components: {
    Field: field,
    Label: tv({
      variants: {
        variant: {
          blue: 'text-blue-600',
        },
        size: {
          small: 'text-base',
        },
      },
    }),
    HelpText: tv({
      slots: {
        container: '',
        icon: '',
      },
      variants: {
        variant: {
          blue: {
            container: 'text-blue-900',
          },
        },
        size: {
          small: {
            container: 'text-base',
          },
        },
      },
    }),
  },
};

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

test.only('passes down variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <FieldBase
        label="Label"
        description="Description"
        variant="blue"
        size="small"
      >
        <input type="text" />
      </FieldBase>
    </ThemeProvider>
  );

  const label = screen.getByText('Label');
  expect(label).toHaveClass(
    'flex w-[var(--labelWidth)] text-blue-600 text-base',
    { exact: true }
  );

  // const helptext = screen.getByText('Description');
  // console.log(helptext);
  // expect(helptext).toHaveStyle(`color: `);
});

test('takes full width by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <FieldBase label="Label" description="Description">
        <input type="text" />
      </FieldBase>
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container).toHaveStyle('width: 100%');
});

test('allows to set custom width', () => {
  render(
    <ThemeProvider theme={theme}>
      <FieldBase label="Label" description="Description" width="large">
        <input type="text" />
      </FieldBase>
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container).toHaveStyle(`width: ${theme.sizes.large}px`);
});
