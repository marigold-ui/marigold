'use client';

import type { Event } from '@/lib/data/events';
import type { EventOverride } from '@/lib/data/events-query';
import { useConfirmation, useToast } from '@marigold/components';
import { bulkEvents } from './eventsApi';
import { useSession } from './useSession';

// Single-record actions for the per-row menu — the one-off counterpart to
// useBulkActions. Both talk to the same authorizer endpoint; the reporting
// differs. A row action names the event instead of counting a selection, and
// a failure simply explains itself: there is no selection to keep around as
// a retry list. See the Table Records pattern for the per-row side of this
// split.

export const useRowActions = () => {
  const { addToast } = useToast();
  const confirm = useConfirmation();
  const { session, applyOverride, markDeleted } = useSession();

  // Publish and archive are the same operation with a different verb: ask
  // the authorizer, commit the status change, report by name. Publish can
  // be refused (no venue assigned), which for a single event is a plain
  // error toast with the server's reason.
  const setStatus = async (
    event: Event,
    action: 'publish' | 'archive',
    verb: string,
    override: EventOverride
  ) => {
    try {
      const result = await bulkEvents({ action, ids: [event.id], session });
      if (result.failed.length > 0) {
        addToast({
          title: `Could not ${action} “${event.name}”`,
          description: `${result.failed[0].reason}.`,
          variant: 'error',
        });
        return;
      }
      applyOverride(result.succeeded, override);
      addToast({ title: `“${event.name}” ${verb}`, variant: 'success' });
    } catch {
      addToast({
        title: `Could not ${action} “${event.name}”`,
        description: 'Please try again.',
        variant: 'error',
      });
    }
  };

  const publish = (event: Event) =>
    setStatus(event, 'publish', 'published', { status: 'On sale' });

  const archive = (event: Event) =>
    setStatus(event, 'archive', 'archived', { status: 'Archived' });

  const remind = async (event: Event) => {
    try {
      await bulkEvents({ action: 'remind', ids: [event.id], session });
      addToast({
        title: `Reminder sent for “${event.name}”`,
        variant: 'success',
      });
    } catch {
      addToast({
        title: 'Could not send the reminder',
        description: 'Please try again.',
        variant: 'error',
      });
    }
  };

  // Same confirmation rules as the bulk delete — exact impact, verb in the
  // confirm button, Cancel focused — scaled down to one named record.
  const deleteEvent = async (event: Event) => {
    const impact =
      event.reservations > 0
        ? `This will cancel ${event.reservations} ticket reservation${
            event.reservations === 1 ? '' : 's'
          } and notify the ticket buyers. `
        : '';

    const result = await confirm({
      variant: 'destructive',
      title: `Delete “${event.name}”?`,
      content: `${impact}This action cannot be undone.`,
      confirmationLabel: 'Delete event',
      cancelLabel: 'Cancel',
      autoFocusButton: 'cancel',
    });

    if (result !== 'confirmed') return;

    try {
      const outcome = await bulkEvents({
        action: 'delete',
        ids: [event.id],
        session,
      });
      markDeleted(outcome.succeeded);
      addToast({ title: `“${event.name}” deleted`, variant: 'success' });
    } catch {
      addToast({
        title: `Could not delete “${event.name}”`,
        description: 'Please try again.',
        variant: 'error',
      });
    }
  };

  return { publish, archive, remind, deleteEvent } as const;
};
