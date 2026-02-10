'use client';

import { venueTraits, venueTypes } from '@/lib/data/venues';
import type { FormEvent } from 'react';
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
  Tag,
} from '@marigold/components';
import { Filter } from '@marigold/icons';
import { defaultFilter, useFilter, useSearch } from './utils';

// Helper
// ---------------
const Search = () => {
  const [search, setSearch] = useSearch();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSearch(data.get('q') as string);
  };

  return (
    <Form onSubmit={submit} unstyled>
      <SearchField
        aria-label="Search"
        description="Search by venue name"
        name="q"
        width={64}
        autoComplete="off"
        defaultValue={search}
        onSubmit={setSearch}
        onClear={() => setSearch('')}
      />
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

interface FilterFormProps {
  state: {
    type: string;
    capacity: number;
    price: number;
    traits: string[];
    rating: string;
  };
}

const FilterForm = ({ state }: FilterFormProps) => (
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
      label="Max. Price"
      thumbLabels="price"
      name="price"
      defaultValue={state.price}
      step={100}
      maxValue={defaultFilter.price}
      formatOptions={{
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
      }}
    />
    <Tag.Group
      label="Traits"
      name="traits"
      selectionMode="multiple"
      defaultSelectedKeys={state.traits}
    >
      {venueTraits.map(trait => (
        <Tag key={trait} id={trait}>
          {trait}
        </Tag>
      ))}
    </Tag.Group>
    <Radio.Group label="Min. Rating" name="rating" defaultValue={state.rating}>
      <Radio value="">none</Radio>
      <Radio value="1">1</Radio>
      <Radio value="2">2</Radio>
      <Radio value="3">3</Radio>
      <Radio value="4">4</Radio>
      <Radio value="5">5</Radio>
    </Radio.Group>
  </Stack>
);

// Component
// ---------------
export const Toolbar = () => {
  const { filter, setFilter } = useFilter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFilter({
      type: data.get('type') ? Number(data.get('type')) : null,
      capacity: Number(data.get('capacity')) || defaultFilter.capacity,
      price: Number(data.get('price')) || defaultFilter.price,
      traits: data.getAll('traits') as string[],
      rating: data.get('rating') ? Number(data.get('rating')) : null,
    });
  };

  return (
    <Inline space={2}>
      <Search />
      <Drawer.Trigger>
        <Button>
          <Filter /> Filter
        </Button>
        <Drawer closeButton>
          <Form onSubmit={onSubmit} unstyled>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <FilterForm
                key={JSON.stringify(filter)}
                state={{
                  type: String(filter.type ?? ''),
                  capacity: filter.capacity,
                  price: filter.price,
                  traits: filter.traits,
                  rating: String(filter.rating ?? ''),
                }}
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
