import { Button, Tooltip } from '@marigold/components';
import { DesignTicket } from '@marigold/icons';

export default () => (
  <Tooltip.Trigger>
    <Button variant="icon" size="large">
      <DesignTicket />
    </Button>
    <Tooltip>Design Ticket</Tooltip>
  </Tooltip.Trigger>
);
