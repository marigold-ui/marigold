'use client';

import { useIsFetching } from '@tanstack/react-query';
import { Inline, ProgressCircle, Text } from '@marigold/components';

// Subtle, non-blocking indicator for background activity.
//
// `useIsFetching()` counts queries currently fetching across the whole app. We
// use it for background refetches (search/filter/page changes and session
// commits keep the previous data on screen via `placeholderData`) — distinct
// from `isLoading`, which is the blocking initial fetch handled by the table
// skeleton.
export const FetchingIndicator = () => {
  const fetching = useIsFetching();
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
