import React from 'react';
import { render, screen } from '@testing-library/react';
import { Radio } from '@marigold/components';

test('supports label prop', () => {
  render(<Radio label="Test" id="test" title="radio" />);
  const radio = screen.getByText(/Test/);

  expect(radio).toBeDefined();
});

test('supports required prop an renders required icon', () => {
  render(<Radio label="Test" id="test" required title="radio" />);
  const radio = screen.getByText(/Test/);

  expect(radio).toContainHTML('path d="M10.8');
});

test('supports default type', () => {
  render(<Radio id="radio" title="radio" />);
  const radio = screen.getByTitle(/radio/);

  expect(radio.getAttribute('type')).toEqual('radio');
});

test('renders <input> element', () => {
  render(<Radio id="radio" title="radio" />);
  const radio = screen.getByTitle(/radio/);

  expect(radio instanceof HTMLInputElement).toBeTruthy();
});

test('renders <SVG> CircleUnchecked element', () => {
  render(<Radio id="radio" label="Test" />);
  const radio = screen.getByText(/Test/);
  expect(radio).toContainHTML('path d="M5.62507');
});

test('renders <SVG> CircleChecked element', () => {
  render(<Radio id="radio" checked onChange={() => {}} label="Test" />);
  const radio = screen.getByText(/Test/);
  expect(radio).toContainHTML('path d="M12');
});
