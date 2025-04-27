'use client';

import { Tag } from '@marigold/components';
import { defaultFilter, toDisplayValue, useFilter } from './utils';

type FilterKeys = keyof typeof defaultFilter;

export const AppliedFilter = () => {
  const [filter, setFilter] = useFilter();
  const appliedFilters = Object.entries(filter).filter(
    ([name, value]) => `${value}` !== `${defaultFilter[name as FilterKeys]}`
  );

  const removeFilter = (keys: Set<FilterKeys>) => {
    const next = { ...filter };
    keys.forEach(key => {
      next[key] = defaultFilter[key] as (number & [number, number]) | undefined;
    });
    setFilter(next);
  };

  if (!appliedFilters.length) {
    return null;
  }

  return (
    <Tag.Group label="Applied Filters" allowsRemoving onRemove={removeFilter}>
      {appliedFilters.map(([name, value]) => (
        <Tag id={name} key={name}>
          {toDisplayValue[name as FilterKeys](value as any)}
        </Tag>
      ))}
    </Tag.Group>
  );
};
