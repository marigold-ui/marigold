import { useRef, useState } from 'react';
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
  // `lists` is committed data, `pending` holds rows that are hidden but not
  // deleted yet. They share one state value because `commit` has to read the
  // current `pending` to decide whether to delete, and an updater cannot call
  // another setter.
  const [state, setState] = useState({
    lists: initialLists,
    pending: [] as string[],
  });
  const toastKeysRef = useRef<Record<string, string>>({});
  const { addToast, removeToast } = useToast();

  const visible = state.lists.filter(list => !state.pending.includes(list.id));

  const undo = (id: string) => {
    setState(current => ({
      ...current,
      pending: current.pending.filter(pendingId => pendingId !== id),
    }));
    removeToast(toastKeysRef.current[id]);
  };

  // Still pending means the user let the window run out, so the deletion stands.
  // No longer pending means undo already put the row back, so this does nothing.
  const commit = (id: string) =>
    setState(current =>
      current.pending.includes(id)
        ? {
            lists: current.lists.filter(list => list.id !== id),
            pending: current.pending.filter(pendingId => pendingId !== id),
          }
        : current
    );

  const resetDemo = () => setState({ lists: initialLists, pending: [] });

  const deleteList = (list: MailingList) => {
    setState(current => ({
      ...current,
      pending: [...current.pending, list.id],
    }));

    // The commit rides the toast's own `onClose`, never a separate timer.
    // [!code highlight:15]
    toastKeysRef.current[list.id] = addToast({
      title: `“${list.name}” deleted`,
      // Toasts stack, so name the list: bare "Undo" buttons are ambiguous.
      action: (
        <Button
          size="small"
          variant="ghost"
          aria-label={`Undo deleting ${list.name}`}
          onPress={() => undo(list.id)}
        >
          Undo
        </Button>
      ),
      onClose: () => commit(list.id),
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
      {state.lists.length < initialLists.length && (
        <Inline alignX="right">
          <Button variant="ghost" size="small" onPress={resetDemo}>
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
