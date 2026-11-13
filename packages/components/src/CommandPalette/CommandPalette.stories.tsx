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
import { useEffect, useRef, useState } from 'react';
import { expect, fn, screen, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { clearAnnouncer } from '@react-aria/live-announcer';
import { isAppleDevice } from '@react-aria/utils';
import { Button } from '../Button/Button';
import { Description } from '../Description/Description';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { TextValue } from '../TextValue/TextValue';
import { useAsyncList } from '../hooks';
import { CommandPalette, SEARCH_DELAY } from './CommandPalette';
import type { CommandPaletteSearchState } from './CommandPalette';

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

// What screen readers hear without moving focus: React Aria's polite live
// region, which sits outside the story and outlives it.
const politeAnnouncements = () =>
  screen
    .queryAllByRole('log', { hidden: true })
    .find(log => log.getAttribute('aria-live') === 'polite')?.textContent ?? '';

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
  'Tells screen readers once typing pauses that nothing matches',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    clearAnnouncer('polite');
    await openPalette({ canvas, userEvent });
    await userEvent.keyboard('zzz');

    await waitFor(() =>
      expect(politeAnnouncements()).toContain('No results for “zzz”')
    );
    // The keystrokes before the pause stay quiet.
    await expect(politeAnnouncements()).not.toContain('“zz”');
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
  'Tells screen readers the custom message',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    clearAnnouncer('polite');
    await openPalette({ canvas, userEvent });
    await userEvent.keyboard('xyz');

    await waitFor(() =>
      expect(politeAnnouncements()).toContain('No page with that name')
    );
  }
);

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
        filter={false}
        loading
        emptyState="No events found."
      >
        {/* Empty while the server answers: renders no lone title. */}
        <CommandPalette.Group title="Events">{[]}</CommandPalette.Group>
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
    await expect(within(list).queryByText('Events')).toBeNull();
  }
);

