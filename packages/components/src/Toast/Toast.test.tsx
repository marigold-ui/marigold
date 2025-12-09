/* eslint-disable testing-library/no-node-access */
import { composeStories } from '@storybook/react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from './Toast.stories';
import { useToast } from './ToastQueue';

const { Basic } = composeStories(stories);

// Manually adding container for ToastProvider to prevent log errors
beforeEach(() => {
  const container = document.createElement('div');
  container.id = 'storybook-root';
  document.body.appendChild(container);
});

afterEach(() => {
  const { clearToasts } = useToast();
  act(() => {
    clearToasts();
  });
  const container = document.getElementById('storybook-root');
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
});

describe('Toast', () => {
  const { addToast, clearToasts } = useToast();
  test('renders without crashing', async () => {
    render(<Basic />);
    await act(async () => {
      await addToast({ title: 'Dies ist eine Toast-Nachricht!' });
    });
    const toast = screen.getByText('Dies ist eine Toast-Nachricht!');

    expect(toast).toBeInTheDocument();
  });

  it.each(['info', 'success', 'error', 'warning'])(
    'renders %s variant',
    async variant => {
      render(<Basic />);
      await act(async () => {
        await addToast({
          title: `${variant} Toast`,
          description: `This is a ${variant} toast.`,
          variant: `${variant}` as 'info' | 'success' | 'error' | 'warning',
        });
      });

      const icon = screen.getByTestId('toast-icon');

      expect(icon).toBeInTheDocument();
    }
  );

  test('clearToasts function works', async () => {
    render(<Basic />);
    const button = screen.getByRole('button', { name: 'Show Toast' });

    await userEvent.click(button);
    const toast = screen.getByText('Dies ist eine Toast-Nachricht!');
    await act(async () => {
      await clearToasts();
    });

    expect(toast).not.toBeInTheDocument();
  });

  test('renders action when provided', async () => {
    render(<Basic />);
    const actionButton = <button>Undo</button>;

    await act(async () => {
      await addToast({
        title: 'Test Toast with Action',
        description: 'This toast has an action',
        action: actionButton,
      });
    });

    const actionElement = screen.getByText('Undo');

    expect(actionElement).toBeInTheDocument();
  });
});
