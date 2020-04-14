import React from 'react';
import { render } from '@testing-library/react';

import { Global } from './emotion';
import { Box } from './Box';
import { MarigoldProvider } from './MarigoldProvider';

// Mock
// ---------------
/**
 * We mocking emotion's `<Global/>` here even though this will make us test
 * implementation details. This is currently the only way to test CSS and
 * media queries.
 */
jest.mock('@emotion/core', () => {
  const original = jest.requireActual('@emotion/core');
  return {
    ...original,
    Global: jest.fn(() => null),
  };
});

// Setup
// ---------------
const theme = {
  colors: {
    black: '#111',
  },
  text: {
    body: {
      fontSize: 1,
      color: 'black',
    },
  },
};

// Tests
// ---------------
test('set theme context', () => {
  const Text: React.FC<{
    variant?: keyof typeof theme.text;
  }> = ({ children }) => (
    <Box themeSection="text" variant="body">
      {children}
    </Box>
  );

  const { getByText } = render(
    <MarigoldProvider theme={theme}>
      <Text>I am a body text!</Text>
    </MarigoldProvider>
  );
  const element = getByText('I am a body text!');

  expect(element).toHaveStyle(`color: ${theme.colors.black}`);
  expect(element).toHaveStyle(`font-size: 14px`);
});

test('removes animation when "reduce-motion" media query is set', () => {
  const spy = Global as jest.Mock;
  spy.mockClear();

  render(<MarigoldProvider theme={theme} />);
  expect((Global as jest.Mock).mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "styles": Object {
          "@media screen and (prefers-reduced-motion: reduce), (update: slow)": Object {
            "*": Object {
              "animationDuration": "0.001ms !important",
              "animationIterationCount": "1 !important",
              "transitionDuration": "0.001ms !important",
            },
          },
        },
      },
      Object {},
    ]
  `);
});