Loading.test(
  'Tells screen readers when loading takes a while',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    clearAnnouncer('polite');
    await openPalette({ canvas, userEvent });

    // Quiet at first, so a quick search doesn't interrupt typing.
    await expect(politeAnnouncements()).not.toContain('Loading...');
    await waitFor(() => expect(politeAnnouncements()).toContain('Loading...'), {
      timeout: 2000,
    });
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
            <TextValue>Events</TextValue>
            <Description>Page</Description>
          </CommandPalette.Item>
          <CommandPalette.Item
            id="reports"
            href="#reports"
            textValue="Daily report"
          >
            <ChartColumn />
            <TextValue>Daily report</TextValue>
            <Description>Analytics › Reports</Description>
          </CommandPalette.Item>
        </CommandPalette.Group>
        <CommandPalette.Group title="Actions">
          <CommandPalette.Item id="export" textValue="Export café sales">
            <Download />
            <TextValue>Export café sales</TextValue>
            <Description>CSV, last 30 days</Description>
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
                  <TextValue>{event.name}</TextValue>
                  <Description>
                    #{event.id}, {event.date}
                  </Description>
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

// Search one kind of record
// ---------------
// A group with a `prefix`: a query that starts with it narrows the search
// to that group.
const onScopedQuery = fn();
const onSearchChange = fn();

export const SearchOneKind = meta.story({
  ...noSnapshot,
  render: args => (
    <CommandPalette.Trigger {...args}>
      <CommandPalette.Button />
      <CommandPalette
        onInputChange={onScopedQuery}
        onSearchChange={onSearchChange}
      >
        <CommandPalette.Group title="Pages">
          <CommandPalette.Item id="events">Events</CommandPalette.Item>
          <CommandPalette.Item id="orders">Orders</CommandPalette.Item>
        </CommandPalette.Group>
        <CommandPalette.Group title="Events" prefix="e:" more="More events…">
          <CommandPalette.Item id="jazz">Jazz Night</CommandPalette.Item>
          <CommandPalette.Item id="summer">Summer Open Air</CommandPalette.Item>
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  ),
});

SearchOneKind.test(
  'Narrows the search to a group by its prefix',
  async ({ canvas, step, userEvent }) => {
    onScopedQuery.mockClear();
    onSearchChange.mockClear();
    await openPalette({ canvas, userEvent });
    const search = await canvas.findByRole('searchbox');

    await step('The footer lists the prefix', async () => {
      await expect(canvas.getByText('e:')).toBeInTheDocument();
      await expect(
        canvas.getByRole('group', {
          name: 'Events Type e: to search only Events',
        })
      ).toBeInTheDocument();
    });

    await step('Before typing, the more row narrows to the group', async () => {
      const more = canvas.getByRole('menuitem', { name: /More events…/ });
      await expect(more).toHaveTextContent('or type e:');
      await userEvent.click(more);
      await expect(search).toHaveValue('e:');
      await expect(
        canvas.queryByRole('menuitem', { name: 'Orders' })
      ).toBeNull();
      await userEvent.clear(search);
    });

    await step('Typing the prefix narrows the search', async () => {
      await userEvent.keyboard('e:');
      await waitFor(() =>
        expect(canvas.queryByRole('menuitem', { name: 'Orders' })).toBeNull()
      );
      await expect(canvas.getAllByRole('menuitem')).toHaveLength(2);
    });

    await step('Only the rest of the query is matched', async () => {
      await userEvent.keyboard('jazz');
      await expect(search).toHaveValue('e:jazz');
      await expect(onScopedQuery).toHaveBeenLastCalledWith('e:jazz');
      await waitFor(() =>
        expect(onSearchChange).toHaveBeenLastCalledWith({
          term: 'jazz',
          prefix: 'e:',
        })
      );
      await expectFirstRowActive(canvas, 'Jazz Night');
      await expect(canvas.getAllByRole('menuitem')).toHaveLength(1);
    });

    await step('Deleting the prefix widens the search', async () => {
      await userEvent.clear(search);
      await waitFor(() =>
        expect(canvas.getByRole('menuitem', { name: 'Orders' })).toBeVisible()
      );
    });

    await step(
      'The more row narrows the search, keeping the term',
      async () => {
        await userEvent.keyboard('jazz');
        const more = await canvas.findByRole('menuitem', {
          name: /More events/,
        });
        await expect(more).toHaveTextContent('or type e:');
        await userEvent.click(more);
        await expect(search).toHaveValue('e:jazz');
        await expect(canvas.getByRole('dialog')).toBeInTheDocument();
        await expect(
          canvas.queryByRole('menuitem', { name: /More events/ })
        ).toBeNull();
        await expectFirstRowActive(canvas, 'Jazz Night');
      }
    );
  }
);

// Late results
// ---------------
// Server results that arrive after people moved to a row must not move the
// active row back to the top.
const allTickets = Array.from({ length: 30 }, (_, i) => `Ticket ${i + 1}`);

export const LateResults = meta.story({
  ...noSnapshot,
  render: function Render(args) {
    const [term, setTerm] = useState('');
    const [count, setCount] = useState(10);
    useEffect(() => {
      if (!term) return;
      const timer = setTimeout(() => setCount(allTickets.length), 500);
      return () => clearTimeout(timer);
    }, [term]);
    return (
      <CommandPalette.Trigger {...args}>
        <CommandPalette.Button />
        <CommandPalette
          filter={false}
          onSearchChange={search => setTerm(search.term)}
        >
          <CommandPalette.Group title="Tickets">
            {allTickets.slice(0, count).map(ticket => (
              <CommandPalette.Item key={ticket} id={ticket}>
                {ticket}
              </CommandPalette.Item>
            ))}
          </CommandPalette.Group>
        </CommandPalette>
      </CommandPalette.Trigger>
    );
  },
});

LateResults.test(
  'Keeps the row people moved to when more results arrive',
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    const search = canvas.getByRole('searchbox');
    // A query that is not typed forward, as when a more row narrows the
    // search: the palette then watches the rows to keep the first active.
    await userEvent.paste('Ticket');
    await expectFirstRowActive(canvas, 'Ticket 1');

    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    const third = canvas.getByRole('menuitem', { name: 'Ticket 3' });
    await expect(search).toHaveAttribute('aria-activedescendant', third.id);

    await waitFor(() =>
      expect(canvas.getAllByRole('menuitem')).toHaveLength(30)
    );
    // The new rows settle a render later, give them the chance to move the
    // active row before checking it stayed.
    await new Promise(resolve => setTimeout(resolve, 100));
    await expect(search).toHaveAttribute('aria-activedescendant', third.id);
  }
);

