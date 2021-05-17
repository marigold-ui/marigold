import React from 'react';
import { render, screen } from '@testing-library/react';
import { SVG } from './SVG';
import { useStyles } from '@marigold/system';

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
  const TestComponent: React.FC = ({ children, ...props }) => {
    const classNames = useStyles({ css: { margin: '8px' } });
    return (
      <SVG title="svg" className={classNames} {...props}>
        <path d="M9.9 20.113V13.8415H14" />
      </SVG>
    );
  };

  const { getByTitle } = render(<TestComponent>text</TestComponent>);
  const testelem = getByTitle('svg');
  const text = getComputedStyle(testelem);

  expect(text.margin).toEqual('8px');
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
