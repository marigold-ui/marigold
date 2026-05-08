import { people } from '@/lib/data/people';
import { UserRoundPlus } from 'lucide-react';
import { Badge, Button, Panel, Table, Text } from '@marigold/components';

export const UserTable = () => (
  <Panel>
    <Panel.Header>
      <Panel.Title>Users</Panel.Title>
      <Panel.Description>
        A list of all the users in your account including their name, title,
        email and role.
      </Panel.Description>
      <Panel.HeaderActions>
        <Button variant="primary">
          <UserRoundPlus /> Add user
        </Button>
      </Panel.HeaderActions>
    </Panel.Header>
    <Panel.Content bleed>
      <Table
        selectionMode="multiple"
        defaultSelectedKeys={[people[0].id, people[1].id]}
      >
        <Table.Header>
          <Table.Column rowHeader>Name</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column alignX="right">&nbsp;</Table.Column>
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
    </Panel.Content>
  </Panel>
);
