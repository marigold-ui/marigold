import { render, screen, within } from '@testing-library/react';
import { Basic, States } from './Stepper.stories';

test('renders a navigation landmark wrapping an ordered list of steps', () => {
  render(<Basic.Component />);

  const nav = screen.getByRole('navigation', { name: 'Checkout progress' });

  expect(nav).toBeInTheDocument();
  expect(within(nav).getByRole('list')).toBeInTheDocument();
  expect(within(nav).getAllByRole('listitem')).toHaveLength(4);
});

test('falls back to a localized landmark label when none is given', () => {
  render(<Basic.Component aria-label={undefined} />);

  expect(
    screen.getByRole('navigation', { name: 'Progress' })
  ).toBeInTheDocument();
});

test('marks the selected step with aria-current', () => {
  render(<Basic.Component />);

  expect(screen.getByRole('button', { name: /Choose plan/ })).toHaveAttribute(
    'aria-current',
    'step'
  );
});

test('exposes position and state to screen readers on every step', () => {
  render(<Basic.Component />);

  expect(screen.getByText('Step 1 of 4, completed')).toBeInTheDocument();
  expect(screen.getByText('Step 2 of 4, current step')).toBeInTheDocument();
  expect(screen.getByText('Step 3 of 4, not completed')).toBeInTheDocument();
});

test('derives data-state for each step in priority order', () => {
  render(<States.Component />);

  const items = screen.getAllByRole('listitem');

  expect(items[0]).toHaveAttribute('data-state', 'completed');
  expect(items[1]).toHaveAttribute('data-state', 'current');
  expect(items[2]).toHaveAttribute('data-state', 'error');
  expect(items[3]).toHaveAttribute('data-state', 'disabled');
  expect(items[4]).toHaveAttribute('data-state', 'upcoming');
});

test('keeps the step number out of the accessible name', () => {
  render(<Basic.Component />);

  // The marker shows "2" but the accessible name has to open with the visible
  // label (WCAG 2.5.3 Label in Name), so the digit is decorative.
  expect(screen.getByText('2')).toHaveAttribute('aria-hidden', 'true');
  expect(
    screen.getByRole('button', { name: /^Choose plan/ })
  ).toBeInTheDocument();
});

// The connector is aria-hidden decoration with no accessible query, so it
// carries a testid, same as the Breadcrumbs chevron.
test('renders one fewer connector than there are steps', () => {
  render(<Basic.Component />);

  expect(screen.getAllByTestId('stepper-connector')).toHaveLength(3);
});
