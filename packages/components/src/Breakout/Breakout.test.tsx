import React from 'react';
import { render, screen } from '@testing-library/react';

import { Breakout } from './Breakout';

test('has gridColumn, alignment and default width via classname', () => {
  render(<Breakout data-testid="breakout">breakout</Breakout>);
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout.className).toMatchInlineSnapshot(
    `"col-[\`1_/_-1_!important\`] w-full justify-start items-start flex h-[--height]"`
  );
});
test('supports horizontal center', () => {
  render(
    <Breakout alignX="center" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout.className).toMatchInlineSnapshot(
    `"col-[\`1_/_-1_!important\`] w-full justify-center items-start flex h-[--height]"`
  );
});

test('supports horizontalAlign right', () => {
  render(
    <Breakout alignX="right" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveClass(`justify-end`);
});

test('supports default vertical align top', () => {
  render(<Breakout data-testid="breakout">breakout</Breakout>);
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveClass(`items-start`);
});

test('supports verticalAlign center', () => {
  render(
    <Breakout alignY="center" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout).toHaveClass(`items-center`);
});

test('supports verticalAlign bottom', () => {
  render(
    <Breakout alignY="bottom" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout.className).toMatchInlineSnapshot(
    `"col-[\`1_/_-1_!important\`] w-full justify-start items-end flex h-[--height]"`
  );
});

test('supports height prop', () => {
  render(
    <Breakout height="200px" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout.className).toMatchInlineSnapshot(
    `"col-[\`1_/_-1_!important\`] w-full justify-start items-start flex h-[--height]"`
  );
});

test('no align set', () => {
  render(
    <Breakout alignY="none" alignX="none" height="200px" data-testid="breakout">
      breakout
    </Breakout>
  );
  const breakout = screen.getByTestId(/breakout/);
  expect(breakout.className).toMatchInlineSnapshot(
    `"col-[\`1_/_-1_!important\`] w-full block h-[--height]"`
  );
});
