import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import * as stories from './Button.stories';

const { Basic, WithIcon } = composeStories(stories);

test('sets some base styles', () => {
  render(<Basic />);
  const button = screen.getByText(/Button/);

  expect(button).toHaveClass(
    'border-border-base bg-bg-inverted text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200',
    'disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed',
    'pending:border-border-base-disabled pending:bg-bg-inverted-disabled pending:text-text-base-disabled pending:cursor-not-allowed',
    'focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-offset-1 outline-hidden',
    'hover:bg-bg-inverted-hover'
  );
});

test('supports base styling classes', () => {
  render(<Basic />);
  const button = screen.getByText(/Button/);

  expect(button.className).toMatchInlineSnapshot(
    `"inline-flex items-center justify-center gap-[0.5ch] border-border-base bg-bg-inverted text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed pending:border-border-base-disabled pending:bg-bg-inverted-disabled pending:text-text-base-disabled pending:cursor-not-allowed focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-offset-1 outline-hidden hover:bg-bg-inverted-hover"`
  );
});

test('supports default size', () => {
  render(<Basic size="small" />);

  const button = screen.getByText(/Button/);

  expect(button).toHaveClass('py-1');
});

test('accepts variants', async () => {
  render(<Basic variant="primary" />);

  const primaryButton = screen.getByText(/Button/);

  expect(primaryButton).toHaveClass(
    'border-border-brand bg-bg-brand text-text-inverted',
    'hover:bg-bg-brand-hover hover:border-border-brand-hover'
  );
});

test('renders <button> element', () => {
  render(<Basic />);

  const button = screen.getByText(/Button/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
});

test('add icon in button works as expected', () => {
  render(<WithIcon>iconbutton</WithIcon>);

  const button = screen.getByText(/iconbutton/);
  const icon = screen.getByTestId(/facebook/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
  expect(button).toHaveClass('items-center justify-center');
  expect(icon).toHaveAttribute('width', '30px');
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(<Basic ref={ref} />);

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

test('supports disabled prop', () => {
  render(<Basic disabled />);

  const button = screen.getByText(/Button/);

  expect(button).toHaveAttribute('disabled');
});

test('allows to take full width', () => {
  render(<Basic fullWidth />);

  const button = screen.getByText(/Button/);

  expect(button).toHaveClass('w-full');
});

test('loading state', () => {
  render(<Basic loading={true} />);

  const button = screen.getByRole('button');
  const svg = screen.getByRole('progressbar');

  expect(svg).toBeInTheDocument();
  expect(button).toHaveAttribute('data-pending', 'true');
  expect(button).toHaveClass('cursor-progress!');
  expect(button).toHaveAttribute('data-pending', 'true');
});
