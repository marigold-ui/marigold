import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box, Tiles, MarigoldProvider } from '@marigold/components';

const theme = {
  sizes: {
    none: 0,
    large: 340,
  },
  space: {
    none: 0,
    large: 24,
  },
};

test('set tiles width via prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Tiles tilesWidth="200px" data-testid="tiles">
        <Box>tiles</Box>
      </Tiles>
    </MarigoldProvider>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(
    `gridTemplateColumns: repeat(auto-fit, min(200px, 100%))`
  );
});

test('supports setting tiles width with design tokens', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Tiles tilesWidth="large" data-testid="tiles">
        <Box>tiles</Box>
      </Tiles>
    </MarigoldProvider>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(
    `gridTemplateColumns: repeat(auto-fit, min(${theme.sizes.large}px, 100%))`
  );
});

test('supports space prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Tiles tilesWidth="200px" space="large" data-testid="tiles">
        <Box>tiles</Box>
      </Tiles>
    </MarigoldProvider>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(`gap: ${theme.space.large}px`);
});

test('supports responsive grid via stretch prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Tiles tilesWidth="300px" stretch data-testid="tiles">
        <Box>tiles</Box>
      </Tiles>
    </MarigoldProvider>
  );
  const tiles = screen.getByTestId(/tiles/);
  expect(tiles).toHaveStyle(
    `gridTemplateColumns: repeat(auto-fit, minmax(min(300px, 100%), 1fr))`
  );
});

test('supports gridAutoRows prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Tiles tilesWidth="400px" equalHeight data-testid="tiles">
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
