/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Inline } from './Inline';

test('default space is "none"', () => {
  render(
    <Inline>
      <p>first</p>
      <p>second</p>
    </Inline>
  );
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveClass(`gap-0`);
});

test('accepts and uses spacing from theme', () => {
  render(
    <Inline space={2}>
      <p>first</p>
      <p>second</p>
    </Inline>
  );
  const first = screen.getByText(/first/).parentElement;
  expect(first).toHaveClass(`gap-2`);
});

test('supports nesting', () => {
  render(
    <Inline space={1}>
      <Inline space={2} data-testid="leftInline">
        <p>first</p>
        <p>second</p>
      </Inline>
      <Inline space={2} data-testid="rightInline">
        <p>third</p>
        <p>fourth</p>
      </Inline>
    </Inline>
  );
  const first = screen.getByText(/first/).parentElement;
  const leftInline = screen.getByTestId('leftInline').parentElement;
  expect(first).toHaveClass(`gap-2`);
  expect(leftInline).toHaveClass(`gap-1`);

  const third = screen.getByText(/third/).parentElement;
  const rightInline = screen.getByTestId('rightInline').parentElement;
  expect(third).toHaveClass(`gap-2`);
  expect(rightInline).toHaveClass(`gap-1`);
});

test('supports a standalone element', () => {
  render(
    <Inline>
      <p>element</p>
    </Inline>
  );
  const element = screen.getByText(/element/).parentElement;
  expect(element).toHaveClass(`gap-0`);
});

test('supports a non React.Fragment element', () => {
  render(
    <Inline space={2}>
      <p>element</p>
      Text
    </Inline>
  );
  const textElement = screen.getByText(/Text/);
  expect(textElement).toHaveClass(`gap-2`);
});

test('renders div per default', () => {
  render(<Inline data-testid="inline">first</Inline>);

  const inline = screen.getByTestId('inline');
  expect(inline instanceof HTMLDivElement).toBeTruthy();
});
