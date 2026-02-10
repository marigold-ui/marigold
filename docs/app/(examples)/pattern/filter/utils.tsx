import { venueTraits, venueTypes, venues } from '@/lib/data/venues';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import type { FormEvent } from 'react';
import { z } from 'zod';
import { NumericFormat } from '@marigold/system';

// Handling form data
// ---------------
export const getFormData = (e: FormEvent<HTMLFormElement>) => {
  const data = new FormData(e.currentTarget);
  const result: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};

  for (const [key, value] of data.entries()) {
    if (result[key]) {
      result[key] = Array.isArray(result[key])
        ? [...(result[key] as FormDataEntryValue[]), value]
        : [result[key] as FormDataEntryValue, value];
    } else {
      result[key] = value;
    }
  }

  return result;
};

// URL
// ---------------
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

// Form
// ---------------
// TODO: is this correct? are there no numbers???
const formSchema = z.object({
  type: z.string(),
  capacity: z.string(),
  price: z.string(),
  traits: z
    .union([z.string(), z.array(z.string())])
    .transform(value => (Array.isArray(value) ? value : [value])),
  rating: z.string(),
});

// Transform
// ---------------

// URL -> Form
export const toFormSchema = (data: VenueFilter) => ({
  type: String(data.type ?? ''),
  capacity: data.capacity,
  price: data.price,
  traits: data.traits,
  rating: String(data.rating ?? ''),
});

// Form -> URL
export const toUrlSchema = formSchema.transform(data => ({
  type: data.type ? Number(data.type) : null,
  capacity: data.capacity ? Number(data.capacity) : null,
  price: data.price ? Number(data.price) : null,
  traits: data.traits.length > 0 ? data.traits : null,
  rating: data.rating ? Number(data.rating) : null,
})).safeParse;

// Value -> Display Format
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

// Hooks
// ---------------
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
