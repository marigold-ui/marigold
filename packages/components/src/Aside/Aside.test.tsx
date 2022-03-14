import React from 'react';
import { ThemeProvider } from '@marigold/system';
import { render } from '@testing-library/react';

import { Aside } from './Aside';
import { Text } from '../Text';

// Setup
// ---------------
const theme = {
  space: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
  },
  sizes: {
    none: 0,
    small: 250,
    medium: 350,
    large: 500,
  },
};

test('lala', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside sideWidth="94%">
        <Text>first</Text>
        <Text>second</Text>
      </Aside>
    </ThemeProvider>
  );
});
