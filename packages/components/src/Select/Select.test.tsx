import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { mockMatchMedia, renderWithOverlay } from '../test.utils';
import { Basic, MobileControlled } from './Select.stories';

const user = userEvent.setup();

// `useSmallScreen` matches `(width < 640px)`. By default we keep the desktop
// (Popover) branch active; individual tests opt into the mobile (Tray) branch.
const SMALL_SCREEN_QUERY = '(width < 640px)';

window.matchMedia = mockMatchMedia([]);

afterEach(() => {
  // Reset to the desktop default in case a test forced the small-screen branch.
  window.matchMedia = mockMatchMedia([]);
});

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
  const ref = createRef<HTMLButtonElement>();
  render(
    <Basic.Component label="Label" data-testid="select" ref={ref as any} />
  );

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});

test('error is there', () => {
  render(<Basic.Component label="Label" error />);

  // We need to query all, since there is also a label in the hidden select
  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getAllByText('Label')[0].parentElement;

  expect(container).toHaveAttribute('data-error');
});

// Regression guard for DSTSUP-261: on screens narrower than the `sm`
// breakpoint, `<Select>` renders its listbox inside a `<Tray>` (RAC
// `DialogTrigger`). The inner `<ListBox>` must keep participating in the
// Select's list state so that selecting an option still fires `onChange`
// (value API) and drives the controlled `value` prop — exactly as on desktop.
// `MobileControlled` is a fully controlled (`value`/`onChange`) Select, so the
// assertions read selection through the `value` prop round-trip.
test('updates the controlled `value` when selecting in the tray (small screen)', async () => {
  window.matchMedia = mockMatchMedia([SMALL_SCREEN_QUERY]);

  renderWithOverlay(<MobileControlled.Component />);

  const button = screen.getByLabelText(/Favorite character/i);
  await user.click(button);

  // On small screens the listbox is presented as a tray (dialog), not a popover.
  const dialog = await screen.findByRole('dialog');

  // DSTSUP-261 invariant: exactly one tray modal, holding the listbox. A split
  // `HiddenContext` (dual react-aria generations) or a broken hidden-pass guard
  // leaks a second, empty modal that `inert`s the real one.
  expect(screen.getAllByRole('dialog')).toHaveLength(1);
  expect(within(dialog).getByRole('listbox')).toBeInTheDocument();

  await user.click(within(dialog).getByText('Peach'));

  // The controlled `value` prop round-trips: onChange -> state -> value.
  await waitFor(() =>
    expect(screen.getByTestId('value')).toHaveTextContent('value: peach')
  );

  // Single selection auto-closes the tray and the trigger renders from `value`.
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );
  expect(button).toHaveTextContent('Peach');
});
