'use client';

import { Headline, Inset, Stack, Text } from '@marigold/components';
import { AppliedFilter } from './applied-filter';
import { Toolbar } from './toolbar';
import { VenuesView } from './venues-view';

const FilterPage = () => (
  <Inset space={4}>
    <Stack space={8}>
      <Stack space={2}>
        <Headline level={2}>Venues</Headline>
        <Text>Browse and filter available venues for your events.</Text>
      </Stack>
      <Toolbar />
      <AppliedFilter />
      <VenuesView />
    </Stack>
  </Inset>
);

export default FilterPage;
