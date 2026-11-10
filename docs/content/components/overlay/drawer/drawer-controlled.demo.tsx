'use client';

import { useState } from 'react';
import { Button, Drawer, Table, Text } from '@marigold/components';

interface Venue {
  id: string;
  name: string;
  city: string;
}

const venues: Venue[] = [
  { id: '1', name: 'Konzerthaus', city: 'Freiburg' },
  { id: '2', name: 'Rosengarten', city: 'Mannheim' },
  { id: '3', name: 'Liederhalle', city: 'Stuttgart' },
];

export default () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Venue>(venues[0]);

  return (
    <>
      <Table aria-label="Venues">
        <Table.Header>
          <Table.Column rowHeader>Name</Table.Column>
          <Table.Column>City</Table.Column>
          <Table.Column alignX="right">Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {venues.map(venue => (
            <Table.Row key={venue.id}>
              <Table.Cell>{venue.name}</Table.Cell>
              <Table.Cell>{venue.city}</Table.Cell>
              <Table.Cell alignX="right">
                <Button
                  variant="ghost"
                  size="small"
                  onPress={() => {
                    setSelected(venue);
                    setOpen(true);
                  }}
                >
                  Details
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* [!code highlight] */}
      <Drawer open={open} onOpenChange={setOpen} closeButton>
        <Drawer.Title>{selected.name}</Drawer.Title>
        <Drawer.Content>
          <Text>Located in {selected.city}.</Text>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
        </Drawer.Actions>
      </Drawer>
    </>
  );
};
