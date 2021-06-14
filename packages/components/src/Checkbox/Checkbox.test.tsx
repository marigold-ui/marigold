import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

test('supports label prop', () => {
  render(<Checkbox label="Test" id="test" title="checkbox" />);
  const checkbox = screen.getByText(/Test/);

  expect(checkbox).toBeDefined();
});

test('supports required prop an renders required icon', () => {
  render(<Checkbox label="Test" id="test" required title="checkbox" />);
  const checkbox = screen.getByText(/Test/);

  expect(checkbox).toContainHTML('path d="M10.8');
});

test('supports default type', () => {
  render(<Checkbox id="test" title="checkbox" />);
  const checkbox = screen.getByTitle(/checkbox/);

  expect(checkbox.getAttribute('type')).toEqual('checkbox');
});

test('renders <input> element', () => {
  render(<Checkbox id="test" title="checkbox" />);
  const checkbox = screen.getByTitle(/checkbox/);

  expect(checkbox instanceof HTMLInputElement).toBeTruthy();
});

test('renders <SVG> SquareUnchecked element', () => {
  render(<Checkbox id="checkbox" label="Test" />);
  const checkbox = screen.getByText(/Test/);
  expect(checkbox).toContainHTML('path d="M19.2917');
});

test('renders <SVG> SquareChecked element', () => {
  render(<Checkbox id="checkbox" label="Test" checked onChange={() => {}} />);
  const checkbox = screen.getByText(/Test/);
  expect(checkbox).toContainHTML('path d="M19.2917 2.62');
});

test('change state onClick', () => {
  render(<Checkbox id="checkbox" label="Test" />);
  const checkbox = screen.getByText(/Test/);
  expect(checkbox).toContainHTML('path d="M19.2917');
  fireEvent.click(checkbox);
  expect(checkbox).toContainHTML('path d="M19.2917');
});
