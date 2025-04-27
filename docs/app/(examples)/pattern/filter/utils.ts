import { parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';

// URL
// ---------------
const urlSchema = z.object({
  type: z.number().optional(),
  capacity: z.number().optional(),
  price: z.tuple([z.number(), z.number()]).optional(),
  rating: z.number().optional(),
});

export type VenueFilter = z.infer<typeof urlSchema>;

export const defaultFilter = {
  type: undefined,
  capacity: 1000,
  price: [0, 25000],
  rating: undefined,
} satisfies VenueFilter;

// Form
// ---------------
const formSchema = z.object({
  type: z.string(),
  capacity: z.string(),
  minPrice: z.string(),
  maxPrice: z.string(),
  rating: z.string(),
});

// Transform
// ---------------

// URL -> Form
export const toFormSchema = urlSchema.transform(data => ({
  type: String(data.type ?? ''),
  capacity: data.capacity,
  price: [
    data.price?.[0] ?? defaultFilter.price[0],
    data.price?.[1] ?? defaultFilter.price[1],
  ],
  rating: String(data.rating ?? ''),
})).parse;

// Copilot
// export const toFormSchema = urlSchema.transform(data => ({
//   type: data.type !== undefined ? String(data.type) : '',
//   capacity: data.capacity ? String(data.capacity) : '',
//   minPrice: data.price && data.price[0] !== undefined ? String(data.price[0]) : '',
//   maxPrice: data.price && data.price[1] !== undefined ? String(data.price[1]) : '',
//   rating: data.rating ? String(data.rating) : '',
// })).safeParse;

// Form -> URL
export const toUrlSchema = formSchema.transform(data => ({
  type: data.type ? Number(data.type) : undefined,
  capacity: data.capacity ? Number(data.capacity) : undefined,
  price: [Number(data.minPrice ?? 0), Number(data.maxPrice ?? 0)] as [
    number,
    number,
  ],
  rating: data.rating ? Number(data.rating) : undefined,
})).safeParse;

// Prev
// export const toUrlSchema = formSchema.transform(data => ({
//   type: data.type !== '' ? Number(data.type) : undefined,
//   capacity: data.capacity ? Number(data.capacity) : undefined,
//   price: [Number(data.minPrice), Number(data.maxPrice)] as [number, number],
//   rating: data.rating ? Number(data.rating) : undefined,
// })).safeParse;

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
