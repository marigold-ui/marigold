import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/components';

const theme = {
  styles: {
    root: {
      fontFamily: 'Inter',
    },
  },
};

test('global styles are applied globally', () => {
  render(
    <MarigoldProvider theme={theme}>
      <div title="global"></div>
    </MarigoldProvider>
  );
  const element = screen.getByTitle(/global/);
  expect(element.parentElement).toHaveStyle(`font-family: Inter`);
});
