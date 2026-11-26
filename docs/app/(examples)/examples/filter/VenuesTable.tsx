'use client';

import {
  amenitiesOptions,
  parkingOptions,
  venueTypes,
} from '@/lib/data/venues';
import type { Venue } from '@/lib/data/venues';
import { useState } from 'react';
import {
  ActionBar,
  Badge,
  Button,
  Center,
  Inline,
  type Selection,
  Skeleton,
  type SkeletonProps,
  Stack,
  Table,
  Text,
  VisuallyHidden,
} from '@marigold/components';
import { Download, Star, Trash2 } from '@marigold/icons';
import { DateFormat, NumericFormat } from '@marigold/system';
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

// Placeholder rows for the initial fetch (`isLoading`), rendered inside the
// real table so the header and column widths stay put. Background refetches
// keep the previous rows on screen and show FetchingIndicator instead.
type Placeholder = Pick<SkeletonProps, 'width' | 'height' | 'variant'>;

// `secondLine` mirrors a cell that always holds two lines of text.
const skeletonCells: ReadonlyArray<
  { column: string; secondLine?: Placeholder } & Placeholder
> = [
  { column: 'name', width: '3/4' },
  { column: 'type', width: '2/3' },
  { column: 'address', width: '3/4', secondLine: { width: '1/2' } },
  { column: 'capacity', width: '1/2' },
  { column: 'price', width: '1/2' },
  { column: 'traits', width: 16, height: 5, variant: 'rounded' },
  { column: 'amenities', width: 16, height: 5, variant: 'rounded' },
  { column: 'parking', width: 16, height: 5, variant: 'rounded' },
  { column: 'rating', width: '1/2' },
  { column: 'available', width: '3/4' },
  { column: 'actions', width: 8, height: 8 }, // Small button
];

const skeletonRowIds = (count: number) =>
  Array.from({ length: count }, (_, i) => `skeleton-${i}`);

const VenueSkeletonRow = ({ id }: { id: string }) => (
  <Table.Row id={id}>
    {skeletonCells.map(({ column, secondLine, ...cell }, i) => (
      // The row header needs a text value for type-to-select, and there is none yet.
      <Table.Cell key={column} textValue={i === 0 ? '' : undefined}>
        {secondLine ? (
          <Stack space={2}>
            <Skeleton {...cell} />
            <Skeleton {...secondLine} />
          </Stack>
        ) : (
          <Skeleton {...cell} />
        )}
      </Table.Cell>
    ))}
  </Table.Row>
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
    <Table.Cell textValue={venue.name}>
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
      {/* Local midnight, so the shown day never shifts across timezones. */}
      <DateFormat
        value={new Date(`${venue.nextAvailable}T00:00:00`)}
        dateStyle="medium"
      />
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
  const [selected, setSelected] = useState<Selection>(() => new Set());

  // The table announces the load itself (`loading`). This region announces the
  // result. A live region is announced when the text inside an already present
  // node changes. Mounting the container together with its text is a known
  // failure mode, where NVDA and JAWS on Chrome can drop that first
  // announcement. So this region stays mounted across the loading, loaded, and
  // filtered states and only its text content is swapped, never the node itself.
  const status = isLoading
    ? ''
    : `${totalItems} venue${totalItems === 1 ? '' : 's'}`;
  const skeletonIds = isLoading ? skeletonRowIds(pageSize) : [];

  return (
    <div id={VENUES_REGION_ID} className="scroll-mt-4">
      <VisuallyHidden role="status">{status}</VisuallyHidden>
      <Table
        aria-label="Venue list"
        loading={isLoading}
        selectionMode="multiple"
        // Placeholder rows can't be selected, but the checkbox column stays.
        disabledKeys={skeletonIds}
        selectedKeys={selected}
        // "Select all" ignores disabled rows, so drop it while the placeholders show.
        onSelectionChange={keys => {
          if (!isLoading) setSelected(keys);
        }}
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
          <Table.Column id="name" rowHeader allowsSorting width="2fr">
            Name
          </Table.Column>
          <Table.Column id="type" width="1fr">
            Type
          </Table.Column>
          <Table.Column id="address" width="2fr">
            Address
          </Table.Column>
          <Table.Column id="capacity" alignX="right" allowsSorting width="1fr">
            Capacity
          </Table.Column>
          <Table.Column id="price" alignX="right" allowsSorting width="1fr">
            Max. Price
          </Table.Column>
          <Table.Column id="traits" width="1.5fr">
            Traits
          </Table.Column>
          <Table.Column id="amenities" width="1.5fr">
            Amenities
          </Table.Column>
          <Table.Column id="parking" width="1fr">
            Parking
          </Table.Column>
          <Table.Column id="rating" alignX="right" width="1fr">
            Rating
          </Table.Column>
          <Table.Column id="available" width="1fr">
            Available
          </Table.Column>
          <Table.Column id="actions" width="1fr">
            <VisuallyHidden>Actions</VisuallyHidden>
          </Table.Column>
        </Table.Header>
        <Table.Body
          emptyState={() =>
            isFiltered ? <FilterEmptyState /> : <NoDataEmptyState />
          }
        >
          {isLoading
            ? skeletonIds.map(id => <VenueSkeletonRow key={id} id={id} />)
            : items.map(venue => (
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
