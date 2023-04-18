import React from 'react';
import { render, screen } from '@testing-library/react';
import { SVG } from './SVG';
import { ThemeProvider } from '../../hooks';

const theme = {
  name: 'test',
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

test('supports classNames', () => {
  render(
    <SVG data-testid="svg" className="fill-info">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toMatchInlineSnapshot(`
    <svg
      class="flex-auto w-[24px] h-[24px] fill-info"
      data-testid="svg"
    >
      <path
        d="M9.9 20.113V13.8415H14"
      />
    </svg>
  `);
});

test('supports default size', () => {
  render(
    <SVG data-testid="svg">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveClass('w-[24px] h-[24px]');
});

test('supports size prop', () => {
  render(
    <SVG data-testid="svg" size={30}>
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveClass('w-[30px] h-[30px]');
});

test('supports size prop with string', () => {
  render(
    <SVG data-testid="svg" size="30">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveClass('w-[30px] h-[30px]');
});

test('supports responsive sizing', () => {
  render(
    <SVG data-testid="svg" className="w-[24px] sm:w-[32px] md:w-[64px]">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toMatchInlineSnapshot(`
    <svg
      class="flex-auto h-[24px] w-[24px] sm:w-[32px] md:w-[64px]"
      data-testid="svg"
    >
      <path
        d="M9.9 20.113V13.8415H14"
      />
    </svg>
  `);
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

  expect(svg).toHaveClass('w-[16px] h-[24px]');
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

  expect(svg).toHaveClass('w-[24px] h-[16px]');
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

test('forwards ref', () => {
  const ref = React.createRef<SVGSVGElement>();
  render(<SVG ref={ref} />);

  expect(ref.current).toBeInstanceOf(SVGElement);
});
