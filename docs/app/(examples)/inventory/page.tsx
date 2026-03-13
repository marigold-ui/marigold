'use client';

import { Divider } from '@marigold/components';
import { Blog } from './Blog';
import { ContactForm } from './ContactForm';
import { ContactTiles } from './ContactTiles';
import { FAQ } from './FAQ';
import { Inventory } from './Inventory';
import { Newsletter } from './Newsletter';
import { OurMission } from './OurMission';
import { Settings } from './Settings';
import { UserTable } from './UserTable';

const InventoryPage = () => (
  <div className="mx-auto grid max-w-6xl gap-48">
    <Inventory />
    <Divider />
    <OurMission />
    <Newsletter />
    <Blog />
    <ContactForm />
    <FAQ />
    <Settings />
    <UserTable />
    <ContactTiles />
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
 * - radio: should it also have a label?
 * - listbox: custom scrollbar (no background at least)
 * - select: make it possible to adjust what is rendered in the selected value
 * - menu: divider is missing
 */
