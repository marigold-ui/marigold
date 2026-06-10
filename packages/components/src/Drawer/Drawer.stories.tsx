import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { Check, Plus, Ticket, X } from '@marigold/icons';
import { Accordion } from '../Accordion/Accordion';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Checkbox } from '../Checkbox/Checkbox';
import { Description } from '../Description/Description';
import { Divider } from '../Divider/Divider';
import { Form } from '../Form/Form';
import { IconButton } from '../IconButton/IconButton';
import { Inline } from '../Inline/Inline';
import { Pagination } from '../Pagination/Pagination';
import { Scrollable } from '../Scrollable/Scrollable';
import { SearchField } from '../SearchField/SearchField';
import { Select } from '../Select/Select';
import { SelectList } from '../SelectList/SelectList';
import { Slider } from '../Slider/Slider';
import { Stack } from '../Stack/Stack';
import { Table } from '../Table/Table';
import { Tabs } from '../Tabs/Tabs';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { TextValue } from '../TextValue/TextValue';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { Drawer } from './Drawer';

/* ------------------------------------------------------------------ *
 * Complex filter: "Event Multiselect" demo data + helpers
 *
 * These stories explore how to build a *complex object multiselect* — the
 * "Event Multiselect" pattern from the Reporting Tool. A selectable item is
 * not a simple label but a full event object (name, date/time, venue, type
 * and three IDs). Requirements driving every version below:
 *   - selected items stay visible *inside* the control and show their FULL
 *     data (never a chip — a chip can't carry name + date + venue + type +
 *     three IDs)
 *   - in-control search (by name / date / ID) and type filtering
 *     (Single Date / Season Ticket / Subscription)
 *   - per-filter reset and per-item removal
 *   - large lists handled via scroll or pagination
 *
 * Everything is composed from existing Marigold primitives plus small local
 * helpers — there is no single off-the-shelf "entity multiselect" component.
 * ------------------------------------------------------------------ */

type EventType = 'Single Date' | 'Season Ticket' | 'Subscription';

interface EventItem {
  id: string;
  name: string;
  /** ISO date, e.g. `2026-03-14`. */
  date: string;
  /** 24h time, e.g. `20:00`. */
  time: string;
  venue: string;
  type: EventType;
  /** ID of the event group (shared across occurrences). */
  idGruppe: string;
  /** ID of the single occurrence (unique per row). */
  idEinzeltermin: string;
  /** ID of the venue. */
  idSpielstaette: string;
}

const EVENT_TYPES: EventType[] = [
  'Single Date',
  'Season Ticket',
  'Subscription',
];

interface EventGroupSeed {
  name: string;
  type: EventType;
  venue: string;
  venueId: string;
  occurrences: [string, string][];
}

