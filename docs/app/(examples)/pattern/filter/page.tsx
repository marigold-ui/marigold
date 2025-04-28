/**
 * TODO: added display contents to form, there is a demo (https://react-spectrum.adobe.com/react-spectrum/Form.html#accessibility) that has "maxWidth" as a prop maybe a good idea?
 * TODO: slider needs a "name" attribute, separate arial-label from name of thumb
 * TODO: need more visual separation between the filters in the drawer
 * TODO: close drawer after applying filters?
 * TODO: support range in <NumberFormat>, maybe also have functions AND components? (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatRange#using_formatrange)
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
