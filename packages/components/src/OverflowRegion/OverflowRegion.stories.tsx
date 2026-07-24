import { type FormEvent, useState } from 'react';
import { type Key } from 'react-aria-components/Select';
import { expect, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Drawer } from '../Drawer/Drawer';
import { Form } from '../Form/Form';
import { Inline } from '../Inline/Inline';
import { Menu } from '../Menu/Menu';
import { Radio } from '../Radio/Radio';
import { SearchField } from '../SearchField/SearchField';
import { Select } from '../Select/Select';
import { Stack } from '../Stack/Stack';
import { parseFormData } from '../utils/form.utils';
import {
  OverflowRegion,
  type OverflowRegionProps,
  type OverflowRegionState,
} from './OverflowRegion';

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
const DemoRow = ({
  onOverflowChange,
}: Pick<OverflowRegionProps, 'onOverflowChange'>) => (
  <Inline noWrap space="related" alignY="center">
    <SearchField aria-label="Search events" width={56} />
    {/* Items must be direct children: the region measures and hides them
        individually. */}
    <OverflowRegion
      indicator={({ hiddenCount }) => <Button>More ({hiddenCount})</Button>}
      onOverflowChange={onOverflowChange}
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

// Constrain the width with the Storybook viewport (a real phone frame)
// instead of a wrapper `div`, so the snapshot crops to the small screen and
// the demoted state is what Chromatic captures.
export const Demotion = meta.story({
  tags: ['component-test'],
  globals: { viewport: { value: 'smallScreen' } },
  parameters: { chromatic: { viewports: [639] } },
  render: () => <DemoRow />,
});

Demotion.test(
  'hides trailing items instead of wrapping and shows the indicator',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, step }) => {
    await step(
      'The small-screen viewport applied (otherwise nothing overflows)',
      () => {
        expect(window.innerWidth).toBeLessThan(640);
      }
    );

    await step('The pinned sibling stays visible at any width', () => {
      expect(canvas.getByRole('searchbox')).toBeVisible();
    });

    await step(
      'The trailing (lowest priority) item no longer fits: hidden and removed from the a11y tree',
      async () => {
        await waitFor(() =>
          expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
        );
      }
    );

    await step(
      'The leading item still fits and the indicator reports the hidden count',
      () => {
        expect(canvas.getByRole('button', { name: /category/i })).toBeVisible();
        expect(
          canvas.getByRole('button', { name: /more \(2\)/i })
        ).toBeVisible();
      }
    );
  }
);

Demotion.test(
  'hidden items are removed from the tab order',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    await step('The trailing item is demoted out of view', async () => {
      await waitFor(() =>
        expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
      );
    });

    await step(
      'Tabbing through the row never lands on a hidden item',
      async () => {
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
  }
);

const ResizeDemo = () => {
  const [wide, setWide] = useState(false);
  const [overflow, setOverflow] = useState<OverflowRegionState | null>(null);
  return (
    <Stack space={4}>
      <Button onPress={() => setWide(current => !current)}>Toggle width</Button>
      <div className={wide ? 'w-[900px]' : 'w-[560px]'}>
        <DemoRow onOverflowChange={setOverflow} />
      </div>
      {overflow ? (
        <span>
          {overflow.visibleCount} of {overflow.count} visible
        </span>
      ) : null}
    </Stack>
  );
};

// Interaction-only: the toggle drives the width, so there is no static visual
// difference from Basic/Demotion to snapshot.
export const Resize = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <ResizeDemo />,
});

