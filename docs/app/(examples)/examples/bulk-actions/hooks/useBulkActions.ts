'use client';

import type { Event } from '@/lib/data/events';
import type { BulkResult, EventChanges } from '@/lib/data/events-query';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useConfirmation, useToast } from '@marigold/components';
import { exportEventsToCsv } from '../csv';
import { bulkEvents } from './eventsApi';
import { useSelection } from './useSelection';
import { useSession } from './useSession';

// Encapsulates every bulk operation: server round-trip → session commit →
// toast → selection handling. Components call `publish(affected)` and stay
// presentational.
//
// Selection handling follows the bulk-actions pattern: a fully successful
// operation clears the selection (the job is done), a partial failure
// re-selects exactly the failed records — the selection becomes the retry
// list. No manual cache invalidation is needed anywhere: committing to the
// session changes the list query's key (see useEvents), which refetches on
// its own.

const scope = (count: number) => (count === 1 ? '1 event' : `${count} events`);

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useBulkActions = () => {
  const { addToast } = useToast();
  const confirm = useConfirmation();
  const { session, applyOverride, markDeleted } = useSession();
  const { setSelected, clearSelection } = useSelection();

  const [exporting, setExporting] = useState(false);
  const [sending, setSending] = useState<{ done: number; total: number }>();

  const onError = (title: string) => () =>
    addToast({ title, description: 'Please try again.', variant: 'error' });

  // Report a finished bulk action the way the pattern prescribes. On full
  // success, toast the count and clear the selection. On partial failure,
  // keep exactly the failed records selected as the retry list and name the
  // reason the server returned. Every action funnels through here, so the
  // partial-failure behavior stays identical no matter which one triggered it
  // (only `publish` can actually fail in this demo).
  const report = (verb: string, total: number, result: BulkResult) => {
    if (result.failed.length === 0) {
      addToast({
        title: `${scope(result.succeeded.length)} ${verb}`,
        variant: 'success',
      });
      clearSelection();
      return;
    }

    const reason = result.failed[0].reason.toLowerCase();
    addToast({
      title: `${result.succeeded.length} of ${total} events ${verb}`,
      description: `${result.failed.length} failed: ${reason}. ${
        result.failed.length === 1 ? 'It remains' : 'They remain'
      } selected for retry.`,
      variant: 'warning',
    });
    setSelected(new Set(result.failed.map(failure => failure.id)));
  };

  // Publish is the direct action with the deterministic failure path: the
  // server rejects events without a venue, per record.
  const publishMutation = useMutation<BulkResult, Error, Event[]>({
    mutationFn: events =>
      bulkEvents({ action: 'publish', ids: events.map(e => e.id), session }),
    onSuccess: (result, events) => {
      applyOverride(result.succeeded, { status: 'On sale' });
      report('published', events.length, result);
    },
    onError: onError('Could not publish events'),
  });

  const archiveMutation = useMutation<BulkResult, Error, Event[]>({
    mutationFn: events =>
      bulkEvents({ action: 'archive', ids: events.map(e => e.id), session }),
    onSuccess: (result, events) => {
      applyOverride(result.succeeded, { status: 'Archived' });
      report('archived', events.length, result);
    },
    onError: onError('Could not archive events'),
  });

  const updateMutation = useMutation<
    BulkResult,
    Error,
    { events: Event[]; changes: EventChanges }
  >({
    mutationFn: ({ events, changes }) =>
      bulkEvents({
        action: 'update',
        ids: events.map(e => e.id),
        changes,
        session,
      }),
    onSuccess: (result, { events, changes }) => {
      applyOverride(result.succeeded, changes);
      report('updated', events.length, result);
    },
    onError: onError('Could not update events'),
  });

  const deleteMutation = useMutation<BulkResult, Error, Event[]>({
    mutationFn: events =>
      bulkEvents({ action: 'delete', ids: events.map(e => e.id), session }),
    onSuccess: (result, events) => {
      markDeleted(result.succeeded);
      report('deleted', events.length, result);
    },
    onError: onError('Could not delete events'),
  });

  // The dialog restates the exact count and impact, repeats the verb in the
  // confirm button, and focuses Cancel so a reflexive Enter takes the safe
  // path.
  const deleteWithConfirmation = async (events: Event[]) => {
    const reservations = events.reduce(
      (sum, event) => sum + event.reservations,
      0
    );
    const impact =
      reservations > 0
        ? `This will cancel ${reservations} ticket reservations and notify the ticket buyers. `
        : '';

    const result = await confirm({
      variant: 'destructive',
      title: `Delete ${scope(events.length)}?`,
      content: `${impact}This action cannot be undone.`,
      confirmationLabel: `Delete ${scope(events.length)}`,
      cancelLabel: 'Cancel',
      autoFocusButton: 'cancel',
    });

    if (result === 'confirmed') {
      deleteMutation.mutate(events);
    }
  };

  // Quick operation (under ~2s): feedback rides on the pressed button via its
  // `loading` prop. The wait stands in for the file-generation round-trip a
  // real export would make.
  const exportSelected = async (events: Event[]) => {
    setExporting(true);
    await wait(800);
    exportEventsToCsv(events);
    setExporting(false);
    addToast({ title: `${scope(events.length)} exported`, variant: 'success' });
    clearSelection();
  };

  // Longer, per-record operation (2–10s): one request per record so the bar
  // can report a running count while the operation moves through the
  // selection.
  const sendReminders = async (events: Event[]) => {
    const total = events.length;
    try {
      for (const [index, event] of events.entries()) {
        setSending({ done: index, total });
        await bulkEvents(
          { action: 'remind', ids: [event.id], session },
          { delay: 350 }
        );
      }
      addToast({
        title: total === 1 ? '1 reminder sent' : `${total} reminders sent`,
        variant: 'success',
      });
      clearSelection();
    } catch {
      addToast({
        title: 'Could not send reminders',
        description: 'Please try again.',
        variant: 'error',
      });
    } finally {
      setSending(undefined);
    }
  };

  // One operation at a time: the bar disables its other actions while any of
  // these runs, so two operations cannot race on the same selection.
  const busy =
    publishMutation.isPending ||
    archiveMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    exporting ||
    sending !== undefined;

  return {
    publish: (events: Event[]) => publishMutation.mutate(events),
    archive: (events: Event[]) => archiveMutation.mutate(events),
    applyEdit: (events: Event[], changes: EventChanges) =>
      updateMutation.mutate({ events, changes }),
    deleteEvents: deleteWithConfirmation,
    exportSelected,
    sendReminders,
    exporting,
    sending,
    busy,
  } as const;
};
