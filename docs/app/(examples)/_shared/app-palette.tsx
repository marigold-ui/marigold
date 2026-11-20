'use client';

import { organizerById, organizers } from '@/lib/data/organizers';
import { people } from '@/lib/data/people';
import { venueById } from '@/lib/data/venues';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarPlus,
  Link2,
  MapPin,
  UserPlus,
  UserRound,
} from 'lucide-react';
import type { Key, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
  CommandPalette,
  Description,
  NumericFormat,
  TextValue,
  useToast,
} from '@marigold/components';
import type { CommandPaletteSearchState } from '@marigold/components';
import type { NavNode, ShellConfig } from './shell-types';
import { useWorkspace } from './workspace';

// App palette
// ---------------
// The examples' command palette: one place to switch the organizer, open a
// venue or a member, go to a page or run an action. It shows most of what the
// palette can do:
// - before people type, the organizers and venues opened last, each group
//   ending in a "More …" row that narrows the search to it;
// - pages, members and organizers matched by the palette as people type;
// - venues searched on the server (`filter={false}` on the group), with a
//   loading state and a last row that opens the full list;
// - prefixes (`o:`, `v:`, `m:`) that narrow the search to one group;
// - rows that navigate (`href`) next to rows that run an action.
const PREFIXES = { organizers: 'o:', venues: 'v:', members: 'm:' } as const;
const VENUE_LIMIT = 4;
const NARROWED_VENUE_LIMIT = 8;

interface VenueResults {
  /** The term these results are for. */
  term: string;
  items: { id: string; name: string; city: string; capacity: number }[];
  totalItems: number;
}

interface PageEntry {
  href: string;
  label: string;
  section: string;
  icon: ReactNode;
}

// Every page of the example navigation, with its section and the section's
// icon, as the sidebar shows them.
const collectPages = (config: ShellConfig): PageEntry[] => {
  const walk = (items: NavNode[], section: string, icon: ReactNode) =>
    items.flatMap((item): PageEntry[] => {
      if (item.kind !== 'Item') return [];
      if (item.children) return walk(item.children, section, icon);
      return [
        {
          href: item.slug ? `${config.base}/${item.slug}` : config.base,
          label: item.label,
          section,
          icon,
        },
      ];
    });
  return config.tiles.flatMap(tile =>
    tile.kind === 'link'
      ? [
          {
            href: `${config.base}/${tile.slug}`,
            label: tile.label,
            section: 'Examples',
            icon: tile.icon,
          },
        ]
      : walk(tile.items, tile.label, tile.icon)
  );
};

// Venues come from the docs' venue API, which answers slower than needed
// (`delay`) so the palette's loading state shows. Each term is fetched once,
// with enough rows for the narrowed group, and the ungrouped search shows the
// first few. While people keep typing the same term ("har", "harb"), the
// last results stay in place until the next ones arrive, so the group
// doesn't flash empty. Results for another term would be wrong, so they
// don't stay.
const useVenueSearch = ({ term, prefix }: CommandPaletteSearchState) => {
  const searching =
    prefix === PREFIXES.venues || (prefix === null && term !== '');
  const query = useQuery({
    queryKey: ['palette-venues', term],
    queryFn: async ({ signal }): Promise<VenueResults> => {
      const params = new URLSearchParams({
        q: term,
        pageSize: String(NARROWED_VENUE_LIMIT),
        delay: '300',
      });
      const res = await fetch(`/api/venues?${params}`, { signal });
      if (!res.ok) throw new Error(`Failed to load venues (${res.status})`);
      return { term, ...(await res.json()) };
    },
    enabled: searching,
    staleTime: Infinity,
    placeholderData: previous =>
      previous && term.startsWith(previous.term) ? previous : undefined,
  });
  const data = searching ? query.data : undefined;
  return {
    searching,
    items: (data?.items ?? []).slice(
      0,
      prefix ? NARROWED_VENUE_LIMIT : VENUE_LIMIT
    ),
    total: data?.totalItems ?? 0,
    loading: searching && query.isFetching,
  };
};

export interface AppPaletteProps {
  config: ShellConfig;
  /** The docs page that explains the current example. */
  docsHref: string;
}

