import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import * as stories from './TextArea.stories';

const { Basic } = composeStories(stories);
const user = userEvent.setup();

test('renders an textarea', () => {
  render(<Basic />);

  const textArea = screen.getByRole('textbox');
  expect(textArea).toBeInTheDocument();
  expect(textArea instanceof HTMLTextAreaElement).toBeTruthy();
});

test('supports disabled', () => {
  render(<Basic disabled />);

  const textArea = screen.getByRole('textbox');
  expect(textArea).toBeDisabled();
});

test('supports required', () => {
  render(<Basic required />);

  const textArea = screen.getByRole('textbox');
  /** Note that the required attribute is not passed down! */
  expect(textArea).toBeRequired();
});

test('supports readonly', () => {
  render(<Basic readOnly />);

  const textArea = screen.getByRole('textbox');
  expect(textArea).toHaveAttribute('readonly');
});

test('supports field structure', () => {
  render(<Basic />);

  const label = screen.queryByText('Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('This is a help text description');
  expect(description).toBeInTheDocument();

  const error = screen.queryByText('Something went wrong');
  expect(error).not.toBeInTheDocument();
});

test('supports field structure (with error)', () => {
  render(<Basic error={true} />);

  const label = screen.queryByText('Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('This is a help text description');
  expect(description).not.toBeInTheDocument();

  const error = screen.queryByText('Something went wrong');
  expect(error).toBeInTheDocument();
});

test('correctly sets up aria attributes', () => {
  render(<Basic />);

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
  render(<Basic error={true} />);

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
  render(<Basic defaultValue="Default Value" />);

  const textArea = screen.getByRole('textbox');
  expect(textArea).toHaveValue('Default Value');
});

test('passes down "rows" attribute', () => {
  render(<Basic defaultValue="Default Value" rows={5} />);

  const textArea = screen.getByRole('textbox');
  expect(textArea).toHaveAttribute('rows', '5');
});

test('can be controlled', async () => {
  render(<Basic onChange={() => {}} />);

  const textArea = screen.getByRole('textbox');
  await user.type(textArea, 'Hello there!');
  expect(textArea).toHaveValue('Hello there!');
});

test('forwards ref', () => {
  const ref = createRef<HTMLTextAreaElement>();
  render(<Basic ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
});
