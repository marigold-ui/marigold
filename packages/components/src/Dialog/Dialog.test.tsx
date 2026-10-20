import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { MockInstance, vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { renderWithOverlay } from '../test.utils';
import { Dialog } from './Dialog';
import { Basic, VeryLongContent, WithFormValidation } from './Dialog.stories';

const user = userEvent.setup();

let errorMock: MockInstance;

beforeEach(() => {
  errorMock = vi.spyOn(console, 'error').mockImplementation(() => null);
});

afterEach(() => {
  errorMock.mockRestore();
});

test('optionally renders a close button', async () => {
  // Basic story has closeButton=true by default
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  await waitFor(() => expect(dialog).toBeVisible());

  // By name, not position: the positional lookup hid DST-1769.
  const closeButton = within(dialog).getByRole('button', { name: 'Close' });

  await user.click(closeButton);
  await waitFor(() => expect(dialog).not.toBeVisible());
});

test('supports closing the dialog with escape key', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible());
  await user.keyboard('{Escape}');

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

test('close Dialog by clicking on the Underlay', async () => {
  // Basic story has dismissable=true by default
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');

  await user.click(document.body);

  await waitFor(() => expect(dialog).not.toBeVisible());
});

test('supports title for accessibility reasons', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-labelledby');

  const headline = screen.getByText('Enable notifications');
  expect(headline).toHaveAttribute('id');

  expect(headline.id).toBe(dialog.getAttribute('aria-labelledby'));
});

test('supports dialog contents', async () => {
  renderWithOverlay(<Basic.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-labelledby');

  // Basic story has content about notifications
  const dialogContent = screen.getByText(/Would you like to receive/);
  expect(dialogContent).toBeInTheDocument();
});

test('supports focus and open dialog with keyboard', async () => {
  renderWithOverlay(<Basic.Component />);

  await user.tab();
  await user.keyboard('[Enter]');

  const dialog = screen.getByRole('dialog');
  await waitFor(() => {
    expect(dialog).toBeVisible();
  });
});

test('renders nothing by default', () => {
  renderWithOverlay(<Basic.Component />);

  const dialog = screen.queryByRole('dialog');
  expect(dialog).not.toBeInTheDocument();
});

test('supports children as render function receiving close', async () => {
  // WithFormValidation uses children={({ close }) => ...} pattern
  renderWithOverlay(<WithFormValidation.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  const dialog = screen.getByRole('dialog');
  await waitFor(() => expect(dialog).toBeVisible());

  // The dialog rendered — meaning the children-as-function worked
  expect(screen.getByText('Please enter validation code')).toBeInTheDocument();
});

test('form validation works within dialog', async () => {
  renderWithOverlay(<WithFormValidation.Component />);

  const button = screen.getByText('Open');
  await user.click(button);

  // Try to submit without entering code
  const submitButton = screen.getByText('Submit');
  await user.click(submitButton);

  // Form validation should show error (Code field is required)
  // The dialog should remain open due to validation
  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

test('VeryLongContent story renders with proper structure', async () => {
  renderWithOverlay(<VeryLongContent.Component />);

  const button = screen.getByText('Open Dialog with Long Content');

  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('type', 'button');
});

describe('accessible name warning', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <MarigoldProvider theme={theme}>{children}</MarigoldProvider>
  );
  // No story renders an unnamed dialog, and one shouldn't: it would put the
  // anti-pattern into Storybook. The unnamed and labelled cases stay inline.
  // Only Marigold's own warning counts, React Aria logs its own on top.
  const isDialogWarning = (call: unknown[]) =>
    String(call[0]).startsWith('[Dialog]');

  let warnSpy: MockInstance;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  test('warns once per dialog, however often it re-renders', () => {
    const unnamed = (size?: string) => (
      <Dialog open size={size}>
        <Dialog.Content>Unnamed</Dialog.Content>
      </Dialog>
    );
    const { rerender } = render(unnamed(), { wrapper });
    rerender(unnamed('small'));
    rerender(unnamed());

    expect(warnSpy.mock.calls.filter(isDialogWarning)).toHaveLength(1);
  });

  test.each([
    ['a Dialog.Title', <Basic.Component key="title" open />],
    [
      'an aria-label',
      <Dialog key="label" open aria-label="Edit event">
        <Dialog.Content>Content</Dialog.Content>
      </Dialog>,
    ],
    [
      'an aria-labelledby',
      <Dialog key="labelledby" open aria-labelledby="external">
        <Dialog.Content>Content</Dialog.Content>
      </Dialog>,
    ],
  ])('does not warn for a dialog with %s', (_, element) => {
    render(element, { wrapper });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(warnSpy.mock.calls.filter(isDialogWarning)).toHaveLength(0);
  });
});
