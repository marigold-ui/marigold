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
  expect(container).toHaveStyle(`gridTemplateColumns: minmax(0, 45ch) 1fr 1fr`);
});

test('supports contentType header', () => {
  render(
    <Container contentType="header" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: minmax(0, 25ch) 1fr 1fr`);
});

test('supports default size', () => {
  render(
    <Container data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: minmax(0, 45ch) 1fr 1fr`);
});

test('supports size small', () => {
  render(
    <Container size="small" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: minmax(0, 20ch) 1fr 1fr`);
});

test('supports size large', () => {
  render(
    <Container size="large" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: minmax(0, 60ch) 1fr 1fr`);
});

test('supports size and contentType', () => {
  render(
    <Container size="large" contentType="header" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: minmax(0, 35ch) 1fr 1fr`);
});

test('supports default align container left', () => {
  render(
    <Container data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: minmax(0, 45ch) 1fr 1fr`);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toHaveStyle(`gridColumn: 1`);
});

test('supports align container center', () => {
  render(
    <Container align="center" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: 1fr minmax(0, 45ch) 1fr`);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toHaveStyle(`gridColumn: 2`);
});

test('supports align container right', () => {
  render(
    <Container align="right" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`gridTemplateColumns: 1fr 1fr minmax(0, 45ch)`);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toHaveStyle(`gridColumn: 3`);
});

test('supports default align items none', () => {
  render(
    <Container data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`placeItems: unset`);
});

test('supports align items center', () => {
  render(
    <Container alignItems="center" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`placeItems: center`);
});

test('supports align items right', () => {
  render(
    <Container alignItems="right" data-testid="container">
      <Text>sdf</Text>
    </Container>
  );
  const container = screen.getByTestId(/container/);
  expect(container).toHaveStyle(`placeItems: end`);
});
