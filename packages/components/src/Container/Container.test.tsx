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
  expect(container).toHaveStyle(`gridTemplateColumns: 45ch 1fr 1fr`);
});

test('supports contentType header', () => {
  render(
    <Container contentType="header" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: 25ch 1fr 1fr`);
});

test('supports default size', () => {
  render(
    <Container data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: 45ch 1fr 1fr`);
});

test('supports size small', () => {
  render(
    <Container size="small" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: 20ch 1fr 1fr`);
});

test('supports size large', () => {
  render(
    <Container size="large" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: 60ch 1fr 1fr`);
});

test('supports size and contentType', () => {
  render(
    <Container size="large" contentType="header" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: 35ch 1fr 1fr`);
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

test('supports default alignContainer left', () => {
  render(
    <Container data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: 45ch 1fr 1fr`);
  expect(container.firstChild).toHaveStyle(`gridColumn: 1`);
});

test('supports alignContainer center', () => {
  render(
    <Container alignContainer="center" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: 1fr 45ch 1fr`);
  expect(container.firstChild).toHaveStyle(`gridColumn: 2`);
});

test('supports alignContainer right', () => {
  render(
    <Container alignContainer="right" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: 1fr 1fr 45ch`);
  expect(container.firstChild).toHaveStyle(`gridColumn: 3`);
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
