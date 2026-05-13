'use client';

import { Divider, Headline, Inset, Stack, Text } from '@marigold/components';
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
