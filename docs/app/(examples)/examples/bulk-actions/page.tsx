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
  Center,
  Description,
  Page,
  Panel,
  Stack,
  Text,
  Title,
} from '@marigold/components';
import { EventsPagination } from './EventsPagination';
import { EventsTable } from './EventsTable';
import { Toolbar } from './Toolbar';
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
          <div className="grid min-h-64 place-items-center">
            <Center>
              <Stack space={2} alignX="center">
                <Text fontSize="lg" weight="bold">
                  Could not load events
                </Text>
                <Text variant="muted">
                  Something went wrong while fetching data.
                </Text>
                <Button variant="primary" onPress={resetErrorBoundary}>
                  Try again
                </Button>
              </Stack>
            </Center>
          </div>
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
      <Page>
        <Page.Header>
          <Title>Events</Title>
          <Description>
            Select events in the table and run one operation across all of them
            — publish, edit, export, or delete.
          </Description>
        </Page.Header>
        <Panel aria-label="Events">
          <Panel.Content>
            <Toolbar />
          </Panel.Content>
          <EventsData />
        </Panel>
      </Page>
    </SelectionProvider>
  </SessionProvider>
);

export default BulkActionsPage;
