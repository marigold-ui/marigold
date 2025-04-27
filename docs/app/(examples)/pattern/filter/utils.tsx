import { venueTypes, venues } from '@/lib/data/venues';
import { parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';
import { NumericFormat } from '@marigold/system';

// URL
// ---------------
const urlSchema = z.object({
  type: z.number().optional(),
  capacity: z.number().optional(),
  price: z.number().optional(),
  rating: z.number().optional(),
});

export type VenueFilter = z.infer<typeof urlSchema>;

export const defaultFilter = {
  type: undefined,
  capacity: Math.max(...venues.map(venue => venue.capacity)),
  price: Math.max(...venues.map(venue => venue.price.to)),
  rating: undefined,
} satisfies VenueFilter;

// Form
// ---------------
const formSchema = z.object({
  type: z.string(),
  capacity: z.string(),
  price: z.string(),
  rating: z.string(),
});

// Transform
// ---------------

// URL -> Form
export const toFormSchema = urlSchema.transform(data => ({
  type: String(data.type ?? ''),
  capacity: data.capacity,
  price: data.price,
  rating: String(data.rating ?? ''),
})).parse;

// Form -> URL
export const toUrlSchema = formSchema.transform(data => ({
  type: data.type ? Number(data.type) : undefined,
  capacity: data.capacity ? Number(data.capacity) : undefined,
  price: data.price ? Number(data.price) : undefined,
  rating: data.rating ? Number(data.rating) : undefined,
})).safeParse;

// Value -> Display Format
export const toDisplayValue = {
  type: (value: number) => `Type: ${venueTypes[value] ?? 'Unknown'}`,
  capacity: (value: number) => (
    <>
      Capacity: <NumericFormat value={value} />
    </>
  ),
  price: (value: number) => (
    <>
      Price:{' '}
      <NumericFormat
        style="currency"
        value={value}
        currency="EUR"
        maximumFractionDigits={0}
      />
    </>
  ),
  rating: (value: number) => (
    <>
      Rating: <NumericFormat value={value} minimumFractionDigits={1} />
    </>
  ),
};

// Hooks
// ---------------
export const useFilter = () =>
  useQueryState(
    'filter',
    parseAsJson(urlSchema.parse)
      .withDefault(defaultFilter)
      .withOptions({ clearOnDefault: true })
  );

export const useSearch = () =>
  useQueryState('q', { defaultValue: '', clearOnDefault: true });
