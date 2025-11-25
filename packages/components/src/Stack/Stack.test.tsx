/* eslint-disable testing-library/no-node-access */
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';
import * as stories from './Stack.stories';

const { Basic, Nested, Stretch } = composeStories(stories);

// Story-based tests
test('Basic story renders Stack with spacing from theme', () => {
  render(<Basic />);

  const headline = screen.getByText(/Getting Started with Stack/);
  expect(headline).toBeInTheDocument();
});

test('Basic story applies spacing classes', () => {
  render(<Basic />);

  const description = screen.getByText(
    /The Stack component provides a flexible layout system/
  );
  expect(description).toBeInTheDocument();
});

test('Nested story renders multiple Stack levels with different spacing', () => {
  render(<Nested />);

  const headlines = screen.getAllByText(/spacing/);
  expect(headlines.length).toBeGreaterThan(0);
});

test('Stretch story renders with content', () => {
  render(<Stretch />);

  expect(screen.getByText(/Lirum/)).toBeInTheDocument();
  expect(screen.getByText(/Larum/)).toBeInTheDocument();
  expect(screen.getByText(/Löffelstiel/)).toBeInTheDocument();
});

// Direct component tests
test('default space is "0"', () => {
  render(
    <Stack>
      <p>first</p>
      <p>second</p>
    </Stack>
  );
  const first = screen.getByText('first').parentElement;

  expect(first).toHaveClass('flex', 'w-full', 'flex-col');
  expect(first?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 0)'
  );
});

test('uses spacing from theme', () => {
  render(
    <Stack space={2}>
      <p>first</p>
      <p>second</p>
    </Stack>
  );
  const stack = screen.getByText(/first/).parentElement;
  expect(stack?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 2)'
  );
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

test('allows to align children to the left', () => {
  render(
    <Stack alignX="left" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass('items-start');
  expect(stack?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 0)'
  );
});

test('allows to align children to the center', () => {
  render(
    <Stack alignX="center" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass('items-center');
  expect(stack?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 0)'
  );
});

test('allows to align children to the right', () => {
  render(
    <Stack alignX="right" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass('items-end');
  expect(stack?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 0)'
  );
});

test('allows to align children to the vertical top', () => {
  render(
    <Stack alignY="top" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass('justify-start');
  expect(stack?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 0)'
  );
});

test('allows to align children to the vertical center', () => {
  render(
    <Stack alignY="center" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass('justify-center');
  expect(stack?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 0)'
  );
});

test('allows to align children to the bottom', () => {
  render(
    <Stack alignY="bottom" data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass('justify-end');
  expect(stack?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 0)'
  );
});

test('allows to fill space with stretch prop', () => {
  render(
    <Stack stretch data-testid="stack">
      <p>first</p>
    </Stack>
  );
  const stack = screen.getByTestId('stack');
  expect(stack).toHaveClass(`h-full`);
});

test('supports nesting', () => {
  render(
    <Stack space={4} data-testid="outer">
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
  const outerStack = screen.getByTestId('outer');
  const upperStack = screen.getByTestId('upperStack');
  const lowerStack = screen.getByTestId('lowerStack');

  // Outer stack has space={4}
  expect(outerStack?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 4)'
  );

  // Inner stacks have space={3}
  expect(upperStack?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 3)'
  );
  expect(lowerStack?.style.getPropertyValue('--space')).toBe(
    'calc(var(--spacing) * 3)'
  );
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
