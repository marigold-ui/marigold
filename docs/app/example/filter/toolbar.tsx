'use client';

import { Button, Drawer, Inline, SearchField } from '@marigold/components';
import { Filter } from '@marigold/icons';
import { useFilters } from './useFilters';

export const Toolbar = () => {
  const [] = useFilters();

  return (
    <Inline space={1}>
      <SearchField description="Search by venue name" width={64} />
      <Button variant="primary">Search</Button>
      <Drawer.Trigger>
        <Button>
          <Filter /> Filter
        </Button>
      </Drawer.Trigger>
    </Inline>
  );
};
