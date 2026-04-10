'use client';

import { Divider, Headline, Inset, Stack, Text } from '@marigold/components';
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
    <Stack space={8}>
      <Stack space={2}>
        <Headline level={2}>Component Inventory</Headline>
        <Text>A showcase of Marigold components in real-world layouts.</Text>
      </Stack>
      <div className="grid max-w-6xl gap-48">
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
    </Stack>
  </Inset>
);

export default InventoryPage;
