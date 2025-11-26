/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

test('default space is "0"', () => {
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
    <Stack space={2}>
      <p>first</p>
      <p>second</p>
    </Stack>
  );
  const first = screen.getByText(/first/).parentElement;
  expect(first?.className).toMatchInlineSnapshot(`"flex flex-col gap-2"`);
});

test('children are not aligned by default', () => {
  render(
    <Stack data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).not.toHaveClass('justify-start items-start');
});

test('allows to align children to the left', () => {
  render(
    <Stack alignX="left" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack.className).toMatchInlineSnapshot(
    `"flex flex-col gap-0 items-start"`
  );
});

test('allows to align children to the center', () => {
  render(
    <Stack alignX="center" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack.className).toMatchInlineSnapshot(
    `"flex flex-col gap-0 items-center"`
  );
});

test('allows to align children to the right', () => {
  render(
    <Stack alignX="right" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack.className).toMatchInlineSnapshot(
    `"flex flex-col gap-0 items-end"`
  );
});

test('allows to align children to the vertical top', () => {
  render(
    <Stack alignY="top" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack.className).toMatchInlineSnapshot(
    `"flex flex-col gap-0 justify-start"`
  );
});

test('allows to align children to the vertical center', () => {
  render(
    <Stack alignY="center" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack.className).toMatchInlineSnapshot(
    `"flex flex-col gap-0 justify-center"`
  );
});

test('allows to align children to the bottom', () => {
  render(
    <Stack alignY="bottom" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack.className).toMatchInlineSnapshot(
    `"flex flex-col gap-0 justify-end"`
  );
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
    <Stack space={4}>
      <Stack space={3} data-testid="upperStack">
        <p>first</p>
        <p>second</p>
      </Stack>
      <Stack space={3} data-testid="lowerStack">
        <p>third</p>
        <p>fourth</p>
      </Stack>
    </Stack>
  );
  const first = screen.getByText(/first/).parentElement;
  const upperStack = screen.getByTestId('upperStack').parentElement;
  expect(first).toHaveClass(`gap-3`);
  expect(upperStack).toHaveClass(`gap-4`);

  const third = screen.getByText(/third/).parentElement;
  const lowerStack = screen.getByTestId('lowerStack').parentElement;
  expect(third).toHaveClass(`gap-3`);
  expect(lowerStack).toHaveClass(`gap-4`);
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

test('supports rendering as list element', () => {
  render(
    <Stack data-testid="stack" asList>
      <p>first</p>
      <p>second</p>
    </Stack>
  );

  const stack = screen.getByTestId('stack');
  const listItems = screen.getAllByRole('listitem');

  expect(stack instanceof HTMLUListElement).toBeTruthy();
  expect(listItems[0] instanceof HTMLLIElement).toBeTruthy();
});
