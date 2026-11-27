// Each file in this example carries its own 'use client' so individual
// components can be copy-pasted into a project without tracing back to
// where the client boundary starts. Once page.tsx is a client component,
// Next.js inherits client status down the tree, so the directive on the
// children is intentional documentation, not a requirement.
'use client';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Button,
  Description,
  ErrorState,
  LinkButton,
  Page,
  Panel,
  Title,
} from '@marigold/components';
import { CalendarPlus } from '@marigold/icons';
import { EventsPagination } from './EventsPagination';
import { EventsTable } from './EventsTable';
import { Toolbar } from './Toolbar';
import { BulkActionsProvider } from './hooks/useBulkActions';
import { SelectionProvider } from './hooks/useSelection';
import { SessionProvider } from './hooks/useSession';

// Isolates the data region in an error boundary. `throwOnError` on the list
// query (useEvents) routes any fetch failure here instead of blanking the
// page; wiring `onReset` to react-query's reset lets "Try again" clear the
// boundary and refetch.
const EventsData = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <Panel.Content>
          <ErrorState
            title="Events could not be loaded"
            description="Check your connection and try again."
            action={<Button onPress={resetErrorBoundary}>Try again</Button>}
          />
        </Panel.Content>
      )}
    >
      <Panel.Content bleed>
        <EventsTable />
      </Panel.Content>
      <Panel.Content>
        <EventsPagination />
      </Panel.Content>
    </ErrorBoundary>
  );
};

const BulkActionsPage = () => (
  <SessionProvider>
    <SelectionProvider>
      {/* One bulk-actions instance for the whole page (see useBulkActions):
          the bar and the edit drawer share its `busy` state. It sits inside
          the session and selection providers because it reads both. */}
      <BulkActionsProvider>
        <Page>
          <Page.Header>
            <Title>Events</Title>
            <Description>
              Publish drafts, change prices and archive events that are over.
            </Description>
            <LinkButton variant="primary" href="/examples/event-form">
              <CalendarPlus />
              Create event
            </LinkButton>
          </Page.Header>
          <Panel aria-label="Events">
            <Panel.Content>
              <Toolbar />
            </Panel.Content>
            <EventsData />
          </Panel>
        </Page>
      </BulkActionsProvider>
    </SelectionProvider>
  </SessionProvider>
);

export default BulkActionsPage;
