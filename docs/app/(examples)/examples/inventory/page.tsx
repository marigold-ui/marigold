'use client';

import { Divider, Inset } from '@marigold/components';
import { Blog } from '../../inventory/Blog';
import { ContactForm } from '../../inventory/ContactForm';
import { ContactTiles } from '../../inventory/ContactTiles';
import { FAQ } from '../../inventory/FAQ';
import { Inventory } from '../../inventory/Inventory';
import { Newsletter } from '../../inventory/Newsletter';
import { OurMission } from '../../inventory/OurMission';
import { Settings } from '../../inventory/Settings';
import { UserTable } from '../../inventory/UserTable';

const InventoryPage = () => (
  <Inset space={4}>
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
  </Inset>
);

export default InventoryPage;
