'use client';

import { Button, Drawer, Inline, SearchField } from '@marigold/components';
import { Filter } from '@marigold/icons';
import { useFilters } from './useFilters';

export const Toolbar = () => {
  const [] = useFilters();

  return (
    <Inline space={2}>
      <SearchField description="Search by venue name" width={64} />
      <Button variant="primary">Search</Button>
      <Drawer.Trigger>
        <Button>
          <Filter /> Filter
        </Button>
        <Drawer>
          <Drawer.Title>Filter</Drawer.Title>
          <Drawer.Content>Add some filters here!</Drawer.Content>
          <Drawer.Actions>
            <Button slot="close">Close</Button>
            <Button
              slot="close"
              variant="primary"
              onPress={() => alert('Apply filters and close dialog')}
            >
              Apply
            </Button>
          </Drawer.Actions>
        </Drawer>
      </Drawer.Trigger>
    </Inline>
  );
};
