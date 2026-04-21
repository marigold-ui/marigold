'use client';

import {
  Button,
  Card,
  Headline,
  Inline,
  Stack,
  Text,
} from '@marigold/components';

export const DangerZone = () => (
  <Card p={4}>
    <Stack space="regular">
      <Stack space="tight">
        <Headline level={3}>Danger zone</Headline>
        <Text>Permanent actions that affect your event settings.</Text>
      </Stack>
      <Stack space="regular">
        <Inline alignY="center" alignX="between" space="group">
          <Stack space="tight">
            <Text weight="medium">Reset all defaults</Text>
            <Text size="xs" color="secondary">
              Restores every setting on this page to its factory value. Existing
              events are not affected.
            </Text>
          </Stack>
          <Button variant="destructive">Reset</Button>
        </Inline>
        <Inline alignY="center" alignX="between" space="group">
          <Stack space="tight">
            <Text weight="medium">Delete all draft events</Text>
            <Text size="xs" color="secondary">
              Permanently removes every unpublished event. Published events and
              past bookings are not affected.
            </Text>
          </Stack>
          <Button variant="destructive">Delete</Button>
        </Inline>
      </Stack>
    </Stack>
  </Card>
);
