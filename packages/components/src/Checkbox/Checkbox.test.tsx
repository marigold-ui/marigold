import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Label, Checkbox } from '@marigold/components';

test('supports default type', () => {
  render(<Checkbox title="checkbox" />);
  const checkbox = screen.getByTitle(/checkbox/);

  expect(checkbox.getAttribute('type')).toEqual('checkbox');
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(<Checkbox title="checkbox" css={{ color: 'blue' }} />);
  const checkbox = screen.getByTitle(/checkbox/);

  expect(checkbox).not.toHaveStyle('color: blue');
});

test('renders <input> element', () => {
  render(<Checkbox title="checkbox" />);
  const checkbox = screen.getByTitle(/checkbox/);

  expect(checkbox instanceof HTMLInputElement).toBeTruthy();
});

test('renders <SVG> Circle0 element', () => {
  render(
    <Label htmlFor="checkbox">
      <Checkbox id="checkbox" /> Test
    </Label>
  );
  const checkbox = screen.getByText(/Test/);
  expect(checkbox).toContainHTML('path d="M19.2917');
});

test('renders <SVG> Circle1 element', () => {
  render(
    <Label htmlFor="checkbox">
      <Checkbox id="checkbox" checked /> Test
    </Label>
  );
  const checkbox = screen.getByText(/Test/);
  expect(checkbox).toContainHTML('path d="M19.2917');
});

test('change state onClick ', () => {
  render(
    <Label htmlFor="checkbox">
      <Checkbox id="checkbox" /> Test
    </Label>
  );
  const checkbox = screen.getByText(/Test/);
  expect(checkbox).toContainHTML('path d="M19.2917');
  fireEvent.click(checkbox);
  expect(checkbox).toContainHTML('path d="M19.2917');
});
