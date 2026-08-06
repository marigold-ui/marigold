import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Badge,
  Button,
  Pagination,
  Stack,
  Table,
} from '@marigold/components';
import { Archive, Tag } from '@marigold/icons';

const pageSize = 4;

const events = [
  { id: '1', name: 'Jazz Night', date: 'Aug 12, 2026', status: 'On sale' },
  { id: '2', name: 'Open Air Kino', date: 'Aug 15, 2026', status: 'On sale' },
  { id: '3', name: 'Poetry Slam', date: 'Aug 21, 2026', status: 'Draft' },
  { id: '4', name: 'Herbstmarkt', date: 'Sep 5, 2026', status: 'Draft' },
  { id: '5', name: 'Wine Tasting', date: 'Sep 12, 2026', status: 'On sale' },
  { id: '6', name: 'Krimi Dinner', date: 'Sep 19, 2026', status: 'On sale' },
  { id: '7', name: 'Comedy Club', date: 'Sep 26, 2026', status: 'Draft' },
  { id: '8', name: 'Filmkonzert', date: 'Oct 3, 2026', status: 'On sale' },
  { id: '9', name: 'Lesung am See', date: 'Oct 10, 2026', status: 'Draft' },
];

export default () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Selection>(new Set());

  const visible = events.slice((page - 1) * pageSize, page * pageSize);

  // A page change is a scope change: clearing here keeps the selection from
  // silently including rows that are no longer on screen.
  const changePage = (nextPage: number) => {
    setSelected(new Set()); // [!code highlight]
    setPage(nextPage);
  };

  return (
    <Stack space={4}>
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
      <Pagination
        page={page}
        totalItems={events.length}
        pageSize={pageSize}
        onChange={changePage}
      />
    </Stack>
  );
};
