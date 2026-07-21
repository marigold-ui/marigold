'use client';

import type { Venue } from '@/lib/data/venues';
import type { VenueQueryResult } from '@/lib/data/venues-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConfirmation, useToast } from '@marigold/components';
import { venueKeys } from './queryKeys';
import { useDeletedVenues } from './useDeletedVenues';
import { type DeleteVenueError, deleteVenue } from './venuesApi';

// Encapsulates the entire destructive flow: confirmation → optimistic removal
// → server round-trip → toast feedback → cache invalidation. The UI calls
// `deleteVenue(venue)` and stays presentational.
//
// NOTE: In a real application, deletion is owned by the server — the row is
// removed from a database and gone for every user. This docs demo has no
// database, so the server only *authorizes* the deletion (see app/api/venues)
// and the client commits it to its own per-visitor exclude set via
// `remove(id)`. That is okay here because the dataset is a fixed, read-only
// fixture: a stateless server stays correct across serverless instances, each
// visitor gets an isolated sandbox, and the demo resets on reload. The
// react-query lifecycle below is identical to a database-backed app.
export const useDeleteVenue = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const confirm = useConfirmation();
  const { remove } = useDeletedVenues();

  const mutation = useMutation<
    void,
    DeleteVenueError,
    Venue,
    { previous: [readonly unknown[], unknown][] }
  >({
    mutationFn: (venue: Venue) => deleteVenue(venue.id),

    // Optimistically drop the row from every cached venues list before the
    // server responds, snapshotting first so we can roll back on error.
    onMutate: async (venue: Venue) => {
      await queryClient.cancelQueries({ queryKey: venueKeys.lists() });
      const previous = queryClient.getQueriesData({
        queryKey: venueKeys.lists(),
      });

      queryClient.setQueriesData<VenueQueryResult>(
        { queryKey: venueKeys.lists() },
        old => {
          if (!old || !old.items.some(item => item.id === venue.id)) {
            return old;
          }
          return {
            ...old,
            items: old.items.filter(item => item.id !== venue.id),
            totalItems: Math.max(0, old.totalItems - 1),
          };
        }
      );

      return { previous };
    },

    onError: (error, venue, context) => {
      // Roll back every snapshot we took.
      context?.previous.forEach(([key, data]) =>
        queryClient.setQueryData(key, data)
      );
      addToast({
        title: 'Could not delete venue',
        description:
          error.status === 409
            ? error.message
            : `“${venue.name}” could not be deleted. Please try again.`,
        variant: 'error',
      });
    },

    onSuccess: (_data, venue) => {
      // Commit the deletion to the client-owned exclude set so it sticks
      // across refetches (the server is stateless).
      remove(venue.id);
      // `success` auto-dismisses by default; the error toast above stays until
      // dismissed (the `error` default) so the recovery hint can be read.
      addToast({
        title: 'Venue deleted',
        description: `“${venue.name}” was removed.`,
        variant: 'success',
      });
    },

    // Re-sync with the server regardless of outcome.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: venueKeys.lists() });
    },
  });

  const deleteWithConfirmation = async (venue: Venue) => {
    const result = await confirm({
      variant: 'destructive',
      title: 'Delete venue?',
      content: `This will remove “${venue.name}”. This action cannot be undone.`,
      confirmationLabel: 'Delete',
      cancelLabel: 'Cancel',
    });

    if (result === 'confirmed') {
      mutation.mutate(venue);
    }
  };

  return {
    deleteVenue: deleteWithConfirmation,
    isDeleting: mutation.isPending,
  } as const;
};
