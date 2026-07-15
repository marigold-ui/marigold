'use client';

import { venueTraits } from '@/lib/data/venues';
import { useQueryClient } from '@tanstack/react-query';
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
import { ListFilter } from '@marigold/icons';
import { FetchingIndicator } from './FetchingIndicator';
import { venueKeys } from './hooks/queryKeys';
import { useDeletedVenues } from './hooks/useDeletedVenues';
import {
  type FilterFormData,
  MAX_CAPACITY,
  MAX_PRICE,
  type VenueFilter,
  useFilter,
} from './hooks/useFilter';
import { useSearch } from './hooks/useSearch';

const FilterForm = ({ filter }: { filter: VenueFilter }) => (
  <Stack space="group">
    <NumberField
      label="Min. Capacity"
      name="capacity"
      defaultValue={filter.capacity}
      minValue={0}
      maxValue={MAX_CAPACITY}
      step={100}
    />

    <Slider
      label="Max. Price"
      thumbLabels="price"
      name="price"
      defaultValue={filter.price}
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
      defaultValue={filter.rating === 0 ? undefined : String(filter.rating)}
    >
      {['1', '2', '3', '4', '5'].map(value => (
        <Radio key={value} value={value}>
          {value} ★
        </Radio>
      ))}
    </Radio.Group>
  </Stack>
);

export const FilterBar = () => {
  const [search, setSearch] = useSearch();
  const { filter, setFilterFromForm } = useFilter();

  const onFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilterFromForm(parseFormData<FilterFormData>(e));
  };

  return (
    <Inline space="related" alignX="between" alignY="center">
      <Inline alignY="input" space="related">
        <SearchField
          aria-label="Search venues"
          description="Search by name"
          width={64}
          autoComplete="off"
          defaultValue={search}
          onSubmit={setSearch}
          onClear={() => setSearch('')}
        />
        <Drawer.Trigger>
          <Button>
            <ListFilter /> Filter
          </Button>
          <Drawer closeButton>
            <Form onSubmit={onFilterSubmit} unstyled>
              <Drawer.Title>Filter Venues</Drawer.Title>
              <Drawer.Content>
                {/* FilterForm is uncontrolled. Remount on URL state changes
                    so defaultValue picks up the latest filter values. */}
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
      <Inline alignY="center" space="related">
        <FetchingIndicator />
        <ResetDemo />
      </Inline>
    </Inline>
  );
};

// Restores any venues deleted this session. Deletions live in client state
// (see useDeletedVenues), so resetting them and invalidating the list brings
// every venue back — no server round-trip needed.
const ResetDemo = () => {
  const queryClient = useQueryClient();
  const { excludedIds, reset } = useDeletedVenues();

  if (excludedIds.length === 0) return null;

  return (
    <Button
      variant="ghost"
      size="small"
      onPress={() => {
        reset();
        queryClient.invalidateQueries({ queryKey: venueKeys.lists() });
      }}
    >
      Reset demo
    </Button>
  );
};
