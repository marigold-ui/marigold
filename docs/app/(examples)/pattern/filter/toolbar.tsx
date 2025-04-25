'use client';

import { venueTypes } from '@/lib/data/venues';
import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  Button,
  Drawer,
  Form,
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
  const [filter] = useFilters();

  console.log(filter);

  const updateFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log('formData', data);
  };

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
          <Form onSubmit={updateFilter} contents>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={12}>
                <Radio.Group label="Venue Type" name="type">
                  <Radio value="">All</Radio>
                  {venueTypes.map((type, idx) => (
                    <Radio key={type} value={`${idx}`}>
                      {type}
                    </Radio>
                  ))}
                </Radio.Group>
                <NumberField
                  label="Max. Capacity"
                  name="capacity"
                  minValue={0}
                />
                <Slider
                  label="Price"
                  thumbLabels={['min', 'max']}
                  step={100}
                  formatOptions={{ style: 'currency', currency: 'EUR' }}
                />
                <Radio.Group label="Min. Rating" name="rating">
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
              <Button slot="close" variant="primary" type="submit">
                Apply
              </Button>
            </Drawer.Actions>
          </Form>
        </Drawer>
      </Drawer.Trigger>
    </Inline>
  );
};
