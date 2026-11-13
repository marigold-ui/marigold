import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  ShoppingCart,
  Ticket,
} from 'lucide-react';
import type { Key } from 'react';
import { useState } from 'react';
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

const pages = [
  { id: 'events', label: 'Events', icon: <CalendarDays /> },
  { id: 'orders', label: 'Orders', icon: <ShoppingCart /> },
];

// Shown before people type, so the groups and their prefixes are visible.
const recentEvents: Event[] = [
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

// One hook per kind. `keepPreviousData` leaves the last results in place
// while the next ones load, so the list doesn't flash empty as people type.
const useSearch = <T,>(
  kind: 'events' | 'venues',
  { term, prefix }: CommandPaletteSearchState
) => {
  const searching = term !== '' || prefix !== null;
  const inScope = prefix === null || prefix === PREFIXES[kind];
  const limit = prefix ? NARROWED_LIMIT : LIMIT;
  const query = useQuery({
    queryKey: [kind, { term, limit }],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams({
        q: term,
        pageSize: String(limit),
        delay: '400',
      });
      const res = await fetch(`/api/${kind}?${params}`, { signal });
      return (await res.json()) as { items: T[]; totalItems: number };
    },
    enabled: searching && inScope,
    placeholderData: keepPreviousData,
  });
  const items = inScope ? (query.data?.items ?? []) : [];
  const total = inScope ? (query.data?.totalItems ?? 0) : 0;
  return { searching, items, total, limit, loading: query.isFetching };
};

// Ends a narrowed group when the server has more than it shows. It leaves
// the palette for the list page, so it is named after it and has an arrow.
const AllRecords = ({
  kind,
  total,
  term,
}: {
  kind: 'events' | 'venues';
  total: number;
  term: string;
}) => (
  <CommandPalette.Item id={`all-${kind}`} textValue={`All ${kind} ${term}`}>
    <ArrowRight />
    <TextValue>
      All {kind}
      {term && ` for “${term}”`}
    </TextValue>
    <Description>
      {total} results, opens the {kind} list
    </Description>
  </CommandPalette.Item>
);

// Where a real app would go for a picked row.
const routeFor = (key: Key, term: string) => {
  const id = String(key);
  const q = term ? `?q=${encodeURIComponent(term)}` : '';
  if (id.startsWith('all-')) return `/${id.slice(4)}${q}`;
  if (id.startsWith('event-')) return `/events/${id.slice(6)}`;
  if (id.startsWith('venue-')) return `/venues/${id.slice(6)}`;
  return `/${id}`;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

const Palette = () => {
  // The palette hands over the term without the prefix, and the prefix of
  // the group the search is narrowed to, once people pause typing.
  const [search, setSearch] = useState<CommandPaletteSearchState>({
    term: '',
    prefix: null,
  });
  const { term, prefix } = search;
  const events = useSearch<Event>('events', search);
  const venues = useSearch<Venue>('venues', search);
  // Stands in for the router: the demo shows where the app would go.
  const [route, setRoute] = useState<string | null>(null);

  // Before people type, the recent records are a few of many. After, offer
  // more only when the server has more.
  const more = (results: {
    searching: boolean;
    total: number;
    limit: number;
  }) => !results.searching || results.total > results.limit;

  return (
    <Stack space="related" alignX="left">
      <CommandPalette.Trigger shortcut={false}>
        <CommandPalette.Button />
        <CommandPalette
          placeholder="Search pages, events and venues…"
          onSearchChange={setSearch}
          loading={events.loading || venues.loading}
          onAction={key => setRoute(routeFor(key, term))}
        >
          {/* The palette matches the pages as people type. */}
          <CommandPalette.Group title="Pages">
            {pages.map(page => (
              <CommandPalette.Item key={page.id} id={page.id}>
                {page.icon}
                {page.label}
              </CommandPalette.Item>
            ))}
          </CommandPalette.Group>
          {/* The server matched these, the palette shows them as they are. */}
          <CommandPalette.Group
            title="Events"
            filter={false}
            prefix={PREFIXES.events}
            // In the mixed list, a last row narrows the search to events.
            more={more(events) ? 'More events…' : undefined}
          >
            {(events.searching ? events.items : recentEvents).map(event => (
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
            {prefix && events.total > events.items.length && (
              <AllRecords kind="events" total={events.total} term={term} />
            )}
          </CommandPalette.Group>
          <CommandPalette.Group
            title="Venues"
            filter={false}
            prefix={PREFIXES.venues}
            more={more(venues) ? 'More venues…' : undefined}
          >
            {(venues.searching ? venues.items : recentVenues).map(venue => (
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
            {prefix && venues.total > venues.items.length && (
              <AllRecords kind="venues" total={venues.total} term={term} />
            )}
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

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <Palette />
  </QueryClientProvider>
);
