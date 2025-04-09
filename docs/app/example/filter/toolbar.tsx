'use client';

import { Button, Inline, SearchField } from '@marigold/components';
import { useFilters } from './useFilters';

export const Toolbar = () => {
  const [] = useFilters();

  return (
    <Inline space={4}>
      <SearchField description="Search by venue name" width={64} />
      <Button>Suchen</Button>
    </Inline>
  );
};
