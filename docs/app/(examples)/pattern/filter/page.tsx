/**
 * TODO: slider needs a "name" attribute, separate arial-label from name of thumb
 * TODO: need more visual separation between the filters in the drawer
 * TODO: close drawer after applying filters?
 * TODO: indicate when there is a unapplied filters (drawer)?
 */
import { Stack } from '@/ui';
import { AppliedFilter } from './applied-filter';
import { Toolbar } from './toolbar';
import { VenuesView } from './venues-view';

const FilterPage = () => {
  return (
    <Stack space={8}>
      <Toolbar />
      <AppliedFilter />
      <VenuesView />
    </Stack>
  );
};

export default FilterPage;
