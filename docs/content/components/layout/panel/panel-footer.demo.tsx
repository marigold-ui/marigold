import { Button, Panel, Stack, Text } from '@marigold/components';

export default () => (
  <Panel variant="destructive">
    <Panel.Header>
      <Panel.Title>Danger zone</Panel.Title>
      <Panel.Description>
        Actions in this section are permanent and cannot be undone.
      </Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <Text weight="medium">Delete organizer</Text>
        <Text variant="muted">
          Removes the organizer account along with all associated events, past
          bookings, and customer records. Ticket holders will be notified of the
          cancellation and refunded automatically.
        </Text>
      </Stack>
    </Panel.Content>
    <Panel.Footer>
      <Button variant="destructive">Delete organizer</Button>
    </Panel.Footer>
  </Panel>
);
