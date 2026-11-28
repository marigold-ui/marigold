'use client';

import { type ComponentProps, useMemo, useState } from 'react';
import type { Key } from '@react-types/shared';
import type { Selection } from '@marigold/components';
import {
  Badge,
  Button,
  Dialog,
  EmptyState,
  Inline,
  NumericFormat,
  Scrollable,
  SearchField,
  SectionMessage,
  Select,
  Stack,
  Table,
  Tag,
  Text,
} from '@marigold/components';
import {
  type Venue,
  pickerColumnWidths,
  statusVariant,
  venueStatuses,
  venues,
} from './venues';

// Type and city options are derived from the data so they never drift from
// it: every option maps to real venues, and every venue value is selectable.
// Sorted so the option order is stable and predictable.
const unique = (key: 'type' | 'city') =>
  [...new Set(venues.map(venue => venue[key]))].sort((a, b) =>
    a.localeCompare(b)
  );
const types = unique('type');
const cities = unique('city');
// Availability keeps its lifecycle order (Available, Held, Booked).
const statuses = [...venueStatuses];

type FacetKey = 'type' | 'city' | 'status';

interface VenueFilters {
  query: string;
  type: Key | null;
  city: Key | null;
  status: Key | null;
}

// Does a venue match the active filters? `exclude` skips one facet so a facet's
// own options can be counted against the other filters.
const matchesVenue = (
  venue: Venue,
  filters: VenueFilters,
  exclude?: FacetKey
) => {
  const { query, type, city, status } = filters;
  return (
    (!query || `${venue.name} ${venue.city}`.toLowerCase().includes(query)) &&
    (exclude === 'type' ||
      type == null ||
      type === 'all' ||
      venue.type === type) &&
    (exclude === 'city' ||
      city == null ||
      city === 'all' ||
      venue.city === city) &&
    (exclude === 'status' ||
      status == null ||
      status === 'all' ||
      venue.status === status)
  );
};

interface FilterSelectProps {
  label: string;
  allLabel: string;
  value: Key | null;
  onChange: (key: Key | null) => void;
  options: string[];
  counts: Record<string, number>;
  width: ComponentProps<typeof Select>['width'];
}

// A filter whose options carry their result count and disable at zero, so the
// user sees where results are and never picks a dead-end combination. The
// current value is never disabled, so a filter can always be changed back.
const FilterSelect = ({
  label,
  allLabel,
  value,
  onChange,
  options,
  counts,
  width,
}: FilterSelectProps) => {
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const disabledKeys = options.filter(
    option => (counts[option] ?? 0) === 0 && option !== value
  );
  const trigger = value == null || value === 'all' ? allLabel : String(value);
  return (
    <Select
      aria-label={label}
      value={value}
      onChange={onChange}
      width={width}
      disabledKeys={disabledKeys}
      // Keep the count out of the collapsed trigger; it belongs in the list.
      renderValue={() => trigger}
    >
      <Select.Option id="all">{`${allLabel} (${total})`}</Select.Option>
      {options.map(option => (
        <Select.Option key={option} id={option}>
          {`${option} (${counts[option] ?? 0})`}
        </Select.Option>
      ))}
    </Select>
  );
};

interface PickBodyProps {
  title: string;
  initial: string[];
  onConfirm: (ids: string[]) => void;
}

// The commit names its outcome: the first pick adds venues to the report,
// a later one replaces the set, so it updates it.
const commitLabel = (count: number, editing: boolean) => {
  if (editing) return 'Update venues';
  if (count === 0) return 'Add venues';
  return `Add ${count} ${count === 1 ? 'venue' : 'venues'}`;
};

