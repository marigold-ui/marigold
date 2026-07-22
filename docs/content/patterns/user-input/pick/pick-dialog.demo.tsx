import { useMemo, useState } from 'react';
import type { Key } from '@react-types/shared';
import type { Selection } from '@marigold/components';
import {
  Button,
  Dialog,
  EmptyState,
  Inline,
  Panel,
  SearchField,
  Select,
  Stack,
  Table,
  Tag,
  Text,
} from '@marigold/components';

const venues = [
  {
    id: 'astra',
    name: 'Astra Kulturhaus',
    city: 'Berlin',
    capacity: '1,500',
    type: 'Club',
  },
  {
    id: 'gruenspan',
    name: 'Grünspan',
    city: 'Hamburg',
    capacity: '1,200',
    type: 'Club',
  },
  {
    id: 'backstage',
    name: 'Backstage',
    city: 'Munich',
    capacity: '900',
    type: 'Club',
  },
  {
    id: 'palladium',
    name: 'Palladium',
    city: 'Cologne',
    capacity: '4,000',
    type: 'Concert Hall',
  },
  {
    id: 'capitol',
    name: 'Capitol',
    city: 'Hanover',
    capacity: '1,350',
    type: 'Concert Hall',
  },
  {
    id: 'zakk',
    name: 'zakk',
    city: 'Dusseldorf',
    capacity: '1,000',
    type: 'Club',
  },
  {
    id: 'batschkapp',
    name: 'Batschkapp',
    city: 'Frankfurt',
    capacity: '1,500',
    type: 'Club',
  },
  {
    id: 'longhorn',
    name: 'LKA Longhorn',
    city: 'Stuttgart',
    capacity: '1,100',
    type: 'Concert Hall',
  },
  {
    id: 'waldbuehne',
    name: 'Waldbühne',
    city: 'Berlin',
    capacity: '22,000',
    type: 'Open Air',
  },
  {
    id: 'loreley',
    name: 'Loreley',
    city: 'St. Goarshausen',
    capacity: '15,000',
    type: 'Open Air',
  },
];

const types = ['Club', 'Concert Hall', 'Open Air'];

interface PickBodyProps {
  initial: Set<Key>;
  onConfirm: (keys: Set<Key>) => void;
}

