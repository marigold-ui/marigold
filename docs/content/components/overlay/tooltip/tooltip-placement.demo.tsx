import { Button, Tooltip } from '@marigold/components';

export default () => (
  <Tooltip.Trigger>
    <Button>Edit Ticket</Button>
    <Tooltip placement="right">Make changes to the ticket details.</Tooltip>
  </Tooltip.Trigger>
);
