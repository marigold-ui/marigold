'use client';

import { venues } from '@/lib/data/venues';
import {
  Card,
  Columns,
  Description,
  Page,
  Panel,
  Stack,
  Table,
  Text,
  Tiles,
  Title,
} from '@marigold/components';

const stats = [
  { label: 'Sessions', value: '48,920', hint: '+9.4% vs last month' },
  { label: 'Conversion rate', value: '3.8%', hint: '+0.5pt vs last month' },
  { label: 'Avg. rating', value: '4.6', hint: 'across 1,200 reviews' },
  { label: 'Refund rate', value: '1.2%', hint: '-0.3pt vs last month' },
];

// Tickets sold per venue for the reporting period, keyed by venue id. This is
// the metric the "Top venues" ranking is built on — keying by id keeps the
// ranking correct if the underlying dataset changes.
const ticketsSoldByVenue: Record<string, number> = {
  '1': 4120,
  '2': 1860,
  '3': 920,
  '4': 5240,
  '5': 2670,
  '6': 3480,
  '7': 1530,
  '8': 2090,
  '9': 760,
  '10': 4480,
};

// Highest-grossing venues this period: attach the metric, rank by it, take the top 6.
const topVenues = venues
  .map(venue => ({
    ...venue,
    ticketsSold: ticketsSoldByVenue[venue.id] ?? 0,
  }))
  .sort((a, b) => b.ticketsSold - a.ticketsSold)
  .slice(0, 6);

const sources = [
  { id: 's1', source: 'Direct', sessions: '18,440', share: '38%' },
  { id: 's2', source: 'Search', sessions: '13,210', share: '27%' },
  { id: 's3', source: 'Social', sessions: '9,780', share: '20%' },
  { id: 's4', source: 'Referral', sessions: '7,490', share: '15%' },
];

const Stat = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) => (
  <Card stretch>
    <Card.Body>
      <Stack space="tight">
        <Text variant="muted" fontSize="sm">
          {label}
        </Text>
        <Text fontSize="4xl" weight="semibold">
          {value}
        </Text>
        <Text variant="muted" fontSize="xs">
          {hint}
        </Text>
      </Stack>
    </Card.Body>
  </Card>
);

const AnalyticsPage = () => (
  <Page>
    <Page.Header>
      <Title>Analytics</Title>
      <Description>
        Sessions, top venues, and traffic sources for June 2026.
      </Description>
    </Page.Header>

    <Tiles stretch equalHeight tilesWidth="14rem" space="regular">
      {stats.map(stat => (
        <Stat key={stat.label} {...stat} />
      ))}
    </Tiles>

    <Columns columns={[2, 1]} space="group" collapseAt="60rem">
      <Panel>
        <Panel.Header>
          <Title>Top venues</Title>
          <Description>Ranked by tickets sold this month.</Description>
        </Panel.Header>
        <Panel.Content bleed>
          <Table aria-label="Top venues by tickets sold">
            <Table.Header>
              <Table.Column rowHeader>Venue</Table.Column>
              <Table.Column>City</Table.Column>
              <Table.Column alignX="right">Tickets sold</Table.Column>
              <Table.Column alignX="right">Rating</Table.Column>
            </Table.Header>
            <Table.Body>
              {topVenues.map(venue => (
                <Table.Row key={venue.id}>
                  <Table.Cell>{venue.name}</Table.Cell>
                  <Table.Cell>{venue.city}</Table.Cell>
                  <Table.Cell alignX="right">
                    {venue.ticketsSold.toLocaleString()}
                  </Table.Cell>
                  <Table.Cell alignX="right">{`★ ${venue.rating}`}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Panel.Content>
      </Panel>

      <Panel>
        <Panel.Header>
          <Title>Traffic by source</Title>
        </Panel.Header>
        <Panel.Content bleed>
          <Table aria-label="Traffic by source">
            <Table.Header>
              <Table.Column rowHeader>Source</Table.Column>
              <Table.Column alignX="right">Sessions</Table.Column>
              <Table.Column alignX="right">Share</Table.Column>
            </Table.Header>
            <Table.Body>
              {sources.map(source => (
                <Table.Row key={source.id}>
                  <Table.Cell>{source.source}</Table.Cell>
                  <Table.Cell alignX="right">{source.sessions}</Table.Cell>
                  <Table.Cell alignX="right">{source.share}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Panel.Content>
      </Panel>
    </Columns>
  </Page>
);

export default AnalyticsPage;
