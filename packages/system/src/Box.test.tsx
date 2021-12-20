import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './useTheme';
import { Box, StyleProps } from './Box';
import { normalize } from './normalize';

const theme = {
  colors: {
    primary: 'black',
    secondary: 'hotpink',
    black: '#000',
    white: '#fff',
    blue: 'cornflowerblue',
  },
  fontSizes: {
    body: 16,
    small: 12,
    large: 24,
  },
  space: {
    none: 0,
    xsmall: 2,
    small: 4,
    medium: 8,
    large: 16,
  },
  sizes: {
    none: 0,
    small: 8,
    medium: 16,
    large: 32,
  },
  borders: { none: 'none', regular: '1px solid black' },
  radii: { none: 0, small: 2, medium: 4 },
  opacities: {
    hidden: 0,
    faded: 0.5,
    visible: 1,
  },
  transitions: { none: 'none', regular: '1s opacity' },
  shadows: {
    none: 'none',
    regular: '3px 3px 5px 6px #ccc',
    inset: 'inset 0 0 10px #000000',
  },
  text: {
    body: {
      fontSize: 'body',
      color: 'primary',
      bg: 'white',
    },
    headline1: {
      fontSize: 'large',
      color: 'secondary',
    },
    whitespace: {
      p: 'medium',
    },
  },
  variant: {
    spacing: {
      m: 'large',
      p: 'large',
    },
  },
};

test('renders a <div> by default', () => {
  render(<Box>Test</Box>);
  const testelem = screen.getByText('Test');

  expect(testelem instanceof HTMLDivElement).toBeTruthy();
});

test('changes rendered element via "as" prop', () => {
  render(<Box as="p">Test</Box>);
  const testelem = screen.getByText('Test');

  expect(testelem instanceof HTMLParagraphElement).toBeTruthy();
});

test('supports custom className', () => {
  render(<Box className="my-custom-class">Test</Box>);
  const element = screen.getByText('Test');

  expect(element.getAttribute('class')).toMatch('my-custom-class');
});

test('passes down HTML attributes', () => {
  render(
    <Box className="my-custom-class" id="element-id" disabled>
      Test
    </Box>
  );
  const element = screen.getByText('Test');

  expect(element.getAttribute('id')).toEqual('element-id');
  expect(element.getAttribute('disabled')).toMatch('');
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Box as="button" ref={ref}>
      button
    </Box>
  );

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

test('apply normalized styles', () => {
  render(<Box>Test</Box>);
  const element = screen.getByText('Test');
  const { base } = normalize;

  // Smoketest
  expect(element).toHaveStyle(`box-sizing: ${base.boxSizing}`);
  expect(element).toHaveStyle(`margin: ${base.margin}px`);
  expect(element).toHaveStyle(`min-width: ${base.minWidth}`);
});

test('base normalization is always applied', () => {
  render(<Box as="button">Test</Box>);
  const element = screen.getByText('Test');
  const { base } = normalize;

  expect(element).toHaveStyle(`box-sizing: ${base.boxSizing}`);
  expect(element).toHaveStyle(`margin: ${base.margin}px`);
  expect(element).toHaveStyle(`min-width: ${base.minWidth}`);
});

test('apply normalized styles based on element', () => {
  render(<Box as="h1">Test</Box>);
  const element = screen.getByText('Test');
  const { h1 } = normalize;

  expect(element).toHaveStyle(`overflow-wrap: ${h1.overflowWrap}`);
});

test('accepts default styling via "__baseCSS" prop', () => {
  render(<Box __baseCSS={{ color: 'hotpink' }}>Test</Box>);
  const element = screen.getByText('Test');

  expect(element).toHaveStyle('color: hotpink');
});

test('default styling overrides normalization', () => {
  render(
    <ThemeProvider theme={theme}>
      <Box __baseCSS={{ m: 'medium' }}>Test</Box>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`margin: ${theme.space.medium}px`);
});

test('variants are applied correctly', () => {
  render(
    <ThemeProvider theme={theme}>
      <Box variant="text.body">Test</Box>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`font-size: ${theme.fontSizes.body}px`);
  expect(element).toHaveStyle(`color: ${theme.colors.primary}`);
});

test('accept an array of variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <Box as="p" variant={['text.headline1', 'text.whitespace']}>
        Test
      </Box>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`font-size: ${theme.fontSizes.large}px`);
  expect(element).toHaveStyle(`color: ${theme.colors.secondary}`);
  expect(element).toHaveStyle(`padding: ${theme.space.medium}px`);
});

test('variants override normalization and default styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Box __baseCSS={{ p: 'small' }} variant="variant.spacing">
        Test
      </Box>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`margin: ${theme.space.large}px`);
  expect(element).toHaveStyle(`padding: ${theme.space.large}px`);
});

