'use client';

import { people } from '@/lib/data/people';
import { UserRoundPlus } from 'lucide-react';
import {
  Badge,
  Button,
  DateFormat,
  Description,
  Inline,
  Page,
  Panel,
  Stack,
  Table,
  Text,
  Title,
} from '@marigold/components';

// A members list is the "List / index" layout: a single full-width Panel
// wrapping a table. Each row links to the member detail drill-in.
const statusVariant = {
  active: 'success',
  invited: 'info',
  suspended: 'error',
} as const;

const UsersPage = () => (
  <Page>
    <Page.Header>
      <Title>Users</Title>
      <Description>Manage the members of your workspace.</Description>
      <Button variant="primary">
        <UserRoundPlus />
        Invite member
      </Button>
    </Page.Header>
    <Panel aria-label="Members">
      <Panel.Content bleed>
        <Table aria-label="Members">
          <Table.Header>
            <Table.Column rowHeader>Name</Table.Column>
            <Table.Column>Title</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Joined</Table.Column>
          </Table.Header>
          <Table.Body>
            {people.map(person => (
              <Table.Row key={person.id} href={`/examples/users/${person.id}`}>
                <Table.Cell>
                  <Inline space="related" alignY="center" noWrap>
                    <img
                      src={person.avatar}
                      alt=""
                      className="block size-8 shrink-0 rounded-full"
                    />
                    <Stack space="collapsed">
                      <Text weight="semibold">{person.name}</Text>
                      <Text variant="muted" fontSize="xs">
                        {person.email}
                      </Text>
                    </Stack>
                  </Inline>
                </Table.Cell>
                <Table.Cell>{person.position}</Table.Cell>
                <Table.Cell>{person.role}</Table.Cell>
                <Table.Cell>
                  <Badge variant={statusVariant[person.status]}>
                    {person.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <DateFormat
                    value={new Date(person.joined)}
                    dateStyle="medium"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>
  </Page>
);

export default UsersPage;
