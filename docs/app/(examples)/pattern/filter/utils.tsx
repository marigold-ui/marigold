import { venueTraits, venueTypes, venues } from '@/lib/data/venues';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import { NumericFormat } from '@marigold/system';

export type VenueFilter = {
  type: number | null;
  capacity: number;
  price: number;
  traits: string[];
  rating: number | null;
};

export const defaultFilter = {
  type: null,
  capacity: Math.max(...venues.map(venue => venue.capacity)),
  price: Math.max(...venues.map(venue => venue.price.to)),
  traits: venueTraits,
  rating: null,
} satisfies VenueFilter;

const filterParsers = {
  type: parseAsInteger,
  capacity: parseAsInteger.withDefault(defaultFilter.capacity),
  price: parseAsInteger.withDefault(defaultFilter.price),
  traits: parseAsArrayOf(parseAsString).withDefault([...defaultFilter.traits]),
  rating: parseAsInteger,
};

export const toDisplayValue = {
  type: (value: number) => `Type: ${venueTypes[value] ?? 'Unknown'}`,
  capacity: (value: number) => (
    <>
      Min Capacity: <NumericFormat value={value} />
    </>
  ),
  price: (value: number) => (
    <>
      Max. Price:{' '}
      <NumericFormat
        style="currency"
        value={value}
        currency="EUR"
        maximumFractionDigits={0}
      />
    </>
  ),
  traits: (value: string[]) => (
    <>
      Traits:{' '}
      {value.length <= 3
        ? value.join(', ')
        : `${value.slice(0, 2).join(', ')} (+${value.length - 2} more)`}
    </>
  ),
  rating: (value: number) => (
    <>
      Min. Rating: <NumericFormat value={value} minimumFractionDigits={1} />
    </>
  ),
};

type FilterKeys = keyof typeof defaultFilter;

export const useFilter = () => {
  const [filter, setFilter] = useQueryStates(filterParsers, {
    history: 'push',
  });

  const removeFilter = (keys: Set<FilterKeys>) => {
    const next: Record<string, null> = {};
    keys.forEach(key => {
      next[key] = null;
    });
    setFilter(next);
  };

  return { filter, setFilter, removeFilter } as const;
};

export const useSearch = () =>
  useQueryState('q', { defaultValue: '', history: 'push' });
