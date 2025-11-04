import { Blog } from './Blog';
import { ContactForm } from './ContactForm';
import { FAQ } from './FAQ';
import { Newsletter } from './Newsletter';
import { OurMission } from './OurMission';
import { Settings } from './Settings';

const InventoryPage = () => (
  <div className="mx-auto grid max-w-6xl gap-48 py-6">
    <OurMission />
    <Newsletter />
    <Blog />
    <ContactForm />
    <FAQ />
    <Settings />
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
 * - accordion needs variants with "relaxed" spacing
 * - columns: convert to modern css with grid (columns are more flexible, e.g. min-content)? collapse with container query
 * - automatic style for svgs in tab items (see settings example)
 * - select: use field size as default width?
 */
