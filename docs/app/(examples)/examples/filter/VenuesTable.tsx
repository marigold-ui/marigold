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
import { Download, Star } from '@marigold/icons';
import { NumericFormat } from '@marigold/system';
import { exportVenuesToCsv } from './csv';
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

const VenueRow = ({ venue }: { venue: Venue }) => (
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
      <Inline space="0.5">
        {venue.traits.map(trait => (
          <Badge key={trait}>{trait}</Badge>
        ))}
      </Inline>
    </Table.Cell>
    <Table.Cell>
      <Inline space="0.5">
        {venue.amenities.map((a, i) => (
          <Badge key={`${a}-${i}`}>{amenitiesOptions[a]}</Badge>
        ))}
      </Inline>
    </Table.Cell>
    <Table.Cell>
      <Inline space="0.5">
        {venue.parking.map((p, i) => (
          <Badge key={`${p}-${i}`}>{parkingOptions[p]}</Badge>
        ))}
      </Inline>
    </Table.Cell>
    <Table.Cell>
      <Inline space="0.5" alignX="right">
        <NumericFormat value={venue.rating} minimumFractionDigits={1} />{' '}
        <Star className="self-center" size={14} />
      </Inline>
    </Table.Cell>
  </Table.Row>
);

// The Panel (page.tsx) is the "Venues" landmark; this wrapper carries the
// region id so VenuesPagination can scroll back to it on page change, plus
// the single live region (role="status" implies aria-live="polite").
export const VenuesTable = () => {
  const { paged, display, totalItems, isFiltered } = useVenues();
  const [sort, setSort] = useSort();

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
        actionBar={selectedKeys => {
          const selected =
            selectedKeys === 'all'
              ? display
              : display.filter(v => selectedKeys.has(v.id));
          return (
            <ActionBar>
              <ActionBar.Button onPress={() => exportVenuesToCsv(selected)}>
                <Download /> Export CSV
              </ActionBar.Button>
            </ActionBar>
          );
        }}
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
        </Table.Header>
        <Table.Body
          emptyState={() =>
            isFiltered ? <FilterEmptyState /> : <NoDataEmptyState />
          }
        >
          {paged.map(venue => (
            <VenueRow key={venue.id} venue={venue} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
