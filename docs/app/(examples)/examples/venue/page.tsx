'use client';

import {
  amenitiesOptions,
  parkingOptions,
  seatingTypeOptions,
  venueTypes,
  venues,
} from '@/lib/data/venues';
import {
  ActionButton,
  Badge,
  Columns,
  Description,
  Inline,
  Page,
  Panel,
  Stack,
  Text,
  Title,
} from '@marigold/components';

// The detail (record) page is the drill-in from the Venues list (see the
// `filter` example). It demonstrates the canonical detail layout: a primary
// column with the object's content and a secondary column with status and
// metadata, the same primary/secondary split used by most design systems.
const venue = venues.find(v => v.id === '1')!;

const price = `$${venue.price.from.toLocaleString()} to $${venue.price.to.toLocaleString()}`;

const Field = ({ label, children }: { label: string; children: string }) => (
  <Stack space="tight">
    <Text variant="muted" size="xs">
      {label}
    </Text>
    <Text weight="semibold">{children}</Text>
  </Stack>
);

const VenuePage = () => (
  <Page>
    <Page.Header>
      <Title>{venue.name}</Title>
      <Description>{venue.description}</Description>
      <ActionButton variant="primary">Book venue</ActionButton>
    </Page.Header>

    <Columns columns={[2, 1]} space="group" collapseAt="60rem">
      {/* Primary column: the object's content */}
      <Stack space="group">
        <Panel>
          <Panel.Header>
            <Title>Location</Title>
          </Panel.Header>
          <Panel.Content>
            <Stack space="regular">
              <Field label="Address">
                {`${venue.street}, ${venue.postcode} ${venue.city}, ${venue.country}`}
              </Field>
              <Field label="Public transit">
                {`${venue.publicTransitMinutes} min from the nearest stop`}
              </Field>
              <Field label="Parking">
                {venue.parking.map(p => parkingOptions[p]).join(', ')}
              </Field>
            </Stack>
          </Panel.Content>
        </Panel>

        <Panel>
          <Panel.Header>
            <Title>Capacity & seating</Title>
          </Panel.Header>
          <Panel.Content>
            <Stack space="regular">
              <Field label="Maximum capacity">
                {`${venue.capacity.toLocaleString()} guests`}
              </Field>
              <Field label="Seating types">
                {venue.seatingTypes.map(s => seatingTypeOptions[s]).join(', ')}
              </Field>
            </Stack>
          </Panel.Content>
        </Panel>

        <Panel>
          <Panel.Header>
            <Title>Amenities</Title>
          </Panel.Header>
          <Panel.Content>
            <Inline space="related">
              {venue.amenities.map(a => (
                <Badge key={a}>{amenitiesOptions[a]}</Badge>
              ))}
            </Inline>
          </Panel.Content>
        </Panel>
      </Stack>

      {/* Secondary column: status and at-a-glance metadata */}
      <Panel>
        <Panel.Header>
          <Title>Overview</Title>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            <Inline space="related" alignY="center">
              <Badge variant="success">Available</Badge>
              <Text variant="muted" size="sm">{`★ ${venue.rating}`}</Text>
            </Inline>
            <Field label="Type">{venueTypes[venue.type]}</Field>
            <Field label="Setting">{venue.indoor ? 'Indoor' : 'Outdoor'}</Field>
            <Field label="Price range">{`${price} / event`}</Field>
          </Stack>
        </Panel.Content>
      </Panel>
    </Columns>
  </Page>
);

export default VenuePage;
