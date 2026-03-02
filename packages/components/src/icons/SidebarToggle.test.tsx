import { render, screen } from '@testing-library/react';
import { SidebarToggle } from './SidebarToggle';

test('renders with default props (expanded)', () => {
  render(<SidebarToggle data-testid="icon" />);
  const svg = screen.getByTestId('icon');
  expect(svg).toBeInTheDocument();
  expect(svg).toHaveAttribute('width', '24');
  expect(svg).toHaveAttribute('height', '24');
});

test('renders in collapsed state', () => {
  render(<SidebarToggle data-testid="icon" expanded={false} />);
  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('applies custom className', () => {
  render(<SidebarToggle data-testid="icon" className="text-red-500" />);
  const svg = screen.getByTestId('icon');
  expect(svg).toHaveClass('text-red-500');
  expect(svg).toHaveClass('shrink-0');
});

test('applies custom size', () => {
  render(<SidebarToggle data-testid="icon" size={32} />);
  const svg = screen.getByTestId('icon');
  expect(svg).toHaveAttribute('width', '32');
  expect(svg).toHaveAttribute('height', '32');
});

test('spreads additional SVG props', () => {
  render(<SidebarToggle aria-label="Toggle sidebar" data-testid="icon" />);
  const svg = screen.getByTestId('icon');
  expect(svg).toHaveAttribute('aria-label', 'Toggle sidebar');
});
