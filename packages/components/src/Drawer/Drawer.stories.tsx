import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import type { Key } from '@react-types/shared';
import { Accordion } from '../Accordion/Accordion';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Collapsible } from '../Collapsible/Collapsible';
import { Description } from '../Description/Description';
import { Divider } from '../Divider/Divider';
import { Form } from '../Form/Form';
import { Inline } from '../Inline/Inline';
import { Pagination } from '../Pagination/Pagination';
import { Scrollable } from '../Scrollable/Scrollable';
import { SearchField } from '../SearchField/SearchField';
import { Select } from '../Select/Select';
import { SelectList } from '../SelectList/SelectList';
import { Slider } from '../Slider/Slider';
import { Split } from '../Split/Split';
import { Stack } from '../Stack/Stack';
import { Tabs } from '../Tabs/Tabs';
import { TagField } from '../TagField/TagField';
import { Tag } from '../TagGroup/Tag';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { TextValue } from '../TextValue/TextValue';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { Drawer } from './Drawer';

const meta = preview.meta({
  title: 'Components/Drawer',
  component: Drawer,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      description: 'The size of the drawer on the screen.',
      options: ['xsmall', 'small', 'medium'],
    },
  },
  args: {},
});

export const Basic = meta.story({
  render: args => (
    <Stack space={8} alignX="left">
      <Drawer.Trigger>
        <Button>Open Drawer</Button>
        <Drawer {...args}>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Content>
            <p className="pb-4">
              Once upon a time in the quirky world of web design, there lived a
              lively Drawer Component named Daria. Unlike her staid companions,
              she loved to make a grand entrance by sliding in from the left,
              declaring, "Surprise! I've got filters and puns galore!"
            </p>

            <p className="pb-4">
              Every time a user clicked, Daria would pop out with flair, showing
              off her hidden treasures while her neighboring components—Header
              the Bold and Footer the Wise—watched in amused awe. They’d chuckle
              as Daria’s witty remarks filled the space between content
              sections.
            </p>

            <p className="pb-4">
              One day, Daria got a bit too excited. In a burst of enthusiasm,
              she slid out so fast that she disrupted the perfect grid layout!
              The Main Content, usually so composed, was thrown into disarray,
              muttering about lost pixels and wayward margins.
            </p>

            <p className="pb-4">
              But instead of sulking, Daria quipped, "Looks like I just broke
              the grid—guess I'm too stylish to be confined!" The users,
              entertained by her antics, cheered on as she restored order with a
              graceful slide back, proving that even a mischievous drawer could
              be the hero of responsive design.
            </p>
          </Drawer.Content>
          <Drawer.Actions>
            <Button slot="close">Close</Button>
            <Button
              slot="close"
              variant="primary"
              onPress={() => alert('Drawer will be closed')}
            >
              Save
            </Button>
          </Drawer.Actions>
        </Drawer>
      </Drawer.Trigger>
      <TextField
        label="Name"
        description="Can you interact with me when the drawer is open?"
        width={80}
      />
    </Stack>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Drawer' }));
    await waitFor(() =>
      expect(canvas.getByText('Drawer Title')).toBeInTheDocument()
    );

    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
  },
});

export const WithForms = meta.story({
  parameters: { surface: false },
  render: args => (
    <Drawer.Trigger>
      <Button>Configure Filter</Button>
      <Drawer {...args}>
        <Form unstyled>
          <Drawer.Title>Filter</Drawer.Title>
          <Drawer.Content>
            <Stack space={8}>
              <Slider
                label="Price"
                formatOptions={{ style: 'currency', currency: 'EUR' }}
                minValue={10}
                maxValue={140}
                defaultValue={[30, 60]}
                thumbLabels={['min', 'max']}
              />
              <Select label="Category">
                <Select.Option id="all">All</Select.Option>
                <Select.Option id="classic">Classic</Select.Option>
                <Select.Option id="rock">Rock</Select.Option>
                <Select.Option id="pop">Pop</Select.Option>
                <Select.Option id="jazz">Jazz</Select.Option>
              </Select>
              <Checkbox.Group label="Amenities">
                <Checkbox label="Fast Lane" value="fast-lane" />
                <Checkbox label="VIP Parking" value="parking" />
              </Checkbox.Group>
            </Stack>
          </Drawer.Content>
          <Drawer.Actions>
            <Button slot="close">Close</Button>
            <Button
              slot="close"
              variant="primary"
              onPress={() => alert('Apply filters and close dialog')}
            >
              Apply
            </Button>
          </Drawer.Actions>
        </Form>
      </Drawer>
    </Drawer.Trigger>
  ),
});

