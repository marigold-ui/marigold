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

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb1')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb2')).toBeInTheDocument();
});

test('collapses breadcrumbs for too many items', async () => {
  renderWithOverlay(<Collapsed.Component />);

  await user.click(screen.getByText('...'));

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb3')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb1')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb2')).toBeInTheDocument();
});

test('handles breadcrumbs links correctly', () => {
  render(<Basic.Component />);

  expect(screen.getByText('Home')).toHaveAttribute(
    'href',
    'https://marigold-ui.io'
  );
  expect(screen.getAllByRole('link')).toHaveLength(3);
});

test('renders chevron separators', () => {
  render(<Basic.Component />);

  expect(
    screen.queryAllByTestId('breadcrumb-chevronright').length
  ).toBeGreaterThan(0);
});

test('collapses breadcrumbs with links for too many items', () => {
  renderWithOverlay(<Collapsed.Component />);

  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Breadcrumb3' })).toBeInTheDocument();
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

  await user.click(
    screen.getByRole('button', { name: 'These breadcrumbs are hidden' })
  );

  expect(
    screen.getByRole('menuitem', { name: 'Breadcrumb1' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('menuitem', { name: 'Breadcrumb2' })
  ).toBeInTheDocument();
});

test('auto-collapse starts expanded showing all items', () => {
  renderWithOverlay(<AutoCollapse.Component />);

  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Events' })).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Summer Festival' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Event Details Page' })
  ).toBeInTheDocument();
});

test('show only ellipsis and current item when collapsed to minimum', () => {
  renderWithOverlay(<ManyItems.Component />);

  expect(
    screen.getByRole('link', { name: 'Breadcrumb 30' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'These breadcrumbs are hidden' })
  ).toBeInTheDocument();
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

test('does not collapse when items equal visible limit', () => {
  render(<Basic.Component maxVisibleItems={3} />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb1')).toBeInTheDocument();
  expect(screen.getByText('Breadcrumb2')).toBeInTheDocument();
  expect(screen.queryByText('...')).not.toBeInTheDocument();
});

test('does not collapse when visible items limit is less than 2', () => {
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

test('useAutoCollapse starts fully expanded', () => {
  const ref = { current: createMockElement(500, 300) };

  const { result } = renderHook(() => useAutoCollapse(ref, 5));

  expect(result.current).toBe(5);
});

test('useAutoCollapse collapses when container overflows', () => {
  const ref = { current: createMockElement(300, 500) };
  const { result } = renderHook(() => useAutoCollapse(ref, 5));

  act(() => {
    capturedOnResize!();
  });

  expect(result.current).toBe(4);
});

test('useAutoCollapse does not expand below previous overflow width', () => {
  const ref = { current: createMockElement(300, 500) };
  const { result } = renderHook(() => useAutoCollapse(ref, 5));

  act(() => {
    capturedOnResize!();
  });

  ref.current = createMockElement(300, 200);
  act(() => {
    capturedOnResize!();
  });

  expect(result.current).toBe(4);
});

test('useAutoCollapse expands when container grows beyond overflow width', () => {
  const ref = { current: createMockElement(300, 500) };
  const { result } = renderHook(() => useAutoCollapse(ref, 5));

  act(() => {
    capturedOnResize!();
  });

  ref.current = createMockElement(400, 200);
  act(() => {
    capturedOnResize!();
  });

  expect(result.current).toBe(5);
});

test('useAutoCollapse resets when totalItems changes', () => {
  const ref = { current: createMockElement(300, 500) };
  const { result, rerender } = renderHook(
    ({ total }) => useAutoCollapse(ref, total),
    { initialProps: { total: 5 } }
  );

  act(() => {
    capturedOnResize!();
  });

  rerender({ total: 8 });

  expect(result.current).toBe(8);
});

test('useAutoCollapse no-ops when ref is null', () => {
  const ref = { current: null };
  const { result } = renderHook(() => useAutoCollapse(ref, 5));

  act(() => {
    capturedOnResize!();
  });

  expect(result.current).toBe(5);
});
