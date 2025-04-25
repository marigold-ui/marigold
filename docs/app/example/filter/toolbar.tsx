'use client';

import { useState } from 'react';
import { Button, Drawer, Inline, SearchField } from '@marigold/components';
import { Filter } from '@marigold/icons';
import { useFilters, useSearch } from './hooks';

export const Toolbar = () => {
  const [search, setSearch] = useSearch();
  const [value, setValue] = useState(search || '');
  const [] = useFilters();

  return (
    <Inline space={2}>
      <SearchField
        description="Search by venue name"
        width={64}
        autoComplete="off"
        value={value}
        onChange={setValue}
        onSubmit={setSearch}
      />
      <Button variant="primary" onPress={() => setSearch(value)}>
        Search
      </Button>
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
