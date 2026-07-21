import { MAX_CAPACITY, MAX_PRICE } from '@/lib/data/venues';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';
import { usePagination } from './usePagination';

// Dataset bounds live in the data module so the server-side query logic can
// share them; re-exported here because the filter components import them from
// this hook.
export { MAX_CAPACITY, MAX_PRICE };

// Concrete values double as "no filter" sentinels: 0 for capacity/rating,
// MAX_PRICE for price, [] for traits. The uncontrolled form's `defaultValue`
// reads from these, and removeFilter just resets keys back to them.
export const defaultFilter = {
  capacity: 0,
  price: MAX_PRICE,
  traits: [] as string[],
  rating: 0,
};

export type FilterKeys = keyof typeof defaultFilter;
export type VenueFilter = typeof defaultFilter;

// Shape produced by parseFormData on the FilterForm in Toolbar.tsx.
export type FilterFormData = {
  capacity?: string;
  price?: string;
  traits?: string | string[];
  rating?: string;
};

const filterKeys = Object.keys(defaultFilter) as FilterKeys[];

// Stringify comparison handles primitives and arrays alike.
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
