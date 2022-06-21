import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../hooks';
import { normalize } from '../../normalize';
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
  render(React.createElement(Box, null, 'Test'));
  const testelem = screen.getByText('Test');
  expect(testelem instanceof HTMLDivElement).toBeTruthy();
});
test('changes rendered element via "as" prop', () => {
  render(React.createElement(Box, { as: 'p' }, 'Test'));
  const testelem = screen.getByText('Test');
  expect(testelem instanceof HTMLParagraphElement).toBeTruthy();
});
test('supports custom className', () => {
  render(React.createElement(Box, { className: 'my-custom-class' }, 'Test'));
  const element = screen.getByText('Test');
  expect(element.getAttribute('class')).toMatch('my-custom-class');
});
test('passes down HTML attributes', () => {
  render(
    React.createElement(
      Box,
      { className: 'my-custom-class', id: 'element-id', disabled: true },
      'Test'
    )
  );
  const element = screen.getByText('Test');
  expect(element.getAttribute('id')).toEqual('element-id');
  expect(element.getAttribute('disabled')).toMatch('');
});
test('forwards ref', () => {
  const ref = React.createRef();
  render(React.createElement(Box, { as: 'button', ref: ref }, 'button'));
  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});
test('apply normalized styles', () => {
  render(React.createElement(Box, null, 'Test'));
  const element = screen.getByText('Test');
  const { base } = normalize;
  // Smoketest
  expect(element).toHaveStyle(`box-sizing: ${base.boxSizing}`);
  expect(element).toHaveStyle(`margin: ${base.margin}px`);
  expect(element).toHaveStyle(`min-width: ${base.minWidth}`);
});
test('base normalization is always applied', () => {
  render(React.createElement(Box, { as: 'button' }, 'Test'));
  const element = screen.getByText('Test');
  const { base } = normalize;
  expect(element).toHaveStyle(`box-sizing: ${base.boxSizing}`);
  expect(element).toHaveStyle(`margin: ${base.margin}px`);
  expect(element).toHaveStyle(`min-width: ${base.minWidth}`);
});
test('apply normalized styles based on element', () => {
  render(React.createElement(Box, { as: 'h1' }, 'Test'));
  const element = screen.getByText('Test');
  const { h1 } = normalize;
  expect(element).toHaveStyle(`overflow-wrap: ${h1.overflowWrap}`);
});
test('accepts default styling via "__baseCSS" prop', () => {
  render(React.createElement(Box, { __baseCSS: { color: 'hotpink' } }, 'Test'));
  const element = screen.getByText('Test');
  expect(element).toHaveStyle('color: hotpink');
});
test('default styling overrides normalization', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Box, { __baseCSS: { m: 'medium' } }, 'Test')
    )
  );
  const element = screen.getByText('Test');
  expect(element).toHaveStyle(`margin: ${theme.space.medium}px`);
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
  const props = args.shift();
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Box, { ...props }, "What's in the box!")
    )
  );
  const box = screen.getByText(`What's in the box!`);
  args.forEach(style => {
    expect(box).toHaveStyle(style);
  });
});
test('style props override normalization and defaults', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Box,
        { __baseCSS: { p: 'small' }, bg: 'blue', m: 'medium', p: 'large' },
        'Test'
      )
    )
  );
  const element = screen.getByText('Test');
  expect(element).toHaveStyle(`margin: ${theme.space.medium}px`); // overrides normalization
  expect(element).toHaveStyle(`padding: ${theme.space.large}px`); // overrides default
  expect(element).toHaveStyle(`background: ${theme.colors.blue}`); // overrides variant
});
test('apply custom styling via css prop', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Box,
        { css: { color: 'secondary', padding: '1rem' } },
        'Test'
      )
    )
  );
  const element = screen.getByText('Test');
  expect(element).toHaveStyle(`padding: 1rem`);
  expect(element).toHaveStyle(`color: ${theme.colors.secondary}`);
});
test('custom styling overrides normalization, defaults and style props', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Box,
        {
          __baseCSS: { p: 'small' },
          bg: 'black',
          css: { fontSize: 'large', m: 'small', p: 'large', bg: 'blue' },
        },
        'Test'
      )
    )
  );
  const element = screen.getByText('Test');
  expect(element).toHaveStyle(`margin: ${theme.space.small}px`); // overrides normalization
  expect(element).toHaveStyle(`padding: ${theme.space.large}px`); // overrides default
  expect(element).toHaveStyle(`font-size: ${theme.fontSizes.large}px`); // overrides variant
  expect(element).toHaveStyle(`background: ${theme.colors.blue}`); // overrides style prop
});
test('transforms states selectors', async () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Box,
        {
          'data-hover': true,
          'data-error': true,
          __baseCSS: { p: 'small', '&:hover': { p: 'medium' } },
          css: {
            fontSize: 'large',
            m: 'small',
            bg: 'blue',
            '&:error': {
              bg: 'red',
            },
          },
        },
        'Test'
      )
    )
  );
  const element = screen.getByText('Test');
  expect(element).toHaveStyle(`padding: ${theme.space.medium}px`);
  expect(element).toHaveStyle(`background: ${theme.colors.red}`);
});
//# sourceMappingURL=Box.test.js.map
