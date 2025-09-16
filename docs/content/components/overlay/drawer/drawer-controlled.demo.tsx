import { useState } from 'react';
import { Button, Drawer, Inline, Stack, Text } from '@marigold/components';

export default function () {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Trigger open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(prev => !prev)}>View Ticket</Button>
      <Drawer>
        <Drawer.Title>Ticket #4521 - Login Issue</Drawer.Title>
        <Drawer.Content>
          <Stack space={6}>
            <Text>
              <strong>Description:</strong> User reports being unable to log in
              after the latest update. Error message:{' '}
              <em>"Invalid session token."</em>
            </Text>
            <Text>
              <strong>Status:</strong> Open
            </Text>
            <Text>
              <strong>Assigned to:</strong> Support Agent A
            </Text>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Inline space={3}>
            <Button slot="close">Close</Button>
            <Button slot="close" variant="primary">
              Resolve Ticket
            </Button>
          </Inline>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
