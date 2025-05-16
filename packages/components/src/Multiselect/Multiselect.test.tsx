import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import * as stories from './Multiselect.stories';

const { Basic } = composeStories(stories);

test('renders input and label', () => {
  render(<Basic />);

  expect(screen.getByLabelText('Ticket Categories')).toBeInTheDocument();
  expect(screen.getByText('Ticket Categories')).toBeInTheDocument();
});

test('supports disabled state', () => {
  render(<Basic disabled />);

  const input = screen.getByLabelText('Ticket Categories');
  expect(input).toBeInTheDocument();
  expect(input).toBeDisabled();
});

test('shows selected options as tags', async () => {
  render(
    <Basic
      defaultSelectedItems={[
        { value: 'general', label: 'General Admission' },
        { value: 'vip', label: 'VIP Experience' },
      ]}
    />
  );

  expect(screen.getByText('General Admission')).toBeInTheDocument();
  expect(screen.getByText('VIP Experience')).toBeInTheDocument();
});

test('shows error message when error is present', () => {
  render(<Basic error errorMessage="Invalid selection" />);

  expect(screen.getByText('Invalid selection')).toBeInTheDocument();
});

test('renders close button in selected tags', async () => {
  render(<Basic defaultSelectedItems={['General Admission']} />);

  const removeButton = await screen.findByRole('button', {
    name: /remove/i,
  });
  expect(removeButton).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-node-access
  expect(removeButton.querySelector('svg')).toBeVisible();
});

test('Allow styling container & input via theme', () => {
  render(<Basic defaultValue="General Admission" />);

  // eslint-disable-next-line testing-library/no-node-access
  const field = screen.getByText('Ticket Categories').parentElement;
  expect(field?.className).toMatchInlineSnapshot(
    `"grid grid-cols-[min-content_1fr] grid-rows-[min-content_min-content] gap-x-2 gap-y-0.5 group/field"`
  );

  const input = screen.getByDisplayValue('General Admission');
  expect(input.className).toMatchInlineSnapshot(
    `"bg-transparent flex-1 h-full leading-[22px] data-[focused]:outline-hidden outline-hidden border-0 disabled:cursor-not-allowed group-data-[icon]/input:pl-5 group-data-[action]/input:pr-8 placeholder:text-text-inverted-disabled"`
  );
});