const EVENT_SEEDS: EventGroupSeed[] = [
  {
    name: 'Coldplay — Music of the Spheres',
    type: 'Single Date',
    venue: 'Olympiastadion, Berlin',
    venueId: 'VEN-2001',
    occurrences: [
      ['2026-06-12', '20:00'],
      ['2026-06-13', '20:00'],
    ],
  },
  {
    name: 'Die Toten Hosen — Alles ohne Strom',
    type: 'Single Date',
    venue: 'Lanxess Arena, Cologne',
    venueId: 'VEN-2002',
    occurrences: [
      ['2026-04-03', '19:30'],
      ['2026-04-04', '19:30'],
    ],
  },
  {
    name: 'Taylor Swift — The Eras Tour',
    type: 'Single Date',
    venue: 'Deutsche Bank Park, Frankfurt',
    venueId: 'VEN-2003',
    occurrences: [
      ['2026-07-18', '18:00'],
      ['2026-07-19', '18:00'],
      ['2026-07-20', '18:00'],
    ],
  },
  {
    name: 'Helene Fischer Live',
    type: 'Single Date',
    venue: 'SAP Arena, Mannheim',
    venueId: 'VEN-2004',
    occurrences: [
      ['2026-05-09', '20:00'],
      ['2026-05-10', '20:00'],
    ],
  },
  {
    name: 'André Rieu — Live in Concert',
    type: 'Single Date',
    venue: 'SAP Arena, Mannheim',
    venueId: 'VEN-2004',
    occurrences: [
      ['2026-11-21', '19:00'],
      ['2026-11-22', '19:00'],
    ],
  },
  {
    name: 'Rammstein — Stadium Tour',
    type: 'Single Date',
    venue: 'Olympiastadion, Munich',
    venueId: 'VEN-2005',
    occurrences: [
      ['2026-08-01', '19:00'],
      ['2026-08-02', '19:00'],
    ],
  },
  {
    name: 'Hamlet',
    type: 'Single Date',
    venue: 'Schauspielhaus, Hamburg',
    venueId: 'VEN-2006',
    occurrences: [
      ['2026-03-05', '19:30'],
      ['2026-03-12', '19:30'],
      ['2026-03-19', '19:30'],
    ],
  },
  {
    name: 'The Nutcracker — Ballet',
    type: 'Single Date',
    venue: 'Semperoper, Dresden',
    venueId: 'VEN-2007',
    occurrences: [
      ['2026-12-20', '18:00'],
      ['2026-12-23', '18:00'],
      ['2026-12-26', '18:00'],
    ],
  },
  {
    name: 'The Phantom of the Opera',
    type: 'Single Date',
    venue: 'Stage Theater, Hamburg',
    venueId: 'VEN-2008',
    occurrences: [
      ['2026-02-14', '19:30'],
      ['2026-02-21', '19:30'],
      ['2026-02-28', '19:30'],
      ['2026-03-07', '19:30'],
    ],
  },
  {
    name: 'SC Freiburg — Season 25/26',
    type: 'Season Ticket',
    venue: 'Europa-Park Stadion, Freiburg',
    venueId: 'VEN-2009',
    occurrences: [['2026-08-15', '15:30']],
  },
  {
    name: 'FC Bayern München — Season 25/26',
    type: 'Season Ticket',
    venue: 'Allianz Arena, Munich',
    venueId: 'VEN-2010',
    occurrences: [['2026-08-15', '15:30']],
  },
  {
    name: 'Eisbären Berlin — Season Ticket',
    type: 'Season Ticket',
    venue: 'Mercedes-Benz Arena, Berlin',
    venueId: 'VEN-2011',
    occurrences: [['2026-09-12', '19:00']],
  },
  {
    name: 'SC Freiburg vs. RB Leipzig',
    type: 'Single Date',
    venue: 'Europa-Park Stadion, Freiburg',
    venueId: 'VEN-2009',
    occurrences: [['2026-10-24', '15:30']],
  },
  {
    name: 'FC Bayern vs. Borussia Dortmund',
    type: 'Single Date',
    venue: 'Allianz Arena, Munich',
    venueId: 'VEN-2010',
    occurrences: [
      ['2026-11-07', '18:30'],
      ['2027-04-10', '18:30'],
    ],
  },
  {
    name: 'Philharmonic Concert Series — Subscription A',
    type: 'Subscription',
    venue: 'Elbphilharmonie, Hamburg',
    venueId: 'VEN-2012',
    occurrences: [['2026-09-01', '20:00']],
  },
  {
    name: "New Year's Gala Concert",
    type: 'Single Date',
    venue: 'Elbphilharmonie, Hamburg',
    venueId: 'VEN-2012',
    occurrences: [['2026-12-31', '18:00']],
  },
  {
    name: 'Opera Subscription — Premium',
    type: 'Subscription',
    venue: 'Semperoper, Dresden',
    venueId: 'VEN-2007',
    occurrences: [['2026-09-15', '19:00']],
  },
  {
    name: 'Comedy Club — Membership',
    type: 'Subscription',
    venue: 'Quatsch Comedy Club, Berlin',
    venueId: 'VEN-2013',
    occurrences: [['2026-10-01', '21:00']],
  },
  {
    name: 'Jazz Nights — Series',
    type: 'Subscription',
    venue: 'Stadthalle, Heidelberg',
    venueId: 'VEN-2014',
    occurrences: [['2026-10-05', '20:30']],
  },
  {
    name: 'Rock am Ring 2026',
    type: 'Single Date',
    venue: 'Nürburgring, Nürburg',
    venueId: 'VEN-2015',
    occurrences: [
      ['2026-06-05', '12:00'],
      ['2026-06-06', '12:00'],
      ['2026-06-07', '12:00'],
    ],
  },
  {
    name: 'Wacken Open Air 2026',
    type: 'Single Date',
    venue: 'Festival Grounds, Wacken',
    venueId: 'VEN-2016',
    occurrences: [
      ['2026-07-30', '11:00'],
      ['2026-07-31', '11:00'],
      ['2026-08-01', '11:00'],
    ],
  },
  {
    name: 'Disney on Ice',
    type: 'Single Date',
    venue: 'Barclays Arena, Hamburg',
    venueId: 'VEN-2017',
    occurrences: [
      ['2026-01-17', '15:00'],
      ['2026-01-18', '11:00'],
      ['2026-01-18', '15:00'],
    ],
  },
  {
    name: 'Cirque du Soleil — OVO',
    type: 'Single Date',
    venue: 'Festhalle, Frankfurt',
    venueId: 'VEN-2018',
    occurrences: [
      ['2026-03-26', '20:00'],
      ['2026-03-27', '20:00'],
      ['2026-03-28', '16:00'],
      ['2026-03-28', '20:00'],
    ],
  },
  {
    name: 'Holiday on Ice',
    type: 'Single Date',
    venue: 'Lanxess Arena, Cologne',
    venueId: 'VEN-2002',
    occurrences: [
      ['2026-12-27', '15:00'],
      ['2026-12-28', '15:00'],
      ['2026-12-29', '15:00'],
    ],
  },
];

const EVENTS: EventItem[] = EVENT_SEEDS.flatMap((seed, groupIndex) => {
  const idGruppe = `GRP-${2001 + groupIndex}`;
  return seed.occurrences.map(([date, time], occurrenceIndex) => {
    const occurrence = groupIndex * 100 + occurrenceIndex + 1;
    return {
      id: `EVT-${String(occurrence).padStart(5, '0')}`,
      name: seed.name,
      date,
      time,
      venue: seed.venue,
      type: seed.type,
      idGruppe,
      idEinzeltermin: `OCC-${String(occurrence).padStart(5, '0')}`,
      idSpielstaette: seed.venueId,
    };
  });
});

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** `2026-06-12` -> `12 Jun 2026`. */
const formatDate = (iso: string) => {
  const [year, month, day] = iso.split('-');
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
};

const TYPE_BADGE_VARIANT: Record<EventType, string> = {
  'Single Date': 'info',
  'Season Ticket': 'warning',
  Subscription: 'success',
};

type SearchMode = 'all' | 'name' | 'date' | 'id';

