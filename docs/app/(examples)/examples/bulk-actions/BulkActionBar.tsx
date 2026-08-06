'use client';

import {
  ActionBar,
  ActionMenu,
  Button,
  Divider,
  Inline,
  ProgressCircle,
  Text,
} from '@marigold/components';
import { CircleCheck, Download, Trash2 } from '@marigold/icons';
import { BulkEditDrawer } from './BulkEditDrawer';
import { useBulkActions } from './hooks/useBulkActions';
import { useEvents } from './hooks/useEvents';
import { useSelection } from './hooks/useSelection';

// The floating toolbar for the current selection. Actions are ordered from
// safe to consequential: the routine verbs first, the long tail in the
// overflow menu, and Delete last, visually separated. While a longer
// operation runs, a running count replaces the actions in place.
export const BulkActionBar = () => {
  const { items } = useEvents();
  const { selected } = useSelection();
  const actions = useBulkActions();

  // Resolve the selection to concrete records once — every count, message,
  // and operation derives from this list. The selection is page-bounded, so
  // 'all' means exactly the rows on this page.
  const affected =
    selected === 'all' ? items : items.filter(event => selected.has(event.id));

  return (
    <ActionBar>
      {actions.sending ? (
        <Inline space={2} alignY="center">
          <ProgressCircle />
          <Text aria-live="polite">
            Sending {actions.sending.done + 1} of {actions.sending.total}…
          </Text>
        </Inline>
      ) : (
        <>
          <Button
            disabled={actions.busy}
            onPress={() => actions.publish(affected)}
          >
            <CircleCheck />
            Publish
          </Button>
          <BulkEditDrawer affected={affected} disabled={actions.busy} />
          <Button
            loading={actions.exporting}
            disabled={actions.busy && !actions.exporting}
            onPress={() => actions.exportSelected(affected)}
          >
            <Download />
            Export
          </Button>
          <ActionMenu
            aria-label="More actions"
            disabled={actions.busy}
            onAction={key => {
              if (key === 'archive') actions.archive(affected);
              if (key === 'remind') actions.sendReminders(affected);
            }}
          >
            <ActionMenu.Item id="archive">Archive</ActionMenu.Item>
            <ActionMenu.Item id="remind">Send reminders</ActionMenu.Item>
          </ActionMenu>
          <Divider orientation="vertical" />
          <Button
            disabled={actions.busy}
            onPress={() => actions.deleteEvents(affected)}
          >
            <Trash2 />
            Delete
          </Button>
        </>
      )}
    </ActionBar>
  );
};
