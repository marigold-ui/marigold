import React from 'react';
import { render, screen } from '@testing-library/react';

import { Container } from './Container';
import { Text } from '../Text';

test('supports default contentType content', () => {
  render(
    <Container data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`maxWidth: 45ch`);
});

test('supports contentType header', () => {
  render(
    <Container contentType="header" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`maxWidth: 25ch`);
});

test('supports default size', () => {
  render(
    <Container data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`maxWidth: 45ch`);
});

test('supports size small', () => {
  render(
    <Container size="small" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`maxWidth: 20ch`);
});

test('supports size large', () => {
  render(
    <Container size="large" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`maxWidth: 60ch`);
});

test('supports size and contentType', () => {
  render(
    <Container size="large" contentType="header" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`maxWidth: 35ch`);
});

test('supports default align left', () => {
  render(
    <Container data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`placeItems: flex-start`);
});

test('supports align center', () => {
  render(
    <Container align="center" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`placeItems: center`);
});

test('supports align right', () => {
  render(
    <Container align="right" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`placeItems: flex-end`);
});

test('renders correct HTML element', () => {
  render(
    <Container data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container instanceof HTMLDivElement).toBeTruthy();
});
