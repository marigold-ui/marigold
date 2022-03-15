import React from 'react';
import { render, screen } from '@testing-library/react';

import { Center } from './Center';
import { Text } from '../Text';

test('renders correct HTML element', () => {
  render(
    <Center data-testid="container">
      <Text>sdf</Text>
    </Center>
  );
  const container = screen.getByTestId(/container/);
  expect(container instanceof HTMLDivElement).toBeTruthy();
});

test('has default width', () => {
  render(
    <Center data-testid="container">
      <Text>text</Text>
    </Center>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`width: 100%`);
});
