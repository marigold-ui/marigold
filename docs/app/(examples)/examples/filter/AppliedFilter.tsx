'use client';

import type { ReactNode } from 'react';
import { Tag } from '@marigold/components';
import { NumericFormat } from '@marigold/system';
import {
  type FilterKeys,
  type VenueFilter,
  useFilter,
} from './hooks/useFilter';

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
      return (
        <>
          Traits:{' '}
          {filter.traits.length <= 3
            ? filter.traits.join(', ')
            : `${filter.traits.slice(0, 2).join(', ')} (+${filter.traits.length - 2} more)`}
        </>
      );
    case 'rating':
      return <>Min. Rating: {filter.rating} ★</>;
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
    >
      {activeKeys.map(name => (
        <Tag id={name} key={name}>
          {getLabel(filter, name)}
        </Tag>
      ))}
    </Tag.Group>
  );
};