const PickBody = ({ title, initial, onConfirm }: PickBodyProps) => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<Key | null>('all');
  const [city, setCity] = useState<Key | null>('all');
  const [status, setStatus] = useState<Key | null>('all');
  const [selected, setSelected] = useState<Set<Key>>(() => new Set(initial));
  // Keep the commit active. Counts refused empty presses, which keys the error
  // so each press re-announces, and resets on any selection change.
  const [emptyAttempts, setEmptyAttempts] = useState(0);

  const results = useMemo(() => {
    const filters: VenueFilters = {
      query: search.trim().toLowerCase(),
      type,
      city,
      status,
    };
    return venues.filter(venue => matchesVenue(venue, filters));
  }, [search, type, city, status]);

  // Faceted counts: how many venues each option yields under the other active
  // filters, so options can show a count and disable at zero. Each facet is
  // counted with its own constraint excluded, so its options reflect the rest.
  const counts = useMemo(() => {
    const filters: VenueFilters = {
      query: search.trim().toLowerCase(),
      type,
      city,
      status,
    };
    const byType: Record<string, number> = {};
    const byCity: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    for (const venue of venues) {
      if (matchesVenue(venue, filters, 'type'))
        byType[venue.type] = (byType[venue.type] ?? 0) + 1;
      if (matchesVenue(venue, filters, 'city'))
        byCity[venue.city] = (byCity[venue.city] ?? 0) + 1;
      if (matchesVenue(venue, filters, 'status'))
        byStatus[venue.status] = (byStatus[venue.status] ?? 0) + 1;
    }
    return { type: byType, city: byCity, status: byStatus };
  }, [search, type, city, status]);

  // React-aria only reports the currently visible (filtered) rows, and "select
  // all" means that visible set. Merge every change with the venues staged
  // under other filters so narrowing the list never drops staged picks.
  const onSelectionChange = (keys: Selection) => {
    // Any selection change clears a pending empty-press error.
    setEmptyAttempts(0);
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
      {/* State the one-venue minimum up front as the dialog's accessible
          description, so it is announced to a screen reader on the table or
          footer instead of only being read in visual order. */}
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>
          Pick at least one venue to add it to the report.
        </Dialog.Description>
      </Dialog.Header>
      <Dialog.Content>
        <Stack space="regular">
          {/* An empty press reveals this instead of committing, and the key
              remounts it so each refused press re-announces. Any selection
              change resets the counter and hides it. */}
          <SectionMessage
            key={emptyAttempts}
            variant="error"
            open={emptyAttempts > 0 && ids.length === 0}
          >
            <SectionMessage.Title>No venues selected</SectionMessage.Title>
            <SectionMessage.Content>
              Tick at least one venue to add it to the report.
            </SectionMessage.Content>
          </SectionMessage>

          {/* A real find-and-collect task: search plus several filter facets
              narrow a wide, detail-rich table. This density is what outgrows a
              large dialog and earns a fullscreen surface. */}
          <Stack space="related">
            <Inline space="related" alignY="input">
              <SearchField
                aria-label="Search venues"
                placeholder="Search by name or city"
                value={search}
                onChange={setSearch}
                width={56}
              />
              <FilterSelect
                label="Filter by type"
                allLabel="All types"
                value={type}
                onChange={setType}
                options={types}
                counts={counts.type}
                width={56}
              />
              <FilterSelect
                label="Filter by city"
                allLabel="All cities"
                value={city}
                onChange={setCity}
                options={cities}
                counts={counts.city}
                width={48}
              />
              <FilterSelect
                label="Filter by availability"
                allLabel="Any availability"
                value={status}
                onChange={setStatus}
                options={statuses}
                counts={counts.status}
                width={40}
              />
            </Inline>
            {/* Says how much is in view, and so what "select all" covers. */}
            <Text variant="muted" fontSize="sm">
              Showing {results.length} of {venues.length} venues
            </Text>
          </Stack>

          {/* The staged set stays visible as removable tags through every
              search and filter, so picks never scroll out of sight or vanish
              when the list is narrowed. The rail is always rendered, with a
              muted hint when empty, so staging the first venue never shifts the
              table below it. */}
          <Tag.Group
            label={`Selected (${stagedVenues.length})`}
            selectionMode="none"
            onRemove={unstage}
            collapseAt={8}
            emptyState={() => (
              <Text variant="muted" fontSize="sm">
                No venues selected yet. Tick a row to add it.
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
          <Scrollable height="calc(100dvh - 23rem)">
            <Table
              aria-label="Venues"
              size="compact"
              selectionMode="multiple"
              selectedKeys={selected}
              onSelectionChange={onSelectionChange}
            >
              <Table.Header sticky>
                <Table.Column
                  rowHeader
                  sticky="start"
                  {...pickerColumnWidths.name}
                >
                  Venue
                </Table.Column>
                <Table.Column {...pickerColumnWidths.city}>City</Table.Column>
                <Table.Column {...pickerColumnWidths.type}>Type</Table.Column>
                <Table.Column alignX="right" {...pickerColumnWidths.capacity}>
                  Capacity
                </Table.Column>
                <Table.Column alignX="right" {...pickerColumnWidths.rating}>
                  Rating
                </Table.Column>
                <Table.Column {...pickerColumnWidths.status}>
                  Availability
                </Table.Column>
                <Table.Column alignX="right" {...pickerColumnWidths.rate}>
                  Day rate
                </Table.Column>
              </Table.Header>
              <Table.Body
                items={results}
                emptyState={() => (
                  <EmptyState
                    title="No venues match"
                    description="Try a different search or filter. Your selected venues stay listed above."
                  />
                )}
              >
                {venue => (
                  <Table.Row id={venue.id}>
                    <Table.Cell>{venue.name}</Table.Cell>
                    <Table.Cell>{venue.city}</Table.Cell>
                    <Table.Cell>{venue.type}</Table.Cell>
                    <Table.Cell alignX="right">
                      <NumericFormat value={venue.capacity} />
                    </Table.Cell>
                    <Table.Cell alignX="right">
                      <NumericFormat
                        value={venue.rating}
                        minimumFractionDigits={1}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant={statusVariant[venue.status]}>
                        {venue.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell alignX="right">
                      <NumericFormat
                        style="currency"
                        currency="EUR"
                        value={venue.rate}
                        maximumFractionDigits={0}
                      />
                    </Table.Cell>
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
        {/* Stays active. An empty press is refused with the message above
            rather than blocked by a disabled control. */}
        <Button
          variant="primary"
          onPress={() => {
            if (ids.length === 0) {
              setEmptyAttempts(n => n + 1);
              return;
            }
            onConfirm(ids);
          }}
        >
          {commitLabel(ids.length, initial.length > 0)}
        </Button>
      </Dialog.Actions>
    </>
  );
};

interface PickVenuesDialogProps {
  /** Text on the trigger button. */
  trigger: string;
  /**
   * Trigger emphasis. Set it explicitly: inside a `Panel.Header` a button
   * defaults to ghost.
   */
  variant?: ComponentProps<typeof Button>['variant'];
  /** Dialog title. */
  title: string;
  /** Venue ids to open with already staged. */
  initial: string[];
  /** Called with the committed venue ids when the user confirms. */
  onConfirm: (ids: string[]) => void;
}

export const PickVenuesDialog = ({
  trigger,
  variant = 'primary',
  title,
  initial,
  onConfirm,
}: PickVenuesDialogProps) => (
  <Dialog.Trigger>
    <Button variant={variant}>{trigger}</Button>
    {/* This pick is content-heavy (a wide table over ~50 rows), so it fills
        the viewport with a fullscreen dialog. */}
    <Dialog size="fullscreen" closeButton>
      {({ close }) => (
        <PickBody
          title={title}
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
