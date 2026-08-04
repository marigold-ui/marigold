import { Button, Description, Panel, Text, Title } from '@marigold/components';

export default () => (
  <Panel variant="destructive">
    <Panel.Header>
      <Title>Delete organizer</Title>
      <Description>This is permanent. There's no undo.</Description>
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
