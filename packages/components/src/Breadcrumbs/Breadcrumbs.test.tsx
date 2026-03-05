import { act, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { vi } from 'vitest';
import { mockMatchMedia, renderWithOverlay } from '../test.utils';
import {
  AutoCollapse,
  Basic,
  Collapsed,
  ManyItems,
} from './Breadcrumbs.stories';
import { BreadcrumbsItem } from './BreadcrumbsItem';
import { useAutoCollapse } from './useAutoCollapse';

const user = userEvent.setup();

window.matchMedia = mockMatchMedia(['(width < 640px)']);

test('renders breadcrumb items correctly', () => {
  render(<Basic.Component />);

  const home = screen.getByText('Home');
  const breadcrumb1 = screen.getByText('Breadcrumb1');
  const breadcrumb2 = screen.getByText('Breadcrumb2');

  expect(home).toBeInTheDocument();
  expect(breadcrumb1).toBeInTheDocument();
  expect(breadcrumb2).toBeInTheDocument();
});

test('collapses breadcrumbs for too many items', async () => {
  renderWithOverlay(<Collapsed.Component />);

  const ellipsis = screen.getByText('...');
  const home = screen.getByText('Home');
  const breadcrumb3 = screen.getByText('Breadcrumb3');

  await user.click(ellipsis);

  expect(ellipsis).toBeInTheDocument();
  expect(home).toBeInTheDocument();
  expect(breadcrumb3).toBeInTheDocument();
  ['Breadcrumb1', 'Breadcrumb2'].forEach(text => {
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

test('handles breadcrumbs links correctly', () => {
  render(<Basic.Component />);

  const link = screen.getByText('Home');
  const linkItems = screen.getAllByRole('link');

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://marigold-ui.io');
  expect(linkItems.length).toBe(3);
});

test('renders chevron separators', () => {
  render(<Basic.Component />);

  const chevrons = screen.queryAllByTestId('breadcrumb-chevronright');

  expect(chevrons.length).toBeGreaterThan(0);
});

test('collapses breadcrumbs with links for too many items', () => {
  renderWithOverlay(<Collapsed.Component />);

  // First
  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  // Last
  expect(screen.getByRole('link', { name: 'Breadcrumb3' })).toBeInTheDocument();

  // Collapsed items
  expect(
    screen.getByRole('button', { name: 'These breadcrumbs are hidden' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Breadcrumb1' })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Breadcrumb2' })
  ).not.toBeInTheDocument();
});

test('expand collapsed items', async () => {
  renderWithOverlay(<Collapsed.Component />);

  const ellipsis = screen.getByRole('button', {
    name: 'These breadcrumbs are hidden',
  });
  await user.click(ellipsis);

  expect(
    screen.getByRole('menuitem', { name: 'Breadcrumb1' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('menuitem', { name: 'Breadcrumb2' })
  ).toBeInTheDocument();
});

test('auto-collapse starts collapsed with current item visible', () => {
  renderWithOverlay(<AutoCollapse.Component />);

  // Auto mode starts collapsed (ellipsis + current).
  // In jsdom there is no ResizeObserver, so it stays collapsed.
  expect(
    screen.getByRole('link', { name: 'Event Details Page' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'These breadcrumbs are hidden' })
  ).toBeInTheDocument();

  // All other items are hidden inside the ellipsis menu
  expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Events' })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Summer Festival' })
  ).not.toBeInTheDocument();
});

test('maxVisibleItems=2 shows only ellipsis and current item', () => {
  renderWithOverlay(<ManyItems.Component />);

  // Current (last) item is visible
  expect(
    screen.getByRole('link', { name: 'Breadcrumb 30' })
  ).toBeInTheDocument();
  // Ellipsis is visible
  expect(
    screen.getByRole('button', { name: 'These breadcrumbs are hidden' })
  ).toBeInTheDocument();
  // First item is hidden (maxVisibleItems=2 hides everything except current)
  expect(
    screen.queryByRole('link', { name: 'Breadcrumb 1' })
  ).not.toBeInTheDocument();
});

test('BreadcrumbsItem renders nothing', () => {
  render(
    <BreadcrumbsItem href="https://example.com">Test Item</BreadcrumbsItem>
  );

  expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
});

test('forwards ref as object ref', () => {
  const ref = createRef<HTMLOListElement>();

  render(<Basic.Component ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLOListElement);
});

test('does not collapse when items equal maxVisibleItems', () => {
  render(<Basic.Component maxVisibleItems={3} />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb1')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb2')).toBeInTheDocument();
  expect(screen.queryByText('...')).not.toBeInTheDocument();
});

test('does not collapse when maxVisibleItems is less than 2', () => {
  render(<Basic.Component maxVisibleItems={1} />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb1')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb2')).toBeInTheDocument();
  expect(screen.queryByText('...')).not.toBeInTheDocument();
});

test('forwards callback ref', () => {
  const ref = vi.fn();

  render(<Basic.Component ref={ref} />);

  expect(ref).toHaveBeenCalledWith(expect.any(HTMLOListElement));
});

// --- useAutoCollapse hook tests ---

let capturedOnResize: (() => void) | undefined;

vi.mock('@react-aria/utils', async importOriginal => {
  const actual = await importOriginal<typeof import('@react-aria/utils')>();
  return {
    ...actual,
    useResizeObserver: ({ onResize }: { onResize: () => void }) => {
      capturedOnResize = onResize;
    },
  };
});

const createMockElement = (
  clientWidth: number,
  scrollWidth: number
): HTMLOListElement =>
  ({ clientWidth, scrollWidth }) as unknown as HTMLOListElement;

test('useAutoCollapse expands when container has space', () => {
  const ref = { current: createMockElement(500, 300) };

  const { result } = renderHook(() => useAutoCollapse(ref, 5));

  // Initial state is MIN_VISIBLE (2)
  expect(result.current).toBe(2);

  // Trigger resize — no overflow, should expand
  act(() => {
    capturedOnResize!();
  });

  expect(result.current).toBe(3);
});

test('useAutoCollapse collapses when container overflows', () => {
  const ref = { current: createMockElement(500, 300) };

  const { result } = renderHook(() => useAutoCollapse(ref, 5));

  // Expand first
  act(() => {
    capturedOnResize!();
  });
  expect(result.current).toBe(3);

  // Simulate overflow
  ref.current = createMockElement(300, 500);
  act(() => {
    capturedOnResize!();
  });

  expect(result.current).toBe(2);
});

test('useAutoCollapse does not expand below previous overflow width', () => {
  const ref = { current: createMockElement(500, 300) };

  const { result } = renderHook(() => useAutoCollapse(ref, 5));

  // Expand
  act(() => {
    capturedOnResize!();
  });
  expect(result.current).toBe(3);

  // Overflow at width 300
  ref.current = createMockElement(300, 500);
  act(() => {
    capturedOnResize!();
  });
  expect(result.current).toBe(2);

  // Resize but still at or below overflow width — should not expand
  ref.current = createMockElement(300, 200);
  act(() => {
    capturedOnResize!();
  });
  expect(result.current).toBe(2);

  // Resize above overflow width — should expand
  ref.current = createMockElement(400, 200);
  act(() => {
    capturedOnResize!();
  });
  expect(result.current).toBe(3);
});

test('useAutoCollapse resets when totalItems changes', () => {
  const ref = { current: createMockElement(500, 300) };

  const { result, rerender } = renderHook(
    ({ total }) => useAutoCollapse(ref, total),
    { initialProps: { total: 5 } }
  );

  // Expand
  act(() => {
    capturedOnResize!();
  });
  expect(result.current).toBe(3);

  // Change totalItems — should reset to MIN_VISIBLE
  rerender({ total: 8 });
  expect(result.current).toBe(2);
});

test('useAutoCollapse no-ops when ref is null', () => {
  const ref = { current: null };

  const { result } = renderHook(() => useAutoCollapse(ref, 5));

  expect(result.current).toBe(2);

  // onResize with null ref should not throw
  act(() => {
    capturedOnResize!();
  });

  expect(result.current).toBe(2);
});
