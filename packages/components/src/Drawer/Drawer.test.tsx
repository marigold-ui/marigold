import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithOverlay } from '../test.utils';
import { Basic, LeftPlacement } from './Drawer.stories';

let isSmallScreen = false;
const mockMatchMedia = () =>
  vi.fn().mockImplementation(() => {
    return {
      matches: isSmallScreen,
    };
  });
window.matchMedia = mockMatchMedia();

const user = userEvent.setup();

test('renders nothing if isOpen is not set', () => {
  renderWithOverlay(<Basic.Component />);
  expect(screen.queryByText('Drawer Title')).toBeNull();
});

test('opens/closes via trigger', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  expect(screen.queryByText('Drawer Title')).not.toBeInTheDocument();

  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  await user.click(button);

  expect(drawer).not.toBeInTheDocument();
});

test('slides from the left', async () => {
  renderWithOverlay(<LeftPlacement.Component />);

  const button = screen.getByRole('button', { name: 'Open Left Drawer' });
  await user.click(button);

  const drawerModal = screen.getByTestId('drawer-modal');
  expect(drawerModal).toBeInTheDocument();
  expect(drawerModal).toHaveClass(
    'placement-left:entering:animate-slide-in-left'
  );
  expect(drawerModal).toHaveClass(
    'placement-left:exiting:animate-slide-out-left'
  );
  expect(drawerModal).toHaveClass('placement-left:inset-y-3');
  expect(drawerModal).toHaveClass('placement-left:left-3');
});

test('can be closed with esc key', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(drawer).not.toBeInTheDocument();
});

test('disable closing via esc key', async () => {
  renderWithOverlay(<Basic.Component keyboardDismissable={false} />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(drawer).toBeInTheDocument();
});

test('can be closed via button with [slot="close"]', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  const close = screen.getByRole('button', { name: 'Close' });
  await user.click(close);

  expect(drawer).not.toBeInTheDocument();
});

test('has "complementary" role by default', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  expect(screen.getByRole('complementary')).toBeInTheDocument();
});

test('allows to set other landmark roles', async () => {
  renderWithOverlay(<Basic.Component role="navigation" />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('able to show a close button', async () => {
  renderWithOverlay(<Basic.Component closeButton />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  expect(screen.getByLabelText('Dismiss drawer')).toBeInTheDocument();
});

test('able to close via close button', async () => {
  renderWithOverlay(<Basic.Component closeButton />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  const close = screen.getByLabelText('Dismiss drawer');
  await user.click(close);

  expect(drawer).not.toBeInTheDocument();
});

test('uses modal on small screens', async () => {
  isSmallScreen = true;
  renderWithOverlay(<Basic.Component closeButton />);

  const button = screen.getByRole('button', { name: 'Open Drawer' });
  await user.click(button);

  const drawer = screen.getByText('Drawer Title');
  expect(drawer).toBeInTheDocument();

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
});
