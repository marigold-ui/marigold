import { people } from '@/lib/data/people';
import { UserRoundPlus } from 'lucide-react';
import {
  Badge,
  Button,
  Headline,
  Inline,
  Stack,
  Table,
  Text,
} from '@marigold/components';

export const UserTable = () => (
  <Stack space={6}>
    <Inline space={4} alignY="center" alignX="between">
      <Stack>
        <Headline level="2">Users</Headline>
        <Text variant="muted" weight="light">
          A list of all the users in your account including their name, title,
          email and role.
        </Text>
      </Stack>
      <Button variant="primary">
        <UserRoundPlus /> Add user
      </Button>
    </Inline>
    <Table
      selectionMode="multiple"
      defaultSelectedKeys={[people[0].id, people[1].id]}
    >
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>Status</Table.Column>
        <Table.Column>Role</Table.Column>
        <Table.Column align="right">&nbsp;</Table.Column>
      </Table.Header>
      <Table.Body>
        {people.map(person => (
          <Table.Row key={person.id}>
            <Table.Cell>
              <Text weight="semibold">{person.name}</Text>
            </Table.Cell>
            <Table.Cell>{person.email}</Table.Cell>
            <Table.Cell>
              <Badge variant="success">active</Badge>
            </Table.Cell>
            <Table.Cell>{person.position}</Table.Cell>
            <Table.Cell>
              <Button>Edit</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Stack>
);
