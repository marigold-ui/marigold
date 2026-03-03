import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { mockMatchMedia } from '../test.utils';
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

describe('TopNavigation', () => {
  it('renders a nav element with the correct aria-label', () => {
    render(<NavBarPattern.Component />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('renders all three slots', () => {
    render(<NavBarPattern.Component />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'User menu' })
    ).toBeInTheDocument();
  });

  it('applies sticky classes when sticky prop is set', () => {
    render(<ApplicationShell.Component />);
    const nav = screen.getByRole('navigation', {
      name: 'Application navigation',
    });
    expect(nav.className).toMatch(/sticky/);
    expect(nav.className).toMatch(/top-0/);
    expect(nav.className).toMatch(/z-1/);
  });

  it('renders with search field and breadcrumbs', () => {
    render(<WithSearchField.Component />);
    const nav = screen.getByRole('navigation', {
      name: 'Search navigation',
    });
    expect(nav).toBeInTheDocument();
    expect(screen.getByText('Event Details')).toBeInTheDocument();
  });

  it('forwards ref to nav element', () => {
    const ref = createRef<HTMLElement>();
    render(<NavBarPattern.Component ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('NAV');
  });

  it('applies grid layout classes', () => {
    render(<NavBarPattern.Component />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav.className).toMatch(/grid/);
    expect(nav.style.gridTemplateAreas).toBe('"start middle end"');
  });

  describe('overflow protection', () => {
    it('applies min-w-0 to all slots', () => {
      render(<NavBarPattern.Component />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const slots = nav.querySelectorAll('[style*="grid-area"]');
      slots.forEach(slot => {
        expect(slot.className).toMatch(/min-w-0/);
      });
    });

    it('applies overflow-x-auto to middle slot', () => {
      render(<NavBarPattern.Component />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const middleSlot = nav.querySelector('[style*="grid-area: middle"]');
      expect(middleSlot?.className).toMatch(/overflow-x-auto/);
    });
  });
});
