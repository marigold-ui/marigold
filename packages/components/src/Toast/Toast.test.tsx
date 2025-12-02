import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from './Toast.stories';
import { useToast } from './ToastQueue';

const { Basic } = composeStories(stories, {
  decorators: Story => (
    <div id="storybook-root">
      <Story />
    </div>
  ),
});

afterEach(() => {
  const { clearToasts } = useToast();
  clearToasts();
});

describe('Toast', () => {
  const { addToast, clearToasts } = useToast();
  test('renders without crashing', async () => {
    render(<Basic />);
    await addToast({ title: 'Dies ist eine Toast-Nachricht!' });
    const toast = screen.getByText('Dies ist eine Toast-Nachricht!');

    expect(toast).toBeInTheDocument();
  });

  it.each(['info', 'success', 'error', 'warning'])(
    'renders %s variant',
    async variant => {
      render(<Basic />);
      await addToast({
        title: `${variant} Toast`,
        description: `This is a ${variant} toast.`,
        variant: `${variant}` as 'info' | 'success' | 'error' | 'warning',
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
    await clearToasts();

    expect(toast).not.toBeInTheDocument();
  });

  test('renders action when provided', async () => {
    render(<Basic />);
    const actionButton = <button>Undo</button>;

    await addToast({
      title: 'Test Toast with Action',
      description: 'This toast has an action',
      action: actionButton,
    });

    const actionElement = screen.getByText('Undo');

    expect(actionElement).toBeInTheDocument();
  });
});
