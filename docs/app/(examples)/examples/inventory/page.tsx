'use client';

import { Headline, Inset, Stack, Text } from '@marigold/components';
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
      <Stack space="section">
        <Inventory />
        <OurMission />
        <Newsletter />
        <Blog />
        <ContactForm />
        <FAQ />
        <Settings />
        <UserTable />
        <ContactTiles />
      </Stack>
    </Stack>
  </Inset>
);

export default InventoryPage;