// Search after a pause
// ---------------
// `onInputChange` follows every keystroke. `onSearchChange` waits until
// people pause typing (250ms), so a server search runs once for "jazz" and
// not four times. Opening, clearing the query and narrowing to a group
// report right away.
const onKeystroke = fn();
const onSearch = fn();

export const SearchAfterPause = meta.story({
  ...noSnapshot,
  render: function Render(args) {
    const [keystrokes, setKeystrokes] = useState<string[]>([]);
    const [searches, setSearches] = useState<string[]>([]);
    return (
      <Stack space="related" alignX="left">
        <CommandPalette.Trigger {...args}>
          <CommandPalette.Button />
          <CommandPalette
            onInputChange={value => {
              onKeystroke(value);
              setKeystrokes(current => [...current, value]);
            }}
            onSearchChange={search => {
              onSearch(search);
              setSearches(current => [...current, search.term]);
            }}
          >
            <CommandPalette.Group title="Events" prefix="e:">
              <CommandPalette.Item id="jazz">Jazz Night</CommandPalette.Item>
              <CommandPalette.Item id="summer">
                Summer Open Air
              </CommandPalette.Item>
            </CommandPalette.Group>
          </CommandPalette>
        </CommandPalette.Trigger>
        <Text size="sm">
          onInputChange, every keystroke:{' '}
          {keystrokes.map(value => `“${value}”`).join(' ')}
        </Text>
        <Text size="sm">
          onSearchChange, after a pause:{' '}
          {searches.map(term => `“${term}”`).join(' ')}
        </Text>
      </Stack>
    );
  },
});

SearchAfterPause.test(
  'Reports the search once people pause typing',
  async ({ canvas, step, userEvent }) => {
    onKeystroke.mockClear();
    onSearch.mockClear();
    await openPalette({ canvas, userEvent });
    const search = await canvas.findByRole('searchbox');

    await step('Opening reports the empty search right away', async () => {
      await expect(onSearch).toHaveBeenCalledWith({ term: '', prefix: null });
    });

    await step('Typing reports one search after the pause', async () => {
      onSearch.mockClear();
      await userEvent.keyboard('jazz');
      await expect(onKeystroke).toHaveBeenCalledTimes(4);
      await expect(onSearch).not.toHaveBeenCalled();
      await waitFor(() =>
        expect(onSearch).toHaveBeenCalledWith({ term: 'jazz', prefix: null })
      );
      await expect(onSearch).toHaveBeenCalledTimes(1);
    });

    await step('Clearing and narrowing report right away', async () => {
      onSearch.mockClear();
      await userEvent.clear(search);
      await expect(onSearch).toHaveBeenLastCalledWith({
        term: '',
        prefix: null,
      });
      await userEvent.keyboard('e:');
      await expect(onSearch).toHaveBeenLastCalledWith({
        term: '',
        prefix: 'e:',
      });
    });
  }
);

// Server results in one group
// ---------------
// Pages are matched by the palette as people type. Events come from a server
// search, so their group sets `filter={false}` and shows the rows as they
// arrive: "42" finds Jazz Night by its number. Enter while the events are
// on their way runs the first of the new rows. A row people picked runs
// right away.
interface ServerEvent {
  id: string;
  name: string;
}

const serverEvents: ServerEvent[] = [
  { id: '42', name: 'Jazz Night' },
  { id: '7', name: 'Jazz Brunch' },
  { id: '8', name: 'Japan Day' },
  { id: '13', name: 'Summer Open Air' },
];
const recentServerEvents = [serverEvents[3], serverEvents[1]];
const searchServer = (term: string) =>
  serverEvents.filter(
    event =>
      event.id === term || event.name.toLowerCase().includes(term.toLowerCase())
  );
