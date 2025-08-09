'use client';

import { Info } from 'lucide-react';
import { Inline, Tag, Text } from '@marigold/components';
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
    return (
      <Inline alignY="center" space="0.5">
        <Info className="text-muted-foreground size-4 self-center" />
        <Text variant="muted" fontSize="sm">
          No filters applied
        </Text>
      </Inline>
    );
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
