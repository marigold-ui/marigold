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

test('renders items as links with separators', () => {
  render(<Basic.Component />);

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(3);
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
    'href',
    'https://marigold-ui.io'
  );
  expect(screen.getByRole('link', { name: 'Breadcrumb1' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Breadcrumb2' })).toBeInTheDocument();
  expect(
    screen.queryAllByTestId('breadcrumb-chevronright').length
  ).toBeGreaterThan(0);
});

test('hides middle items behind ellipsis when collapsed', () => {
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

test('reveals hidden items as menu items on ellipsis click', async () => {
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

test('shows all items when maxVisibleItems is auto and space allows', () => {
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

test('shows only ellipsis and current item when collapsed to minimum', () => {
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

test('does not collapse when items fit within visible limit', () => {
  render(<Basic.Component maxVisibleItems={3} />);

  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Breadcrumb1' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Breadcrumb2' })).toBeInTheDocument();
  expect(screen.queryByText('...')).not.toBeInTheDocument();
});

test('does not collapse when maxVisibleItems is less than 2', () => {
  render(<Basic.Component maxVisibleItems={1} />);

  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Breadcrumb1' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Breadcrumb2' })).toBeInTheDocument();
  expect(screen.queryByText('...')).not.toBeInTheDocument();
});

test('forwards ref', () => {
  const objectRef = createRef<HTMLOListElement>();
  const callbackRef = vi.fn();

  render(<Basic.Component ref={objectRef} />);
  render(<Basic.Component ref={callbackRef} />);

  expect(objectRef.current).toBeInstanceOf(HTMLOListElement);
  expect(callbackRef).toHaveBeenCalledWith(expect.any(HTMLOListElement));
});

test('BreadcrumbsItem renders nothing on its own', () => {
  render(
    <BreadcrumbsItem href="https://example.com">Test Item</BreadcrumbsItem>
  );

  expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
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

const createMockHiddenDiv = (
  itemWidths: number[],
  ellipsisWidth: number
): HTMLDivElement => {
  const breadcrumbEls = itemWidths.map(w => ({ offsetWidth: w }));
  const ellipsisEl = { offsetWidth: ellipsisWidth };

  return {
    querySelectorAll: (selector: string) => {
      if (selector === '[data-hidden-breadcrumb]') return breadcrumbEls;
      return [];
    },
    querySelector: (selector: string) => {
      if (selector === '[data-hidden-ellipsis]') return ellipsisEl;
      return null;
    },
  } as unknown as HTMLDivElement;
};

const createMockContainer = (clientWidth: number): HTMLOListElement =>
  ({ clientWidth }) as unknown as HTMLOListElement;

const originalGetComputedStyle = window.getComputedStyle;

describe('useAutoCollapse', () => {
  beforeEach(() => {
    window.getComputedStyle = vi.fn((el: Element) => {
      if (el instanceof Element) {
        return originalGetComputedStyle(el);
      }
      return { gap: '8' } as CSSStyleDeclaration;
    }) as typeof window.getComputedStyle;
  });

  afterEach(() => {
    window.getComputedStyle = originalGetComputedStyle;
  });

  test('shows all items when they fit', () => {
    // 5 items: 50+50+50+50+50 = 250, plus 4 gaps of 8 = 282. Container=300 → fits
    const containerRef = { current: createMockContainer(300) };
    const hiddenRef = {
      current: createMockHiddenDiv([50, 50, 50, 50, 50], 30),
    };
    const { result } = renderHook(() =>
      useAutoCollapse(containerRef, hiddenRef, 5)
    );

    act(() => capturedOnResize!());

    expect(result.current).toBe(5);
  });

  test('collapses to minimum when nothing fits', () => {
    // 5 items each 80px: total = 400 + 4*8 = 432. Container = 200.
    // first(80) + gap(8) + ellipsis(31) + gap(8) + last(80) = 207 > 200 → stays at 2
    const containerRef = { current: createMockContainer(200) };
    const hiddenRef = {
      current: createMockHiddenDiv([80, 80, 80, 80, 80], 30),
    };
    const { result } = renderHook(() =>
      useAutoCollapse(containerRef, hiddenRef, 5)
    );

    act(() => capturedOnResize!());

    expect(result.current).toBe(2);
  });

  test('shows intermediate items when space allows', () => {
    // 5 items: [60, 40, 40, 40, 60]. Ellipsis: 30. Gap: 8. Container: 250.
    // first(60) + gap(8) + ellipsis(31) + gap(8) + last(60) = 167
    // + item[3](40) + gap(8) = 215 → fits
    // + item[2](40) + gap(8) = 263 > 250 → stop → count = 3
    const containerRef = { current: createMockContainer(250) };
    const hiddenRef = {
      current: createMockHiddenDiv([60, 40, 40, 40, 60], 30),
    };
    const { result } = renderHook(() =>
      useAutoCollapse(containerRef, hiddenRef, 5)
    );

    act(() => capturedOnResize!());
    expect(result.current).toBe(3);
  });

  test('does nothing when refs are null', () => {
    const containerRef = { current: null };
    const hiddenRef = { current: null };
    const { result } = renderHook(() =>
      useAutoCollapse(containerRef, hiddenRef, 5)
    );

    act(() => capturedOnResize!());

    expect(result.current).toBe(5);
  });

  test('resets when item count changes', async () => {
    const containerRef = { current: createMockContainer(200) };
    const hiddenRef = {
      current: createMockHiddenDiv([80, 80, 80, 80, 80], 30),
    };
    const { result, rerender } = renderHook(
      ({ total }) => useAutoCollapse(containerRef, hiddenRef, total),
      { initialProps: { total: 5 } }
    );

    act(() => capturedOnResize!());
    containerRef.current = createMockContainer(800);
    hiddenRef.current = createMockHiddenDiv([40, 40, 40], 30);
    // eslint-disable-next-line testing-library/no-unnecessary-act -- async act needed to flush requestAnimationFrame in useLayoutEffect
    await act(async () => rerender({ total: 3 }));

    expect(result.current).toBe(3);
  });
});
