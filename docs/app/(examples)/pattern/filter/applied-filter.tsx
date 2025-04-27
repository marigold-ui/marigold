'use client';

import { Tag } from '@marigold/components';
import { defaultFilter, toDisplayValue, useFilter } from './utils';

type FilterKeys = keyof typeof defaultFilter;

export const AppliedFilter = () => {
  const [filter] = useFilter();

  if (!filter) {
    return null;
  }

  return (
    <Tag.Group
      label="Applied Filters"
      allowsRemoving
      // onRemove={onRemove}
    >
      {Object.entries(filter)
        .filter(
          ([name, value]) =>
            `${value}` !== `${defaultFilter[name as FilterKeys]}`
        )
        .map(([name, value]) => (
          <Tag key={name}>
            {toDisplayValue[name as FilterKeys](value as any)}
          </Tag>
        ))}
    </Tag.Group>
  );
};
