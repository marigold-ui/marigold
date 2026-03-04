import { render, renderHook, screen } from '@testing-library/react';
import { createRef } from 'react';
import { mockMatchMedia } from '../test.utils';
import { useTopNavigationContext } from './Context';
import {
  WithBreadcrumbs,
  WithSearchField,
  WithTabs,
} from './TopNavigation.stories';

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
  render(<WithTabs.Component />);

  const header = screen.getByRole('banner');

  expect(header).toBeInTheDocument();
});

test('renders all three slots', () => {
  render(<WithTabs.Component />);

  const nav = screen.getByRole('banner');
  // eslint-disable-next-line testing-library/no-node-access
  expect(nav.children).toHaveLength(3);
});

test('applies sticky classes when sticky prop is set', () => {
  render(<WithBreadcrumbs.Component />);

  const nav = screen.getByRole('banner');

  expect(nav.className).toMatch(/sticky/);
  expect(nav.className).toMatch(/top-0/);
  expect(nav.className).toMatch(/z-1/);
});

test('forwards ref to header element', () => {
  const ref = createRef<HTMLElement>();

  render(<WithTabs.Component ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLElement);
  expect(ref.current?.tagName).toBe('HEADER');
});

test('applies grid layout classes', () => {
  render(<WithTabs.Component />);

  const nav = screen.getByRole('banner');

  expect(nav.className).toMatch(/grid/);
  expect(nav.className).toMatch(/grid-template-areas/);
});

test('applies min-w-0 to all slots', () => {
  render(<WithTabs.Component />);

  const nav = screen.getByRole('banner');
  // eslint-disable-next-line testing-library/no-node-access
  const slots = nav.children;

  Array.from(slots).forEach(slot => {
    expect(slot.className).toMatch(/min-w-0/);
  });
});

test('applies overflow-x-auto to middle slot', () => {
  render(<WithTabs.Component />);

  const middleSlot = screen.getByRole('navigation', {
    name: 'Global navigation',
  });

  expect(middleSlot.className).toMatch(/overflow-x-auto/);
});

test('applies alignX class to middle slot', () => {
  render(<WithSearchField.Component />);

  const middleSlot = screen.getByRole('navigation', {
    name: 'SearchField',
  });

  expect(middleSlot.className).toMatch(/justify-center/);
});
