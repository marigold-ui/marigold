'use client';

import { venueTypes, venues } from '@/lib/data/venues';
import { UsersRound } from 'lucide-react';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Badge,
  Card,
  Description,
  EmptyState,
  Inline,
  NumericFormat,
  Page,
  Stack,
  Text,
  Tiles,
  Title,
} from '@marigold/components';
import { useWorkspace } from '../../_shared';

// The venue list is the "List / index" layout as a gallery: venues are
// recognised by their photo first, so cards beat a table here. The command
// palette's "All venues" row lands here with its search term in `?q=`.
//
// The whole card opens the venue detail. `<Card>` is not interactive, so the
// title holds the link and its `::after` stretches over the card: the name
// reads as a heading, not a link, and screen readers hear just the name as
// the link. Keyboard focus outlines the whole card.
const stretchedLink = [
  'text-inherit no-underline outline-none',
  "after:absolute after:inset-0 after:rounded-(--radius-surface) after:content-['']",
  // The theme's focus outline (`ui-state-focus`), on the whole card.
  'focus-visible:after:outline-3 focus-visible:after:outline-solid focus-visible:after:outline-(--color-ring)/50',
  'focus-visible:after:ring-1 focus-visible:after:ring-(--color-ring)',
].join(' ');
const VenuesPage = () => {
  const { organizer } = useWorkspace();
  const term = useSearchParams().get('q')?.trim() ?? '';
  const shown = term
    ? venues.filter(venue =>
        venue.name.toLowerCase().includes(term.toLowerCase())
      )
    : venues;

  return (
    <Page>
      <Page.Header>
        <Title>Venues</Title>
        <Description>
          {term
            ? `${shown.length} venues matching “${term}”`
            : `The places ${organizer.name} books events in.`}
        </Description>
      </Page.Header>

      {shown.length === 0 ? (
        <EmptyState
          title="No venues found"
          description={`No venue name contains “${term}”.`}
        />
      ) : (
        <Tiles
          space="regular"
          tilesWidth="16rem"
          stretch
          equalHeight
          role="list"
          aria-label="Venues"
        >
          {shown.map(venue => (
            <div key={venue.id} role="listitem" className="relative flex">
              <Card stretch>
                <Card.Media>
                  <img
                    src={venue.image}
                    alt=""
                    className="block aspect-4/3 w-full object-cover"
                  />
                </Card.Media>
                <Card.Header>
                  <Title>
                    <NextLink
                      href={`/examples/venues/${venue.id}`}
                      className={stretchedLink}
                    >
                      {venue.name}
                    </NextLink>
                  </Title>
                  <Description>
                    {venue.city}, {venue.country}
                  </Description>
                </Card.Header>
                <Card.Content>
                  <Stack space="tight">
                    <Inline space="related">
                      <Badge>{venueTypes[venue.type]}</Badge>
                    </Inline>
                    <Inline space="tight" alignY="center" noWrap>
                      <UsersRound aria-hidden="true" size={14} />
                      <Text variant="muted" fontSize="sm">
                        Up to{' '}
                        <NumericFormat tabular={false} value={venue.capacity} />{' '}
                        guests
                      </Text>
                    </Inline>
                  </Stack>
                </Card.Content>
              </Card>
            </div>
          ))}
        </Tiles>
      )}
    </Page>
  );
};

export default VenuesPage;