const matchesQuery = (event: EventItem, query: string, mode: SearchMode) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const byName = event.name.toLowerCase().includes(q);
  const byDate =
    event.date.includes(q) || formatDate(event.date).toLowerCase().includes(q);
  const byId = [event.idGruppe, event.idEinzeltermin, event.idSpielstaette]
    .join(' ')
    .toLowerCase()
    .includes(q);
  switch (mode) {
    case 'name':
      return byName;
    case 'date':
      return byDate;
    case 'id':
      return byId;
    default:
      return byName || byDate || byId;
  }
};

/** Shared search + type-filter state used by every version. */
const useEventFilter = () => {
  const [query, setQuery] = useState('');
  const [types, setTypes] = useState<EventType[]>([]);
  const [mode, setMode] = useState<SearchMode>('all');

  const results = useMemo(
    () =>
      EVENTS.filter(
        event =>
          matchesQuery(event, query, mode) &&
          (types.length === 0 || types.includes(event.type))
      ),
    [query, types, mode]
  );

  const toggleType = (type: EventType) =>
    setTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );

  return {
    query,
    setQuery,
    types,
    setTypes,
    toggleType,
    mode,
    setMode,
    results,
  };
};

/** Shared selection set. `add`/`remove` keep result lists "add only". */
const useEventSelection = () => {
  const [ids, setIds] = useState<Set<string>>(() => new Set());
  const add = (id: string) =>
    setIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  const remove = (id: string) =>
    setIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  const set = (next: Iterable<string>) => setIds(new Set(next));
  const clear = () => setIds(new Set());
  const selected = useMemo(
    () => EVENTS.filter(event => ids.has(event.id)),
    [ids]
  );
  return { ids, add, remove, set, clear, selected };
};

const usePagination = <T,>(items: T[], pageSize: number) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);
  return { page: current, setPage, pageItems };
};

/** Renders all seven event fields in a label : value grid. */
const EventFields = ({ event }: { event: EventItem }) => (
  <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-xs">
    <span className="text-secondary">Date</span>
    <span>
      {formatDate(event.date)} · {event.time}
    </span>
    <span className="text-secondary">Venue</span>
    <span>{event.venue}</span>
    <span className="text-secondary">Group ID</span>
    <span>{event.idGruppe}</span>
    <span className="text-secondary">Occurrence ID</span>
    <span>{event.idEinzeltermin}</span>
    <span className="text-secondary">Venue ID</span>
    <span>{event.idSpielstaette}</span>
  </div>
);

/** Full-data card for a *selected* event, with a remove (✕) button. */
const SelectedEventCard = ({
  event,
  onRemove,
}: {
  event: EventItem;
  onRemove: () => void;
}) => (
  <Card>
    <Card.Body>
      <Stack space={2}>
        <Inline space={2} alignY="center">
          <Text weight="medium">{event.name}</Text>
          <Badge variant={TYPE_BADGE_VARIANT[event.type]}>{event.type}</Badge>
          <div className="grow" />
          <IconButton aria-label={`Remove ${event.name}`} onPress={onRemove}>
            <X size={18} />
          </IconButton>
        </Inline>
        <EventFields event={event} />
      </Stack>
    </Card.Body>
  </Card>
);

/** One line: name + meta + a type badge. Used in add-only result lists. */
const EventResultLine = ({ event }: { event: EventItem }) => (
  <Stack space={0}>
    <Inline space={2} alignY="center">
      <Text weight="medium">{event.name}</Text>
      <Badge variant={TYPE_BADGE_VARIANT[event.type]}>{event.type}</Badge>
    </Inline>
    <span className="text-secondary text-xs">
      {formatDate(event.date)} · {event.time} · {event.venue} ·{' '}
      {event.idEinzeltermin}
    </span>
  </Stack>
);

/** Add-only result row: an "Add" button that flips to "Added" once selected. */
const AddResultRow = ({
  event,
  added,
  onAdd,
}: {
  event: EventItem;
  added: boolean;
  onAdd: () => void;
}) => (
  <Inline space={3} alignY="center">
    <div className="grow">
      <EventResultLine event={event} />
    </div>
    {added ? (
      <Badge variant="success">
        <Check size={14} /> Added
      </Badge>
    ) : (
      <Button size="small" variant="secondary" onPress={onAdd}>
        <Plus size={16} /> Add
      </Button>
    )}
  </Inline>
);

/** A type filter rendered as independent toggle "pills" (multi-select). */
const TypeToggles = ({
  types,
  onToggle,
}: {
  types: EventType[];
  onToggle: (type: EventType) => void;
}) => (
  <Inline space={2}>
    {EVENT_TYPES.map(type => (
      <ToggleButton
        key={type}
        size="small"
        selected={types.includes(type)}
        onChange={() => onToggle(type)}
      >
        {type}
      </ToggleButton>
    ))}
  </Inline>
);

/** Header row for a selected-items section: count + "Clear all". */
const SelectedHeader = ({
  count,
  onClear,
}: {
  count: number;
  onClear: () => void;
}) => (
  <Inline space={2} alignY="center" alignX="left">
    <Text weight="medium">Selected ({count})</Text>
    <div className="grow" />
    {count > 0 && (
      <Button size="small" variant="ghost" onPress={onClear}>
        Clear all
      </Button>
    )}
  </Inline>
);

const EmptyHint = ({ children }: { children: ReactNode }) => (
  <span className="text-secondary text-sm">{children}</span>
);