test.each([
  [{ display: 'flex' }, 'display: flex'],
  [{ height: 'small' }, 'height: 8px'],
  [{ width: 'medium' }, 'width: 16px'],
  [{ minWidth: 'small' }, 'min-width: 8px'],
  [{ maxWidth: 'large' }, 'max-width: 32px'],
  [{ position: 'absolute' }, 'position: absolute'],
  [{ top: 'none' }, 'top: 0px'],
  [{ bottom: 'xsmall' }, 'bottom: 2px'],
  [{ right: 'medium' }, 'right: 8px'],
  [{ left: 'small' }, 'left: 4px'],
  [{ zIndex: 1000 }, 'z-index: 1000'],
  [{ p: 'xsmall' }, 'padding: 2px'],
  [{ px: 'xsmall' }, 'padding-left: 2px', 'padding-right: 2px'],
  [{ py: 'small' }, 'padding-top: 4px', 'padding-bottom: 4px'],
  [{ pt: 'xsmall' }, 'padding-top: 2px'],
  [{ pb: 'xsmall' }, 'padding-bottom: 2px'],
  [{ pl: 'xsmall' }, 'padding-left: 2px'],
  [{ pr: 'xsmall' }, 'padding-right: 2px'],
  [{ m: 'xsmall' }, 'margin: 2px'],
  [{ mx: 'xsmall' }, 'margin-left: 2px', 'margin-right: 2px'],
  [{ my: 'small' }, 'margin-top: 4px', 'margin-bottom: 4px'],
  [{ mt: 'xsmall' }, 'margin-top: 2px'],
  [{ mb: 'xsmall' }, 'margin-bottom: 2px'],
  [{ ml: 'xsmall' }, 'margin-left: 2px'],
  [{ mr: 'xsmall' }, 'margin-right: 2px'],
  [{ flexDirection: 'column' }, 'flex-direction: column'],
  [{ flexWrap: 'wrap' }, 'flex-wrap: wrap'],
  [{ flexShrink: 5 }, 'flex-shrink: 5'],
  [{ flexGrow: 1 }, 'flex-grow: 1'],
  [{ alignItems: 'baseline' }, 'align-items: baseline'],
  [{ justifyContent: 'space-between' }, 'justify-content: space-between'],
  [{ bg: 'secondary' }, 'background-color: hotpink'],
  [{ border: 'regular' }, 'border: 1px solid black'],
  [{ borderRadius: 'medium' }, 'border-radius: 4px'],
  [{ boxShadow: 'regular' }, 'box-shadow: 3px 3px 5px 6px #ccc'],
  [{ opacity: 'faded' }, 'opacity: 0.5'],
  [{ overflow: 'hidden' }, 'overflow: hidden'],
  [{ transition: 'regular' }, 'transition: 1s opacity'],
])('supports style prop (%o)', (...args) => {
  const props = args.shift() as StyleProps;

  render(
    <ThemeProvider theme={theme}>
      <Box {...props}>What's in the box!</Box>
    </ThemeProvider>
  );

  const box = screen.getByText(`What's in the box!`);
  args.forEach((style: any) => {
    expect(box).toHaveStyle(style);
  });
});

test('style props override normalization, defaults and variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <Box
        __baseCSS={{ p: 'small' }}
        variant="text.body"
        bg="blue"
        m="medium"
        p="large"
      >
        Test
      </Box>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`margin: ${theme.space.medium}px`); // overrides normalization
  expect(element).toHaveStyle(`padding: ${theme.space.large}px`); // overrides default
  expect(element).toHaveStyle(`background: ${theme.colors.blue}`); // overrides variant
});

test('apply custom styling via css prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Box css={{ color: 'secondary', padding: '1rem' }}>Test</Box>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`padding: 1rem`);
  expect(element).toHaveStyle(`color: ${theme.colors.secondary}`);
});

test('custom styling overrides normalization, defaults, variants and style props', () => {
  render(
    <ThemeProvider theme={theme}>
      <Box
        __baseCSS={{ p: 'small' }}
        variant="text.body"
        bg="black"
        css={{ fontSize: 'large', m: 'small', p: 'large', bg: 'blue' }}
      >
        Test
      </Box>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`margin: ${theme.space.small}px`); // overrides normalization
  expect(element).toHaveStyle(`padding: ${theme.space.large}px`); // overrides default
  expect(element).toHaveStyle(`font-size: ${theme.fontSizes.large}px`); // overrides variant
  expect(element).toHaveStyle(`background: ${theme.colors.blue}`); // overrides style prop

  expect(element).not.toHaveStyle(`color: ${theme.colors.primary}px`); // variant part that is not overriden
});
