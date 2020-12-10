import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label, Radio } from '@marigold/components';

test('supports default type', () => {
  render(<Radio title="radio" />);
  const radio = screen.getByTitle(/radio/);

  expect(radio.getAttribute('type')).toEqual('radio');
});

test('renders <input> element', () => {
  render(<Radio title="radio" />);
  const radio = screen.getByTitle(/radio/);

  expect(radio instanceof HTMLInputElement).toBeTruthy();
});

test('renders <SVG> CircleUnchecked element', () => {
  render(
    <Label htmlFor="radio">
      <Radio id="radio" /> Test
    </Label>
  );
  const radio = screen.getByText(/Test/);
  expect(radio).toContainHTML('path d="M5.62507');
});

test('renders <SVG> CircleChecked element', () => {
  render(
    <Label htmlFor="radio">
      <Radio id="radio" checked onChange={() => {}} /> Test
    </Label>
  );
  const radio = screen.getByText(/Test/);
  expect(radio).toContainHTML('path d="M12');
});
