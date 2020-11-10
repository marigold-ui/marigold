import React from 'react';
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
  expect(result.current).toMatchInlineSnapshot(`
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
