import React from 'react';
import { render, screen } from '@testing-library/react';

import { Container } from './Container';
import { Text } from '../Text';

test('renders correct HTML element', () => {
  render(
    <Container data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container instanceof HTMLDivElement).toBeTruthy();
});

test('has default width', () => {
  render(
    <Container data-testid="container">
      <Text>text</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`width: 100%`);
});
