import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Basic,
  WithDisabledKeys,
  WithRenderProps,
  WithSelectedTab,
} from './Tabs.stories';

const user = userEvent.setup();

test('rendering content correctly', () => {
  render(<Basic.Component />);

  // rendering the tab controller
  expect(screen.getAllByText('Mouse Settings')[0]).toBeInTheDocument();
  // rendering tabpanel
  expect(screen.getAllByText(/Adjust the sensitivity/)[0]).toBeInTheDocument();
});

test('supports disabled prop', () => {
  render(<WithDisabledKeys.Component />);
  const tab = screen.getAllByText('private')[0];
  expect(tab).toHaveAttribute('aria-disabled', 'true');
  // First tab content should still be visible since disabled tab can't be selected
  expect(
    screen.getAllByText(/This panel displays your profile/)[0]
  ).toBeVisible();
});

test('set defaultValue via props in tabs', () => {
  render(<WithSelectedTab.Component />);
  expect(
    screen.getAllByText(/You're currently in the Settings tab/)[0]
  ).toBeVisible();
});

test('open tabpanel when its tab controller is clicked', async () => {
  render(<Basic.Component />);
  const tab = screen.getAllByText('Keyboard Settings')[0];
  await user.click(tab);
  expect(screen.getAllByText(/Customize the key bindings/)[0]).toBeVisible();
});

test('allows tab navigation via keyboard', async () => {
  render(<Basic.Component />);
  const firstTab = screen.getAllByText('Mouse Settings')[0];

  // Focus the first tab
  await user.click(firstTab);

  // Navigate to next tab with arrow key
  await user.keyboard('{ArrowRight}');

  // Second tab should now be focused
  expect(screen.getAllByText('Keyboard Settings')[0]).toHaveFocus();
});

test('tabs have correct ARIA roles', () => {
  render(<Basic.Component />);

  const tabs = screen.getAllByRole('tab');
  expect(tabs.length).toBeGreaterThanOrEqual(3);

  const tabpanel = screen.getAllByRole('tabpanel')[0];
  expect(tabpanel).toBeInTheDocument();
});

test('tablist has correct container structure', () => {
  render(<Basic.Component />);

  const tablist = screen.getAllByRole('tablist')[0];
  expect(tablist).toBeInTheDocument();
  expect(tablist).toHaveAttribute('aria-label', 'Input settings');
});

test('supports render prop children on Tabs.Item', async () => {
  // Arrange
  render(<WithRenderProps.Component />);
  const securityTab = screen.getAllByRole('tab', { name: 'Security' })[0];

  // Assert (initial state)
  expect(
    screen.getAllByRole('tab', { name: 'General (current)' })[0]
  ).toBeInTheDocument();
  expect(securityTab).toBeInTheDocument();

  // Act
  await user.click(securityTab);

  // Assert
  expect(
    screen.getAllByRole('tab', { name: 'Security (current)' })[0]
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole('tab', { name: 'General' })[0]
  ).toBeInTheDocument();
});
