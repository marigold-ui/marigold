import { Button, Tooltip } from '@marigold/components';
import { useState } from 'react';

export const PressedTooltip = () => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Trigger open={open}>
      <Button
        variant="primary"
        onPressStart={() => setOpen(true)}
        onPressEnd={() => setOpen(false)}
      >
        Press and hold me!
      </Button>
      <Tooltip>I am a tooltip!</Tooltip>
    </Tooltip.Trigger>
  );
};
