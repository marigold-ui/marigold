'use client';

import { amenitiesOptions, venueTypes } from '@/lib/data/venues';
import type { Venue } from '@/lib/data/venues';
import {
  Badge,
  Button,
  EmptyState,
  Inline,
  Scrollable,
  Stack,
  Table,
  Text,
  VisuallyHidden,
} from '@marigold/components';
import { Star, Trash2 } from '@marigold/icons';
import { DateFormat, NumericFormat } from '@marigold/system';
import { useDeleteVenue } from './hooks/useDeleteVenue';
import { useFilter } from './hooks/useFilter';
import { useSearch } from './hooks/useSearch';
import { type VenueSortDescriptor, useSort } from './hooks/useSort';
import { useVenues } from './hooks/useVenues';

// Anchor that VenuesPagination scrolls back to so users land on the first
// row of the new page.
export const VENUES_REGION_ID = 'venues-region';

const FilterEmptyState = () => {
  const [, setSearch] = useSearch();
  const { clearFilter } = useFilter();

  const clearAll = () => {
    setSearch('');
    clearFilter();
  };

  return (
    <EmptyState
      title="No venues match your filters"
      description="Try fewer filters or another search term."
      action={<Button onPress={clearAll}>Clear all filters</Button>}
    />
  );
};

const NoDataEmptyState = () => (
  <EmptyState
    title="No venues yet"
    description="Add a venue to start planning events there."
    action={<Button>Add venue</Button>}
  />
);

// Co-located skeleton that mirrors the table's row rhythm. Shown only for the
// initial fetch (`isLoading`); background refetches keep the previous rows on
// screen and surface activity through FetchingIndicator instead.
//
// Purely visual (`aria-hidden`): the loading text is announced by the live
// region in VenuesTable, which outlives this subtree. See the note there.
export const VenuesTableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div aria-hidden>
    <Stack space="regular">
      {Array.from({ length: rows }, (_, i) => `skeleton-${i}`).map(key => (
        <Inline key={key} space="regular" alignY="center">
          <div className="h-4 w-1/4 animate-pulse rounded bg-current/10" />
          <div className="h-4 w-1/6 animate-pulse rounded bg-current/10" />
          <div className="h-4 grow animate-pulse rounded bg-current/10" />
          <div className="h-4 w-16 animate-pulse rounded bg-current/10" />
          <div className="h-4 w-12 animate-pulse rounded bg-current/10" />
        </Inline>
      ))}
    </Stack>
  </div>
);

// Renders up to `max` badges and collapses the rest into a single "+N" badge,
// so multi-value cells stay a consistent height instead of ballooning the row.
// Mirrors the "+N more" truncation used by AppliedFilter. The overflow badge
// carries the hidden labels in its accessible name and native `title`, so the
// collapsed values stay reachable via hover and screen readers.
const BadgeList = ({
  items,
  max = 2,
}: {
  items: readonly string[];
  max?: number;
}) => {
  const hidden = items.slice(max);

  return (
    <Inline space="tight">
      {items.slice(0, max).map(item => (
        <Badge key={item}>{item}</Badge>
      ))}
      {hidden.length > 0 && (
        <span title={hidden.join(', ')}>
          <Badge>{`+${hidden.length}`}</Badge>
          <VisuallyHidden>{` more: ${hidden.join(', ')}`}</VisuallyHidden>
        </span>
      )}
    </Inline>
  );
};

const euro = (value: number) => (
  <NumericFormat
    style="currency"
    value={value}
    currency="EUR"
    maximumFractionDigits={0}
  />
);

