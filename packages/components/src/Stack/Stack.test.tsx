import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stack, Text } from '@marigold/components';

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
    <Stack space={4} title="stack">
      <Text>stack</Text>
    </Stack>
  );
  const stack = screen.getByTitle(/stack/);

  expect(stack).toHaveStyle(`padding: 32px`);
});

test('supports default align prop', () => {
  render(
    <Stack title="stack">
      <Text title="stackContent">stack</Text>
    </Stack>
  );
  const stack = screen.getByText(/stack/);

  stack.hasAttribute(`align-items: flex-start`);
});

test('supports center align prop', () => {
  render(
    <Stack align="center" title="stack">
      <Text title="stackContent">stack</Text>
    </Stack>
  );
  const stack = screen.getByText(/stack/);

  stack.hasAttribute(`align-items: center`);
});

test('supports right align prop', () => {
  render(
    <Stack align="right" title="stack">
      <Text title="stackContent">stack</Text>
    </Stack>
  );
  const stack = screen.getByText(/stack/);

  stack.hasAttribute(`align-items: flex-end`);
});

test('supports two children', () => {
  render(
    <Stack align="right" title="stack">
      <Text title="stackContent">stack</Text>
      <Text title="stackContent2">secondStack</Text>
    </Stack>
  );
  const stack = screen.getByText(/stack/);
  const secondStack = screen.getByText(/secondStack/);

  expect(stack).toBeDefined;
  expect(secondStack).toBeDefined;
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
