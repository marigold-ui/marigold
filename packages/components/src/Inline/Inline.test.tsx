/* eslint-disable testing-library/no-node-access */
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { Inline } from './Inline';
import * as stories from './Inline.stories';

// Setup
const { Basic, InputButtonAlignment } = composeStories(stories);

test('default space is "none"', () => {
  render(<Basic />);
  const first = screen.getByText(/Lirum/).parentElement;
  expect(first).toHaveClass(`gap-0`);
});

test('accepts and uses spacing from theme', () => {
  render(<Basic space={2} />);
  const first = screen.getByText(/Lirum/).parentElement;
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

test('adjusts the button to be aligned with input baseline', () => {
  render(<InputButtonAlignment />);

  const inline = screen.getByTestId('inline');
  expect(inline.className).toMatchInlineSnapshot(
    `"flex w-full gap-6 items-end [&:has([slot=description])]:items-end [&:has([slot=description])_>*:not(:has([slot=description]))]:mb-6 [&:has([slot=errorMessage])_>*:not(:has([slot=errorMessage]))]:mb-6"`
  );
});

test('wrap by default', () => {
  render(<Basic data-testid="inline" />);

  const inline = screen.getByTestId('inline');

  expect(inline).toHaveClass('flex-wrap');
});

test('allow to not wrap', () => {
  render(<Basic data-testid="inline" noWrap />);

  const inline = screen.getByTestId('inline');

  expect(inline).not.toHaveClass('flex-nowrap');
});
