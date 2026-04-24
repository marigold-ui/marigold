import { render, screen } from '@testing-library/react';
import type { RefObject } from 'react';
import { DesignTicket } from './custom/DesignTicket';
import { Search } from './index';

test('custom icon renders default size', () => {
  render(<DesignTicket data-testid="svg" />);
  const svg = screen.getByTestId('svg');
  expect(svg).toHaveAttribute('width', '24');
  expect(svg).toHaveAttribute('height', '24');
});

test('custom icon supports size prop', () => {
  render(<DesignTicket data-testid="svg" size={30} />);
  expect(screen.getByTestId('svg')).toHaveAttribute('width', '30');
});

test('custom icon supports className', () => {
  render(<DesignTicket data-testid="svg" className="text-primary-500" />);
  expect(screen.getByTestId('svg')).toHaveClass('text-primary-500');
});

test('custom icon forwards ref', () => {
  const ref: RefObject<SVGSVGElement | null> = { current: null };
  render(<DesignTicket ref={ref} />);
  expect(ref.current).toBeInstanceOf(SVGElement);
});

test('re-exported lucide icon renders', () => {
  render(<Search data-testid="svg" />);
  expect(screen.getByTestId('svg')).toBeInTheDocument();
});
