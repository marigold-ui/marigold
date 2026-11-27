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

// Groups all values of one filter into a single label joined with the
// filter's operator ("Club or Lounge"), truncated as "a, b (+N more)" so tags
// keep a consistent size.
const formatValues = (values: string[], conjunction: 'or' | 'and' = 'or') => {
  if (values.length > 3) {
    return `${values.slice(0, 2).join(', ')} (+${values.length - 2} more)`;
  }
  if (values.length < 2) return values.join('');
  return `${values.slice(0, -1).join(', ')} ${conjunction} ${values.at(-1)}`;
};

const fromOptions = (
  indexes: number[],
  options: readonly string[],
  conjunction?: 'or' | 'and'
) => formatValues(indexes.map(i => options[i]).filter(Boolean), conjunction);

// Parse an ISO date as local midnight, so the formatted day never shifts
// across timezones the way `new Date('YYYY-MM-DD')` (UTC midnight) can.
const toLocalDate = (iso: string) => new Date(`${iso}T00:00:00`);

// Called only for keys returned by activeFilterKeys(), so the value is
// guaranteed not to match its default sentinel.
// Each label reads as identifier, operator and value ("Type is Club or
// Lounge"), as the Filter pattern recommends. `text` is the plain version
// React Aria needs as the tag's `textValue` when the label holds formatted
// numbers or dates.
type FilterLabel = { text: string; node?: ReactNode };

const getLabel = (filter: VenueFilter, key: FilterKeys): FilterLabel => {
  switch (key) {
    case 'capacity':
      return {
        text: `Capacity at least ${filter.capacity}`,
        node: (
          <>
            Capacity at least <NumericFormat value={filter.capacity} />
          </>
        ),
      };
    case 'price':
      return {
        text: `Price at most ${filter.price} euros`,
        node: (
          <>
            Price at most{' '}
            <NumericFormat
              style="currency"
              value={filter.price}
              currency="EUR"
              maximumFractionDigits={0}
            />
          </>
        ),
      };
    case 'traits':
      return { text: `Traits include ${formatValues(filter.traits)}` };
    case 'rating':
      return { text: `Rating at least ${filter.rating} ★` };
    case 'types':
      return { text: `Type is ${fromOptions(filter.types, venueTypes)}` };
    case 'city':
      return { text: `City is ${formatValues(filter.city)}` };
    case 'available':
      return {
        text: `Available ${filter.available[0]} to ${filter.available[1]}`,
        node: (
          <>
            Available{' '}
            <DateFormat
              value={[
                toLocalDate(filter.available[0]),
                toLocalDate(filter.available[1]),
              ]}
              dateStyle="medium"
            />
          </>
        ),
      };
    // A venue must offer every amenity picked (see venues-query), so these
    // join with "and". The other multi-selects match any value.
    case 'amenities':
      return {
        text: `Amenities include ${fromOptions(filter.amenities, amenitiesOptions, 'and')}`,
      };
    case 'parking':
      return {
        text: `Parking includes ${fromOptions(filter.parking, parkingOptions)}`,
      };
    case 'seating':
      return {
        text: `Seating includes ${fromOptions(filter.seating, seatingTypeOptions)}`,
      };
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
      label="Applied filters"
      // Tag.Group's onRemove types keys as Set<Key> (RAC's string | number);
      // every Tag.id below is a FilterKey, so the narrower cast is safe.
      onRemove={keys => removeFilter(keys as Set<FilterKeys>)}
      removeAll
      collapseAt={3}
    >
      {activeKeys.map(name => {
        const label = getLabel(filter, name);
        return (
          <Tag id={name} key={name} textValue={label.text}>
            {label.node ?? label.text}
          </Tag>
        );
      })}
    </Tag.Group>
  );
};
