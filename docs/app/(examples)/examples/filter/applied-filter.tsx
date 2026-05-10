'use client';

import { Tag, Text } from '@marigold/components';
import { type FilterKeys, renderFilterValue, useFilter } from './utils';

export const AppliedFilter = () => {
  const { filter, removeFilter } = useFilter();

  const appliedFilters = (Object.keys(filter) as FilterKeys[]).filter(name => {
    const value = filter[name];
    if (Array.isArray(value)) return value.length > 0;
    return value !== null;
  });

  return (
    <Tag.Group
      label="Applied Filters"
      onRemove={keys => removeFilter(keys as Set<FilterKeys>)}
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
