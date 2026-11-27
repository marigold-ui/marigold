'use client';

import type { EventStatus } from '@/lib/data/events';
import { useState } from 'react';
import {
  Button,
  Inline,
  SearchField,
  SegmentedControl,
} from '@marigold/components';
import { FetchingIndicator } from './FetchingIndicator';
import { useSearch, useStatusFilter } from './hooks/useEventsParams';
import { useSelection } from './hooks/useSelection';
import { useSession } from './hooks/useSession';

// Live events first, then work in progress, then what is over.
const scopes: EventStatus[] = ['On sale', 'Draft', 'Archived'];

export const Toolbar = () => {
  const [search, setSearch] = useSearch();
  const [status, setStatus] = useStatusFilter();

  // The field is controlled so it reflects external resets — the empty state's
  // "Clear all filters" changes the URL, not this input. Search still applies
  // on submit (not per keystroke), so `text` stays local until the user
  // commits it. Syncing during render, rather than re-keying, keeps the cursor
  // in place on submit instead of remounting the field.
  const [text, setText] = useState(search);
  const [committed, setCommitted] = useState(search);
  if (search !== committed) {
    setCommitted(search);
    setText(search);
  }

  return (
    <Inline space="related" alignX="between" alignY="center">
      <Inline alignY="center" space="related">
        {/* The status is a scope switch, not one more filter: it decides
            which set of events the list shows, so it comes first (Filter
            pattern, "Quick filters"). */}
        <SegmentedControl
          aria-label="Show events"
          width="fit"
          value={status ?? 'all'}
          onChange={key =>
            setStatus(key === 'all' ? null : (key as EventStatus))
          }
        >
          <SegmentedControl.Option value="all">All</SegmentedControl.Option>
          {scopes.map(candidate => (
            <SegmentedControl.Option key={candidate} value={candidate}>
              {candidate}
            </SegmentedControl.Option>
          ))}
        </SegmentedControl>
        <SearchField
          aria-label="Search events"
          placeholder="Search events or venues"
          width={64}
          autoComplete="off"
          value={text}
          onChange={setText}
          onSubmit={setSearch}
          onClear={() => setSearch('')}
        />
      </Inline>
      <Inline alignY="center" space="related">
        <FetchingIndicator />
        <ResetDemo />
      </Inline>
    </Inline>
  );
};

// Restores everything changed this session. All changes live in client state
// (see useSession), so resetting it changes the list query's key and the
// original fixture comes back — no server round-trip needed. The restored
// rows change the visible set, so the selection resets with them.
const ResetDemo = () => {
  const { hasChanges, reset } = useSession();
  const { clearSelection } = useSelection();

  if (!hasChanges) return null;

  return (
    <Button
      variant="ghost"
      size="small"
      onPress={() => {
        clearSelection();
        reset();
      }}
    >
      Reset demo
    </Button>
  );
};
