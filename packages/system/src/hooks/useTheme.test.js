import React from 'react';
import { jsx } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { ThemeProvider, useTheme } from './useTheme';
// Setup
// ---------------
const theme = {
  colors: {
    primary: 'hotpink',
    black: '#000',
  },
  space: {
    none: 0,
    small: 16,
    medium: 24,
    large: 32,
  },
  text: {
    body: {
      fontSize: 1,
      color: 'black',
    },
    heading: {
      fontSize: 3,
      color: 'primary',
    },
  },
  button: {
    __default: {
      fontSize: 16,
      border: 'none',
    },
  },
};
const wrapper = ({ children }) =>
  React.createElement(ThemeProvider, { theme: theme }, children);
test('returns the theme', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.current.theme).toEqual(theme);
});
test('returns a "css" function', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.current.css).toEqual(expect.any(Function));
});
test('transpile style object to css object', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  const css = result.current.css;
  expect(css({ p: 'small' })).toMatchInlineSnapshot(`
    {
      "padding": 16,
    }
  `);
  expect(css({ color: 'primary', p: 'large' })).toMatchInlineSnapshot(`
    {
      "color": "hotpink",
      "padding": 32,
    }
  `);
  expect(css({ variant: 'text.body' })).toMatchInlineSnapshot(`
    {
      "color": "#000",
      "fontSize": 14,
    }
  `);
});
test('get value from theme', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  const get = result.current.get;
  expect(get('colors.primary')).toEqual('hotpink');
  expect(get('space.small')).toEqual(16);
  expect(get('button')).toMatchInlineSnapshot(`
    {
      "border": "none",
      "fontSize": 16,
    }
  `);
});
test('themes can be cascaded', () => {
  const outerTheme = {
    colors: {
      primary: 'coral',
    },
  };
  const innerTheme = {
    colors: {
      primary: 'gainsboro',
    },
  };
  const Theme = ({ testId }) => {
    const { theme } = useTheme();
    return React.createElement(
      'div',
      { 'data-testid': testId },
      JSON.stringify(theme, null, 2)
    );
  };
  render(
    React.createElement(
      ThemeProvider,
      { theme: outerTheme },
      React.createElement(
        React.Fragment,
        null,
        React.createElement(Theme, { testId: 'outer' }),
        React.createElement(
          ThemeProvider,
          { theme: innerTheme },
          React.createElement(Theme, { testId: 'inner' })
        )
      )
    )
  );
  const outer = screen.getByTestId('outer');
  const inner = screen.getByTestId('inner');
  expect(outer.innerHTML).toMatchInlineSnapshot(`
    "{
      \\"colors\\": {
        \\"primary\\": \\"coral\\"
      }
    }"
  `);
  expect(inner.innerHTML).toMatchInlineSnapshot(`
    "{
      \\"colors\\": {
        \\"primary\\": \\"gainsboro\\"
      }
    }"
  `);
});
test('theme is passed down to emotion', () => {
  const css = jest.fn().mockReturnValue({});
  render(
    React.createElement(ThemeProvider, { theme: theme }, jsx('div', { css }))
  );
  expect(css).toHaveBeenCalledWith(theme);
});
//# sourceMappingURL=useTheme.test.js.map
