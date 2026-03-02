import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
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
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
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
    expect(screen.getByText('Events')).toBeInTheDocument();
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
  });

  describe('mobile responsiveness', () => {
    afterEach(() => {
      window.matchMedia = mockMatchMedia([]);
    });

    it('uses two-row grid layout on small screens', () => {
      window.matchMedia = mockMatchMedia(['(width < 640px)']);
      render(<NavBarPattern.Component />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav.className).toMatch(/grid/);
    });

    it('keeps all three slots visible on small screens', () => {
      window.matchMedia = mockMatchMedia(['(width < 640px)']);
      render(<NavBarPattern.Component />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'User menu' })
      ).toBeInTheDocument();
    });

    it('hides verbose user info on small screens', () => {
      window.matchMedia = mockMatchMedia(['(width < 640px)']);
      render(<NavBarPattern.Component />);
      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
    });
  });
});
