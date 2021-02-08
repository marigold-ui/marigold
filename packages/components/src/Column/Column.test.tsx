import React from 'react';
import { render, screen } from '@testing-library/react';
import { Column } from '@marigold/components';

test('supports width prop', () => {
  render(
    <Column title="column" width={6}>
      column
    </Column>
  );
  const column = screen.getByTitle(/column/);

  expect(column).toHaveStyle(`width: 50%`);
});

test('renders correct HTML element', () => {
  render(<Column title="column">Default</Column>);
  const column = screen.getByTitle(/column/);

  expect(column instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <Column className="custom-class-name" title="column">
      text
    </Column>
  );
  const column = screen.getByTitle(/column/);

  expect(column.className).toMatch('custom-class-name');
});
