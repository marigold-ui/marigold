import React from 'react';
import { render, screen } from '@testing-library/react';

import { Aspect } from './Aspect';
import { Text } from '../Text';

test('supports default contentType content', () => {
  render(
    <Aspect data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect).toHaveStyle(`maxWidth: 45ch`);
});

test('supports contentType header', () => {
  render(
    <Aspect contentType="header" data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect).toHaveStyle(`maxWidth: 25ch`);
});

test('supports default size', () => {
  render(
    <Aspect data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect).toHaveStyle(`maxWidth: 45ch`);
});

test('supports size small', () => {
  render(
    <Aspect size="small" data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect).toHaveStyle(`maxWidth: 20ch`);
});

test('supports size large', () => {
  render(
    <Aspect size="large" data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect).toHaveStyle(`maxWidth: 60ch`);
});

test('supports size and contentType', () => {
  render(
    <Aspect size="large" contentType="header" data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect).toHaveStyle(`maxWidth: 35ch`);
});

test('supports default align left', () => {
  render(
    <Aspect data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect).toHaveStyle(`alignItems: flex-start`);
});

test('supports align center', () => {
  render(
    <Aspect align="center" data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect).toHaveStyle(`alignItems: center`);
});

test('supports align right', () => {
  render(
    <Aspect align="right" data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect).toHaveStyle(`alignItems: flex-end`);
});

test('renders correct HTML element', () => {
  render(
    <Aspect data-testid="aspect">
      <Text>sdf</Text>
    </Aspect>
  );
  const aspect = screen.getByTestId(/aspect/);
  expect(aspect instanceof HTMLDivElement).toBeTruthy();
});
