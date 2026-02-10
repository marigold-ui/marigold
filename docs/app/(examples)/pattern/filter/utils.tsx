import { venueTraits, venueTypes, venues } from '@/lib/data/venues';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import type { ReactNode } from 'react';
import { NumericFormat } from '@marigold/system';

export type VenueFilter = {
  type: number | null;
  capacity: number;
  price: number;
  traits: string[];
  rating: number | null;
};

export type FilterKey = keyof VenueFilter;

export const defaultFilter = {
  type: null,
  capacity: 0,
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

export const isDefault = (key: FilterKey, value: unknown): boolean => {
  const def = defaultFilter[key];
  if (Array.isArray(value) && Array.isArray(def)) {
    return value.length === def.length;
  }
  return `${value}` === `${def}`;
};

export const toDisplayValue = (
  key: FilterKey,
  filter: VenueFilter
): ReactNode => {
  switch (key) {
    case 'type':
      return `Type: ${venueTypes[filter.type!] ?? 'Unknown'}`;
    case 'capacity':
      return (
        <>
          Capacity larger than: <NumericFormat value={filter.capacity} />
        </>
      );
    case 'price':
      return (
        <>
          Max. Price:{' '}
          <NumericFormat
            style="currency"
            value={filter.price}
            currency="EUR"
            maximumFractionDigits={0}
          />
        </>
      );
    case 'traits':
      return (
        <>
          Traits:{' '}
          {filter.traits.length <= 3
            ? filter.traits.join(', ')
            : `${filter.traits.slice(0, 2).join(', ')} (+${filter.traits.length - 2} more)`}
        </>
      );
    case 'rating':
      return (
        <>
          Min. Rating:{' '}
          <NumericFormat value={filter.rating!} minimumFractionDigits={1} />
        </>
      );
  }
};

export const useFilter = () => {
  const [filter, setFilter] = useQueryStates(filterParsers, {
    history: 'push',
  });

  const removeFilter = (keys: Set<FilterKey>) => {
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
