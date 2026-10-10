import { render, screen } from '@testing-library/react';
import { SidebarToggleIcon } from './SidebarToggleIcon';

test('renders with default props (expanded)', () => {
  render(<SidebarToggleIcon data-testid="icon" />);

  const svg = screen.getByTestId('icon');

  expect(svg).toBeInTheDocument();
  expect(svg).toHaveAttribute('width', '24');
  expect(svg).toHaveAttribute('height', '24');
});

test('renders in collapsed state', () => {
  render(<SidebarToggleIcon data-testid="icon" expanded={false} />);

  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('applies custom className', () => {
  render(<SidebarToggleIcon data-testid="icon" className="text-red-500" />);

  const svg = screen.getByTestId('icon');

  expect(svg).toHaveClass('text-red-500');
  expect(svg).toHaveClass('shrink-0');
});

test('applies custom size', () => {
  render(<SidebarToggleIcon data-testid="icon" size={32} />);

  const svg = screen.getByTestId('icon');

  expect(svg).toHaveAttribute('width', '32');
  expect(svg).toHaveAttribute('height', '32');
});

test('spreads additional SVG props', () => {
  render(<SidebarToggleIcon aria-label="Toggle sidebar" data-testid="icon" />);

  const svg = screen.getByTestId('icon');

  expect(svg).toHaveAttribute('aria-label', 'Toggle sidebar');
});

// Safari ignores the CSS `d` property, so the chevron needs a `d` attribute.
test('draws the chevron with a d attribute in both states', () => {
  const { rerender } = render(<SidebarToggleIcon data-testid="icon" />);
  const chevron = () =>
    // eslint-disable-next-line testing-library/no-node-access
    screen.getByTestId('icon').querySelectorAll('path')[1];

  expect(chevron()).toHaveAttribute('d', 'M 16 15 L 13 12 L 16 9');

  rerender(<SidebarToggleIcon data-testid="icon" expanded={false} />);

  expect(chevron()).toHaveAttribute('d', 'M 13 15 L 16 12 L 13 9');
});