export const LongContent = meta.story({
  tags: ['component-test'],
  globals: {
    viewport: { value: 'smallScreen' },
  },
  render: args => (
    <Drawer.Trigger>
      <Button>Open Drawer</Button>
      <Drawer {...args}>
        <Drawer.Title>Long Content</Drawer.Title>
        <Drawer.Content>
          <Stack space={4}>
            {Array.from({ length: 16 }, (_, i) => (
              <p key={i}>
                Paragraph #{i + 1}. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            ))}
            <p data-testid="end-of-content">End of content</p>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
          <Button slot="close" variant="primary">
            Save
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  ),
  play: async ({ canvas, userEvent }) => {
    expect(window.innerWidth).toBeLessThan(640);

    const trigger = canvas.getByRole('button', { name: 'Open Drawer' });
    await userEvent.click(trigger);
    const endMarker = await canvas.findByTestId('end-of-content');
    const scrollContainer = endMarker.closest(
      '[class*="ui-panel-content"]'
    ) as HTMLElement;
    const isWithin = (child: Element, parent: Element) => {
      const c = child.getBoundingClientRect();
      const p = parent.getBoundingClientRect();
      return c.top >= p.top && c.bottom <= p.bottom + 1;
    };

    // Mobile path renders role="dialog"; desktop NonModal renders
    // role="complementary". If useSmallScreen flakes, fail loudly here
    // rather than pass a test that didn't exercise the fix.
    expect(endMarker.closest('section')?.getAttribute('role')).toBe('dialog');

    // react-aria's focus-on-open may auto-scroll the content; reset first.
    scrollContainer.scrollTop = 0;

    // The bug let content grow the Drawer instead of clipping it, so
    // `scrollHeight` collapsed to `clientHeight`.
    expect(scrollContainer.scrollHeight).toBeGreaterThan(
      scrollContainer.clientHeight
    );
    await waitFor(() => {
      expect(isWithin(endMarker, scrollContainer)).toBe(false);
    });

    scrollContainer.scrollTop = scrollContainer.scrollHeight;

    await waitFor(() => {
      expect(isWithin(endMarker, scrollContainer)).toBe(true);
    });
  },
});

export const Controlled = meta.story({
  parameters: { surface: false },
  render: args => {
    const [open, setOpen] = useState(false);
    const onOpenChange = (open: boolean) => {
      setOpen(open);
    };
    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger open={open} onOpenChange={onOpenChange}>
          <Button>Open Drawer</Button>
          <Drawer {...args}>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Content>Drawer Content</Drawer.Content>
            <Drawer.Actions>
              <Button slot="close">Close</Button>
              <Button variant="primary">Apply</Button>
            </Drawer.Actions>
          </Drawer>
        </Drawer.Trigger>
        <pre>Drawer is {open ? 'open' : 'closed'}</pre>
      </Stack>
    );
  },
});

/** Opening a second Drawer while one is open dismisses the first. */
export const OneAtATime = meta.story({
  tags: ['component-test'],
  parameters: { surface: false },
  render: args => (
    <Stack space={8} alignX="left">
      <Drawer.Trigger>
        <Button>Open A</Button>
        <Drawer {...args}>
          <Drawer.Title>Title A</Drawer.Title>
          <Drawer.Content>Content A</Drawer.Content>
        </Drawer>
      </Drawer.Trigger>
      <Drawer.Trigger>
        <Button>Open B</Button>
        <Drawer {...args}>
          <Drawer.Title>Title B</Drawer.Title>
          <Drawer.Content>Content B</Drawer.Content>
        </Drawer>
      </Drawer.Trigger>
    </Stack>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open A' }));
    expect(await canvas.findByText('Title A')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Open B' }));
    expect(await canvas.findByText('Title B')).toBeInTheDocument();

    await waitFor(() =>
      expect(canvas.queryByText('Title A')).not.toBeInTheDocument()
    );

    // ESC closes only the visible drawer.
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(canvas.queryByText('Title B')).not.toBeInTheDocument()
    );
  },
});

/**
 * DST-1407: A trigger nested inside an open Drawer opens a second Drawer over
 * the first. The parent stays mounted because dismissing it would also tear
 * down the nested trigger and the new Drawer with it. "One at a time" still
 * holds between sibling Drawers — only nested pairs are allowed to stack.
 */
export const OneAtATimeNested = meta.story({
  tags: ['component-test'],
  parameters: { surface: false },
  render: args => (
    <Drawer.Trigger>
      <Button>Open A</Button>
      <Drawer {...args} closeButton>
        <Drawer.Title>Title A</Drawer.Title>
        <Drawer.Content>
          <Drawer.Trigger>
            <Button>Open B</Button>
            <Drawer {...args} closeButton>
              <Drawer.Title>Title B</Drawer.Title>
              <Drawer.Content>Content B</Drawer.Content>
            </Drawer>
          </Drawer.Trigger>
        </Drawer.Content>
      </Drawer>
    </Drawer.Trigger>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open A' }));
    expect(await canvas.findByText('Title A')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Open B' }));
    expect(await canvas.findByText('Title B')).toBeInTheDocument();

    // Parent stays open underneath the nested Drawer.
    expect(canvas.getByText('Title A')).toBeInTheDocument();

    // ESC closes only the topmost (nested) Drawer.
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(canvas.queryByText('Title B')).not.toBeInTheDocument()
    );
    expect(canvas.getByText('Title A')).toBeInTheDocument();
  },
});

/* -------------------------------------------------------------------------
 * Entity Multiselect Filter — EXPLORATION (will be reduced to the preferred
 * solution once one is picked).
 *
 * Counter-proposal to the Reporting Tool's custom "Event-Multiselect"
 * (https://reservix.atlassian.net/wiki/x/GoAMGgE), built exclusively from
 * Marigold primitives. The doc's acceptance criteria:
 *
 *  1. Rich rows: name, date + time, venue, event type, group/event/venue IDs
 *     must be readable at a glance to disambiguate near-identical events.
 *  2. Type narrowing (single event / season ticket / subscription) INSIDE
 *     the event filter, not as a separate global filter.
 *  3. Search by name, ID, and date inside the event filter.
 *  4. Selected events stay visible INSIDE the filter with full metadata and
 *     can be deselected individually in context.
 *  5. Reset per filter: clear only the event selection, other filters stay.
 *  6. Works with large datasets (pagination vs. scroll is an open question).
 *
 * Every story below stages its changes (Apply/Cancel in Drawer.Actions) and
 * renders an applied-filter summary behind the drawer so Apply is
 * observable. Drawer is `medium` (384px) — the narrowest realistic host.
 * ------------------------------------------------------------------------- */

type EventType = 'single' | 'season' | 'subscription';

interface EventItem {
  /** Single-event ID ("ID Einzeltermin") */
  id: string;
  /** Event group ID ("ID Gruppe") */
  groupId: string;
  /** Venue ID ("ID Spielstätte") */
  venueId: string;
  type: EventType;
  name: string;
  /** ISO date; for season tickets/subscriptions the "valid from" date. */
  date: string;
  time: string;
  venue: string;
}

const event = (
  id: string,
  groupId: string,
  venueId: string,
  type: EventType,
  name: string,
  date: string,
  time: string,
  venue: string
): EventItem => ({ id, groupId, venueId, type, name, date, time, venue });

/**
 * 50 events including the doc's hard cases: one production with six
 * near-identical dates, the same play at two venues on the same evening,
 * football matches plus season tickets in the same context, rebookings,
 * placeholders, and two different events on the same night at the same venue.
 */
const EVENTS: EventItem[] = [
  // Midsummer Open Air — one group, six near-identical dates
  event(
    'E-90101',
    'G-5001',
    'V-201',
    'single',
    'Midsummer Open Air 2026',
    '2026-06-26',
    '19:30',
    'Riverside Park'
  ),
  event(
    'E-90102',
    'G-5001',
    'V-201',
    'single',
    'Midsummer Open Air 2026',
    '2026-07-03',
    '19:30',
    'Riverside Park'
  ),
  event(
    'E-90103',
    'G-5001',
    'V-201',
    'single',
    'Midsummer Open Air 2026',
    '2026-07-10',
    '19:30',
    'Riverside Park'
  ),
  event(
    'E-90104',
    'G-5001',
    'V-201',
    'single',
    'Midsummer Open Air 2026',
    '2026-07-17',
    '19:30',
    'Riverside Park'
  ),
  event(
    'E-90105',
    'G-5001',
    'V-201',
    'single',
    'Midsummer Open Air 2026',
    '2026-07-24',
    '19:30',
    'Riverside Park'
  ),
  event(
    'E-90106',
    'G-5001',
    'V-201',
    'single',
    'Midsummer Open Air 2026 — Rain date (placeholder)',
    '2026-07-31',
    '19:30',
    'Riverside Park'
  ),
  // The Magic Flute — same production, two venues
  event(
    'E-90111',
    'G-5002',
    'V-105',
    'single',
    'The Magic Flute',
    '2026-09-04',
    '19:00',
    'Grand Opera House'
  ),
  event(
    'E-90112',
    'G-5002',
    'V-105',
    'single',
    'The Magic Flute',
    '2026-09-05',
    '19:00',
    'Grand Opera House'
  ),
  event(
    'E-90113',
    'G-5002',
    'V-118',
    'single',
    'The Magic Flute',
    '2026-09-18',
    '19:00',
    'Festival Hall'
  ),
  event(
    'E-90114',
    'G-5002',
    'V-118',
    'single',
    'The Magic Flute',
    '2026-09-19',
    '19:00',
    'Festival Hall'
  ),
  // Romeo & Juliet — two venues on the SAME evening
  event(
    'E-90121',
    'G-5003',
    'V-112',
    'single',
    'Romeo & Juliet',
    '2026-09-12',
    '19:30',
    'City Theatre'
  ),
  event(
    'E-90122',
    'G-5003',
    'V-119',
    'single',
    'Romeo & Juliet',
    '2026-09-12',
    '19:30',
    'Harbor Stage'
  ),
  event(
    'E-90123',
    'G-5003',
    'V-112',
    'single',
    'Romeo & Juliet',
    '2026-09-26',
    '19:30',
    'City Theatre'
  ),
  // Jazz Nights — monthly series
  event(
    'E-90131',
    'G-5004',
    'V-150',
    'single',
    'Jazz Nights',
    '2026-07-09',
    '20:00',
    'Blue Note Club'
  ),
  event(
    'E-90132',
    'G-5004',
    'V-150',
    'single',
    'Jazz Nights',
    '2026-08-13',
    '20:00',
    'Blue Note Club'
  ),
  event(
    'E-90133',
    'G-5004',
    'V-150',
    'single',
    'Jazz Nights',
    '2026-09-10',
    '20:00',
    'Blue Note Club'
  ),
  event(
    'E-90134',
    'G-5004',
    'V-150',
    'single',
    'Jazz Nights',
    '2026-10-08',
    '20:00',
    'Blue Note Club'
  ),
  event(
    'E-90135',
    'G-5004',
    'V-150',
    'single',
    'Jazz Nights',
    '2026-11-12',
    '20:00',
    'Blue Note Club'
  ),
  // FC Rivertown — home matches, rebooking, placeholder, season tickets
  event(
    'E-90201',
    'G-6001',
    'V-301',
    'single',
    'FC Rivertown vs. Eastport United',
    '2026-08-08',
    '15:30',
    'Rivertown Arena'
  ),
  event(
    'E-90202',
    'G-6001',
    'V-301',
    'single',
    'FC Rivertown vs. Northfield 04',
    '2026-08-22',
    '15:30',
    'Rivertown Arena'
  ),
  event(
    'E-90203',
    'G-6001',
    'V-301',
    'single',
    'FC Rivertown vs. SV Lakewood',
    '2026-09-05',
    '15:30',
    'Rivertown Arena'
  ),
  event(
    'E-90204',
    'G-6001',
    'V-301',
    'single',
    'FC Rivertown vs. Harbor City FC',
    '2026-09-19',
    '15:30',
    'Rivertown Arena'
  ),
  event(
    'E-90205',
    'G-6001',
    'V-301',
    'single',
    'FC Rivertown vs. Old Mill Rovers',
    '2026-10-03',
    '15:30',
    'Rivertown Arena'
  ),
  event(
    'E-90206',
    'G-6001',
    'V-301',
    'single',
    'FC Rivertown vs. Westgate Athletic',
    '2026-10-24',
    '15:30',
    'Rivertown Arena'
  ),
  event(
    'E-90207',
    'G-6001',
    'V-301',
    'single',
    'FC Rivertown vs. Southbridge Town (rebooked from 17 Oct)',
    '2026-11-07',
    '15:30',
    'Rivertown Arena'
  ),
  event(
    'E-90208',
    'G-6001',
    'V-301',
    'single',
    'FC Rivertown vs. Eastport United (cup, placeholder date)',
    '2026-11-28',
    '15:30',
    'Rivertown Arena'
  ),
  event(
    'E-90211',
    'G-6002',
    'V-301',
    'season',
    'FC Rivertown Season Ticket 2026/27',
    '2026-08-01',
    '—',
    'Rivertown Arena'
  ),
  event(
    'E-90212',
    'G-6003',
    'V-301',
    'season',
    'FC Rivertown Half-Season Ticket — Autumn 2026',
    '2026-08-01',
    '—',
    'Rivertown Arena'
  ),
  // Other season passes
  event(
    'E-90213',
    'G-6004',
    'V-205',
    'season',
    'Climbing Park Season Pass 2026',
    '2026-04-01',
    '—',
    'Adventure Climbing Park'
  ),
  event(
    'E-90214',
    'G-6005',
    'V-130',
    'season',
    'City Museum Annual Pass 2026',
    '2026-01-01',
    '—',
    'City Museum'
  ),
  // Subscriptions
  event(
    'E-90301',
    'G-7001',
    'V-105',
    'subscription',
    'Premiere Subscription A 2026/27',
    '2026-09-01',
    '—',
    'Grand Opera House'
  ),
  event(
    'E-90302',
    'G-7002',
    'V-105',
    'subscription',
    'Premiere Subscription B 2026/27',
    '2026-09-01',
    '—',
    'Grand Opera House'
  ),
  event(
    'E-90303',
    'G-7003',
    'V-118',
    'subscription',
    'Concert Subscription — Symphony Series 2026/27',
    '2026-10-01',
    '—',
    'Festival Hall'
  ),
  event(
    'E-90304',
    'G-7004',
    'V-112',
    'subscription',
    'Family Theatre Subscription 2026',
    '2026-09-15',
    '—',
    'City Theatre'
  ),
  // Single highlights — incl. two events on the same night at the same venue
  event(
    'E-90401',
    'G-8001',
    'V-118',
    'single',
    "Beethoven's Ninth — New Year's Eve Concert",
    '2026-12-31',
    '18:00',
    'Festival Hall'
  ),
  event(
    'E-90402',
    'G-8002',
    'V-118',
    'single',
    "New Year's Eve Gala Dinner Concert",
    '2026-12-31',
    '20:00',
    'Festival Hall'
  ),
  event(
    'E-90403',
    'G-8003',
    'V-112',
    'single',
    'Hamlet',
    '2026-10-17',
    '19:30',
    'City Theatre'
  ),
  event(
    'E-90404',
    'G-8004',
    'V-105',
    'single',
    'Swan Lake',
    '2026-11-21',
    '18:00',
    'Grand Opera House'
  ),
  event(
    'E-90405',
    'G-8005',
    'V-201',
    'single',
    'Electro Nights Festival — Day 1',
    '2026-07-04',
    '16:00',
    'Riverside Park'
  ),
  event(
    'E-90406',
    'G-8005',
    'V-201',
    'single',
    'Electro Nights Festival — Day 2',
    '2026-07-05',
    '16:00',
    'Riverside Park'
  ),
  event(
    'E-90407',
    'G-8006',
    'V-119',
    'single',
    'Winter Circus Gala',
    '2026-12-12',
    '17:00',
    'Harbor Stage'
  ),
  event(
    'E-90408',
    'G-8007',
    'V-118',
    'single',
    'Christmas Oratorio',
    '2026-12-19',
    '19:00',
    'Festival Hall'
  ),
  event(
    'E-90409',
    'G-8008',
    'V-112',
    'single',
    "A Midsummer Night's Dream",
    '2026-08-14',
    '19:30',
    'City Theatre'
  ),
  event(
    'E-90410',
    'G-8009',
    'V-150',
    'single',
    'Wine & Jazz Evening',
    '2026-09-25',
    '19:00',
    'Blue Note Club'
  ),
  event(
    'E-90411',
    'G-8010',
    'V-119',
    'single',
    "Kids' Puppet Theatre: The Brave Little Tailor",
    '2026-09-06',
    '11:00',
    'Harbor Stage'
  ),
  event(
    'E-90412',
    'G-8011',
    'V-201',
    'single',
    'Open-Air Cinema: Classics Night',
    '2026-08-21',
    '21:00',
    'Riverside Park'
  ),
  event(
    'E-90413',
    'G-8012',
    'V-150',
    'single',
    'Stand-up Special — Marc Reed (rebooked from 14 Mar)',
    '2026-10-02',
    '20:00',
    'Blue Note Club'
  ),
  event(
    'E-90414',
    'G-8013',
    'V-201',
    'single',
    'Placeholder — Summer Special (date TBA)',
    '2026-08-29',
    '19:00',
    'Riverside Park'
  ),
  event(
    'E-90415',
    'G-8014',
    'V-150',
    'single',
    'Comedy Club Open Mic',
    '2026-07-21',
    '20:00',
    'Blue Note Club'
  ),
  event(
    'E-90416',
    'G-8014',
    'V-150',
    'single',
    'Comedy Club Open Mic',
    '2026-08-18',
    '20:00',
    'Blue Note Club'
  ),
].sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name));

