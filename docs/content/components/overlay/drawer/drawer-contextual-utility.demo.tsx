import { Button, Drawer, Link, Stack, Text } from '@marigold/components';

export default function () {
  return (
    <Drawer.Trigger>
      <Button>Open Help</Button>
      <Drawer>
        <Drawer.Title>Quick Help</Drawer.Title>
        <Drawer.Content>
          <Stack space="regular">
            <Text>
              Need assistance while handling tickets? Here are some quick links:
            </Text>
            <Stack asList space="related">
              <Link href="#">How to reset a user password</Link>
              <Link href="#">Escalation policy for high-priority tickets</Link>
              <Link href="#">Troubleshooting login issues</Link>
            </Stack>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
