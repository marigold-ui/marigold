import { Stack } from '@/ui';
import { Newsletter } from './Newsletter';
import { OurMission } from './OurMission';

const FilterPage = () => (
  <div className="mx-auto max-w-6xl py-6">
    <Stack space={32}>
      <OurMission />
      <Newsletter />
    </Stack>
  </div>
);

export default FilterPage;

/**
 * Notes:
 * - level 1 headline is not big enough? needs there to be a level 0? maybe have semantics names instead
 * - line height when using larger font sizes with <Text> is to low because the TW classes are meant for headlines
 */