const EVENT_TYPE_LABEL: Record<EventType, string> = {
  single: 'Single event',
  season: 'Season ticket',
  subscription: 'Subscription',
};

const EVENT_TYPE_LABEL_PLURAL: Record<EventType, string> = {
  single: 'Single events',
  season: 'Season tickets',
  subscription: 'Subscriptions',
};

const EVENT_TYPE_BADGE: Record<EventType, 'info' | 'success' | 'warning'> = {
  single: 'info',
  season: 'success',
  subscription: 'warning',
};

const formatEventDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

/** First line of an option's description: when & where. */
const eventDateLine = (item: EventItem) =>
  item.type === 'single'
    ? `${formatEventDate(item.date)} · ${item.time} · ${item.venue}`
    : `Valid from ${formatEventDate(item.date)} · ${item.venue}`;

type EventTypeFilter = EventType | 'all';

/** Search by name, ID (event/group/venue), venue, or date — criteria 2 + 3. */
const searchEvents = (query: string, type: EventTypeFilter): EventItem[] => {
  const q = query.trim().toLowerCase();
  return EVENTS.filter(item => {
    if (type !== 'all' && item.type !== type) return false;
    if (!q) return true;
    return [
      item.name,
      item.id,
      item.groupId,
      item.venueId,
      item.venue,
      item.date,
      formatEventDate(item.date),
    ]
      .join(' ')
      .toLowerCase()
      .includes(q);
  });
};

