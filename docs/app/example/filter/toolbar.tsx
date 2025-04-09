'use client';

import { Button, SearchField, Stack } from '@marigold/components';
import { useFilters } from './useFilters';

export const Toolbar = () => {
  const [] = useFilters();

  return (
    <Stack space={4}>
      <SearchField description="Search by venue name" />
      <Button>Suchen</Button>
    </Stack>
  );
};
