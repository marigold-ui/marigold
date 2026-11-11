import type { StoryContext } from '@storybook/react-vite';
import {
  CalendarDays,
  ChartColumn,
  Download,
  MapPin,
  Plus,
  Search,
  ShoppingCart,
  Ticket,
} from 'lucide-react';
import { useState } from 'react';
import { expect, fn, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { isAppleDevice } from '@react-aria/utils';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { useAsyncList } from '../hooks';
import { CommandPalette } from './CommandPalette';

const meta = preview.meta({
  title: 'Components/CommandPalette',
  component: CommandPalette.Trigger,
  subcomponents: { CommandPalette },
  tags: ['component-test'],
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    shortcut: { control: { type: 'text' } },
  },
  args: {
    onOpenChange: fn(),
    // Every story passes its own children, which replace this.
    children: null,
  },
});

const shortcutKeys = () => {
  const modifier = isAppleDevice() ? 'Meta' : 'Control';
  return `{${modifier}>}k{/${modifier}}`;
};

// A closed palette is only its trigger, which `Basic` already shows. Stories
// skip their own snapshot and tests that open a state worth guarding opt back
// in, so Chromatic captures the open palette at the end of the test.
const noSnapshot = { parameters: { chromatic: { disableSnapshot: true } } };
const snapshot = { parameters: { chromatic: { disableSnapshot: false } } };

const openPalette = ({
  canvas,
  userEvent,
}: Pick<StoryContext, 'canvas' | 'userEvent'>) =>
  userEvent.click(canvas.getByRole('button', { name: /go to|search/i }));

// The overlay is not visible for a frame while it enters, even without a
// fade, so wait for it instead of asserting once.
const expectVisible = (element: HTMLElement) =>
  waitFor(() => expect(element).toBeVisible());

// The first row is the active one: the input points at it with
// `aria-activedescendant` (virtual focus).
const expectFirstRowActive = (canvas: StoryContext['canvas'], name?: string) =>
  waitFor(() => {
    const [first] = canvas.getAllByRole('menuitem');
    if (name) expect(first).toHaveTextContent(name);
    expect(canvas.getByRole('searchbox')).toHaveAttribute(
      'aria-activedescendant',
      first.id
    );
  });

const onAction = fn();

// Basic
// ---------------
export const Basic = meta.story({
  render: args => (
    <CommandPalette.Trigger {...args}>
      <CommandPalette.Button />
      <CommandPalette onAction={onAction}>
        <CommandPalette.Group title="Pages">
          <CommandPalette.Item id="events" href="#events">
            <CalendarDays />
            Events
          </CommandPalette.Item>
          <CommandPalette.Item id="orders" href="#orders">
            <ShoppingCart />
            Orders
          </CommandPalette.Item>
          <CommandPalette.Item id="reports" href="#reports">
            <ChartColumn />
            Reports
          </CommandPalette.Item>
          <CommandPalette.Item id="venues" href="#venues">
            <MapPin />
            Venues
          </CommandPalette.Item>
        </CommandPalette.Group>
        <CommandPalette.Group title="Actions">
          <CommandPalette.Item id="create-event">
            <Plus />
            Create event
          </CommandPalette.Item>
          <CommandPalette.Item id="create-voucher">
            <Ticket />
            Create voucher
          </CommandPalette.Item>
          <CommandPalette.Item id="export">
            <Download />
            Export café sales
          </CommandPalette.Item>
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  ),
});

Basic.test(
  'Opens from the trigger with the input focused',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });

    const dialog = await canvas.findByRole('dialog', {
      name: 'Command palette',
    });
    await expectVisible(dialog);
    await expect(canvas.getByRole('searchbox')).toHaveFocus();
  }
);

Basic.test(
  'Opens with the global shortcut',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await userEvent.keyboard(shortcutKeys());

    await expectVisible(
      await canvas.findByRole('dialog', { name: 'Command palette' })
    );
  }
);

