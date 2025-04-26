import { parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';

const urlSchema = z
  .object({
    type: z.number(),
    capacity: z.number(),
    price: z.tuple([z.number(), z.number()]),
    rating: z.number(),
  })
  .partial();

export type VenueFilter = z.infer<typeof urlSchema>;

export const defaultFilter: VenueFilter = {
  type: undefined,
  capacity: 1000,
  price: [0, 25000],
  rating: undefined,
};

const formSchema = z.object({
  type: z.string(),
  capacity: z.string(),
  minPrice: z.string(),
  maxPrice: z.string(),
  rating: z.string(),
});

// Parse to schema from form
export const toUrlSchema = formSchema.transform(data => ({
  type: data.type !== '' ? Number(data.type) : undefined,
  capacity: data.capacity ? Number(data.capacity) : undefined,
  price: [Number(data.minPrice), Number(data.maxPrice)] as [number, number],
  rating: data.rating ? Number(data.rating) : undefined,
})).safeParse;

export const useFilter = () =>
  useQueryState(
    'filter',
    parseAsJson(urlSchema.parse)
      .withDefault(defaultFilter)
      .withOptions({ clearOnDefault: true })
  );

export const useSearch = () =>
  useQueryState('q', { defaultValue: '', clearOnDefault: true });
