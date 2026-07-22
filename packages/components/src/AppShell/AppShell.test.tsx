/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Basic } from './AppShell.stories';

describe('AppShell', () => {
  test('renders sidebar, header, and main landmarks', () => {
    render(<Basic.Component />);

    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('applies the grid layout to the container', () => {
    render(<Basic.Component />);

    const container = screen.getByRole('main').parentElement;

    expect(container).toHaveClass('grid');
  });

  test('does not create an interior scroll container on main', () => {
    render(<Basic.Component />);

    // Scroll lives on the document; main must not scroll.
    expect(screen.getByRole('main')).not.toHaveClass('overflow-y-auto');
  });

  test('absorbs Sidebar.Provider so the toggle is wired without extra setup', () => {
    render(<Basic.Component />);

    const toggle = screen.getByRole('button', { name: /toggle navigation/i });

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
