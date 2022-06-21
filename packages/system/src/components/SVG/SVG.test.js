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
    info: 'blue',
  },
};
test('renders svg', () => {
  render(React.createElement(SVG, { 'data-testid': 'svg' }));
  const svg = screen.getByTestId('svg');
  expect(svg instanceof SVGElement).toBeTruthy();
});
test('normalizes <svg>', () => {
  render(React.createElement(SVG, { 'data-testid': 'svg' }));
  const svg = screen.getByTestId('svg');
  expect(svg).toHaveStyle('display: block');
  expect(svg).toHaveStyle('max-width: 100%');
});
test('supports default fill color', () => {
  render(
    React.createElement(
      SVG,
      { 'data-testid': 'svg' },
      React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('fill: currentcolor');
});
test('supports default size', () => {
  render(
    React.createElement(
      SVG,
      { 'data-testid': 'svg' },
      React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('width: 24px');
  expect(svg).toHaveStyle('height: 24px');
});
test('supports size prop', () => {
  render(
    React.createElement(
      SVG,
      { 'data-testid': 'svg', size: 30 },
      React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('width: 30px');
  expect(svg).toHaveStyle('height: 30px');
});
test('supports size prop with string', () => {
  render(
    React.createElement(
      SVG,
      { 'data-testid': 'svg', size: '30' },
      React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('width: 30px');
  expect(svg).toHaveStyle('height: 30px');
});
test('supports responsive sizing', () => {
  render(
    React.createElement(
      SVG,
      { 'data-testid': 'svg', size: [32, 64] },
      React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('width: 32px');
  expect(svg).toHaveStyle('height: 32px');
});
test('supports size from theme', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        SVG,
        { 'data-testid': 'svg', size: 'small' },
        React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
      )
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('width: 16px');
  expect(svg).toHaveStyle('height: 16px');
});
test('supports custom width instead of default size', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        SVG,
        { 'data-testid': 'svg', width: 16 },
        React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
      )
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('width: 16px');
  expect(svg).toHaveStyle('height: 24px');
});
test('supports custom height instead of default size', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        SVG,
        { 'data-testid': 'svg', height: 16 },
        React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
      )
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('width: 24px');
  expect(svg).toHaveStyle('height: 16px');
});
test('supports width and height from theme', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        SVG,
        { 'data-testid': 'svg', width: 'small', height: 'small' },
        React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
      )
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('width: 16px');
  expect(svg).toHaveStyle('height: 16px');
});
test('supports fill prop', () => {
  render(
    React.createElement(
      SVG,
      { 'data-testid': 'svg', fill: '#fafafa' },
      React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('fill: #fafafa');
});
test('supports fill from theme', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        SVG,
        { 'data-testid': 'svg', fill: 'info' },
        React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
      )
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg).toHaveStyle('fill: blue');
});
test('accepts custom styles prop className', () => {
  render(
    React.createElement(
      SVG,
      { 'data-testid': 'svg', className: 'custom-class-name' },
      React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg.getAttribute('class')).toMatch(/custom-class-name/);
});
test('renders <svg> element', () => {
  render(
    React.createElement(
      SVG,
      { 'data-testid': 'svg' },
      React.createElement('path', { d: 'M9.9 20.113V13.8415H14' })
    )
  );
  const svg = screen.getByTestId(/svg/);
  expect(svg instanceof SVGElement).toBeTruthy();
});
//# sourceMappingURL=SVG.test.js.map
