import React from 'react';
import { render, screen } from '@testing-library/react';
import { Facebook } from './social/Facebook';

test('supports default fill color', () => {
  render(<Facebook title="svg" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg).toHaveStyle('fill: currentcolor');
});

test('supports default size', () => {
  render(<Facebook title="svg" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg).toHaveStyle('width: 24px');
  expect(svg).toHaveStyle('height: 24px');
});

test('supports size prop', () => {
  render(<Facebook title="svg" size={30} />);
  const svg = screen.getByTitle(/svg/);

  expect(svg).toHaveStyle('width: 30px');
  expect(svg).toHaveStyle('height: 30px');
});

test('supports fill prop', () => {
  render(<Facebook title="svg" fill="orange" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg).toHaveStyle('fill: orange');
});
