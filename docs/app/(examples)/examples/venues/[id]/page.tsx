'use client';

import {
  amenitiesOptions,
  parkingOptions,
  seatingTypeOptions,
  venueById,
  venueTypes,
  venues,
} from '@/lib/data/venues';
import {
  Armchair,
  Bus,
  Car,
  Ear,
  MonitorPlay,
  Projector,
  Shirt,
  Star,
  UsersRound,
  Wallet,
  Wifi,
  Wine,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import {
  ActionMenu,
  Badge,
  Button,
  ButtonGroup,
  Columns,
  DateFormat,
  Description,
  Divider,
  Inline,
  Link,
  NumericFormat,
  Page,
  Panel,
  Stack,
  Text,
  Tiles,
  Title,
} from '@marigold/components';
import { Field, useWorkspace } from '../../../_shared';

// The venue detail is the "Detail / record" layout: a primary column with
// what the venue offers and a narrower "Overview" column with the facts
// people check before they book. A row of key figures sits on top of the
// primary column, so capacity, price and rating read at a glance. The panels
// sit `regular` apart, close enough to read as one record.
const amenityIcons: Record<(typeof amenitiesOptions)[number], ReactNode> = {
  Bar: <Wine />,
  'Coat check': <Shirt />,
  'Hearing loop': <Ear />,
  Projector: <Projector />,
  Screen: <MonitorPlay />,
  'Tables & chairs': <Armchair />,
  WiFi: <Wifi />,
};

// A decorative icon in the secondary text colour.
const Icon = ({
  size = 'small',
  children,
}: {
  size?: 'small' | 'medium';
  children: ReactNode;
}) => (
  <span
    aria-hidden="true"
    className={
      size === 'small'
        ? 'text-secondary [&_svg]:size-4'
        : 'text-secondary [&_svg]:size-5'
    }
  >
    {children}
  </span>
);

const KeyFigure = ({
  icon,
  label,
  unit,
  children,
}: {
  icon: ReactNode;
  label: string;
  unit?: string;
  children: ReactNode;
}) => (
  <Stack space="tight">
    <Inline space="tight" alignY="center" noWrap>
      <Icon>{icon}</Icon>
      <Text variant="muted" fontSize="xs">
        {label}
      </Text>
    </Inline>
    <Text fontSize="2xl" weight="semibold">
      {children}
      {unit && (
        <Text as="span" variant="muted" fontSize="sm">
          {` ${unit}`}
        </Text>
      )}
    </Text>
  </Stack>
);

// A titled set of badges, such as the seating or the parking options.
const BadgeGroup = ({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) => (
  <Stack space="related">
    <Inline space="tight" alignY="center" noWrap>
      <Icon>{icon}</Icon>
      <Text weight="semibold">{title}</Text>
    </Inline>
    <Inline space="related">
      {items.map(item => (
        <Badge key={item}>{item}</Badge>
      ))}
    </Inline>
  </Stack>
);

const Price = ({ value }: { value: number }) => (
  <NumericFormat
    style="currency"
    currency="USD"
    maximumFractionDigits={0}
    value={value}
  />
);

const VenueDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { visitVenue } = useWorkspace();
  const venue = venueById(params.id);

  // Opening a venue puts it on top of the palette's recent venues.
  useEffect(() => {
    if (venue) visitVenue(venue.id);
  }, [venue, visitVenue]);

  if (!venue) notFound();

  // Venues in the same city first, then venues of the same type elsewhere.
  const others = venues.filter(other => other.id !== venue.id);
  const similar = [
    ...others.filter(other => other.city === venue.city),
    ...others.filter(
      other => other.city !== venue.city && other.type === venue.type
    ),
  ].slice(0, 3);

  return (
    <Page>
      <Page.Header>
        <Title>{venue.name}</Title>
        <Description>
          {venueTypes[venue.type]} in {venue.city}, {venue.country}
        </Description>
        <ButtonGroup aria-label="Venue actions">
          <Button variant="primary">Book this venue</Button>
          <ActionMenu size="icon" aria-label="More actions">
            <ActionMenu.Item id="edit">Edit venue</ActionMenu.Item>
            <ActionMenu.Item id="duplicate">Duplicate</ActionMenu.Item>
            <ActionMenu.Item id="archive" variant="destructive">
              Archive venue
            </ActionMenu.Item>
          </ActionMenu>
        </ButtonGroup>
      </Page.Header>

      <img
        src={venue.image}
        alt={`${venue.name}, ${venue.city}`}
        className="block aspect-[3/1] w-full rounded-xl object-cover"
      />

      <Columns columns={[2, 1]} space="regular" collapseAt="60rem">
        {/* Primary column: what the venue offers */}
        <Stack space="regular">
          <Panel>
            <Panel.Content>
              <Tiles space="regular" tilesWidth="8rem" stretch>
                <KeyFigure icon={<UsersRound />} label="Capacity">
                  <NumericFormat tabular={false} value={venue.capacity} />
                </KeyFigure>
                <KeyFigure icon={<Wallet />} label="Price from">
                  <Price value={venue.price.from} />
                </KeyFigure>
                <KeyFigure icon={<Star />} label="Rating" unit="/ 5">
                  {venue.rating.toFixed(1)}
                </KeyFigure>
                <KeyFigure icon={<Bus />} label="Public transit" unit="min">
                  {venue.publicTransitMinutes}
                </KeyFigure>
              </Tiles>
            </Panel.Content>
          </Panel>

          <Panel>
            <Panel.Header>
              <Title>About</Title>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                <Text>{venue.description}</Text>
                <Inline space="related">
                  {venue.traits.map(trait => (
                    <Badge key={trait}>{trait}</Badge>
                  ))}
                </Inline>
              </Stack>
            </Panel.Content>
          </Panel>

          <Panel>
            <Panel.Header>
              <Title>Amenities</Title>
              <Description>What is on site, ready for your event.</Description>
            </Panel.Header>
            <Panel.Content>
              <Tiles space="regular" tilesWidth="11rem">
                {venue.amenities.map(index => {
                  const amenity = amenitiesOptions[index];
                  return (
                    <Inline
                      key={amenity}
                      space="related"
                      alignY="center"
                      noWrap
                    >
                      <Icon size="medium">{amenityIcons[amenity]}</Icon>
                      <Text>{amenity}</Text>
                    </Inline>
                  );
                })}
              </Tiles>
            </Panel.Content>
          </Panel>

          <Panel>
            <Panel.Header>
              <Title>Seating and arrival</Title>
            </Panel.Header>
            <Panel.Content>
              <Columns columns={[1, 1]} space="regular" collapseAt="30rem">
                <BadgeGroup
                  icon={<Armchair />}
                  title="Seating"
                  items={venue.seatingTypes.map(i => seatingTypeOptions[i])}
                />
                <BadgeGroup
                  icon={<Car />}
                  title="Parking"
                  items={venue.parking.map(i => parkingOptions[i])}
                />
              </Columns>
            </Panel.Content>
          </Panel>
        </Stack>

        {/* Secondary column: the facts people check before they book */}
        <Stack space="regular">
          <Panel>
            <Panel.Header>
              <Title>Overview</Title>
            </Panel.Header>
            <Panel.Content>
              <Stack space="regular">
                <Inline space="related">
                  <Badge variant={venue.indoor ? 'info' : 'success'}>
                    {venue.indoor ? 'Indoor' : 'Outdoor'}
                  </Badge>
                </Inline>
                <Field label="Next available">
                  <DateFormat
                    value={new Date(venue.nextAvailable)}
                    dateStyle="medium"
                  />
                </Field>
                <Field label="Price range">
                  <Price value={venue.price.from} />
                  {' – '}
                  <Price value={venue.price.to} />
                </Field>
                <Divider />
                <Field label="Address">
                  {venue.street}
                  <br />
                  {venue.postcode} {venue.city}
                  <br />
                  {venue.country}
                </Field>
              </Stack>
            </Panel.Content>
          </Panel>

          {similar.length > 0 && (
            <Panel>
              <Panel.Header>
                <Title>Similar venues</Title>
              </Panel.Header>
              <Panel.Content>
                <Stack space="regular">
                  {similar.map(other => (
                    <Inline
                      key={other.id}
                      space="related"
                      alignY="center"
                      noWrap
                    >
                      <img
                        src={other.image}
                        alt=""
                        className="block size-12 shrink-0 rounded-lg object-cover"
                      />
                      <Stack space="collapsed">
                        <Link href={`/examples/venues/${other.id}`}>
                          {other.name}
                        </Link>
                        <Text variant="muted" fontSize="xs">
                          {venueTypes[other.type]}, {other.city}
                        </Text>
                      </Stack>
                    </Inline>
                  ))}
                </Stack>
              </Panel.Content>
            </Panel>
          )}
        </Stack>
      </Columns>
    </Page>
  );
};

export default VenueDetailPage;
