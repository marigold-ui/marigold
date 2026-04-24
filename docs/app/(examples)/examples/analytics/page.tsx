'use client';

import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  MousePointerClick,
  TicketCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  Headline,
  Inline,
  Inset,
  NumericFormat,
  Panel,
  Select,
  Stack,
  Table,
  Text,
  Tiles,
} from '@marigold/components';

type Trend = 'up' | 'down' | 'flat';

const stats: Array<{
  key: string;
  label: string;
  value: string;
  delta: string;
  trend: Trend;
  icon: typeof Users;
}> = [
  {
    key: 'revenue',
    label: 'Revenue',
    value: '€48,902',
    delta: '+12.4%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    key: 'tickets',
    label: 'Tickets sold',
    value: '3,284',
    delta: '+8.1%',
    trend: 'up',
    icon: TicketCheck,
  },
  {
    key: 'visitors',
    label: 'Unique visitors',
    value: '128,410',
    delta: '−2.6%',
    trend: 'down',
    icon: Users,
  },
  {
    key: 'ctr',
    label: 'Checkout conversion',
    value: '4.9%',
    delta: '+0.3pp',
    trend: 'up',
    icon: MousePointerClick,
  },
];

const topEvents = [
  {
    name: 'Berlin Jazz Nights',
    category: 'Concert',
    tickets: 1204,
    revenue: 18060,
    change: '+18%',
    trend: 'up' as const,
  },
  {
    name: 'React Europe Summit',
    category: 'Conference',
    tickets: 892,
    revenue: 14272,
    change: '+9%',
    trend: 'up' as const,
  },
  {
    name: 'Moonlit Cinema',
    category: 'Screening',
    tickets: 612,
    revenue: 6120,
    change: '−4%',
    trend: 'down' as const,
  },
  {
    name: 'Hamburg Food Fair',
    category: 'Festival',
    tickets: 576,
    revenue: 5760,
    change: '+22%',
    trend: 'up' as const,
  },
  {
    name: 'Design Systems Meetup',
    category: 'Meetup',
    tickets: 410,
    revenue: 4100,
    change: '+2%',
    trend: 'up' as const,
  },
];

const sources = [
  { label: 'Direct', share: 42, visitors: 53_932 },
  { label: 'Organic search', share: 28, visitors: 35_955 },
  { label: 'Referral', share: 16, visitors: 20_546 },
  { label: 'Social', share: 9, visitors: 11_557 },
  { label: 'Email', share: 5, visitors: 6_420 },
];

const TrendIcon = ({ trend }: { trend: Trend }) =>
  trend === 'up' ? (
    <ArrowUpRight className="size-4" strokeWidth={1.5} />
  ) : trend === 'down' ? (
    <ArrowDownRight className="size-4" strokeWidth={1.5} />
  ) : null;

const AnalyticsPage = () => (
  <Inset space={4}>
    <Stack space={8}>
      <Inline space={4} alignY="center" alignX="between">
        <Stack space={2}>
          <Headline level={2}>Analytics</Headline>
          <Text>
            How events are performing across the workspace for the last 30 days.
          </Text>
        </Stack>
        <Inline space="regular" alignY="center">
          <Select aria-label="Date range" defaultValue="30d" width={44}>
            <Select.Option id="7d">Last 7 days</Select.Option>
            <Select.Option id="30d">Last 30 days</Select.Option>
            <Select.Option id="90d">Last 90 days</Select.Option>
            <Select.Option id="ytd">Year to date</Select.Option>
          </Select>
          <Button variant="secondary">
            <Download /> Export
          </Button>
        </Inline>
      </Inline>

      <Tiles tilesWidth="220px" space={4} equalHeight>
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <Card key={stat.key} stretch>
              <Stack space={4} stretch>
                <Inline space={2} alignY="center" alignX="between">
                  <Text variant="muted" size="sm">
                    {stat.label}
                  </Text>
                  <div className="bg-muted grid size-8 place-items-center rounded-full">
                    <Icon className="size-4" strokeWidth={1.5} />
                  </div>
                </Inline>
                <Stack space={1}>
                  <Text size="3xl" weight="bold">
                    {stat.value}
                  </Text>
                  <Inline space={1} alignY="center">
                    <TrendIcon trend={stat.trend} />
                    <Text size="sm" variant="muted">
                      {stat.delta} vs previous period
                    </Text>
                  </Inline>
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Tiles>

      <Stack space="section">
        <Panel>
          <Panel.Header>
            <Panel.Title>Top events</Panel.Title>
            <Panel.Description>
              Best-performing events in the selected range by ticket revenue.
            </Panel.Description>
            <Panel.HeaderActions>
              <Button variant="secondary">View full report</Button>
            </Panel.HeaderActions>
          </Panel.Header>
          <Panel.Content bleed>
            <Table aria-label="Top events" selectionMode="none">
              <Table.Header>
                <Table.Column rowHeader>Event</Table.Column>
                <Table.Column>Category</Table.Column>
                <Table.Column alignX="right">Tickets</Table.Column>
                <Table.Column alignX="right">Revenue</Table.Column>
                <Table.Column alignX="right">Trend</Table.Column>
              </Table.Header>
              <Table.Body>
                {topEvents.map(event => (
                  <Table.Row key={event.name}>
                    <Table.Cell>
                      <Text weight="semibold">{event.name}</Text>
                    </Table.Cell>
                    <Table.Cell>{event.category}</Table.Cell>
                    <Table.Cell>
                      <NumericFormat
                        value={event.tickets}
                        minimumFractionDigits={0}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <NumericFormat
                        value={event.revenue}
                        style="currency"
                        currency="EUR"
                        minimumFractionDigits={0}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Inline space={1} alignX="right" alignY="center">
                        <TrendIcon trend={event.trend} />
                        <Text
                          size="sm"
                          variant={event.trend === 'down' ? 'muted' : undefined}
                        >
                          {event.change}
                        </Text>
                      </Inline>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Panel.Content>
        </Panel>

        <Panel>
          <Panel.Header>
            <Panel.Title>Traffic sources</Panel.Title>
            <Panel.Description>
              Where visitors came from before they landed on an event page.
            </Panel.Description>
          </Panel.Header>
          <Panel.Content>
            <Stack space="regular">
              {sources.map(source => (
                <Stack key={source.label} space={1}>
                  <Inline space={2} alignY="center" alignX="between">
                    <Inline space={2} alignY="center">
                      <Text weight="semibold" size="sm">
                        {source.label}
                      </Text>
                      <Badge variant="info">{source.share}%</Badge>
                    </Inline>
                    <Text variant="muted" size="sm">
                      <NumericFormat
                        value={source.visitors}
                        minimumFractionDigits={0}
                      />{' '}
                      visitors
                    </Text>
                  </Inline>
                  <div
                    className="bg-muted h-2 w-full overflow-hidden rounded-full"
                    aria-hidden
                  >
                    <div
                      className="bg-foreground h-full rounded-full"
                      style={{ width: `${source.share}%` }}
                    />
                  </div>
                </Stack>
              ))}
            </Stack>
          </Panel.Content>
        </Panel>
      </Stack>
    </Stack>
  </Inset>
);

export default AnalyticsPage;
