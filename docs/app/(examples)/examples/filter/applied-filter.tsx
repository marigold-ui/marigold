'use client';

import { Tag, Text } from '@marigold/components';
import {
  type VenueFilter,
  defaultFilter,
  renderFilterValue,
  useFilter,
} from './utils';

type FilterKeys = keyof VenueFilter;

export const AppliedFilter = () => {
  const { filter, removeFilter } = useFilter();

  const appliedFilters = (Object.keys(filter) as FilterKeys[]).filter(name => {
    const value = filter[name];
    if (name === 'traits') return Array.isArray(value) && value.length > 0;
    return `${value}` !== `${defaultFilter[name]}`;
  });

  return (
    <Tag.Group
      label="Applied Filters"
      onRemove={removeFilter}
      removeAll
      emptyState={() => (
        <Text variant="muted" fontSize="sm" fontStyle="italic">
          None
        </Text>
      )}
    >
      {appliedFilters.map(name => (
        <Tag id={name} key={name}>
          {renderFilterValue(name, filter)}
        </Tag>
      ))}
    </Tag.Group>
  );
};