Basic.test(
  'Opens with the first item active',
  snapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });

    const input = await canvas.findByRole('searchbox');
    await canvas.findAllByRole('menuitem');
    // Virtual focus: DOM focus stays in the input.
    await expectFirstRowActive(canvas);
    await expect(input).toHaveFocus();
  }
);

Basic.test(
  'Keeps the first item active after deleting the query',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await canvas.findByRole('searchbox');
    await userEvent.keyboard('re');
    await userEvent.keyboard('{Backspace}{Backspace}');

    await expectFirstRowActive(canvas);
  }
);

Basic.test(
  'Filters accent- and case-insensitively, keeping groups',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await userEvent.keyboard('CAFE');

    await waitFor(() =>
      expect(canvas.getAllByRole('menuitem')).toHaveLength(1)
    );
    await expect(canvas.getByRole('menuitem')).toHaveTextContent(
      'Export café sales'
    );
  }
);

Basic.test(
  'Shows the empty state when nothing matches',
  snapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await userEvent.keyboard('xyz');

    await expectVisible(await canvas.findByText('No results for “xyz”'));
  }
);

Basic.test(
  'Runs the action, closes, restores focus and clears on reopen',
  noSnapshot,
  async ({ canvas, step, userEvent }) => {
    onAction.mockClear();
    const trigger = canvas.getByRole('button', { name: /go to/i });

    await step('Choose an action from the keyboard', async () => {
      await userEvent.click(trigger);
      await userEvent.keyboard('voucher');
      await userEvent.keyboard('{ArrowDown}{Enter}');

      await expect(onAction).toHaveBeenCalledWith('create-voucher');
      await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
      await expect(trigger).toHaveFocus();
    });

    await step('Reopen with an empty query', async () => {
      await userEvent.click(trigger);

      await expect(canvas.getByRole('searchbox')).toHaveValue('');
    });
  }
);

Basic.test(
  'Keeps typed characters away from page shortcuts',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    // Stands in for an app (or Storybook) shortcut that ignores text fields.
    const reached: string[] = [];
    const listener = (e: KeyboardEvent) => reached.push(e.key);
    document.addEventListener('keydown', listener);

    try {
      await openPalette({ canvas, userEvent });
      await canvas.findByRole('searchbox');
      await userEvent.keyboard('ab{ArrowDown}');

      await expect(reached).not.toContain('a');
      await expect(reached).not.toContain('b');
      // Navigation keys still pass, so overlays and shortcuts keep working.
      await expect(reached).toContain('ArrowDown');
    } finally {
      document.removeEventListener('keydown', listener);
    }
  }
);

Basic.test('Closes with Escape', noSnapshot, async ({ canvas, userEvent }) => {
  await openPalette({ canvas, userEvent });
  await canvas.findByRole('dialog');
  await userEvent.keyboard('{Escape}');

  await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
});

Basic.test(
  'Marks the matched part of a label, accent-insensitively',
  snapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await userEvent.keyboard('cafe');

    const item = await canvas.findByRole('menuitem', {
      name: 'Export café sales',
    });
    await expect(item.querySelector('mark')).toHaveTextContent('café');
  }
);

Basic.test(
  'Escape clears the query first, then closes',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await userEvent.keyboard('orders');
    await userEvent.keyboard('{Escape}');

    await expect(canvas.getByRole('searchbox')).toHaveValue('');
    await expect(canvas.getByRole('dialog')).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  }
);

Basic.test(
  'Shows the key legend, hidden from assistive tech',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });

    const legend = await canvas.findByText('Navigate');
    await expectVisible(legend);
    await expect(legend.closest('[aria-hidden="true"]')).not.toBeNull();
  }
);

// Custom empty state
// ---------------
// Replaces the built-in "No results" message, for example to point people to
// what they can search for.
export const CustomEmptyState = meta.story({
  ...noSnapshot,
  render: args => (
    <CommandPalette.Trigger {...args}>
      <CommandPalette.Button />
      <CommandPalette emptyState="No page with that name. Try “events” or “orders”.">
        <CommandPalette.Group title="Pages">
          <CommandPalette.Item id="events" href="#events">
            <CalendarDays />
            Events
          </CommandPalette.Item>
          <CommandPalette.Item id="orders" href="#orders">
            <ShoppingCart />
            Orders
          </CommandPalette.Item>
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  ),
});

