'use client';

import type { Organizer } from '@/lib/data/organizers';
import { organizerById, organizers } from '@/lib/data/organizers';
import type { PropsWithChildren } from 'react';
import { createContext, use, useCallback, useMemo, useState } from 'react';

// Workspace
// ---------------
// What a real app would keep on the server for the signed-in person: the
// organizer they work in, the organizers they switched to last, and the
// venues they opened last. The command palette offers the recent ones before
// people type. Here it lives in the shell, so it survives page changes.
const RECENT_LIMIT = 3;

interface WorkspaceValue {
  organizer: Organizer;
  /** Organizers switched to before, newest first, without the current one. */
  recentOrganizers: Organizer[];
  switchOrganizer: (id: string) => void;
  /** Ids of the venues opened last, newest first. */
  recentVenueIds: string[];
  visitVenue: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export const useWorkspace = (): WorkspaceValue => {
  const ctx = use(WorkspaceContext);
  if (!ctx) {
    throw new Error('useWorkspace must be used within a <WorkspaceProvider>.');
  }
  return ctx;
};

// Newest first, each id once, at most `RECENT_LIMIT`. A list that already
// starts with the id stays the same list, so nothing re-renders.
const pushRecent = (list: string[], id: string) =>
  list[0] === id
    ? list
    : [id, ...list.filter(item => item !== id)].slice(0, RECENT_LIMIT);

export const WorkspaceProvider = ({ children }: PropsWithChildren) => {
  const [organizerId, setOrganizerId] = useState(organizers[0].id);
  const [recentOrganizerIds, setRecentOrganizerIds] = useState([
    'bluebird',
    'northwind',
    'starlight',
  ]);
  const [recentVenueIds, setRecentVenueIds] = useState(['2', '5']);

  const switchOrganizer = useCallback(
    (id: string) => {
      if (id === organizerId) return;
      // The organizer people leave becomes the most recent one.
      // The one people switch to is current now, so it leaves the list.
      setRecentOrganizerIds(current =>
        pushRecent(
          current.filter(item => item !== id),
          organizerId
        )
      );
      setOrganizerId(id);
    },
    [organizerId]
  );

  const visitVenue = useCallback((id: string) => {
    setRecentVenueIds(current => pushRecent(current, id));
  }, []);

  const value = useMemo(
    () => ({
      organizer: organizerById(organizerId) ?? organizers[0],
      recentOrganizers: recentOrganizerIds.flatMap(
        id => organizerById(id) ?? []
      ),
      switchOrganizer,
      recentVenueIds,
      visitVenue,
    }),
    [
      organizerId,
      recentOrganizerIds,
      switchOrganizer,
      recentVenueIds,
      visitVenue,
    ]
  );

  return <WorkspaceContext value={value}>{children}</WorkspaceContext>;
};