export const AppPalette = ({ config, docsHref }: AppPaletteProps) => {
  const { organizer, recentOrganizers, switchOrganizer, recentVenueIds } =
    useWorkspace();
  const { addToast } = useToast();
  // The query, controlled to know on every keystroke whether people typed
  // anything. The palette clears it each time it opens.
  const [input, setInput] = useState('');
  // Once people pause typing: the term and the group it is narrowed to.
  const [search, setSearch] = useState<CommandPaletteSearchState>({
    term: '',
    prefix: null,
  });
  const typing = input.trim() !== '';
  const venueSearch = useVenueSearch(search);
  const pages = useMemo(() => collectPages(config), [config]);

  // Before people type, the organizers switched to last. The current one is
  // in the top navigation already, and Enter on it would do nothing.
  const shownOrganizers = typing ? organizers : recentOrganizers;
  const shownVenues = venueSearch.searching
    ? venueSearch.items
    : typing
      ? []
      : recentVenueIds.flatMap(id => venueById(id) ?? []);
  // Members and pages are many, so they show only once people type.
  const shownPeople = typing ? people : [];
  const shownPages = typing ? pages : [];

  const handleAction = (key: Key) => {
    const id = String(key);
    if (id.startsWith('organizer:')) {
      const next = organizerById(id.slice('organizer:'.length));
      if (!next || next.id === organizer.id) return;
      switchOrganizer(next.id);
      addToast({
        title: `Switched to ${next.name}`,
        description: `You now work in customer no. ${next.customerNumber}.`,
        variant: 'success',
      });
    } else if (id === 'copy-link') {
      void navigator.clipboard?.writeText(window.location.href);
      addToast({
        title: 'Link copied',
        description: 'The link to this page is on your clipboard.',
        variant: 'success',
      });
    }
  };

  return (
    <CommandPalette.Trigger>
      <CommandPalette.Button>Search or jump to…</CommandPalette.Button>
      <CommandPalette
        placeholder="Search organizers, venues, members and pages…"
        inputValue={input}
        onInputChange={setInput}
        onSearchChange={setSearch}
        loading={venueSearch.loading}
        onAction={handleAction}
      >
        <CommandPalette.Group
          title="Organizers"
          prefix={PREFIXES.organizers}
          more={typing ? undefined : 'Switch to another organizer…'}
        >
          {shownOrganizers.map(entry => {
            const current = entry.id === organizer.id;
            return (
              <CommandPalette.Item
                key={entry.id}
                id={`organizer:${entry.id}`}
                // The customer number finds the organizer too.
                textValue={`${entry.name} ${entry.customerNumber}`}
              >
                <Building2 />
                <TextValue>{entry.name}</TextValue>
                <Description>
                  {current
                    ? 'Current organizer'
                    : `No. ${entry.customerNumber}, ${entry.city}`}
                </Description>
              </CommandPalette.Item>
            );
          })}
        </CommandPalette.Group>

        <CommandPalette.Group
          title="Venues"
          prefix={PREFIXES.venues}
          filter={false}
          more={
            !typing || venueSearch.total > venueSearch.items.length
              ? 'More venues…'
              : undefined
          }
        >
          {shownVenues.map(venue => (
            <CommandPalette.Item
              key={venue.id}
              id={`venue:${venue.id}`}
              href={`${config.base}/venues/${venue.id}`}
              textValue={venue.name}
            >
              <MapPin />
              <TextValue>{venue.name}</TextValue>
              <Description>
                {venue.city}, up to{' '}
                <NumericFormat tabular={false} value={venue.capacity} /> guests
              </Description>
            </CommandPalette.Item>
          ))}
          {search.prefix === PREFIXES.venues &&
            venueSearch.total > venueSearch.items.length && (
              // Leaves the palette for the list page, so it has an arrow.
              <CommandPalette.Item
                id="all-venues"
                href={`${config.base}/venues${
                  search.term ? `?q=${encodeURIComponent(search.term)}` : ''
                }`}
                textValue={`All venues ${search.term}`}
              >
                <ArrowRight />
                <TextValue>
                  All venues{search.term && ` for “${search.term}”`}
                </TextValue>
                <Description>
                  {venueSearch.total} results, opens the venue list
                </Description>
              </CommandPalette.Item>
            )}
        </CommandPalette.Group>

        <CommandPalette.Group title="Members" prefix={PREFIXES.members}>
          {shownPeople.map(person => (
            <CommandPalette.Item
              key={person.id}
              id={`member:${person.id}`}
              href={`${config.base}/users/${person.id}`}
              textValue={person.name}
            >
              <UserRound />
              <TextValue>{person.name}</TextValue>
              <Description>{person.position}</Description>
            </CommandPalette.Item>
          ))}
        </CommandPalette.Group>

        <CommandPalette.Group title="Pages">
          {shownPages.map(page => (
            <CommandPalette.Item
              key={page.href}
              id={`page:${page.href}`}
              href={page.href}
              textValue={page.label}
            >
              {page.icon}
              <TextValue>{page.label}</TextValue>
              <Description>{page.section}</Description>
            </CommandPalette.Item>
          ))}
        </CommandPalette.Group>

        <CommandPalette.Group title="Actions">
          <CommandPalette.Item
            id="create-event"
            href={`${config.base}/event-form`}
          >
            <CalendarPlus />
            Create event
          </CommandPalette.Item>
          <CommandPalette.Item id="invite" href={`${config.base}/users`}>
            <UserPlus />
            Invite member
          </CommandPalette.Item>
          <CommandPalette.Item id="copy-link">
            <Link2 />
            Copy link to this page
          </CommandPalette.Item>
          <CommandPalette.Item id="docs" href={docsHref}>
            <BookOpen />
            Read the docs for this page
          </CommandPalette.Item>
        </CommandPalette.Group>
      </CommandPalette>
    </CommandPalette.Trigger>
  );
};
