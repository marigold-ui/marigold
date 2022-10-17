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
    <MarigoldProvider theme={theme}>
      <Tiles data-testid="tiles">
        <Box>tiles</Box>
      </Tiles>
    </MarigoldProvider>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(`display: grid`);
  expect(tiles).toHaveStyle(`gap: 0`);
});

test('supports other space prop than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Tiles space="large" data-testid="tiles">
        <Box>tiles</Box>
      </Tiles>
    </MarigoldProvider>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(`display: grid`);
  expect(tiles).toHaveStyle(`gap: 24px`);
});

test('supports default itemMinWidth prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Tiles data-testid="tiles">
        <Box>tiles</Box>
      </Tiles>
    </MarigoldProvider>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(
    `gridTemplateColumns: repeat(auto-fit, minmax(min(250px, 100%), 1fr))`
  );
});

test('supports other itemMinWidth prop than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Tiles itemMinWidth="400px" data-testid="tiles">
        <Box>tiles</Box>
      </Tiles>
    </MarigoldProvider>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(
    `gridTemplateColumns: repeat(auto-fit, minmax(min(400px, 100%), 1fr))`
  );
});

test('supports gridAutoRows prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Tiles gridAutoRows data-testid="tiles">
        <Box>tiles</Box>
        <Box>tiles</Box>
        <Box>tiles</Box>
        <Box>tiles</Box>
      </Tiles>
    </MarigoldProvider>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(`gridAutoRows: 1fr`);
});