const eventsFromKeys = (keys: string[]) =>
  EVENTS.filter(item => keys.includes(item.id));

/**
 * Several stories render multiple lists that share one selection. A list's
 * `onChange` only reliably reflects keys of its own items, so merge: keep
 * the previous selection for foreign keys, take the new state for own keys.
 */
const mergeSelection = (prev: string[], ownIds: string[], next: string[]) => [
  ...prev.filter(key => !ownIds.includes(key)),
  ...next.filter(key => ownIds.includes(key)),
];

/** Rich option content — criterion 1 (full metadata at a glance). */
const EventRowContent = ({
  item,
  showTypeBadge = true,
}: {
  item: EventItem;
  showTypeBadge?: boolean;
}) => (
  <>
    <TextValue>
      <Inline space={2} alignY="center">
        {item.name}
        {showTypeBadge && (
          <Badge variant={EVENT_TYPE_BADGE[item.type]}>
            {EVENT_TYPE_LABEL[item.type]}
          </Badge>
        )}
      </Inline>
    </TextValue>
    <Description>
      <span className="block">{eventDateLine(item)}</span>
      <span className="block">
        {item.groupId} · {item.id} · {item.venueId}
      </span>
    </Description>
  </>
);

const eventTextValue = (item: EventItem) =>
  `${item.name} · ${formatEventDate(item.date)}`;

const renderEventOption = (item: EventItem) => (
  <SelectList.Option id={item.id} textValue={eventTextValue(item)}>
    <EventRowContent item={item} />
  </SelectList.Option>
);

const renderEventOptionPlain = (item: EventItem) => (
  <SelectList.Option id={item.id} textValue={eventTextValue(item)}>
    <EventRowContent item={item} showTypeBadge={false} />
  </SelectList.Option>
);

/** Staged (apply/cancel) event selection — criterion 5 via `reset`. */
const useStagedEvents = () => {
  const [applied, setApplied] = useState<string[]>([]);
  const [draft, setDraft] = useState<string[]>([]);
  return {
    applied,
    draft,
    setDraft,
    apply: () => setApplied(draft),
    cancel: () => setDraft(applied),
    reset: () => setDraft([]),
  };
};

const TYPE_OPTIONS: { id: EventTypeFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'single', label: 'Single' },
  { id: 'season', label: 'Season' },
  { id: 'subscription', label: 'Subscription' },
];

/** Type narrowing INSIDE the event filter — criterion 2. */
const EventTypeToggle = ({
  value,
  onChange,
}: {
  value: EventTypeFilter;
  onChange: (value: EventTypeFilter) => void;
}) => (
  <ToggleButton.Group
    selectionMode="single"
    disallowEmptySelection
    selectedKeys={[value]}
    onSelectionChange={keys =>
      onChange(([...keys][0] ?? 'all') as EventTypeFilter)
    }
    size="small"
    aria-label="Event type"
  >
    {TYPE_OPTIONS.map(option => (
      <ToggleButton key={option.id} id={option.id}>
        {option.label}
      </ToggleButton>
    ))}
  </ToggleButton.Group>
);

/** Header row of the event filter with count + per-filter reset (crit. 5). */
const EventFilterHeader = ({
  count,
  onReset,
}: {
  count: number;
  onReset: () => void;
}) => (
  <Inline space={2} alignY="center">
    <Text weight="medium">Events</Text>
    {count > 0 && <Badge variant="primary">{count} selected</Badge>}
    <Split />
    <Button
      variant="ghost"
      size="small"
      onPress={onReset}
      disabled={count === 0}
    >
      Reset
    </Button>
  </Inline>
);

/**
 * Surrounding filter dimensions (kept identical across all versions). They
 * exist so per-filter reset and "orientation among many filters" are
 * demonstrable — resetting events must NOT touch these.
 */
const useContextFilters = () => {
  const [period, setPeriod] = useState<Key | null>('next-90');
  const [category, setCategory] = useState<Key | null>('all');
  return { period, setPeriod, category, setCategory };
};

const ContextFilters = ({
  period,
  setPeriod,
  category,
  setCategory,
}: ReturnType<typeof useContextFilters>) => (
  <Stack space={4}>
    <Select label="Period" selectedKey={period} onChange={setPeriod}>
      <Select.Option id="next-30">Next 30 days</Select.Option>
      <Select.Option id="next-90">Next 90 days</Select.Option>
      <Select.Option id="2026">All of 2026</Select.Option>
    </Select>
    <Select label="Category" selectedKey={category} onChange={setCategory}>
      <Select.Option id="all">All categories</Select.Option>
      <Select.Option id="music">Music</Select.Option>
      <Select.Option id="sport">Sport</Select.Option>
      <Select.Option id="theatre">Theatre</Select.Option>
    </Select>
  </Stack>
);

