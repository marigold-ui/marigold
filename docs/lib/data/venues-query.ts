import {
  MAX_PRICE,
  type Venue,
  amenitiesOptions,
  parkingOptions,
  seatingTypeOptions,
  venueTypes,
  venues,
} from './venues';

// Shared, server-importable query logic for the venues dataset.
//
// This module is the single source of truth for how venues are searched,
// filtered, sorted and paginated. It is imported by the stateless route
// handler (app/api/venues) AND used as the contract the client mirrors in its
// query keys. Keeping it pure (no React, no I/O) means the same code can run on
// the server and be unit-tested in isolation.

export type VenueSortColumn = 'name' | 'capacity' | 'price';
export type VenueSortDirection = 'ascending' | 'descending';

export interface VenueQueryParams {
  /** Free-text search, matched against the venue name. */
  q?: string;
  /** Minimum capacity. `0` (the default) means "no capacity filter". */
  capacity?: number;
  /** Maximum price. `MAX_PRICE` (the default) means "no price filter". */
  price?: number;
  /** Minimum rating. `0` (the default) means "no rating filter". */
  rating?: number;
  /** Venue must carry at least one of these traits. `[]` means "no filter". */
  traits?: string[];
  /** Venue must be in one of these cities. `[]` means "no filter". */
  city?: string[];
  /**
   * `[start, end]` ISO dates; the venue's next available date must fall
   * within the range. `[]` (or anything but a pair) means "no filter".
   */
  available?: string[];
  /** Venue type indexes (into `venueTypes`). `[]` means "no filter". */
  types?: number[];
  /** Venue must offer ALL of these amenity indexes. `[]` means "no filter". */
  amenities?: number[];
  /** Venue must offer at least one of these parking indexes. */
  parking?: number[];
  /** Venue must offer at least one of these seating type indexes. */
  seating?: number[];
  column?: VenueSortColumn;
  direction?: VenueSortDirection;
  /** 1-based page. */
  page?: number;
  /** Page size, or `'all'` to skip pagination (used by the CSV export). */
  pageSize?: number | 'all';
  /**
   * Venue ids to remove before anything else runs. The client owns this set
   * (see useDeletedVenues) so deletions stay per-visitor and the server keeps
   * no state of its own.
   */
  exclude?: string[];
}

export interface VenueQueryResult {
  items: Venue[];
  totalItems: number;
  totalPages: number;
  safePage: number;
  pageSize: number;
}

const compareVenues = (
  a: Venue,
  b: Venue,
  column: VenueSortColumn,
  direction: VenueSortDirection
) => {
  const dir = direction === 'ascending' ? 1 : -1;
  if (column === 'price') return dir * (a.price.to - b.price.to);
  if (column === 'capacity') return dir * (a.capacity - b.capacity);
  return dir * a.name.localeCompare(b.name);
};

const DEFAULT_PAGE_SIZE = 5;

// Widen the per-venue literal array types so `.includes` accepts any number.
const hasAny = (offered: readonly number[], wanted: number[]) =>
  wanted.some(value => offered.includes(value));
const hasAll = (offered: readonly number[], wanted: number[]) =>
  wanted.every(value => offered.includes(value));
const has = (offered: readonly number[], value: number) =>
  offered.includes(value);

/** Dimension whose own selection is ignored while counting its options. */
type FacetDimension = 'types' | 'parking' | 'seating' | 'rating';

