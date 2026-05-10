'use client';

import {
  amenitiesOptions,
  parkingOptions,
  venueTypes,
  venues,
} from '@/lib/data/venues';
import type { Venue } from '@/lib/data/venues';
import { useCallback, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  ActionBar,
  Badge,
  Button,
  Center,
  Inline,
  Pagination,
  Selection,
  Stack,
  Table,
  Text,
  VisuallyHidden,
} from '@marigold/components';
import { Delete, Download, Star } from '@marigold/icons';
import { NumericFormat } from '@marigold/system';
import type { VenueFilter, VenueSortDescriptor } from './utils';
import { PAGE_SIZE, useFilter, usePage, useSearch, useSort } from './utils';

// Search
// ---------------
const matchesSearch = (venue: Venue, search: string) =>
  venue.name.toLowerCase().includes(search.toLowerCase().trim());

// Filter
// ---------------
const filterVenues = (list: readonly Venue[], filter: VenueFilter) =>
  list.filter(venue => {
    if (filter.capacity && venue.capacity < filter.capacity) return false;
    if (filter.price && venue.price.to > filter.price) return false;
    if (filter.rating && venue.rating < filter.rating) return false;
    if (filter.traits.length > 0) {
      if (
        !filter.traits.some(t =>
          (venue.traits as readonly string[]).includes(t)
        )
      ) {
        return false;
      }
    }
    return true;
  });

// Sort
// ---------------
const sortVenues = (list: Venue[], sort: VenueSortDescriptor) => {
  const dir = sort.direction === 'ascending' ? 1 : -1;
  return [...list].sort((a, b) => {
    if (sort.column === 'price') return dir * (a.price.to - b.price.to);
    if (sort.column === 'capacity') return dir * (a.capacity - b.capacity);
    return dir * a.name.localeCompare(b.name);
  });
};

// CSV export
// ---------------
const escapeCsv = (value: unknown) => {
  const str = String(value ?? '');
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

const exportToCsv = (selected: Venue[]) => {
  const headers = [
    'Name',
    'Type',
    'City',
    'Country',
    'Capacity',
    'Max Price (EUR)',
    'Rating',
  ];
  const rows = selected.map(v => [
    v.name,
    venueTypes[v.type] ?? 'Unknown',
    v.city,
    v.country,
    v.capacity,
    v.price.to,
    v.rating,
  ]);
  const csv = [
    headers.join(','),
    ...rows.map(r => r.map(escapeCsv).join(',')),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'venues.csv';
  link.click();
  URL.revokeObjectURL(link.href);
};

// Empty states
// ---------------
const FilterEmptyState = () => {
  const [, setSearch] = useSearch();
  const { removeFilter } = useFilter();

  const clearAll = () => {
    setSearch(null);
    removeFilter(new Set(['capacity', 'price', 'traits', 'rating'] as const));
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

// Component
// ---------------
export const VenuesTable = () => {
  const [search] = useSearch();
  const { filter, hasFilter } = useFilter();
  const [sort, setSort] = useSort();
  const [page, setPage] = usePage();
  const regionRef = useRef<HTMLDivElement>(null);

  const searched = useMemo(
    () => (search ? venues.filter(v => matchesSearch(v, search)) : venues),
    [search]
  );
  const filtered = useMemo(
    () => filterVenues(searched, filter),
    [searched, filter]
  );
  const display = useMemo(
    () => sortVenues([...filtered], sort),
    [filtered, sort]
  );

  const totalItems = display.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = useMemo(
    () => display.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [display, safePage]
  );

  const onPageChange = (next: number) => {
    setPage(next);
    regionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isFiltered = search.length > 0 || hasFilter();
  const emptyState: () => ReactNode = isFiltered
    ? () => <FilterEmptyState />
    : () => <NoDataEmptyState />;

  const getSelectedVenues = useCallback(
    (selectedKeys: Selection) =>
      selectedKeys === 'all'
        ? display
        : display.filter(v => (selectedKeys as Set<string>).has(v.id)),
    [display]
  );

  const from = totalItems === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, totalItems);
  const summary =
    totalItems === 0 ? 'No venues' : `Showing ${from}–${to} of ${totalItems}`;

  return (
    <div ref={regionRef} role="region" aria-label="Venues" aria-live="polite">
      <VisuallyHidden role="status">{summary}</VisuallyHidden>
      <Stack space={4}>
        <Table
          aria-label="Venue list"
          selectionMode="multiple"
          sortDescriptor={sort}
          onSortChange={d =>
            setSort({
              column: d.column as VenueSortDescriptor['column'],
              direction: d.direction,
            })
          }
          actionBar={selectedKeys => (
            <ActionBar>
              {/* Will be wired up in DST-1288 */}
              <ActionBar.Button onPress={() => alert('Delete element')}>
                <Delete /> Delete
              </ActionBar.Button>
              <ActionBar.Button
                onPress={() => exportToCsv(getSelectedVenues(selectedKeys))}
              >
                <Download /> Export CSV
              </ActionBar.Button>
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
          </Table.Header>
          <Table.Body emptyState={emptyState}>
            {paged.map(venue => (
              <Table.Row key={venue.id} id={venue.id}>
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
                    <NumericFormat
                      value={venue.rating}
                      minimumFractionDigits={1}
                    />{' '}
                    <Star className="self-center" size={14} />
                  </Inline>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {totalPages > 1 && (
          <Inline alignX="between" alignY="center">
            <Text variant="muted" fontSize="sm">
              {summary}
            </Text>
            <Pagination
              key={totalPages}
              page={safePage}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              onChange={onPageChange}
            />
          </Inline>
        )}
      </Stack>
    </div>
  );
};
