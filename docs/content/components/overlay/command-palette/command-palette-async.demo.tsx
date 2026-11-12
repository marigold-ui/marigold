import { CalendarDays, Search, ShoppingCart, Ticket } from 'lucide-react';
import { CommandPalette, Text, useAsyncList } from '@marigold/components';

interface Event {
  id: string;
  number: number;
  name: string;
  date: string;
}

const pages = [
  { id: 'events', label: 'Events', icon: <CalendarDays /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingCart /> },
];

// Stands in for the server.
const allEvents: Event[] = [
  'Summer Open Air',
  'Jazz Night',
  'City Marathon',
  'Jazz Brunch',
  'Comedy Club',
  'Jazz on the Lake',
  'Open Stage',
  'Jazz Classics',
  'Winter Market',
].map((name, i) => ({
  id: `event-${1024 + i}`,
  number: 1024 + i,
  name,
  date: `${10 + i} Jun`,
}));

const LIMIT = 3;

const searchEvents = async (query: string, signal: AbortSignal) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  signal.throwIfAborted();
  const q = query.toLowerCase();
  const matches = allEvents.filter(
    e => e.name.toLowerCase().includes(q) || String(e.number).includes(q)
  );
  // One more than shown, to know whether there are more.
  return matches.slice(0, LIMIT + 1);
};

export default () => {
  const list = useAsyncList<Event>({
    async load({ signal, filterText = '' }) {
      if (!filterText) return { items: [] };
      return { items: await searchEvents(filterText, signal) };
    },
  });
  const query = list.filterText;
  const more = list.items.length > LIMIT;
  // `filter={false}` turns off the built-in match for every group, so the
  // static pages are matched here.
  const matchingPages = pages.filter(page =>
    page.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <CommandPalette.Trigger shortcut={false}>
      <CommandPalette.Button />
      <CommandPalette
        placeholder="Search pages and events…"
        filter={false}
        inputValue={query}
        onInputChange={list.setFilterText}
        loading={list.isLoading}
      >
        <CommandPalette.Group title="Pages">
          {matchingPages.map(page => (
            <CommandPalette.Item key={page.id} id={page.id}>
              {page.icon}
              {page.label}
            </CommandPalette.Item>
          ))}
        </CommandPalette.Group>
        <CommandPalette.Group title="Events">
          {list.items.slice(0, LIMIT).map(event => (
            <CommandPalette.Item
              key={event.id}
              id={event.id}
              textValue={`${event.name} ${event.number}`}
            >
              <Ticket />
              <Text slot="label">{event.name}</Text>
              <Text slot="description">
                #{event.number}, {event.date}
              </Text>
            </CommandPalette.Item>
          ))}
          {more && (
            <CommandPalette.Item
              id="all-events"
              textValue={`Show all events for ${query}`}
            >
              <Search />
              Show all events for “{query}”
            </CommandPalette.Item>
          )}
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};
