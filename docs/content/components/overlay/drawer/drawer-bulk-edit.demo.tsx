import {
  ActionBar,
  Badge,
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Select,
  Stack,
  Table,
  Text,
} from '@marigold/components';
import type { DrawerProps } from '@marigold/components';
import { Pencil } from '@marigold/icons';

const events = [
  {
    id: '1',
    name: 'Spring Gala',
    date: 'Apr 15, 2025',
    venue: 'Freiburg',
    status: 'Confirmed',
  },
  {
    id: '2',
    name: 'Jazz Night',
    date: 'May 2, 2025',
    venue: 'Berlin',
    status: 'Confirmed',
  },
  {
    id: '3',
    name: 'Open Air Theater',
    date: 'Jun 10, 2025',
    venue: 'Hamburg',
    status: 'On Sale',
  },
  {
    id: '4',
    name: 'Summer Festival',
    date: 'Jul 22, 2025',
    venue: 'Berlin',
    status: 'Confirmed',
  },
];

export default function (props: DrawerProps) {
  return (
    <Table
      aria-label="Events"
      selectionMode="multiple"
      defaultSelectedKeys={new Set(['1', '2', '3'])}
      actionBar={() => (
        <ActionBar>
          <Drawer.Trigger>
            <Button>
              <Pencil />
              Edit
            </Button>
            <Drawer {...props} size="medium">
              <Drawer.Title>Edit selected events</Drawer.Title>
              <Drawer.Content>
                <Stack space="regular">
                  <Text>
                    Changes will apply to all selected events. Empty fields stay
                    unchanged.
                  </Text>
                  <DatePicker label="Event date" />
                  <Select label="Venue" placeholder="Choose a venue">
                    <Select.Option id="freiburg">Freiburg</Select.Option>
                    <Select.Option id="berlin">Berlin</Select.Option>
                    <Select.Option id="hamburg">Hamburg</Select.Option>
                    <Select.Option id="online">Online</Select.Option>
                  </Select>
                  <Checkbox label="Notify attendees of changes" />
                </Stack>
              </Drawer.Content>
              <Drawer.Actions>
                <Button slot="close">Cancel</Button>
                <Button slot="close" variant="primary">
                  Apply changes
                </Button>
              </Drawer.Actions>
            </Drawer>
          </Drawer.Trigger>
        </ActionBar>
      )}
    >
      <Table.Header>
        <Table.Column rowHeader>Event</Table.Column>
        <Table.Column>Date</Table.Column>
        <Table.Column>Venue</Table.Column>
        <Table.Column>Status</Table.Column>
      </Table.Header>
      <Table.Body>
        {events.map(event => (
          <Table.Row key={event.id} id={event.id}>
            <Table.Cell>{event.name}</Table.Cell>
            <Table.Cell>{event.date}</Table.Cell>
            <Table.Cell>{event.venue}</Table.Cell>
            <Table.Cell>
              <Badge>{event.status}</Badge>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
