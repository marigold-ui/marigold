'use client';

import {
  type PropsWithChildren,
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
} from 'react';

// Client-owned deletion state.
//
// The server is stateless (see app/api/venues), so the set of "removed" venue
// ids lives here, in React state. It is passed to the list query as `exclude`
// and is part of the query key, so background refetches never resurrect a
// deleted row. Because it is plain component state it resets on reload, and
// `reset()` clears it on demand — giving every visitor an isolated, resettable
// sandbox without any persistence.

interface DeletedVenues {
  excludedIds: string[];
  remove: (id: string) => void;
  reset: () => void;
}

const DeletedVenuesContext = createContext<DeletedVenues | null>(null);

export const DeletedVenuesProvider = ({ children }: PropsWithChildren) => {
  const [excludedIds, setExcludedIds] = useState<string[]>([]);

  const remove = useCallback(
    (id: string) =>
      setExcludedIds(prev => (prev.includes(id) ? prev : [...prev, id])),
    []
  );

  const reset = useCallback(() => setExcludedIds([]), []);

  const value = useMemo(
    () => ({ excludedIds, remove, reset }),
    [excludedIds, remove, reset]
  );

  return <DeletedVenuesContext value={value}>{children}</DeletedVenuesContext>;
};

export const useDeletedVenues = () => {
  const context = use(DeletedVenuesContext);
  if (context === null) {
    throw new Error(
      'useDeletedVenues must be used within a <DeletedVenuesProvider>'
    );
  }
  return context;
};
