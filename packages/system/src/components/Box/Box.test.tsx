import React from 'react';
import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '../../hooks';

import { Box } from './Box';

const theme = {
  colors: {
    primary: 'black',
    secondary: 'hotpink',
    black: '#000',
    white: '#fff',
    blue: 'cornflowerblue',
    red: '#c92a2a',
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
    <Box className="my-custom-class" id="element-id">
      Test
    </Box>
  );
  const element = screen.getByText('Test');

  expect(element.getAttribute('className')).toMatch('my-custom-class');
  expect(element.getAttribute('id')).toEqual('element-id');
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

test('accepts default styling via "__baseCSS" prop', () => {
  render(<Box __baseCSS={{ color: 'hotpink' }}>Test</Box>);
  const element = screen.getByText('Test');

  expect(element).toHaveStyle('color: hotpink');
});

test('default styling overrides (global) normalization', () => {
  render(
    <ThemeProvider theme={theme}>
      <Box __baseCSS={{ m: 'medium' }}>Test</Box>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`margin: ${theme.space.medium}px`);
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

test('apply custom styling via css prop (array)', () => {
  render(
    <ThemeProvider theme={theme}>
      <Box
        css={[{ color: 'secondary', p: '1rem' }, { p: 10 }, { p: undefined }]}
      >
        Test
      </Box>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');

  expect(element).toHaveStyle(`padding: 10px`);
  expect(element).toHaveStyle(`color: ${theme.colors.secondary}`);
});

test('custom styling overrides normalization and defaults', () => {
  render(
    <ThemeProvider theme={theme}>
      <Box
        __baseCSS={{ p: 'small' }}
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
});

test('transforms states selectors', async () => {
  render(
    <ThemeProvider theme={theme}>
      <Box
        data-hover
        data-error
        __baseCSS={{ p: 'small', '&:hover': { p: 'medium' } }}
        css={{
          fontSize: 'large',
          m: 'small',
          bg: 'blue',
          '&:error': {
            bg: 'red',
          },
        }}
      >
        Test
      </Box>
    </ThemeProvider>
  );
  const element = screen.getByText('Test');
  expect(element).toHaveStyle(`padding: ${theme.space.medium}px`);
  expect(element).toHaveStyle(`background: ${theme.colors.red}`);
});
