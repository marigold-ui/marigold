import { useState } from 'react';
import { expect, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Drawer } from '../Drawer/Drawer';
import { Inline } from '../Inline/Inline';
import { Menu } from '../Menu/Menu';
import { NumberField } from '../NumberField/NumberField';
import { SearchField } from '../SearchField/SearchField';
import { Select } from '../Select/Select';
import { Stack } from '../Stack/Stack';
import { OverflowRegion } from './OverflowRegion';

const meta = preview.meta({
  title: 'Components/OverflowRegion',
  component: OverflowRegion,
  decorators: [
    // Overlays (e.g. the drawer in the filter recipe) portal into the
    // overlay container. Provide it locally so tests can interact with
    // the open drawer.
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
});

// The region between pinned siblings: search stays first, the "More"
// indicator appears only while items are hidden.
const DemoRow = () => (
  <Inline noWrap space="related" alignY="center">
    <SearchField aria-label="Search events" width={56} />
    {/* Items must be direct children: the region measures and hides them
        individually. */}
    <OverflowRegion
      indicator={({ hiddenCount }) => <Button>More ({hiddenCount})</Button>}
    >
      <Select aria-label="Category" placeholder="Category" width={36}>
        <Select.Option id="concerts">Concerts</Select.Option>
        <Select.Option id="festivals">Festivals</Select.Option>
        <Select.Option id="theater">Theater</Select.Option>
      </Select>
      <Select aria-label="Status" placeholder="Status" width={36}>
        <Select.Option id="published">Published</Select.Option>
        <Select.Option id="draft">Draft</Select.Option>
      </Select>
      <Select aria-label="Price" placeholder="Price" width={36}>
        <Select.Option id="lt50">Under 50 €</Select.Option>
        <Select.Option id="gte50">50 € and more</Select.Option>
      </Select>
    </OverflowRegion>
  </Inline>
);

export const Basic = meta.story({
  render: () => <DemoRow />,
});

export const Demotion = meta.story({
  tags: ['component-test'],
  render: () => (
    <div className="w-[560px]">
      <DemoRow />
    </div>
  ),
});

Demotion.test(
  'hides trailing items instead of wrapping and shows the indicator',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    // Pinned sibling stays visible at any width.
    expect(canvas.getByRole('searchbox')).toBeVisible();

    // The trailing (lowest priority) item no longer fits: it is hidden
    // and removed from the accessibility tree.
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
    );

    // The leading item still fits and stays interactive; the indicator
    // reports the hidden count.
    expect(canvas.getByRole('button', { name: /category/i })).toBeVisible();
    expect(canvas.getByRole('button', { name: /more \(2\)/i })).toBeVisible();
  }
);

Demotion.test(
  'hidden items are removed from the tab order',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
    );

    // Tab through the whole row: focus must never land on a hidden item.
    canvas.getByRole('searchbox').focus();

    const indicator = canvas.getByRole('button', { name: /more/i });
    let previous: Element | null = null;
    for (let i = 0; i < 10 && document.activeElement !== indicator; i++) {
      await userEvent.tab();
      // Bail out if focus stops moving (left the canvas).
      if (document.activeElement === previous) break;
      previous = document.activeElement;
      expect(document.activeElement).not.toHaveAccessibleName(/price/i);
    }
    expect(document.activeElement).toBe(indicator);
  }
);

const ResizeDemo = () => {
  const [wide, setWide] = useState(false);
  return (
    <Stack space={4}>
      <Button onPress={() => setWide(current => !current)}>Toggle width</Button>
      <div className={wide ? 'w-[900px]' : 'w-[560px]'}>
        <DemoRow />
      </div>
    </Stack>
  );
};

export const Resize = meta.story({
  tags: ['component-test'],
  render: () => <ResizeDemo />,
});

Resize.test(
  'restores hidden items when space returns',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    // Narrow: the trailing item is hidden.
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
    );

    // Grow: every item fits again, the indicator disappears.
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle width' }));
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: /price/i })).toBeVisible()
    );
    expect(canvas.queryByRole('button', { name: /more/i })).toBeNull();

    // Shrink again: hiding re-applies.
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle width' }));
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
    );
  }
);

