import React from 'react';
import { render, screen } from '@testing-library/react';
import { Facebook } from './social/Facebook';

test('supports default fill color', () => {
  render(<Facebook title="svg" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('fill')).toEqual('currentcolor');
});

test('supports default size', () => {
  render(<Facebook title="svg" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('width')).toEqual('24');
});

test('supports size prop', () => {
  render(<Facebook title="svg" size={30} />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('width')).toEqual('30');
});

test('supports fill prop', () => {
  render(<Facebook title="svg" fill="orange" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('fill')).toEqual('orange');
});
