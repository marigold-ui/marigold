'use client';

import { Button, Inline, SearchField } from '@marigold/components';
import { useFilters } from './useFilters';

export const Toolbar = () => {
  const [] = useFilters();

  return (
    <Inline space={1}>
      <SearchField description="Search by venue name" width={64} />
      <Button variant="primary">Search</Button>
      <Button>Filter</Button>
    </Inline>
  );
};
