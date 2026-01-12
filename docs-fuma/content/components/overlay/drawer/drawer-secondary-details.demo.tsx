import {
  Button,
  Drawer,
  DrawerProps,
  Inline,
  Stack,
  Text,
} from '@marigold/components';

export default function (props: DrawerProps) {
  return (
    <Drawer.Trigger>
      <Button>Open Ticket Details</Button>
      <Drawer {...props} size="medium">
        <Drawer.Title>Ticket #4521 - Login Issue</Drawer.Title>
        <Drawer.Content>
          <Stack space={6}>
            <Text>
              <strong>Description:</strong> User reports being unable to log in
              after the latest update. Error message:{' '}
              <em>"Invalid session token."</em>
            </Text>

            <Stack space={2}>
              <Text>
                <strong>Status:</strong> Open
              </Text>
              <Text>
                <strong>Priority:</strong> High
              </Text>
              <Text>
                <strong>Assigned to:</strong> Jane Doe
              </Text>
              <Text>
                <strong>Created:</strong> Sep 12, 2025
              </Text>
              <Text>
                <strong>Last Updated:</strong> Sep 15, 2025
              </Text>
            </Stack>

            <Text>
              <strong>Customer Notes:</strong>
              "I tried resetting my password, but I’m still locked out."
            </Text>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Inline space={3}>
            <Button slot="close">Close</Button>
            <Button
              slot="close"
              variant="primary"
              onPress={() => alert('Ticket marked as resolved')}
            >
              Resolve Ticket
            </Button>
          </Inline>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
