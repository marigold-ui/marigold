'use client';

import {
  amenitiesOptions,
  parkingOptions,
  venueTypes,
} from '@/lib/data/venues';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
} from '@marigold/components';
import { Delete, Download, Star } from '@marigold/icons';
import { NumericFormat } from '@marigold/system';
import { VENUES_QUERY_KEY, deleteVenue, fetchVenues } from './api';
import type { Venue } from './types';
import type { VenueFilter, VenueSortDescriptor } from './utils';
import {
  PAGE_SIZE,
  defaultFilter,
  useFilter,
  usePage,
  useSearch,
  useSort,
} from './utils';

// Client-side filter — search and sort are handled server-side
// ---------------
const filterVenues = (venues: Venue[], filter: VenueFilter) =>
  venues.filter(venue => {
    if (filter.type !== undefined && filter.type !== venue.type) return false;
    if (filter.capacity && venue.capacity < filter.capacity) return false;
    if (filter.price && venue.price.to > filter.price) return false;
    if (filter.rating && venue.rating < filter.rating) return false;
    if (filter.traits && filter.traits.length > 0) {
      if (!filter.traits.some(t => venue.traits.includes(t))) return false;
    }
    return true;
  });

// Price sort stays client-side — MockAPI cannot sort nested fields (price.to)
// ---------------
const sortByPrice = (venues: Venue[], sort: VenueSortDescriptor) => {
  const dir = sort.direction === 'ascending' ? 1 : -1;
  return [...venues].sort((a, b) => dir * (a.price.to - b.price.to));
};

// CSV export
// ---------------
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
    `"${v.name.replace(/"/g, '""')}"`,
    venueTypes[v.type] ?? 'Unknown',
    v.city,
    v.country,
    v.capacity,
    v.price.to,
    v.rating,
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'venues.csv';
  link.click();
  URL.revokeObjectURL(link.href);
};

// Empty states
// ---------------
const FilterEmptyState = ({ onClear }: { onClear: () => void }) => (
  <div className="grid min-w-xl place-items-center py-10">
    <Center>
      <Text fontSize="lg" weight="bold">
        No venues match your criteria
      </Text>
      <Text variant="muted">Try adjusting your filters or search terms.</Text>
      <Button variant="ghost" onPress={onClear}>
        Clear all filters
      </Button>
    </Center>
  </div>
);

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

// Active filter check
// ---------------
const hasActiveFilters = (search: string, filter: VenueFilter) => {
  if (search.length > 0) return true;
  return Object.entries(filter).some(([name, value]) => {
    if (name === 'traits') return Array.isArray(value) && value.length > 0;
    return `${value}` !== `${defaultFilter[name as keyof VenueFilter]}`;
  });
};

// Component
// ---------------
export const VenuesTable = () => {
  const [search, setSearch] = useSearch();
  const { filter, setFilter } = useFilter();
  const [sort, setSort] = useSort();
  const [page, setPage] = usePage();

  const queryClient = useQueryClient();

  const currentSort = sort ?? {
    column: 'name',
    direction: 'ascending' as const,
  };
  const serverOrder = currentSort.direction === 'ascending' ? 'asc' : 'desc';

  const {
    data: venues = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      ...VENUES_QUERY_KEY,
      { search, sortBy: currentSort.column, order: serverOrder },
    ],
    queryFn: () =>
      fetchVenues({
        search: search || undefined,
        sortBy: currentSort.column,
        order: serverOrder,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => Promise.all(ids.map(id => deleteVenue(id))),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: VENUES_QUERY_KEY }),
  });

  // Apply client-side filters, then price sort if needed (server already sorted other columns)
  const filtered = filterVenues(venues, filter);
  const display =
    currentSort.column === 'price'
      ? sortByPrice(filtered, currentSort)
      : filtered;

  const totalItems = display.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paged = display.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const clearFilters = () => {
    setSearch('');
    setFilter(defaultFilter);
    setPage(null);
  };

  const isFiltered = hasActiveFilters(search, filter);
  const emptyState: () => ReactNode = isFiltered
    ? () => <FilterEmptyState onClear={clearFilters} />
    : () => <NoDataEmptyState />;

  const getSelectedVenues = (selectedKeys: Selection) =>
    selectedKeys === 'all'
      ? display
      : display.filter(v => (selectedKeys as Set<string>).has(v.id));

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <Text variant="muted">Loading venues…</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10">
        <Center>
          <Text weight="semibold">Failed to load venues</Text>
          <Text variant="muted">{(error as Error).message}</Text>
          <Button onPress={() => refetch()}>Try again</Button>
        </Center>
      </div>
    );
  }

  return (
    <Stack space={4}>
      <Text variant="muted" fontSize="sm">
        {totalItems} venue{totalItems !== 1 ? 's' : ''} found
      </Text>

      <Table
        aria-label="Venue list"
        selectionMode="multiple"
        sortDescriptor={currentSort}
        onSortChange={d =>
          setSort({
            column: String(d.column),
            direction: d.direction,
          })
        }
        actionBar={selectedKeys => (
          <ActionBar>
            <ActionBar.Button
              onPress={() =>
                deleteMutation.mutate(
                  getSelectedVenues(selectedKeys).map(v => v.id)
                )
              }
            >
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
        <Inline alignX="center">
          <Pagination
            key={`${PAGE_SIZE}-${totalPages}`}
            page={safePage}
            totalItems={totalItems}
            pageSize={PAGE_SIZE}
            onChange={setPage}
          />
        </Inline>
      )}
    </Stack>
  );
};
