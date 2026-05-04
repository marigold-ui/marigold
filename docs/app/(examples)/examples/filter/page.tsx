'use client';

import { Headline, Inset, Panel, Stack, Text } from '@marigold/components';
import { AppliedFilter } from './applied-filter';
import { Toolbar } from './toolbar';
import { VenuesTable } from './venues-table';

const FilterPage = () => (
  <Inset space={4}>
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
      </Panel>
    </Stack>
  </Inset>
);

export default FilterPage;
