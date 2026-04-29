'use client';

import { Headline, Inset, Stack, Text } from '@marigold/components';
import { Notifications } from './notifications';
import { Privacy } from './privacy';

const AutoSaveSettingsPage = () => (
  <Inset space={4}>
    <Stack space="group">
      <Stack space="tight">
        <Headline level={2}>Account preferences</Headline>
        <Text>
          Manage how Riverside notifies you and shares your activity. Changes
          save automatically.
        </Text>
      </Stack>
      <Notifications />
      <Privacy />
    </Stack>
  </Inset>
);

export default AutoSaveSettingsPage;
