import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Badge,
  Button,
  Table,
  Text,
  useToast,
} from '@marigold/components';
import { CircleCheck } from '@marigold/icons';

interface Event {
  id: string;
  name: string;
  status: 'Draft' | 'On sale';
  /** Events without a description cannot be published. */
  hasDescription: boolean;
}

const initialEvents: Event[] = [
  { id: '1', name: 'Jazz Night', status: 'Draft', hasDescription: true },
  { id: '2', name: 'Open Air Kino', status: 'Draft', hasDescription: false },
  { id: '3', name: 'Poetry Slam', status: 'Draft', hasDescription: true },
  { id: '4', name: 'Herbstmarkt', status: 'Draft', hasDescription: false },
  { id: '5', name: 'Wine Tasting', status: 'Draft', hasDescription: true },
];

export default () => {
  const [events, setEvents] = useState(initialEvents);
  const [selected, setSelected] = useState<Selection>(
    new Set(initialEvents.map(event => event.id))
  );
  const { addToast } = useToast();

  const publishSelected = () => {
    const keys =
      selected === 'all'
        ? events.map(event => event.id)
        : [...selected].map(String);
    const affected = events.filter(event => keys.includes(event.id));

    const succeeded = affected.filter(event => event.hasDescription);
    const failed = affected.filter(event => !event.hasDescription);

    setEvents(current =>
      current.map(event =>
        succeeded.some(published => published.id === event.id)
          ? { ...event, status: 'On sale' }
          : event
      )
    );

    if (failed.length === 0) {
      addToast({
        title:
          succeeded.length === 1
            ? '1 event published'
            : `${succeeded.length} events published`,
        variant: 'success',
      });
      setSelected(new Set());
      return;
    }

    // Summarize the outcome and keep only the failed records
    // selected, so the user can fix the cause and retry.
    addToast({
      title: `${succeeded.length} of ${affected.length} events published`,
      description: `${failed.length} failed: missing description. ${failed.length === 1 ? 'It remains' : 'They remain'} selected for retry.`,
      variant: 'warning',
    });
    setSelected(new Set(failed.map(event => event.id)));
  };

  return (
    <>
      <Table
        aria-label="Events"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        actionBar={() => (
          <ActionBar>
            <Button onPress={publishSelected}>
              <CircleCheck />
              Publish
            </Button>
          </ActionBar>
        )}
      >
        <Table.Header>
          <Table.Column rowHeader>Event</Table.Column>
          <Table.Column>Description</Table.Column>
          <Table.Column>Status</Table.Column>
        </Table.Header>
        <Table.Body>
          {events.map(event => (
            <Table.Row key={event.id} id={event.id}>
              <Table.Cell>{event.name}</Table.Cell>
              <Table.Cell>
                {event.hasDescription ? (
                  'Complete'
                ) : (
                  <Text color="secondary">Missing</Text>
                )}
              </Table.Cell>
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
    </>
  );
};
