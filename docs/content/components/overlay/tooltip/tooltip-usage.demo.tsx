'use client';

import { Button, Tooltip } from '@marigold/components';
import { DesignTicket } from '@marigold/icons';

export default () => (
  <Tooltip.Trigger>
    <Button variant="ghost" size="icon" aria-label="Design Ticket">
      <DesignTicket aria-hidden="true" />
    </Button>
    <Tooltip>Design Ticket</Tooltip>
  </Tooltip.Trigger>
);
