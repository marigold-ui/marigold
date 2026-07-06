import {
  ActionBar,
  Badge,
  Button,
  Scrollable,
  Stack,
  Table,
  Text,
} from '@marigold/components';
import { Copy, Pencil, Trash2 } from '@marigold/icons';

const members = [
  { id: '1', name: 'Hans Müller', email: 'hans@example.de', role: 'Owner' },
  {
    id: '2',
    name: 'Fritz Schneider',
    email: 'fritz@example.de',
    role: 'Editor',
  },
  { id: '3', name: 'Klaus Becker', email: 'klaus@example.de', role: 'Viewer' },
  { id: '4', name: 'Helga Fischer', email: 'helga@example.de', role: 'Editor' },
  { id: '5', name: 'Ursula Weber', email: 'ursula@example.de', role: 'Viewer' },
  { id: '6', name: 'Dieter Koch', email: 'dieter@example.de', role: 'Editor' },
];

export default () => (
  <Scrollable height="320px">
    <Table
      aria-label="Team members"
      selectionMode="multiple"
      defaultSelectedKeys={new Set(['2', '3'])}
      actionBar={() => (
        <ActionBar>
          <Button onPress={() => alert('Edit')}>
            <Pencil />
            Edit
          </Button>
          <Button onPress={() => alert('Copy')}>
            <Copy />
            Copy
          </Button>
          <Button onPress={() => alert('Delete')}>
            <Trash2 />
            Delete
          </Button>
        </ActionBar>
      )}
    >
      <Table.Header sticky>
        <Table.Column rowHeader>Name</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>Role</Table.Column>
      </Table.Header>
      <Table.Body>
        {members.map(member => (
          <Table.Row key={member.id} id={member.id}>
            <Table.Cell>
              <Stack space="0.5">
                <Text weight="medium">{member.name}</Text>
                <Text size="xs" color="secondary">
                  {member.email}
                </Text>
              </Stack>
            </Table.Cell>
            <Table.Cell>{member.email}</Table.Cell>
            <Table.Cell>
              <Badge>{member.role}</Badge>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Scrollable>
);
