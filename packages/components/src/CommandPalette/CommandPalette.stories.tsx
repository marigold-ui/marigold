import type { StoryContext } from '@storybook/react-vite';
import {
  CalendarDays,
  ChartColumn,
  Download,
  MapPin,
  Plus,
  ShoppingCart,
  Ticket,
} from 'lucide-react';
import { useState } from 'react';
import { expect, fn, waitFor } from 'storybook/test';
import preview from '.storybook/preview';
import { isMac } from '@react-aria/utils';
import { Button } from '../Button/Button';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { useAsyncList } from '../hooks';
import { CommandPalette } from './CommandPalette';

const meta = preview.meta({
  title: 'Components/CommandPalette',
  component: CommandPalette,
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
  },
});

const shortcutKeys = () => {
  const modifier = isMac() ? 'Meta' : 'Control';
  return `{${modifier}>}k{/${modifier}}`;
};

const noSnapshot = { parameters: { chromatic: { disableSnapshot: true } } };

const openPalette = ({
  canvas,
  userEvent,
}: Pick<StoryContext, 'canvas' | 'userEvent'>) =>
  userEvent.click(canvas.getByRole('button', { name: /search/i }));

const onAction = fn();

// Basic
// ---------------
export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <CommandPalette {...args}>
      <CommandPalette.Trigger />
      <CommandPalette.Content>
        <CommandPalette.Input placeholder="Search pages and actions…" />
        <CommandPalette.List onAction={onAction}>
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
        </CommandPalette.List>
      </CommandPalette.Content>
    </CommandPalette>
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
    await expect(dialog).toBeVisible();
    await expect(canvas.getByRole('searchbox')).toHaveFocus();
  }
);

Basic.test(
  'Opens with the global shortcut',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await userEvent.keyboard(shortcutKeys());

    await expect(
      await canvas.findByRole('dialog', { name: 'Command palette' })
    ).toBeVisible();
  }
);

Basic.test(
  'Opens with the first item active',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });

    const input = await canvas.findByRole('searchbox');
    const [first] = await canvas.findAllByRole('menuitem');
    // Virtual focus: DOM focus stays in the input.
    await waitFor(() =>
      expect(input).toHaveAttribute('aria-activedescendant', first.id)
    );
    await expect(input).toHaveFocus();
  }
);

Basic.test(
  'Keeps the first item active after deleting the query',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    const input = await canvas.findByRole('searchbox');
    await userEvent.keyboard('re');
    await userEvent.keyboard('{Backspace}{Backspace}');

    const [first] = canvas.getAllByRole('menuitem');
    await waitFor(() =>
      expect(input).toHaveAttribute('aria-activedescendant', first.id)
    );
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
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await userEvent.keyboard('xyz');

    await expect(await canvas.findByText('No results for “xyz”')).toBeVisible();
  }
);

Basic.test(
  'Runs the action, closes, restores focus and clears on reopen',
  noSnapshot,
  async ({ canvas, step, userEvent }) => {
    onAction.mockClear();
    const trigger = canvas.getByRole('button', { name: /search/i });

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
  'Shows a custom empty state',
  {
    ...noSnapshot,
    render: () => (
      <CommandPalette>
        <CommandPalette.Trigger />
        <CommandPalette.Content>
          <CommandPalette.Input />
          <CommandPalette.List>
            <CommandPalette.Item id="events">Events</CommandPalette.Item>
          </CommandPalette.List>
          <CommandPalette.Empty>
            Nothing here. Try "events".
          </CommandPalette.Empty>
        </CommandPalette.Content>
      </CommandPalette>
    ),
  },
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });
    await userEvent.keyboard('xyz');

    await expect(
      await canvas.findByText('Nothing here. Try "events".')
    ).toBeVisible();
    await expect(canvas.queryByText(/No results for/)).toBeNull();
  }
);

