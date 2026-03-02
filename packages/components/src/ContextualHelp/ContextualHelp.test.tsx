import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockMatchMedia, renderWithOverlay } from '../test.utils';
import { Basic } from './ContextualHelp.stories';

window.matchMedia = mockMatchMedia(['(width < 640px)']);

let onBlurSpy = vi.fn();
let onFocusChangeSpy = vi.fn();
let onFocusSpy = vi.fn();

afterEach(() => {
  onBlurSpy.mockClear();
  onFocusChangeSpy.mockClear();
  onFocusSpy.mockClear();
});

test('does not render popover by default', () => {
  renderWithOverlay(<Basic.Component />);

  expect(screen.queryByText(/This feature explains/)).toBeNull();
});

test('shows popover on click', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByRole('button');

  await userEvent.click(button);

  expect(screen.getByText(/This feature explains/)).toBeInTheDocument();
});

test('closes popover on outside click', async () => {
  renderWithOverlay(<Basic.Component defaultOpen={true} />);

  await userEvent.click(document.body);

  expect(screen.queryByText(/This feature explains/)).not.toBeInTheDocument();
});

test('closes popover on Escape key', async () => {
  renderWithOverlay(<Basic.Component defaultOpen={true} />);

  await userEvent.keyboard('{Escape}');

  expect(screen.queryByText(/This feature explains/)).not.toBeInTheDocument();
});
