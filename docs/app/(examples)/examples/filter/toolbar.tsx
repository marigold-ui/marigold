'use client';

import { venueTraits } from '@/lib/data/venues';
import { useRef } from 'react';
import type { FormEvent } from 'react';
import {
  Button,
  Drawer,
  Form,
  Inline,
  NumberField,
  SearchField,
  Slider,
  Stack,
  Tag,
  Text,
  ToggleButton,
} from '@marigold/components';
import { Add, Filter } from '@marigold/icons';
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

// Filter form (inside Drawer)
// ---------------
interface FilterFormProps {
  state: ReturnType<typeof toFormSchema>;
}

const FilterForm = ({ state }: FilterFormProps) => {
  // ToggleButton.Group does not integrate with native FormData (it is not a
  // form component, see DST-1392 for the planned fix), so the rating value
  // rides along in a hidden <input> synced via onSelectionChange and a ref.
  // Do not copy this pattern blindly, once DST-1392 lands the hidden input
  // can be removed and a plain `name` prop used instead.
  const ratingInputRef = useRef<HTMLInputElement>(null);

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

      <input
        ref={ratingInputRef}
        type="hidden"
        name="rating"
        defaultValue={state.rating}
      />
      <Stack space={2}>
        <Text weight="semibold">Min. Rating</Text>
        <ToggleButton.Group
          selectionMode="single"
          defaultSelectedKeys={
            state.rating ? new Set([state.rating]) : new Set()
          }
          onSelectionChange={keys => {
            if (ratingInputRef.current) {
              ratingInputRef.current.value = [...keys][0]?.toString() ?? '';
            }
          }}
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

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = data.get('q') as string;
    setSearch(q);
    setPage(null);
  };

  const onFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, error, data } = toUrlSchema(getFormData(e));
    if (!success) {
      console.error('Invalid filter data', error);
      return;
    }
    setFilter(data);
    setPage(null);
  };

  return (
    <Inline space={2} alignX={'between'}>
      <Inline alignY="input" space={2}>
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
      {/* Will be wired up in DST-1288 */}
      <Button disabled>
        <Add /> Add Venue
      </Button>
    </Inline>
  );
};
