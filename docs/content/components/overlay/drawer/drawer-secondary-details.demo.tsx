import {
  Button,
  Drawer,
  DrawerProps,
  Inline,
  Stack,
  Table,
  Text,
} from '@marigold/components';

type Ticket = {
  id: string;
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  assignee: string;
  created: string;
  updated: string;
  description: string;
  customerNote: string;
};

const tickets: Ticket[] = [
  {
    id: '4521',
    subject: 'Login issue',
    priority: 'High',
    status: 'Open',
    assignee: 'Jane Doe',
    created: 'Sep 12, 2025',
    updated: 'Sep 15, 2025',
    description:
      'User reports being unable to log in after the latest update. Error: "Invalid session token."',
    customerNote: '"I tried resetting my password, but I’m still locked out."',
  },
  {
    id: '4520',
    subject: 'Email notifications not sent',
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Marco Lee',
    created: 'Sep 11, 2025',
    updated: 'Sep 14, 2025',
    description:
      'Order confirmation emails are not arriving for customers using gmail.com addresses.',
    customerNote: '"Two of my recent orders never came through to my inbox."',
  },
  {
    id: '4519',
    subject: 'Dashboard loading slowly',
    priority: 'Low',
    status: 'Open',
    assignee: 'Priya Singh',
    created: 'Sep 10, 2025',
    updated: 'Sep 12, 2025',
    description:
      'Dashboard takes 8–10 seconds to load on first visit. Subsequent loads are normal.',
    customerNote: '"It used to be much faster a few weeks ago."',
  },
];

const TicketDrawer = ({
  ticket,
  ...props
}: { ticket: Ticket } & DrawerProps) => (
  <Drawer.Trigger>
    <Button variant="ghost" size="small">
      View
    </Button>
    <Drawer {...props} size="medium">
      <Drawer.Title>
        Ticket #{ticket.id} – {ticket.subject}
      </Drawer.Title>
      <Drawer.Content>
        <Stack space={6}>
          <Text>
            <strong>Description:</strong> {ticket.description}
          </Text>

          <Stack space={2}>
            <Text>
              <strong>Status:</strong> {ticket.status}
            </Text>
            <Text>
              <strong>Priority:</strong> {ticket.priority}
            </Text>
            <Text>
              <strong>Assigned to:</strong> {ticket.assignee}
            </Text>
            <Text>
              <strong>Created:</strong> {ticket.created}
            </Text>
            <Text>
              <strong>Last Updated:</strong> {ticket.updated}
            </Text>
          </Stack>

          <Text>
            <strong>Customer Notes:</strong> {ticket.customerNote}
          </Text>
        </Stack>
      </Drawer.Content>
      <Drawer.Actions>
        <Inline space={3}>
          <Button slot="close">Close</Button>
          <Button slot="close" variant="primary">
            Resolve Ticket
          </Button>
        </Inline>
      </Drawer.Actions>
    </Drawer>
  </Drawer.Trigger>
);

export default function (props: DrawerProps) {
  return (
    <Table aria-label="Support tickets">
      <Table.Header>
        <Table.Column rowHeader>Ticket</Table.Column>
        <Table.Column>Priority</Table.Column>
        <Table.Column>Status</Table.Column>
        <Table.Column>Assignee</Table.Column>
        <Table.Column>Action</Table.Column>
      </Table.Header>
      <Table.Body>
        {tickets.map(ticket => (
          <Table.Row key={ticket.id}>
            <Table.Cell>
              #{ticket.id} – {ticket.subject}
            </Table.Cell>
            <Table.Cell>{ticket.priority}</Table.Cell>
            <Table.Cell>{ticket.status}</Table.Cell>
            <Table.Cell>{ticket.assignee}</Table.Cell>
            <Table.Cell>
              <TicketDrawer ticket={ticket} {...props} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
