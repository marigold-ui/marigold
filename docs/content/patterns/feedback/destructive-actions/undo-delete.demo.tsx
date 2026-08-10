import { useState } from 'react';
import {
  Button,
  EmptyState,
  Inline,
  Stack,
  Table,
  ToastProvider,
  useToast,
} from '@marigold/components';
import { RotateCcw, Trash2 } from '@marigold/icons';

interface MailingList {
  id: string;
  name: string;
  recipients: number;
}

const initialLists: MailingList[] = [
  { id: '1', name: 'Newsletter August', recipients: 1240 },
  { id: '2', name: 'Jazz Night Reminder', recipients: 312 },
  { id: '3', name: 'Season Preview', recipients: 878 },
];

const Lists = () => {
  // `pending` rows are hidden but not deleted yet, so undo restores in place.
  const [lists, setLists] = useState(initialLists);
  const [pending, setPending] = useState<string[]>([]);
  const { addUndoToast } = useToast();

  const visible = lists.filter(list => !pending.includes(list.id));

  const commit = (id: string) => {
    setLists(current => current.filter(list => list.id !== id));
    setPending(current => current.filter(pendingId => pendingId !== id));
  };

  const restore = (id: string) =>
    setPending(current => current.filter(pendingId => pendingId !== id));

  const deleteList = (list: MailingList) => {
    setPending(current => [...current, list.id]);

    // [!code highlight:5]
    addUndoToast({
      title: `“${list.name}” deleted`,
      onUndo: () => restore(list.id),
      onCommit: () => commit(list.id),
    });
  };

  return (
    <Stack space={2}>
      <Table aria-label="Mailing lists" size="compact">
        <Table.Header>
          <Table.Column id="name" rowHeader>
            Mailing list
          </Table.Column>
          <Table.Column id="recipients">Recipients</Table.Column>
          <Table.Column id="actions" alignX="right">
            Actions
          </Table.Column>
        </Table.Header>
        <Table.Body
          emptyState={() => (
            <EmptyState
              title="No mailing lists"
              description="Every list has been deleted. The last deletion committed when its toast closed."
            />
          )}
        >
          {visible.map(list => (
            <Table.Row id={list.id} key={list.id}>
              <Table.Cell>{list.name}</Table.Cell>
              <Table.Cell>{list.recipients}</Table.Cell>
              <Table.Cell>
                <Button
                  variant="destructive-ghost"
                  size="small"
                  aria-label={`Delete ${list.name}`}
                  onPress={() => deleteList(list)}
                >
                  <Trash2 size={16} />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {lists.length < initialLists.length && (
        <Inline alignX="right">
          <Button
            variant="ghost"
            size="small"
            onPress={() => {
              setLists(initialLists);
              setPending([]);
            }}
          >
            <RotateCcw size={16} />
            Reset demo
          </Button>
        </Inline>
      )}
    </Stack>
  );
};

export default () => (
  <>
    <ToastProvider position="bottom-right" />
    <Lists />
  </>
);
