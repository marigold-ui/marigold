import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box, Columns, MarigoldProvider } from '@marigold/components';

const theme = {
  space: {
    none: 0,
    large: 24,
  },
};

test('supports default space prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Columns columns={[6, 6]} data-testid="columns">
        <Box>column</Box>
        <Box>column</Box>
      </Columns>
    </MarigoldProvider>
  );
  const column = screen.getByTestId(/columns/);
  expect(column).toHaveStyle(`gap: 0`);
});

test('supports custom space prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Columns columns={[6, 6]} space="large" data-testid="columns">
        <Box>column</Box>
        <Box>column</Box>
      </Columns>
    </MarigoldProvider>
  );
  const column = screen.getByTestId(/columns/);
  expect(column).toHaveStyle(`gap: 24px`);
});

test('supports default collapseAt prop', () => {
  render(
    <Columns columns={[12]}>
      <Box>columnOne</Box>
    </Columns>
  );
  const columnOne = screen.getByText(/columnOne/);
  expect(columnOne).toHaveStyle(`flexBasis : calc(( 40em - 100%) * 999)`);
});

test('supports custom collapseAt prop', () => {
  render(
    <Columns columns={[12]} collapseAt="50em">
      <Box>columnOne</Box>
    </Columns>
  );
  const columnOne = screen.getByText(/columnOne/);
  expect(columnOne).toHaveStyle(`flexBasis : calc(( 50em - 100%) * 999)`);
});

test('supports columns with two values', () => {
  render(
    <Columns columns={[2, 10]}>
      <Box>columnOne</Box>
      <Box>columnTwo</Box>
    </Columns>
  );
  const columnOne = screen.getByText(/columnOne/);
  const columnTwo = screen.getByText(/columnTwo/);
  expect(columnOne).toHaveStyle(`flexGrow : 2`);
  expect(columnTwo).toHaveStyle(`flexGrow : 10`);
});

test('supports columns with three values', () => {
  render(
    <Columns columns={[2, 4, 6]}>
      <Box>columnOne</Box>
      <Box>columnTwo</Box>
      <Box>columnThree</Box>
    </Columns>
  );
  const columnOne = screen.getByText(/columnOne/);
  const columnTwo = screen.getByText(/columnTwo/);
  const columnThree = screen.getByText(/columnThree/);
  expect(columnOne).toHaveStyle(`flexGrow : 2`);
  expect(columnTwo).toHaveStyle(`flexGrow : 4`);
  expect(columnThree).toHaveStyle(`flexGrow : 6`);
});

test('throws error if columns length and children length are different', () => {
  // avoid that the error will be thrown in console during test run
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});

  expect(() =>
    render(
      <Columns columns={[12]}>
        <Box>columnOne</Box>
        <Box>columnTwo</Box>
        <Box>columnThree</Box>
      </Columns>
    )
  ).toThrow('Columns: expected 1 children, got 3');
  spy.mockRestore();
});
