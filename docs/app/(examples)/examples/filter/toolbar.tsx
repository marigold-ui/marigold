'use client';

import { venueTraits } from '@/lib/data/venues';
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
  parseFormData,
} from '@marigold/components';
import { Filter } from '@marigold/icons';
import {
  MAX_CAPACITY,
  MAX_PRICE,
  type VenueFilter,
  useFilter,
  useSearch,
} from './utils';

// Filter form (inside Drawer)
// ---------------
interface FilterFormProps {
  filter: VenueFilter;
}

const FilterForm = ({ filter }: FilterFormProps) => (
  <Stack space={12}>
    <NumberField
      label="Min. Capacity"
      name="capacity"
      defaultValue={filter.capacity ?? 0}
      minValue={0}
      maxValue={MAX_CAPACITY}
      step={100}
    />

    <Slider
      label="Max. Price"
      thumbLabels="price"
      name="price"
      defaultValue={filter.price ?? MAX_PRICE}
      step={100}
      maxValue={MAX_PRICE}
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
      defaultSelectedKeys={filter.traits}
    >
      {venueTraits.map(trait => (
        <Tag key={trait} id={trait}>
          {trait}
        </Tag>
      ))}
    </Tag.Group>

    <Radio.Group
      label="Min. Rating"
      name="rating"
      orientation="horizontal"
      defaultValue={filter.rating ? String(filter.rating) : undefined}
    >
      {['1', '2', '3', '4', '5'].map(value => (
        <Radio key={value} value={value}>
          {value} ★
        </Radio>
      ))}
    </Radio.Group>
  </Stack>
);

// Toolbar
// ---------------
type FilterFormData = {
  capacity?: string;
  price?: string;
  traits?: string | string[];
  rating?: string;
};

export const Toolbar = () => {
  const [search, setSearch] = useSearch();
  const { filter, setFilter } = useFilter();

  const onFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = parseFormData<FilterFormData>(e);

    const capacity = data.capacity ? Number(data.capacity) : null;
    const price = data.price ? Number(data.price) : null;
    const traits = Array.isArray(data.traits)
      ? data.traits.map(String)
      : data.traits
        ? [String(data.traits)]
        : [];

    setFilter({
      capacity,
      price: price !== null && price < MAX_PRICE ? price : null,
      traits,
      rating: data.rating ? Number(data.rating) : null,
    });
  };

  return (
    <Inline space={2} alignX="between">
      <Inline alignY="input" space={2}>
        <SearchField
          aria-label="Search venues"
          description="Search by name"
          width={64}
          autoComplete="off"
          defaultValue={search}
          onSubmit={value => setSearch(value || null)}
          onClear={() => setSearch(null)}
        />
        <Drawer.Trigger>
          <Button>
            <Filter /> Filter
          </Button>
          <Drawer closeButton>
            <Form onSubmit={onFilterSubmit} unstyled>
              <Drawer.Title>Filter Venues</Drawer.Title>
              <Drawer.Content>
                <FilterForm key={JSON.stringify(filter)} filter={filter} />
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
    </Inline>
  );
};
