import React from 'react';
import { render, screen } from '@testing-library/react';
import { SVG } from './SVG';
import { ThemeProvider } from '../../hooks';

const theme = {
  sizes: {
    none: 0,
    small: 16,
  },
  colors: {
    red: '#ffa8a8',
    info: 'blue',
  },
};

test('renders svg', () => {
  render(<SVG data-testid="svg" />);
  const svg = screen.getByTestId('svg');
  expect(svg instanceof SVGElement).toBeTruthy();
});

test('supports fill color', () => {
  render(
    <SVG data-testid="svg" fill="red">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('fill: red');
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

test('supports responsive sizing', () => {
  render(
    <SVG data-testid="svg" size={[32, 64]}>
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('width: 32px');
  expect(svg).toHaveStyle('height: 32px');
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

test('supports custom width instead of default size', () => {
  render(
    <ThemeProvider theme={theme}>
      <SVG data-testid="svg" width={16}>
        <path d="M9.9 20.113V13.8415H14" />
      </SVG>
    </ThemeProvider>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('width: 16px');
  expect(svg).toHaveStyle('height: 24px');
});

test('supports custom height instead of default size', () => {
  render(
    <ThemeProvider theme={theme}>
      <SVG data-testid="svg" height={16}>
        <path d="M9.9 20.113V13.8415H14" />
      </SVG>
    </ThemeProvider>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveStyle('width: 24px');
  expect(svg).toHaveStyle('height: 16px');
});

test('supports width and height from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <SVG data-testid="svg" width="small" height="small">
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

test('forwards ref', () => {
  const ref = React.createRef<SVGElement>();
  render(<SVG ref={ref} />);

  expect(ref.current).toBeInstanceOf(SVGElement);
});

test('css prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <SVG css={{ color: 'red' }} data-testid="svg" />
    </ThemeProvider>
  );
  const svg = screen.getByTestId('svg');

  expect(svg).toHaveStyle(`color: ${theme.colors.red}`);
});
