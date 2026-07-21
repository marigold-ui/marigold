'use client';

import {
  amenitiesOptions,
  parkingOptions,
  seatingTypeOptions,
  venueTypes,
} from '@/lib/data/venues';
import type { ReactNode } from 'react';
import { Tag } from '@marigold/components';
import { DateFormat, NumericFormat } from '@marigold/system';
import {
  type FilterKeys,
  type VenueFilter,
  useFilter,
} from './hooks/useFilter';

// Groups all values of one filter into a single label, truncated as
// "a, b (+N more)" so tags keep a consistent size.
const formatValues = (values: string[]) =>
  values.length <= 3
    ? values.join(', ')
    : `${values.slice(0, 2).join(', ')} (+${values.length - 2} more)`;

const fromOptions = (indexes: number[], options: readonly string[]) =>
  formatValues(indexes.map(i => options[i]).filter(Boolean));

// Parse an ISO date as local midnight, so the formatted day never shifts
// across timezones the way `new Date('YYYY-MM-DD')` (UTC midnight) can.
const toLocalDate = (iso: string) => new Date(`${iso}T00:00:00`);

// Called only for keys returned by activeFilterKeys(), so the value is
// guaranteed not to match its default sentinel.
const getLabel = (filter: VenueFilter, key: FilterKeys): ReactNode => {
  switch (key) {
    case 'capacity':
      return (
        <>
          Min Capacity: <NumericFormat value={filter.capacity} />
        </>
      );
    case 'price':
      return (
        <>
          Max. Price:{' '}
          <NumericFormat
            style="currency"
            value={filter.price}
            currency="EUR"
            maximumFractionDigits={0}
          />
        </>
      );
    case 'traits':
      return <>Traits: {formatValues(filter.traits)}</>;
    case 'rating':
      return <>Min. Rating: {filter.rating} ★</>;
    case 'types':
      return <>Type: {fromOptions(filter.types, venueTypes)}</>;
    case 'city':
      return <>City: {formatValues(filter.city)}</>;
    case 'available':
      return (
        <>
          Available:{' '}
          <DateFormat
            value={[
              toLocalDate(filter.available[0]),
              toLocalDate(filter.available[1]),
            ]}
            dateStyle="medium"
          />
        </>
      );
    case 'amenities':
      return <>Amenities: {fromOptions(filter.amenities, amenitiesOptions)}</>;
    case 'parking':
      return <>Parking: {fromOptions(filter.parking, parkingOptions)}</>;
    case 'seating':
      return <>Seating: {fromOptions(filter.seating, seatingTypeOptions)}</>;
  }
};

export const AppliedFilter = () => {
  const { filter, removeFilter, activeFilterKeys } = useFilter();
  const activeKeys = activeFilterKeys();

  // Nothing to show at rest (the default, no-filter state) — render nothing
  // rather than a permanent "None" row of dead space.
  if (activeKeys.length === 0) {
    return null;
  }

  return (
    <Tag.Group
      label="Applied Filters"
      // Tag.Group's onRemove types keys as Set<Key> (RAC's string | number);
      // every Tag.id below is a FilterKey, so the narrower cast is safe.
      onRemove={keys => removeFilter(keys as Set<FilterKeys>)}
      removeAll
      collapseAt={3}
    >
      {activeKeys.map(name => (
        <Tag id={name} key={name}>
          {getLabel(filter, name)}
        </Tag>
      ))}
    </Tag.Group>
  );
};
