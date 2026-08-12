/* eslint-disable testing-library/no-node-access */
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Basic } from './Toast.stories';
import type { UndoToastOptions } from './ToastQueue';
import { getToastQueue, useToast } from './ToastQueue';

// Manually adding container for ToastProvider to prevent log errors
beforeEach(() => {
  const container = document.createElement('div');
  container.id = 'storybook-root';
  document.body.appendChild(container);
});

afterEach(() => {
  vi.useRealTimers();
  act(() => {
    getToastQueue().clear();
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

function setupToastHook() {
  // `onToast` runs during `render`, so the value is assigned before the return.
  let toast!: ReturnType<typeof useToast>;
  render(<ToastHelper onToast={value => (toast = value)} />);
  return toast;
}

describe('Toast', () => {
  test('renders without crashing', async () => {
    const { addToast } = setupToastHook();
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
      const { addToast } = setupToastHook();
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
    const { clearToasts } = setupToastHook();
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
    const { addToast } = setupToastHook();
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

  test('calls onClose when the toast is dismissed', async () => {
    const { addToast } = setupToastHook();
    const onClose = vi.fn();
    render(<Basic.Component />);
    await act(async () => {
      addToast({ title: 'Product deleted', onClose });
    });

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when a toast is closed by key', async () => {
    const { addToast, removeToast } = setupToastHook();
    const onClose = vi.fn();
    render(<Basic.Component />);
    let key = '';
    await act(async () => {
      key = addToast({ title: 'Product deleted', onClose });
    });

    await act(async () => {
      removeToast(key);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when the whole queue is cleared', async () => {
    const { addToast, clearToasts } = setupToastHook();
    const onClose = vi.fn();
    render(<Basic.Component />);
    await act(async () => {
      addToast({ title: 'Product deleted', onClose });
    });

    await act(async () => {
      clearToasts();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when the toast times out', async () => {
    vi.useFakeTimers();
    const { addToast } = setupToastHook();
    const onClose = vi.fn();
    render(<Basic.Component />);
    await act(async () => {
      addToast({ title: 'Product deleted', onClose });
    });

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('hides the close button when closeButton is false', async () => {
    const { addToast } = setupToastHook();
    render(<Basic.Component />);

    await act(async () => {
      addToast({ title: 'Product deleted', closeButton: false });
    });

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument();
  });

  test('keeps the close button on a toast that never auto-dismisses', async () => {
    const { addToast } = setupToastHook();
    render(<Basic.Component />);

    await act(async () => {
      addToast({
        title: 'Upload failed',
        variant: 'error',
        closeButton: false,
      });
    });

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
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
    expect(results[0].addUndoToast).toBe(results[1].addUndoToast);
    expect(results[0].clearToasts).toBe(results[1].clearToasts);
    expect(results[0].removeToast).toBe(results[1].removeToast);
  });
});

describe('addUndoToast', () => {
  // Arrange for every case below: one undo toast on screen, spies for both
  // outcomes.
  const showUndoToast = async (options: Partial<UndoToastOptions> = {}) => {
    const { addUndoToast, clearToasts } = setupToastHook();
    const onUndo = vi.fn();
    const onCommit = vi.fn();
    render(<Basic.Component />);

    await act(async () => {
      addUndoToast({ title: 'List deleted', onUndo, onCommit, ...options });
    });

    return { onUndo, onCommit, clearToasts };
  };

  const undoButton = () => screen.getByRole('button', { name: /^Undo:/ });

  test('names the undo button after the title, so stacked toasts differ', async () => {
    await showUndoToast({ title: '“Newsletter August” deleted' });

    expect(
      screen.getByRole('button', { name: 'Undo: “Newsletter August” deleted' })
    ).toBeInTheDocument();
  });

  test('renders no close button, so nothing looks like dismiss but commits', async () => {
    await showUndoToast();

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument();
  });

  test('commits when the window runs out', async () => {
    vi.useFakeTimers();
    const { onCommit } = await showUndoToast();

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(onCommit).toHaveBeenCalledTimes(1);
  });

  test('calls onUndo when the undo button is pressed', async () => {
    const { onUndo } = await showUndoToast();

    await userEvent.click(undoButton());

    expect(onUndo).toHaveBeenCalledTimes(1);
  });

  test('does not commit when the undo button is pressed', async () => {
    const { onCommit } = await showUndoToast();

    await userEvent.click(undoButton());

    expect(onCommit).not.toHaveBeenCalled();
  });

  test('closes the toast when the undo button is pressed', async () => {
    await showUndoToast();

    await userEvent.click(undoButton());

    await waitFor(() =>
      expect(screen.queryByText('List deleted')).not.toBeInTheDocument()
    );
  });

  test('commits once when the queue is cleared', async () => {
    const { onCommit, clearToasts } = await showUndoToast();

    await act(async () => {
      clearToasts();
    });

    expect(onCommit).toHaveBeenCalledTimes(1);
  });
});

describe('timeout resolution', () => {
  let addSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addSpy = vi.spyOn(getToastQueue(), 'add');
  });
  afterEach(() => {
    addSpy.mockRestore();
  });

  const lastTimeout = () =>
    (addSpy.mock.calls.at(-1)?.[1] as { timeout?: number } | undefined)
      ?.timeout;

  it.each([
    ['success', 5000],
    ['info', 5000],
    ['warning', undefined],
    ['error', undefined],
  ] as const)(
    'uses the %s default when no timeout is passed',
    async (variant, expected) => {
      const { addToast } = setupToastHook();
      await act(async () => {
        addToast({ title: 'x', variant });
      });
      expect(lastTimeout()).toBe(expected);
    }
  );

  test('defaults to 5000ms when no variant is given', async () => {
    const { addToast } = setupToastHook();
    await act(async () => {
      addToast({ title: 'x' });
    });
    expect(lastTimeout()).toBe(5000);
  });

  test('honors an explicit timeout above the minimum', async () => {
    const { addToast } = setupToastHook();
    await act(async () => {
      addToast({ title: 'x', variant: 'success', timeout: 8000 });
    });
    expect(lastTimeout()).toBe(8000);
  });

  test('clamps an explicit timeout up to the 5000ms minimum', async () => {
    const { addToast } = setupToastHook();
    await act(async () => {
      addToast({ title: 'x', variant: 'success', timeout: 1000 });
    });
    expect(lastTimeout()).toBe(5000);
  });

  test('treats timeout 0 as persist (no auto-dismiss)', async () => {
    const { addToast } = setupToastHook();
    await act(async () => {
      addToast({ title: 'x', variant: 'success', timeout: 0 });
    });
    expect(lastTimeout()).toBeUndefined();
  });

  test('addUndoToast falls back to the default window when timeout is 0', async () => {
    const { addUndoToast } = setupToastHook();
    await act(async () => {
      addUndoToast({
        title: 'x',
        timeout: 0,
        onUndo: vi.fn(),
        onCommit: vi.fn(),
      });
    });
    expect(lastTimeout()).toBe(5000);
  });
});
