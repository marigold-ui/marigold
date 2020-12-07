import React from 'react';
import { render, screen } from '@testing-library/react';
import { Svg } from './Svg';
import { useStyles } from '@marigold/system';

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

test('supports fill prop', () => {
  render(
    <Svg title="svg" fill="#fafafa">
      <path d="M9.9 20.113V13.8415H14" />
    </Svg>
  );
  const svg = screen.getByTitle(/svg/);

  expect(svg.getAttribute('fill')).toEqual('#fafafa');
});

test('accepts custom styles prop className', () => {
  const TestComponent: React.FC = ({ children, ...props }) => {
    const classNames = useStyles({ margin: '8px' });
    return (
      <Svg title="svg" className={classNames} {...props}>
        <path d="M9.9 20.113V13.8415H14" />
      </Svg>
    );
  };

  const { getByTitle } = render(<TestComponent>text</TestComponent>);
  const testelem = getByTitle('svg');
  const text = getComputedStyle(testelem);

  expect(text.margin).toEqual('8px');
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
