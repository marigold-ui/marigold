import {
  Button,
  Drawer,
  Headline,
  Inline,
  Select,
  Stack,
  Table,
  TextField,
} from '@marigold/components';

type Member = {
  id: string;
  name: string;
  role: string;
  email: string;
};

const members: Member[] = [
  {
    id: '1',
    name: 'Anna Müller',
    role: 'Designer',
    email: 'anna@example.com',
  },
  {
    id: '2',
    name: 'Tom Becker',
    role: 'Developer',
    email: 'tom@example.com',
  },
  {
    id: '3',
    name: 'Sara Klein',
    role: 'PM',
    email: 'sara@example.com',
  },
];

const EditDrawer = ({ member }: { member: Member }) => (
  <Drawer.Trigger>
    <Button variant="secondary" size="small">
      Edit
    </Button>
    <Drawer>
      <Drawer.Title>Edit member</Drawer.Title>
      <Drawer.Content>
        <Stack space="regular">
          <TextField label="Name" defaultValue={member.name} />
          <Select label="Role" defaultSelectedKey={member.role}>
            <Select.Option id="Designer">Designer</Select.Option>
            <Select.Option id="Developer">Developer</Select.Option>
            <Select.Option id="PM">PM</Select.Option>
          </Select>
          <TextField label="Email" defaultValue={member.email} />
        </Stack>
      </Drawer.Content>
      <Drawer.Actions>
        <Button slot="close">Cancel</Button>
        <Button slot="close" variant="primary">
          Save changes
        </Button>
      </Drawer.Actions>
    </Drawer>
  </Drawer.Trigger>
);

const AddDrawer = () => (
  <Drawer.Trigger>
    <Button>+ Add member</Button>
    <Drawer>
      <Drawer.Title>Add member</Drawer.Title>
      <Drawer.Content>
        <Stack space="regular">
          <TextField label="Name" placeholder="Full name" />
          <Select label="Role" placeholder="Pick a role">
            <Select.Option id="Designer">Designer</Select.Option>
            <Select.Option id="Developer">Developer</Select.Option>
            <Select.Option id="PM">PM</Select.Option>
          </Select>
          <TextField label="Email" placeholder="email@example.com" />
        </Stack>
      </Drawer.Content>
      <Drawer.Actions>
        <Button slot="close">Cancel</Button>
        <Button slot="close" variant="primary">
          Add member
        </Button>
      </Drawer.Actions>
    </Drawer>
  </Drawer.Trigger>
);

export default function () {
  return (
    <Stack space="regular">
      <Inline alignX="between" alignY="center">
        <Headline level={3}>Members</Headline>
        <AddDrawer />
      </Inline>
      <Table aria-label="Members">
        <Table.Header>
          <Table.Column rowHeader>Name</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>Action</Table.Column>
        </Table.Header>
        <Table.Body>
          {members.map(m => (
            <Table.Row key={m.id} id={m.id}>
              <Table.Cell>{m.name}</Table.Cell>
              <Table.Cell>{m.role}</Table.Cell>
              <Table.Cell>{m.email}</Table.Cell>
              <Table.Cell>
                <EditDrawer member={m} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
}