Basic.test(
  'Shows the loading state and a spinner while loading',
  {
    ...noSnapshot,
    render: () => (
      <CommandPalette>
        <CommandPalette.Trigger />
        <CommandPalette.Content>
          <CommandPalette.Input />
          <CommandPalette.List>{[]}</CommandPalette.List>
          <CommandPalette.Loading>Searching…</CommandPalette.Loading>
          <CommandPalette.Empty>No events found.</CommandPalette.Empty>
        </CommandPalette.Content>
      </CommandPalette>
    ),
  },
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });

    // The dialog fades in, so wait for it to become visible.
    const loading = await canvas.findByText('Searching…');
    await waitFor(() => expect(loading).toBeVisible());
    await expect(canvas.queryByText('No events found.')).toBeNull();
    await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
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
  noSnapshot,
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
    // The palette fades in.
    await waitFor(() => expect(legend).toBeVisible());
    await expect(legend.closest('[aria-hidden="true"]')).not.toBeNull();
  }
);

// Variants
// ---------------
export const Variants = meta.story({
  tags: ['component-test'],
  render: args => (
    <CommandPalette {...args}>
      <CommandPalette.Trigger />
      <CommandPalette.Content>
        <CommandPalette.Input />
        <CommandPalette.List>
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
        </CommandPalette.List>
      </CommandPalette.Content>
    </CommandPalette>
  ),
});

Variants.test(
  'Filters variant items on their label, not the access marker',
  noSnapshot,
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
  render: args => (
    <CommandPalette {...args}>
      <CommandPalette.Trigger />
      <CommandPalette.Content>
        <CommandPalette.Input placeholder="Search pages and actions…" />
        <CommandPalette.List>
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
        </CommandPalette.List>
      </CommandPalette.Content>
    </CommandPalette>
  ),
});

// Shortcut in fields
// ---------------
export const ShortcutInFields = meta.story({
  tags: ['component-test'],
  parameters: { chromatic: { disableSnapshot: true } },
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
        <CommandPalette {...args}>
          <CommandPalette.Content>
            <CommandPalette.Input />
            <CommandPalette.List>
              <CommandPalette.Item id="events">Events</CommandPalette.Item>
            </CommandPalette.List>
          </CommandPalette.Content>
        </CommandPalette>
      </Stack>
    );
  },
});

ShortcutInFields.test(
  'Opens from inside a plain text field',
  async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('Plain field'));
    await userEvent.keyboard(shortcutKeys());

    await expect(await canvas.findByRole('dialog')).toBeVisible();
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

// Controlled
// ---------------
export const Controlled = meta.story({
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Stack space={2} alignX="left">
        <Button onPress={() => setOpen(true)}>Open from anywhere</Button>
        <CommandPalette open={open} onOpenChange={setOpen}>
          <CommandPalette.Content>
            <CommandPalette.Input />
            <CommandPalette.List>
              <CommandPalette.Item id="events">Events</CommandPalette.Item>
              <CommandPalette.Item id="orders">Orders</CommandPalette.Item>
            </CommandPalette.List>
          </CommandPalette.Content>
        </CommandPalette>
      </Stack>
    );
  },
});

// Async search
// ---------------
interface Character {
  name: string;
  url: string;
}

export const AsyncSearch = meta.story({
  render: () => {
    const list = useAsyncList<Character>({
      async load({ signal, filterText }) {
        if (!filterText) return { items: [] };
        const res = await fetch(
          `https://swapi.py4e.com/api/people/?search=${encodeURIComponent(filterText)}`,
          { signal }
        );
        const json = (await res.json()) as { results: Character[] };
        return { items: json.results };
      },
    });

    // Debouncing is left to the consumer; a real app would debounce here.
    return (
      <CommandPalette
        filter={false}
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
      >
        <CommandPalette.Trigger>Search characters…</CommandPalette.Trigger>
        <CommandPalette.Content>
          <CommandPalette.Input placeholder="Type a Star Wars name…" />
          <CommandPalette.List items={list.items}>
            {(item: Character) => (
              <CommandPalette.Item id={item.url}>
                {item.name}
              </CommandPalette.Item>
            )}
          </CommandPalette.List>
          {list.isLoading && (
            <CommandPalette.Loading>Searching…</CommandPalette.Loading>
          )}
          <CommandPalette.Empty>
            {list.filterText
              ? 'No characters found.'
              : 'Start typing to search.'}
          </CommandPalette.Empty>
        </CommandPalette.Content>
      </CommandPalette>
    );
  },
});

