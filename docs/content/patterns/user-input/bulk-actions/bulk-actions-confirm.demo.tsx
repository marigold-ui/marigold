import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Button,
  Inline,
  Stack,
  Table,
  useConfirmation,
  useToast,
} from '@marigold/components';
import { RotateCcw, Trash2 } from '@marigold/icons';

interface Event {
  id: string;
  name: string;
  date: string;
  reservations: number;
}

const initialEvents: Event[] = [
  { id: '1', name: 'Jazz Night', date: 'Aug 12, 2026', reservations: 47 },
  { id: '2', name: 'Open Air Kino', date: 'Aug 15, 2026', reservations: 112 },
  { id: '3', name: 'Poetry Slam', date: 'Aug 21, 2026', reservations: 0 },
  { id: '4', name: 'Herbstmarkt', date: 'Sep 5, 2026', reservations: 23 },
  { id: '5', name: 'Wine Tasting', date: 'Sep 12, 2026', reservations: 65 },
];

export default () => {
  const [events, setEvents] = useState(initialEvents);
  const [selected, setSelected] = useState<Selection>(new Set());
  const confirm = useConfirmation();
  const { addToast } = useToast();

  const deleteSelected = async () => {
    const keys =
      selected === 'all' ? events.map(event => event.id) : [...selected];
    const affected = events.filter(event => keys.includes(event.id));
    const reservations = affected.reduce(
      (sum, event) => sum + event.reservations,
      0
    );
    const scope =
      affected.length === 1 ? '1 event' : `${affected.length} events`;

    // The dialog names the exact count and summarizes the impact,
    // and its confirm button repeats the action verb and count.
    const result = await confirm({
      variant: 'destructive',
      title: `Delete ${scope}?`,
      content: `This will cancel ${reservations} ticket reservations and notify the ticket buyers. This action cannot be undone.`,
      confirmationLabel: `Delete ${scope}`,
      cancelLabel: 'Cancel',
      // Focus the safe choice so Enter does not confirm by accident.
      autoFocusButton: 'cancel',
    });

    if (result === 'confirmed') {
      setEvents(current => current.filter(event => !keys.includes(event.id)));
      setSelected(new Set());
      addToast({
        title: `${scope} deleted`,
        variant: 'success',
      });
    }
  };

  return (
    <Stack space={2}>
      <Table
        aria-label="Events"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        actionBar={() => (
          <ActionBar>
            <Button onPress={deleteSelected}>
              <Trash2 />
              Delete
            </Button>
          </ActionBar>
        )}
      >
        <Table.Header>
          <Table.Column rowHeader>Event</Table.Column>
          <Table.Column>Date</Table.Column>
          <Table.Column>Reservations</Table.Column>
        </Table.Header>
        <Table.Body>
          {events.map(event => (
            <Table.Row key={event.id} id={event.id}>
              <Table.Cell>{event.name}</Table.Cell>
              <Table.Cell>{event.date}</Table.Cell>
              <Table.Cell>{event.reservations}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {events.length < initialEvents.length && (
        <Inline alignX="right">
          <Button
            variant="ghost"
            size="small"
            onPress={() => setEvents(initialEvents)}
          >
            <RotateCcw />
            Reset demo
          </Button>
        </Inline>
      )}
    </Stack>
  );
};
