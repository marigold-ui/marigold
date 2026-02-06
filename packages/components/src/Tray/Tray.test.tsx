import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithOverlay } from '../test.utils';
import { Basic, DismissControlsWithCallbacks } from './Tray.stories';

const user = userEvent.setup();

test('renders trigger button', () => {
  renderWithOverlay(<Basic.Component />);

  expect(screen.getByRole('button', { name: 'Open Tray' })).toBeInTheDocument();
});

test('tray content is not visible when closed', () => {
  renderWithOverlay(<Basic.Component />);

  expect(screen.queryByText('Tray Title')).not.toBeInTheDocument();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('calls onOpenChange callback when closing', async () => {
  renderWithOverlay(<DismissControlsWithCallbacks.Component />);
  await user.click(screen.getByRole('button', { name: 'Open Tray' }));
  await waitFor(() => {
    expect(screen.getByText('Tray is open')).toBeInTheDocument();
  });

  await user.click(screen.getByRole('button', { name: 'Cancel' }));

  await waitFor(() => {
    expect(screen.getByText('Tray is closed')).toBeInTheDocument();
  });
  expect(screen.getByText(/Tray closed/)).toBeInTheDocument();
});

test('disables keyboard dismiss when keyboardDismissable is false', async () => {
  renderWithOverlay(<Basic.Component keyboardDismissable={false} />);
  await user.click(screen.getByRole('button', { name: 'Open Tray' }));
  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  await user.keyboard('{Escape}');

  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

const dragState = vi.hoisted(() => ({
  onDragEnd: undefined as
    | ((
        e: unknown,
        info: { offset: { y: number }; velocity: { y: number } }
      ) => void)
    | undefined,
}));

const mockAnimate = vi.hoisted(() => vi.fn());

vi.mock('motion/react', async () => {
  const React = await import('react');
  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    motion: {
      create: (Component: React.ComponentType<any>) =>
        React.forwardRef(function MotionWrapper(props: any, ref: any) {
          const { onDragEnd, ...rest } = props;
          if (onDragEnd) dragState.onDragEnd = onDragEnd;
          return React.createElement(Component, { ...rest, ref });
        }),
    },
    useMotionValue: () => ({ get: () => 0, set: () => {} }),
    animate: mockAnimate,
    cubicBezier: () => [0, 0, 0, 0],
  };
});

beforeEach(() => {
  dragState.onDragEnd = undefined;
  mockAnimate.mockClear();
});

test('drag down far enough dismisses the tray', async () => {
  renderWithOverlay(<Basic.Component />);
  await user.click(screen.getByRole('button', { name: 'Open Tray' }));
  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  expect(dragState.onDragEnd).toBeDefined();

  act(() => {
    dragState.onDragEnd!({}, { offset: { y: 1000 }, velocity: { y: 0 } });
  });

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

test('fast swipe dismisses the tray', async () => {
  renderWithOverlay(<Basic.Component />);
  await user.click(screen.getByRole('button', { name: 'Open Tray' }));
  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  act(() => {
    dragState.onDragEnd!({}, { offset: { y: 10 }, velocity: { y: 15 } });
  });

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

test('small drag snaps tray back', async () => {
  renderWithOverlay(<Basic.Component />);
  await user.click(screen.getByRole('button', { name: 'Open Tray' }));
  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  act(() => {
    dragState.onDragEnd!({}, { offset: { y: 10 }, velocity: { y: 0 } });
  });

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(mockAnimate).toHaveBeenCalled();
});