/** Shared Drawer shell so each version only provides the control + footer. */
const FilterDrawer = ({
  triggerLabel = 'Filter events',
  title,
  count,
  children,
}: {
  triggerLabel?: string;
  title: string;
  count: number;
  children: ReactNode;
}) => (
  <Drawer.Trigger>
    <Button>
      <Ticket size={16} />
      {triggerLabel}
      {count > 0 ? ` (${count})` : ''}
    </Button>
    <Drawer size="medium">
      <Drawer.Title>{title}</Drawer.Title>
      <Drawer.Content>{children}</Drawer.Content>
      <Drawer.Actions>
        <Button slot="close">Cancel</Button>
        <Button slot="close" variant="primary">
          Apply
        </Button>
      </Drawer.Actions>
    </Drawer>
  </Drawer.Trigger>
);

const PAGE_SIZE = 6;

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

/* ================================================================== *
 * Complex "Event Multiselect" filters (10 versions)
 * ================================================================== */

type EventSelection = ReturnType<typeof useEventSelection>;

/** Selected events as full-data cards (each removable via its ✕ button). */
const SelectedCards = ({ selection }: { selection: EventSelection }) =>
  selection.selected.length === 0 ? (
    <EmptyHint>Nothing selected yet.</EmptyHint>
  ) : (
    <Stack space={3}>
      {selection.selected.map(event => (
        <SelectedEventCard
          key={event.id}
          event={event}
          onRemove={() => selection.remove(event.id)}
        />
      ))}
    </Stack>
  );

/**
 * Available list as a multi-select SelectList. Toggling a row selects or
 * deselects it — the documented SelectList exception to "deselect from the
 * selected area only". Off-screen selections are merged back so filtering the
 * list never silently drops picks.
 */
const AvailableSelectList = ({
  events,
  selection,
}: {
  events: EventItem[];
  selection: EventSelection;
}) => {
  const visible = new Set(events.map(event => event.id));
  const selectedVisible = [...selection.ids].filter(id => visible.has(id));
  return (
    <SelectList
      aria-label="Available events"
      variant="bordered"
      selectionMode="multiple"
      selectedKeys={selectedVisible}
      onChange={keys => {
        const next = new Set([...selection.ids].filter(id => !visible.has(id)));
        (keys as string[]).forEach(key => next.add(key));
        selection.set(next);
      }}
      emptyState={<EmptyHint>No events match your search.</EmptyHint>}
    >
      {events.map(event => (
        <SelectList.Option key={event.id} id={event.id} textValue={event.name}>
          <EventResultLine event={event} />
        </SelectList.Option>
      ))}
    </SelectList>
  );
};

/** Selected events in a SelectList, each with a trailing "Remove" action. */
const SelectedSelectList = ({ selection }: { selection: EventSelection }) =>
  selection.selected.length === 0 ? (
    <EmptyHint>Nothing selected yet.</EmptyHint>
  ) : (
    <SelectList
      aria-label="Selected events"
      variant="bordered"
      selectionMode="multiple"
      selectedKeys={[...selection.ids]}
      onChange={keys => selection.set(keys as string[])}
    >
      {selection.selected.map(event => (
        <SelectList.Option key={event.id} id={event.id} textValue={event.name}>
          <EventResultLine event={event} />
          <Button
            size="small"
            aria-label={`Remove ${event.name}`}
            onPress={() => selection.remove(event.id)}
          >
            Remove
          </Button>
        </SelectList.Option>
      ))}
    </SelectList>
  );

const TypeSelect = ({
  types,
  onChange,
}: {
  types: EventType[];
  onChange: (types: EventType[]) => void;
}) => (
  <Select
    aria-label="Filter by type"
    selectedKey={types[0] ?? 'all'}
    onChange={key => onChange(key === 'all' ? [] : [key as EventType])}
  >
    <Select.Option id="all">All types</Select.Option>
    {EVENT_TYPES.map(type => (
      <Select.Option key={type} id={type}>
        {type}
      </Select.Option>
    ))}
  </Select>
);

/**
 * **Version 1 — Selected cards above an add-only list.** Picks appear as
 * full-data cards at the top (✕ per card + "Clear all"); the scrollable result
 * list only adds — an already-added row shows an "Added" badge. Type filtering
 * uses toggle pills; search covers name, date and ID.
 */
const SelectedCardsAboveList = () => {
  const filter = useEventFilter();
  const selection = useEventSelection();
  return (
    <FilterDrawer title="Filter: Events" count={selection.ids.size}>
      <Stack space={5}>
        <SearchField
          label="Search events"
          placeholder="Name, date or ID"
          value={filter.query}
          onChange={filter.setQuery}
          onClear={() => filter.setQuery('')}
        />
        <TypeToggles types={filter.types} onToggle={filter.toggleType} />
        <Stack space={3}>
          <SelectedHeader
            count={selection.selected.length}
            onClear={selection.clear}
          />
          <SelectedCards selection={selection} />
        </Stack>
        <Divider />
        <Text weight="medium">Results ({filter.results.length})</Text>
        <Scrollable height="22rem">
          <Stack space={3}>
            {filter.results.map(event => (
              <AddResultRow
                key={event.id}
                event={event}
                added={selection.ids.has(event.id)}
                onAdd={() => selection.add(event.id)}
              />
            ))}
            {filter.results.length === 0 && (
              <EmptyHint>No events match your search.</EmptyHint>
            )}
          </Stack>
        </Scrollable>
      </Stack>
    </FilterDrawer>
  );
};

export const FilterSelectedCardsAbove = meta.story({
  parameters: { surface: false },
  render: () => <SelectedCardsAboveList />,
});