// Priority+ navigation: the links that no longer fit move into a "More"
// menu. The consumer owns the item list, so `links.slice(visibleCount)`
// is exactly the hidden set — priority is DOM order.
const navLinks = [
  'Dashboard',
  'Events',
  'Orders',
  'Reports',
  'Settings',
  'Team',
];

export const PriorityNavigation = meta.story({
  tags: ['component-test'],
  render: () => (
    <nav aria-label="Main" className="w-[480px]">
      <OverflowRegion
        indicator={({ visibleCount }) => (
          <Menu label="More" aria-label="More pages">
            {navLinks.slice(visibleCount).map(link => (
              <Menu.Item key={link} id={link}>
                {link}
              </Menu.Item>
            ))}
          </Menu>
        )}
      >
        {navLinks.map(link => (
          <Button key={link} variant="ghost">
            {link}
          </Button>
        ))}
      </OverflowRegion>
    </nav>
  ),
});

PriorityNavigation.test(
  'moves links that do not fit into the More menu',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    // Trailing links are hidden from the a11y tree, leading ones stay.
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: 'Team' })).toBeNull()
    );
    expect(canvas.getByRole('button', { name: 'Dashboard' })).toBeVisible();

    // Every hidden link is reachable through the menu.
    await userEvent.click(canvas.getByRole('button', { name: /more/i }));
    expect(await canvas.findByRole('menuitem', { name: 'Team' })).toBeVisible();
    expect(canvas.getByRole('menuitem', { name: 'Settings' })).toBeVisible();
    // Visible links do not show up in the menu.
    expect(canvas.queryByRole('menuitem', { name: 'Dashboard' })).toBeNull();
  }
);

// The filter-bar recipe: quick filters demote into the canonical "All
// filters" panel. The trigger is pinned outside the region and badges the
// hidden count via `onOverflowChange`.
const FilterBarRecipe = () => {
  const [hiddenCount, setHiddenCount] = useState(0);

  return (
    <Inline noWrap space="related" alignY="center">
      <SearchField aria-label="Search events" width={56} />
      <OverflowRegion
        onOverflowChange={({ hiddenCount }) => setHiddenCount(hiddenCount)}
      >
        <Select aria-label="Category" placeholder="Category" width={36}>
          <Select.Option id="concerts">Concerts</Select.Option>
          <Select.Option id="festivals">Festivals</Select.Option>
          <Select.Option id="theater">Theater</Select.Option>
        </Select>
        <Select aria-label="Status" placeholder="Status" width={36}>
          <Select.Option id="published">Published</Select.Option>
          <Select.Option id="draft">Draft</Select.Option>
        </Select>
        <Select aria-label="Price" placeholder="Price" width={36}>
          <Select.Option id="lt50">Under 50 €</Select.Option>
          <Select.Option id="gte50">50 € and more</Select.Option>
        </Select>
      </OverflowRegion>
      <Drawer.Trigger>
        <Button>
          All filters
          {hiddenCount > 0 && <Badge variant="primary">{hiddenCount}</Badge>}
        </Button>
        <Drawer closeButton size="xsmall">
          <Drawer.Title>All filters</Drawer.Title>
          <Drawer.Content>
            <Stack space="group">
              <Checkbox.Group label="Category">
                <Checkbox value="concerts" label="Concerts" />
                <Checkbox value="festivals" label="Festivals" />
                <Checkbox value="theater" label="Theater" />
              </Checkbox.Group>
              <NumberField label="Max. price" minValue={0} step={10} />
            </Stack>
          </Drawer.Content>
        </Drawer>
      </Drawer.Trigger>
    </Inline>
  );
};

export const FilterBar = meta.story({
  tags: ['component-test'],
  render: () => (
    <div className="w-[640px]">
      <FilterBarRecipe />
    </div>
  ),
});

FilterBar.test(
  'badges the pinned trigger and keeps demoted filters reachable',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    // The trailing quick filters demote; the pinned trigger badges them.
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
    );
    const trigger = canvas.getByRole('button', { name: /all filters/i });
    await waitFor(() =>
      expect(within(trigger).getByText(/[12]/)).toBeVisible()
    );

    // The demoted filters stay reachable through the panel.
    await userEvent.click(trigger);
    expect(await canvas.findByText('Max. price')).toBeVisible();
    expect(
      await canvas.findByRole('group', { name: 'Category' })
    ).toBeVisible();
  }
);