CustomEmptyState.test(
  'Shows the custom message instead of the built-in one',
  snapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await userEvent.keyboard('xyz');

    await expectVisible(await canvas.findByText(/No page with that name/));
    await expect(canvas.queryByText(/No results for/)).toBeNull();
  }
);

// Loading
// ---------------
// While results load and none are there yet, the loading message replaces
// the list and the search field shows a spinner.
export const Loading = meta.story({
  ...noSnapshot,
  render: args => (
    <CommandPalette.Trigger {...args}>
      <CommandPalette.Button />
      <CommandPalette
        placeholder="Search events…"
        loading
        emptyState="No events found."
      >
        {[]}
      </CommandPalette>
    </CommandPalette.Trigger>
  ),
});

Loading.test(
  'Shows the loading message and a spinner instead of the empty state',
  snapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });

    // The footer repeats the status, hidden from assistive tech, so look
    // inside the list.
    const list = await canvas.findByRole('menu');
    await expectVisible(await within(list).findByText('Loading...'));
    await expect(canvas.queryByText('No events found.')).toBeNull();
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
  }
);

// Variants
// ---------------
export const Variants = meta.story({
  ...noSnapshot,
  render: args => (
    <CommandPalette.Trigger {...args}>
      <CommandPalette.Button />
      <CommandPalette>
        <CommandPalette.Group title="Actions">
          <CommandPalette.Item id="duplicate">
            Duplicate event
          </CommandPalette.Item>
          <CommandPalette.Item id="delete" variant="destructive">
            Delete event
          </CommandPalette.Item>
        </CommandPalette.Group>
        <CommandPalette.Group title="Restricted">
          <CommandPalette.Item id="fees" variant="master">
            Edit fees
          </CommandPalette.Item>
          <CommandPalette.Item id="impersonate" variant="admin">
            Impersonate user
          </CommandPalette.Item>
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  ),
});

Variants.test('Shows each variant', snapshot, async ({ canvas, userEvent }) => {
  await openPalette({ canvas, userEvent });

  await waitFor(() => expect(canvas.getAllByRole('menuitem')).toHaveLength(4));
});

Variants.test(
  'Filters variant items on their label, not the access marker',
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await userEvent.keyboard('fees');

    await waitFor(() =>
      expect(canvas.getAllByRole('menuitem')).toHaveLength(1)
    );
    await expect(canvas.getByRole('menuitem')).toHaveTextContent('Edit fees');
  }
);

// With descriptions
// ---------------
// A description line tells similar results apart. With `<Text>` slots the
// children are not plain text, so pass `textValue` for filtering.
export const WithDescriptions = meta.story({
  ...noSnapshot,
  render: args => (
    <CommandPalette.Trigger {...args}>
      <CommandPalette.Button />
      <CommandPalette>
        <CommandPalette.Group title="Pages">
          <CommandPalette.Item id="events" href="#events" textValue="Events">
            <CalendarDays />
            <Text slot="label">Events</Text>
            <Text slot="description">Page</Text>
          </CommandPalette.Item>
          <CommandPalette.Item
            id="reports"
            href="#reports"
            textValue="Daily report"
          >
            <ChartColumn />
            <Text slot="label">Daily report</Text>
            <Text slot="description">Analytics › Reports</Text>
          </CommandPalette.Item>
        </CommandPalette.Group>
        <CommandPalette.Group title="Actions">
          <CommandPalette.Item id="export" textValue="Export café sales">
            <Download />
            <Text slot="label">Export café sales</Text>
            <Text slot="description">CSV, last 30 days</Text>
          </CommandPalette.Item>
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  ),
});

WithDescriptions.test(
  'Shows a description under each label',
  snapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });

    await expectVisible(await canvas.findByText('Analytics › Reports'));
  }
);

