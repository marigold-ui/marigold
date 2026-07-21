import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithOverlay } from '../test.utils';
import { Basic, DismissControlsWithCallbacks } from './Tray.stories';

// Lets the hidden-pass test drive the `useIsHidden()` guard (DSTSUP-261).
// `vi.mock` is hoisted to module scope by Vitest, so it can't be nested inside
// the `describe` block below — but the partial mock keeps every other export of
// `@react-aria/collections` real and defaults `useIsHidden` to `false`, which is
// exactly what the real hook returns outside a hidden pass. So the rest of the
// file behaves identically; only the scoped block toggles it to `true`.
const hiddenState = vi.hoisted(() => ({ isHidden: false }));
vi.mock('@react-aria/collections', async importActual => {
  const actual = await importActual<typeof import('@react-aria/collections')>();
  return { ...actual, useIsHidden: () => hiddenState.isHidden };
});

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
    LayoutGroup: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    // `MotionFeatures` (src/lazyMotion.tsx) wraps motion subtrees in
    // `LazyMotion`; mock it as a pass-through so children render without
    // loading the real feature bundle.
    LazyMotion: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    domMax: {},
    useMotionValue: () => ({ get: () => 0, set: () => {} }),
    useReducedMotion: () => false,
    animate: mockAnimate,
    cubicBezier: () => [0, 0, 0, 0],
  };
});

// `TrayModal` now creates its motion components via `create` from
// `motion/react-m` (the lazy `m` entry), so the drag wrapper lives here.
vi.mock('motion/react-m', async () => {
  const React = await import('react');
  return {
    create: (Component: React.ComponentType<any>) =>
      React.forwardRef(function MotionWrapper(props: any, ref: any) {
        const { onDragEnd, ...rest } = props;
        if (onDragEnd) dragState.onDragEnd = onDragEnd;
        return React.createElement(Component, { ...rest, ref });
      }),
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

// DSTSUP-261 hidden-pass guard contract.
//
// During a collection's hidden build pass, `useIsHidden()` is `true` and the
// Tray must render its children WITHOUT mounting the portalled modal — otherwise
// a `Select`/`ComboBox` that builds its collection through a Tray would leak an
// empty modal into the DOM. This locks that behavior so the guard can't be
// dropped. The provider/consumer must share one `HiddenContext` for the real
// `useIsHidden()` to ever return `true`; when a dependency-resolution split
// breaks that sharing, the Tray's DOM probe takes over (covered by
// `Select.hiddenContext.test.tsx`).
//
// Scoped to its own block so the `useIsHidden` toggle is reset here and never
// leaks into the tests above (the mock itself is necessarily file-scoped).
describe('hidden collection pass', () => {
  beforeEach(() => {
    hiddenState.isHidden = false;
  });

  test('renders children without mounting the modal', async () => {
    hiddenState.isHidden = true;

    renderWithOverlay(<Basic.Component />);

    // Children render inline (so the collection can still be built) even though
    // the trigger was never pressed...
    expect(screen.getByText('Tray Title')).toBeInTheDocument();
    // ...but no portalled modal/overlay is mounted during the hidden pass.
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
