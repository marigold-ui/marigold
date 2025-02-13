import { render, screen } from '@testing-library/react';
import React from 'react';
import { Breakout } from './Breakout';

test('spans all columns', () => {
  render(<Breakout>breakout</Breakout>);
  const breakout = screen.getByText(/breakout/);
  expect(breakout.className).toMatchInlineSnapshot(`"![grid-column:1/-1]"`);
});
