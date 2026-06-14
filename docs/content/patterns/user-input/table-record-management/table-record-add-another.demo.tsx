'use client';

import { useRef, useState } from 'react';
import {
  Button,
  Drawer,
  EmptyState,
  Form,
  Inline,
  NumberField,
  Panel,
  Select,
  Stack,
  Table,
  TextField,
  Title,
} from '@marigold/components';

interface Venue {
  id: string;
  name: string;
  city: string;
  type: string;
  capacity: number;
}

const typeLabels: Record<string, string> = {
  outdoor: 'Outdoor venue',
  club: 'Club or lounge',
  formal: 'Formal venue',
  arena: 'Arena',
};

// Fields likely shared across a batch of related records. They are retained
// between entries so the user does not retype them. Record specific fields
// (name, capacity) are always cleared.
interface Retained {
  city: string;
  type: string;
}

export default () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [open, setOpen] = useState(false);
  const [retained, setRetained] = useState<Retained>({
    city: '',
    type: 'outdoor',
  });
  const [formKey, setFormKey] = useState(0);
  const nextIdRef = useRef(1);
  // Remembers which button submitted the form so the handler knows whether to
  // keep the drawer open for the next entry.
  const addAnotherRef = useRef(false);

  const openCreate = () => {
    setRetained({ city: '', type: 'outdoor' });
    setFormKey(key => key + 1);
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const venue: Venue = {
      id: String(nextIdRef.current++),
      name: String(formData.get('name') ?? ''),
      city: String(formData.get('city') ?? ''),
      type: String(formData.get('type') ?? 'outdoor'),
      capacity: Number(formData.get('capacity') ?? 0),
    };

    setVenues(prev => [...prev, venue]);

    if (addAnotherRef.current) {
      // [!code highlight:8]
      // Keep the drawer open, retain the contextual fields, and remount the
      // form so the record specific fields clear and focus returns to "Name".
      setRetained({ city: venue.city, type: venue.type });
      setFormKey(key => key + 1);
    } else {
      setOpen(false);
    }
    addAnotherRef.current = false;
  };

  return (
    <Panel aria-label="Venues">
      <Panel.Content>
        <Inline alignX="between" alignY="center">
          <Title>Venues</Title>
          <Drawer.Trigger open={open} onOpenChange={setOpen}>
            <Button variant="primary" onPress={openCreate}>
              Add venues
            </Button>
            <Drawer size="medium" closeButton>
              <Form unstyled key={formKey} onSubmit={handleSubmit}>
                <Drawer.Title>Add venues</Drawer.Title>
                <Drawer.Content>
                  <Stack space="regular">
                    <TextField label="Name" name="name" required autoFocus />
                    <TextField
                      label="City"
                      name="city"
                      defaultValue={retained.city}
                    />
                    <Select
                      label="Type"
                      name="type"
                      defaultValue={retained.type}
                    >
                      <Select.Option id="outdoor">Outdoor venue</Select.Option>
                      <Select.Option id="club">Club or lounge</Select.Option>
                      <Select.Option id="formal">Formal venue</Select.Option>
                      <Select.Option id="arena">Arena</Select.Option>
                    </Select>
                    <NumberField
                      label="Capacity"
                      name="capacity"
                      minValue={0}
                      width="1/2"
                    />
                  </Stack>
                </Drawer.Content>
                <Drawer.Actions>
                  <Button slot="close">Cancel</Button>
                  {/* [!code highlight:9] */}
                  <Button
                    variant="secondary"
                    type="submit"
                    onPress={() => {
                      addAnotherRef.current = true;
                    }}
                  >
                    Save & add another
                  </Button>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Drawer.Actions>
              </Form>
            </Drawer>
          </Drawer.Trigger>
        </Inline>
      </Panel.Content>
      <Panel.Content bleed>
        <Table aria-label="Venues">
          <Table.Header>
            <Table.Column rowHeader>Name</Table.Column>
            <Table.Column>City</Table.Column>
            <Table.Column>Type</Table.Column>
            <Table.Column alignX="right">Capacity</Table.Column>
          </Table.Header>
          <Table.Body
            items={venues}
            emptyState={() => (
              <EmptyState
                title="No venues yet"
                description="Add your first venue to start building the list."
                action={<Button onPress={openCreate}>Add first venue</Button>}
              />
            )}
          >
            {venue => (
              <Table.Row key={venue.id}>
                <Table.Cell>{venue.name}</Table.Cell>
                <Table.Cell>{venue.city}</Table.Cell>
                <Table.Cell>{typeLabels[venue.type]}</Table.Cell>
                <Table.Cell alignX="right">
                  {venue.capacity.toLocaleString()}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>
  );
};
