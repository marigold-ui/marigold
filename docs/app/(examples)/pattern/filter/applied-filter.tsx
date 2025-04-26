'use client';

import { Tag } from '@marigold/components';
import { useFilter } from './utils';

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
      {Object.entries(filter).map(([name, value]) => {
        return <Tag key={name}>{value}</Tag>;
      })}
    </Tag.Group>
  );
};
