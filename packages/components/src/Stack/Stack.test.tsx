import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';
import { Text } from '../Text';

test('supports default space prop', () => {
  render(
    <Stack title="stack">
      <Text>stack</Text>
    </Stack>
  );
  const stack = screen.getByTitle(/stack/);

  expect(stack).toHaveStyle(`padding: 0px`);
});

test('supports custom space prop', () => {
  render(
    <Stack space={2} title="stack">
      <Text>stack</Text>
    </Stack>
  );
  const stack = screen.getByTitle(/stack/);

  expect(stack).toHaveStyle(`padding: 8px`);
});

test('supports default prop align: left', () => {
  render(<Stack title="stack">stack</Stack>);
  const stack = screen.getByText(/stack/);

  expect(stack).toHaveStyle(`align-items: flex-start`);
});

test('supports custom prop align: center', () => {
  render(
    <Stack align="center" title="stack">
      stack
    </Stack>
  );
  const stack = screen.getByText(/stack/);

  expect(stack).toHaveStyle(`align-items: center`);
});

test('supports custom prop align: right', () => {
  render(
    <Stack align="right" title="stack">
      stack
    </Stack>
  );
  const stack = screen.getByText(/stack/);

  expect(stack).toHaveStyle(`align-items: flex-end`);
});

test('supports two children', () => {
  render(
    <Stack title="stack">
      <Text>stackText</Text>
      <Text>secondStackText</Text>
    </Stack>
  );
  const stack = screen.getByTitle(/stack/);
  const stackText = screen.getByText(/stackText/);
  const secondStackText = screen.getByText(/secondStackText/);

  expect(stack).toBeDefined();
  expect(stackText).toBeDefined();
  expect(secondStackText).toBeDefined();
});

test('supports nested children', () => {
  render(
    <Stack title="stack">
      <Stack title="nested">
        <Text>text</Text>
      </Stack>
    </Stack>
  );
  const stack = screen.getByTitle(/stack/);
  const nested = screen.getByTitle(/nested/);
  const text = screen.getByText(/text/);

  expect(stack).toBeDefined();
  expect(nested).toBeDefined();
  expect(text).toBeDefined();
});

test('renders correct HTML element', () => {
  render(
    <Stack title="stack">
      <Text>sdf</Text>
    </Stack>
  );
  const stack = screen.getByTitle(/stack/);

  expect(stack instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <Stack className="custom-class-name" title="stack">
      <Text>text</Text>
    </Stack>
  );
  const stack = screen.getByTitle(/stack/);

  expect(stack.className).toMatch('custom-class-name');
});
