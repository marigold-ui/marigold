import React from 'react';
import { render, screen } from '@testing-library/react';
import { Facebook } from './social';
import { ArrowUp } from './ui';

test('supports default size', () => {
  render(<Facebook data-testid="svg" />);
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('width: 24px');
  expect(svg).toHaveStyle('height: 24px');
});

test('supports size prop', () => {
  render(<Facebook data-testid="svg" size={30} />);
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('width: 30px');
  expect(svg).toHaveStyle('height: 30px');
});

test('supports fill prop', () => {
  render(<Facebook data-testid="svg" fill="orange" />);
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('fill: orange');
});

test('forwards ref', () => {
  const ref = React.createRef<SVGElement>();
  render(<ArrowUp ref={ref} />);

  expect(ref.current).toBeInstanceOf(SVGElement);
});
