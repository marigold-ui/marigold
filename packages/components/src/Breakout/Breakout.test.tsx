import React from 'react';
import { render, screen } from '@testing-library/react';

import { Breakout } from './Breakout';

test('has gridColumn and default width', () => {
  render(<Breakout data-testid="breakout">breakout</Breakout>);
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`grid-column: 1/-1`);
  expect(breakout).toHaveStyle(`width: 100%`);
});

test('supports default horizontalAlign left', () => {
  render(<Breakout data-testid="breakout">breakout</Breakout>);
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`justifyContent: flex-start`);
});

test('supports horizontal center', () => {
  render(
    <Breakout horizontalAlign="center" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`justifyContent: center`);
});

test('supports horizontalAlign right', () => {
  render(
    <Breakout horizontalAlign="right" data-testid="breakout">
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

test('supports verticalAlign center', () => {
  render(
    <Breakout verticalAlign="center" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`alignItems: center`);
});

test('supports verticalAlign bottom', () => {
  render(
    <Breakout verticalAlign="bottom" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`alignItems: flex-end`);
});

test('supports height prop', () => {
  render(
    <Breakout height="200px" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveStyle(`height: 200px`);
});
