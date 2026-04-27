import { render, screen } from '@testing-library/react';
import type { RefObject } from 'react';
import { describe, expect, test } from 'vitest';
import { DesignTicket } from './custom/DesignTicket';
import { Search } from './index';

describe.each([
  ['custom icon', DesignTicket],
  ['lucide icon', Search],
] as const)('%s', (_, Icon) => {
  test('renders default size 24x24', () => {
    render(<Icon data-testid="svg" />);

    const svg = screen.getByTestId('svg');

    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  test('supports size prop', () => {
    render(<Icon data-testid="svg" size={30} />);

    expect(screen.getByTestId('svg')).toHaveAttribute('width', '30');
    expect(screen.getByTestId('svg')).toHaveAttribute('height', '30');
  });

  test('maps color prop to stroke', () => {
    render(<Icon data-testid="svg" color="red" />);

    expect(screen.getByTestId('svg')).toHaveAttribute('stroke', 'red');
  });

  test('supports strokeWidth prop', () => {
    render(<Icon data-testid="svg" strokeWidth={3} />);

    expect(screen.getByTestId('svg')).toHaveAttribute('stroke-width', '3');
  });

  test('preserves consumer className', () => {
    render(<Icon data-testid="svg" className="text-primary-500" />);

    expect(screen.getByTestId('svg')).toHaveClass('text-primary-500');
  });

  test('forwards ref', () => {
    const ref: RefObject<SVGSVGElement | null> = { current: null };

    render(<Icon ref={ref} />);

    expect(ref.current).toBeInstanceOf(SVGElement);
  });

  test('sets aria-hidden when no a11y props are provided', () => {
    render(<Icon data-testid="svg" />);

    expect(screen.getByTestId('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  test('omits aria-hidden when aria-label is provided', () => {
    render(<Icon data-testid="svg" aria-label="thing" />);

    expect(screen.getByTestId('svg')).not.toHaveAttribute('aria-hidden');
  });
});