Resize.test(
  'restores hidden items when space returns',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    await step('Narrow: the trailing item is hidden and reported', async () => {
      await waitFor(() =>
        expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
      );
      expect(canvas.getByText('1 of 3 visible')).toBeVisible();
    });

    await step(
      'Grow: every item fits again and the indicator disappears',
      async () => {
        await userEvent.click(
          canvas.getByRole('button', { name: 'Toggle width' })
        );
        await waitFor(() =>
          expect(canvas.getByRole('button', { name: /price/i })).toBeVisible()
        );
        expect(canvas.queryByRole('button', { name: /more/i })).toBeNull();
        expect(canvas.getByText('3 of 3 visible')).toBeVisible();
      }
    );

    await step('Shrink again: hiding re-applies', async () => {
      await userEvent.click(
        canvas.getByRole('button', { name: 'Toggle width' })
      );
      await waitFor(() =>
        expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
      );
    });
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

// A phone-width viewport forces several links to demote; interaction-only, so
// no snapshot (the "More" menu is exercised by the play test).
export const PriorityNavigation = meta.story({
  tags: ['component-test'],
  globals: { viewport: { value: 'extraSmallScreen' } },
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <nav aria-label="Main">
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
  async ({ canvas, userEvent, step }) => {
    await step('The narrow viewport applied', () => {
      expect(window.innerWidth).toBeLessThan(640);
    });

    await step('Trailing links are hidden, leading ones stay', async () => {
      await waitFor(() =>
        expect(canvas.queryByRole('button', { name: 'Team' })).toBeNull()
      );
      expect(canvas.getByRole('button', { name: 'Dashboard' })).toBeVisible();
    });

    await step('Every hidden link is reachable through the menu', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /more/i }));
      expect(
        await canvas.findByRole('menuitem', { name: 'Team' })
      ).toBeVisible();
      expect(canvas.getByRole('menuitem', { name: 'Settings' })).toBeVisible();
      // Visible links do not show up in the menu.
      expect(canvas.queryByRole('menuitem', { name: 'Dashboard' })).toBeNull();
    });
  }
);

// The filter-bar recipe pairs the two application models from the Filter
// pattern (/patterns/user-input/filter): the quick filters in the bar apply
// *instantly*, while the "All filters" drawer is a *batched* panel that edits
// a draft and only commits on Apply. Both write the same applied state, so a
// quick filter demoted out of the bar stays adjustable in the panel and the
// two never disagree. The badge counts *applied* filters (the common
// convention for filter buttons), not hidden ones: a count that changes with
// the available width would imply the applied filters changed.
const CATEGORY_OPTIONS = [
  { id: 'concerts', label: 'Concerts' },
  { id: 'festivals', label: 'Festivals' },
  { id: 'theater', label: 'Theater' },
];
const STATUS_OPTIONS = [
  { id: 'published', label: 'Published' },
  { id: 'draft', label: 'Draft' },
];
const PRICE_OPTIONS = [
  { id: 'lt50', label: 'Under 50 €' },
  { id: 'gte50', label: '50 € and more' },
];

type Filters = { category: Key | null; status: Key | null; price: Key | null };
type FilterFormData = { category: string; status: string; price: string };

