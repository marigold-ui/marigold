'use client';

import type { Event, EventStatus } from '@/lib/data/events';
import {
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
import { useSearch } from './hooks/useSearch';
import { useSelection } from './hooks/useSelection';
import { useStatusFilter } from './hooks/useStatusFilter';

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
          </Inline>
        ))}
      </Stack>
    </div>
  </>
);

const EventRow = ({ event }: { event: Event }) => (
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
        <Table.Header>
          <Table.Column id="name" rowHeader>
            Event
          </Table.Column>
          <Table.Column id="date">Date</Table.Column>
          <Table.Column id="venue">Venue</Table.Column>
          <Table.Column id="category">Category</Table.Column>
          <Table.Column id="price" alignX="right">
            Price
          </Table.Column>
          <Table.Column id="status">Status</Table.Column>
          <Table.Column id="reservations" alignX="right">
            Reservations
          </Table.Column>
        </Table.Header>
        <Table.Body
          emptyState={() =>
            isFiltered ? <FilterEmptyState /> : <NoDataEmptyState />
          }
        >
          {items.map(event => (
            <EventRow key={event.id} event={event} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
