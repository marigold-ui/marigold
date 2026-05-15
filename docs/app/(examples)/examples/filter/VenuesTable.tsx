'use client';

import {
  amenitiesOptions,
  parkingOptions,
  venueTypes,
  venues,
} from '@/lib/data/venues';
import type { Venue } from '@/lib/data/venues';
import { useRef } from 'react';
import {
  ActionBar,
  Badge,
  Button,
  Center,
  Inline,
  Pagination,
  Stack,
  Table,
  Text,
  VisuallyHidden,
} from '@marigold/components';
import { Download, Star } from '@marigold/icons';
import { NumericFormat } from '@marigold/system';
import { exportVenuesToCsv } from './csv';
import { MAX_PRICE, type VenueFilter, useFilter } from './hooks/useFilter';
import { PAGE_SIZE, usePagination } from './hooks/usePagination';
import { useSearch } from './hooks/useSearch';
import { type VenueSortDescriptor, useSort } from './hooks/useSort';

// Helpers
// ---------------
const matchesSearch = (venue: Venue, search: string) =>
  venue.name.toLowerCase().includes(search.toLowerCase().trim());

const filterVenues = (list: readonly Venue[], filter: VenueFilter) =>
  list.filter(venue => {
    // Each line short-circuits on the field's "no filter" sentinel.
    if (filter.capacity > 0 && venue.capacity < filter.capacity) return false;
    if (filter.price < MAX_PRICE && venue.price.to > filter.price) return false;
    if (filter.rating > 0 && venue.rating < filter.rating) return false;
    if (
      filter.traits.length > 0 &&
      !venue.traits.some(vt => filter.traits.includes(vt))
    ) {
      return false;
    }
    return true;
  });

// `sortVenues` copies its input so callers can pass readonly arrays safely;
// don't spread again at the call site.
const sortVenues = (list: readonly Venue[], sort: VenueSortDescriptor) => {
  const dir = sort.direction === 'ascending' ? 1 : -1;
  return [...list].sort((a, b) => {
    if (sort.column === 'price') return dir * (a.price.to - b.price.to);
    if (sort.column === 'capacity') return dir * (a.capacity - b.capacity);
    return dir * a.name.localeCompare(b.name);
  });
};

const getFromTo = (page: number, total: number) => {
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);
  return { from, to };
};

const FilterEmptyState = () => {
  const [, setSearch] = useSearch();
  const { clearFilter } = useFilter();

  const clearAll = () => {
    setSearch(null);
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

interface VenuesPaginationFooterProps {
  page: number;
  totalItems: number;
  totalPages: number;
  summary: string;
  onChange: (next: number) => void;
}

const VenuesPaginationFooter = ({
  page,
  totalItems,
  totalPages,
  summary,
  onChange,
}: VenuesPaginationFooterProps) => {
  if (totalPages <= 1) return null;
  return (
    <Inline alignX="between" alignY="center">
      <Text variant="muted" fontSize="sm">
        {summary}
      </Text>
      <Pagination
        key={totalPages}
        page={page}
        totalItems={totalItems}
        pageSize={PAGE_SIZE}
        onChange={onChange}
      />
    </Inline>
  );
};

// Component
// ---------------
export const VenuesTable = () => {
  const [search] = useSearch();
  const { filter, hasFilter } = useFilter();
  const [sort, setSort] = useSort();
  const [page, setPage] = usePagination();
  const regionRef = useRef<HTMLDivElement>(null);

  // Dataset is static and small; memoising the three filter/sort passes
  // costs more than re-running them every render.
  const searched = search
    ? venues.filter(v => matchesSearch(v, search))
    : venues;
  const filtered = filterVenues(searched, filter);
  const display = sortVenues(filtered, sort);

  const totalItems = display.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = display.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const onPageChange = (next: number) => {
    setPage(next);
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    regionRef.current?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const isFiltered = search.length > 0 || hasFilter();
  const { from, to } = getFromTo(safePage, totalItems);
  const summary =
    totalItems === 0 ? 'No venues' : `Showing ${from}–${to} of ${totalItems}`;

  return (
    // The single live region lives on the VisuallyHidden status node below.
    // The surrounding Panel (page.tsx) already names this as a "Venues"
    // landmark, so this wrapper stays a plain div.
    <div ref={regionRef}>
      <VisuallyHidden role="status">{summary}</VisuallyHidden>
      <Stack space={4}>
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

        <VenuesPaginationFooter
          page={safePage}
          totalItems={totalItems}
          totalPages={totalPages}
          summary={summary}
          onChange={onPageChange}
        />
      </Stack>
    </div>
  );
};
