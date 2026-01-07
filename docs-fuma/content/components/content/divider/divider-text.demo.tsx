'use client';

import { Divider, Stack, Text } from '@marigold/components';

export default () => (
  <Stack space={4}>
    <Stack space={2}>
      <Text weight="bold">Account Information</Text>
      <Text>Update your name, email address, and password.</Text>
    </Stack>
    <Divider />
    <Stack space={2}>
      <Text weight="bold">Notification Settings</Text>
      <Text> Choose how you want to receive updates and alerts.</Text>
    </Stack>
  </Stack>
);
