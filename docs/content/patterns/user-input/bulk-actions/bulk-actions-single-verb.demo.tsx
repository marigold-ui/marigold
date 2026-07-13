import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Badge,
  Button,
  Table,
  ToastProvider,
  useToast,
} from '@marigold/components';
import { CircleCheck, CirclePause } from '@marigold/icons';

interface Event {
  id: string;
  name: string;
  date: string;
  status: 'On sale' | 'Paused' | 'Draft';
}

const initialEvents: Event[] = [
  { id: '1', name: 'Jazz Night', date: 'Aug 12, 2026', status: 'Draft' },
  { id: '2', name: 'Open Air Kino', date: 'Aug 15, 2026', status: 'Draft' },
  { id: '3', name: 'Poetry Slam', date: 'Aug 21, 2026', status: 'On sale' },
  { id: '4', name: 'Herbstmarkt', date: 'Sep 5, 2026', status: 'Draft' },
  { id: '5', name: 'Wine Tasting', date: 'Sep 12, 2026', status: 'On sale' },
];

const statusVariants = {
  'On sale': 'success',
  Paused: 'warning',
  Draft: 'info',
} as const;

export default () => {
  const [events, setEvents] = useState(initialEvents);
  const [selected, setSelected] = useState<Selection>(new Set());
  const { addToast } = useToast();

  const applyStatus = (status: Event['status']) => {
    const keys =
      selected === 'all' ? events.map(event => event.id) : [...selected];

    setEvents(current =>
      current.map(event =>
        keys.includes(event.id) ? { ...event, status } : event
      )
    );

    // Confirm the outcome and release the selection.
    const scope = keys.length === 1 ? '1 event' : `${keys.length} events`;
    addToast({
      title: `${scope} ${status === 'On sale' ? 'put on sale' : 'paused'}`,
      variant: 'success',
    });
    setSelected(new Set());
  };

  return (
    <>
      <ToastProvider position="bottom-right" />
      <Table
        aria-label="Events"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        actionBar={() => (
          <ActionBar>
            <Button onPress={() => applyStatus('On sale')}>
              <CircleCheck />
              Put on sale
            </Button>
            <Button onPress={() => applyStatus('Paused')}>
              <CirclePause />
              Pause sale
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
          {events.map(event => (
            <Table.Row key={event.id} id={event.id}>
              <Table.Cell>{event.name}</Table.Cell>
              <Table.Cell>{event.date}</Table.Cell>
              <Table.Cell>
                <Badge variant={statusVariants[event.status]}>
                  {event.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
