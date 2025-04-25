import { venueTypes } from '@/lib/data/venues';
import { parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';

const schema = z.object({
  type: z.enum(venueTypes),
  capacity: z.number(),
  price: z.tuple([z.number(), z.number()]),
  rating: z.number(),
});

export const useFilters = () =>
  useQueryState('filter', parseAsJson(schema.parse));

export const useSearch = () => useQueryState('q');
