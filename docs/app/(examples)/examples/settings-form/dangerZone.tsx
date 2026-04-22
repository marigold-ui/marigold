'use client';

import { Button, Inline, Panel, Stack, Text } from '@marigold/components';

const actions = [
  {
    id: 'reset',
    label: 'Reset all defaults',
    description:
      'Restores every setting on this page to its factory value. Existing events are not affected.',
    action: 'Reset',
  },
  {
    id: 'delete',
    label: 'Delete all draft events',
    description:
      'Permanently removes every unpublished event. Published events and past bookings are not affected.',
    action: 'Delete',
  },
];

export const DangerZone = () => (
  <Panel variant="destructive" size="form" headingLevel={3}>
    <Panel.Header>
      <Panel.Title>Danger zone</Panel.Title>
      <Panel.Description>
        Permanent actions that affect your event settings. There's no undo.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        {actions.map(item => (
          <Inline key={item.id} alignY="center" alignX="between" space="group">
            <Stack space="0.5">
              <Text weight="medium">{item.label}</Text>
              <Text size="xs" color="secondary">
                {item.description}
              </Text>
            </Stack>
            <Button variant="destructive-ghost">{item.action}</Button>
          </Inline>
        ))}
      </Stack>
    </Panel.Content>
  </Panel>
);
