import { useState } from 'react';
import { Button, Drawer, DrawerProps, Inline } from '@marigold/components';

export default function DrawerDemo() {
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const [open, setOpen] = useState(false);

  const handleOpen = (nextPlacement: DrawerProps['placement']) => {
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
        <Drawer.Title>{placement} Drawer</Drawer.Title>
        <Drawer.Content>Some content</Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
          <Button slot="close" variant="primary">
            Confirm
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  );
}
