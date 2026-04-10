'use client';

import { Headline, Inset, Stack, Text } from '@marigold/components';
import { AppliedFilter } from '../../pattern/filter/applied-filter';
import { Toolbar } from '../../pattern/filter/toolbar';
import { VenuesView } from '../../pattern/filter/venues-view';

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
