import React from 'react';
import { render, screen } from '@testing-library/react';
import { Column, Columns, MarigoldProvider } from '@marigold/components';

const theme = {
  space: {
    none: 0,
    large: 24,
  },
};

test('supports default space prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Columns data-testid="column">
        <Column>column</Column>
      </Columns>
    </MarigoldProvider>
  );
  const column = screen.getByTestId(/column/);

  expect(column).toHaveStyle(`margin: 0px`);
});

test('supports custom space prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Columns space="large" data-testid="column">
        <Column>column</Column>
      </Columns>
    </MarigoldProvider>
  );
  const column = screen.getByTestId(/column/);

  expect(column).toHaveStyle(`margin: -12px`);
});

test('supports default horizontalAlign prop: left', () => {
  render(
    <Columns data-testid="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTestId(/column/);

  expect(column).toHaveStyle(`justify-content: flex-start`);
});

test('supports custom horizontalAlign prop: center', () => {
  render(
    <Columns horizontalAlign="center" data-testid="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTestId(/column/);

  expect(column).toHaveStyle(`justify-content: center`);
});

test('supports custom horizontalAlign prop: right', () => {
  render(
    <Columns horizontalAlign="right" data-testid="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTestId(/column/);

  expect(column).toHaveStyle(`justify-content: flex-end`);
});

test('supports default verticalAlign prop: top', () => {
  render(
    <Columns data-testid="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTestId(/column/);

  expect(column).toHaveStyle(`align-items: flex-start`);
});

test('supports custom verticalAlign prop: center', () => {
  render(
    <Columns verticalAlign="center" data-testid="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTestId(/column/);

  expect(column).toHaveStyle(`align-items: center`);
});

test('supports custom verticalAlign prop: bottom', () => {
  render(
    <Columns verticalAlign="bottom" data-testid="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTestId(/column/);

  expect(column).toHaveStyle(`align-items: flex-end`);
});

test('renders correct HTML element', () => {
  render(
    <Columns data-testid="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTestId(/column/);

  expect(column instanceof HTMLDivElement).toBeTruthy();
});
