'use client';

import { Tag, Text } from '@marigold/components';
import {
  type FilterKey,
  defaultFilter,
  isDefault,
  toDisplayValue,
  useFilter,
} from './utils';

export const AppliedFilter = () => {
  const { filter, removeFilter } = useFilter();

  const appliedKeys = (Object.keys(defaultFilter) as FilterKey[]).filter(
    key => !isDefault(key, filter[key])
  );

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
      {appliedKeys.map(key => (
        <Tag id={key} key={key}>
          {toDisplayValue(key, filter)}
        </Tag>
      ))}
    </Tag.Group>
  );
};
