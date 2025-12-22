import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ContextualHelpProps } from './ContextualHelp';
import { Basic } from './ContextualHelp.stories';

const BasicComponent = (props: Partial<ContextualHelpProps>) => (
  <div id="storybook-root">
    <Basic.Component {...props} />
  </div>
);

/**
 * We need to mock `matchMedia` because JSOM does not
 * implements it.
 */
const mockMatchMedia = (matches: string[]) =>
  vi.fn().mockImplementation(query => ({
    matches: matches.includes(query),
  }));

window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

let onBlurSpy = vi.fn();
let onFocusChangeSpy = vi.fn();
let onFocusSpy = vi.fn();

afterEach(() => {
  onBlurSpy.mockClear();
  onFocusChangeSpy.mockClear();
  onFocusSpy.mockClear();
});

test('does not render popover by default', () => {
  render(<BasicComponent />);

  expect(screen.queryByText(/This feature explains/)).toBeNull();
});

test('shows popover on click', async () => {
  render(<BasicComponent />);

  const button = screen.getByRole('button');

  await userEvent.click(button);

  expect(screen.getByText(/This feature explains/)).toBeInTheDocument();
});

test('closes popover on outside click', async () => {
  render(<BasicComponent defaultOpen={true} />);

  await userEvent.click(document.body);

  expect(screen.queryByText(/This feature explains/)).not.toBeInTheDocument();
});

test('closes popover on Escape key', async () => {
  render(<BasicComponent defaultOpen={true} />);

  await userEvent.keyboard('{Escape}');

  expect(screen.queryByText(/This feature explains/)).not.toBeInTheDocument();
});
