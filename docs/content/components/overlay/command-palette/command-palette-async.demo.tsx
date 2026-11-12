import {
  ArrowRight,
  CalendarDays,
  MapPin,
  ShoppingCart,
  Ticket,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { CommandPalette, Description, TextValue } from '@marigold/components';
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

// A few per kind in the mixed list, more once a prefix leaves one kind.
const LIMIT = 3;
const NARROWED_LIMIT = 8;
const PREFIXES = { events: 'e:', venues: 'v:' } as const;

const none = { items: [], totalItems: 0 };

const fetchResults = async <T,>(
  path: string,
  term: string,
  limit: number,
  signal: AbortSignal
) => {
  const params = new URLSearchParams({
    q: term,
    pageSize: String(limit),
    delay: '400',
  });
  const res = await fetch(`${path}?${params}`, { signal });
  return (await res.json()) as Results<T>;
};

// Ends a narrowed group when the server has more than it shows. It leaves
// the palette for the list page, so it gets an arrow.
const ShowAll = ({
  id,
  kind,
  total,
  term,
}: {
  id: string;
  kind: string;
  total: number;
  term: string;
}) => (
  <CommandPalette.Item id={id} textValue={`Show all ${kind} ${term}`}>
    <ArrowRight />
    <TextValue>
      Show all {total} {kind}
      {term && ` for “${term}”`}
    </TextValue>
    <Description>Opens the {kind} list with this search</Description>
  </CommandPalette.Item>
);

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
  const limit = prefix ? NARROWED_LIMIT : LIMIT;
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
            : fetchResults<Event>(
                '/api/events',
                term,
                limit,
                controller.signal
              ),
          prefix === PREFIXES.events
            ? none
            : fetchResults<Venue>(
                '/api/venues',
                term,
                limit,
                controller.signal
              ),
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
  }, [key, limit, prefix, searching, term]);

  const current = searching && results?.key === key ? results : null;
  // Before people type, the palette ends each group with "Search in …".
  // Once they type, offer more only when the server has more.
  const hasMore = (kind: 'events' | 'venues') =>
    current !== null && current[kind].totalItems > limit;
  const events = searching ? (current?.events.items ?? []) : recent;
  const venues = searching ? (current?.venues.items ?? []) : recentVenues;
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
        <CommandPalette.Group
          title="Events"
          prefix={PREFIXES.events}
          // In the mixed list, a last row narrows the search to events.
          more={hasMore('events') ? 'More events…' : undefined}
        >
          {events.map(event => (
            <CommandPalette.Item
              key={event.id}
              id={`event-${event.id}`}
              textValue={event.name}
            >
              <Ticket />
              <TextValue>{event.name}</TextValue>
              <Description>
                #{event.id}, {formatDate(event.date)}
                {event.venue && `, ${event.venue}`}
              </Description>
            </CommandPalette.Item>
          ))}
          {prefix && current && current.events.totalItems > limit && (
            <ShowAll
              id="all-events"
              kind="events"
              total={current.events.totalItems}
              term={term}
            />
          )}
        </CommandPalette.Group>
        <CommandPalette.Group
          title="Venues"
          prefix={PREFIXES.venues}
          more={hasMore('venues') ? 'More venues…' : undefined}
        >
          {venues.map(venue => (
            <CommandPalette.Item
              key={venue.id}
              id={`venue-${venue.id}`}
              textValue={venue.name}
            >
              <MapPin />
              <TextValue>{venue.name}</TextValue>
              <Description>{venue.city}</Description>
            </CommandPalette.Item>
          ))}
          {prefix && current && current.venues.totalItems > limit && (
            <ShowAll
              id="all-venues"
              kind="venues"
              total={current.venues.totalItems}
              term={term}
            />
          )}
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};
