import { venueTypes } from '@/lib/data/venues';
import { parseAsInteger, parseAsJson, useQueryState } from 'nuqs';
import type { FormEvent, ReactNode } from 'react';
import { z } from 'zod';
import { NumericFormat } from '@marigold/system';

export const MAX_CAPACITY = 50_000;
export const MAX_PRICE = 5_000;

// Form data
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

// URL schema
// ---------------
const urlSchema = z.object({
  type: z.number().optional(),
  capacity: z.number().optional(),
  price: z.number().optional(),
  traits: z.array(z.string()).optional(),
  rating: z.number().optional(),
});

export type VenueFilter = z.infer<typeof urlSchema>;

export const defaultFilter: VenueFilter = {
  type: undefined,
  capacity: undefined,
  price: undefined,
  traits: undefined,
  rating: undefined,
};

// Form schema (type is handled separately in the toolbar, not in the filter drawer)
// ---------------
const formSchema = z.object({
  capacity: z.string(),
  price: z.string(),
  traits: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform(value => {
      if (!value) return [] as string[];
      return Array.isArray(value) ? value : [value];
    }),
  rating: z.string().optional().default(''),
});

// URL -> Form
export const toFormSchema = urlSchema.transform(data => ({
  capacity: data.capacity ?? 0,
  price: data.price ?? MAX_PRICE,
  traits: data.traits ?? [],
  rating: String(data.rating ?? ''),
})).parse;

// Form -> URL (excludes type — preserved separately from toolbar state)
export const toUrlSchema = formSchema.transform(data => ({
  capacity: data.capacity ? Number(data.capacity) : undefined,
  price: Number(data.price) < MAX_PRICE ? Number(data.price) : undefined,
  traits: data.traits.length > 0 ? data.traits : undefined,
  rating: data.rating ? Number(data.rating) : undefined,
})).safeParse;

// Display formatters — per-key dispatch keeps each value's type intact
// ---------------
type FilterKeys = keyof VenueFilter;

const renderType = (value: number) => `Type: ${venueTypes[value] ?? 'Unknown'}`;
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
    case 'type':
      return filter.type !== undefined ? renderType(filter.type) : null;
    case 'capacity':
      return filter.capacity !== undefined
        ? renderCapacity(filter.capacity)
        : null;
    case 'price':
      return filter.price !== undefined ? renderPrice(filter.price) : null;
    case 'traits':
      return filter.traits ? renderTraits(filter.traits) : null;
    case 'rating':
      return filter.rating !== undefined ? renderRating(filter.rating) : null;
  }
};

// Filter hook
// ---------------
export const useFilter = () => {
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsJson(urlSchema.parse)
      .withDefault(defaultFilter)
      .withOptions({ history: 'push' })
  );

  const removeFilter = (keys: Set<FilterKeys>) => {
    const cleared = Object.fromEntries(
      [...keys].map(key => [key, defaultFilter[key]])
    );
    setFilter({ ...filter, ...cleared });
  };

  return { filter, setFilter, removeFilter } as const;
};

export const useSearch = () =>
  useQueryState('q', { defaultValue: '', history: 'push' });

// Sort hook
// ---------------
const sortSchema = z.object({
  column: z.string(),
  direction: z.enum(['ascending', 'descending']),
});

export type VenueSortDescriptor = z.infer<typeof sortSchema>;

export const defaultSort: VenueSortDescriptor = {
  column: 'name',
  direction: 'ascending',
};

export const useSort = () =>
  useQueryState(
    'sort',
    parseAsJson(sortSchema.parse)
      .withDefault(defaultSort)
      .withOptions({ history: 'push' })
  );

// Pagination hook
// ---------------
export const PAGE_SIZE = 5;

export const usePage = () =>
  useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ history: 'push' })
  );
