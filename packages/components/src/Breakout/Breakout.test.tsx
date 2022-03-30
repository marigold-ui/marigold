import React from 'react';
import { render, screen } from '@testing-library/react';

import { Breakout } from './Breakout';

test('has gridColumn and default width', () => {
  render(<Breakout data-testid="breakout">breakout</Breakout>);
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`grid-column: 1/-1`);
  expect(breakout).toHaveStyle(`width: 100%`);
});

test('supports default verticalAlign left', () => {
  render(<Breakout data-testid="breakout">breakout</Breakout>);
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`justifyContent: flex-start`);
});

test('supports verticalAlign center', () => {
  render(
    <Breakout verticalAlign="center" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`justifyContent: center`);
});

test('supports verticalAlign right', () => {
  render(
    <Breakout verticalAlign="right" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`justifyContent: flex-end`);
});

test('supports default horizontalAlign top', () => {
  render(<Breakout data-testid="breakout">breakout</Breakout>);
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`alignItems: flex-start`);
});

test('supports horizontalAlign center', () => {
  render(
    <Breakout horizontalAlign="center" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`alignItems: center`);
});

test('supports horizontalAlign bottom', () => {
  render(
    <Breakout horizontalAlign="bottom" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`alignItems: flex-end`);
});
