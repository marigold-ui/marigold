import React from 'react';
import { render, screen } from '@testing-library/react';
import { Hidden } from '@marigold/components';

test('text is not visible, show prop = false', () => {
  render(<Hidden>Default</Hidden>);
  const hidden = screen.getByText('Default');

  expect(hidden).not.toBeVisible();
});

test('support show prop = true', () => {
  render(<Hidden show={true}>Default</Hidden>);
  const hidden = screen.getByText('Default');

  expect(hidden).toBeVisible();
});

test('renders correct HTML element', () => {
  render(<Hidden>Default</Hidden>);
  const hidden = screen.getByText('Default');

  expect(hidden instanceof HTMLSpanElement).toBeTruthy();
});
