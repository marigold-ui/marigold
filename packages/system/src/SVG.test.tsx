import React from 'react';
import { render, screen } from '@testing-library/react';
import { SVG } from './SVG';
import { ThemeProvider } from './useTheme';

const theme = {
  sizes: {
    none: 0,
    small: 16,
  },
  colors: {
    info: 'blue',
  },
};

test('renders svg', () => {
  render(<SVG data-testid="svg" />);
  const svg = screen.getByTestId('svg');
  expect(svg instanceof SVGElement).toBeTruthy();
});

test('normalizes <svg>', () => {
  render(<SVG data-testid="svg" />);
  const svg = screen.getByTestId('svg');
  expect(svg).toHaveStyle('display: block');
  expect(svg).toHaveStyle('max-width: 100%');
});

test('supports default fill color', () => {
  render(
    <SVG data-testid="svg">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('fill: currentcolor');
});

test('supports default size', () => {
  render(
    <SVG data-testid="svg">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('width: 24px');
  expect(svg).toHaveStyle('height: 24px');
});

test('supports size prop', () => {
  render(
    <SVG data-testid="svg" size={30}>
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('width: 30px');
  expect(svg).toHaveStyle('height: 30px');
});

test('supports size prop with string', () => {
  render(
    <SVG data-testid="svg" size="30">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('width: 30px');
  expect(svg).toHaveStyle('height: 30px');
});

test('supports size from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <SVG data-testid="svg" size="small">
        <path d="M9.9 20.113V13.8415H14" />
      </SVG>
    </ThemeProvider>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('width: 16px');
  expect(svg).toHaveStyle('height: 16px');
});

test('supports fill prop', () => {
  render(
    <SVG data-testid="svg" fill="#fafafa">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('fill: #fafafa');
});

test('supports fill from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <SVG data-testid="svg" fill="info">
        <path d="M9.9 20.113V13.8415H14" />
      </SVG>
    </ThemeProvider>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('fill: blue');
});

test('accepts custom styles prop className', () => {
  render(
    <SVG data-testid="svg" className="custom-class-name">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg.getAttribute('class')).toMatch(/custom-class-name/);
});

test('renders <svg> element', () => {
  render(
    <SVG data-testid="svg">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg instanceof SVGElement).toBeTruthy();
});
