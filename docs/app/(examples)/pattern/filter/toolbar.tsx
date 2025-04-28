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
import {
  defaultFilter,
  toFormSchema,
  toUrlSchema,
  useFilter,
  useSearch,
} from './utils';

// Helper
// ---------------
const Search = () => {
  const [search, setSearch] = useSearch();
  const [value, setValue] = useState(search);

  return (
    <>
      <SearchField
        aria-label="Search"
        description="Search by venue name"
        width={64}
        autoComplete="off"
        value={value}
        onChange={setValue}
        onSubmit={setSearch}
        onClear={() => setSearch('')}
      />
      <Button variant="primary" onPress={() => setSearch(value)}>
        Search
      </Button>
    </>
  );
};

interface FilterFormProps {
  state: {
    type: string;
    capacity: number;
    price: number;
    rating: string;
  };
}

const FilterForm = ({ state }: FilterFormProps) => {
  return (
    <Stack space={12}>
      <Radio.Group label="Venue Type" name="type" defaultValue={state.type}>
        <Radio value="">All</Radio>
        {venueTypes.map((type, idx) => (
          <Radio key={type} value={`${idx}`}>
            {type}
          </Radio>
        ))}
      </Radio.Group>
      <NumberField
        label="Min. Capacity"
        name="capacity"
        defaultValue={state.capacity}
        minValue={0}
        step={10}
      />
      <Slider
        label="Price"
        thumbLabels={['price']}
        defaultValue={state.price}
        step={100}
        maxValue={defaultFilter.price}
        formatOptions={{ style: 'currency', currency: 'EUR' }}
      />
      <Radio.Group
        label="Min. Rating"
        name="rating"
        defaultValue={state.rating}
      >
        <Radio value="">none</Radio>
        <Radio value="1">1</Radio>
        <Radio value="2">2</Radio>
        <Radio value="3">3</Radio>
        <Radio value="4">4</Radio>
        <Radio value="5">5</Radio>
      </Radio.Group>
    </Stack>
  );
};

// Component
// ---------------
export const Toolbar = () => {
  const [filter, setFilter] = useFilter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const entries = Object.fromEntries(new FormData(e.currentTarget).entries());
    const { success, error, data } = toUrlSchema(entries);
    if (!success) {
      console.error('Invalid form data', error);
      return;
    }

    setFilter(data);
  };

  return (
    <Inline space={2}>
      <Search />
      <Drawer.Trigger>
        <Button>
          <Filter /> Filter
        </Button>
        <Drawer closeButton>
          <Form onSubmit={onSubmit} contents>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <FilterForm
                key={JSON.stringify(filter)}
                state={toFormSchema(filter)}
              />
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
