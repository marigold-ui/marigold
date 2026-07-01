'use client';

import { Description, Page, Tabs, Title } from '@marigold/components';
import { DangerZone } from './dangerZone';
import { GeneralSettings } from './generalSettings';
import { Notifications } from './notifications';
import { RegistrationCapacity } from './registrationCapacity';

const SettingsFormPage = () => (
  <Page>
    <Page.Header>
      <Title>Event settings</Title>
      <Description>
        Manage your organization defaults. Changes here apply to all new events
        unless overridden on the individual event page.
      </Description>
    </Page.Header>
    <Tabs>
      <Tabs.List>
        <Tabs.Item id="general">General</Tabs.Item>
        <Tabs.Item id="registration">Registration</Tabs.Item>
        <Tabs.Item id="notifications">Notifications</Tabs.Item>
      </Tabs.List>
      <Tabs.Panel id="general">
        <GeneralSettings />
      </Tabs.Panel>
      <Tabs.Panel id="registration">
        <RegistrationCapacity />
      </Tabs.Panel>
      <Tabs.Panel id="notifications">
        <Notifications />
      </Tabs.Panel>
    </Tabs>
    <DangerZone />
  </Page>
);

export default SettingsFormPage;
