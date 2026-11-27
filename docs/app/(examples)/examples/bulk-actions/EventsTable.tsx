'use client';

import type { Event, EventStatus } from '@/lib/data/events';
import {
  ActionMenu,
  Badge,
  Button,
  EmptyState,
  Inline,
  LinkButton,
  Stack,
  Table,
  Text,
  VisuallyHidden,
} from '@marigold/components';
import { DateFormat, NumericFormat } from '@marigold/system';
import { BulkActionBar } from './BulkActionBar';
import { useEvents } from './hooks/useEvents';
import { useSearch, useStatusFilter } from './hooks/useEventsParams';
import { useRowActions } from './hooks/useRowActions';
import { useSelection } from './hooks/useSelection';

// Anchor that EventsPagination scrolls back to so users land on the first
// row of the new page.
export const EVENTS_REGION_ID = 'events-region';

// Date and time are stored as the venue's wall-clock time. Reading them as
// UTC and formatting in UTC shows exactly what was stored, whatever the
// reader's time zone.
const startsAt = (event: Event) => new Date(`${event.date}T${event.time}:00Z`);

// Colour only where the status asks for attention (ADR-0009): on sale is
// live, a draft still needs work, an archived event is over.
const statusVariant: Record<EventStatus, 'success' | 'info' | undefined> = {
  'On sale': 'success',
  Draft: 'info',
  Archived: undefined,
};

const FilterEmptyState = () => {
  const [, setSearch] = useSearch();
  const [, setStatus] = useStatusFilter();

  const clearAll = () => {
    setSearch('');
    setStatus(null);
  };

  return (
    <EmptyState
      title="No events match your search"
      description="Try another name or venue, or clear the filters."
      action={<Button onPress={clearAll}>Clear all filters</Button>}
    />
  );
};

const NoDataEmptyState = () => (
  <EmptyState
    title="No events yet"
    description="Create your first event to start selling tickets."
    action={<LinkButton href="/examples/event-form">Create event</LinkButton>}
  />
);

// Co-located skeleton that mirrors the table's row rhythm. Shown only for the
// initial fetch (`isLoading`); background refetches keep the previous rows on
// screen and surface activity through FetchingIndicator instead.
export const EventsTableSkeleton = ({ rows = 10 }: { rows?: number }) => (
  <>
    <VisuallyHidden role="status">Loading events…</VisuallyHidden>
    <div aria-hidden>
      <Stack space="regular">
        {Array.from({ length: rows }, (_, i) => `skeleton-${i}`).map(key => (
          <Inline key={key} space="regular" alignY="center">
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
// carries the same verbs as the bulk bar, scoped to one named event, and
// offers only what the event's status allows: nothing to publish on an event
// that is already on sale, nothing to archive twice. While
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
      {event.status !== 'On sale' && (
        <ActionMenu.Item id="publish">Publish</ActionMenu.Item>
      )}
      {event.status !== 'Archived' && (
        <ActionMenu.Item id="archive">Archive</ActionMenu.Item>
      )}
      {event.status === 'On sale' && (
        <ActionMenu.Item id="remind">Send reminder</ActionMenu.Item>
      )}
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
    <Table.Cell textValue={event.name}>
      <Stack>
        <Text weight="medium">{event.name}</Text>
        <Text fontSize="sm" variant="muted">
          {event.category}
        </Text>
      </Stack>
    </Table.Cell>
    <Table.Cell>
      <DateFormat
        value={startsAt(event)}
        dateStyle="medium"
        timeStyle="short"
        timeZone="UTC"
      />
    </Table.Cell>
    <Table.Cell>
      {event.venue ?? <Text variant="muted">No venue</Text>}
    </Table.Cell>
    <Table.Cell>
      <Badge variant={statusVariant[event.status]}>{event.status}</Badge>
    </Table.Cell>
    <Table.Cell>
      <NumericFormat value={event.reservations} />
      {' / '}
      <NumericFormat value={event.capacity} />
    </Table.Cell>
    <Table.Cell>
      {event.price === 0 ? (
        'Free'
      ) : (
        <NumericFormat
          style="currency"
          value={event.price}
          currency="EUR"
          maximumFractionDigits={0}
        />
      )}
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
            text columns share the rest, weighted toward the event name so the
            slack on a wide screen does not push the date away from it. Status
            sits right after the venue, so it is in view before anyone acts
            on a selection. */}
        <Table.Header>
          <Table.Column id="name" rowHeader width="3fr" minWidth={220}>
            Event
          </Table.Column>
          <Table.Column id="date" width={190}>
            Date and time
          </Table.Column>
          <Table.Column id="venue" width="2fr" minWidth={160}>
            Venue
          </Table.Column>
          <Table.Column id="status" width={100}>
            Status
          </Table.Column>
          <Table.Column id="sold" alignX="right" width={120}>
            Tickets sold
          </Table.Column>
          <Table.Column id="price" alignX="right" width={100}>
            Price
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
