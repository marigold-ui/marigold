import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box, Columns, MarigoldProvider } from '@marigold/components';

const theme = {
  space: {
    none: 0,
    large: 24,
  },
};

// eslint-disable-next-line testing-library/no-node-access
const getColumnWrappers = (el: HTMLElement) => el.children!;

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
    <Columns columns={[12]} data-testid="columns">
      <Box>columnOne</Box>
    </Columns>
  );
  const [columnOne] = getColumnWrappers(screen.getByTestId(/columns/));
  expect(columnOne).toHaveStyle(`flexBasis : calc(( 40em - 100%) * 999)`);
});

test('supports custom collapseAt prop', () => {
  render(
    <Columns columns={[12]} collapseAt="50em" data-testid="columns">
      <Box>columnOne</Box>
    </Columns>
  );
  const [columnOne] = getColumnWrappers(screen.getByTestId(/columns/));
  expect(columnOne).toHaveStyle(`flexBasis : calc(( 50em - 100%) * 999)`);
});

test('supports columns with two values', () => {
  render(
    <Columns columns={[2, 10]} data-testid="columns">
      <Box>columnOne</Box>
      <Box>columnTwo</Box>
    </Columns>
  );
  const [columnOne, columnTwo] = getColumnWrappers(
    screen.getByTestId(/columns/)
  );
  expect(columnOne).toHaveStyle(`flexGrow : 2`);
  expect(columnTwo).toHaveStyle(`flexGrow : 10`);
});

test('supports columns with three values', () => {
  render(
    <Columns columns={[2, 4, 6]} data-testid="columns">
      <Box>columnOne</Box>
      <Box>columnTwo</Box>
      <Box>columnThree</Box>
    </Columns>
  );
  const [columnOne, columnTwo, columnThree] = getColumnWrappers(
    screen.getByTestId(/columns/)
  );
  expect(columnOne).toHaveStyle(`flexGrow : 2`);
  expect(columnTwo).toHaveStyle(`flexGrow : 4`);
  expect(columnThree).toHaveStyle(`flexGrow : 6`);
});

test('supports different types of children', () => {
  render(
    <Columns columns={[1, 1, 2]} data-testid="columns">
      <main>columnOne</main>
      <div>columnTwo</div>
      <aside>columnThree</aside>
    </Columns>
  );
  const [columnOne, columnTwo, columnThree] = getColumnWrappers(
    screen.getByTestId(/columns/)
  );
  expect(columnOne).toHaveStyle(`flexGrow : 1`);
  expect(columnTwo).toHaveStyle(`flexGrow : 1`);
  expect(columnThree).toHaveStyle(`flexGrow : 2`);
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
