import { render, screen } from '@testing-library/react';
import { Basic } from './SegmentedControl.stories';

test('renders as a labelled radiogroup with radio items', () => {
  render(<Basic.Component />);

  expect(
    screen.getByRole('radiogroup', { name: 'Event status' })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('radio')).toHaveLength(3);
});

test('reflects the selected value', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('radio', { name: 'Upcoming' })).toBeChecked();
});

test('applies the name attribute so it submits in a form', () => {
  render(<Basic.Component name="status" />);

  for (const radio of screen.getAllByRole('radio')) {
    expect(radio).toHaveAttribute('name', 'status');
  }
});

test('respects the disabled state on the whole control', () => {
  render(<Basic.Component disabled />);

  for (const radio of screen.getAllByRole('radio')) {
    expect(radio).toBeDisabled();
  }
});
