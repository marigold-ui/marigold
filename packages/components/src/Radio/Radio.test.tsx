import { render, screen } from '@testing-library/react';
import { Basic, Error, WithOwnWidth } from './Radio.stories';

// Tests
// ---------------
test('takes full width by default', () => {
  render(<Basic.Component />);

  // Width lives on the RadioField wrapper (a `div`). RadioButton renders a
  // `label`, so `closest('div[data-rac]')` lands on the field regardless of how
  // deeply RAC nests the label internally.
  const radio = screen.getByRole('radio', { name: 'Option 1' });
  // eslint-disable-next-line testing-library/no-node-access
  const field = radio.closest('div[data-rac]');
  expect(field).toHaveClass('w-full');
});

test('forwards ref', () => {
  render(<Basic.Component />);

  // Verify the Radio elements are rendered as labels
  const radio = screen.getByText('Option 1');
  // eslint-disable-next-line testing-library/no-node-access
  expect(radio.closest('label')).toBeInstanceOf(HTMLLabelElement);
});

test('radio accepts helptext', () => {
  // Basic story already has description="Hier steht ein HelpText"
  render(<Basic.Component />);
  expect(screen.getByText('Hier steht ein HelpText')).toBeInTheDocument();
});

test('radio accepts error message', () => {
  // Error story already has errorMessage="Das ist ein Error"
  render(<Error.Component />);
  expect(screen.getByText('Das ist ein Error')).toBeInTheDocument();
});

test('disabled prop and styles', () => {
  render(<Basic.Component />);

  // Option 3 is disabled in the Basic story
  const disabledRadio = screen.getByText('Option 3');
  // eslint-disable-next-line testing-library/no-node-access
  const container = disabledRadio.closest('[data-disabled]');
  expect(container).toHaveAttribute('data-disabled');
});

test('radio group can be horizontal', () => {
  render(<Basic.Component orientation="horizontal" />);

  const group = screen.getByTestId('group');
  expect(group).toHaveClass('flex-row');
});

test('applies width variable when set directly on an individual radio', () => {
  render(<WithOwnWidth.Component />);

  const radio = screen.getByRole('radio', { name: 'Option 1' });
  // eslint-disable-next-line testing-library/no-node-access
  const field = radio.closest('div[data-rac]') as HTMLElement;
  expect(field).toHaveClass('w-(--field-width)');
  expect(field.style.getPropertyValue('--field-width')).toBe(
    'calc((1 / 2) * 100%)'
  );
});

test('does not re-apply width on individual radios inside a sized group', () => {
  render(<Basic.Component width="1/2" />);

  const radio = screen.getByRole('radio', { name: 'Option 1' });
  // eslint-disable-next-line testing-library/no-node-access
  const field = radio.closest('div[data-rac]');
  expect(field).toHaveClass('w-full');
  expect(field).not.toHaveClass('w-(--field-width)');
});
