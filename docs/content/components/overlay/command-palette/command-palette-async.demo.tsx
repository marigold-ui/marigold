import {
  CalendarDays,
  MapPin,
  Search,
  ShoppingCart,
  Ticket,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { CommandPalette, Text } from '@marigold/components';
import type { CommandPaletteSearchState } from '@marigold/components';

interface Event {
  id: string;
  name: string;
  date: string;
  venue?: string;
}

interface Venue {
  id: string;
  name: string;
  city: string;
}

interface Results<T> {
  items: T[];
  totalItems: number;
}

const pages = [
  { id: 'events', label: 'Events', icon: <CalendarDays /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingCart /> },
];

// Shown before people type, so the groups and their prefixes are visible.
const recent: Event[] = [
  { id: '1', name: 'Jazz Night', date: '2026-08-12', venue: 'Jazzhaus' },
  { id: '16', name: 'Comedy Slam', date: '2026-09-13', venue: 'Vorderhaus' },
];

const recentVenues: Venue[] = [
  { id: '2', name: 'Shakytown Comedy Club', city: 'Shakytown' },
];

const LIMIT = 3;
const PREFIXES = { events: 'e:', venues: 'v:' } as const;

const none = { items: [], totalItems: 0 };

const fetchResults = async <T,>(
  path: string,
  term: string,
  signal: AbortSignal
) => {
  const params = new URLSearchParams({
    q: term,
    pageSize: String(LIMIT),
    delay: '400',
  });
  const res = await fetch(`${path}?${params}`, { signal });
  return (await res.json()) as Results<T>;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

export default () => {
  // The palette hands over the term without the prefix, and the prefix of
  // the group the search is narrowed to.
  const [search, setSearch] = useState<CommandPaletteSearchState>({
    term: '',
    prefix: null,
  });
  const { term, prefix } = search;
  const searching = term !== '' || prefix !== null;
  const key = `${prefix}:${term}`;
  const [results, setResults] = useState<{
    key: string;
    events: Results<Event>;
    venues: Results<Venue>;
  } | null>(null);

  useEffect(() => {
    // A prefix alone already searches: it lists the first records of that
    // kind, so nobody takes the recent ones for everything there is.
    if (!searching) return;
    const controller = new AbortController();
    // Wait until people pause typing, and cancel requests that are out of date.
    const timer = setTimeout(async () => {
      try {
        const [events, venues] = await Promise.all([
          prefix === PREFIXES.venues
            ? none
            : fetchResults<Event>('/api/events', term, controller.signal),
          prefix === PREFIXES.events
            ? none
            : fetchResults<Venue>('/api/venues', term, controller.signal),
        ]);
        setResults({ key, events, venues });
      } catch {
        // Aborted, a newer query is on its way.
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [key, prefix, searching, term]);

  const current = searching && results?.key === key ? results : null;
  const events = searching ? (current?.events.items ?? []) : recent;
  const venues = searching ? (current?.venues.items ?? []) : recentVenues;
  const moreEvents = (current?.events.totalItems ?? 0) - LIMIT;
  // `filter={false}` turns off the built-in match for every group, so the
  // static pages are matched here.
  const matchingPages = pages.filter(page =>
    page.label.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <CommandPalette.Trigger shortcut={false}>
      <CommandPalette.Button />
      <CommandPalette
        placeholder="Search pages, events and venues…"
        filter={false}
        onSearchChange={setSearch}
        loading={searching && current === null}
      >
        <CommandPalette.Group title="Pages">
          {matchingPages.map(page => (
            <CommandPalette.Item key={page.id} id={page.id}>
              {page.icon}
              {page.label}
            </CommandPalette.Item>
          ))}
        </CommandPalette.Group>
        <CommandPalette.Group title="Events" prefix={PREFIXES.events}>
          {events.map(event => (
            <CommandPalette.Item
              key={event.id}
              id={`event-${event.id}`}
              textValue={event.name}
            >
              <Ticket />
              <Text slot="label">{event.name}</Text>
              <Text slot="description">
                #{event.id}, {formatDate(event.date)}
                {event.venue && `, ${event.venue}`}
              </Text>
            </CommandPalette.Item>
          ))}
          {moreEvents > 0 && (
            <CommandPalette.Item
              id="all-events"
              textValue={`Show all events ${term}`}
            >
              <Search />
              <Text slot="label">
                Show all {current?.events.totalItems} events
                {term && ` for “${term}”`}
              </Text>
              <Text slot="description">
                Opens the event list with this search
              </Text>
            </CommandPalette.Item>
          )}
        </CommandPalette.Group>
        <CommandPalette.Group title="Venues" prefix={PREFIXES.venues}>
          {venues.map(venue => (
            <CommandPalette.Item
              key={venue.id}
              id={`venue-${venue.id}`}
              textValue={venue.name}
            >
              <MapPin />
              <Text slot="label">{venue.name}</Text>
              <Text slot="description">{venue.city}</Text>
            </CommandPalette.Item>
          ))}
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};
