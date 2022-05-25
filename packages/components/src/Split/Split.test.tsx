import React from 'react';
import { render, screen } from '@testing-library/react';

import { Stack } from '../Stack';
import { Text } from '../Text';

import { Split } from '../Split';

test('we can not reall test this ... but anyway', () => {
  render(
    <Stack>
      <Text>first</Text>
      <Split />
      <Text>second</Text>
    </Stack>
  );

  const split = screen.getByRole('separator');
  expect(split).toHaveStyle(`flex-grow: 1`);
  expect(split).toBeVisible();
});
