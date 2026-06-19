/* eslint-disable testing-library/no-node-access */
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Basic } from './Toast.stories';
import { getToastQueue, useToast } from './ToastQueue';

// Manually adding container for ToastProvider to prevent log errors
beforeEach(() => {
  const container = document.createElement('div');
  container.id = 'storybook-root';
  document.body.appendChild(container);
});

afterEach(() => {
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
  let addToast: ReturnType<typeof useToast>['addToast'];
  let clearToasts: ReturnType<typeof useToast>['clearToasts'];

  render(
    <ToastHelper
      onToast={toast => {
        addToast = toast.addToast;
        clearToasts = toast.clearToasts;
      }}
    />
  );

  return {
    get addToast() {
      return addToast;
    },
    get clearToasts() {
      return clearToasts;
    },
  };
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

describe('addToast timeout resolution', () => {
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
});
