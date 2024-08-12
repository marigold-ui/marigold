import { render, screen } from '@testing-library/react';
import React from 'react';
import { Split } from '../Split';
import { Stack } from '../Stack';

test('we can not really test this ... but anyway', () => {
  render(
    <Stack>
      <p>first</p>
      <Split />
      <p>second</p>
    </Stack>
  );

  const split = screen.getByRole('separator');
  expect(split).toHaveClass(`grow`);
  expect(split).toBeVisible();
});
