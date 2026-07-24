'use client';

import {
  amenitiesOptions,
  parkingOptions,
  venueTypes,
} from '@/lib/data/venues';
import type { Venue } from '@/lib/data/venues';
import {
  ActionBar,
  Badge,
  Button,
  Center,
  Inline,
  Stack,
  Table,
  Text,
  VisuallyHidden,
} from '@marigold/components';
import { Download, Star, Trash2 } from '@marigold/icons';
import { NumericFormat } from '@marigold/system';
import { exportVenuesToCsv } from './csv';
import { useDeleteVenue } from './hooks/useDeleteVenue';
import { useFilter } from './hooks/useFilter';
import { useSearch } from './hooks/useSearch';
import { type VenueSortDescriptor, useSort } from './hooks/useSort';
import { useVenues } from './hooks/useVenues';
import { fetchVenues } from './hooks/venuesApi';

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
    <div className="grid min-w-xl place-items-center py-10">
      <Center>
        <Text fontSize="lg" weight="bold">
          No venues match your criteria
        </Text>
        <Text variant="muted">Try adjusting your filters or search terms.</Text>
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
        No venues available
      </Text>
      <Text variant="muted">Add a venue to get started.</Text>
    </Center>
  </div>
);

// Co-located skeleton that mirrors the table's row rhythm. Shown only for the
// initial fetch (`isLoading`); background refetches keep the previous rows on
// screen and surface activity through FetchingIndicator instead.
export const VenuesTableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <>
    <VisuallyHidden role="status">Loading venues…</VisuallyHidden>
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

// Renders up to `max` badges and collapses the rest into a single "+N" badge,
// so multi-value cells stay a consistent height instead of ballooning the row.
// Mirrors the "+N more" truncation used by AppliedFilter. The overflow badge
// carries the hidden labels in its accessible name and native `title`, so the
// collapsed values stay reachable via hover and screen readers.
const BadgeList = ({
  items,
  max = 3,
}: {
  items: readonly string[];
  max?: number;
}) => {
  const hidden = items.slice(max);

  return (
    <Inline space="0.5">
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
    <Table.Cell>
      <Text weight="medium">{venue.name}</Text>
    </Table.Cell>
    <Table.Cell>{venueTypes[venue.type] ?? 'Unknown'}</Table.Cell>
    <Table.Cell>
      <Stack>
        <Text>{venue.street}</Text>
        <Text variant="muted" fontSize="sm">
          {venue.city}, {venue.country}
        </Text>
      </Stack>
    </Table.Cell>
    <Table.Cell>
      <NumericFormat value={venue.capacity} />
    </Table.Cell>
    <Table.Cell>
      <NumericFormat
        style="currency"
        value={venue.price.to}
        currency="EUR"
        maximumFractionDigits={0}
      />
    </Table.Cell>
    <Table.Cell>
      <BadgeList items={venue.traits} />
    </Table.Cell>
    <Table.Cell>
      <BadgeList items={venue.amenities.map(a => amenitiesOptions[a])} />
    </Table.Cell>
    <Table.Cell>
      <BadgeList items={venue.parking.map(p => parkingOptions[p])} />
    </Table.Cell>
    <Table.Cell>
      <Inline space="0.5" alignX="right">
        <NumericFormat value={venue.rating} minimumFractionDigits={1} />{' '}
        <Star className="self-center" size={14} />
      </Inline>
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
  const { items, params, totalItems, pageSize, isFiltered, isLoading } =
    useVenues();
  const [sort, setSort] = useSort();
  const { deleteVenue, isDeleting } = useDeleteVenue();

  if (isLoading) {
    return <VenuesTableSkeleton rows={pageSize} />;
  }

  const summary = `${totalItems} venue${totalItems === 1 ? '' : 's'}`;

  return (
    <div id={VENUES_REGION_ID} className="scroll-mt-4">
      <VisuallyHidden role="status">{summary}</VisuallyHidden>
      <Table
        aria-label="Venue list"
        selectionMode="multiple"
        sortDescriptor={sort}
        onSortChange={d =>
          setSort({
            // RAC types `column` as `Key` (string | number); the cast is
            // safe because the value can only be one of our Table.Column ids.
            column: d.column as VenueSortDescriptor['column'],
            direction: d.direction,
          })
        }
        actionBar={selectedKeys => (
          <ActionBar>
            <Button
              onPress={async () => {
                // "Select all" can span pages, so fetch the full matching set
                // (same query, no pagination) before exporting.
                const selected =
                  selectedKeys === 'all'
                    ? (await fetchVenues({ ...params, pageSize: 'all' })).items
                    : items.filter(v => selectedKeys.has(v.id));
                exportVenuesToCsv(selected);
              }}
            >
              <Download /> Export CSV
            </Button>
          </ActionBar>
        )}
      >
        <Table.Header>
          <Table.Column id="name" rowHeader allowsSorting>
            Name
          </Table.Column>
          <Table.Column id="type">Type</Table.Column>
          <Table.Column id="address">Address</Table.Column>
          <Table.Column id="capacity" alignX="right" allowsSorting>
            Capacity
          </Table.Column>
          <Table.Column id="price" alignX="right" allowsSorting>
            Max. Price
          </Table.Column>
          <Table.Column id="traits">Traits</Table.Column>
          <Table.Column id="amenities">Amenities</Table.Column>
          <Table.Column id="parking">Parking</Table.Column>
          <Table.Column id="rating" alignX="right">
            Rating
          </Table.Column>
          <Table.Column id="actions">
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
    </div>
  );
};
