import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { createStyles } from './createStyles';
import { ThemeProvider } from './useTheme';

// Setup
// ---------------
const theme = {
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

test('create a string classname', () => {
  const { result } = renderHook(
    () => createStyles('text', { color: 'primary' })({}),
    {
      wrapper,
    }
  );
  expect(result.current).toEqual(expect.any(String));
});

/**
 * How to check which styles are applied?
 * -> https://stackoverflow.com/questions/20377835/how-to-get-css-class-property-in-javascript
 */

/**
 * Test order in which styles are applied.
 */