// Shortcut in fields
// ---------------
export const ShortcutInFields = meta.story({
  ...noSnapshot,
  render: args => {
    // Stands in for a rich-text editor that binds ⌘K to "insert link".
    const claimShortcut = (e: React.KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) e.preventDefault();
    };
    return (
      <Stack space={4}>
        <TextField label="Plain field" />
        <div onKeyDown={claimShortcut}>
          <TextField label="Editor that claims the shortcut" />
        </div>
        <CommandPalette.Trigger {...args}>
          <CommandPalette>
            <CommandPalette.Item id="events">Events</CommandPalette.Item>
          </CommandPalette>
        </CommandPalette.Trigger>
      </Stack>
    );
  },
});

ShortcutInFields.test(
  'Opens from inside a plain text field',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('Plain field'));
    await userEvent.keyboard(shortcutKeys());

    await expectVisible(await canvas.findByRole('dialog'));
  }
);

ShortcutInFields.test(
  'Yields when another handler already claimed the shortcut',
  async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByLabelText('Editor that claims the shortcut')
    );
    await userEvent.keyboard(shortcutKeys());

    await expect(canvas.queryByRole('dialog')).toBeNull();
  }
);

ShortcutInFields.test(
  'Can be disabled',
  { args: { shortcut: false } },
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('Plain field'));
    await userEvent.keyboard(shortcutKeys());

    await expect(canvas.queryByRole('dialog')).toBeNull();
  }
);

// Any button
// ---------------
// The trigger opens the palette from any button, for example an icon button
// in a compact top bar.
export const AnyButton = meta.story({
  ...noSnapshot,
  render: args => (
    <CommandPalette.Trigger {...args}>
      <Button aria-label="Search">
        <Search />
      </Button>
      <CommandPalette>
        <CommandPalette.Item id="events">Events</CommandPalette.Item>
      </CommandPalette>
    </CommandPalette.Trigger>
  ),
});

AnyButton.test(
  'Opens from a regular button and marks it as expanded',
  async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Search' });
    await expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(button).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(button);

    await expectVisible(
      await canvas.findByRole('dialog', { name: 'Command palette' })
    );
    await expect(button).toHaveAttribute('aria-expanded', 'true');
  }
);

AnyButton.test(
  'Choosing an item does not reopen the palette',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Search' }));
    await userEvent.click(await canvas.findByRole('menuitem'));

    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  }
);

// Controlled
// ---------------
const ControlledPalette = () => {
  const [open, setOpen] = useState(false);
  return (
    <Stack space={2} alignX="left">
      <Button onPress={() => setOpen(true)}>Open from anywhere</Button>
      <CommandPalette open={open} onOpenChange={setOpen}>
        <CommandPalette.Item id="events">Events</CommandPalette.Item>
        <CommandPalette.Item id="orders">Orders</CommandPalette.Item>
      </CommandPalette>
    </Stack>
  );
};

export const Controlled = meta.story({
  ...noSnapshot,
  render: () => <ControlledPalette />,
});

Controlled.test(
  'Opens from outside and reports closing back',
  async ({ canvas, userEvent }) => {
    const opener = canvas.getByRole('button', { name: 'Open from anywhere' });
    await userEvent.click(opener);

    await expectVisible(await canvas.findByRole('dialog'));

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());

    // State went back to closed, so the button opens it again.
    await userEvent.click(opener);
    await expectVisible(await canvas.findByRole('dialog'));
  }
);

// Search prefix
// ---------------
// An app-level pattern, no component API: `e:1024` looks up an event by its
// number. The built-in filter is off while the prefix is present, because the
// query is not a label.
const events = [
  { id: '1024', name: 'Jazz im Park', date: 'Jun 14, 2026' },
  { id: '1031', name: 'Stadtfest', date: 'Jul 2, 2026' },
  { id: '2048', name: 'Open-Air Kino', date: 'Aug 21, 2026' },
];

