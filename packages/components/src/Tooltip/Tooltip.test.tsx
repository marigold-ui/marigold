import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithOverlay } from '../test.utils';
import { Single } from './TooltipTrigger.stories';

const user = userEvent.setup();

beforeEach(async () => {
  // by firing an event at the beginning of each test, we can put ourselves into
  // keyboard modality for the test
  await user.keyboard('{Tab}');
});

test('does not render tooltip by default', () => {
  renderWithOverlay(<Single.Component />);

  expect(screen.queryByText('Look at this tooltip!')).toBeNull();
});

test('shows tooltip on focus', async () => {
  renderWithOverlay(<Single.Component />);

  // Use tab to focus, which properly triggers keyboard modality
  await user.tab();

  await waitFor(() => {
    expect(screen.queryByRole('tooltip')).toBeVisible();
  });

  // Tab away to blur
  await user.tab();

  await waitFor(() => {
    expect(screen.queryByText('Look at this tooltip!')).toBeNull();
  });
});

test('can be disabled', async () => {
  renderWithOverlay(<Single.Component disabled />);

  // Tab to the button to focus it
  await user.tab();

  expect(screen.queryByText('Look at this tooltip!')).toBeNull();
});

test('can be opened programatically', () => {
  renderWithOverlay(<Single.Component open />);

  expect(screen.queryByText('Look at this tooltip!')).toBeVisible();
});

test('sets placement as data attribute for styling', async () => {
  renderWithOverlay(<Single.Component open />);

  const tooltip = screen.getByRole('tooltip');
  // Default placement is 'top'
  await waitFor(() => expect(tooltip).toHaveAttribute('data-placement', 'top'));
});
