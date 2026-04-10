'use client';

import { Inset, Stack } from '@marigold/components';
import { AppliedFilter } from '../../pattern/filter/applied-filter';
import { Toolbar } from '../../pattern/filter/toolbar';
import { VenuesView } from '../../pattern/filter/venues-view';

const FilterPage = () => (
  <Inset space={4}>
    <Stack space={8}>
      <Toolbar />
      <AppliedFilter />
      <VenuesView />
    </Stack>
  </Inset>
);

export default FilterPage;
