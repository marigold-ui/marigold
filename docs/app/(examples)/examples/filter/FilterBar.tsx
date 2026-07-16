'use client';

import {
  amenitiesOptions,
  parkingOptions,
  seatingTypeOptions,
  venueTraits,
  venueTypes,
} from '@/lib/data/venues';
import type { VenueFacets } from '@/lib/data/venues-query';
import { useQueryClient } from '@tanstack/react-query';
import { type FormEvent, useRef, useState } from 'react';
import {
  Accordion,
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Inline,
  NumberField,
  Radio,
  SearchField,
  SegmentedControl,
  Select,
  Slider,
  Stack,
  Tag,
  Text,
  VisuallyHidden,
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
import { useFilterPreview } from './hooks/useFilterPreview';
import { useSearch } from './hooks/useSearch';

// Muted count inside the label, so assistive tech announces it with the option.
const withCount = (label: string, count?: number) =>
  count === undefined ? (
    label
  ) : (
    <Inline space={2} alignY="center">
      {label}
      <Text variant="muted">({count})</Text>
    </Inline>
  );

// Index-based checkbox group over one of the option arrays. Values are the
// option indexes as strings, matching how the venue records reference them.
const OptionGroup = ({
  label,
  name,
  options,
  selected,
  counts,
}: {
  label: string;
  name: string;
  options: readonly string[];
  selected: number[];
  counts?: number[];
}) => (
  <Checkbox.Group label={label} name={name} defaultValue={selected.map(String)}>
    {options.map((option, index) => (
      <Checkbox
        key={option}
        value={String(index)}
        label={withCount(option, counts?.[index])}
      />
    ))}
  </Checkbox.Group>
);

// The panel groups its filters into collapsible sections so it opens with a
// compact overview; the most-used group is expanded by default.
const FilterForm = ({
  filter,
  facets,
}: {
  filter: VenueFilter;
  facets?: VenueFacets;
}) => (
  <Accordion allowsMultipleExpanded defaultExpandedKeys={['essentials']}>
    <Accordion.Item id="essentials">
      <Accordion.Header>Essentials</Accordion.Header>
      <Accordion.Content>
        <Stack space="group">
          <OptionGroup
            label="Type"
            name="types"
            options={venueTypes}
            selected={filter.types}
            counts={facets?.types}
          />
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
        </Stack>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item id="quality">
      <Accordion.Header>Quality</Accordion.Header>
      <Accordion.Content>
        <Stack space="group">
          {/* Same tiers as the quick filter in the bar — both edit the same
              `rating` state, so they always agree. */}
          <Radio.Group
            label="Min. Rating"
            name="rating"
            orientation="horizontal"
            defaultValue={
              filter.rating === 0 ? undefined : String(filter.rating)
            }
          >
            <Radio value="3">{withCount('3+ ★', facets?.rating[3])}</Radio>
            <Radio value="4">{withCount('4+ ★', facets?.rating[4])}</Radio>
            <Radio value="5">{withCount('5 ★', facets?.rating[5])}</Radio>
          </Radio.Group>
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
        </Stack>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item id="facilities">
      <Accordion.Header>Facilities</Accordion.Header>
      <Accordion.Content>
        <Stack space="group">
          <OptionGroup
            label="Amenities"
            name="amenities"
            options={amenitiesOptions}
            selected={filter.amenities}
            counts={facets?.amenities}
          />
          <OptionGroup
            label="Parking"
            name="parking"
            options={parkingOptions}
            selected={filter.parking}
            counts={facets?.parking}
          />
          <OptionGroup
            label="Seating"
            name="seating"
            options={seatingTypeOptions}
            selected={filter.seating}
            counts={facets?.seating}
          />
        </Stack>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
);

// Same folding as parseFormData, reading the form element directly since the
// draft handlers live on a wrapper around the fields, not on the form itself.
const readFormData = (form: HTMLFormElement): FilterFormData => {
  const result: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
  for (const [key, value] of new FormData(form).entries()) {
    const prev = result[key];
    result[key] =
      prev === undefined
        ? value
        : [...(Array.isArray(prev) ? prev : [prev]), value];
  }
  return result as FilterFormData;
};

// Quick filters are shortcuts to filters that still live in the panel: they
// share the same URL state and apply instantly.
const TypeQuickFilter = () => {
  const { filter, setFilter } = useFilter();

  return (
    <Select
      aria-label="Type"
      selectionMode="multiple"
      placeholder="Type"
      width={36}
      value={filter.types.map(String)}
      onChange={keys => setFilter({ types: [...keys].map(Number) })}
      // Show the dimension and a count, the applied tags carry the values.
      renderValue={(_items, { count }) => (
        <>
          <Inline space={2} alignY="center" aria-hidden="true">
            <span>Type</span>
            <Badge>{count}</Badge>
          </Inline>
          <VisuallyHidden>{`${count} selected`}</VisuallyHidden>
        </>
      )}
    >
      {venueTypes.map((label, index) => (
        <Select.Option key={label} id={String(index)}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};

const RatingQuickFilter = () => {
  const { filter, setFilter } = useFilter();

  return (
    <SegmentedControl
      aria-label="Minimum rating"
      // Fields default to full width, which would break the single-row bar.
      width="fit"
      value={String(filter.rating)}
      onChange={value => setFilter({ rating: Number(value) })}
    >
      <SegmentedControl.Option value="0">Any rating</SegmentedControl.Option>
      <SegmentedControl.Option value="3">3+ ★</SegmentedControl.Option>
      <SegmentedControl.Option value="4">4+ ★</SegmentedControl.Option>
      <SegmentedControl.Option value="5">5 ★</SegmentedControl.Option>
    </SegmentedControl>
  );
};

export const FilterBar = () => {
  const [search, setSearch] = useSearch();
  const { filter, setFilterFromForm, activeFilterKeys } = useFilter();
  const activeCount = activeFilterKeys().length;

  // Draft form state, read on every interaction with the drawer form. It
  // feeds the live result count on the Apply button; the filter itself is
  // still committed only on submit.
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<FilterFormData | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { resultCount, facets } = useFilterPreview(draft, open);

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) setDraft(null);
    setOpen(isOpen);
  };

  // pointerup covers clicks, drags and tag toggles, keyup typing and keyboard
  // interaction. The read is deferred so React has committed the interaction
  // before FormData is taken; the count query is debounced, so over-reporting
  // from these broad events is fine.
  const updateDraft = () => {
    setTimeout(() => {
      if (formRef.current) setDraft(readFormData(formRef.current));
    }, 0);
  };

  const onFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilterFromForm(parseFormData<FilterFormData>(e));
    setOpen(false);
  };

  return (
    <Inline space="related" alignX="between" alignY="center">
      <Inline alignY="input" space="related">
        <SearchField
          aria-label="Search venues"
          placeholder="Search venues"
          width={56}
          autoComplete="off"
          defaultValue={search}
          onSubmit={setSearch}
          onClear={() => setSearch('')}
        />
        <TypeQuickFilter />
        <RatingQuickFilter />
        <Drawer.Trigger open={open} onOpenChange={onOpenChange}>
          <Button>
            <ListFilter /> All filters
            {activeCount > 0 && <Badge variant="primary">{activeCount}</Badge>}
          </Button>
          <Drawer closeButton>
            <Form ref={formRef} onSubmit={onFilterSubmit} unstyled>
              <Drawer.Title>Filter Venues</Drawer.Title>
              <Drawer.Content>
                {/* FilterForm is uncontrolled. Remount on URL state changes
                    so defaultValue picks up the latest filter values. */}
                <div
                  onChange={updateDraft}
                  onPointerUp={updateDraft}
                  onKeyUp={updateDraft}
                >
                  <FilterForm
                    key={JSON.stringify(filter)}
                    filter={filter}
                    facets={facets}
                  />
                </div>
              </Drawer.Content>
              <Drawer.Actions>
                <Button slot="close">Close</Button>
                {/* Previews the outcome before committing */}
                <Button variant="primary" type="submit">
                  {resultCount === undefined
                    ? 'Apply'
                    : `Show ${resultCount} result${resultCount === 1 ? '' : 's'}`}
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
