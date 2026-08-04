import { render, renderHook, screen } from '@testing-library/react';
import type { RefObject } from 'react';
import { mockMatchMedia } from '../test.utils';
import { useTopNavigationContext } from './Context';
import { WithBreadcrumbs, WithSearchField } from './TopNavigation.stories';

/**
 * We need to mock `matchMedia` because jsdom does not
 * implement it (required by useSmallScreen).
 */
window.matchMedia = mockMatchMedia([]);

test('throws when context is used outside TopNavigation', () => {
  expect(() => renderHook(() => useTopNavigationContext())).toThrow(
    'useTopNavigationContext must be used within a <TopNavigation> component'
  );
});

test('renders a header element with the banner role', () => {
  render(<WithBreadcrumbs.Component />);

  const header = screen.getByRole('banner');

  expect(header).toBeInTheDocument();
});

test('renders all three slots', () => {
  render(<WithBreadcrumbs.Component />);

  const nav = screen.getByRole('banner');
  // eslint-disable-next-line testing-library/no-node-access
  expect(nav.children).toHaveLength(3);
});

test('applies sticky classes by default', () => {
  render(<WithBreadcrumbs.Component />);

  const nav = screen.getByRole('banner');

  expect(nav.className).toMatch(/sticky/);
  expect(nav.className).toMatch(/top-0/);
  expect(nav.className).toMatch(/z-1/);
});

test('does not apply sticky classes when sticky is false', () => {
  render(<WithBreadcrumbs.Component sticky={false} />);

  const nav = screen.getByRole('banner');

  expect(nav.className).not.toMatch(/sticky/);
  expect(nav.className).not.toMatch(/top-0/);
});

test('forwards ref to header element', () => {
  const ref: RefObject<HTMLElement | null> = { current: null };

  render(<WithBreadcrumbs.Component ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLElement);
  expect(ref.current?.tagName).toBe('HEADER');
});

test('applies grid layout classes', () => {
  render(<WithBreadcrumbs.Component />);

  const nav = screen.getByRole('banner');

  expect(nav.className).toMatch(/grid/);
  expect(nav.className).toMatch(/grid-template-areas/);
});

test('applies min-w-0 to all slots', () => {
  render(<WithBreadcrumbs.Component />);

  const nav = screen.getByRole('banner');
  // eslint-disable-next-line testing-library/no-node-access
  const slots = nav.children;

  Array.from(slots).forEach(slot => {
    expect(slot.className).toMatch(/min-w-0/);
  });
});

test('applies alignX class to middle slot', () => {
  render(<WithSearchField.Component />);

  const middleSlot = screen.getByRole('navigation', {
    name: 'SearchField',
  });

  expect(middleSlot.className).toMatch(/justify-center/);
});
