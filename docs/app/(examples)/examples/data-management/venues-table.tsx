'use client';

import { venueTypes, venues } from '@/lib/data/venues';
import type { ReactNode } from 'react';
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
} from '@marigold/components';
import { Delete, Star } from '@marigold/icons';
import { NumericFormat } from '@marigold/system';
import type { VenueFilter, VenueSortDescriptor } from './utils';
import {
  PAGE_SIZE,
  defaultFilter,
  useFilter,
  usePage,
  useSearch,
  useSort,
} from './utils';

// Empty states
// ---------------
const FilterEmptyState = ({ onClear }: { onClear: () => void }) => (
  <div className="grid min-w-xl place-items-center gap-3 py-10">
    <svg
      className="h-32"
      viewBox="45 50 180 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M207 65C210.866 65 214 68.134 214 72C214 75.866 210.866 79 207 79H167C170.866 79 174 82.134 174 86C174 89.866 170.866 93 167 93H189C192.866 93 196 96.134 196 100C196 103.866 192.866 107 189 107H178.826C173.952 107 170 110.134 170 114C170 116.577 172 118.911 176 121C179.866 121 183 124.134 183 128C183 131.866 179.866 135 176 135H93C89.134 135 86 131.866 86 128C86 124.134 89.134 121 93 121H54C50.134 121 47 117.866 47 114C47 110.134 50.134 107 54 107H94C97.866 107 101 103.866 101 100C101 96.134 97.866 93 94 93H69C65.134 93 62 89.866 62 86C62 82.134 65.134 79 69 79H109C105.134 79 102 75.866 102 72C102 68.134 105.134 65 109 65H207Z"
        className="fill-orange-50"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M153.672 64L162.974 131.843L163.809 138.649C164.079 140.842 162.519 142.837 160.327 143.107L101.767 150.297C99.5739 150.566 97.5781 149.007 97.3089 146.814L88.2931 73.3868C88.1585 72.2904 88.9381 71.2925 90.0345 71.1579L94.9136 70.6105"
        className="fill-white"
      />
      <path
        d="M110.672 51.25H156.229C156.866 51.25 157.481 51.4715 157.971 51.8721L158.173 52.0547L171.616 65.4902C172.132 66.0059 172.422 66.7053 172.422 67.4346V130C172.422 131.519 171.191 132.75 169.672 132.75H110.672C109.153 132.75 107.922 131.519 107.922 130V54C107.922 52.4812 109.153 51.25 110.672 51.25Z"
        className="fill-white stroke-stone-700"
        strokeWidth="2.5"
      />
      <path
        d="M118 118H144M118 67H144H118ZM118 79H161H118ZM118 92H161H118ZM118 105H161H118Z"
        className="stroke-orange-200"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <Center>
      <Text size="lg" weight="bold">
        No venues match your criteria
      </Text>
      <Text color="stone-500">
        Try adjusting your filters or search to find the right venue.
      </Text>
      <Button variant="ghost" onPress={onClear}>
        Clear all filters
      </Button>
    </Center>
  </div>
);

const NoDataEmptyState = () => (
  <div className="grid min-w-xl place-items-center gap-3 py-10">
    <Center>
      <Text size="lg" weight="bold">
        No venues available
      </Text>
      <Text color="stone-500">Add a venue to get started.</Text>
    </Center>
  </div>
);

// Helpers
// ---------------
const hasActiveFilters = (search: string, filter: VenueFilter) => {
  if (search.length > 0) return true;
  return Object.keys(filter).some(key => {
    const k = key as keyof VenueFilter;
    const value = filter[k];
    const def = defaultFilter[k];
    if (Array.isArray(value) && Array.isArray(def))
      return value.length !== def.length;
    return `${value}` !== `${def}`;
  });
};

const filterVenues = (search: string, filter: VenueFilter) =>
  venues.filter(venue => {
    if (search && !venue.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (filter.type !== undefined && filter.type !== venue.type) return false;
    if (filter.capacity && filter.capacity < venue.capacity) return false;
    if (filter.price && filter.price < venue.price.to) return false;
    if (filter.rating && filter.rating > venue.rating) return false;
    if (
      Array.isArray(filter.traits) &&
      !filter.traits.some(trait =>
        (venue.traits as unknown as string[]).includes(trait)
      )
    )
      return false;
    return true;
  });

const sortVenues = <T extends (typeof venues)[number]>(
  list: T[],
  sort: VenueSortDescriptor
): T[] => {
  const dir = sort.direction === 'ascending' ? 1 : -1;
  return [...list].sort((a, b) => {
    switch (sort.column) {
      case 'name':
        return dir * a.name.localeCompare(b.name);
      case 'capacity':
        return dir * (a.capacity - b.capacity);
      case 'price':
        return dir * (a.price.to - b.price.to);
      case 'rating':
        return dir * (a.rating - b.rating);
      default:
        return 0;
    }
  });
};

// Component
// ---------------
export const VenuesTable = () => {
  const [search, setSearch] = useSearch();
  const { filter, setFilter } = useFilter();
  const [sort, setSort] = useSort();
  const [page, setPage] = usePage();

  const filtered = filterVenues(search, filter);
  const sorted = sortVenues(
    filtered,
    sort ?? { column: 'name', direction: 'ascending' }
  );
  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paged = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const clearFilters = () => {
    setSearch('');
    setFilter(defaultFilter);
    setPage(null);
  };

  const isFiltered = hasActiveFilters(search, filter);

  const emptyState: () => ReactNode = isFiltered
    ? () => <FilterEmptyState onClear={clearFilters} />
    : () => <NoDataEmptyState />;

  return (
    <Stack space={4}>
      <Text variant="muted" fontSize="sm">
        {totalItems} venue{totalItems !== 1 ? 's' : ''} found
      </Text>

      <Table
        aria-label="Venue list"
        selectionMode="multiple"
        sortDescriptor={sort ?? { column: 'name', direction: 'ascending' }}
        onSortChange={descriptor =>
          setSort({
            column: String(descriptor.column),
            direction: descriptor.direction,
          })
        }
        actionBar={selectedKeys => (
          <ActionBar>
            <ActionBar.Content>
              {selectedKeys === 'all'
                ? 'All venues selected'
                : `${(selectedKeys as Set<string>).size} venue${(selectedKeys as Set<string>).size !== 1 ? 's' : ''} selected`}
            </ActionBar.Content>
            <ActionBar.Actions>
              <Button variant="destructive">
                <Delete /> Delete
              </Button>
            </ActionBar.Actions>
          </ActionBar>
        )}
      >
        <Table.Header>
          <Table.Column id="name" rowHeader allowsSorting>
            Name
          </Table.Column>
          <Table.Column>Type</Table.Column>
          <Table.Column>City</Table.Column>
          <Table.Column id="capacity" alignX="right" allowsSorting>
            Capacity
          </Table.Column>
          <Table.Column id="price" alignX="right" allowsSorting>
            Max. Price
          </Table.Column>
          <Table.Column>Traits</Table.Column>
          <Table.Column id="rating" alignX="right" allowsSorting>
            Rating
          </Table.Column>
        </Table.Header>
        <Table.Body emptyState={emptyState}>
          {paged.map(venue => (
            <Table.Row key={venue.id} id={venue.id}>
              <Table.Cell>
                <Text weight="medium">{venue.name}</Text>
              </Table.Cell>
              <Table.Cell>{venueTypes[venue.type]}</Table.Cell>
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
                <Inline space="0.5" alignY="center">
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
        <Inline alignX="right">
          <Pagination
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
