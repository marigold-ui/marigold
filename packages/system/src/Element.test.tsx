import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './useTheme';
import { Element } from './Element';
import { normalize } from './normalize';

const theme = {
  colors: {
    primary: 'black',
    secondary: 'hotpink',
  },
  fontSizes: {
    body: 16,
    small: 12,
    large: 24,
  },
  space: {
    none: 0,
    small: 4,
    medium: 8,
    large: 16,
  },
  text: {
    body: {
      fontSize: 'body',
      color: 'primary',
    },
    heading: {
      fontSize: 'large',
      color: 'secondary',
    },
    whitespace: {
      p: 'medium',
    },
  },
  override: {
    normalize: {
      m: 'large',
    },
  },
};

test('renders a <div> by default', () => {
  render(<Element>Test</Element>);
  const testelem = screen.getByText('Test');

  expect(testelem instanceof HTMLDivElement).toBeTruthy();
});

test('supports "as" prop', () => {
  render(<Element as="p">Test</Element>);
  const testelem = screen.getByText('Test');

  expect(testelem instanceof HTMLParagraphElement).toBeTruthy();
});

test('supports HTML className attribute', () => {
  render(<Element className="my-custom-class">Test</Element>);
  const element = screen.getByText('Test');

  expect(element.getAttribute('class')).toMatch('my-custom-class');
});

test('passes down HTML attributes', () => {
  render(
    <Element className="my-custom-class" id="element-id" disabled>
      Test
    </Element>
  );
  const element = screen.getByText('Test');

  expect(element.getAttribute('id')).toEqual('element-id');
  expect(element.getAttribute('disabled')).toMatch('');
  expect(element.getAttribute('class')).toMatch('my-custom-class');
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Element as="button" ref={ref}>
      button
    </Element>
  );

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

test('apply normalized styles', () => {
  render(<Element>Test</Element>);
  const element = screen.getByText('Test');
  const { base } = normalize;

  // Smoketest
  expect(element).toHaveStyle(`box-sizing: ${base.boxSizing}`);
  expect(element).toHaveStyle(`margin: ${base.margin}px`);
  expect(element).toHaveStyle(`min-width: ${base.minWidth}`);
});

test('variants are applied correctly', () => {
  render(
    <ThemeProvider theme={theme}>
      <Element variant="text.body">Test</Element>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');
  console.log(getComputedStyle(element));

  expect(element).toHaveStyle(`font-size: ${theme.fontSizes.body}px`);
  expect(element).toHaveStyle(`color: ${theme.colors.primary}`);
});

test('accept an array of variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <Element as="p" variant={['text.heading', 'text.whitespace']}>
        Test
      </Element>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`font-size: ${theme.fontSizes.large}px`);
  expect(element).toHaveStyle(`color: ${theme.colors.secondary}`);
  expect(element).toHaveStyle(`padding: ${theme.space.medium}px`);
});

test('variants override normalization', () => {
  render(
    <ThemeProvider theme={theme}>
      <Element variant="override.normalize">Test</Element>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`margin: ${theme.space.large}px`);
});

test('apply custom styling via css prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Element css={{ color: 'secondary', padding: '1rem' }}>Test</Element>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`padding: 1rem`);
  expect(element).toHaveStyle(`color: ${theme.colors.secondary}`);
});

test('custom styling overrides variant and normalization', () => {
  render(
    <ThemeProvider theme={theme}>
      <Element variant="text.body" css={{ fontSize: 'large', margin: 'small' }}>
        Test
      </Element>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`font-size: ${theme.fontSizes.large}px`); // overrides variant
  expect(element).toHaveStyle(`margin: ${theme.space.small}px`); // overrides normalization

  expect(element).not.toHaveStyle(`color: ${theme.colors.primary}px`); // variant part that is not overriden
});
