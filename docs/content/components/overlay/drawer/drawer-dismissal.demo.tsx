import { Button, Drawer, Stack, Text } from '@marigold/components';

export default function () {
  return (
    <Drawer.Trigger>
      <Button>Open Ticket Details</Button>
      <Drawer>
        <Drawer.Title>Ticket #4521</Drawer.Title>
        <Drawer.Content>
          <Stack space={8}>
            <Text>
              This drawer shows details for a support ticket in the system.
            </Text>
            <Text>
              Users can review the issue description, update its status, or
              assign it to a team member without leaving the current page.
            </Text>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
          <Button slot="close" variant="primary">
            Resolve Ticket
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