/** Rendered behind the drawer so "Apply" has an observable effect. */
const AppliedSummary = ({ applied }: { applied: string[] }) => (
  <Stack space={1}>
    <Text weight="medium">Report filter</Text>
    {applied.length === 0 ? (
      <Text variant="muted">No events selected.</Text>
    ) : (
      <Text variant="muted">
        {applied.length} {applied.length === 1 ? 'event' : 'events'} applied:{' '}
        {eventsFromKeys(applied)
          .slice(0, 3)
          .map(item => item.name)
          .join(', ')}
        {applied.length > 3 ? ', …' : ''}
      </Text>
    )}
  </Stack>
);

const FilterDrawerActions = ({
  onApply,
  onCancel,
}: {
  onApply: () => void;
  onCancel: () => void;
}) => (
  <Drawer.Actions>
    <Button slot="close" onPress={onCancel}>
      Cancel
    </Button>
    <Button slot="close" variant="primary" onPress={onApply}>
      Apply
    </Button>
  </Drawer.Actions>
);

/**
 * **V1 — TagField (the closest existing primitive).**
 *
 * `TagField` already is a searchable multiselect whose selected values live
 * inside the control. Options carry the full metadata (criteria 1–3 via rich
 * options + built-in search), and the virtualized list handles large data.
 *
 * Trade-off: selected values collapse to compact tags — name + date only, no
 * venue/IDs (criterion 4 only partially met). This version marks the
 * baseline: what you get for free today, and exactly where the gap is.
 */
export const EventFilterTagField = meta.story({
  parameters: { surface: false },
  render: function Render(args) {
    const staged = useStagedEvents();
    const context = useContextFilters();
    const [type, setType] = useState<EventTypeFilter>('all');
    const visible = searchEvents('', type);

    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger>
          <Button>Filter report</Button>
          <Drawer {...args}>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={6}>
                <ContextFilters {...context} />
                <Divider />
                <EventFilterHeader
                  count={staged.draft.length}
                  onReset={staged.reset}
                />
                <EventTypeToggle value={type} onChange={setType} />
                <TagField
                  label="Events"
                  description="Search by name or date."
                  items={visible}
                  value={staged.draft}
                  onChange={keys => staged.setDraft(keys as string[])}
                  emptyState={<Text>No matching events.</Text>}
                >
                  {(item: EventItem) => (
                    <TagField.Option
                      id={item.id}
                      textValue={eventTextValue(item)}
                    >
                      <EventRowContent item={item} />
                    </TagField.Option>
                  )}
                </TagField>
              </Stack>
            </Drawer.Content>
            <FilterDrawerActions
              onApply={staged.apply}
              onCancel={staged.cancel}
            />
          </Drawer>
        </Drawer.Trigger>
        <AppliedSummary applied={staged.applied} />
      </Stack>
    );
  },
});

/**
 * **V2 — Searchable inline list.**
 *
 * `SearchField` + `EventTypeToggle` + a multiselect `SelectList` capped by
 * `Scrollable`, so search and type stay visible while the list scrolls.
 * Selected rows keep their checkbox state in place — full metadata stays
 * readable for selected items (criteria 1–5), but they are interleaved with
 * unselected rows, so reviewing the selection means scrolling.
 */
export const EventFilterSearchableList = meta.story({
  parameters: { surface: false },
  render: function Render(args) {
    const staged = useStagedEvents();
    const context = useContextFilters();
    const [query, setQuery] = useState('');
    const [type, setType] = useState<EventTypeFilter>('all');
    const visible = searchEvents(query, type);

    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger>
          <Button>Filter report</Button>
          <Drawer {...args}>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={6}>
                <ContextFilters {...context} />
                <Divider />
                <Stack space={3}>
                  <EventFilterHeader
                    count={staged.draft.length}
                    onReset={staged.reset}
                  />
                  <SearchField
                    aria-label="Search events"
                    placeholder="Search by name, ID, or date"
                    value={query}
                    onChange={setQuery}
                  />
                  <EventTypeToggle value={type} onChange={setType} />
                  <Text variant="muted" fontSize="xs">
                    {visible.length} of {EVENTS.length} events
                  </Text>
                  <Scrollable height="320px">
                    <SelectList
                      aria-label="Events"
                      selectionMode="multiple"
                      items={visible}
                      selectedKeys={staged.draft}
                      onChange={keys =>
                        staged.setDraft(
                          mergeSelection(
                            staged.draft,
                            visible.map(item => item.id),
                            keys as string[]
                          )
                        )
                      }
                      emptyState={<Text>No events match your search.</Text>}
                    >
                      {renderEventOption}
                    </SelectList>
                  </Scrollable>
                </Stack>
              </Stack>
            </Drawer.Content>
            <FilterDrawerActions
              onApply={staged.apply}
              onCancel={staged.cancel}
            />
          </Drawer>
        </Drawer.Trigger>
        <AppliedSummary applied={staged.applied} />
      </Stack>
    );
  },
});

/**
 * **V3 — Pinned selection.**
 *
 * Strongest match for criterion 4: selected events are pinned as a bordered
 * list at the top of the filter with full metadata; unchecking removes them
 * in place. Below, the searchable list shows only unselected matches, so
 * nothing appears twice. Costs vertical space when many events are selected.
 */
export const EventFilterPinnedSelection = meta.story({
  parameters: { surface: false },
  render: function Render(args) {
    const staged = useStagedEvents();
    const context = useContextFilters();
    const [query, setQuery] = useState('');
    const [type, setType] = useState<EventTypeFilter>('all');
    const selectedEvents = eventsFromKeys(staged.draft);
    const available = searchEvents(query, type).filter(
      item => !staged.draft.includes(item.id)
    );

    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger>
          <Button>Filter report</Button>
          <Drawer {...args}>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={6}>
                <ContextFilters {...context} />
                <Divider />
                <Stack space={3}>
                  <EventFilterHeader
                    count={staged.draft.length}
                    onReset={staged.reset}
                  />
                  {selectedEvents.length > 0 ? (
                    <SelectList
                      aria-label="Selected events"
                      variant="bordered"
                      selectionMode="multiple"
                      items={selectedEvents}
                      selectedKeys={staged.draft}
                      onChange={keys =>
                        staged.setDraft(
                          mergeSelection(
                            staged.draft,
                            selectedEvents.map(item => item.id),
                            keys as string[]
                          )
                        )
                      }
                    >
                      {renderEventOption}
                    </SelectList>
                  ) : (
                    <Text variant="muted" fontSize="sm">
                      Nothing selected yet — pick events below.
                    </Text>
                  )}
                  <Divider />
                  <SearchField
                    aria-label="Search events"
                    placeholder="Search by name, ID, or date"
                    value={query}
                    onChange={setQuery}
                  />
                  <EventTypeToggle value={type} onChange={setType} />
                  <Scrollable height="260px">
                    <SelectList
                      aria-label="Available events"
                      selectionMode="multiple"
                      items={available}
                      selectedKeys={staged.draft}
                      onChange={keys =>
                        staged.setDraft(
                          mergeSelection(
                            staged.draft,
                            available.map(item => item.id),
                            keys as string[]
                          )
                        )
                      }
                      emptyState={<Text>No events match your search.</Text>}
                    >
                      {renderEventOption}
                    </SelectList>
                  </Scrollable>
                </Stack>
              </Stack>
            </Drawer.Content>
            <FilterDrawerActions
              onApply={staged.apply}
              onCancel={staged.cancel}
            />
          </Drawer>
        </Drawer.Trigger>
        <AppliedSummary applied={staged.applied} />
      </Stack>
    );
  },
});

