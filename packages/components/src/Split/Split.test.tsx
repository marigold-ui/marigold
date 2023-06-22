import React from 'react';
import { render, screen } from '@testing-library/react';

import { Stack } from '../Stack';
import { Split } from '../Split';

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
