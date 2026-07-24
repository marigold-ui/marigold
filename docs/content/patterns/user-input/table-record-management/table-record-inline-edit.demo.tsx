'use client';

import { useState } from 'react';
import {
  Badge,
  Description,
  NumberField,
  Panel,
  Select,
  Table,
  TextField,
  Title,
} from '@marigold/components';

interface Venue {
  id: string;
  name: string;
  city: string;
  capacity: number;
  status: 'active' | 'draft' | 'archived';
}

const initialVenues: Venue[] = [
  {
    id: '1',
    name: 'Main Street Amphitheater',
    city: 'Laughville',
    capacity: 500,
    status: 'active',
  },
  {
    id: '2',
    name: 'Shakytown Comedy Club',
    city: 'Shakytown',
    capacity: 300,
    status: 'active',
  },
  {
    id: '3',
    name: 'Harbor Lights Hall',
    city: 'Portbury',
    capacity: 850,
    status: 'draft',
  },
  {
    id: '4',
    name: 'The Old Tannery',
    city: 'Riverside',
    capacity: 220,
    status: 'archived',
  },
  {
    id: '5',
    name: 'Northgate Arena',
    city: 'Northgate',
    capacity: 4200,
    status: 'active',
  },
];

const statusLabels: Record<Venue['status'], string> = {
  active: 'Active',
  draft: 'Draft',
  archived: 'Archived',
};

const statusVariants: Record<Venue['status'], 'success' | 'info' | 'default'> =
  {
    active: 'success',
    draft: 'info',
    archived: 'default',
  };

export default () => {
  const [venues, setVenues] = useState(initialVenues);

  const update = <K extends keyof Venue>(
    id: string,
    field: K,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(e.currentTarget); // [!code highlight:10]
    const raw = String(formData.get(field) ?? '');
    // FormData values are stringly typed, so cast back to the field's type.
    const value = (field === 'capacity' ? Number(raw) : raw) as Venue[K];

    setVenues(prev =>
      prev.map(venue =>
        venue.id === id ? { ...venue, [field]: value } : venue
      )
    );
  };

  return (
    <Panel aria-label="Venues">
      <Panel.Header>
        <Title>Venues</Title>
        <Description>Select a cell to edit its value in place.</Description>
      </Panel.Header>
      <Panel.Content bleed>
        <Table aria-label="Venues with inline editing" size="compact">
          <Table.Header>
            <Table.Column rowHeader>Name</Table.Column>
            <Table.Column>City</Table.Column>
            <Table.Column alignX="right">Capacity</Table.Column>
            <Table.Column>Status</Table.Column>
          </Table.Header>
          <Table.Body>
            {venues.map(venue => (
              <Table.Row key={venue.id}>
                {/* [!code highlight:14] */}
                <Table.EditableCell
                  onSubmit={e => update(venue.id, 'name', e)}
                  field={
                    <TextField
                      aria-label="Name"
                      name="name"
                      defaultValue={venue.name}
                      required
                      autoFocus
                    />
                  }
                >
                  {venue.name}
                </Table.EditableCell>
                <Table.Cell>{venue.city}</Table.Cell>
                <Table.EditableCell
                  alignX="right"
                  onSubmit={e => update(venue.id, 'capacity', e)}
                  field={
                    <NumberField
                      aria-label="Capacity"
                      name="capacity"
                      defaultValue={venue.capacity}
                      minValue={0}
                      autoFocus
                    />
                  }
                >
                  {venue.capacity.toLocaleString()}
                </Table.EditableCell>
                <Table.EditableCell
                  onSubmit={e => update(venue.id, 'status', e)}
                  field={
                    <Select
                      aria-label="Status"
                      name="status"
                      defaultValue={venue.status}
                      autoFocus
                    >
                      <Select.Option id="active">Active</Select.Option>
                      <Select.Option id="draft">Draft</Select.Option>
                      <Select.Option id="archived">Archived</Select.Option>
                    </Select>
                  }
                >
                  <Badge variant={statusVariants[venue.status]}>
                    {statusLabels[venue.status]}
                  </Badge>
                </Table.EditableCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>
  );
};
