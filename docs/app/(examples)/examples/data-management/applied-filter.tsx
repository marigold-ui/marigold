'use client';

import { Tag, Text } from '@marigold/components';
import { defaultFilter, toDisplayValue, useFilter } from './utils';

type FilterKeys = keyof typeof defaultFilter;

export const AppliedFilter = () => {
  const { filter, removeFilter } = useFilter();

  const appliedFilters = Object.entries(filter).filter(([name, value]) => {
    if (name === 'traits') return Array.isArray(value) && value.length > 0;
    return `${value}` !== `${defaultFilter[name as FilterKeys]}`;
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
      {appliedFilters.map(([name, value]) => (
        <Tag id={name} key={name}>
          {toDisplayValue[name as FilterKeys](value as never)}
        </Tag>
      ))}
    </Tag.Group>
  );
};
