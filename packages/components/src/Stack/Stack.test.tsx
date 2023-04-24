/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Stack } from './Stack';

test('default space is "none"', () => {
  render(
    <Stack>
      <p>first</p>
      <p>second</p>
    </Stack>
  );
  const first = screen.getByText('first').parentElement;

  expect(first).toHaveClass(`gap-0`);
});

test('uses spacing from theme', () => {
  render(
    <Stack space="small">
      <p>first</p>
      <p>second</p>
    </Stack>
  );
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveClass(`gap-16`);
});

test('children are not aligned by default', () => {
  render(
    <Stack data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass(`initial`);
});

test('allows to align children to the left', () => {
  render(
    <Stack alignX="left" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass(`items-start`);
});

test('allows to align children to the center', () => {
  render(
    <Stack alignX="center" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass(`items-center`);
});

test('allows to align children to the right', () => {
  render(
    <Stack alignX="right" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass(`items-end`);
});

test('children are not aligned vertically by default', () => {
  render(
    <Stack data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass(`initial`);
});

test('allows to align children to the vertical top', () => {
  render(
    <Stack alignY="top" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass(`justify-start`);
});

test('allows to align children to the vertical center', () => {
  render(
    <Stack alignY="center" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass(`justify-center`);
});

test('allows to align children to the bottom', () => {
  render(
    <Stack alignY="bottom" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass(`justify-end`);
});

test('allows to fill space with stretch prop', () => {
  render(
    <Stack stretch data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass(`w-full h-full`);
});

test('supports nesting', () => {
  render(
    <Stack space="large">
      <Stack space="small" data-testid="upperStack">
        <p>first</p>
        <p>second</p>
      </Stack>
      <Stack space="small" data-testid="lowerStack">
        <p>third</p>
        <p>fourth</p>
      </Stack>
    </Stack>
  );
  const first = screen.getByText(/first/).parentElement;
  const upperStack = screen.getByTestId('upperStack').parentElement;
  expect(first).toHaveClass(`gap-16`);
  expect(upperStack).toHaveClass(`gap-32`);

  const third = screen.getByText(/third/).parentElement;
  const lowerStack = screen.getByTestId('lowerStack').parentElement;
  expect(third).toHaveClass(`gap-16`);
  expect(lowerStack).toHaveClass(`gap-32`);
});

test('renders as div per default', () => {
  render(
    <Stack data-testid="stack">
      <p>first</p>
      <p>second</p>
    </Stack>
  );

  const stack = screen.getByTestId('stack');
  expect(stack instanceof HTMLDivElement).toBeTruthy();
});
