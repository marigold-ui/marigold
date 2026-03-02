import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  ApplicationShell,
  NavBarPattern,
  WithSearchField,
} from './TopNavigation.stories';

/**
 * We need to mock `matchMedia` because jsdom does not
 * implement it (required by Menu's useSmallScreen).
 */
window.matchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

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
});
