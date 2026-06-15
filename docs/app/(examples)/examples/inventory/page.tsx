'use client';

import { Description, Page, Title } from '@marigold/components';
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
  <Page>
    <Page.Header>
      <Title>Component Inventory</Title>
      <Description>
        A showcase of Marigold components in real-world layouts.
      </Description>
    </Page.Header>
    <Page.Content space="section">
      <Inventory />
      <OurMission />
      <Newsletter />
      <Blog />
      <ContactForm />
      <FAQ />
      <Settings />
      <UserTable />
      <ContactTiles />
    </Page.Content>
  </Page>
);

export default InventoryPage;
