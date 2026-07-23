import { useMemo, useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Badge,
  Button,
  Panel,
  SearchField,
  Table,
} from '@marigold/components';
import { Archive, Tag } from '@marigold/icons';

const events = [
  {
    id: 'summer-open-air',
    name: 'Summer Open Air',
    date: 'Jul 12, 2026',
    status: 'On sale',
  },
  {
    id: 'indie-night',
    name: 'Indie Night',
    date: 'Aug 03, 2026',
    status: 'On sale',
  },
  {
    id: 'jazz-matinee',
    name: 'Jazz Matinee',
    date: 'Aug 20, 2026',
    status: 'Draft',
  },
  {
    id: 'comedy-slam',
    name: 'Comedy Slam',
    date: 'Sep 05, 2026',
    status: 'On sale',
  },
  {
    id: 'classical-gala',
    name: 'Classical Gala',
    date: 'Sep 19, 2026',
    status: 'Draft',
  },
  {
    id: 'techno-marathon',
    name: 'Techno Marathon',
    date: 'Oct 02, 2026',
    status: 'On sale',
  },
  {
    id: 'folk-festival',
    name: 'Folk Festival',
    date: 'Oct 15, 2026',
    status: 'Draft',
  },
  {
    id: 'new-year-concert',
    name: 'New Year Concert',
    date: 'Dec 31, 2026',
    status: 'On sale',
  },
];

export default () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Selection>(() => new Set());

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return events;
    return events.filter(event => event.name.toLowerCase().includes(query));
  }, [search]);

  return (
    <Panel aria-label="Events">
      <Panel.Content>
        <SearchField
          aria-label="Search events"
          placeholder="Search events"
          value={search}
          onChange={setSearch}
          width={64}
        />
      </Panel.Content>
      <Panel.Content bleed>
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
          <Table.Body items={rows}>
            {event => (
              <Table.Row id={event.id}>
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
            )}
          </Table.Body>
        </Table>
      </Panel.Content>
    </Panel>
  );
};