const onServerAction = fn();

export const ServerResultsInOneGroup = meta.story({
  ...noSnapshot,
  render: function Render(args) {
    const [events, setEvents] = useState<ServerEvent[] | null>(null);
    const [loading, setLoading] = useState(false);
    const requestRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const searchEvents = ({ term }: CommandPaletteSearchState) => {
      clearTimeout(requestRef.current);
      if (!term) {
        setEvents(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      requestRef.current = setTimeout(() => {
        setEvents(searchServer(term));
        setLoading(false);
      }, 300);
    };
    return (
      <CommandPalette.Trigger {...args}>
        <CommandPalette.Button />
        <CommandPalette
          onSearchChange={searchEvents}
          loading={loading}
          onAction={onServerAction}
        >
          <CommandPalette.Group title="Pages">
            <CommandPalette.Item id="events">Events</CommandPalette.Item>
            <CommandPalette.Item id="orders">Orders</CommandPalette.Item>
          </CommandPalette.Group>
          <CommandPalette.Group title="Events" filter={false}>
            {(events ?? recentServerEvents).map(event => (
              <CommandPalette.Item
                key={event.id}
                id={`event-${event.id}`}
                textValue={event.name}
              >
                <TextValue>{event.name}</TextValue>
                <Description>#{event.id}</Description>
              </CommandPalette.Item>
            ))}
          </CommandPalette.Group>
        </CommandPalette>
      </CommandPalette.Trigger>
    );
  },
});

ServerResultsInOneGroup.test(
  'Matches the pages and leaves the events to the server',
  async ({ canvas, step, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await canvas.findByRole('searchbox');

    await step('The palette matches the pages as people type', async () => {
      await userEvent.keyboard('ord');
      await expect(
        canvas.queryByRole('menuitem', { name: 'Events' })
      ).toBeNull();
      await expect(
        canvas.getByRole('menuitem', { name: 'Orders' })
      ).toBeVisible();
    });

    await step('The events group shows what the server found', async () => {
      await userEvent.clear(canvas.getByRole('searchbox'));
      await userEvent.keyboard('42');
      await expect(
        await canvas.findByRole('menuitem', { name: /Jazz Night/ })
      ).toBeVisible();
      await expect(canvas.getAllByRole('menuitem')).toHaveLength(1);
    });
  }
);

ServerResultsInOneGroup.test(
  'Enter while results load runs the first new row',
  async ({ canvas, userEvent }) => {
    onServerAction.mockClear();
    await openPalette({ canvas, userEvent });
    await canvas.findByRole('searchbox');
    // Typed faster than the pause: the rows still show the recent events,
    // and Summer Open Air is the active one.
    await userEvent.keyboard('japan{Enter}');
    await expect(onServerAction).not.toHaveBeenCalled();
    await waitFor(() => expect(onServerAction).toHaveBeenCalledWith('event-8'));
    await expect(onServerAction).toHaveBeenCalledTimes(1);
  }
);

// A pause after "j" sends a search of its own: its rows arrive while people
// still type, and the rows for "japan" then replace them.
const typeJapanAfterPause = async ({
  canvas,
  userEvent,
}: Pick<StoryContext, 'canvas' | 'userEvent'>) => {
  onServerAction.mockClear();
  await openPalette({ canvas, userEvent });
  await canvas.findByRole('searchbox');
  await userEvent.keyboard('j');
  await new Promise(resolve => setTimeout(resolve, SEARCH_DELAY + 10));
  await userEvent.keyboard('apan');
};

ServerResultsInOneGroup.test(
  'Enter after a pause in typing runs the first new row',
  async ({ canvas, userEvent }) => {
    await typeJapanAfterPause({ canvas, userEvent });
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(onServerAction).toHaveBeenCalledWith('event-8'));
    await expect(onServerAction).toHaveBeenCalledTimes(1);
  }
);

ServerResultsInOneGroup.test(
  'Keeps the first row active when server rows replace earlier ones',
  async ({ canvas, userEvent }) => {
    await typeJapanAfterPause({ canvas, userEvent });
    await waitFor(() =>
      expect(canvas.getAllByRole('menuitem')).toHaveLength(1)
    );
    await waitFor(() =>
      expect(
        canvas.getByRole('menuitem', { name: /Japan Day/ })
      ).toHaveAttribute('data-focused')
    );
    await userEvent.keyboard('{Enter}');
    await expect(onServerAction).toHaveBeenCalledWith('event-8');
  }
);

ServerResultsInOneGroup.test(
  'Enter on a picked row runs it right away',
  async ({ canvas, userEvent }) => {
    onServerAction.mockClear();
    await openPalette({ canvas, userEvent });
    await canvas.findByRole('searchbox');
    // Jazz Brunch is the second of the recent events. The server would put
    // Jazz Night first.
    await userEvent.keyboard('jazz{ArrowDown}{Enter}');
    await expect(onServerAction).toHaveBeenCalledTimes(1);
    await expect(onServerAction).toHaveBeenCalledWith('event-7');
  }
);

// Loading that starts late
// ---------------
// Some apps set `loading` a moment after the search, from their own effect
// or a transition. Enter still waits for their answer.
export const LoadingStartsLate = meta.story({
  ...noSnapshot,
  render: function Render(args) {
    const [term, setTerm] = useState('');
    const [events, setEvents] = useState<ServerEvent[] | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      if (!term) return;
      const start = setTimeout(() => setLoading(true), 40);
      const done = setTimeout(() => {
        setEvents(searchServer(term));
        setLoading(false);
      }, 300);
      return () => {
        clearTimeout(start);
        clearTimeout(done);
      };
    }, [term]);
    return (
      <CommandPalette.Trigger {...args}>
        <CommandPalette.Button />
        <CommandPalette
          onSearchChange={search => setTerm(search.term)}
          loading={loading}
          onAction={onServerAction}
        >
          <CommandPalette.Group title="Events" filter={false}>
            {(term && events ? events : recentServerEvents).map(event => (
              <CommandPalette.Item key={event.id} id={`event-${event.id}`}>
                {event.name}
              </CommandPalette.Item>
            ))}
          </CommandPalette.Group>
        </CommandPalette>
      </CommandPalette.Trigger>
    );
  },
});

