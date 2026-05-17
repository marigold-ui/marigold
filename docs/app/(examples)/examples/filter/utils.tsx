import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import type { ReactNode } from 'react';
import { NumericFormat } from '@marigold/system';

// These bounds are intentionally hardcoded for the static demo dataset
// (packages/lib/data/venues.ts). They match the actual data range and serve
// as the slider/number-field upper limits. If the dataset ever grows or gets
// replaced by a live API, derive these from the fetched data instead.
export const MAX_CAPACITY = 50_000;
export const MAX_PRICE = 5_000;

const history = { history: 'push' } as const;

// Page hook
// ---------------
export const usePage = () =>
  useQueryState('page', parseAsInteger.withDefault(1).withOptions(history));

// Search hook
// ---------------
export const useSearch = () => {
  const [search, setSearchRaw] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions(history)
  );
  const [, setPage] = usePage();

  const setSearch: typeof setSearchRaw = (...args) => {
    setPage(null);
    return setSearchRaw(...args);
  };

  return [search, setSearch] as const;
};

// Filter hook
// ---------------
const filterParsers = {
  capacity: parseAsInteger,
  price: parseAsInteger,
  traits: parseAsArrayOf(parseAsString).withDefault([]),
  rating: parseAsInteger,
};

export type FilterKeys = keyof typeof filterParsers;
export type VenueFilter = {
  capacity: number | null;
  price: number | null;
  traits: string[];
  rating: number | null;
};

export const useFilter = () => {
  const [filter, setFilterRaw] = useQueryStates(filterParsers, history);
  const [, setPage] = usePage();

  const setFilter: typeof setFilterRaw = (...args) => {
    setPage(null);
    return setFilterRaw(...args);
  };

  const removeFilter = (keys: Set<FilterKeys>) =>
    setFilter(
      Object.fromEntries([...keys].map(k => [k, null])) as {
        [K in FilterKeys]?: null;
      }
    );

  const hasFilter = () =>
    filter.capacity !== null ||
    filter.price !== null ||
    filter.rating !== null ||
    filter.traits.length > 0;

  return { filter, setFilter, removeFilter, hasFilter } as const;
};

// Sort hook
// ---------------
const sortColumns = ['name', 'capacity', 'price'] as const;
const sortDirections = ['ascending', 'descending'] as const;

const sortParsers = {
  column: parseAsStringLiteral(sortColumns).withDefault('name'),
  direction: parseAsStringLiteral(sortDirections).withDefault('ascending'),
};

export type VenueSortDescriptor = {
  column: (typeof sortColumns)[number];
  direction: (typeof sortDirections)[number];
};

export const useSort = () => useQueryStates(sortParsers, history);

// Pagination
// ---------------
export const PAGE_SIZE = 5;

// Applied-filter rendering
// ---------------
const renderCapacity = (value: number) => (
  <>
    Min Capacity: <NumericFormat value={value} />
  </>
);
const renderPrice = (value: number) => (
  <>
    Max. Price:{' '}
    <NumericFormat
      style="currency"
      value={value}
      currency="EUR"
      maximumFractionDigits={0}
    />
  </>
);
const renderTraits = (value: string[]) => (
  <>
    Traits:{' '}
    {value.length <= 3
      ? value.join(', ')
      : `${value.slice(0, 2).join(', ')} (+${value.length - 2} more)`}
  </>
);
const renderRating = (value: number) => <>Min. Rating: {value} ★</>;

export const renderFilterValue = (
  key: FilterKeys,
  filter: VenueFilter
): ReactNode => {
  switch (key) {
    case 'capacity':
      return filter.capacity !== null ? renderCapacity(filter.capacity) : null;
    case 'price':
      return filter.price !== null ? renderPrice(filter.price) : null;
    case 'traits':
      return filter.traits.length > 0 ? renderTraits(filter.traits) : null;
    case 'rating':
      return filter.rating !== null ? renderRating(filter.rating) : null;
  }
};
