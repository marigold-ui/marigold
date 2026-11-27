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
  Page,
  Panel,
  Stack,
  Title,
} from '@marigold/components';
import { Plus } from '@marigold/icons';
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
          <ErrorState
            title="Venues could not be loaded"
            description="Check your connection and try again."
            action={<Button onPress={resetErrorBoundary}>Try again</Button>}
          />
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
        <Description>Find a venue for your next event.</Description>
        <Button variant="primary">
          <Plus />
          Add venue
        </Button>
      </Page.Header>
      <Panel aria-label="Venues">
        <Panel.Content>
          <Stack space="related">
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
