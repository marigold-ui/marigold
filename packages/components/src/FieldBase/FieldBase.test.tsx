import { render, screen } from '@testing-library/react';
import { FieldErrorContext } from 'react-aria-components';
import { FieldBaseProps } from '@marigold/components';
import { Basic } from './FieldBase.stories';

// Setup
// ---------------

/**
 * FieldBase uses HelpText which relies on FieldErrorContext from react-aria
 * to determine when to show error messages vs descriptions. In production,
 * this context is provided by react-aria field components (TextField, etc.).
 * For testing FieldBase in isolation, we need to provide this context manually.
 */
const BasicComponent = (props?: Partial<FieldBaseProps<any>>) => (
  <FieldErrorContext.Provider
    value={{
      isInvalid: props?.isInvalid ?? false,
      validationErrors: [],
      validationDetails: {
        badInput: false,
        customError: false,
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valid: true,
        valueMissing: false,
      },
    }}
  >
    <div id="storybook-root">
      <Basic.Component {...props} />
    </div>
  </FieldErrorContext.Provider>
);

// Tests
// ---------------
test('render Field with label and helptext', () => {
  render(<Basic.Component />);

  const label = screen.getByText('This is the label');
  const description = screen.getByText('This is a help text description');
  const error = screen.queryByText('Something went wrong');

  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(error).not.toBeInTheDocument();
});

test('render Field with label and errorMessage', () => {
  render(<BasicComponent isInvalid></BasicComponent>);
  const label = screen.getByText('This is the label');
  const error = screen.getByText('Something went wrong');

  expect(label).toBeInTheDocument();
  expect(error).toBeInTheDocument();
});

test('render Field with label and errorMessage although description is set', () => {
  render(<BasicComponent isInvalid errorMessage="Something went wrong" />);
  const label = screen.getByText('This is the label');
  const description = screen.queryByText('This is a help text description');
  const error = screen.getByText('Something went wrong');

  expect(label).toBeInTheDocument();
  expect(description).not.toBeInTheDocument();
  expect(error).toBeInTheDocument();
});

test('takes full width by default', () => {
  render(<BasicComponent />);
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('This is the label').parentElement!;

  expect(container.className).toMatchInlineSnapshot(
    `"group/field flex min-w-0 flex-col w-auto space-y-2"`
  );
});

test('applies width variables for numeric width', () => {
  render(<BasicComponent width={80} />);
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('This is the label').parentElement!;

  expect(container.className).toContain('w-auto');
  expect(container.style.getPropertyValue('--container-width')).toBe(
    'calc(var(--spacing) * 80)'
  );
  expect(container.style.getPropertyValue('--field-width')).toBe(
    'calc(var(--spacing) * 80)'
  );
});

test('applies width variables for fraction width', () => {
  render(<BasicComponent width="1/2" />);
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('This is the label').parentElement!;

  expect(container.className).toContain('w-(--container-width)');
  expect(container.className).not.toContain('w-auto');
  expect(container.style.getPropertyValue('--container-width')).toBe(
    'calc((1 / 2) * 100%)'
  );
  expect(container.style.getPropertyValue('--field-width')).toBe('100%');
});
