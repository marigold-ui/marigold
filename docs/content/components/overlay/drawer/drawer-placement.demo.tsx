import { useState } from 'react';
import {
  Button,
  Drawer,
  Inline,
  Stack,
  Text,
  TextArea,
} from '@marigold/components';

const drawers = {
  top: {
    title: 'System Notification',
    content: (
      <Stack space={3}>
        <Text>⚡ Scheduled maintenance on Sep 20, 2025</Text>
        <Text>📢 New feature: bulk ticket assignment now available</Text>
        <Text>✅ Ticket #4499 has been resolved</Text>
      </Stack>
    ),
    actions: <Button slot="close">Dismiss</Button>,
  },
  bottom: {
    title: 'Reply to ticket',
    content: (
      <Drawer.Content>
        <Stack space={4}>
          <TextArea label="Your message" placeholder="Type a quick reply..." />
        </Stack>
      </Drawer.Content>
    ),
    actions: (
      <>
        <Button slot="close">Cancel</Button>
        <Button slot="close" variant="primary">
          Send
        </Button>
      </>
    ),
  },

  right: {
    title: 'Agent Activity',
    content: (
      <Stack space={4}>
        <Text>👩‍💻 Jane Doe assigned ticket #4521 to herself.</Text>
        <Text>🕒 Ticket #4477 marked as "In Progress".</Text>
        <Text>📤 John Smith replied to customer on ticket #4502.</Text>
        <Text>✅ Ticket #4499 was resolved.</Text>
      </Stack>
    ),
    actions: <Button slot="close">Close</Button>,
  },
};

type Placement = 'right' | 'top' | 'bottom';

export default function DrawerDemo() {
  const [placement, setPlacement] = useState<Placement>('right');
  const [open, setOpen] = useState(false);

  const currentDrawer = drawers[placement];

  const handleOpen = (nextPlacement: Placement) => {
    // Case 1: drawer open + same placement => close
    if (open && nextPlacement === placement) {
      setOpen(false);
      return;
    }

    // Case 2: drawer open + different placement => close, then reopen
    if (open && nextPlacement !== placement) {
      setOpen(false);
      setTimeout(() => {
        setPlacement(nextPlacement);
        setOpen(true);
      }, 300);
      return;
    }

    // Case 3: drawer closed => open with new placement
    setPlacement(nextPlacement);
    setOpen(true);
  };

  return (
    <Drawer.Trigger open={open} onOpenChange={setOpen}>
      <Inline space={3}>
        {['right', 'left', 'top', 'bottom'].map(p => (
          <Button key={p} onPress={() => handleOpen(p as typeof placement)}>
            {p}
          </Button>
        ))}
      </Inline>
      <Drawer placement={placement}>
        <Drawer.Title>{currentDrawer.title}</Drawer.Title>
        <Drawer.Content>{currentDrawer.content}</Drawer.Content>
        <Drawer.Actions>{currentDrawer.actions}</Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
