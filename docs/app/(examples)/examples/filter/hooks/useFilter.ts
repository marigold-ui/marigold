import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';
import { usePagination } from './usePagination';

// Bounds for the static demo dataset (lib/data/venues.ts). They match the
// actual data range and serve as the slider/number-field upper limits. If
// the dataset ever grows or gets replaced by a live API, derive these from
// the fetched data instead.
export const MAX_CAPACITY = 50_000;
export const MAX_PRICE = 5_000;

// Defaults
// ---------------
// Concrete values double as "no filter" sentinels: 0 for capacity/rating,
// MAX_PRICE for price, [] for traits. The form's `defaultValue` reads from
// these so the uncontrolled form round-trips back to a cleared filter, and
// removeFilter just resets keys to their default.
export const defaultFilter = {
  capacity: 0,
  price: MAX_PRICE,
  traits: [] as string[],
  rating: 0,
};

// Types
// ---------------
export type FilterKeys = keyof typeof defaultFilter;
export type VenueFilter = typeof defaultFilter;

// Shape produced by parseFormData on the FilterForm in Toolbar.tsx.
export type FilterFormData = {
  capacity?: string;
  price?: string;
  traits?: string | string[];
  rating?: string;
};

// Helpers
// ---------------
const filterKeys = Object.keys(defaultFilter) as FilterKeys[];

// Stringify comparison works for primitives and joined arrays alike.
const isActive = (filter: VenueFilter, key: FilterKeys) =>
  `${filter[key]}` !== `${defaultFilter[key]}`;

const toPositiveNumber = (value: string | undefined, fallback: number) => {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const toArray = (value: string | string[] | undefined): string[] => {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
};

// Hook
// ---------------
export const useFilter = () => {
  const [, setPagination] = usePagination();
  const [filter, _setFilter] = useQueryStates(
    {
      capacity: parseAsInteger.withDefault(defaultFilter.capacity),
      price: parseAsInteger.withDefault(defaultFilter.price),
      traits: parseAsArrayOf(parseAsString).withDefault(defaultFilter.traits),
      rating: parseAsInteger.withDefault(defaultFilter.rating),
    },
    { history: 'push' }
  );

  const setFilter = (next: Partial<VenueFilter>) => {
    setPagination({ page: null });
    return _setFilter(next);
  };

  // Coerces raw form data and folds in the slider's "max value = no filter"
  // rule, so callers don't need to repeat either.
  const setFilterFromForm = (data: FilterFormData) => {
    const price = toPositiveNumber(data.price, defaultFilter.price);
    return setFilter({
      capacity: toPositiveNumber(data.capacity, defaultFilter.capacity),
      price: price >= MAX_PRICE ? defaultFilter.price : price,
      traits: toArray(data.traits),
      rating: toPositiveNumber(data.rating, defaultFilter.rating),
    });
  };

  const removeFilter = (keys: Set<FilterKeys>) =>
    setFilter(
      Object.fromEntries(
        [...keys].map(key => [key, defaultFilter[key]])
      ) as Partial<VenueFilter>
    );

  const clearFilter = () => removeFilter(new Set(filterKeys));

  const hasFilter = () => filterKeys.some(k => isActive(filter, k));

  const activeFilterKeys = () => filterKeys.filter(k => isActive(filter, k));

  return {
    filter,
    setFilter,
    setFilterFromForm,
    removeFilter,
    clearFilter,
    hasFilter,
    activeFilterKeys,
  } as const;
};
