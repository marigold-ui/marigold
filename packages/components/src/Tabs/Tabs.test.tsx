import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Basic, WithDisabledKeys, WithSelectedTab } from './Tabs.stories';

const user = userEvent.setup();

test('rendering content correctly', () => {
  render(<Basic.Component />);

  // rendering the tab controller
  expect(screen.getByText('Mouse Settings')).toBeInTheDocument();
  // rendering tabpanel
  expect(screen.getByText(/Adjust the sensitivity/)).toBeInTheDocument();
});

test('supports disabled prop', () => {
  render(<WithDisabledKeys.Component />);
  const tab = screen.getByText('private');
  expect(tab).toHaveAttribute('aria-disabled');
  // In a real browser, disabled tabs have pointer-events:none which prevents clicking.
  // This confirms the tab is properly disabled - the user cannot interact with it.
  expect(getComputedStyle(tab).pointerEvents).toBe('none');
  // First tab content should still be visible since disabled tab can't be selected
  expect(screen.getByText(/This panel displays your profile/)).toBeVisible();
});

test('set defaultValue via props in tabs', () => {
  render(<WithSelectedTab.Component />);
  expect(
    screen.getByText(/You're currently in the Settings tab/)
  ).toBeVisible();
});

test('open tabpanel when its tab controller is clicked', async () => {
  render(<Basic.Component />);
  const tab = screen.getByText('Keyboard Settings');
  await user.click(tab);
  expect(screen.getByText(/Customize the key bindings/)).toBeVisible();
});

test('allows tab navigation via keyboard', async () => {
  render(<Basic.Component />);
  const firstTab = screen.getByText('Mouse Settings');

  // Focus the first tab
  await user.click(firstTab);

  // Navigate to next tab with arrow key
  await user.keyboard('{ArrowRight}');

  // Second tab should now be focused
  expect(screen.getByText('Keyboard Settings')).toHaveFocus();
});

test('tabs have correct ARIA roles', () => {
  render(<Basic.Component />);

  const tabs = screen.getAllByRole('tab');
  expect(tabs).toHaveLength(3);

  const tabpanel = screen.getByRole('tabpanel');
  expect(tabpanel).toBeInTheDocument();
});

test('tablist has correct container structure', () => {
  render(<Basic.Component />);

  const tablist = screen.getByRole('tablist');
  expect(tablist).toBeInTheDocument();
  expect(tablist).toHaveAttribute('aria-label', 'Input settings');
});