/**
 * **V4 — Collapsible selection.**
 *
 * Like V3, but the pinned selection sits inside a `Collapsible` ("Selected
 * (n)"), so a large selection can be folded away while searching — the
 * space-cost fix for V3's main weakness. The count in the trigger keeps the
 * selection visible even when collapsed.
 */
export const EventFilterCollapsibleSelection = meta.story({
  parameters: { surface: false },
  render: function Render(args) {
    const staged = useStagedEvents();
    const context = useContextFilters();
    const [query, setQuery] = useState('');
    const [type, setType] = useState<EventTypeFilter>('all');
    const selectedEvents = eventsFromKeys(staged.draft);
    const available = searchEvents(query, type).filter(
      item => !staged.draft.includes(item.id)
    );

    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger>
          <Button>Filter report</Button>
          <Drawer {...args}>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={6}>
                <ContextFilters {...context} />
                <Divider />
                <Stack space={3}>
                  <EventFilterHeader
                    count={staged.draft.length}
                    onReset={staged.reset}
                  />
                  <Collapsible defaultExpanded>
                    <Collapsible.Trigger>
                      Selected ({staged.draft.length})
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                      {selectedEvents.length > 0 ? (
                        <SelectList
                          aria-label="Selected events"
                          variant="bordered"
                          selectionMode="multiple"
                          items={selectedEvents}
                          selectedKeys={staged.draft}
                          onChange={keys =>
                            staged.setDraft(
                              mergeSelection(
                                staged.draft,
                                selectedEvents.map(item => item.id),
                                keys as string[]
                              )
                            )
                          }
                        >
                          {renderEventOption}
                        </SelectList>
                      ) : (
                        <Text variant="muted" fontSize="sm">
                          Nothing selected yet — pick events below.
                        </Text>
                      )}
                    </Collapsible.Content>
                  </Collapsible>
                  <SearchField
                    aria-label="Search events"
                    placeholder="Search by name, ID, or date"
                    value={query}
                    onChange={setQuery}
                  />
                  <EventTypeToggle value={type} onChange={setType} />
                  <Scrollable height="260px">
                    <SelectList
                      aria-label="Available events"
                      selectionMode="multiple"
                      items={available}
                      selectedKeys={staged.draft}
                      onChange={keys =>
                        staged.setDraft(
                          mergeSelection(
                            staged.draft,
                            available.map(item => item.id),
                            keys as string[]
                          )
                        )
                      }
                      emptyState={<Text>No events match your search.</Text>}
                    >
                      {renderEventOption}
                    </SelectList>
                  </Scrollable>
                </Stack>
              </Stack>
            </Drawer.Content>
            <FilterDrawerActions
              onApply={staged.apply}
              onCancel={staged.cancel}
            />
          </Drawer>
        </Drawer.Trigger>
        <AppliedSummary applied={staged.applied} />
      </Stack>
    );
  },
});

/**
 * **V5 — Accordion sections (one section per filter dimension).**
 *
 * The whole drawer is an `Accordion`: Period, Category, and Events are
 * sibling sections, so "which selection belongs to which filter" is
 * structural (criterion: orientation among many filters). The Events section
 * header carries the count; reset inside the section only clears events.
 * Scales to many filter dimensions better than any other version.
 */
export const EventFilterAccordionSections = meta.story({
  parameters: { surface: false },
  render: function Render(args) {
    const staged = useStagedEvents();
    const context = useContextFilters();
    const [query, setQuery] = useState('');
    const [type, setType] = useState<EventTypeFilter>('all');
    const visible = searchEvents(query, type);

    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger>
          <Button>Filter report</Button>
          <Drawer {...args}>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Accordion defaultExpandedKeys={['events']}>
                <Accordion.Item id="period">
                  <Accordion.Header>Period</Accordion.Header>
                  <Accordion.Content>
                    <Select
                      aria-label="Period"
                      selectedKey={context.period}
                      onChange={context.setPeriod}
                    >
                      <Select.Option id="next-30">Next 30 days</Select.Option>
                      <Select.Option id="next-90">Next 90 days</Select.Option>
                      <Select.Option id="2026">All of 2026</Select.Option>
                    </Select>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item id="category">
                  <Accordion.Header>Category</Accordion.Header>
                  <Accordion.Content>
                    <Select
                      aria-label="Category"
                      selectedKey={context.category}
                      onChange={context.setCategory}
                    >
                      <Select.Option id="all">All categories</Select.Option>
                      <Select.Option id="music">Music</Select.Option>
                      <Select.Option id="sport">Sport</Select.Option>
                      <Select.Option id="theatre">Theatre</Select.Option>
                    </Select>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item id="events">
                  <Accordion.Header>
                    <Inline space={2} alignY="center">
                      Events
                      {staged.draft.length > 0 && (
                        <Badge variant="primary">{staged.draft.length}</Badge>
                      )}
                    </Inline>
                  </Accordion.Header>
                  <Accordion.Content>
                    <Stack space={3}>
                      <Inline space={2} alignY="center">
                        <Split />
                        <Button
                          variant="ghost"
                          size="small"
                          onPress={staged.reset}
                          disabled={staged.draft.length === 0}
                        >
                          Reset events
                        </Button>
                      </Inline>
                      <SearchField
                        aria-label="Search events"
                        placeholder="Search by name, ID, or date"
                        value={query}
                        onChange={setQuery}
                      />
                      <EventTypeToggle value={type} onChange={setType} />
                      <Scrollable height="280px">
                        <SelectList
                          aria-label="Events"
                          selectionMode="multiple"
                          items={visible}
                          selectedKeys={staged.draft}
                          onChange={keys =>
                            staged.setDraft(
                              mergeSelection(
                                staged.draft,
                                visible.map(item => item.id),
                                keys as string[]
                              )
                            )
                          }
                          emptyState={<Text>No events match your search.</Text>}
                        >
                          {renderEventOption}
                        </SelectList>
                      </Scrollable>
                    </Stack>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </Drawer.Content>
            <FilterDrawerActions
              onApply={staged.apply}
              onCancel={staged.cancel}
            />
          </Drawer>
        </Drawer.Trigger>
        <AppliedSummary applied={staged.applied} />
      </Stack>
    );
  },
});

/**
 * **V6 — Paginated list (the Reporting Tool's current approach).**
 *
 * Recreates the IST state with Marigold's `Pagination` for direct
 * comparison. Pagination keeps row heights stable, but selection spans
 * pages, so a collapsible "Selected (n)" section is REQUIRED to review the
 * selection (V2's scroll approach gets that for free). Search/type changes
 * reset to page 1.
 */
