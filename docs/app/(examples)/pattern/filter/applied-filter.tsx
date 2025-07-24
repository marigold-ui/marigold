'use client';

import { Tag } from '@marigold/components';
import { defaultFilter, toDisplayValue, useFilter } from './utils';

type FilterKeys = keyof typeof defaultFilter;

export const AppliedFilter = () => {
  const { filter, removeFilter } = useFilter();

  const appliedFilters = Object.entries(filter).filter(([name, value]) =>
    Array.isArray(value)
      ? value.length !== defaultFilter[name as 'traits'].length
      : `${value}` !== `${defaultFilter[name as FilterKeys]}`
  );

  if (!appliedFilters.length) {
    return null;
  }

  return (
    <Tag.Group label="Applied Filters" onRemove={removeFilter}>
      {appliedFilters.map(([name, value]) => (
        <Tag id={name} key={name}>
          {toDisplayValue[name as FilterKeys](value as any)}
        </Tag>
      ))}
    </Tag.Group>
  );
};
