import React from 'react';
import { render, screen } from '@testing-library/react';
import { Hidden } from '@marigold/components';

test('text is not visible, show prop = false', () => {
  render(<Hidden title="hidden">Hidden</Hidden>);
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden).not.toBeVisible();
});

test('support show prop = true', () => {
  render(
    <Hidden title="hidden" show={true}>
      Default
    </Hidden>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden).toBeVisible();
});

test('renders correct HTML element', () => {
  render(<Hidden title="hidden">Default</Hidden>);
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden instanceof HTMLSpanElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <Hidden className="custom-class-name" title="hidden">
      text
    </Hidden>
  );
  const hidden = screen.getByTitle(/hidden/);

  expect(hidden.className).toMatch('custom-class-name');
});
