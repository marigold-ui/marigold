import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExampleIcon } from './ExampleIcon';

test('supports default fill color', () => {
  render(<ExampleIcon title="svg" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('fill')).toEqual('currentcolor');
});

test('supports default size', () => {
  render(<ExampleIcon title="svg" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('width')).toEqual('24');
});

test('supports size prop', () => {
  render(<ExampleIcon title="svg" size={30} />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('width')).toEqual('30');
});

test('supports fill prop', () => {
  render(<ExampleIcon title="svg" fill="orange" />);
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('fill')).toEqual('orange');
});
