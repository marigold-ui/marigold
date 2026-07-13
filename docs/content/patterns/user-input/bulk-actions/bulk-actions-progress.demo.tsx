import { useState } from 'react';
import type { Selection } from '@marigold/components';
import {
  ActionBar,
  Button,
  Inline,
  ProgressCircle,
  Table,
  Text,
  useToast,
} from '@marigold/components';
import { Download, Send } from '@marigold/icons';

const events = [
  { id: '1', name: 'Jazz Night', tickets: 214 },
  { id: '2', name: 'Open Air Kino', tickets: 460 },
  { id: '3', name: 'Poetry Slam', tickets: 95 },
  { id: '4', name: 'Herbstmarkt', tickets: 310 },
  { id: '5', name: 'Wine Tasting', tickets: 58 },
  { id: '6', name: 'Klassik im Park', tickets: 127 },
];

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default () => {
  const [selected, setSelected] = useState<Selection>(
    new Set(events.map(event => event.id))
  );
  const [exporting, setExporting] = useState(false);
  const [sending, setSending] = useState<{ done: number; total: number }>();
  const { addToast } = useToast();

  const count = selected === 'all' ? events.length : selected.size;

  // A quick operation: the pressed button carries the feedback.
  const exportSelected = async () => {
    setExporting(true);
    await wait(1500);
    setExporting(false);
    addToast({
      title: count === 1 ? '1 event exported' : `${count} events exported`,
      variant: 'success',
    });
    setSelected(new Set());
  };

  // A longer, per-record operation: the bar reports the running count.
  const sendReminders = async () => {
    for (let done = 0; done < count; done++) {
      setSending({ done, total: count });
      await wait(600);
    }
    setSending(undefined);
    addToast({
      title: count === 1 ? '1 reminder sent' : `${count} reminders sent`,
      variant: 'success',
    });
    setSelected(new Set());
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
            {sending ? (
              <Inline space={2} alignY="center">
                <ProgressCircle />
                <Text aria-live="polite">
                  Sending {sending.done + 1} of {sending.total}…
                </Text>
              </Inline>
            ) : (
              <>
                <Button loading={exporting} onPress={exportSelected}>
                  <Download />
                  Export
                </Button>
                <Button disabled={exporting} onPress={sendReminders}>
                  <Send />
                  Send reminder
                </Button>
              </>
            )}
          </ActionBar>
        )}
      >
        <Table.Header>
          <Table.Column rowHeader>Event</Table.Column>
          <Table.Column>Tickets sold</Table.Column>
        </Table.Header>
        <Table.Body>
          {events.map(event => (
            <Table.Row key={event.id} id={event.id}>
              <Table.Cell>{event.name}</Table.Cell>
              <Table.Cell>{event.tickets}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
