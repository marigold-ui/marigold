'use client';

import { Button, Inline, Panel, Stack, Text } from '@marigold/components';

export const DangerZone = () => (
  <Panel variant="destructive" size="form" headingLevel={3}>
    <Panel.Header>
      <Panel.Title>Danger zone</Panel.Title>
      <Panel.Description>
        Permanent actions that affect your event settings.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
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
    </Panel.Content>
  </Panel>
);
