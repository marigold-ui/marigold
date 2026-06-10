// Each file in this example carries its own 'use client' so individual
// components can be copy-pasted into a project without tracing back to
// where the client boundary starts. Once page.tsx is a client component,
// Next.js inherits client status down the tree, so the directive on the
// children is intentional documentation, not a requirement.
'use client';

import { Description, Page, Panel, Stack, Title } from '@marigold/components';
import { AppliedFilter } from './AppliedFilter';
import { Toolbar } from './Toolbar';
import { VenuesPagination } from './VenuesPagination';
import { VenuesTable } from './VenuesTable';

const FilterPage = () => (
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
          <Toolbar />
          <AppliedFilter />
        </Stack>
      </Panel.Content>
      <Panel.Content bleed>
        <VenuesTable />
      </Panel.Content>
      <Panel.Content>
        <VenuesPagination />
      </Panel.Content>
    </Panel>
  </Page>
);

export default FilterPage;
