import React from 'react';
import { render, screen } from '@testing-library/react';
import { Column, Columns } from '@marigold/components';

test('supports default space prop', () => {
  render(
    <Columns title="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`margin: 0px`);
});

test('supports custom space prop', () => {
  render(
    <Columns space={12} title="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`margin: -6px`);
});

test('supports default horizontalAlign prop: left', () => {
  render(
    <Columns title="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`justify-content: flex-start`);
});

test('supports custom horizontalAlign prop: center', () => {
  render(
    <Columns horizontalAlign="center" title="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`justify-content: center`);
});

test('supports custom horizontalAlign prop: right', () => {
  render(
    <Columns horizontalAlign="right" title="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`justify-content: flex-end`);
});

test('supports default verticalAlign prop: top', () => {
  render(
    <Columns title="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`align-items: flex-start`);
});

test('supports custom verticalAlign prop: center', () => {
  render(
    <Columns verticalAlign="center" title="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`align-items: center`);
});

test('supports custom verticalAlign prop: bottom', () => {
  render(
    <Columns verticalAlign="bottom" title="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`align-items: flex-end`);
});

test('renders correct HTML element', () => {
  render(
    <Columns title="column">
      <Column>column</Column>
    </Columns>
  );
  const column = screen.getByTitle(/column/);

  expect(column instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <Column className="custom-class-name" title="column">
      column
    </Column>
  );
  const column = screen.getByTitle(/column/);

  expect(column.className).toMatch('custom-class-name');
});
