'use client';

import { venueTypes } from '@/lib/data/venues';
import { useState } from 'react';
import {
  Button,
  Drawer,
  Inline,
  NumberField,
  Radio,
  SearchField,
  Slider,
  Stack,
} from '@marigold/components';
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
          <Drawer.Content>
            <Stack space={12}>
              <Radio.Group label="Venue Type">
                <Radio value="">All</Radio>
                {venueTypes.map((type, idx) => (
                  <Radio key={type} value={`${idx}`}>
                    {type}
                  </Radio>
                ))}
              </Radio.Group>
              <NumberField label="Max. Capacity" minValue={0} />
              <Slider
                label="Price"
                step={100}
                formatOptions={{ style: 'currency', currency: 'EUR' }}
              />
              <Radio.Group label="Min. Rating">
                <Radio value="0">0</Radio>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
                <Radio value="4">4</Radio>
                <Radio value="5">5</Radio>
              </Radio.Group>
            </Stack>
          </Drawer.Content>
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
