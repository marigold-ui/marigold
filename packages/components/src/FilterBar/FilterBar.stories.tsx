import { useState } from 'react';
import { expect, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { NumberField } from '../NumberField/NumberField';
import { SearchField } from '../SearchField/SearchField';
import { Select } from '../Select/Select';
import { Stack } from '../Stack/Stack';
import { FilterBar } from './FilterBar';

const meta = preview.meta({
  title: 'Components/FilterBar',
  component: FilterBar,
  decorators: [
    // The panel drawer portals into the overlay container. Provide the
    // container locally so the tests can interact with the open drawer.
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
});

// Reusable bar: search + three quick filters + the canonical panel. The
// quick filters are ordered by priority: "Price" is the least used, so it
// demotes first when the bar gets too narrow.
const DemoBar = ({ priceActive = false }: { priceActive?: boolean }) => (
  <FilterBar aria-label="Filter events">
    <FilterBar.Search>
      <SearchField aria-label="Search events" width={56} />
    </FilterBar.Search>
    <FilterBar.Quick>
      <Select aria-label="Category" placeholder="Category" width={36}>
        <Select.Option id="concerts">Concerts</Select.Option>
        <Select.Option id="festivals">Festivals</Select.Option>
        <Select.Option id="theater">Theater</Select.Option>
      </Select>
    </FilterBar.Quick>
    <FilterBar.Quick>
      <Select aria-label="Status" placeholder="Status" width={36}>
        <Select.Option id="published">Published</Select.Option>
        <Select.Option id="draft">Draft</Select.Option>
      </Select>
    </FilterBar.Quick>
    <FilterBar.Quick active={priceActive}>
      <Select
        aria-label="Price"
        placeholder="Price"
        width={36}
        defaultValue={priceActive ? 'lt50' : undefined}
      >
        <Select.Option id="lt50">Under 50 €</Select.Option>
        <Select.Option id="gte50">50 € and more</Select.Option>
      </Select>
    </FilterBar.Quick>
    <FilterBar.Panel>
      <Stack space="group">
        <Checkbox.Group label="Category">
          <Checkbox value="concerts" label="Concerts" />
          <Checkbox value="festivals" label="Festivals" />
          <Checkbox value="theater" label="Theater" />
        </Checkbox.Group>
        <Checkbox.Group label="Status">
          <Checkbox value="published" label="Published" />
          <Checkbox value="draft" label="Draft" />
        </Checkbox.Group>
        <NumberField label="Max. price" minValue={0} step={10} />
      </Stack>
    </FilterBar.Panel>
  </FilterBar>
);

export const Basic = meta.story({
  render: () => <DemoBar />,
});

export const Demotion = meta.story({
  tags: ['component-test'],
  render: () => (
    <div className="w-[560px]">
      <DemoBar />
    </div>
  ),
});

Demotion.test(
  'demotes trailing quick filters instead of wrapping',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    // Pinned controls stay visible at any width.
    expect(canvas.getByRole('searchbox')).toBeVisible();
    expect(canvas.getByRole('button', { name: /all filters/i })).toBeVisible();

    // The trailing (lowest priority) quick filter no longer fits: it is
    // hidden and removed from the accessibility tree.
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
    );

    // The highest priority quick filter still fits and stays interactive.
    expect(canvas.getByRole('button', { name: /category/i })).toBeVisible();
  }
);

Demotion.test(
  'demoted quick filters are removed from the tab order',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
    );

    // Tab through the whole bar: focus must never land on a demoted control.
    const searchbox = canvas.getByRole('searchbox');
    searchbox.focus();

    const trigger = canvas.getByRole('button', { name: /all filters/i });
    let previous: Element | null = null;
    for (let i = 0; i < 10 && document.activeElement !== trigger; i++) {
      await userEvent.tab();
      // Bail out if focus stops moving (left the canvas).
      if (document.activeElement === previous) break;
      previous = document.activeElement;
      expect(document.activeElement).not.toHaveAccessibleName(/price/i);
    }
    expect(document.activeElement).toBe(trigger);
  }
);

Demotion.test(
  'panel opens with the canonical filter set',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /all filters/i }));

    // The drawer portals into the overlay container inside the canvas.
    // The demoted "price" filter stays reachable here.
    expect(await canvas.findByText('Max. price')).toBeVisible();
    expect(
      await canvas.findByRole('group', { name: 'Category' })
    ).toBeVisible();
  }
);

const ResizeDemo = () => {
  const [wide, setWide] = useState(false);
  return (
    <Stack space={4}>
      <Button onPress={() => setWide(current => !current)}>Toggle width</Button>
      <div className={wide ? 'w-[900px]' : 'w-[560px]'}>
        <DemoBar />
      </div>
    </Stack>
  );
};

export const Resize = meta.story({
  tags: ['component-test'],
  render: () => <ResizeDemo />,
});

Resize.test(
  'restores demoted quick filters when space returns',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    // Narrow: the trailing quick filter is demoted.
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
    );

    // Grow: every quick filter fits again.
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle width' }));
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: /price/i })).toBeVisible()
    );

    // Shrink again: demotion re-applies.
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle width' }));
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
    );
  }
);

export const DemotedBadge = meta.story({
  tags: ['component-test'],
  render: () => (
    <div className="w-[560px]">
      <DemoBar priceActive />
    </div>
  ),
});

DemotedBadge.test(
  'counts active demoted filters on the panel trigger',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
    );

    // The active "price" filter is demoted, so the trigger badges it and
    // announces the hidden count to assistive technology.
    const trigger = canvas.getByRole('button', { name: /all filters/i });
    await waitFor(() => expect(within(trigger).getByText('1')).toBeVisible());
    expect(trigger).toHaveAccessibleName(/1 active filter/i);
  }
);
