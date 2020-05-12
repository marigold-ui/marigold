import React from 'react';
import { render, screen } from '@testing-library/react';
import { Svg } from './Svg';

test('supports default fill color', () => {
  render(
    <Svg title="svg">
      <path d="M9.9 20.113V13.8415H14" />
    </Svg>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('fill')).toEqual('currentcolor');
});

test('supports default size', () => {
  render(
    <Svg title="svg">
      <path d="M9.9 20.113V13.8415H14" />
    </Svg>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('width')).toEqual('24');
});

test('supports size prop', () => {
  render(
    <Svg title="svg" size={30}>
      <path d="M9.9 20.113V13.8415H14" />
    </Svg>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('width')).toEqual('30');
});

test('renders <svg> element', () => {
  render(
    <Svg title="svg">
      <path d="M9.9 20.113V13.8415H14" />
    </Svg>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg instanceof SVGElement).toBeTruthy();
});
