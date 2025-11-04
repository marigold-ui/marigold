import { Blog } from './Blog';
import { CallToAction } from './CallToActions';
import { Newsletter } from './Newsletter';
import { OurMission } from './OurMission';

const FilterPage = () => (
  <div className="mx-auto grid max-w-6xl gap-48 py-6">
    <OurMission />
    <CallToAction />
    <Newsletter />
    <Blog />
  </div>
);

export default FilterPage;

/**
 * Notes:
 * - level 1 headline is not big enough? needs there to be a level 0? maybe have semantics names instead
 * - line height when using larger font sizes with <Text> is to low because the TW classes are meant for headlines
 */
