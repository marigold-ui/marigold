import { Blog } from './Blog';
import { ContactForm } from './ContactForm';
import { FAQ } from './FAQ';
import { Newsletter } from './Newsletter';
import { OurMission } from './OurMission';

const InventoryPage = () => (
  <div className="mx-auto grid max-w-6xl gap-48 py-6">
    <OurMission />
    <Newsletter />
    <Blog />
    <ContactForm />
    <FAQ />
  </div>
);

export default InventoryPage;

/**
 * Notes:
 * - level 1 headline is not big enough? needs there to be a level 0? maybe have semantics names instead
 * - line height when using larger font sizes with <Text> is to low because the TW classes are meant for headlines
 * - we need more variants than just "muted" for text
 * - improve fontweight usage? e.g. light?
 * - when using left icon in accordion, should the content automatically be inset?
 */