// Simulated async search
// ---------------
// Same flow as AsyncSearch, but the results come from a local list after a
// short delay, so tests can cover async results without a live API.
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

const SimulatedAsyncPalette = () => {
  const list = useAsyncList<(typeof characters)[number]>({
    async load({ signal, filterText }) {
      if (!filterText) return { items: [] };
      return { items: await searchCharacters(filterText, signal) };
    },
  });

  return (
    <CommandPalette
      filter={false}
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
    >
      <CommandPalette.Trigger>Search characters…</CommandPalette.Trigger>
      <CommandPalette.Content>
        <CommandPalette.Input placeholder="Type a Star Wars name…" />
        <CommandPalette.List items={list.items}>
          {item => (
            <CommandPalette.Item id={item.id}>{item.name}</CommandPalette.Item>
          )}
        </CommandPalette.List>
        {list.isLoading && (
          <CommandPalette.Loading>Searching…</CommandPalette.Loading>
        )}
        <CommandPalette.Empty>
          {list.filterText ? 'No characters found.' : 'Start typing to search.'}
        </CommandPalette.Empty>
      </CommandPalette.Content>
    </CommandPalette>
  );
};

export const SimulatedAsyncSearch = meta.story({
  tags: ['component-test'],
  render: () => <SimulatedAsyncPalette />,
});

// The first row is the active one: the input points at it with
// `aria-activedescendant` (virtual focus).
const expectFirstRowActive = (canvas: StoryContext['canvas'], name: string) =>
  waitFor(() => {
    const [first] = canvas.getAllByRole('menuitem');
    expect(first).toHaveTextContent(name);
    expect(canvas.getByRole('searchbox')).toHaveAttribute(
      'aria-activedescendant',
      first.id
    );
  });

SimulatedAsyncSearch.test(
  'Keeps the first result active as async results change',
  noSnapshot,
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

export const FavouritesOnEmptyQuery = meta.story({
  tags: ['component-test'],
  render: () => {
    const [query, setQuery] = useState('');
    const [title, items] =
      query === '' ? ['Favourites', favourites] : ['Pages', pages];
    return (
      <CommandPalette inputValue={query} onInputChange={setQuery}>
        <CommandPalette.Trigger />
        <CommandPalette.Content>
          <CommandPalette.Input placeholder="Go to…" />
          <CommandPalette.List>
            <CommandPalette.Group title={title}>
              {items.map(item => (
                <CommandPalette.Item
                  key={item.id}
                  id={item.id}
                  href={item.href}
                >
                  {item.label}
                </CommandPalette.Item>
              ))}
            </CommandPalette.Group>
          </CommandPalette.List>
        </CommandPalette.Content>
      </CommandPalette>
    );
  },
});

FavouritesOnEmptyQuery.test(
  'Shows favourites until the user types',
  noSnapshot,
  async ({ canvas, userEvent }) => {
    await openPalette({ canvas, userEvent });

    await expect(await canvas.findByText('Favourites')).toBeVisible();
    await expect(canvas.getAllByRole('menuitem')).toHaveLength(2);

    await userEvent.keyboard('v');

    await expect(await canvas.findByText('Pages')).toBeVisible();
    await expect(canvas.queryByText('Favourites')).toBeNull();
  }
);

// Small screen
// ---------------
export const SmallScreen = meta.story({
  ...Basic.input,
  globals: {
    viewport: { value: 'smallScreen' },
  },
});
