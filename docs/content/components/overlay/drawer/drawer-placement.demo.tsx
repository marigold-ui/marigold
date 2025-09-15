import { useState } from 'react';
import { Button, Drawer, Inline } from '@marigold/components';

export default function () {
  const [placement, setPlacement] = useState('right');
  return (
    <Drawer.Trigger>
      <Inline space={3}>
        {['right', 'left', 'top', 'bottom'].map(placement => (
          <Button key={placement} onPress={() => setPlacement(placement)}>
            {placement}
          </Button>
        ))}
      </Inline>
      <Drawer placement={placement}>
        <Drawer.Title>Left Drawer</Drawer.Title>
        <Drawer.Content>some content</Drawer.Content>
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
