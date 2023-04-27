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

test('passes down variant and size', () => {
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

  const helptext = screen.getByText('Description');
  expect(helptext).toHaveClass(
    'flex items-center gap-1 text-blue-900 text-base',
    { exact: true }
  );
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
  expect(container).toHaveClass(
    'flex flex-col w-[var(--fieldWidth)] relative',
    {
      exact: true,
    }
  );
  expect(container).toMatchInlineSnapshot(`
    <div
      class="flex flex-col w-[var(--fieldWidth)] relative"
      style="--fieldWidth: 100%;"
    >
      <label
        class="flex w-[var(--labelWidth)]"
      >
        Label
      </label>
      <div
        class="flex flex-col"
      >
        <input
          type="text"
        />
        <div
          class="flex items-center gap-1"
        >
          Description
        </div>
      </div>
    </div>
  `);
});

test('allows to set custom width', () => {
  render(
    <ThemeProvider theme={theme}>
      <FieldBase label="Label" description="Description" width="60px">
        <input type="text" />
      </FieldBase>
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container).toMatchInlineSnapshot(`
    <div
      class="w-[var(--fieldWidth)] relative flex flex-row gap-2 items-baseline"
      style="--fieldWidth: 60px;"
    >
      <label
        class="flex w-[var(--labelWidth)]"
      >
        Label
      </label>
      <div
        class="flex flex-col"
      >
        <input
          type="text"
        />
        <div
          class="flex items-center gap-1"
        >
          Description
        </div>
      </div>
    </div>
  `);
});
