import { Stack } from '@/ui';
import { AppliedFilter } from './applied-filter';
import { Toolbar } from './toolbar';
import { VenuesView } from './venues-view';

const FilterPage = () => (
  <Stack space={8}>
    <Toolbar />
    <AppliedFilter />
    <VenuesView />
  </Stack>
);

export default FilterPage;
