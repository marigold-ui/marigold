import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RefObject } from 'react';
import { mockMatchMedia, renderWithOverlay } from '../test.utils';
import { Basic, MultiSelectSummary, WithRenderValue } from './Select.stories';

const user = userEvent.setup();

// `useSmallScreen` matches `(width < 640px)`. Force the desktop (Popover) branch
// deterministically so these unit tests do not depend on the real browser
// window size. The small-screen (Tray) branch is covered by the `*Mobile` and
// `MobileControlled` play stories (real Firefox, `smallScreen` viewport).
window.matchMedia = mockMatchMedia([]);

test('renders a field (label, helptext, select)', () => {
  render(
    <Basic.Component
      data-testid="select"
      label="Label"
      errorMessage={'ERRR!'}
      description="Description"
    />
  );

  // We need to query all, since there is also a label in the hidden select
  const label = screen.queryAllByText('Label')[0];
  const description = screen.queryAllByText('Description')[0];
  const errorMessage = screen.queryByText('ERRR!');
  const button = screen.queryByTestId('select');

  expect(label).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(errorMessage).not.toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('visible label is not a <label> element (for a11y)', () => {
  render(<Basic.Component label="Label" />);

  const labels = screen.queryAllByText('Label');

  expect(labels.length).toEqual(1);
});

test('placeholder is rendered', () => {
  render(<Basic.Component />);

  const button = screen.getByRole('button');

  expect(button).toHaveTextContent(/Select Item/);
});

test('allows to disable select', async () => {
  render(<Basic.Component disabled />);
  const button = screen.getByRole('button');

  expect(button).toBeDisabled();

  await user.click(button);

  expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('supports default value via "defaultValue"', async () => {
  renderWithOverlay(
    <Basic.Component
      label="Label"
      data-testid="select"
      defaultValue="Star Trek"
    />
  );

  const button = screen.getByRole('button');
  expect(button).toHaveTextContent(/Star Trek/);

  await user.click(button);

  const options = screen.getByRole('listbox');
  const starTrek = within(options).getByRole('option', { name: 'Star Trek' });

  expect(starTrek).toHaveAttribute('aria-selected', 'true');
});

test('set width via props', () => {
  render(<Basic.Component label="Label" data-testid="select" width="1/2" />);

  // We need to query all, since there is also a label in the hidden select
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;
  expect(container).toHaveClass('w-(--container-width)');
});

test('forwards ref', () => {
  const ref: RefObject<HTMLButtonElement | null> = { current: null };
  render(<Basic.Component label="Label" data-testid="select" ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});

test('does not allow width="fit"', () => {
  render(
    // @ts-expect-error "fit" is not allowed because virtualizer controls item sizing
    <Basic.Component label="Label" width="fit" />
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;

  expect(container).not.toHaveClass('w-fit');
});

test('error is there', () => {
  render(<Basic.Component label="Label" error />);

  // We need to query all, since there is also a label in the hidden select
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;

  expect(container).toHaveAttribute('data-error');
});

test('renderValue replaces the trigger content for non-empty selections', () => {
  renderWithOverlay(<WithRenderValue.Component defaultValue="alice" />);

  const button = screen.getByRole('button');

  expect(within(button).getByText('Alice Johnson')).toBeVisible();
  expect(within(button).queryByText('Product Manager')).not.toBeInTheDocument();
});

test('renderValue is not used when nothing is selected (placeholder shows)', () => {
  render(<WithRenderValue.Component />);

  const button = screen.getByRole('button');

  expect(button).toHaveTextContent(/Select a user/);
});

test('renderValue receives all selected items in multi-select mode', () => {
  renderWithOverlay(
    <WithRenderValue.Component
      selectionMode="multiple"
      defaultValue={['alice', 'bob']}
    />
  );

  const button = screen.getByRole('button');

  expect(within(button).getByText('Alice Johnson')).toBeVisible();
  expect(within(button).getByText('Bob Smith')).toBeVisible();
});

// The multi-selection "2 selected" case is covered by the `MultiSelectSummary`
// play function (same Firefox browser env) and the small-screen tray test
// below, so it is not duplicated here. This single-selection case is the
// unit-level addition that the play function does not exercise.
test('renderValue count reflects a single selection with static children', async () => {
  renderWithOverlay(<MultiSelectSummary.Component />);

  const button = screen.getByRole('button');
  await user.click(button);

  await user.click(await screen.findByRole('option', { name: 'Bold' }));

  await waitFor(() => expect(button).toHaveTextContent(/1 selected/));
});
