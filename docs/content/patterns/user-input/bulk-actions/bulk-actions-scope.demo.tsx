import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Badge,
  Button,
  Select,
  Stack,
  Table,
} from '@marigold/components';
import { Archive, Tag } from '@marigold/icons';

const events = [
  {
    id: '1',
    name: 'Jazz Night',
    date: 'Aug 12, 2026',
    status: 'On sale',
  },
  {
    id: '2',
    name: 'Open Air Kino',
    date: 'Aug 15, 2026',
    status: 'On sale',
  },
  {
    id: '3',
    name: 'Poetry Slam',
    date: 'Aug 21, 2026',
    status: 'Draft',
  },
  {
    id: '4',
    name: 'Herbstmarkt',
    date: 'Sep 5, 2026',
    status: 'Draft',
  },
  {
    id: '5',
    name: 'Wine Tasting',
    date: 'Sep 12, 2026',
    status: 'On sale',
  },
];

export default () => {
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState<Selection>(new Set());

  const visible =
    status === 'all' ? events : events.filter(event => event.status === status);

  // The selection only ever contains visible rows. When the filter
  // changes, the visible set changes, so the selection is cleared.
  const changeFilter = (nextStatus: string) => {
    setSelected(new Set());
    setStatus(nextStatus);
  };

  return (
    <Stack space={4}>
      <Select
        label="Status"
        value={status}
        onChange={key => changeFilter(String(key))}
        width={44}
      >
        <Select.Option id="all">All statuses</Select.Option>
        <Select.Option id="On sale">On sale</Select.Option>
        <Select.Option id="Draft">Draft</Select.Option>
      </Select>
      <Table
        aria-label="Events"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        actionBar={() => (
          <ActionBar>
            <Button onPress={() => alert('Assign category')}>
              <Tag />
              Assign category
            </Button>
            <Button onPress={() => alert('Archive')}>
              <Archive />
              Archive
            </Button>
          </ActionBar>
        )}
      >
        <Table.Header>
          <Table.Column rowHeader>Event</Table.Column>
          <Table.Column>Date</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          {visible.map(event => (
            <Table.Row key={event.id} id={event.id}>
              <Table.Cell>{event.name}</Table.Cell>
              <Table.Cell>{event.date}</Table.Cell>
              <Table.Cell>
                <Badge
                  variant={event.status === 'On sale' ? 'success' : 'info'}
                >
                  {event.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
};
