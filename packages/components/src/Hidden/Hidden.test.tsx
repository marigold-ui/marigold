import React from 'react';
import { render, screen } from '@testing-library/react';
import { Hidden } from './Hidden';

test('supports default of show prop', () => {
  render(<Hidden>Default</Hidden>);
  const hidden = screen.getByText('Default');

  expect(hidden).toHaveStyle(`overflow: hidden`);
});

test('support show prop = true', () => {
  render(<Hidden show={true}>Default</Hidden>);
  const hidden = screen.getByText('Default');

  expect(hidden).toBeVisible();
});

test('renders correct HTML element', () => {
  render(<Hidden>Default</Hidden>);
  const hidden = screen.getByText('Default');

  expect(hidden instanceof HTMLDivElement).toBeTruthy();
});