// The batched panel: an uncontrolled draft of the full filter set. It is
// remounted (via `key`) whenever the applied state changes, so `defaultValue`
// always reflects what is currently applied. Nothing here is committed until
// the Apply button submits the form.
const PanelFilters = ({ filters }: { filters: Filters }) => {
  const draft = (name: keyof Filters) =>
    filters[name] != null ? String(filters[name]) : '';
  return (
    <Stack space="group">
      <Radio.Group
        label="Category"
        name="category"
        defaultValue={draft('category')}
      >
        <Radio value="">Any</Radio>
        {CATEGORY_OPTIONS.map(option => (
          <Radio key={option.id} value={option.id}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
      <Radio.Group label="Status" name="status" defaultValue={draft('status')}>
        <Radio value="">Any</Radio>
        {STATUS_OPTIONS.map(option => (
          <Radio key={option.id} value={option.id}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
      <Radio.Group label="Price" name="price" defaultValue={draft('price')}>
        <Radio value="">Any</Radio>
        {PRICE_OPTIONS.map(option => (
          <Radio key={option.id} value={option.id}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </Stack>
  );
};

const FilterBarRecipe = () => {
  // Price starts applied, so the recipe shows a filter that is both demoted
  // out of the bar *and* still reflected in the panel and the badge.
  const [filters, setFilters] = useState<Filters>({
    category: null,
    status: null,
    price: 'lt50',
  });
  const appliedCount = Object.values(filters).filter(Boolean).length;

  // Quick filters commit immediately.
  const setQuick = (name: keyof Filters) => (value: Key | null) =>
    setFilters(current => ({ ...current, [name]: value }));

  // The panel commits its whole draft at once, on Apply.
  const applyPanel = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = parseFormData<FilterFormData>(event);
    setFilters({
      category: data.category || null,
      status: data.status || null,
      price: data.price || null,
    });
  };

  return (
    <Inline noWrap space="related" alignY="center">
      <SearchField aria-label="Search events" width={56} />
      <OverflowRegion>
        <Select
          aria-label="Category"
          placeholder="Category"
          width={36}
          value={filters.category}
          onChange={setQuick('category')}
        >
          {CATEGORY_OPTIONS.map(option => (
            <Select.Option key={option.id} id={option.id}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
        <Select
          aria-label="Status"
          placeholder="Status"
          width={36}
          value={filters.status}
          onChange={setQuick('status')}
        >
          {STATUS_OPTIONS.map(option => (
            <Select.Option key={option.id} id={option.id}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
        <Select
          aria-label="Price"
          placeholder="Price"
          width={36}
          value={filters.price}
          onChange={setQuick('price')}
        >
          {PRICE_OPTIONS.map(option => (
            <Select.Option key={option.id} id={option.id}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </OverflowRegion>
      <Drawer.Trigger>
        <Button>
          All filters
          {appliedCount > 0 && <Badge variant="primary">{appliedCount}</Badge>}
        </Button>
        <Drawer closeButton size="xsmall">
          <Form onSubmit={applyPanel} unstyled>
            <Drawer.Title>All filters</Drawer.Title>
            <Drawer.Content>
              {/* The panel is the canonical full set, so a demoted quick
                  filter stays adjustable here. Remount on applied-state
                  changes so the draft's defaults track what is applied. */}
              <PanelFilters key={JSON.stringify(filters)} filters={filters} />
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

// Phone-width viewport so the trailing quick filters demote; interaction-only
// (the badge/panel sync is covered by the play test), so no snapshot.
export const FilterBar = meta.story({
  tags: ['component-test'],
  globals: { viewport: { value: 'smallScreen' } },
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <FilterBarRecipe />,
});

FilterBar.test(
  'badges applied filters and commits the batched panel on Apply',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent, step }) => {
    await step('The small-screen viewport applied', () => {
      expect(window.innerWidth).toBeLessThan(640);
    });

    await step('The trailing quick filters demote out of the bar', async () => {
      await waitFor(() =>
        expect(canvas.queryByRole('button', { name: /price/i })).toBeNull()
      );
    });

    await step(
      'The badge counts applied filters (price), not hidden ones',
      async () => {
        // Two filters are hidden, but only one (price) is applied.
        const trigger = canvas.getByRole('button', { name: /all filters/i });
        await waitFor(() =>
          expect(within(trigger).getByText('1')).toBeVisible()
        );
      }
    );

    await step(
      'The panel opens with the applied filter reflected in its draft',
      async () => {
        await userEvent.click(
          canvas.getByRole('button', { name: /all filters/i })
        );
        const dialog = await canvas.findByRole('dialog');

        // The applied price is preselected in the draft (not blank) — the
        // inconsistency this recipe now avoids. The demoted category filter
        // is reachable here and still unset.
        expect(
          within(dialog).getByRole('radio', { name: /under 50/i })
        ).toBeChecked();
        expect(
          within(dialog).getByRole('radiogroup', { name: /category/i })
        ).toBeVisible();
      }
    );

    await step(
      'Editing the draft does not change results until Apply commits it',
      async () => {
        const dialog = canvas.getByRole('dialog');
        const trigger = canvas.getByRole('button', { name: /all filters/i });

        // Pick a category in the draft: the badge stays at 1 (batched, not
        // instant like the bar).
        await userEvent.click(
          within(dialog).getByRole('radio', { name: 'Concerts' })
        );
        expect(within(trigger).getByText('1')).toBeVisible();

        // Apply commits the whole draft at once: category joins price.
        await userEvent.click(
          within(dialog).getByRole('button', { name: 'Apply' })
        );
        await waitFor(() =>
          expect(within(trigger).getByText('2')).toBeVisible()
        );
      }
    );
  }
);
