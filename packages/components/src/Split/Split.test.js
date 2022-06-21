import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Split } from '../Split';
test('we can not reall test this ... but anyway', () => {
  render(
    React.createElement(
      Stack,
      null,
      React.createElement(Text, null, 'first'),
      React.createElement(Split, null),
      React.createElement(Text, null, 'second')
    )
  );
  const split = screen.getByRole('separator');
  expect(split).toHaveStyle(`flex-grow: 1`);
  expect(split).toBeVisible();
});
//# sourceMappingURL=Split.test.js.map
