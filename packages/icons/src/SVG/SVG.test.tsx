import React from 'react';
import { render, screen } from '@testing-library/react';
import { SVG } from './SVG';

test('supports default fill color', () => {
  render(
    <SVG title="svg">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('fill')).toEqual('currentcolor');
});

test('supports default size', () => {
  render(
    <SVG title="svg">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('width')).toEqual('24');
});

test('supports size prop', () => {
  render(
    <SVG title="svg" size={30}>
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('width')).toEqual('30');
});

test('supports fill prop', () => {
  render(
    <SVG title="svg" fill="#fafafa">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('fill')).toEqual('#fafafa');
});

test('accepts custom styles prop className', () => {
  render(
    <SVG title="svg" className="custom-class-name">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('class')).toMatch(/custom-class-name/);
});

test('renders <svg> element', () => {
  render(
    <SVG title="svg">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg instanceof SVGElement).toBeTruthy();
});
