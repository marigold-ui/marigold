import { Button, Inline, Panel, Stack, Text } from '@marigold/components';

const actions = [
  {
    id: 'archive',
    label: 'Archive organizer',
    description:
      'Hides every event from customers and locks the account. Past bookings and reports stay available.',
    action: 'Archive',
  },
  {
    id: 'transfer',
    label: 'Transfer ownership',
    description:
      'Hands the organizer, its events, and its billing details to another user. You lose access immediately.',
    action: 'Transfer',
  },
  {
    id: 'delete',
    label: 'Delete organizer',
    description:
      'Permanently removes the account, every event, and all booking history. Ticket holders are notified and refunded.',
    action: 'Delete',
  },
];

export default () => (
  <Panel variant="destructive">
    <Panel.Header>
      <Panel.Title>Danger zone</Panel.Title>
      <Panel.Description>
        Permanent actions that affect this organizer. There's no undo.
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
