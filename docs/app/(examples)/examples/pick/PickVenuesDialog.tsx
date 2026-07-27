'use client';

import { useMemo, useState } from 'react';
import type { Key } from '@react-types/shared';
import type { Selection } from '@marigold/components';
import {
  Badge,
  Button,
  Dialog,
  EmptyState,
  Inline,
  Scrollable,
  SearchField,
  Select,
  Stack,
  Table,
  Tag,
  Text,
} from '@marigold/components';
import { statusVariant, venues } from './venues';

const types = ['Club', 'Concert Hall', 'Theater', 'Open Air', 'Arena'];
const regions = [
  'Berlin',
  'Hamburg',
  'Bavaria',
  'North Rhine-Westphalia',
  'Hesse',
  'Baden-Württemberg',
  'Lower Saxony',
  'Rhineland-Palatinate',
  'Saxony',
  'Vienna',
  'Upper Austria',
  'Salzburg',
  'Tyrol',
  'Zurich',
  'Basel-Stadt',
];
const statuses = ['Available', 'Held', 'Booked'];

interface PickBodyProps {
  title: string;
  confirmLabel: string;
  initial: string[];
  onConfirm: (ids: string[]) => void;
}

const PickBody = ({
  title,
  confirmLabel,
  initial,
  onConfirm,
}: PickBodyProps) => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<Key | null>('all');
  const [region, setRegion] = useState<Key | null>('all');
  const [status, setStatus] = useState<Key | null>('all');
  const [selected, setSelected] = useState<Set<Key>>(() => new Set(initial));

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return venues.filter(venue => {
      const matchesSearch =
        !query || `${venue.name} ${venue.city}`.toLowerCase().includes(query);
      const matchesType = type == null || type === 'all' || venue.type === type;
      const matchesRegion =
        region == null || region === 'all' || venue.region === region;
      const matchesStatus =
        status == null || status === 'all' || venue.status === status;
      return matchesSearch && matchesType && matchesRegion && matchesStatus;
    });
  }, [search, type, region, status]);

  // React-aria only reports the currently visible (filtered) rows, and "select
  // all" means that visible set. Merge every change with the venues staged
  // under other filters so narrowing the list never drops staged picks.
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

  const stagedVenues = venues.filter(venue => selected.has(venue.id));
  const ids = stagedVenues.map(venue => venue.id);

  return (
    <>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Stack space="regular">
          {/* A real find-and-collect task: search plus several filter facets
              narrow a wide, detail-rich table. This density is what outgrows a
              large dialog and earns a fullscreen surface. */}
          <Inline space="related" alignY="input">
            <SearchField
              aria-label="Search venues"
              placeholder="Search by name or city"
              value={search}
              onChange={setSearch}
              width={56}
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
            <Select
              aria-label="Filter by region"
              value={region}
              onChange={setRegion}
              width={56}
            >
              <Select.Option id="all">All regions</Select.Option>
              {regions.map(r => (
                <Select.Option key={r} id={r}>
                  {r}
                </Select.Option>
              ))}
            </Select>
            <Select
              aria-label="Filter by status"
              value={status}
              onChange={setStatus}
              width={40}
            >
              <Select.Option id="all">Any status</Select.Option>
              {statuses.map(s => (
                <Select.Option key={s} id={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </Inline>

          {/* The staged set stays visible as removable tags through every
              search and filter, so picks never scroll out of sight or vanish
              when the list is narrowed. The rail is always rendered, with a
              muted hint when empty, so staging the first venue never shifts the
              table below it. */}
          <Tag.Group
            label={`Staged (${stagedVenues.length})`}
            selectionMode="none"
            onRemove={unstage}
            collapseAt={6}
            emptyState={() => (
              <Text variant="muted" fontSize="sm">
                No venues staged yet. Tick a row to add it.
              </Text>
            )}
          >
            {stagedVenues.map(venue => (
              <Tag key={venue.id} id={venue.id}>
                {venue.name}
              </Tag>
            ))}
          </Tag.Group>

          {/* A dialog fits a scrollable list, not a pager: the list scrolls
              inside a bounded height with a sticky header, and search plus the
              filters do the narrowing. In a fullscreen dialog the region grows
              to fill the viewport minus the surrounding chrome (title, filters,
              staged rail, footer) instead of stopping at a fixed height. */}
          <Scrollable height="calc(100dvh - 22rem)">
            <Table
              aria-label="Venues"
              selectionMode="multiple"
              selectedKeys={selected}
              onSelectionChange={onSelectionChange}
            >
              <Table.Header sticky>
                <Table.Column rowHeader>Venue</Table.Column>
                <Table.Column>City</Table.Column>
                <Table.Column>Region</Table.Column>
                <Table.Column>Country</Table.Column>
                <Table.Column>Type</Table.Column>
                <Table.Column>Setting</Table.Column>
                <Table.Column alignX="right">Capacity</Table.Column>
                <Table.Column alignX="right">Rating</Table.Column>
                <Table.Column alignX="right">Upcoming</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column alignX="right">Day rate</Table.Column>
              </Table.Header>
              <Table.Body
                items={results}
                emptyState={() => (
                  <EmptyState
                    title="No venues match"
                    description="Try a different search or filter. Staged venues stay listed above."
                  />
                )}
              >
                {venue => (
                  <Table.Row id={venue.id}>
                    <Table.Cell>{venue.name}</Table.Cell>
                    <Table.Cell>{venue.city}</Table.Cell>
                    <Table.Cell>{venue.region}</Table.Cell>
                    <Table.Cell>{venue.country}</Table.Cell>
                    <Table.Cell>{venue.type}</Table.Cell>
                    <Table.Cell>{venue.setting}</Table.Cell>
                    <Table.Cell alignX="right">{venue.capacity}</Table.Cell>
                    <Table.Cell alignX="right">{venue.rating}</Table.Cell>
                    <Table.Cell alignX="right">{venue.events}</Table.Cell>
                    <Table.Cell>
                      <Badge variant={statusVariant[venue.status]}>
                        {venue.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell alignX="right">{venue.rate}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Scrollable>
        </Stack>
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="secondary" slot="close">
          Cancel
        </Button>
        {/* At least one venue is required, so an empty set can never commit. */}
        <Button
          variant="primary"
          disabled={ids.length === 0}
          onPress={() => onConfirm(ids)}
        >
          {ids.length === 0
            ? `${confirmLabel} venues`
            : `${confirmLabel} ${ids.length} ${ids.length === 1 ? 'venue' : 'venues'}`}
        </Button>
      </Dialog.Actions>
    </>
  );
};

interface PickVenuesDialogProps {
  /** Text on the trigger button. */
  trigger: string;
  /** Dialog title. */
  title: string;
  /** Verb shown in the commit button, e.g. "Add". */
  confirmLabel?: string;
  /** Venue ids to open with already staged. */
  initial: string[];
  /** Called with the committed venue ids when the user confirms. */
  onConfirm: (ids: string[]) => void;
}

export const PickVenuesDialog = ({
  trigger,
  title,
  confirmLabel = 'Add',
  initial,
  onConfirm,
}: PickVenuesDialogProps) => (
  <Dialog.Trigger>
    <Button variant="primary">{trigger}</Button>
    {/* This pick is content-heavy (a wide table over ~50 rows), so it fills
        the viewport with a fullscreen dialog. */}
    <Dialog size="fullscreen" closeButton>
      {({ close }) => (
        <PickBody
          title={title}
          confirmLabel={confirmLabel}
          initial={initial}
          onConfirm={ids => {
            onConfirm(ids);
            close();
          }}
        />
      )}
    </Dialog>
  </Dialog.Trigger>
);