const SearchPrefixPalette = () => {
  const [query, setQuery] = useState('');
  const lookup = query.toLowerCase().startsWith('e:');
  const id = query.slice(2).trim();
  const matches = lookup && id ? events.filter(e => e.id.startsWith(id)) : [];

  return (
    <CommandPalette.Trigger>
      <CommandPalette.Button />
      <CommandPalette
        placeholder="Search pages, or e:1024 for an event…"
        inputValue={query}
        onInputChange={setQuery}
        filter={lookup ? false : undefined}
        emptyState={
          lookup
            ? id
              ? `No event with a number starting with ${id}.`
              : 'Type an event number, for example e:1024.'
            : undefined
        }
      >
        {lookup ? (
          matches.length > 0 && (
            <CommandPalette.Group title="Events">
              {matches.map(event => (
                <CommandPalette.Item
                  key={event.id}
                  id={event.id}
                  href={`#event-${event.id}`}
                  textValue={event.name}
                >
                  <Ticket />
                  <Text slot="label">{event.name}</Text>
                  <Text slot="description">
                    #{event.id}, {event.date}
                  </Text>
                </CommandPalette.Item>
              ))}
            </CommandPalette.Group>
          )
        ) : (
          <CommandPalette.Group title="Pages">
            <CommandPalette.Item id="events" href="#events">
              <CalendarDays />
              Events
            </CommandPalette.Item>
            <CommandPalette.Item id="orders" href="#orders">
              <ShoppingCart />
              Orders
            </CommandPalette.Item>
          </CommandPalette.Group>
        )}
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};

export const SearchPrefix = meta.story({
  ...noSnapshot,
  render: () => <SearchPrefixPalette />,
});

SearchPrefix.test(
  'Lists the records that match a prefixed number',
  snapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await canvas.findByRole('searchbox');
    await userEvent.keyboard('e:10');

    await waitFor(() =>
      expect(canvas.getAllByRole('menuitem')).toHaveLength(2)
    );
    await expect(canvas.getByText('Events')).toBeVisible();
  }
);

SearchPrefix.test(
  'Narrows the lookup, explains it, and falls back to the regular search',
  async ({ canvas, step, userEvent }) => {
    await openPalette({ canvas, userEvent });
    const input = await canvas.findByRole('searchbox');
    const rows = () => canvas.queryAllByRole('menuitem');

    await step('A full number finds one event', async () => {
      await userEvent.keyboard('e:1024');
      await waitFor(() => expect(rows()).toHaveLength(1));
      await expect(rows()[0]).toHaveTextContent('Jazz im Park');
    });

    await step('An unknown number shows the lookup message', async () => {
      await userEvent.keyboard('9');
      await expectVisible(
        await canvas.findByText('No event with a number starting with 10249.')
      );
    });

    await step('The prefix alone explains itself', async () => {
      await userEvent.clear(input);
      await userEvent.keyboard('e:');
      await expectVisible(
        await canvas.findByText('Type an event number, for example e:1024.')
      );
    });

    await step('Without the prefix the regular search applies', async () => {
      await userEvent.clear(input);
      await userEvent.keyboard('ord');
      await waitFor(() => expect(rows()).toHaveLength(1));
      await expect(rows()[0]).toHaveTextContent('Orders');
    });
  }
);

// Async search
// ---------------
// Results come from the server: the built-in filter is off and the query is
// controlled. A local list with a short delay stands in for the API, so the
// story works offline. Debouncing is left to the consumer.
const characters = [
  'Luke Skywalker',
  'C-3PO',
  'R2-D2',
  'Darth Vader',
  'Leia Organa',
  'Owen Lars',
  'Beru Whitesun Lars',
  'R5-D4',
  'Biggs Darklighter',
  'Obi-Wan Kenobi',
].map(name => ({ id: name, name }));

const searchCharacters = (query: string, signal: AbortSignal) =>
  new Promise<typeof characters>((resolve, reject) => {
    const timer = setTimeout(
      () =>
        resolve(
          characters.filter(c =>
            c.name.toLowerCase().includes(query.toLowerCase())
          )
        ),
      150
    );
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(signal.reason);
    });
  });

