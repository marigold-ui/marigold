import { venues } from '@/lib/data/venues';
import { useState } from 'react';
import { NumberField, Table, TextField } from '@marigold/components';

export default () => {
  const [rows, setRows] = useState(() =>
    venues.slice(0, 4).map(venue => ({
      id: venue.id,
      name: venue.name,
      capacity: venue.capacity,
      note: '',
    }))
  );

  const update = (
    id: string,
    field: 'capacity' | 'note',
    value: number | string
  ) =>
    setRows(prev =>
      prev.map(row => (row.id === id ? { ...row, [field]: value } : row))
    );

  return (
    <Table
      aria-label="Seat allocation per venue"
      // Without this the grid keeps the arrow keys and focus lands on the row.
      keyboardNavigationBehavior="tab" // [!code highlight]
    >
      <Table.Header>
        <Table.Column rowHeader>Venue</Table.Column>
        <Table.Column alignX="right" width={140}>
          Capacity
        </Table.Column>
        <Table.Column>Note</Table.Column>
      </Table.Header>
      <Table.Body>
        {rows.map(row => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>
              {/* Name the row too, or a screen reader just repeats "Capacity". */}
              <NumberField
                aria-label={`Capacity for ${row.name}`} // [!code highlight]
                value={row.capacity}
                onChange={value => update(row.id, 'capacity', value)}
                minValue={0}
                hideStepper
              />
            </Table.Cell>
            <Table.Cell>
              <TextField
                aria-label={`Note for ${row.name}`}
                value={row.note}
                onChange={value => update(row.id, 'note', value)}
                placeholder="Optional"
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
