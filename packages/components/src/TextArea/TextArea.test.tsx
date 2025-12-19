import { render, screen } from '@testing-library/react';
import { createRef, forwardRef } from 'react';
import { TextAreaProps } from './TextArea';
import { Basic } from './TextArea.stories';

// Setup
// ---------------
const BasicComponent = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => (
    <div id="storybook-root">
      <Basic.Component {...props} ref={ref} />
    </div>
  )
);

test('renders an textarea', () => {
  render(<BasicComponent />);

  const textArea = screen.getByRole('textbox');
  expect(textArea).toBeInTheDocument();
  expect(textArea instanceof HTMLTextAreaElement).toBeTruthy();
});

test('supports disabled', () => {
  render(<BasicComponent disabled />);

  const textArea = screen.getByRole('textbox');
  expect(textArea).toBeDisabled();
});

test('supports required', () => {
  render(<BasicComponent required />);

  const textArea = screen.getByRole('textbox');
  /** Note that the required attribute is not passed down! */
  expect(textArea).toBeRequired();
});

test('supports readonly', () => {
  render(<BasicComponent readOnly />);

  const textArea = screen.getByRole('textbox');
  expect(textArea).toHaveAttribute('readonly');
});

test('supports field structure', () => {
  render(<BasicComponent />);

  const label = screen.queryByText('Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('This is a help text description');
  expect(description).toBeInTheDocument();

  const error = screen.queryByText('Something went wrong');
  expect(error).not.toBeInTheDocument();
});

test('supports field structure (with error)', () => {
  render(<BasicComponent error={true} />);

  const label = screen.queryByText('Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('This is a help text description');
  expect(description).not.toBeInTheDocument();

  const error = screen.queryByText('Something went wrong');
  expect(error).toBeInTheDocument();
});

test('correctly sets up aria attributes', () => {
  render(<BasicComponent />);

  const label = screen.getByText('Label');
  const textArea = screen.getByRole('textbox');
  const description = screen.getByText('This is a help text description');

  const htmlFor = label.getAttribute('for');
  const labelId = label.getAttribute('id');
  const inputId = textArea.getAttribute('id');

  expect(label).toHaveAttribute('for', inputId);
  expect(htmlFor).toEqual(inputId);
  expect(textArea).toHaveAttribute('aria-labelledby', labelId);

  expect(textArea).toHaveAttribute(
    'aria-describedby',
    description.getAttribute('id')
  );

  expect(textArea).not.toHaveAttribute('aria-invalid');
  expect(textArea).not.toHaveAttribute('aria-errormessage');
});

test('correctly sets up aria attributes (with error)', () => {
  render(<BasicComponent error={true} />);

  const label = screen.getByText('Label');
  const textArea = screen.getByRole('textbox');
  const error = screen.getByText('Something went wrong');

  const htmlFor = label.getAttribute('for');
  const labelId = label.getAttribute('id');
  const inputId = textArea.getAttribute('id');

  expect(label).toHaveAttribute('for', inputId);
  expect(htmlFor).toEqual(inputId);
  expect(textArea).toHaveAttribute('aria-labelledby', labelId);

  expect(textArea).toHaveAttribute(
    'aria-describedby',
    // eslint-disable-next-line testing-library/no-node-access
    expect.stringContaining(error!.parentElement!.getAttribute('id')!)
  );

  expect(textArea).toHaveAttribute('aria-invalid', 'true');
  expect(textArea).not.toHaveAttribute('aria-errormessage');
});

test('can have default value', () => {
  render(<BasicComponent defaultValue="Default Value" />);

  const textArea = screen.getByRole('textbox');
  expect(textArea).toHaveValue('Default Value');
});

test('passes down "rows" attribute', () => {
  render(<BasicComponent defaultValue="Default Value" rows={5} />);

  const textArea = screen.getByRole('textbox');
  expect(textArea).toHaveAttribute('rows', '5');
});

test('forwards ref', () => {
  const ref = createRef<HTMLTextAreaElement>();
  render(<BasicComponent ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
});
