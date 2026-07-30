'use client';

import type { Event, EventStatus } from '@/lib/data/events';
import {
  ActionMenu,
  Badge,
  Button,
  Center,
  Inline,
  Stack,
  Table,
  Text,
  VisuallyHidden,
} from '@marigold/components';
import { NumericFormat } from '@marigold/system';
import { BulkActionBar } from './BulkActionBar';
import { useEvents } from './hooks/useEvents';
import { useSearch, useStatusFilter } from './hooks/useEventsParams';
import { useRowActions } from './hooks/useRowActions';
import { useSelection } from './hooks/useSelection';

// Anchor that EventsPagination scrolls back to so users land on the first
// row of the new page.
export const EVENTS_REGION_ID = 'events-region';

// Fixture dates are ISO; a fixed locale keeps prerender and browser output
// identical.
const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
const formatDate = (date: string) => dateFormat.format(new Date(date));

const statusVariant = (status: EventStatus) => {
  if (status === 'On sale') return 'success';
  if (status === 'Draft') return 'info';
  return undefined;
};

const FilterEmptyState = () => {
  const [, setSearch] = useSearch();
  const [, setStatus] = useStatusFilter();

  const clearAll = () => {
    setSearch('');
    setStatus(null);
  };

  return (
    <div className="grid min-w-xl place-items-center py-10">
      <Center>
        <Text fontSize="lg" weight="bold">
          No events match your criteria
        </Text>
        <Text variant="muted">Try adjusting your search or status filter.</Text>
        <Button variant="ghost" onPress={clearAll}>
          Clear all filters
        </Button>
      </Center>
    </div>
  );
};

const NoDataEmptyState = () => (
  <div className="grid min-w-xl place-items-center py-10">
    <Center>
      <Text fontSize="lg" weight="bold">
        No events left
      </Text>
      <Text variant="muted">
        Every event was deleted this session. Use “Reset demo” to bring them
        back.
      </Text>
    </Center>
  </div>
);

// Co-located skeleton that mirrors the table's row rhythm. Shown only for the
// initial fetch (`isLoading`); background refetches keep the previous rows on
// screen and surface activity through FetchingIndicator instead.
export const EventsTableSkeleton = ({ rows = 10 }: { rows?: number }) => (
  <>
    <VisuallyHidden role="status">Loading events…</VisuallyHidden>
    <div aria-hidden>
      <Stack space={4}>
        {Array.from({ length: rows }, (_, i) => `skeleton-${i}`).map(key => (
          <Inline key={key} space={6} alignY="center">
            <div className="h-4 w-1/4 animate-pulse rounded bg-current/10" />
            <div className="h-4 w-1/6 animate-pulse rounded bg-current/10" />
            <div className="h-4 grow animate-pulse rounded bg-current/10" />
            <div className="h-4 w-16 animate-pulse rounded bg-current/10" />
            <div className="h-4 w-12 animate-pulse rounded bg-current/10" />
            <div className="h-4 w-6 animate-pulse rounded bg-current/10" />
          </Inline>
        ))}
      </Stack>
    </div>
  </>
);

// Per-row menu for one-off operations (see the Table Records pattern). It
// carries the same verbs as the bulk bar, scoped to one named event. While
// rows are selected the bar owns the scope, so the menu disables — bulk and
// per-row actions take turns instead of competing for the same press
// (bulk-actions pattern, "Choosing actions").
const RowActions = ({
  event,
  disabled,
}: {
  event: Event;
  disabled: boolean;
}) => {
  const actions = useRowActions();

  return (
    <ActionMenu
      aria-label={`Actions for ${event.name}`}
      variant="ghost"
      size="small"
      disabled={disabled}
      onAction={key => {
        if (key === 'publish') actions.publish(event);
        if (key === 'archive') actions.archive(event);
        if (key === 'remind') actions.remind(event);
        if (key === 'delete') actions.deleteEvent(event);
      }}
    >
      <ActionMenu.Item id="publish">Publish</ActionMenu.Item>
      <ActionMenu.Item id="archive">Archive</ActionMenu.Item>
      <ActionMenu.Item id="remind">Send reminder</ActionMenu.Item>
      <ActionMenu.Item id="delete" variant="destructive">
        Delete
      </ActionMenu.Item>
    </ActionMenu>
  );
};

const EventRow = ({
  event,
  actionsDisabled,
}: {
  event: Event;
  actionsDisabled: boolean;
}) => (
  <Table.Row id={event.id}>
    <Table.Cell>
      <Text weight="medium">{event.name}</Text>
    </Table.Cell>
    <Table.Cell>{formatDate(event.date)}</Table.Cell>
    <Table.Cell>
      {event.venue ?? <Text variant="muted">No venue</Text>}
    </Table.Cell>
    <Table.Cell>{event.category}</Table.Cell>
    <Table.Cell>
      <NumericFormat
        style="currency"
        value={event.price}
        currency="EUR"
        maximumFractionDigits={0}
      />
    </Table.Cell>
    <Table.Cell>
      <Badge variant={statusVariant(event.status)}>{event.status}</Badge>
    </Table.Cell>
    <Table.Cell>
      <NumericFormat value={event.reservations} />
    </Table.Cell>
    <Table.Cell>
      <RowActions event={event} disabled={actionsDisabled} />
    </Table.Cell>
  </Table.Row>
);

// The Panel (page.tsx) is the "Events" landmark; this wrapper carries the
// region id so EventsPagination can scroll back to it on page change, plus
// the single live region (role="status" implies aria-live="polite").
//
// The two bulk-action props sit on the Table itself: `selectionMode` turns on
// the checkbox column (header select-all with indeterminate state included),
// and `actionBar` floats the toolbar for the current selection above it. The
// selection is controlled so scope changes and partial failures can rewrite
// the selected keys (see useSelection).
export const EventsTable = () => {
  const { items, totalItems, pageSize, isFiltered, isLoading } = useEvents();
  const { selected, setSelected } = useSelection();

  if (isLoading) {
    return <EventsTableSkeleton rows={pageSize} />;
  }

  const summary = `${totalItems} event${totalItems === 1 ? '' : 's'}`;
  const hasSelection = selected === 'all' || selected.size > 0;

  return (
    <div id={EVENTS_REGION_ID} className="scroll-mt-4">
      <VisuallyHidden role="status">{summary}</VisuallyHidden>
      <Table
        aria-label="Events"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        actionBar={() => <BulkActionBar />}
      >
        {/* Columns with predictable short content get a fixed width; the two
            text columns share the rest, weighted toward the event name. */}
        <Table.Header>
          <Table.Column id="name" rowHeader width="2fr" minWidth={200}>
            Event
          </Table.Column>
          <Table.Column id="date" width={120}>
            Date
          </Table.Column>
          <Table.Column id="venue" width="1fr" minWidth={140}>
            Venue
          </Table.Column>
          <Table.Column id="category" width={110}>
            Category
          </Table.Column>
          <Table.Column id="price" alignX="right" width={80}>
            Price
          </Table.Column>
          <Table.Column id="status" width={100}>
            Status
          </Table.Column>
          <Table.Column id="reservations" alignX="right" width={120}>
            Reservations
          </Table.Column>
          <Table.Column id="actions" width={56}>
            <VisuallyHidden>Actions</VisuallyHidden>
          </Table.Column>
        </Table.Header>
        <Table.Body
          emptyState={() =>
            isFiltered ? <FilterEmptyState /> : <NoDataEmptyState />
          }
        >
          {items.map(event => (
            <EventRow
              key={event.id}
              event={event}
              actionsDisabled={hasSelection}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
