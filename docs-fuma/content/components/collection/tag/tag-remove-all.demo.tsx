'use client';

import { useState } from 'react';
import { Tag, Text } from '@marigold/components';

const emptyState = () => (
  <Text fontSize="sm" color="muted-foreground" fontStyle="italic">
    No filters selected.
  </Text>
);

export default () => {
  const [filters, setFilters] = useState([
    { id: 1, label: 'Category: Live music' },
    { id: 2, label: 'Location: Berlin' },
    { id: 3, label: 'Date: This weekend' },
    { id: 4, label: 'Setting: Outdoor' },
  ]);

  const removeFilter = (keys: Set<number>) => {
    setFilters(prev => prev.filter(filter => !keys.has(filter.id)));
  };

  return (
    <Tag.Group
      label="Applied filters"
      onRemove={removeFilter}
      removeAll
      emptyState={emptyState}
    >
      {filters.map(({ id, label }) => (
        <Tag key={id} id={id}>
          {label}
        </Tag>
      ))}
    </Tag.Group>
  );
};
