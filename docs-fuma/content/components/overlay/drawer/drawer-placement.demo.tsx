'use client';

import { ReactNode, useState } from 'react';
import {
  Button,
  Drawer,
  Inline,
  Stack,
  Text,
  TextArea,
} from '@marigold/components';

interface DrawerConfig {
  [key: string]: {
    title: string;
    content: ReactNode;
    actions?: ReactNode;
  };
}

const drawers: DrawerConfig = {
  top: {
    title: 'System Notification',
    content: (
      <Stack space={3}>
        <Text>⚡ Scheduled maintenance on Sep 20, 2025</Text>
        <Text>📢 New feature: bulk ticket assignment now available</Text>
        <Text>✅ Ticket #4499 has been resolved</Text>
      </Stack>
    ),
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
  },
  left: {
    title: 'Support Teams',
    content: (
      <Stack space={5}>
        <Stack>
          <Text>🎟 Frontline Support</Text>
          <Text>Active tickets: 34</Text>
        </Stack>
        <Stack>
          <Text>💳 Billing Team</Text>
          <Text>Active tickets: 12</Text>
        </Stack>
        <Stack>
          <Text>⚙️ Technical Support</Text>
          <Text>Active tickets: 8</Text>
        </Stack>
      </Stack>
    ),
    actions: <Button slot="close">Close</Button>,
  },
};

type Placement = 'right' | 'left' | 'top' | 'bottom';

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
        {['right', 'left', 'top', 'bottom'].map((p: Placement) => (
          <Button key={p} onPress={() => handleOpen(p)}>
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
