import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container, Text } from '@marigold/components';

test('renders correct HTML element', () => {
  render(
    <Container title="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTitle(/container/);

  expect(container instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <Container className="custom-class-name" title="container">
      <Text>text</Text>
    </Container>
  );
  const container = screen.getByTitle(/container/);

  expect(container.className).toMatch('custom-class-name');
});
