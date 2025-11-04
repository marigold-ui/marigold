import { Headline, Inset, Stack } from '@/ui';
import { Newsletter } from './Newsletter';

const FilterPage = () => (
  <Inset spaceX={12} spaceY={6}>
    <Stack space={20}>
      <Headline>Inventory</Headline>
      <Newsletter />
    </Stack>
  </Inset>
);

export default FilterPage;
