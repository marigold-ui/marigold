'use client';

import { people } from '@/lib/data/people';
import { CalendarPlus } from 'lucide-react';
import {
  Badge,
  Card,
  Columns,
  DateFormat,
  Description,
  Inline,
  LinkButton,
  Page,
  Panel,
  Stack,
  Table,
  Text,
  Tiles,
  Title,
} from '@marigold/components';

const stats = [
  { label: 'Events this month', value: '128', hint: '+12% vs last month' },
  { label: 'Tickets sold', value: '8,540', hint: '+5.2% vs last month' },
  { label: 'Active venues', value: '32', hint: '3 added this month' },
  { label: 'Revenue', value: '€94,200', hint: '+8.1% vs last month' },
];

const activity = [
  {
    id: 'r1',
    who: 'sandy',
    action: 'published "Summer Sound Festival"',
    date: '2026-06-01',
  },
  {
    id: 'r2',
    who: 'pipes',
    action: 'updated the checkout pipeline',
    date: '2026-05-31',
  },
  {
    id: 'r3',
    who: 'crash',
    action: 'closed 7 bug reports',
    date: '2026-05-30',
  },
  {
    id: 'r4',
    who: 'gizmo',
    action: 'shipped the new tickets API',
    date: '2026-05-29',
  },
];

const byId = (id: string) => people.find(person => person.id === id);

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
    <Card.Content>
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
    </Card.Content>
  </Card>
);

const DashboardPage = () => (
  <Page>
    <Page.Header>
      <Title>Dashboard</Title>
      <Description>An overview of your workspace.</Description>
      <LinkButton variant="primary" href="/examples/event-form">
        <CalendarPlus />
        Create event
      </LinkButton>
    </Page.Header>

    <Tiles stretch equalHeight tilesWidth="14rem" space="regular">
      {stats.map(stat => (
        <Stat key={stat.label} {...stat} />
      ))}
    </Tiles>

    <Columns columns={[2, 1]} space="group" collapseAt="60rem">
      <Panel>
        <Panel.Header>
          <Title>Recent activity</Title>
          <Description>What your team has been up to.</Description>
        </Panel.Header>
        <Panel.Content bleed>
          <Table aria-label="Recent activity">
            <Table.Header>
              <Table.Column rowHeader>Member</Table.Column>
              <Table.Column>Activity</Table.Column>
              <Table.Column>When</Table.Column>
            </Table.Header>
            <Table.Body>
              {activity.map(entry => (
                <Table.Row key={entry.id}>
                  <Table.Cell>{byId(entry.who)?.name}</Table.Cell>
                  <Table.Cell>{entry.action}</Table.Cell>
                  <Table.Cell>
                    <DateFormat
                      value={new Date(entry.date)}
                      dateStyle="medium"
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Panel.Content>
      </Panel>

      <Panel>
        <Panel.Header>
          <Title>Your team</Title>
        </Panel.Header>
        <Panel.Content>
          <Stack space="regular">
            {people.slice(0, 5).map(person => (
              <Inline key={person.id} space="related" alignY="center" noWrap>
                <img
                  src={person.avatar}
                  alt=""
                  className="block size-8 shrink-0 rounded-full"
                />
                <Stack space="collapsed">
                  <Text weight="semibold">{person.name}</Text>
                  <Text variant="muted" fontSize="xs">
                    {person.position}
                  </Text>
                </Stack>
                <Badge>{person.role}</Badge>
              </Inline>
            ))}
          </Stack>
        </Panel.Content>
      </Panel>
    </Columns>
  </Page>
);

export default DashboardPage;
