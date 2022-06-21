import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box, Tiles, MarigoldProvider } from '@marigold/components';
const theme = {
  space: {
    none: 0,
    large: 24,
  },
};
test('supports default space prop', () => {
  render(
    React.createElement(
      MarigoldProvider,
      { theme: theme },
      React.createElement(
        Tiles,
        { 'data-testid': 'tiles' },
        React.createElement(Box, null, 'tiles')
      )
    )
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(`display: grid`);
  expect(tiles).toHaveStyle(`gap: 0`);
});
test('supports other space prop than default', () => {
  render(
    React.createElement(
      MarigoldProvider,
      { theme: theme },
      React.createElement(
        Tiles,
        { space: 'large', 'data-testid': 'tiles' },
        React.createElement(Box, null, 'tiles')
      )
    )
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(`display: grid`);
  expect(tiles).toHaveStyle(`gap: 24px`);
});
test('supports default itemMinWidth prop', () => {
  render(
    React.createElement(
      MarigoldProvider,
      { theme: theme },
      React.createElement(
        Tiles,
        { 'data-testid': 'tiles' },
        React.createElement(Box, null, 'tiles')
      )
    )
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(
    `gridTemplateColumns: repeat(auto-fit, minmax(min(250px, 100%), 1fr))`
  );
});
test('supports other itemMinWidth prop than default', () => {
  render(
    React.createElement(
      MarigoldProvider,
      { theme: theme },
      React.createElement(
        Tiles,
        { itemMinWidth: '400px', 'data-testid': 'tiles' },
        React.createElement(Box, null, 'tiles')
      )
    )
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(
    `gridTemplateColumns: repeat(auto-fit, minmax(min(400px, 100%), 1fr))`
  );
});
//# sourceMappingURL=Tiles.test.js.map
