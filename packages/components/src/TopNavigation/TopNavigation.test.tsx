import { render, renderHook, screen } from '@testing-library/react';
import { createRef } from 'react';
import { mockMatchMedia } from '../test.utils';
import { useTopNavigationContext } from './Context';
import {
  ApplicationShell,
  NavBarPattern,
  WithSearchField,
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
  render(<NavBarPattern.Component />);

  const header = screen.getByRole('banner');

  expect(header).toBeInTheDocument();
});

test('renders all three slots', () => {
  render(<NavBarPattern.Component />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'User menu' })).toBeInTheDocument();
});

test('applies sticky classes when sticky prop is set', () => {
  render(<ApplicationShell.Component />);

  const nav = screen.getByRole('banner');

  expect(nav.className).toMatch(/sticky/);
  expect(nav.className).toMatch(/top-0/);
  expect(nav.className).toMatch(/z-1/);
});

test('renders with search field and breadcrumbs', () => {
  render(<WithSearchField.Component />);

  const nav = screen.getByRole('banner');

  expect(nav).toBeInTheDocument();
  expect(screen.getByRole('searchbox')).toBeInTheDocument();
});

test('forwards ref to header element', () => {
  const ref = createRef<HTMLElement>();

  render(<NavBarPattern.Component ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLElement);
  expect(ref.current?.tagName).toBe('HEADER');
});

test('applies grid layout classes', () => {
  render(<NavBarPattern.Component />);

  const nav = screen.getByRole('banner');

  expect(nav.className).toMatch(/grid/);
  expect(nav.className).toMatch(/grid-template-areas/);
});

test('applies min-w-0 to all slots', () => {
  render(<NavBarPattern.Component />);

  const nav = screen.getByRole('banner');
  // eslint-disable-next-line testing-library/no-node-access
  const slots = nav.children;

  Array.from(slots).forEach(slot => {
    expect(slot.className).toMatch(/min-w-0/);
  });
});

test('applies overflow-x-auto to middle slot', () => {
  render(<NavBarPattern.Component />);

  const middleSlot = screen.getByRole('navigation', {
    name: 'Global navigation',
  });

  expect(middleSlot.className).toMatch(/overflow-x-auto/);
});
