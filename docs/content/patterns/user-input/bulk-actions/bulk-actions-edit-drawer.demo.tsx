import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Button,
  Checkbox,
  Drawer,
  NumberField,
  Select,
  Stack,
  Table,
  Text,
  useToast,
} from '@marigold/components';
import { Pencil } from '@marigold/icons';

interface Event {
  id: string;
  name: string;
  venue: string;
  category: string;
  price: number;
}

const initialEvents: Event[] = [
  {
    id: '1',
    name: 'Jazz Night',
    venue: 'Jazzhaus',
    category: 'Concert',
    price: 24,
  },
  {
    id: '2',
    name: 'Blues Session',
    venue: 'Vorderhaus',
    category: 'Concert',
    price: 19,
  },
  {
    id: '3',
    name: 'Swing Evening',
    venue: 'Alte Wache',
    category: 'Concert',
    price: 24,
  },
  {
    id: '4',
    name: 'Wine Tasting',
    venue: 'Alte Wache',
    category: 'Culinary',
    price: 45,
  },
];

/** The value shared by all records, or `undefined` when values differ. */
// [!code highlight:4]
const sharedValue = <K extends keyof Event>(records: Event[], field: K) =>
  records.every(record => record[field] === records[0]?.[field])
    ? records[0]?.[field]
    : undefined;

const BulkEditForm = ({
  affected,
  onApply,
}: {
  affected: Event[];
  onApply: (changes: Partial<Event>) => void;
}) => {
  const sharedVenue = sharedValue(affected, 'venue');
  const sharedCategory = sharedValue(affected, 'category');
  const sharedPrice = sharedValue(affected, 'price');

  const [venue, setVenue] = useState(sharedVenue ?? null);
  const [category, setCategory] = useState(sharedCategory ?? null);
  const [editPrice, setEditPrice] = useState(false);
  const [price, setPrice] = useState(sharedPrice ?? NaN);

  // [!code highlight:7]
  // Implicit opt-in: a field is only applied when the user changed it.
  const changes: Partial<Event> = {};
  if (venue !== (sharedVenue ?? null) && venue) changes.venue = String(venue);
  if (category !== (sharedCategory ?? null) && category)
    changes.category = String(category);
  // Explicit opt-in: price only applies while its checkbox is checked.
  if (editPrice && !Number.isNaN(price)) changes.price = price;

  const changedFields = Object.keys(changes);
  const scope = affected.length === 1 ? '1 event' : `${affected.length} events`;

  return (
    <>
      <Drawer.Title>Edit {scope}</Drawer.Title>
      <Drawer.Content>
        <Stack space={4}>
          <Select
            label="Venue"
            placeholder="Multiple values"
            value={venue}
            onChange={key => setVenue(String(key))}
          >
            <Select.Option id="Jazzhaus">Jazzhaus</Select.Option>
            <Select.Option id="Vorderhaus">Vorderhaus</Select.Option>
            <Select.Option id="Alte Wache">Alte Wache</Select.Option>
          </Select>
          <Select
            label="Category"
            placeholder="Multiple values"
            value={category}
            onChange={key => setCategory(String(key))}
          >
            <Select.Option id="Concert">Concert</Select.Option>
            <Select.Option id="Culinary">Culinary</Select.Option>
            <Select.Option id="Theater">Theater</Select.Option>
          </Select>
          <Stack space={2}>
            <Checkbox
              label="Change ticket price"
              checked={editPrice}
              onChange={setEditPrice}
            />
            <NumberField
              label="Ticket price"
              disabled={!editPrice}
              value={price}
              onChange={setPrice}
              description={
                sharedPrice === undefined
                  ? 'Selected events currently have different prices.'
                  : undefined
              }
              formatOptions={{ style: 'currency', currency: 'EUR' }}
            />
          </Stack>
          <Text fontSize="sm" variant="muted" aria-live="polite">
            {changedFields.length === 0
              ? 'No changes yet. Untouched fields stay as they are.'
              : `Will update ${changedFields.join(' and ')} on all selected events.`}
          </Text>
        </Stack>
      </Drawer.Content>
      <Drawer.Actions>
        <Button slot="close">Cancel</Button>
        <Button
          slot="close"
          variant="primary"
          disabled={changedFields.length === 0}
          onPress={() => onApply(changes)}
        >
          Apply to {scope}
        </Button>
      </Drawer.Actions>
    </>
  );
};

export default () => {
  const [events, setEvents] = useState(initialEvents);
  const [selected, setSelected] = useState<Selection>(new Set(['1', '2', '3']));
  const { addToast } = useToast();

  const selectedIds =
    selected === 'all'
      ? events.map(event => event.id)
      : [...selected].map(String);
  const affected = events.filter(event => selectedIds.includes(event.id));

  const applyChanges = (changes: Partial<Event>) => {
    setEvents(current =>
      current.map(event =>
        selectedIds.includes(event.id) ? { ...event, ...changes } : event
      )
    );
    addToast({
      title:
        affected.length === 1
          ? '1 event updated'
          : `${affected.length} events updated`,
      variant: 'success',
    });
    setSelected(new Set());
  };

  return (
    <>
      <Table
        aria-label="Events"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        actionBar={() => (
          <ActionBar>
            <Drawer.Trigger>
              <Button>
                <Pencil />
                Edit
              </Button>
              <Drawer size="medium">
                {/* Re-key the form so it derives fresh values per selection. */}
                <BulkEditForm
                  key={selectedIds.join('-')} // [!code highlight]
                  affected={affected}
                  onApply={applyChanges}
                />
              </Drawer>
            </Drawer.Trigger>
          </ActionBar>
        )}
      >
        <Table.Header>
          <Table.Column rowHeader>Event</Table.Column>
          <Table.Column>Venue</Table.Column>
          <Table.Column>Category</Table.Column>
          <Table.Column>Price</Table.Column>
        </Table.Header>
        <Table.Body>
          {events.map(event => (
            <Table.Row key={event.id} id={event.id}>
              <Table.Cell>{event.name}</Table.Cell>
              <Table.Cell>{event.venue}</Table.Cell>
              <Table.Cell>{event.category}</Table.Cell>
              <Table.Cell>{event.price.toFixed(2)} €</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