const PickVenuesBody = ({ initial, onConfirm }: PickBodyProps) => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<Key | null>('all');
  const [selected, setSelected] = useState<Set<Key>>(() => new Set(initial));

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return venues.filter(venue => {
      const matchesSearch =
        !query || `${venue.name} ${venue.city}`.toLowerCase().includes(query);
      const matchesType = type == null || type === 'all' || venue.type === type;
      return matchesSearch && matchesType;
    });
  }, [search, type]);

  // Normalize react-aria's "select all" (which means the visible rows) to a
  // concrete set at the boundary, keeping venues staged under other filters, so
  // narrowing the list never changes what is committed.
  const onSelectionChange = (keys: Selection) => {
    const visibleIds = new Set<Key>(results.map(venue => venue.id));
    setSelected(prev => {
      const offView = [...prev].filter(key => !visibleIds.has(key));
      const visibleSelection = keys === 'all' ? [...visibleIds] : [...keys];
      return new Set<Key>([...offView, ...visibleSelection]);
    });
  };

  const unstage = (keys: Set<Key>) => {
    setSelected(prev => {
      const next = new Set<Key>(prev);
      keys.forEach(key => next.delete(key));
      return next;
    });
  };

  // The staged set is derived from `selected` alone, so it is independent of
  // the search and filter above and survives the list narrowing to nothing.
  const staged = venues.filter(venue => selected.has(venue.id));

  return (
    <>
      <Dialog.Title>Select venues</Dialog.Title>
      <Dialog.Content>
        <Stack space={4}>
          {/* Search and the type filter narrow the visible rows together;
              neither touches the staged selection tracked in `selected`. */}
          <Inline space={2} alignY="input">
            <SearchField
              aria-label="Search venues"
              placeholder="Search by name or city"
              value={search}
              onChange={setSearch}
              width={64}
            />
            <Select
              aria-label="Filter by type"
              value={type}
              onChange={setType}
              width={40}
            >
              <Select.Option id="all">All types</Select.Option>
              {types.map(t => (
                <Select.Option key={t} id={t}>
                  {t}
                </Select.Option>
              ))}
            </Select>
          </Inline>

          {/* The staged set stays on screen as removable tags no matter what
              the search and filter are doing, including when the list below is
              empty. Removing a tag unstages that venue. */}
          {staged.length > 0 && (
            <Tag.Group
              label={`Staged (${staged.length})`}
              selectionMode="none"
              onRemove={unstage}
              collapseAt={6}
            >
              {staged.map(venue => (
                <Tag key={venue.id} id={venue.id}>
                  {venue.name}
                </Tag>
              ))}
            </Tag.Group>
          )}

          <Table
            aria-label="Venues"
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={onSelectionChange}
          >
            <Table.Header>
              <Table.Column rowHeader>Venue</Table.Column>
              <Table.Column>City</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column>Capacity</Table.Column>
            </Table.Header>
            <Table.Body
              items={results}
              emptyState={() => (
                <EmptyState
                  title="No venues match"
                  description="Try a different search, or switch the type back to All types. Anything you already staged stays listed above."
                />
              )}
            >
              {venue => (
                <Table.Row id={venue.id}>
                  <Table.Cell>{venue.name}</Table.Cell>
                  <Table.Cell>{venue.city}</Table.Cell>
                  <Table.Cell>{venue.type}</Table.Cell>
                  <Table.Cell>{venue.capacity}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Stack>
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="secondary" slot="close">
          Cancel
        </Button>
        {/* At least one venue is required, so an empty set can never commit. */}
        <Button
          variant="primary"
          disabled={staged.length === 0}
          onPress={() => onConfirm(selected)}
        >
          {staged.length === 0
            ? 'Add venues'
            : `Add ${staged.length} ${staged.length === 1 ? 'venue' : 'venues'}`}
        </Button>
      </Dialog.Actions>
    </>
  );
};

export default () => {
  const [added, setAdded] = useState<Set<Key>>(new Set());
  const addedVenues = venues.filter(venue => added.has(venue.id));

  const removeVenue = (keys: Set<Key>) => {
    setAdded(prev => {
      const next = new Set<Key>(prev);
      keys.forEach(key => next.delete(key));
      return next;
    });
  };

  return (
    <Panel aria-label="Report venues">
      <Panel.Content>
        <Stack space={4} alignX="left">
          {/* The committed set lives on the host task as removable tags: drop one here, or reopen (pre-staged) to change the set. */}
          {addedVenues.length > 0 ? (
            <Tag.Group
              label="Selected venues"
              selectionMode="none"
              onRemove={removeVenue}
              collapseAt={6}
            >
              {addedVenues.map(venue => (
                <Tag key={venue.id} id={venue.id}>
                  {venue.name}
                </Tag>
              ))}
            </Tag.Group>
          ) : (
            <Text>No venues added yet.</Text>
          )}

          <Dialog.Trigger>
            <Button variant={addedVenues.length > 0 ? 'secondary' : 'primary'}>
              {addedVenues.length > 0 ? 'Edit selection' : 'Add venues'}
            </Button>
            {/* A modest pick fits a large dialog. The data-heavy
                /examples/pick opens fullscreen instead. */}
            <Dialog size="large" closeButton>
              {({ close }) => (
                <PickVenuesBody
                  initial={added}
                  onConfirm={keys => {
                    setAdded(keys);
                    close();
                  }}
                />
              )}
            </Dialog>
          </Dialog.Trigger>
        </Stack>
      </Panel.Content>
    </Panel>
  );
};
