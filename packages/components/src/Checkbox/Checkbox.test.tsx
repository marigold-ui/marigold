/* eslint-disable testing-library/no-node-access */
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import * as stories from './Checkbox.stories';

const { Basic } = composeStories(stories);

// There is no real accesible way to get to the element that acts as checkbox
const getVisibleCheckbox = () => {
  const label = screen.getByText('With Label');

  return label.parentElement?.querySelector('[aria-hidden="true"]');
};

// Tests
// ---------------
test('renders label and (hidden) checkbox', () => {
  render(<Basic label="With Label" />);

  const label = screen.getByText('With Label');
  const checkbox = screen.getByLabelText('With Label');

  expect(label).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeInstanceOf(HTMLInputElement);
  expect(checkbox).toHaveAttribute('type', 'checkbox');
});

test('allows to render without label', () => {
  render(<Basic aria-label="No Label" />);

  const checkbox = screen.getByLabelText('No Label');

  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeInstanceOf(HTMLInputElement);
  expect(checkbox).toHaveAttribute('type', 'checkbox');
  expect(checkbox).toHaveAttribute('aria-label', 'No Label');
});

test('check if all slot class names are applied correctly', () => {
  render(<Basic label="With Label" />);

  const label = screen.getByText('With Label');

  expect(label.parentElement?.className).toMatchInlineSnapshot(
    `"group/checkbox flex items-center data-disabled:cursor-not-allowed cursor-pointer read-only:cursor-default gap-2"`
  );
  expect(getVisibleCheckbox()?.className).toMatchInlineSnapshot(
    `"grow-0 basis-4 items-center justify-center p-px bg-white border-solid grid size-4 shrink-0 place-content-center rounded border border-input shadow-xs group-focus-visible/checkbox:state-focus outline-none group-disabled/checkbox:group-selected/checkbox:bg-disabled group-disabled/checkbox:border-disabled! group-disabled/checkbox:text-disabled-foreground group-disabled/checkbox:cursor-not-allowed group-selected/checkbox:border-brand group-selected/checkbox:bg-brand group-selected/checkbox:text-brand-foreground group-[indeterminate]/checkbox:border-brand group-[indeterminate]/checkbox:bg-brand group-[indeterminate]/checkbox:text-brand-foreground"`
  );
  expect(label.className).toMatchInlineSnapshot(
    `"flex items-center gap-1 text-sm leading-4 group-[&]/checkboxgroup:font-normal font-medium text-foregroun group-disabled/checkbox:text-disabled-foreground"`
  );
});

test('correct class name is set on size small', () => {
  render(<Basic label="With Label" size="small" />);

  const label = screen.getByText('With Label');

  expect(label.parentElement?.className).toMatchInlineSnapshot(
    `"group/checkbox flex items-center data-disabled:cursor-not-allowed cursor-pointer read-only:cursor-default gap-2"`
  );
});

test('support default checked', () => {
  render(<Basic label="With Label" defaultChecked />);

  const input = screen.getByLabelText<HTMLInputElement>('With Label');

  expect(input.checked).toBeTruthy();
});

test('supports indeterminate state', () => {
  render(<Basic label="With Label" indeterminate />);

  const input = screen.getByLabelText<HTMLInputElement>('With Label');

  expect(input.indeterminate).toBeTruthy();
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLLabelElement>();
  render(<Basic label="Check it" ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLLabelElement);
});
