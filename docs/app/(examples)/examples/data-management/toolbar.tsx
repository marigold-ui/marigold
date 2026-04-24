'use client';

import { venueTypes } from '@/lib/data/venues';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Button,
  Drawer,
  Form,
  Inline,
  NumberField,
  SearchField,
  Select,
  Slider,
  Stack,
  Tag,
  Text,
  ToggleButton,
} from '@marigold/components';
import { Filter } from '@marigold/icons';
import { VENUES_QUERY_KEY, fetchVenues } from './api';
import {
  MAX_CAPACITY,
  MAX_PRICE,
  getFormData,
  toFormSchema,
  toUrlSchema,
  useFilter,
  usePage,
  useSearch,
} from './utils';

// Filter form (inside Drawer — venue type is handled in the main toolbar)
// ---------------
interface FilterFormProps {
  state: ReturnType<typeof toFormSchema>;
  traitOptions: string[];
}

const FilterForm = ({ state, traitOptions }: FilterFormProps) => {
  const [rating, setRating] = useState<Set<string>>(
    state.rating ? new Set([state.rating]) : new Set()
  );

  return (
    <Stack space={12}>
      <NumberField
        label="Min. Capacity"
        name="capacity"
        defaultValue={state.capacity}
        minValue={0}
        maxValue={MAX_CAPACITY}
        step={100}
      />

      <Slider
        label="Max. Price"
        thumbLabels="price"
        name="price"
        defaultValue={state.price}
        step={100}
        maxValue={MAX_PRICE}
        formatOptions={{
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
        }}
      />

      {traitOptions.length > 0 && (
        <Tag.Group
          label="Traits"
          name="traits"
          selectionMode="multiple"
          defaultSelectedKeys={state.traits}
        >
          {traitOptions.map(trait => (
            <Tag key={trait} id={trait}>
              {trait}
            </Tag>
          ))}
        </Tag.Group>
      )}

      {/* Hidden input so ToggleButton.Group value lands in FormData */}
      <input
        type="hidden"
        name="rating"
        value={[...rating][0]?.toString() ?? ''}
      />
      <Stack space={2}>
        <Text weight="semibold">Min. Rating</Text>
        <ToggleButton.Group
          selectionMode="single"
          selectedKeys={rating}
          onSelectionChange={keys => setRating(new Set([...keys].map(String)))}
        >
          {['1', '2', '3', '4', '5'].map(val => (
            <ToggleButton key={val} id={val}>
              {val} ★
            </ToggleButton>
          ))}
        </ToggleButton.Group>
      </Stack>
    </Stack>
  );
};

// Toolbar
// ---------------
export const Toolbar = () => {
  const [search, setSearch] = useSearch();
  const { filter, setFilter } = useFilter();
  const [, setPage] = usePage();

  // Derive trait options from live data — shared cache, no extra request
  const { data: venues = [] } = useQuery({
    queryKey: VENUES_QUERY_KEY,
    queryFn: () => fetchVenues(),
  });
  const traitOptions = Array.from(
    new Set(venues.flatMap(v => v.traits))
  ).sort();

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = data.get('q') as string;
    const typeVal = data.get('type') as string;
    setSearch(q);
    setFilter({ ...filter, type: typeVal ? Number(typeVal) : undefined });
    setPage(null);
  };

  const onFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, error, data } = toUrlSchema(getFormData(e));
    if (!success) {
      console.error('Invalid filter data', error);
      return;
    }
    // Preserve venue type from toolbar — it's not part of the drawer form
    setFilter({ ...data, type: filter.type });
    setPage(null);
  };

  return (
    <Inline space={2} alignY="input">
      <Form onSubmit={onSearch} unstyled>
        <Inline space={2} noWrap alignY="top">
          <SearchField
            aria-label="Search venues"
            description="Search by name"
            name="q"
            width={64}
            autoComplete="off"
            defaultValue={search}
            onClear={() => {
              setSearch('');
              setPage(null);
            }}
          />
          <Select
            aria-label="Venue type"
            name="type"
            defaultSelectedKey={String(filter.type ?? '')}
          >
            <Select.Option id="">All types</Select.Option>
            {venueTypes.map((type, idx) => (
              <Select.Option key={type} id={String(idx)}>
                {type}
              </Select.Option>
            ))}
          </Select>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Inline>
      </Form>
      <Drawer.Trigger>
        <Button>
          <Filter /> Filter
        </Button>
        <Drawer closeButton>
          <Form onSubmit={onFilterSubmit} unstyled>
            <Drawer.Title>Filter Venues</Drawer.Title>
            <Drawer.Content>
              <FilterForm
                key={JSON.stringify(filter)}
                state={toFormSchema(filter)}
                traitOptions={traitOptions}
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
