import React from 'react';
import { render, screen } from '@testing-library/react';
import { Facebook } from './social';
import { ArrowUp } from './ui';

test('supports default size', () => {
  render(<Facebook data-testid="svg" />);
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveAttribute('width', '24px');
  expect(svg).toHaveAttribute('height', '24px');
});

test('supports size prop', () => {
  render(<Facebook data-testid="svg" size={30} />);
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveAttribute('width', '30px');
  expect(svg).toHaveAttribute('height', '30px');
});

test('supports className', () => {
  render(<Facebook data-testid="svg" className="fill-primary-500" />);
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveClass('fill-primary-500');
});

test('forwards ref', () => {
  const ref = React.createRef<SVGSVGElement>();
  render(<ArrowUp ref={ref} />);

  expect(ref.current).toBeInstanceOf(SVGElement);
});