/**
 * **Version 2 — Two SelectLists.** The available list is a multi-select
 * `SelectList` (toggling a row selects/deselects); the type filter is a `Tabs`
 * strip whose panels scope the list by type. Selected events live in a second,
 * bordered `SelectList` with a trailing "Remove".
 */
const TwoSelectLists = () => {
  const filter = useEventFilter();
  const selection = useEventSelection();
  const byType = (type?: EventType) =>
    EVENTS.filter(
      event =>
        matchesQuery(event, filter.query, 'all') &&
        (!type || event.type === type)
    );
  const available = (type?: EventType) => (
    <Scrollable height="16rem">
      <AvailableSelectList events={byType(type)} selection={selection} />
    </Scrollable>
  );
  return (
    <FilterDrawer title="Filter: Events" count={selection.ids.size}>
      <Stack space={5}>
        <SearchField
          label="Search events"
          placeholder="Name, date or ID"
          value={filter.query}
          onChange={filter.setQuery}
          onClear={() => filter.setQuery('')}
        />
        <Tabs aria-label="Event type">
          <Tabs.List aria-label="Event type">
            <Tabs.Item id="all">All</Tabs.Item>
            <Tabs.Item id="single">Single Date</Tabs.Item>
            <Tabs.Item id="season">Season Ticket</Tabs.Item>
            <Tabs.Item id="sub">Subscription</Tabs.Item>
          </Tabs.List>
          <Tabs.TabPanel id="all">{available()}</Tabs.TabPanel>
          <Tabs.TabPanel id="single">{available('Single Date')}</Tabs.TabPanel>
          <Tabs.TabPanel id="season">
            {available('Season Ticket')}
          </Tabs.TabPanel>
          <Tabs.TabPanel id="sub">{available('Subscription')}</Tabs.TabPanel>
        </Tabs>
        <Divider />
        <SelectedHeader
          count={selection.selected.length}
          onClear={selection.clear}
        />
        <SelectedSelectList selection={selection} />
      </Stack>
    </FilterDrawer>
  );
};

export const FilterTwoSelectLists = meta.story({
  parameters: { surface: false },
  render: () => <TwoSelectLists />,
});

/**
 * **Version 3 — Browse / Selected tabs.** A `Tabs` split separates browsing
 * from the current selection. The Browse tab paginates an add-only list with a
 * `Select` type filter; the Selected tab shows full-data cards with removal.
 */
const BrowseSelectedTabs = () => {
  const filter = useEventFilter();
  const selection = useEventSelection();
  const { page, setPage, pageItems } = usePagination(filter.results, PAGE_SIZE);
  return (
    <FilterDrawer title="Filter: Events" count={selection.ids.size}>
      <Tabs aria-label="Events">
        <Tabs.List aria-label="Events">
          <Tabs.Item id="browse">Browse</Tabs.Item>
          <Tabs.Item id="selected">Selected ({selection.ids.size})</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="browse">
          <Stack space={4}>
            <SearchField
              label="Search events"
              placeholder="Name, date or ID"
              value={filter.query}
              onChange={filter.setQuery}
              onClear={() => filter.setQuery('')}
            />
            <TypeSelect types={filter.types} onChange={filter.setTypes} />
            <Stack space={3}>
              {pageItems.map(event => (
                <AddResultRow
                  key={event.id}
                  event={event}
                  added={selection.ids.has(event.id)}
                  onAdd={() => selection.add(event.id)}
                />
              ))}
              {filter.results.length === 0 && (
                <EmptyHint>No events match your search.</EmptyHint>
              )}
            </Stack>
            <Pagination
              totalItems={filter.results.length}
              pageSize={PAGE_SIZE}
              page={page}
              onChange={setPage}
            />
          </Stack>
        </Tabs.TabPanel>
        <Tabs.TabPanel id="selected">
          <Stack space={4}>
            <SelectedHeader
              count={selection.selected.length}
              onClear={selection.clear}
            />
            <SelectedCards selection={selection} />
          </Stack>
        </Tabs.TabPanel>
      </Tabs>
    </FilterDrawer>
  );
};

export const FilterBrowseSelectedTabs = meta.story({
  parameters: { surface: false },
  render: () => <BrowseSelectedTabs />,
});

/**
 * **Version 4 — Expandable selected rows.** Selected events collapse to a
 * summary (name + date) inside an `Accordion`; expanding reveals the full IDs
 * and a remove action. The add-only result list is paginated with a `Select`
 * type filter.
 */
