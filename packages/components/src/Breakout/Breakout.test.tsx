import { render, screen } from '@testing-library/react';
import { Breakout } from './Breakout';

test('spans all columns', () => {
  render(<Breakout>breakout</Breakout>);
  const breakout = screen.getByText(/breakout/);
  expect(breakout.className).toMatchInlineSnapshot(`"col-span-full!"`);
});