export const EventFilterPaginated = meta.story({
  parameters: { surface: false },
  render: function Render(args) {
    const PAGE_SIZE = 10;
    const staged = useStagedEvents();
    const context = useContextFilters();
    const [query, setQuery] = useState('');
    const [type, setType] = useState<EventTypeFilter>('all');
    const [page, setPage] = useState(1);
    const visible = searchEvents(query, type);
    const pageItems = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const selectedEvents = eventsFromKeys(staged.draft);

    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger>
          <Button>Filter report</Button>
          <Drawer {...args}>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={6}>
                <ContextFilters {...context} />
                <Divider />
                <Stack space={3}>
                  <EventFilterHeader
                    count={staged.draft.length}
                    onReset={staged.reset}
                  />
                  <Collapsible>
                    <Collapsible.Trigger>
                      Selected ({staged.draft.length})
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                      {selectedEvents.length > 0 ? (
                        <SelectList
                          aria-label="Selected events"
                          variant="bordered"
                          selectionMode="multiple"
                          items={selectedEvents}
                          selectedKeys={staged.draft}
                          onChange={keys =>
                            staged.setDraft(
                              mergeSelection(
                                staged.draft,
                                selectedEvents.map(item => item.id),
                                keys as string[]
                              )
                            )
                          }
                        >
                          {renderEventOption}
                        </SelectList>
                      ) : (
                        <Text variant="muted" fontSize="sm">
                          Nothing selected yet.
                        </Text>
                      )}
                    </Collapsible.Content>
                  </Collapsible>
                  <SearchField
                    aria-label="Search events"
                    placeholder="Search by name, ID, or date"
                    value={query}
                    onChange={value => {
                      setQuery(value);
                      setPage(1);
                    }}
                  />
                  <EventTypeToggle
                    value={type}
                    onChange={value => {
                      setType(value);
                      setPage(1);
                    }}
                  />
                  <SelectList
                    aria-label="Events"
                    selectionMode="multiple"
                    items={pageItems}
                    selectedKeys={staged.draft}
                    onChange={keys =>
                      staged.setDraft(
                        mergeSelection(
                          staged.draft,
                          pageItems.map(item => item.id),
                          keys as string[]
                        )
                      )
                    }
                    emptyState={<Text>No events match your search.</Text>}
                  >
                    {renderEventOption}
                  </SelectList>
                  <Pagination
                    totalItems={visible.length}
                    pageSize={PAGE_SIZE}
                    page={page}
                    onChange={setPage}
                  />
                </Stack>
              </Stack>
            </Drawer.Content>
            <FilterDrawerActions
              onApply={staged.apply}
              onCancel={staged.cancel}
            />
          </Drawer>
        </Drawer.Trigger>
        <AppliedSummary applied={staged.applied} />
      </Stack>
    );
  },
});

/**
 * **V7 — Autocomplete picker ("search first, then review").**
 *
 * Flips the model: there is no browsable list. `Autocomplete` searches all
 * events in a virtualized popover (rich rows incl. IDs); picking one adds it
 * to the selection list below, which owns ALL the remaining space — best
 * version for reviewing many selected events in full detail. Weak for
 * discovery: users must know roughly what they're looking for.
 */
export const EventFilterAutocompletePicker = meta.story({
  parameters: { surface: false },
  render: function Render(args) {
    const staged = useStagedEvents();
    const context = useContextFilters();
    const [query, setQuery] = useState('');
    const selectedEvents = eventsFromKeys(staged.draft);
    const available = EVENTS.filter(item => !staged.draft.includes(item.id));

    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger>
          <Button>Filter report</Button>
          <Drawer {...args}>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={6}>
                <ContextFilters {...context} />
                <Divider />
                <Stack space={3}>
                  <EventFilterHeader
                    count={staged.draft.length}
                    onReset={staged.reset}
                  />
                  <Autocomplete
                    label="Add events"
                    placeholder="Search by name, ID, or date"
                    value={query}
                    onChange={setQuery}
                    onSubmit={key => {
                      if (key !== null) {
                        staged.setDraft([...staged.draft, String(key)]);
                        setQuery('');
                      }
                    }}
                    emptyState={<Text>No matching events.</Text>}
                  >
                    {available.map(item => (
                      <Autocomplete.Option
                        key={item.id}
                        id={item.id}
                        textValue={`${eventTextValue(item)} · ${item.id}`}
                      >
                        <EventRowContent item={item} />
                      </Autocomplete.Option>
                    ))}
                  </Autocomplete>
                  {selectedEvents.length > 0 ? (
                    <SelectList
                      aria-label="Selected events"
                      variant="bordered"
                      selectionMode="multiple"
                      items={selectedEvents}
                      selectedKeys={staged.draft}
                      onChange={keys =>
                        staged.setDraft(
                          mergeSelection(
                            staged.draft,
                            selectedEvents.map(item => item.id),
                            keys as string[]
                          )
                        )
                      }
                    >
                      {renderEventOption}
                    </SelectList>
                  ) : (
                    <Text variant="muted" fontSize="sm">
                      Nothing selected yet — search above to add events.
                    </Text>
                  )}
                </Stack>
              </Stack>
            </Drawer.Content>
            <FilterDrawerActions
              onApply={staged.apply}
              onCancel={staged.cancel}
            />
          </Drawer>
        </Drawer.Trigger>
        <AppliedSummary applied={staged.applied} />
      </Stack>
    );
  },
});

/**
 * **V8 — Tabs: Browse / Selected.**
 *
 * The event filter is split into two full-height tabs: "Browse" (search +
 * type + list) and "Selected (n)" (rich review list with in-context
 * deselect + reset). Each mode gets maximum vertical space — the best use
 * of 384px — at the cost of one extra click to switch context.
 */
