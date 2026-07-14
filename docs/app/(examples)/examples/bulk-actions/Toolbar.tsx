'use client';

import { type EventStatus, eventStatuses } from '@/lib/data/events';
import { Button, Inline, SearchField, Select } from '@marigold/components';
import { FetchingIndicator } from './FetchingIndicator';
import { useSearch } from './hooks/useSearch';
import { useSelection } from './hooks/useSelection';
import { useSession } from './hooks/useSession';
import { useStatusFilter } from './hooks/useStatusFilter';

export const Toolbar = () => {
  const [search, setSearch] = useSearch();
  const [status, setStatus] = useStatusFilter();

  return (
    <Inline space="related" alignX="between" alignY="center">
      <Inline alignY="input" space="related">
        <SearchField
          aria-label="Search events"
          description="Search by name or venue"
          width={64}
          autoComplete="off"
          defaultValue={search}
          onSubmit={setSearch}
          onClear={() => setSearch('')}
        />
        <Select
          aria-label="Filter by status"
          width={36}
          value={status ?? 'all'}
          onChange={key =>
            setStatus(key === 'all' ? null : (key as EventStatus))
          }
        >
          <Select.Option id="all">All statuses</Select.Option>
          {eventStatuses.map(candidate => (
            <Select.Option key={candidate} id={candidate}>
              {candidate}
            </Select.Option>
          ))}
        </Select>
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
