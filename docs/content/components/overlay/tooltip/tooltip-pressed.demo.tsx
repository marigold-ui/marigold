import { useState } from 'react';

import { Button, Tooltip } from '@marigold/components';

export default () => {
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
