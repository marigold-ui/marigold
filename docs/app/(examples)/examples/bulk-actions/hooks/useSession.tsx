'use client';

import type { EventOverride, EventsSession } from '@/lib/data/events-query';
import {
  type PropsWithChildren,
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
} from 'react';

// Client-owned mutation state.
//
// The server is stateless (see app/api/events), so every change a bulk action
// makes this session — status transitions, bulk edits, deletions — lives
// here, in React state. The whole payload is sent with every list query and
// bulk request, and is part of the query key, so filters and refetches always
// see the same world the visitor does. Because it is plain component state it
// resets on reload, and `reset()` clears it on demand — an isolated,
// resettable sandbox per visitor, no persistence needed. In a real
// application the database owns all of this and the session layer disappears.

interface SessionContextValue {
  session: EventsSession;
  hasChanges: boolean;
  /** Merges a bulk action's outcome into the per-event overrides. */
  applyOverride: (ids: string[], override: EventOverride) => void;
  markDeleted: (ids: string[]) => void;
  reset: () => void;
}

const emptySession: EventsSession = { overrides: {}, deleted: [] };

const SessionContext = createContext<SessionContextValue | null>(null);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<EventsSession>(emptySession);

  const applyOverride = useCallback(
    (ids: string[], override: EventOverride) =>
      setSession(prev => {
        const overrides = { ...prev.overrides };
        for (const id of ids) {
          overrides[id] = { ...overrides[id], ...override };
        }
        return { ...prev, overrides };
      }),
    []
  );

  const markDeleted = useCallback(
    (ids: string[]) =>
      setSession(prev => ({
        ...prev,
        deleted: [...new Set([...prev.deleted, ...ids])],
      })),
    []
  );

  const reset = useCallback(() => setSession(emptySession), []);

  const hasChanges =
    session.deleted.length > 0 || Object.keys(session.overrides).length > 0;

  const value = useMemo(
    () => ({ session, hasChanges, applyOverride, markDeleted, reset }),
    [session, hasChanges, applyOverride, markDeleted, reset]
  );

  return <SessionContext value={value}>{children}</SessionContext>;
};

export const useSession = () => {
  const context = use(SessionContext);
  if (context === null) {
    throw new Error('useSession must be used within a <SessionProvider>');
  }
  return context;
};
