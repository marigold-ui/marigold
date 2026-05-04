'use client';

import { Headline, Inset, Stack, Tabs, Text } from '@marigold/components';
import { DangerZone } from './dangerZone';
import { GeneralSettings } from './generalSettings';
import { Notifications } from './notifications';
import { RegistrationCapacity } from './registrationCapacity';

const SettingsFormPage = () => (
  <Inset space={4}>
    <Stack space="group">
      <Stack space="tight">
        <Headline level={2}>Event settings</Headline>
        <Text>
          Manage your organization defaults. Changes here apply to all new
          events unless overridden on the individual event page.
        </Text>
      </Stack>
      <Tabs>
        <Tabs.List>
          <Tabs.Item id="general">General</Tabs.Item>
          <Tabs.Item id="registration">Registration</Tabs.Item>
          <Tabs.Item id="notifications">Notifications</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="general">
          <GeneralSettings />
        </Tabs.TabPanel>
        <Tabs.TabPanel id="registration">
          <RegistrationCapacity />
        </Tabs.TabPanel>
        <Tabs.TabPanel id="notifications">
          <Notifications />
        </Tabs.TabPanel>
      </Tabs>
      <DangerZone />
    </Stack>
  </Inset>
);

export default SettingsFormPage;
