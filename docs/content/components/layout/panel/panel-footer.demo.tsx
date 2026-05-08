import { Button, Panel, Text } from '@marigold/components';

export default () => (
  <Panel variant="destructive">
    <Panel.Header>
      <Panel.Title>Delete organizer</Panel.Title>
      <Panel.Description>This is permanent. There's no undo.</Panel.Description>
    </Panel.Header>
    <Panel.Content>
      <Text>
        Deleting the organizer removes the account along with every published
        event, past booking, and customer record. Ticket holders are notified
        and refunded automatically.
      </Text>
    </Panel.Content>
    <Panel.Footer>
      <Button variant="destructive">Delete organizer</Button>
    </Panel.Footer>
  </Panel>
);