const ExpandableSelected = () => {
  const filter = useEventFilter();
  const selection = useEventSelection();
  const { page, setPage, pageItems } = usePagination(filter.results, PAGE_SIZE);
  return (
    <FilterDrawer title="Filter: Events" count={selection.ids.size}>
      <Stack space={5}>
        <Stack space={3}>
          <SelectedHeader
            count={selection.selected.length}
            onClear={selection.clear}
          />
          {selection.selected.length === 0 ? (
            <EmptyHint>Nothing selected yet.</EmptyHint>
          ) : (
            <Accordion allowsMultipleExpanded>
              {selection.selected.map(event => (
                <Accordion.Item key={event.id} id={event.id}>
                  <Accordion.Header>
                    {event.name} — {formatDate(event.date)}
                  </Accordion.Header>
                  <Accordion.Content>
                    <Stack space={3}>
                      <EventFields event={event} />
                      <Button
                        size="small"
                        variant="ghost"
                        onPress={() => selection.remove(event.id)}
                      >
                        <X size={16} /> Remove from selection
                      </Button>
                    </Stack>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Stack>
        <Divider />
        <SearchField
          label="Search events"
          placeholder="Name, date or ID"
          value={filter.query}
          onChange={filter.setQuery}
          onClear={() => filter.setQuery('')}
        />
        <TypeSelect types={filter.types} onChange={filter.setTypes} />
        <Stack space={3}>
          {pageItems.map(event => (
            <AddResultRow
              key={event.id}
              event={event}
              added={selection.ids.has(event.id)}
              onAdd={() => selection.add(event.id)}
            />
          ))}
          {filter.results.length === 0 && (
            <EmptyHint>No events match your search.</EmptyHint>
          )}
        </Stack>
        <Pagination
          totalItems={filter.results.length}
          pageSize={PAGE_SIZE}
          page={page}
          onChange={setPage}
        />
      </Stack>
    </FilterDrawer>
  );
};

export const FilterExpandableSelected = meta.story({
  parameters: { surface: false },
  render: () => <ExpandableSelected />,
});

/**
 * **Version 5 — Autocomplete add.** Events are added through an `Autocomplete`
 * (the only search surface; it filters as you type). Selected events drop into
 * a bordered `SelectList` below with a trailing "Remove". Type is narrowed with
 * a `Checkbox.Group`.
 */
const AutocompleteAdd = () => {
  const filter = useEventFilter();
  const selection = useEventSelection();
  const options = EVENTS.filter(
    event => filter.types.length === 0 || filter.types.includes(event.type)
  );
  return (
    <FilterDrawer title="Filter: Events" count={selection.ids.size}>
      <Stack space={5}>
        <Checkbox.Group
          label="Type"
          orientation="horizontal"
          value={filter.types}
          onChange={values => filter.setTypes(values as EventType[])}
        >
          {EVENT_TYPES.map(type => (
            <Checkbox key={type} value={type} label={type} />
          ))}
        </Checkbox.Group>
        <Autocomplete
          label="Search and add events"
          placeholder="Type a name, date or ID"
          value={filter.query}
          onChange={filter.setQuery}
          onClear={() => filter.setQuery('')}
          onSubmit={(_, key) => {
            if (key != null) {
              selection.add(String(key));
              filter.setQuery('');
            }
          }}
        >
          {options.map(event => (
            <Autocomplete.Option
              key={event.id}
              id={event.id}
              textValue={`${event.name} ${event.date} ${event.idGruppe} ${event.idEinzeltermin} ${event.idSpielstaette}`}
            >
              <TextValue>{event.name}</TextValue>
              <Description>
                {formatDate(event.date)} · {event.time} · {event.venue} ·{' '}
                {event.idEinzeltermin}
              </Description>
            </Autocomplete.Option>
          ))}
        </Autocomplete>
        <Divider />
        <SelectedHeader
          count={selection.selected.length}
          onClear={selection.clear}
        />
        <SelectedSelectList selection={selection} />
      </Stack>
    </FilterDrawer>
  );
};

export const FilterAutocompleteAdd = meta.story({
  parameters: { surface: false },
  render: () => <AutocompleteAdd />,
});

/**
 * **Version 6 — Grouped by type.** The result list is split into `Accordion`
 * sections per type (the grouping *is* the type filter), each a toggle-able
 * `SelectList`. A leading "Selected" section keeps the current picks (full-data
 * cards) in view.
 */
const GroupedByType = () => {
  const filter = useEventFilter();
  const selection = useEventSelection();
  const byType = (type: EventType) =>
    EVENTS.filter(
      event => matchesQuery(event, filter.query, 'all') && event.type === type
    );
  return (
    <FilterDrawer title="Filter: Events" count={selection.ids.size}>
      <Stack space={4}>
        <SearchField
          label="Search events"
          placeholder="Name, date or ID"
          value={filter.query}
          onChange={filter.setQuery}
          onClear={() => filter.setQuery('')}
        />
        <Accordion
          allowsMultipleExpanded
          defaultExpandedKeys={['selected', 'Single Date']}
        >
          <Accordion.Item id="selected">
            <Accordion.Header>Selected ({selection.ids.size})</Accordion.Header>
            <Accordion.Content>
              <Stack space={3}>
                {selection.ids.size > 0 && (
                  <Inline alignX="left">
                    <div className="grow" />
                    <Button
                      size="small"
                      variant="ghost"
                      onPress={selection.clear}
                    >
                      Clear all
                    </Button>
                  </Inline>
                )}
                <SelectedCards selection={selection} />
              </Stack>
            </Accordion.Content>
          </Accordion.Item>
          {EVENT_TYPES.map(type => (
            <Accordion.Item key={type} id={type}>
              <Accordion.Header>{type}</Accordion.Header>
              <Accordion.Content>
                <AvailableSelectList
                  events={byType(type)}
                  selection={selection}
                />
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </Stack>
    </FilterDrawer>
  );
};

export const FilterGroupedByType = meta.story({
  parameters: { surface: false },
  render: () => <GroupedByType />,
});

/**
 * **Version 7 — Dense table.** Selected events are pinned in a compact `Table`
 * (with a remove action per row); the paginated, add-only result `Table` lays
 * the events out as columns. Type is filtered with a `Select`.
 */
const DenseTable = () => {
  const filter = useEventFilter();
  const selection = useEventSelection();
  const { page, setPage, pageItems } = usePagination(filter.results, PAGE_SIZE);
  return (
    <FilterDrawer title="Filter: Events" count={selection.ids.size}>
      <Stack space={5}>
        <Stack space={2}>
          <SelectedHeader
            count={selection.selected.length}
            onClear={selection.clear}
          />
          {selection.selected.length === 0 ? (
            <EmptyHint>Nothing selected yet.</EmptyHint>
          ) : (
            <Table aria-label="Selected events" size="compact">
              <Table.Header>
                <Table.Column rowHeader>Event</Table.Column>
                <Table.Column>Type</Table.Column>
                <Table.Column>IDs</Table.Column>
                <Table.Column aria-label="Remove"> </Table.Column>
              </Table.Header>
              <Table.Body>
                {selection.selected.map(event => (
                  <Table.Row key={event.id}>
                    <Table.Cell>
                      {event.name} · {formatDate(event.date)}
                    </Table.Cell>
                    <Table.Cell>{event.type}</Table.Cell>
                    <Table.Cell>
                      {event.idGruppe} / {event.idEinzeltermin} /{' '}
                      {event.idSpielstaette}
                    </Table.Cell>
                    <Table.Cell>
                      <IconButton
                        aria-label={`Remove ${event.name}`}
                        onPress={() => selection.remove(event.id)}
                      >
                        <X size={18} />
                      </IconButton>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Stack>
        <Divider />
        <Inline space={3} alignY="bottom">
          <div className="grow">
            <SearchField
              label="Search events"
              placeholder="Name, date or ID"
              value={filter.query}
              onChange={filter.setQuery}
              onClear={() => filter.setQuery('')}
            />
          </div>
          <TypeSelect types={filter.types} onChange={filter.setTypes} />
        </Inline>
        {filter.results.length === 0 ? (
          <EmptyHint>No events match your search.</EmptyHint>
        ) : (
          <Table aria-label="Available events" size="compact">
            <Table.Header>
              <Table.Column rowHeader>Event</Table.Column>
              <Table.Column>Venue</Table.Column>
              <Table.Column aria-label="Add"> </Table.Column>
            </Table.Header>
            <Table.Body>
              {pageItems.map(event => (
                <Table.Row key={event.id}>
                  <Table.Cell>
                    {event.name} · {formatDate(event.date)}
                  </Table.Cell>
                  <Table.Cell>{event.venue}</Table.Cell>
                  <Table.Cell>
                    {selection.ids.has(event.id) ? (
                      <Badge variant="success">
                        <Check size={14} /> Added
                      </Badge>
                    ) : (
                      <Button
                        size="small"
                        onPress={() => selection.add(event.id)}
                      >
                        <Plus size={16} /> Add
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        <Pagination
          totalItems={filter.results.length}
          pageSize={PAGE_SIZE}
          page={page}
          onChange={setPage}
        />
      </Stack>
    </FilterDrawer>
  );
};

export const FilterDenseTable = meta.story({
  parameters: { surface: false },
  render: () => <DenseTable />,
});

/**
 * **Version 8 — Sticky summary.** A sticky bar keeps the selection count and
 * "Clear all" in view while scrolling the paginated result list; pressing
 * "Show" expands the full-data cards inline. Type uses toggle pills.
 */
const StickySummary = () => {
  const filter = useEventFilter();
  const selection = useEventSelection();
  const [expanded, setExpanded] = useState(false);
  const { page, setPage, pageItems } = usePagination(filter.results, PAGE_SIZE);
  return (
    <FilterDrawer title="Filter: Events" count={selection.ids.size}>
      <Stack space={4}>
        <div className="sticky top-0 z-1">
          <Card>
            <Card.Body>
              <Stack space={3}>
                <Inline space={2} alignY="center">
                  <Text weight="medium">{selection.ids.size} selected</Text>
                  <div className="grow" />
                  {selection.ids.size > 0 && (
                    <>
                      <Button
                        size="small"
                        variant="ghost"
                        onPress={selection.clear}
                      >
                        Clear all
                      </Button>
                      <Button
                        size="small"
                        variant="secondary"
                        onPress={() => setExpanded(value => !value)}
                      >
                        {expanded ? 'Hide' : 'Show'}
                      </Button>
                    </>
                  )}
                </Inline>
                {expanded && selection.ids.size > 0 && (
                  <SelectedCards selection={selection} />
                )}
              </Stack>
            </Card.Body>
          </Card>
        </div>
        <SearchField
          label="Search events"
          placeholder="Name, date or ID"
          value={filter.query}
          onChange={filter.setQuery}
          onClear={() => filter.setQuery('')}
        />
        <TypeToggles types={filter.types} onToggle={filter.toggleType} />
        <Stack space={3}>
          {pageItems.map(event => (
            <AddResultRow
              key={event.id}
              event={event}
              added={selection.ids.has(event.id)}
              onAdd={() => selection.add(event.id)}
            />
          ))}
          {filter.results.length === 0 && (
            <EmptyHint>No events match your search.</EmptyHint>
          )}
        </Stack>
        <Pagination
          totalItems={filter.results.length}
          pageSize={PAGE_SIZE}
          page={page}
          onChange={setPage}
        />
      </Stack>
    </FilterDrawer>
  );
};

export const FilterStickySummary = meta.story({
  parameters: { surface: false },
  render: () => <StickySummary />,
});

/**
 * **Version 9 — Search-by switcher.** A `Select` chooses the search field
 * (All / Name / Date / ID) feeding the `SearchField`; a `Tabs` strip scopes
 * results by type. Each result row shows its full fields with an Add control;
 * selected events appear as full-data cards below.
 */
const SearchBySwitcher = () => {
  const filter = useEventFilter();
  const selection = useEventSelection();
  const byType = (type?: EventType) =>
    EVENTS.filter(
      event =>
        matchesQuery(event, filter.query, filter.mode) &&
        (!type || event.type === type)
    );
  const results = (type?: EventType) => {
    const events = byType(type);
    return events.length === 0 ? (
      <EmptyHint>No events match your search.</EmptyHint>
    ) : (
      <Scrollable height="16rem">
        <Stack space={3}>
          {events.map(event => (
            <Stack key={event.id} space={1}>
              <Inline space={2} alignY="center">
                <Text weight="medium">{event.name}</Text>
                <Badge variant={TYPE_BADGE_VARIANT[event.type]}>
                  {event.type}
                </Badge>
                <div className="grow" />
                {selection.ids.has(event.id) ? (
                  <Badge variant="success">
                    <Check size={14} /> Added
                  </Badge>
                ) : (
                  <Button size="small" onPress={() => selection.add(event.id)}>
                    <Plus size={16} /> Add
                  </Button>
                )}
              </Inline>
              <EventFields event={event} />
            </Stack>
          ))}
        </Stack>
      </Scrollable>
    );
  };
  return (
    <FilterDrawer title="Filter: Events" count={selection.ids.size}>
      <Stack space={4}>
        <Inline space={3} alignY="bottom">
          <div className="grow">
            <SearchField
              label="Search events"
              placeholder="Search…"
              value={filter.query}
              onChange={filter.setQuery}
              onClear={() => filter.setQuery('')}
            />
          </div>
          <Select
            aria-label="Search by"
            selectedKey={filter.mode}
            onChange={key => filter.setMode(key as SearchMode)}
          >
            <Select.Option id="all">All</Select.Option>
            <Select.Option id="name">Name</Select.Option>
            <Select.Option id="date">Date</Select.Option>
            <Select.Option id="id">ID</Select.Option>
          </Select>
        </Inline>
        <Tabs aria-label="Event type">
          <Tabs.List aria-label="Event type">
            <Tabs.Item id="all">All</Tabs.Item>
            <Tabs.Item id="single">Single Date</Tabs.Item>
            <Tabs.Item id="season">Season Ticket</Tabs.Item>
            <Tabs.Item id="sub">Subscription</Tabs.Item>
          </Tabs.List>
          <Tabs.TabPanel id="all">{results()}</Tabs.TabPanel>
          <Tabs.TabPanel id="single">{results('Single Date')}</Tabs.TabPanel>
          <Tabs.TabPanel id="season">{results('Season Ticket')}</Tabs.TabPanel>
          <Tabs.TabPanel id="sub">{results('Subscription')}</Tabs.TabPanel>
        </Tabs>
        <Divider />
        <SelectedHeader
          count={selection.selected.length}
          onClear={selection.clear}
        />
        <SelectedCards selection={selection} />
      </Stack>
    </FilterDrawer>
  );
};

export const FilterSearchBySwitcher = meta.story({
  parameters: { surface: false },
  render: () => <SearchBySwitcher />,
});

/**
 * **Version 10 — Reference.** The most complete take: selected events sit in a
 * bordered `SelectList` (trailing "Remove" + "Clear all") above an add-only,
 * paginated list of full entity cards; type is a `Checkbox.Group`; the Drawer's
 * "Apply" commits. This is the closest match to the doc's "Entity Multiselect".
 */
const ReferenceFilter = () => {
  const filter = useEventFilter();
  const selection = useEventSelection();
  const { page, setPage, pageItems } = usePagination(filter.results, PAGE_SIZE);
  return (
    <FilterDrawer title="Filter: Events" count={selection.ids.size}>
      <Stack space={5}>
        <Stack space={3}>
          <SelectedHeader
            count={selection.selected.length}
            onClear={selection.clear}
          />
          <SelectedSelectList selection={selection} />
        </Stack>
        <Divider />
        <SearchField
          label="Search events"
          placeholder="Name, date or ID"
          value={filter.query}
          onChange={filter.setQuery}
          onClear={() => filter.setQuery('')}
        />
        <Checkbox.Group
          label="Type"
          orientation="horizontal"
          value={filter.types}
          onChange={values => filter.setTypes(values as EventType[])}
        >
          {EVENT_TYPES.map(type => (
            <Checkbox key={type} value={type} label={type} />
          ))}
        </Checkbox.Group>
        <Text weight="medium">Results ({filter.results.length})</Text>
        <Stack space={3}>
          {pageItems.map(event => (
            <Card key={event.id}>
              <Card.Body>
                <Stack space={2}>
                  <Inline space={2} alignY="center">
                    <Text weight="medium">{event.name}</Text>
                    <Badge variant={TYPE_BADGE_VARIANT[event.type]}>
                      {event.type}
                    </Badge>
                    <div className="grow" />
                    {selection.ids.has(event.id) ? (
                      <Badge variant="success">
                        <Check size={14} /> Added
                      </Badge>
                    ) : (
                      <Button
                        size="small"
                        onPress={() => selection.add(event.id)}
                      >
                        <Plus size={16} /> Add
                      </Button>
                    )}
                  </Inline>
                  <EventFields event={event} />
                </Stack>
              </Card.Body>
            </Card>
          ))}
          {filter.results.length === 0 && (
            <EmptyHint>No events match your search.</EmptyHint>
          )}
        </Stack>
        <Pagination
          totalItems={filter.results.length}
          pageSize={PAGE_SIZE}
          page={page}
          onChange={setPage}
        />
      </Stack>
    </FilterDrawer>
  );
};

export const FilterReference = meta.story({
  parameters: { surface: false },
  render: () => <ReferenceFilter />,
});
