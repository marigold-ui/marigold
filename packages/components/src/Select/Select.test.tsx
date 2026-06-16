import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RefObject } from 'react';
import { mockMatchMedia, renderWithOverlay } from '../test.utils';
import {
  Basic,
  MobileControlled,
  MultiSelectSummary,
  Sections,
  WithRenderValue,
} from './Select.stories';

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

test('supports sections', async () => {
  renderWithOverlay(<Sections.Component label="Label" data-testid="select" />);

  const button = screen.getByRole('button');
  await user.click(button);

  const options = screen.getByRole('listbox');
  const fantasy = within(options).getByText('Fantasy');
  const sciFi = within(options).getByText('Sci-Fi');

  expect(fantasy).toBeVisible();
  expect(sciFi).toBeVisible();
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

test('renderValue receives the selection count with static children (multiple)', async () => {
  renderWithOverlay(<MultiSelectSummary.Component />);

  const button = screen.getByRole('button');
  await user.click(button);

  await user.click(await screen.findByRole('option', { name: 'Bold' }));
  await user.click(screen.getByRole('option', { name: 'Italic' }));

  // Static-children options expose a `null` value; `details.count` must still
  // be correct because it comes from the raw selection, not the values.
  await waitFor(() => expect(button).toHaveTextContent(/2 selected/));
});

test('renderValue count reflects a single selection with static children', async () => {
  renderWithOverlay(<MultiSelectSummary.Component />);

  const button = screen.getByRole('button');
  await user.click(button);

  await user.click(await screen.findByRole('option', { name: 'Bold' }));

  await waitFor(() => expect(button).toHaveTextContent(/1 selected/));
});

test('default trigger render hides description slot', () => {
  renderWithOverlay(
    <Sections.Component label="Label" defaultValue="harry-potter" />
  );

  const description = within(screen.getByRole('button')).getByText(
    'About the boy who lived'
  );

  expect(description).not.toBeVisible();
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

// On small screens the trigger value is rendered inside the `Tray` branch
// (an `IconButton`) rather than the desktop `Popover` branch. `renderValue`
// (and its `count`) must behave identically there — the trigger summary is the
// same `TriggerValue` component in both branches.
test('renderValue count summarises the selection inside the tray (multiple, small screen)', async () => {
  window.matchMedia = mockMatchMedia([SMALL_SCREEN_QUERY]);

  renderWithOverlay(<MultiSelectSummary.Component />);

  // Capture the trigger before opening; the tray adds its own buttons.
  const button = screen.getByRole('button');
  await user.click(button);

  // Small screens present the options inside a tray (dialog), not a popover.
  const dialog = await screen.findByRole('dialog');

  await user.click(within(dialog).getByRole('option', { name: 'Bold' }));
  await user.click(within(dialog).getByRole('option', { name: 'Italic' }));

  // Multi-select keeps the tray open; dismiss it explicitly.
  await user.keyboard('{Escape}');
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );

  // Static-children options expose a `null` value, but `details.count` reflects
  // the real selection, so the opt-in summary is correct on mobile too.
  expect(button).toHaveTextContent(/2 selected/);
});

test('renderValue replaces the trigger inside the tray (single, small screen)', async () => {
  window.matchMedia = mockMatchMedia([SMALL_SCREEN_QUERY]);

  renderWithOverlay(<WithRenderValue.Component />);

  const button = screen.getByRole('button');
  await user.click(button);

  const dialog = await screen.findByRole('dialog');
  await user.click(within(dialog).getByText('Bob Smith'));

  // Single selection auto-closes the tray; the custom renderValue drives the
  // trigger, showing the name but not the option's description slot.
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );
  expect(within(button).getByText('Bob Smith')).toBeVisible();
  expect(
    within(button).queryByText('Senior Developer')
  ).not.toBeInTheDocument();
});
