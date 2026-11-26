'use client';

import { people } from '@/lib/data/people';
import { venues } from '@/lib/data/venues';
import { CalendarPlus } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  Badge,
  Card,
  Columns,
  DateFormat,
  Description,
  Inline,
  LinkButton,
  NumericFormat,
  Page,
  Panel,
  Scrollable,
  Stack,
  Table,
  Text,
  Tiles,
  Title,
} from '@marigold/components';
import { useWorkspace } from '../_shared';
import { businessNumbers, daysAgo } from '../_shared/demo-data';

const stats = [
  {
    label: 'Events on sale',
    value: <NumericFormat value={businessNumbers.eventsOnSale} />,
    hint: '+3 vs last month',
  },
  {
    label: 'Tickets sold',
    value: <NumericFormat value={businessNumbers.ticketsSold} />,
    hint: '+5.2% vs last month',
  },
  {
    label: 'Active venues',
    value: <NumericFormat value={venues.length} />,
    hint: '1 added this month',
  },
  {
    label: 'Revenue',
    value: (
      <NumericFormat
        value={businessNumbers.revenue}
        style="currency"
        currency="EUR"
        maximumFractionDigits={0}
      />
    ),
    hint: '+8.1% vs last month',
  },
];

// A function, so the dates are worked out on every render, not once per server.
const getActivity = () => [
  {
    id: 'r1',
    who: 'soundcheck',
    action: 'published "Summer Sound Festival"',
    date: daysAgo(1),
  },
  {
    id: 'r2',
    who: 'turnstile',
    action: 'opened the box office for the autumn season',
    date: daysAgo(2),
  },
  {
    id: 'r3',
    who: 'cue',
    action: 'signed off 7 stage plans',
    date: daysAgo(3),
  },
  {
    id: 'r4',
    who: 'sponsor',
    action: 'signed the brewery sponsorship',
    date: daysAgo(4),
  },
];

const byId = (id: string) => people.find(person => person.id === id);

const Stat = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint: string;
}) => (
  <Card stretch aria-label={label}>
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

const DashboardPage = () => {
  // Follows the organizer people switch to in the command palette.
  const { organizer } = useWorkspace();
  return (
    <Page>
      <Page.Header>
        <Title>Dashboard</Title>
        <Description>An overview of {organizer.name}.</Description>
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
            <Scrollable>
              <Table aria-label="Recent activity">
                <Table.Header>
                  <Table.Column rowHeader width="1fr" minWidth={150}>
                    Member
                  </Table.Column>
                  <Table.Column width="2fr" minWidth={200}>
                    Activity
                  </Table.Column>
                  <Table.Column width={130}>When</Table.Column>
                </Table.Header>
                <Table.Body>
                  {getActivity().map(entry => (
                    <Table.Row key={entry.id}>
                      <Table.Cell>{byId(entry.who)?.name}</Table.Cell>
                      <Table.Cell>{entry.action}</Table.Cell>
                      <Table.Cell>
                        <DateFormat value={entry.date} dateStyle="medium" />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Scrollable>
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
};

export default DashboardPage;
