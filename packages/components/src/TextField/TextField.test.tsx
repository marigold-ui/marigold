import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import {
  Basic,
  Controlled,
  WithCustomValidation,
  WithFormValidation,
} from './TextField.stories';

const user = userEvent.setup();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

test('renders an text input', () => {
  render(<Basic.Component data-testid="text-field" />);

  const textField = screen.getByRole('textbox');

  expect(textField).toBeInTheDocument();
  expect(textField).toHaveAttribute('type', 'text');
  expect(textField instanceof HTMLInputElement).toBeTruthy();
});

test('allows to change the input type', () => {
  render(<Basic.Component type="email" data-testid="text-field" />);

  const textField = screen.getByRole('textbox');

  expect(textField).toHaveAttribute('type', 'email');
});

test('takes full width by default', () => {
  render(<Basic.Component />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('My label is great.').parentElement;
  expect(container).toHaveClass('w-(--container-width)');
});

test('allows to set custom width', () => {
  render(<Basic.Component width="1/2" />);

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('My label is great.').parentElement;
  expect(container).toHaveClass('w-(--container-width)');
});

test('supports disabled', () => {
  render(<Basic.Component disabled data-testid="text-field" />);

  const textField = screen.getByRole('textbox');
  expect(textField).toBeDisabled();
});

test('supports required', () => {
  render(<Basic.Component required data-testid="text-field" />);

  const textField = screen.getByRole('textbox');
  /** Note that the required attribute is not passed down! */
  expect(textField).toBeRequired();
});

test('supports readonly', () => {
  render(<Basic.Component readOnly data-testid="text-field" />);

  const textField = screen.getByRole('textbox');
  expect(textField).toHaveAttribute('readonly');
});

test('supports field structure', () => {
  render(
    <Basic.Component
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
    <Basic.Component
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
    <Basic.Component
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
    <Basic.Component
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
  render(<Basic.Component defaultValue="Default Value" />);

  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('Default Value');
});

test('can be controlled', async () => {
  render(<Controlled.Component label="A Label" />);

  await user.type(screen.getByRole('textbox'), 'Hello there!');

  // Controlled story displays value in a pre element
  expect(screen.getByText('Hello there!')).toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLInputElement>();
  render(
    <Basic.Component data-testid="text-field" label="A Label" ref={ref} />
  );

  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});

test('render multiple error messages', () => {
  render(
    <Basic.Component
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
  render(<WithCustomValidation.Component />);

  const input = screen.getByRole('textbox');
  await user.click(input);
  await user.type(input, 'invalid_email');
  await user.tab();

  await waitFor(() => {
    expect(screen.getByTestId('text-field')).toHaveTextContent(
      'Please enter a valid email address!'
    );
  });
});

test('render custom validation error message', async () => {
  render(<WithFormValidation.Component />);

  const button = screen.getByTestId('button');
  await user.click(button);

  await waitFor(() => {
    expect(screen.getByTestId('text-field')).toHaveTextContent(
      'Please enter your email address!'
    );
  });
});
