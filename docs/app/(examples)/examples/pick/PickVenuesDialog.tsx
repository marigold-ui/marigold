'use client';

import { useMemo, useState } from 'react';
import type { Key } from '@react-types/shared';
import type { Selection } from '@marigold/components';
import {
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
} from '@marigold/components';
import { venues } from './venues';

const types = ['Club', 'Concert Hall', 'Open Air'];

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

  // React-aria only reports the currently visible (filtered) rows, and "select
  // all" means that visible set. Merge every change with the venues staged
  // under other filters so narrowing the list never drops staged picks.
  const onSelectionChange = (keys: Selection) => {
    const visibleIds = new Set(results.map(venue => venue.id));
    setSelected(prev => {
      const offView = [...prev].filter(key => !visibleIds.has(String(key)));
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
          <Inline space="related" alignY="input">
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

          {/* The staged set stays visible as removable tags through every
              search and filter, so picks never scroll out of sight or vanish
              when the list is narrowed. */}
          {stagedVenues.length > 0 && (
            <Tag.Group
              label={`Staged (${stagedVenues.length})`}
              selectionMode="none"
              onRemove={unstage}
              collapseAt={6}
            >
              {stagedVenues.map(venue => (
                <Tag key={venue.id} id={venue.id}>
                  {venue.name}
                </Tag>
              ))}
            </Tag.Group>
          )}

          {/* A dialog fits a scrollable list, not a pager: the list scrolls
              inside a bounded height with a sticky header, and search plus the
              filter do the narrowing. */}
          <Scrollable height="360px">
            <Table
              aria-label="Venues"
              selectionMode="multiple"
              selectedKeys={selected}
              onSelectionChange={onSelectionChange}
            >
              <Table.Header sticky>
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
                    description="Try a different search or type. Staged venues stay listed above."
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
          </Scrollable>
        </Stack>
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="secondary" slot="close">
          Cancel
        </Button>
        <Button variant="primary" onPress={() => onConfirm(ids)}>
          {confirmLabel} {ids.length} {ids.length === 1 ? 'venue' : 'venues'}
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
    {/* Switch to size="fullscreen" for this content-heavy pick once that Dialog size ships. */}
    <Dialog size="large" closeButton>
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