export const EventFilterTabs = meta.story({
  parameters: { surface: false },
  render: function Render(args) {
    const staged = useStagedEvents();
    const context = useContextFilters();
    const [query, setQuery] = useState('');
    const [type, setType] = useState<EventTypeFilter>('all');
    const visible = searchEvents(query, type);
    const selectedEvents = eventsFromKeys(staged.draft);

    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger>
          <Button>Filter report</Button>
          <Drawer {...args}>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={6}>
                <ContextFilters {...context} />
                <Divider />
                <Stack space={3}>
                  <Text weight="medium">Events</Text>
                  <Tabs aria-label="Event selection" size="small">
                    <Tabs.List aria-label="Event selection views">
                      <Tabs.Item id="browse">Browse</Tabs.Item>
                      <Tabs.Item id="selected">
                        Selected ({staged.draft.length})
                      </Tabs.Item>
                    </Tabs.List>
                    <Tabs.TabPanel id="browse">
                      <Stack space={3}>
                        <SearchField
                          aria-label="Search events"
                          placeholder="Search by name, ID, or date"
                          value={query}
                          onChange={setQuery}
                        />
                        <EventTypeToggle value={type} onChange={setType} />
                        <Scrollable height="300px">
                          <SelectList
                            aria-label="Events"
                            selectionMode="multiple"
                            items={visible}
                            selectedKeys={staged.draft}
                            onChange={keys =>
                              staged.setDraft(
                                mergeSelection(
                                  staged.draft,
                                  visible.map(item => item.id),
                                  keys as string[]
                                )
                              )
                            }
                            emptyState={
                              <Text>No events match your search.</Text>
                            }
                          >
                            {renderEventOption}
                          </SelectList>
                        </Scrollable>
                      </Stack>
                    </Tabs.TabPanel>
                    <Tabs.TabPanel id="selected">
                      <Stack space={3}>
                        <Inline space={2} alignY="center">
                          <Split />
                          <Button
                            variant="ghost"
                            size="small"
                            onPress={staged.reset}
                            disabled={staged.draft.length === 0}
                          >
                            Reset events
                          </Button>
                        </Inline>
                        {selectedEvents.length > 0 ? (
                          <Scrollable height="300px">
                            <SelectList
                              aria-label="Selected events"
                              variant="bordered"
                              selectionMode="multiple"
                              items={selectedEvents}
                              selectedKeys={staged.draft}
                              onChange={keys =>
                                staged.setDraft(
                                  mergeSelection(
                                    staged.draft,
                                    selectedEvents.map(item => item.id),
                                    keys as string[]
                                  )
                                )
                              }
                            >
                              {renderEventOption}
                            </SelectList>
                          </Scrollable>
                        ) : (
                          <Text variant="muted" fontSize="sm">
                            Nothing selected yet — switch to Browse.
                          </Text>
                        )}
                      </Stack>
                    </Tabs.TabPanel>
                  </Tabs>
                </Stack>
              </Stack>
            </Drawer.Content>
            <FilterDrawerActions
              onApply={staged.apply}
              onCancel={staged.cancel}
            />
          </Drawer>
        </Drawer.Trigger>
        <AppliedSummary applied={staged.applied} />
      </Stack>
    );
  },
});

/**
 * **V9 — Compact tags above the list (the upgraded chip pattern).**
 *
 * The doc argues chips can't carry the full metadata — correct, so here
 * chips don't try: `TagGroup` renders compact "name · date" tags INSIDE the
 * filter as a quick overview with one-click remove + "Remove all"
 * (= per-filter reset), while the list below remains the source of truth
 * for full metadata. Chips complement the rich rows instead of replacing
 * them, addressing the doc's chip critique head-on.
 */
export const EventFilterCompactTags = meta.story({
  parameters: { surface: false },
  render: function Render(args) {
    const staged = useStagedEvents();
    const context = useContextFilters();
    const [query, setQuery] = useState('');
    const [type, setType] = useState<EventTypeFilter>('all');
    const visible = searchEvents(query, type);
    const selectedEvents = eventsFromKeys(staged.draft);

    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger>
          <Button>Filter report</Button>
          <Drawer {...args}>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={6}>
                <ContextFilters {...context} />
                <Divider />
                <Stack space={3}>
                  <EventFilterHeader
                    count={staged.draft.length}
                    onReset={staged.reset}
                  />
                  {selectedEvents.length > 0 && (
                    <Tag.Group
                      aria-label="Selected events"
                      items={selectedEvents}
                      onRemove={keys =>
                        staged.setDraft(
                          staged.draft.filter(key => !keys.has(key))
                        )
                      }
                      removeAll
                    >
                      {(item: EventItem) => (
                        <Tag textValue={eventTextValue(item)}>
                          {item.name} ·{' '}
                          {new Date(`${item.date}T00:00:00`).toLocaleDateString(
                            'en-GB',
                            { day: '2-digit', month: 'short' }
                          )}
                        </Tag>
                      )}
                    </Tag.Group>
                  )}
                  <SearchField
                    aria-label="Search events"
                    placeholder="Search by name, ID, or date"
                    value={query}
                    onChange={setQuery}
                  />
                  <EventTypeToggle value={type} onChange={setType} />
                  <Scrollable height="280px">
                    <SelectList
                      aria-label="Events"
                      selectionMode="multiple"
                      items={visible}
                      selectedKeys={staged.draft}
                      onChange={keys =>
                        staged.setDraft(
                          mergeSelection(
                            staged.draft,
                            visible.map(item => item.id),
                            keys as string[]
                          )
                        )
                      }
                      emptyState={<Text>No events match your search.</Text>}
                    >
                      {renderEventOption}
                    </SelectList>
                  </Scrollable>
                </Stack>
              </Stack>
            </Drawer.Content>
            <FilterDrawerActions
              onApply={staged.apply}
              onCancel={staged.cancel}
            />
          </Drawer>
        </Drawer.Trigger>
        <AppliedSummary applied={staged.applied} />
      </Stack>
    );
  },
});

/**
 * **V10 — Grouped by event type.**
 *
 * The type narrowing (criterion 2) becomes STRUCTURE instead of a control:
 * one labeled, counted group per type (single events / season tickets /
 * subscriptions), all filtered by a single search. The fachliche
 * interpretation the doc stresses (a season ticket is not a single event)
 * is always visible — no toggle state to understand. Costs more vertical
 * space than a toggle and the groups shift while searching.
 */
export const EventFilterGroupedByType = meta.story({
  parameters: { surface: false },
  render: function Render(args) {
    const staged = useStagedEvents();
    const context = useContextFilters();
    const [query, setQuery] = useState('');
    const visible = searchEvents(query, 'all');
    const groups = (['single', 'season', 'subscription'] as EventType[])
      .map(groupType => ({
        type: groupType,
        items: visible.filter(item => item.type === groupType),
      }))
      .filter(group => group.items.length > 0);

    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger>
          <Button>Filter report</Button>
          <Drawer {...args}>
            <Drawer.Title>Filter</Drawer.Title>
            <Drawer.Content>
              <Stack space={6}>
                <ContextFilters {...context} />
                <Divider />
                <Stack space={3}>
                  <EventFilterHeader
                    count={staged.draft.length}
                    onReset={staged.reset}
                  />
                  <SearchField
                    aria-label="Search events"
                    placeholder="Search by name, ID, or date"
                    value={query}
                    onChange={setQuery}
                  />
                  <Scrollable height="340px">
                    <Stack space={5}>
                      {groups.length === 0 && (
                        <Text>No events match your search.</Text>
                      )}
                      {groups.map(group => (
                        <Stack space={2} key={group.type}>
                          <Inline space={2} alignY="center">
                            <Text weight="medium" fontSize="sm">
                              {EVENT_TYPE_LABEL_PLURAL[group.type]}
                            </Text>
                            <Badge>{group.items.length}</Badge>
                          </Inline>
                          <SelectList
                            aria-label={EVENT_TYPE_LABEL_PLURAL[group.type]}
                            selectionMode="multiple"
                            items={group.items}
                            selectedKeys={staged.draft}
                            onChange={keys =>
                              staged.setDraft(
                                mergeSelection(
                                  staged.draft,
                                  group.items.map(item => item.id),
                                  keys as string[]
                                )
                              )
                            }
                          >
                            {renderEventOptionPlain}
                          </SelectList>
                        </Stack>
                      ))}
                    </Stack>
                  </Scrollable>
                </Stack>
              </Stack>
            </Drawer.Content>
            <FilterDrawerActions
              onApply={staged.apply}
              onCancel={staged.cancel}
            />
          </Drawer>
        </Drawer.Trigger>
        <AppliedSummary applied={staged.applied} />
      </Stack>
    );
  },
});
