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
import { AppliedFilter } from './AppliedFilter';
import { FilterBar } from './FilterBar';
import { VenuesPagination } from './VenuesPagination';
import { VenuesTable } from './VenuesTable';
import { DeletedVenuesProvider } from './hooks/useDeletedVenues';

// Isolates the data region in an error boundary. `throwOnError` on the list
// query (useVenues) routes any fetch failure here instead of blanking the
// page; wiring `onReset` to react-query's reset lets "Try again" clear the
// boundary and refetch.
const VenuesData = () => {
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
                  Could not load venues
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
        <VenuesTable />
      </Panel.Content>
      <Panel.Content>
        <VenuesPagination />
      </Panel.Content>
    </ErrorBoundary>
  );
};

const FilterPage = () => (
  <DeletedVenuesProvider>
    <Page>
      <Page.Header>
        <Title>Venues</Title>
        <Description>
          Browse and filter available venues for your events.
        </Description>
      </Page.Header>
      <Panel aria-label="Venues">
        <Panel.Content>
          <Stack space="regular">
            <FilterBar />
            <AppliedFilter />
          </Stack>
        </Panel.Content>
        <VenuesData />
      </Panel>
    </Page>
  </DeletedVenuesProvider>
);

export default FilterPage;
