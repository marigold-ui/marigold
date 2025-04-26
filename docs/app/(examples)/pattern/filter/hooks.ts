import { venueTypes } from '@/lib/data/venues';
import { parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';

// Schema how the filter form is submitted
const formFilterSchema = z.object({
  type: z.string(),
  capacity: z.string(),
  minPrice: z.string(),
  maxPrice: z.string(),
  rating: z.string(),
});

// Schema how the filter is stored in the URL and can be used by nuqs
export const filterSchema = formFilterSchema.transform(data => ({
  type: data.type !== '' ? Number(data.type) : undefined,
  capacity: data.capacity ? Number(data.capacity) : undefined,
  price: [Number(data.minPrice), Number(data.maxPrice)] as [number, number],
  rating: data.rating ? Number(data.rating) : undefined,
}));

export type VenueFilter = z.infer<typeof filterSchema>;

export const useFilter = () =>
  useQueryState('filter', parseAsJson(filterSchema.parse));

export const useSearch = () => useQueryState('q');
