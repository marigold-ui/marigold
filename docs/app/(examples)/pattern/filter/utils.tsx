import { venueTraits, venueTypes, venues } from '@/lib/data/venues';
import { parseAsJson, useQueryState } from 'nuqs';
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
const urlSchema = z.object({
  type: z.number().optional(),
  capacity: z.number().optional(),
  price: z.number().optional(),
  traits: z.array(z.string()).optional(),
  rating: z.number().optional(),
});

export type VenueFilter = z.infer<typeof urlSchema>;

export const defaultFilter = {
  type: undefined,
  capacity: Math.max(...venues.map(venue => venue.capacity)),
  price: Math.max(...venues.map(venue => venue.price.to)),
  traits: venueTraits,
  rating: undefined,
} satisfies VenueFilter;

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
export const toFormSchema = urlSchema.transform(data => ({
  type: String(data.type ?? ''),
  capacity: data.capacity ?? defaultFilter.capacity,
  price: data.price ?? defaultFilter.price,
  traits: data.traits ?? defaultFilter.traits,
  rating: String(data.rating ?? ''),
})).parse;

// Form -> URL
export const toUrlSchema = formSchema.transform(data => ({
  type: data.type ? Number(data.type) : undefined,
  capacity: data.capacity ? Number(data.capacity) : undefined,
  price: data.price ? Number(data.price) : undefined,
  traits: data.traits.length > 0 ? data.traits : undefined,
  rating: data.rating ? Number(data.rating) : undefined,
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
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsJson(urlSchema.parse).withDefault(defaultFilter).withOptions({
      history: 'push',
    })
  );

  const removeFilter = (keys: Set<FilterKeys>) => {
    const next = { ...filter };
    keys.forEach(key => {
      next[key] = defaultFilter[key] as any;
    });
    setFilter(next);
  };

  return { filter, setFilter, removeFilter } as const;
};

export const useSearch = () =>
  useQueryState('q', { defaultValue: '', history: 'push' });
