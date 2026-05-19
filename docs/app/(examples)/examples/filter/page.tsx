// Each file in this example carries its own 'use client' so individual
// components can be copy-pasted into a project without tracing back to
// where the client boundary starts. Once page.tsx is a client component,
// Next.js inherits client status down the tree, so the directive on the
// children is intentional documentation, not a requirement.
'use client';

import { Headline, Inset, Panel, Stack, Text } from '@marigold/components';
import { AppliedFilter } from './AppliedFilter';
import { Toolbar } from './Toolbar';
import { VenuesPagination } from './VenuesPagination';
import { VenuesTable } from './VenuesTable';

const FilterPage = () => (
  <Inset p={4}>
    <Stack space={8}>
      <Stack space={2}>
        <Headline level={2}>Venues</Headline>
        <Text>Browse and filter available venues for your events.</Text>
      </Stack>
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
    </Stack>
  </Inset>
);

export default FilterPage;
