import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from './ContextualHelp.stories';

const { Basic } = composeStories(stories);

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
  render(<Basic />);

  expect(screen.queryByText(/This feature explains/)).toBeNull();
});

test('shows popover on click', async () => {
  render(<Basic />);

  const button = screen.getByRole('button');

  await userEvent.click(button);

  expect(screen.getByText(/This feature explains/)).toBeInTheDocument();
});

test('closes popover on outside click', async () => {
  render(<Basic defaultOpen={true} />);

  await userEvent.click(document.body);

  expect(screen.queryByText(/This feature explains/)).not.toBeInTheDocument();
});

test('closes popover on Escape key', async () => {
  render(<Basic defaultOpen={true} />);

  await userEvent.keyboard('{Escape}');

  expect(screen.queryByText(/This feature explains/)).not.toBeInTheDocument();
});
