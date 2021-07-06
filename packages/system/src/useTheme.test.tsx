import React from 'react';
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
};

const wrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

test('return theme', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.theme.current).toMatchInlineSnapshot(`
    Object {
      "colors": Object {
        "black": "#000",
        "primary": "hotpink",
      },
      "text": Object {
        "body": Object {
          "color": "black",
          "fontSize": 1,
        },
        "heading": Object {
          "color": "primary",
          "fontSize": 3,
        },
      },
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

  const Theme = ({ testId }: { testId: string }) => {
    const theme = useTheme();
    return <div data-testid={testId}>{JSON.stringify(theme, null, 2)}</div>;
  };

  render(
    <ThemeProvider theme={outerTheme}>
      <>
        <Theme testId="outer" />
        <ThemeProvider theme={innerTheme}>
          <Theme testId="inner" />
        </ThemeProvider>
      </>
    </ThemeProvider>
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
