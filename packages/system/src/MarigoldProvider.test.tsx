import React from 'react';
import { render } from '@testing-library/react';

import { Box } from './Box';
import { MarigoldProvider } from './MarigoldProvider';

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
