'use client';

import { Headline, Inset, Stack, Text } from '@marigold/components';
import { AppliedFilter } from './applied-filter';
import { Toolbar } from './toolbar';
import { VenuesTable } from './venues-table';

const DataManagementPage = () => (
  <Inset space={4}>
    <Stack space={8}>
      <Stack space={2}>
        <Headline level={2}>Venues</Headline>
        <Text>
          Browse, filter, and manage all venues available for your events.
        </Text>
      </Stack>
      <Toolbar />
      <AppliedFilter />
      <VenuesTable />
    </Stack>
  </Inset>
);

export default DataManagementPage;
