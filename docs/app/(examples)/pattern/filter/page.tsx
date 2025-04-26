/**
 * TODO: added display contents to form, there is a demo (https://react-spectrum.adobe.com/react-spectrum/Form.html#accessibility) that has "maxWidth" as a prop maybe a good idea?
 * TODO: slider needs a "name" attribute, separate arial-label from name of thumb
 * TODO: need more visual separation between the filters in the drawer
 */
import { Headline, Stack } from '@/ui';
import { AppliedFilter } from './applied-filter';
import { Toolbar } from './toolbar';
import { Venues } from './venues';

const FilterPage = () => {
  return (
    <Stack space={8}>
      <Headline>Venues</Headline>
      <Toolbar />
      <AppliedFilter />
      <Venues />
    </Stack>
  );
};

export default FilterPage;
