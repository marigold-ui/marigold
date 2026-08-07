'use client';

import { useState } from 'react';
import {
  Button,
  Drawer,
  Form,
  Inline,
  NumberField,
  Panel,
  Stack,
  Table,
  Tabs,
  Text,
  TextField,
  Title,
} from '@marigold/components';

interface Venue {
  id: string;
  name: string;
  capacity: number;
  price: number;
}

// Shared by all three approaches, so this reads as a comparison.
const initialVenues: Venue[] = [
  { id: '1', name: 'Main Street Amphitheater', capacity: 500, price: 34.5 },
  { id: '2', name: 'Shakytown Comedy Club', capacity: 300, price: 22 },
  { id: '3', name: 'Harbor Lights Hall', capacity: 850, price: 41 },
  { id: '4', name: 'The Old Tannery', capacity: 220, price: 18.5 },
  { id: '5', name: 'Northgate Arena', capacity: 4200, price: 55 },
  { id: '6', name: 'Riverside Pavilion', capacity: 640, price: 29 },
];

const money = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });

const InlineEditApproach = () => {
  const [venues, setVenues] = useState(initialVenues);

  const update = (
    id: string,
    field: 'capacity' | 'price',
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(e.currentTarget);
    const value = Number(formData.get(field));
    setVenues(prev =>
      prev.map(venue =>
        venue.id === id ? { ...venue, [field]: value } : venue
      )
    );
  };

  return (
    <Table aria-label="Venues with inline editing" size="compact">
      <Table.Header>
        <Table.Column rowHeader>Venue</Table.Column>
        <Table.Column alignX="right">Capacity</Table.Column>
        <Table.Column alignX="right">Price</Table.Column>
      </Table.Header>
      <Table.Body>
        {venues.map(venue => (
          <Table.Row key={venue.id}>
            <Table.Cell>{venue.name}</Table.Cell>
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
              {venue.capacity.toLocaleString('en-US')}
            </Table.EditableCell>
            <Table.EditableCell
              alignX="right"
              onSubmit={e => update(venue.id, 'price', e)}
              field={
                <NumberField
                  aria-label="Price"
                  name="price"
                  defaultValue={venue.price}
                  minValue={0}
                  autoFocus
                />
              }
            >
              {money(venue.price)}
            </Table.EditableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const GridApproach = () => {
  const [venues, setVenues] = useState(initialVenues);
  const [saved, setSaved] = useState(initialVenues);

  const update = (id: string, field: 'capacity' | 'price', value: number) =>
    setVenues(prev =>
      prev.map(venue =>
        venue.id === id ? { ...venue, [field]: value } : venue
      )
    );

  const changed = venues.filter(
    (venue, i) =>
      venue.capacity !== saved[i].capacity || venue.price !== saved[i].price
  ).length;

  return (
    <Stack space={3}>
      <Table
        aria-label="Venues as a data entry grid"
        size="compact"
        keyboardNavigationBehavior="tab" // [!code highlight]
      >
        <Table.Header>
          <Table.Column rowHeader>Venue</Table.Column>
          <Table.Column alignX="right" width={140}>
            Capacity
          </Table.Column>
          <Table.Column alignX="right" width={140}>
            Price
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {venues.map(venue => (
            <Table.Row key={venue.id}>
              <Table.Cell>{venue.name}</Table.Cell>
              <Table.Cell>
                <NumberField
                  aria-label={`Capacity for ${venue.name}`}
                  value={venue.capacity}
                  onChange={value => update(venue.id, 'capacity', value)}
                  minValue={0}
                  hideStepper
                />
              </Table.Cell>
              <Table.Cell>
                <NumberField
                  aria-label={`Price for ${venue.name}`}
                  value={venue.price}
                  onChange={value => update(venue.id, 'price', value)}
                  minValue={0}
                  formatOptions={{ style: 'currency', currency: 'EUR' }}
                  hideStepper
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Inline space={2} alignY="center">
        <Text size="xs" color="secondary">
          {changed === 0 ? 'No changes' : `${changed} rows changed`}
        </Text>
        <Button
          variant="primary"
          size="small"
          disabled={changed === 0}
          onPress={() => setSaved(venues)}
        >
          Save changes
        </Button>
      </Inline>
    </Stack>
  );
};

const DrawerBatchApproach = () => {
  const [venues, setVenues] = useState(initialVenues);
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    const formData = new FormData(e.currentTarget);

    setVenues(prev => [
      ...prev,
      {
        id: String(prev.length + 1),
        name: String(formData.get('name') ?? ''),
        capacity: Number(formData.get('capacity') ?? 0),
        price: Number(formData.get('price') ?? 0),
      },
    ]);

    if (submitter?.value === 'add-another') {
      setFormKey(key => key + 1);
    } else {
      setOpen(false);
    }
  };

  return (
    <Stack space={3}>
      <Drawer.Trigger open={open} onOpenChange={setOpen}>
        <Button variant="primary" size="small">
          Add venue
        </Button>
        <Drawer size="medium" closeButton>
          <Form unstyled key={formKey} onSubmit={handleSubmit}>
            <Drawer.Title>Add venue</Drawer.Title>
            <Drawer.Content>
              <Stack space={4}>
                <TextField label="Venue name" name="name" required autoFocus />
                <NumberField label="Capacity" name="capacity" minValue={0} />
                <NumberField label="Price" name="price" minValue={0} />
              </Stack>
            </Drawer.Content>
            <Drawer.Actions>
              <Button slot="close">Cancel</Button>
              <Button variant="secondary" type="submit" value="add-another">
                Save and add another
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Drawer.Actions>
          </Form>
        </Drawer>
      </Drawer.Trigger>
      <Table aria-label="Venues created through a drawer" size="compact">
        <Table.Header>
          <Table.Column rowHeader>Venue</Table.Column>
          <Table.Column alignX="right">Capacity</Table.Column>
          <Table.Column alignX="right">Price</Table.Column>
        </Table.Header>
        <Table.Body>
          {venues.map(venue => (
            <Table.Row key={venue.id}>
              <Table.Cell>{venue.name}</Table.Cell>
              <Table.Cell alignX="right">
                {venue.capacity.toLocaleString('en-US')}
              </Table.Cell>
              <Table.Cell alignX="right">{money(venue.price)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
};

export default () => (
  <Panel aria-label="Three ways to change the same table">
    <Panel.Header>
      <Title>The same table, three ways</Title>
    </Panel.Header>
    <Panel.Content>
      <Tabs defaultSelectedKey="inline">
        <Tabs.List aria-label="Editing approaches">
          <Tabs.Item id="inline">Inline edit</Tabs.Item>
          <Tabs.Item id="grid">Data-entry grid</Tabs.Item>
          <Tabs.Item id="drawer">Drawer</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel id="inline">
          <Stack space={3}>
            <Text size="sm" color="secondary">
              Reach for this when one value is wrong and the user spotted it
              while scanning. Editing opens in a popover, so only the cell being
              corrected is in play.
            </Text>
            <InlineEditApproach />
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel id="grid">
          <Stack space={3}>
            <Text size="sm" color="secondary">
              Reach for this when the task is to fill in the whole table in one
              sitting. Every field is live, no row needs opening, and one Save
              commits the batch.
            </Text>
            <GridApproach />
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel id="drawer">
          <Stack space={3}>
            <Text size="sm" color="secondary">
              Reach for this when the user is creating records rather than
              correcting them, and each record needs more fields than the table
              shows.
            </Text>
            <DrawerBatchApproach />
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Panel.Content>
  </Panel>
);
