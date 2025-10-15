import { screen } from '@testing-library/react';
import { createRef } from 'react';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { SelectList } from './SelectList';
import { SelectListItem } from './SelectListItem';

const theme: Theme = {
  name: 'test',
  components: {
    ListBox: {
      container: cva(''),
      list: cva(''),
      item: cva(''),
      section: cva(''),
      header: cva(''),
    },
    Checkbox: {
      container: cva(''),
      label: cva(''),
      checkbox: cva(''),
      group: cva(''),
    },
    Card: cva(''),
    Field: cva(''),
  },
};

const { render } = setup({ theme });

test('renders element with children', () => {
  render(
    <SelectList selectionMode="single" aria-label="Pokemon list">
      <SelectListItem id="item1" variant="card" textValue="Charizard">
        <SelectList.Label>Charizard</SelectList.Label>
      </SelectListItem>
    </SelectList>
  );

  expect(screen.getByText('Charizard')).toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLDivElement>();

  render(
    <SelectList selectionMode="single" aria-label="Test list">
      <SelectListItem id="item1" variant="card" ref={ref}>
        Item Text
      </SelectListItem>
    </SelectList>
  );

  expect(ref.current instanceof HTMLDivElement).toBeTruthy();
});

test('renders card and simple variants', () => {
  const { rerender } = render(
    <SelectList selectionMode="single" aria-label="Test list">
      <SelectListItem id="item1" variant="card" textValue="Card">
        <SelectList.Label>Card Item</SelectList.Label>
      </SelectListItem>
    </SelectList>
  );

  expect(screen.getByRole('row')).toHaveClass('flex', 'w-full');

  rerender(
    <SelectList selectionMode="single" aria-label="Test list">
      <SelectListItem id="item1" variant="simple">
        Simple Item
      </SelectListItem>
    </SelectList>
  );

  expect(screen.getByRole('row')).toHaveClass('grid', 'grid-flow-col');
});

test('supports disabled prop', () => {
  render(
    <SelectList selectionMode="single" aria-label="Test list">
      <SelectListItem id="item1" disabled variant="card">
        Disabled Item
      </SelectListItem>
    </SelectList>
  );

  expect(screen.getByRole('row')).toHaveAttribute('aria-disabled', 'true');
});

test('shows checkbox for multiple selection mode', () => {
  render(
    <SelectList selectionMode="multiple" aria-label="Test list">
      <SelectListItem id="item1" variant="card" textValue="Item 1">
        <SelectList.Label>Item 1</SelectList.Label>
      </SelectListItem>
      <SelectListItem id="item2" variant="card" textValue="Item 2">
        <SelectList.Label>Item 2</SelectList.Label>
      </SelectListItem>
    </SelectList>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes.length).toBe(2);
});

test('renders compound structure with sub-components', () => {
  render(
    <SelectList selectionMode="single" aria-label="Test list">
      <SelectListItem id="item1" variant="card" textValue="Charizard">
        <SelectList.Image src="/charizard.jpg" alt="Charizard" size="large" />
        <SelectList.Label>Charizard</SelectList.Label>
        <SelectList.Description>
          A Pokemon with fire and flying abilities
        </SelectList.Description>
        <SelectList.Action>
          <button type="button">More info</button>
        </SelectList.Action>
      </SelectListItem>
    </SelectList>
  );

  expect(screen.getByText('Charizard')).toBeInTheDocument();
  expect(screen.getByAltText('Charizard')).toBeInTheDocument();
  expect(
    screen.getByText('A Pokemon with fire and flying abilities')
  ).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});
