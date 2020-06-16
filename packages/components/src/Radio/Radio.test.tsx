import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Label, Radio } from '@marigold/components';

test('supports default type', () => {
  render(<Radio title="radio" />);
  const radio = screen.getByTitle(/radio/);

  expect(radio.getAttribute('type')).toEqual('radio');
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(<Radio title="radio" css={{ color: 'blue' }} />);
  const radio = screen.getByTitle(/radio/);

  expect(radio).not.toHaveStyle('color: blue');
});

test('renders <input> element', () => {
  render(<Radio title="radio" />);
  const radio = screen.getByTitle(/radio/);

  expect(radio instanceof HTMLInputElement).toBeTruthy();
});

test('renders <SVG> Circle0 element', () => {
  render(
    <Label htmlFor="radio">
      <Radio id="radio" /> Test
    </Label>
  );
  const radio = screen.getByText(/Test/);
  expect(radio).toContainHTML('path d="M5.62507');
});

test('renders <SVG> Circle1 element', () => {
  render(
    <Label htmlFor="radio">
      <Radio id="radio" checked /> Test
    </Label>
  );
  const radio = screen.getByText(/Test/);
  expect(radio).toContainHTML('path d="M12');
});

test('change state onClick ', () => {
  render(
    <Label htmlFor="radio">
      <Radio id="radio" /> Test
    </Label>
  );
  const radio = screen.getByText(/Test/);
  expect(radio).toContainHTML('path d="M5.62507');
  fireEvent.click(radio);
  expect(radio).toContainHTML('path d="M12');
});
