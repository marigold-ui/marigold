'use client';

import { Button, Drawer, Link, Stack, Text } from '@marigold/components';

export default function () {
  return (
    <Drawer.Trigger>
      <Button>Open Help</Button>
      <Drawer placement="right">
        <Drawer.Title>Quick Help</Drawer.Title>
        <Drawer.Content>
          <Stack space={4}>
            <Text>
              Need assistance while handling tickets? Here are some quick links:
            </Text>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#">How to reset a user password</Link>
              </li>
              <li>
                <Link href="#">
                  Escalation policy for high-priority tickets
                </Link>
              </li>
              <li>
                <Link href="#">Troubleshooting login issues</Link>
              </li>
            </ul>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
