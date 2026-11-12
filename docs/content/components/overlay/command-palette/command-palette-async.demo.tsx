import {
  ArrowRight,
  CalendarDays,
  MapPin,
  ShoppingCart,
  Ticket,
} from 'lucide-react';
import type { Key } from 'react';
import { useEffect, useState } from 'react';
import {
  CommandPalette,
  Description,
  Stack,
  Text,
  TextValue,
} from '@marigold/components';
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
// Narrowed, the next page loads as people scroll, up to MAX_ROWS. Beyond
// that, the list page serves them better.
const LIMIT = 3;
const NARROWED_LIMIT = 8;
const MAX_ROWS = 24;
const PREFIXES = { events: 'e:', venues: 'v:' } as const;

const none = { items: [], totalItems: 0 };

const fetchResults = async <T,>(
  path: string,
  term: string,
  limit: number,
  signal?: AbortSignal,
  page = 1
) => {
  const params = new URLSearchParams({
    q: term,
    page: String(page),
    pageSize: String(limit),
    delay: '400',
  });
  const res = await fetch(`${path}?${params}`, { signal });
  return (await res.json()) as Results<T>;
};

// Ends a narrowed group once it holds MAX_ROWS and the server has more. It
// leaves the palette for the list page, so it gets an arrow.
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

// Where a real app would go for a picked row. Pages and records open their
// page, "Show all" opens the list page with the search in its URL.
const routeFor = (key: Key, term: string) => {
  const id = String(key);
  const q = term ? `?q=${encodeURIComponent(term)}` : '';
  if (id === 'all-events') return `/events${q}`;
  if (id === 'all-venues') return `/venues${q}`;
  if (id.startsWith('event-')) return `/events/${id.slice(6)}`;
  if (id.startsWith('venue-')) return `/venues/${id.slice(6)}`;
  return `/${id}`;
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
  // Stands in for the router: the demo shows where the app would go.
  const [route, setRoute] = useState<string | null>(null);
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
  // The recent records before people type are a few of many. Once they
  // type, offer more only when the server has more.
  const hasMore = (kind: 'events' | 'venues') =>
    !searching || (current !== null && current[kind].totalItems > limit);

  // Narrowed to one kind, the next page loads as people scroll to the end.
  const [loadingMore, setLoadingMore] = useState(false);
  const loaded = (kind: 'events' | 'venues') =>
    current?.[kind].items.length ?? 0;
  const canLoadMore = (kind: 'events' | 'venues') =>
    current !== null &&
    loaded(kind) < current[kind].totalItems &&
    loaded(kind) < MAX_ROWS;
  const loadMore = async (kind: 'events' | 'venues') => {
    if (!current || loadingMore) return;
    setLoadingMore(true);
    const page = loaded(kind) / NARROWED_LIMIT + 1;
    try {
      const next = await fetchResults<Event & Venue>(
        `/api/${kind}`,
        term,
        NARROWED_LIMIT,
        undefined,
        page
      );
      // Drop the page if the search changed meanwhile.
      setResults(prev =>
        prev?.key === key
          ? {
              ...prev,
              [kind]: {
                ...prev[kind],
                items: [...prev[kind].items, ...next.items],
              },
            }
          : prev
      );
    } finally {
      setLoadingMore(false);
    }
  };
  // The end of a narrowed group: load more while it may, then hand over to
  // the list page if the server still has more.
  const end = (kind: 'events' | 'venues') => {
    if (!prefix || !current) return null;
    if (canLoadMore(kind))
      return (
        <CommandPalette.LoadMore
          onLoadMore={() => loadMore(kind)}
          loading={loadingMore}
        />
      );
    if (loaded(kind) < current[kind].totalItems)
      return (
        <ShowAll
          id={`all-${kind}`}
          kind={kind}
          total={current[kind].totalItems}
          term={term}
        />
      );
    return null;
  };
  const events = searching ? (current?.events.items ?? []) : recent;
  const venues = searching ? (current?.venues.items ?? []) : recentVenues;
  // `filter={false}` turns off the built-in match for every group, so the
  // static pages are matched here.
  const matchingPages = pages.filter(page =>
    page.label.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <Stack space="related" alignX="left">
      <CommandPalette.Trigger shortcut={false}>
        <CommandPalette.Button />
        <CommandPalette
          placeholder="Search pages, events and venues…"
          filter={false}
          onSearchChange={setSearch}
          loading={searching && current === null}
          onAction={key => setRoute(routeFor(key, term))}
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
            {end('events')}
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
            {end('venues')}
          </CommandPalette.Group>
        </CommandPalette>
      </CommandPalette.Trigger>
      <Text size="sm" variant="muted">
        {route ? (
          <>
            The app would open <code>{route}</code>
          </>
        ) : (
          'Pick a row to see where the app would go.'
        )}
      </Text>
    </Stack>
  );
};
