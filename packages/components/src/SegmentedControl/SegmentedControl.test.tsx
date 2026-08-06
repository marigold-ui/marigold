import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RefObject } from 'react';
import { vi } from 'vitest';
import {
  Basic,
  Controlled,
  DisabledOption,
  WithError,
} from './SegmentedControl.stories';

const user = userEvent.setup();

test('renders as a labelled radiogroup with its options', () => {
  render(<Basic.Component />);

  expect(
    screen.getByRole('radiogroup', { name: 'Event status' })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('radio')).toHaveLength(3);
});

test('reflects the default selected value', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('radio', { name: 'Upcoming' })).toBeChecked();
});

test('selecting an option checks it and calls onChange', async () => {
  const onChange = vi.fn();
  render(<Basic.Component onChange={onChange} />);

  await user.click(screen.getByRole('radio', { name: 'Past' }));

  expect(screen.getByRole('radio', { name: 'Past' })).toBeChecked();
  expect(onChange).toHaveBeenCalledWith('past');
});

test('moves the selection with the arrow keys', async () => {
  render(<Basic.Component />);

  await user.tab();
  await user.keyboard('{ArrowRight}');

  expect(screen.getByRole('radio', { name: 'Past' })).toBeChecked();
});

test('moves the selection back with the left arrow key', async () => {
  render(<Basic.Component />);

  await user.tab();
  await user.keyboard('{ArrowRight}{ArrowLeft}');

  expect(screen.getByRole('radio', { name: 'Upcoming' })).toBeChecked();
});

test('supports controlled usage', async () => {
  render(<Controlled.Component />);

  await user.click(screen.getByRole('radio', { name: 'Grid' }));

  expect(screen.getByRole('radio', { name: 'Grid' })).toBeChecked();
  expect(screen.getByText('Selected: grid')).toBeVisible();
});

test('does not change the selection when read-only', async () => {
  render(<Basic.Component readOnly />);

  await user.click(screen.getByRole('radio', { name: 'Past' }));

  expect(screen.getByRole('radio', { name: 'Upcoming' })).toBeChecked();
  expect(screen.getByRole('radio', { name: 'Past' })).not.toBeChecked();
});

test('disables every option when disabled', () => {
  render(<Basic.Component disabled />);

  for (const radio of screen.getAllByRole('radio')) {
    expect(radio).toBeDisabled();
  }
});

test('disables only the option marked as disabled', async () => {
  const onChange = vi.fn();
  render(<DisabledOption.Component onChange={onChange} />);

  await user.click(screen.getByRole('radio', { name: 'Grid' }));

  expect(screen.getByRole('radio', { name: 'Grid' })).toBeDisabled();
  expect(screen.getByRole('radio', { name: 'List' })).toBeEnabled();
  expect(onChange).not.toHaveBeenCalled();
});

test('applies the name attribute to every option for form submission', () => {
  render(<Basic.Component name="status" />);

  for (const radio of screen.getAllByRole('radio')) {
    expect(radio).toHaveAttribute('name', 'status');
  }
});

test('marks the group invalid and shows the error message', () => {
  render(<WithError.Component />);

  expect(screen.getByRole('radiogroup')).toHaveAttribute(
    'aria-invalid',
    'true'
  );
  expect(screen.getByText('Please select an option.')).toBeVisible();
});

test('marks the group as required', () => {
  render(<Basic.Component required />);

  expect(screen.getByRole('radiogroup')).toHaveAttribute(
    'aria-required',
    'true'
  );
});

test('associates the description with the group', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('radiogroup')).toHaveAccessibleDescription(
    'Choose which events to display.'
  );
});

test('forwards a ref to the group element', () => {
  const ref: RefObject<HTMLDivElement | null> = { current: null };
  render(<Basic.Component ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLElement);
});
