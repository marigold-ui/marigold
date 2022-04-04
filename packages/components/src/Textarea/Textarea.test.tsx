import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@marigold/system';

import { TextArea } from './TextArea';

const theme = {
  fonts: {
    body: 'Inter Regular',
    fancy: 'Roboto',
  },
  textArea: {
    fontFamily: 'body',
  },
};

test('renders an textarea', () => {
  render(<TextArea label="Label" data-testid="textarea" />);

  const textArea = screen.getByTestId('textarea');
  expect(textArea).toBeInTheDocument();
  expect(textArea instanceof HTMLTextAreaElement).toBeTruthy();
});

test('can be styled via variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <TextArea label="A Label" data-testid="textarea" />
    </ThemeProvider>
  );
  const textArea = screen.getByTestId('textarea');
  expect(textArea).toHaveStyle(`font-family: ${theme.fonts.body}`);
});

test('supports disabled', () => {
  render(<TextArea label="A Label" disabled data-testid="textarea" />);

  const textArea = screen.getByTestId('textarea');
  expect(textArea).toBeDisabled();
});

test('supports required', () => {
  render(<TextArea label="A Label" required data-testid="textarea" />);

  const textArea = screen.getByTestId('textarea');
  /** Note that the required attribute is not passed down! */
  expect(textArea).toHaveAttribute('aria-required', 'true');
});

test('supports readonly', () => {
  render(<TextArea label="A Label" readOnly data-testid="textarea" />);

  const textArea = screen.getByTestId('textarea');
  expect(textArea).toHaveAttribute('readonly');
});

test('supports field structure', () => {
  render(
    <TextArea
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
    <TextArea
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
    <TextArea
      data-testid="textarea"
      label="A Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    />
  );

  const label = screen.getByText('A Label');
  const textarea = screen.getByTestId('textarea');
  const description = screen.getByText('Some helpful text');

  const htmlFor = label.getAttribute('for');
  const labelId = label.getAttribute('id');
  const inputId = textarea.getAttribute('id');

  expect(label).toHaveAttribute('for', inputId);
  expect(htmlFor).toEqual(inputId);
  expect(textarea).toHaveAttribute('aria-labelledby', labelId);

  expect(textarea).toHaveAttribute(
    'aria-describedby',
    description.getAttribute('id')
  );

  expect(textarea).not.toHaveAttribute('aria-invalid');
  expect(textarea).not.toHaveAttribute('aria-errormessage');
});

test('correctly sets up aria attributes (with error)', () => {
  render(
    <TextArea
      data-testid="textarea"
      label="A Label"
      description="Some helpful text"
      error={true}
      errorMessage="Whoopsie"
    />
  );

  const label = screen.getByText('A Label');
  const textArea = screen.getByTestId('textarea');
  const error = screen.getByText('Whoopsie');

  const htmlFor = label.getAttribute('for');
  const labelId = label.getAttribute('id');
  const inputId = textArea.getAttribute('id');

  expect(label).toHaveAttribute('for', inputId);
  expect(htmlFor).toEqual(inputId);
  expect(textArea).toHaveAttribute('aria-labelledby', labelId);

  expect(textArea).toHaveAttribute(
    'aria-describedby',
    error.getAttribute('id')
  );

  expect(textArea).toHaveAttribute('aria-invalid', 'true');
  expect(textArea).not.toHaveAttribute('aria-errormessage');
});

test('can have default value', () => {
  render(
    <TextArea
      data-testid="textarea"
      label="A Label"
      defaultValue="Default Value"
    />
  );

  const textArea = screen.getByTestId('textarea');
  expect(textArea).toHaveValue('Default Value');
});

test('can be controlled', () => {
  const Controlled = () => {
    const [value, setValue] = React.useState('');
    return (
      <>
        <TextArea data-testid="textarea" label="A Label" onChange={setValue} />
        <span data-testid="output">{value}</span>
      </>
    );
  };

  render(<Controlled />);

  userEvent.type(screen.getByTestId('textarea'), 'Hello there!');
  expect(screen.getByTestId('output')).toHaveTextContent('Hello there!');
});
