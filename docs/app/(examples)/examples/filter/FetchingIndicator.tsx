'use client';

import { useIsFetching } from '@tanstack/react-query';
import { Inline, ProgressCircle, Text } from '@marigold/components';
import { venueKeys } from './hooks/queryKeys';

// Subtle, non-blocking indicator for background activity.
//
// Scoped to list queries: background refetches (filter/sort/page changes keep
// the previous data on screen via `placeholderData`) — distinct from
// `isLoading`, which is the blocking initial fetch handled by the table
// skeleton. The drawer's result-count queries deliberately don't show here.
export const FetchingIndicator = () => {
  const fetching = useIsFetching({ queryKey: venueKeys.lists() });
  if (!fetching) return null;

  return (
    <Inline space={1} alignY="center" aria-hidden>
      <ProgressCircle size="16" isIndeterminate aria-label="Updating" />
      <Text fontSize="sm" variant="muted">
        Updating…
      </Text>
    </Inline>
  );
};