const AsyncSearchPalette = () => {
  const list = useAsyncList<(typeof characters)[number]>({
    async load({ signal, filterText }) {
      if (!filterText) return { items: [] };
      return { items: await searchCharacters(filterText, signal) };
    },
  });

  return (
    <CommandPalette.Trigger>
      <CommandPalette.Button>Search characters…</CommandPalette.Button>
      <CommandPalette
        placeholder="Type a Star Wars name…"
        filter={false}
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
        items={list.items}
        loading={list.isLoading}
        emptyState={
          list.filterText ? 'No characters found.' : 'Start typing to search.'
        }
      >
        {item => (
          <CommandPalette.Item id={item.id}>{item.name}</CommandPalette.Item>
        )}
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};

export const AsyncSearch = meta.story({
  ...noSnapshot,
  render: () => <AsyncSearchPalette />,
});

AsyncSearch.test(
  'Keeps the first result active as async results change',
  async ({ canvas, step, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: /search characters/i })
    );
    await canvas.findByRole('searchbox');

    await step('Typing activates the first result', async () => {
      await userEvent.keyboard('r2');
      await expectFirstRowActive(canvas, 'R2-D2');
    });

    await step('Deleting activates the first of the new results', async () => {
      await userEvent.keyboard('{Backspace}');
      await expectFirstRowActive(canvas, 'Luke Skywalker');
    });

    await step('New results reset a moved active row', async () => {
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await waitFor(() =>
        expect(canvas.getByRole('searchbox')).toHaveAttribute(
          'aria-activedescendant',
          canvas.getAllByRole('menuitem')[2].id
        )
      );
      await userEvent.keyboard('5');
      await expectFirstRowActive(canvas, 'R5-D4');
    });
  }
);

// Favourites on empty query
// ---------------
// No dedicated API: the consumer controls the query and renders different
// groups while it is empty.
const favourites = [
  { id: 'fav-events', label: 'Events', href: '#events' },
  { id: 'fav-reports', label: 'Daily report', href: '#reports' },
];
const pages = [
  { id: 'events', label: 'Events', href: '#events' },
  { id: 'orders', label: 'Orders', href: '#orders' },
  { id: 'reports', label: 'Daily report', href: '#reports' },
  { id: 'venues', label: 'Venues', href: '#venues' },
  { id: 'vouchers', label: 'Vouchers', href: '#vouchers' },
];

const FavouritesPalette = () => {
  const [query, setQuery] = useState('');
  const [title, items] =
    query === '' ? ['Favourites', favourites] : ['Pages', pages];
  return (
    <CommandPalette.Trigger>
      <CommandPalette.Button />
      <CommandPalette inputValue={query} onInputChange={setQuery}>
        <CommandPalette.Group title={title}>
          {items.map(item => (
            <CommandPalette.Item key={item.id} id={item.id} href={item.href}>
              {item.label}
            </CommandPalette.Item>
          ))}
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};

export const FavouritesOnEmptyQuery = meta.story({
  ...noSnapshot,
  render: () => <FavouritesPalette />,
});

FavouritesOnEmptyQuery.test(
  'Shows favourites until the user types',
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });

    await expectVisible(await canvas.findByText('Favourites'));
    await expect(canvas.getAllByRole('menuitem')).toHaveLength(2);

    await userEvent.keyboard('v');

    await expectVisible(await canvas.findByText('Pages'));
    await expect(canvas.queryByText('Favourites')).toBeNull();
  }
);

// Small screen
// ---------------
export const SmallScreen = meta.story({
  ...Basic.input,
  ...noSnapshot,
  globals: {
    viewport: { value: 'smallScreen' },
  },
});

SmallScreen.test('Opens as a tray', snapshot, async ({ canvas, userEvent }) => {
  await openPalette({ canvas, userEvent });

  await expectVisible(
    await canvas.findByRole('dialog', { name: 'Command palette' })
  );
});
