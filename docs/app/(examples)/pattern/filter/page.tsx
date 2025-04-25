'use client';

import { Headline, Stack } from '@marigold/components';
import { Toolbar } from './toolbar';
import { Venues } from './venues';

const FilterPage = () => {
  return (
    <Stack space={8}>
      <Headline>Venues</Headline>
      <Toolbar />
      <div>applied filter</div>
      <Venues />
    </Stack>
  );
};

export default FilterPage;
