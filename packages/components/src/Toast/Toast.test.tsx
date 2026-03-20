/* eslint-disable testing-library/no-node-access */
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Basic } from './Toast.stories';
import { queue } from './ToastProvider';
import { useToast } from './ToastQueue';

// Manually adding container for ToastProvider to prevent log errors
beforeEach(() => {
  const container = document.createElement('div');
  container.id = 'storybook-root';
  document.body.appendChild(container);
});

afterEach(() => {
  act(() => {
    queue.clear();
  });
  const container = document.getElementById('storybook-root');
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
});

// Helper to call useToast inside a component context
const ToastHelper = ({
  onToast,
}: {
  onToast: (toast: ReturnType<typeof useToast>) => void;
}) => {
  onToast(useToast());
  return null;
};

describe('Toast', () => {
  let addToast: ReturnType<typeof useToast>['addToast'];
  let clearToasts: ReturnType<typeof useToast>['clearToasts'];

  // Render helper component to extract hook values
  beforeEach(() => {
    render(
      <ToastHelper
        onToast={toast => {
          addToast = toast.addToast;
          clearToasts = toast.clearToasts;
        }}
      />
    );
  });

  test('renders without crashing', async () => {
    render(<Basic.Component />);
    await act(async () => {
      addToast({ title: 'Dies ist eine Toast-Nachricht!' });
    });
    const toast = await screen.findByText('Dies ist eine Toast-Nachricht!');

    expect(toast).toBeInTheDocument();
  });

  it.each(['info', 'success', 'error', 'warning'])(
    'renders %s variant',
    async variant => {
      render(<Basic.Component />);
      await act(async () => {
        addToast({
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
    render(<Basic.Component />);
    const button = screen.getByRole('button', { name: 'Show Toast' });

    await userEvent.click(button);
    const toast = await screen.findByText('Dies ist eine Toast-Nachricht!');
    await act(async () => {
      clearToasts();
    });

    await waitFor(() => expect(toast).not.toBeInTheDocument());
  });

  test('renders action when provided', async () => {
    render(<Basic.Component />);
    const actionButton = <button>Undo</button>;

    await act(async () => {
      addToast({
        title: 'Test Toast with Action',
        description: 'This toast has an action',
        action: actionButton,
      });
    });

    const actionElement = screen.getByText('Undo');

    expect(actionElement).toBeInTheDocument();
  });

  test('useToast returns stable function references (safe for useEffect deps)', () => {
    const results: ReturnType<typeof useToast>[] = [];

    const TestComponent = () => {
      const toast = useToast();
      results.push(toast);
      return null;
    };

    const { rerender } = render(<TestComponent />);
    rerender(<TestComponent />);

    expect(results).toHaveLength(2);
    expect(results[0].addToast).toBe(results[1].addToast);
    expect(results[0].clearToasts).toBe(results[1].clearToasts);
    expect(results[0].removeToast).toBe(results[1].removeToast);
  });
});