const VenueRow = ({
  venue,
  onDelete,
  deleteDisabled,
}: {
  venue: Venue;
  onDelete: (venue: Venue) => void;
  deleteDisabled: boolean;
}) => (
  <Table.Row id={venue.id}>
    <Table.Cell textValue={venue.name}>
      <Stack>
        <Text weight="medium">{venue.name}</Text>
        <Text variant="muted" fontSize="sm">
          {venue.street}
        </Text>
      </Stack>
    </Table.Cell>
    <Table.Cell>{venueTypes[venue.type] ?? 'Unknown'}</Table.Cell>
    <Table.Cell>
      <Stack>
        <Text>{venue.city}</Text>
        <Text variant="muted" fontSize="sm">
          {venue.country}
        </Text>
      </Stack>
    </Table.Cell>
    <Table.Cell>
      <NumericFormat value={venue.capacity} />
    </Table.Cell>
    <Table.Cell>
      {euro(venue.price.from)} to {euro(venue.price.to)}
    </Table.Cell>
    <Table.Cell textValue={`${venue.rating} stars`}>
      <Inline space="tight" alignX="right" alignY="center" noWrap>
        <NumericFormat value={venue.rating} minimumFractionDigits={1} />
        <Star size={14} aria-hidden />
      </Inline>
    </Table.Cell>
    <Table.Cell>
      {/* Local midnight, so the shown day never shifts across timezones. */}
      <DateFormat
        value={new Date(`${venue.nextAvailable}T00:00:00`)}
        dateStyle="medium"
      />
    </Table.Cell>
    <Table.Cell>
      <BadgeList items={venue.amenities.map(a => amenitiesOptions[a])} />
    </Table.Cell>
    <Table.Cell>
      <Button
        variant="ghost"
        size="small"
        disabled={deleteDisabled}
        aria-label={`Delete ${venue.name}`}
        onPress={() => onDelete(venue)}
      >
        <Trash2 size={16} />
      </Button>
    </Table.Cell>
  </Table.Row>
);

// The Panel (page.tsx) is the "Venues" landmark; this wrapper carries the
// region id so VenuesPagination can scroll back to it on page change, plus
// the single live region (role="status" implies aria-live="polite").
export const VenuesTable = () => {
  const { items, totalItems, pageSize, isFiltered, isLoading } = useVenues();
  const [sort, setSort] = useSort();
  const { deleteVenue, isDeleting } = useDeleteVenue();

  // A live region is announced when the text inside an already present node
  // changes. Mounting the container together with its text is a known failure
  // mode, where NVDA and JAWS on Chrome can drop that first announcement. So
  // this region stays mounted across the loading, loaded, and filtered states
  // and only its text content is swapped, never the node itself.
  const status = isLoading
    ? 'Loading venues…'
    : `${totalItems} venue${totalItems === 1 ? '' : 's'}`;

  return (
    <div id={VENUES_REGION_ID} className="scroll-mt-4">
      <VisuallyHidden role="status">{status}</VisuallyHidden>
      {isLoading ? (
        <VenuesTableSkeleton rows={pageSize} />
      ) : (
        <Scrollable>
          <Table
            aria-label="Venue list"
            sortDescriptor={sort}
            onSortChange={d =>
              setSort({
                // RAC types `column` as `Key` (string | number); the cast is
                // safe because the value can only be one of our Table.Column ids.
                column: d.column as VenueSortDescriptor['column'],
                direction: d.direction,
              })
            }
          >
            <Table.Header>
              <Table.Column
                id="name"
                rowHeader
                sticky="start"
                allowsSorting
                width="2fr"
                minWidth={240}
              >
                Venue
              </Table.Column>
              <Table.Column id="type" width={190}>
                Type
              </Table.Column>
              <Table.Column id="city" width="1fr" minWidth={130}>
                City
              </Table.Column>
              <Table.Column
                id="capacity"
                alignX="right"
                allowsSorting
                width={100}
              >
                Capacity
              </Table.Column>
              <Table.Column id="price" alignX="right" allowsSorting width={160}>
                Price
              </Table.Column>
              <Table.Column id="rating" alignX="right" allowsSorting width={90}>
                Rating
              </Table.Column>
              <Table.Column id="available" allowsSorting width={130}>
                Available
              </Table.Column>
              <Table.Column id="amenities" width={200}>
                Amenities
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
              {items.map(venue => (
                <VenueRow
                  key={venue.id}
                  venue={venue}
                  onDelete={deleteVenue}
                  deleteDisabled={isDeleting}
                />
              ))}
            </Table.Body>
          </Table>
        </Scrollable>
      )}
    </div>
  );
};
