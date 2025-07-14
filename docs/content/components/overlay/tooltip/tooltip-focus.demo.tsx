import { Button, Tooltip } from '@marigold/components';

export default () => (
  <Tooltip.Trigger trigger="focus">
    <Button>Check Availability</Button>
    <Tooltip>View available seats before booking.</Tooltip>
  </Tooltip.Trigger>
);
