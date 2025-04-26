'use client';

import { venueTypes } from '@/lib/data/venues';
import { useActionState, useState } from 'react';
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
import { filterSchema, useFilter, useSearch } from './utils';
import type { VenueFilter } from './utils';

export const Toolbar = () => {
  const [search, setSearch] = useSearch();
  const [value, setValue] = useState(search || '');

  // TODO: is initial state working to fill the drawer?
  const [filter, setFilter] = useFilter();
  const [form, updateFilter] = useActionState(
    (_: VenueFilter, formData: FormData) => {
      const entries = Object.fromEntries(formData.entries());
      const { success, error, data } = filterSchema.safeParse(entries);

      if (success) {
        setFilter(data);
        return data;
      }

      console.error('Invalid form data', error);
      return _;
    },
    filter
  );

  console.log(filter);

  return (
    <Inline space={2}>
      <SearchField
        aria-label="Search"
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
          <Form action={updateFilter} contents>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={12}>
                <Radio.Group
                  label="Venue Type"
                  name="type"
                  defaultValue={form?.type ? `${form.type}` : ''}
                >
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
                  defaultValue={form?.capacity ?? 1000}
                  minValue={0}
                  step={10}
                />
                <Slider
                  label="Price"
                  thumbLabels={['minPrice', 'maxPrice']}
                  defaultValue={[
                    form?.price?.[0] ?? 0,
                    form?.price?.[1] ?? 25000,
                  ]}
                  step={100}
                  maxValue={25000}
                  formatOptions={{ style: 'currency', currency: 'EUR' }}
                />
                <Radio.Group
                  label="Min. Rating"
                  name="rating"
                  defaultValue={`${form?.rating ?? ''}`}
                >
                  <Radio value="">none</Radio>
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
              <Button variant="primary" type="submit">
                Apply
              </Button>
            </Drawer.Actions>
          </Form>
        </Drawer>
      </Drawer.Trigger>
    </Inline>
  );
};