LoadingStartsLate.test(
  'Enter waits for loading that starts after the search',
  async ({ canvas, userEvent }) => {
    onServerAction.mockClear();
    await openPalette({ canvas, userEvent });
    await canvas.findByRole('searchbox');
    await userEvent.keyboard('japan{Enter}');
    await waitFor(() => expect(onServerAction).toHaveBeenCalled());
    await expect(onServerAction).toHaveBeenCalledTimes(1);
    await expect(onServerAction).toHaveBeenCalledWith('event-8');
  }
);

// Keep open
// ---------------
// `shouldCloseOnSelect={false}`, as on `Menu.Item`.
export const KeepOpen = meta.story({
  ...noSnapshot,
  render: args => (
    <CommandPalette.Trigger {...args}>
      <CommandPalette.Button />
      <CommandPalette>
        <CommandPalette.Item id="stay" shouldCloseOnSelect={false}>
          Stay open
        </CommandPalette.Item>
        <CommandPalette.Item id="close">Close</CommandPalette.Item>
      </CommandPalette>
    </CommandPalette.Trigger>
  ),
});

KeepOpen.test(
  'Keeps the palette open for an item that asks for it',
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await canvas.findByRole('searchbox');

    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();

    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
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

FavouritesOnEmptyQuery.test(
  'Clears a controlled query when the palette reopens',
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await canvas.findByRole('searchbox');
    await userEvent.keyboard('v');
    await userEvent.keyboard('{Escape}{Escape}');
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());

    await openPalette({ canvas, userEvent });

    await expect(await canvas.findByRole('searchbox')).toHaveValue('');
    await expectVisible(await canvas.findByText('Favourites'));
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
