import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { ThemeProvider } from '../../hooks/useTheme';
import { SVG } from './SVG';

const theme = {
  name: 'test',
  sizes: {
    none: 0,
    small: 16,
  },
  components: {},
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
  class="flex-none fill-info"
  data-testid="svg"
  height="24px"
  width="24px"
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

  expect(svg).toHaveAttribute('width', '24px');
  expect(svg).toHaveAttribute('height', '24px');
});

test('supports size prop', () => {
  render(
    <SVG data-testid="svg" size={30}>
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveAttribute('width', '30px');
  expect(svg).toHaveAttribute('height', '30px');
});

test('supports size prop with string', () => {
  render(
    <SVG data-testid="svg" size="30">
      <path d="M9.9 20.113V13.8415H14" />
    </SVG>
  );
  const svg = screen.getByTestId(/svg/);

  expect(svg).toHaveAttribute('width', '30px');
  expect(svg).toHaveAttribute('height', '30px');
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
  class="flex-none fill-current w-[24px] sm:w-[32px] md:w-[64px]"
  data-testid="svg"
  height="24px"
  width="24px"
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

  expect(svg).toHaveAttribute('width', '16px');
  expect(svg).toHaveAttribute('height', '24px');
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

  expect(svg).toHaveAttribute('width', '24px');
  expect(svg).toHaveAttribute('height', '16px');
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
  const ref = createRef<SVGSVGElement>();
  render(<SVG ref={ref} />);

  expect(ref.current).toBeInstanceOf(SVGElement);
});
