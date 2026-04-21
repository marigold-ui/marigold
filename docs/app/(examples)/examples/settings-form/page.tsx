'use client';

import {
  Headline,
  Inset,
  Stack,
  Text,
  ToastProvider,
} from '@marigold/components';
import { DangerZone } from './dangerZone';
import { GeneralSettings } from './generalSettings';
import { Notifications } from './notifications';
import { RegistrationCapacity } from './registrationCapacity';

const SettingsFormPage = () => (
  <Inset space={4}>
    <Stack space="group" alignX="left">
      <Stack space="tight">
        <Headline level={2}>Event settings</Headline>
        <Text>Configure defaults and preferences for your events.</Text>
      </Stack>
      <div className="max-w-xl">
        <Stack space="group">
          <GeneralSettings />
          <RegistrationCapacity />
          <Notifications />
          <DangerZone />
        </Stack>
      </div>
    </Stack>
    <ToastProvider position="bottom-right" />
  </Inset>
);

export default SettingsFormPage;
