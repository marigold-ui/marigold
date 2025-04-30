/**
 * TODO: slider needs a "name" attribute, separate arial-label from name of thumb
 * TODO: need more visual separation between the filters in the drawer
 * TODO: close drawer after applying filters?
 * TODO: Numeric format only in system not in components package?
 * TODO: a "clear all" button for taggroup component
 * TODO: indicate when there is a unapplied filters (drawer)?
 * TODO: TagGroup can not be used in a form, because it has no name attribute
 */
import { Headline, Stack } from '@/ui';
import { AppliedFilter } from './applied-filter';
import { Toolbar } from './toolbar';
import { VenuesView } from './venues-view';

const FilterPage = () => {
  return (
    <Stack space={8}>
      <Headline>Venues</Headline>
      <Toolbar />
      <AppliedFilter />
      <VenuesView />
    </Stack>
  );
};

export default FilterPage;
