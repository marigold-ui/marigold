import { venues } from '@/lib/data/venues';
import { useState } from 'react';
import { NumberField, Table, Text, TextField } from '@marigold/components';

export default () => {
  const [data, setData] = useState(venues.slice(0, 3));

  const handleSubmit = (index: number, e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    setData(prev => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        name: (formData.get('name') as string) || next[index].name,
        city: (formData.get('city') as string) || next[index].city,
        capacity: Number(formData.get('capacity')) || next[index].capacity,
      };
      return next;
    });
  };

  return (
    <Table aria-label="Editable venue data">
      <Table.Header>
        <Table.Column>Venue</Table.Column>
        <Table.Column>City</Table.Column>
        <Table.Column>Capacity</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map((venue, i) => (
          <Table.Row key={venue.id}>
            <Table.EditableCell
              renderEditing={() => (
                <TextField
                  aria-label="Venue name"
                  name="name"
                  defaultValue={venue.name}
                  autoFocus
                />
              )}
              onSubmit={e => handleSubmit(i, e)}
            >
              <Text weight="medium">{venue.name}</Text>
            </Table.EditableCell>
            <Table.EditableCell
              renderEditing={() => (
                <TextField
                  aria-label="City"
                  name="city"
                  defaultValue={venue.city}
                  autoFocus
                />
              )}
              onSubmit={e => handleSubmit(i, e)}
            >
              <Text size="sm" color="muted-foreground">
                {venue.city}
              </Text>
            </Table.EditableCell>
            <Table.EditableCell
              renderEditing={() => (
                <NumberField
                  aria-label="Capacity"
                  name="capacity"
                  defaultValue={venue.capacity}
                  autoFocus
                />
              )}
              onSubmit={e => handleSubmit(i, e)}
            >
              {venue.capacity.toLocaleString()}
            </Table.EditableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