const buildVenuePredicate = (
  params: VenueQueryParams,
  skip?: FacetDimension
) => {
  const {
    q = '',
    capacity = 0,
    price = MAX_PRICE,
    rating = 0,
    traits = [],
    city = [],
    available = [],
    types = [],
    amenities = [],
    parking = [],
    seating = [],
    exclude = [],
  } = params;

  const excluded = new Set(exclude);
  const search = q.trim().toLowerCase();

  // Each line short-circuits on the field's "no filter" default value.
  return (venue: Venue) => {
    if (excluded.has(venue.id)) return false;
    if (search && !venue.name.toLowerCase().includes(search)) return false;
    if (capacity > 0 && venue.capacity < capacity) return false;
    if (price < MAX_PRICE && venue.price.to > price) return false;
    if (skip !== 'rating' && rating > 0 && venue.rating < rating) return false;
    if (traits.length > 0 && !venue.traits.some(t => traits.includes(t))) {
      return false;
    }
    if (city.length > 0 && !city.includes(venue.city)) return false;
    // ISO dates compare correctly as strings.
    if (
      available.length === 2 &&
      (venue.nextAvailable < available[0] || venue.nextAvailable > available[1])
    ) {
      return false;
    }
    if (skip !== 'types' && types.length > 0 && !types.includes(venue.type)) {
      return false;
    }
    // Amenities are requirements, so a venue must offer all of them. The
    // other multi-selects widen the result instead (match any).
    if (amenities.length > 0 && !hasAll(venue.amenities, amenities)) {
      return false;
    }
    if (
      skip !== 'parking' &&
      parking.length > 0 &&
      !hasAny(venue.parking, parking)
    ) {
      return false;
    }
    if (
      skip !== 'seating' &&
      seating.length > 0 &&
      !hasAny(venue.seatingTypes, seating)
    ) {
      return false;
    }
    return true;
  };
};

/**
 * Pure search → filter → sort → paginate pipeline over the static venue
 * fixture. Deterministic and side-effect free, so it can run on the server and
 * be unit-tested directly.
 */
export const queryVenues = (
  params: VenueQueryParams = {}
): VenueQueryResult => {
  const {
    column = 'name',
    direction = 'ascending',
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = params;

  const filtered = venues.filter(buildVenuePredicate(params));

  const sorted = [...filtered].sort((a, b) =>
    compareVenues(a, b, column, direction)
  );
  const totalItems = sorted.length;

  if (pageSize === 'all') {
    return {
      items: sorted,
      totalItems,
      totalPages: 1,
      safePage: 1,
      pageSize: totalItems,
    };
  }

  const size = pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const items = sorted.slice((safePage - 1) * size, safePage * size);

  return { items, totalItems, totalPages, safePage, pageSize: size };
};

/** Minimum-rating tiers offered by the filter UI. */
export const RATING_TIERS = [3, 4, 5] as const;

export interface VenueFacets {
  /** Result count per option index, previewing the option against the filter. */
  types: number[];
  amenities: number[];
  parking: number[];
  seating: number[];
  /** Result count per minimum-rating tier. */
  rating: Record<string, number>;
}

/**
 * Per-option result counts for the filter panel. Match-any dimensions ignore
 * their own selection, otherwise the first checked option would zero its
 * siblings. Amenities must all be offered, so their counts keep the current
 * selection and preview adding the option.
 */
export const computeVenueFacets = (
  params: VenueQueryParams = {}
): VenueFacets => {
  const countBy = (
    options: readonly string[],
    skip: FacetDimension | undefined,
    offers: (venue: Venue, index: number) => boolean
  ) => {
    const matches = buildVenuePredicate(params, skip);
    return options.map(
      (_, index) =>
        venues.filter(venue => matches(venue) && offers(venue, index)).length
    );
  };

  const matchesExceptRating = buildVenuePredicate(params, 'rating');

  return {
    types: countBy(venueTypes, 'types', (venue, index) => venue.type === index),
    amenities: countBy(amenitiesOptions, undefined, (venue, index) =>
      has(venue.amenities, index)
    ),
    parking: countBy(parkingOptions, 'parking', (venue, index) =>
      has(venue.parking, index)
    ),
    seating: countBy(seatingTypeOptions, 'seating', (venue, index) =>
      has(venue.seatingTypes, index)
    ),
    rating: Object.fromEntries(
      RATING_TIERS.map(tier => [
        tier,
        venues.filter(
          venue => matchesExceptRating(venue) && venue.rating >= tier
        ).length,
      ])
    ),
  };
};

/**
 * The single venue id this demo refuses to delete, so the DELETE route has a
 * realistic "server says no" path to drive the error/rollback/toast example.
 */
export const PROTECTED_VENUE_ID = '1';
