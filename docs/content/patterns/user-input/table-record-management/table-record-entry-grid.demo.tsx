'use client';

import { useState } from 'react';
import {
  Button,
  Description,
  Inline,
  NumberField,
  Panel,
  Table,
  Text,
  TextField,
  Title,
} from '@marigold/components';

interface Allocation {
  id: string;
  venue: string;
  capacity: number;
  price: number;
  note: string;
}

const initialAllocations: Allocation[] = [
  {
    id: '1',
    venue: 'Main Street Amphitheater',
    capacity: 500,
    price: 34.5,
    note: '',
  },
  {
    id: '2',
    venue: 'Shakytown Comedy Club',
    capacity: 300,
    price: 22,
    note: '',
  },
  { id: '3', venue: 'Harbor Lights Hall', capacity: 850, price: 41, note: '' },
  { id: '4', venue: 'The Old Tannery', capacity: 220, price: 18.5, note: '' },
  { id: '5', venue: 'Northgate Arena', capacity: 4200, price: 55, note: '' },
  { id: '6', venue: 'Riverside Pavilion', capacity: 640, price: 29, note: '' },
];

export default () => {
  const [rows, setRows] = useState(initialAllocations);
  const [saved, setSaved] = useState(initialAllocations);

  const update = <K extends keyof Allocation>(
    id: string,
    field: K,
    value: Allocation[K]
  ) =>
    setRows(prev =>
      prev.map(row => (row.id === id ? { ...row, [field]: value } : row))
    );

  // A data-entry grid commits as a batch, so it needs its own notion of "dirty".
  const changed = rows.filter((row, i) => {
    const before = saved[i];
    return (
      row.capacity !== before.capacity ||
      row.price !== before.price ||
      row.note !== before.note
    );
  }).length;

  // An emptied NumberField commits NaN, which would poison the footer total.
  const invalid = rows.some(row => Number.isNaN(row.capacity));

  const totalCapacity = rows.reduce(
    (sum, row) => sum + (Number.isNaN(row.capacity) ? 0 : row.capacity),
    0
  );

  return (
    <Panel aria-label="Seat allocation">
      <Panel.Header>
        <Title>Seat allocation</Title>
        <Description>
          Press the left or right arrow inside a field and the caret moves
          through the value instead of jumping to another cell. Shift+Tab steps
          back out onto the cell, where the arrow keys move between cells.
        </Description>
      </Panel.Header>
      <Panel.Content bleed>
        <Table
          aria-label="Seat allocation per venue"
          size="compact"
          // Without this the grid keeps the arrow keys and focus lands on the row.
          keyboardNavigationBehavior="tab" // [!code highlight]
        >
          <Table.Header>
            {/* Read-only, and marks the row for assistive tech. */}
            <Table.Column rowHeader>Venue</Table.Column>
            <Table.Column alignX="right" width={140}>
              Capacity
            </Table.Column>
            <Table.Column alignX="right" width={140}>
              Price
            </Table.Column>
            <Table.Column>Note</Table.Column>
          </Table.Header>
          <Table.Body>
            {rows.map(row => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.venue}</Table.Cell>
                <Table.Cell>
                  {/* Name the row too, or a screen reader just repeats "Capacity". */}
                  <NumberField
                    aria-label={`Capacity for ${row.venue}`} // [!code highlight]
                    value={row.capacity}
                    onChange={value => update(row.id, 'capacity', value)}
                    error={Number.isNaN(row.capacity)} // [!code highlight]
                    minValue={0}
                    hideStepper
                  />
                </Table.Cell>
                <Table.Cell>
                  <NumberField
                    aria-label={`Price for ${row.venue}`}
                    value={row.price}
                    onChange={value => update(row.id, 'price', value)}
                    minValue={0}
                    formatOptions={{ style: 'currency', currency: 'EUR' }}
                    hideStepper
                  />
                </Table.Cell>
                <Table.Cell>
                  <TextField
                    aria-label={`Note for ${row.venue}`}
                    value={row.note}
                    onChange={value => update(row.id, 'note', value)}
                    placeholder="Optional"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell>Total</Table.Cell>
              <Table.Cell alignX="right">
                {totalCapacity.toLocaleString('en-US')}
              </Table.Cell>
              <Table.Cell colSpan={2} />
            </Table.Row>
          </Table.Footer>
        </Table>
      </Panel.Content>
      <Panel.Footer>
        <Inline space={2} alignY="center">
          <Text size="xs" color="secondary">
            {changed === 0
              ? 'No changes'
              : `${changed} row${changed === 1 ? '' : 's'} changed`}
          </Text>
          <Button
            variant="secondary"
            size="small"
            disabled={changed === 0}
            onPress={() => setRows(saved)}
          >
            Reset
          </Button>
          {/* One explicit Save for the whole grid, not per cell. */}
          {/* [!code highlight:8] */}
          <Button
            variant="primary"
            size="small"
            disabled={changed === 0 || invalid}
            onPress={() => setSaved(rows)}
          >
            Save changes
          </Button>
        </Inline>
      </Panel.Footer>
    </Panel>
  );
};
