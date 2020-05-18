import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

test('supports default fill color', () => {
  render(<Icon title="svg" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('fill')).toEqual('currentcolor');
});

test('supports default size', () => {
  render(<Icon title="svg" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('width')).toEqual('24');
});

test('supports size prop', () => {
  render(<Icon title="svg" size={30} />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('width')).toEqual('30');
});

test('supports fill prop', () => {
  render(<Icon title="svg" fill="orange" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('fill')).toEqual('orange');
});
