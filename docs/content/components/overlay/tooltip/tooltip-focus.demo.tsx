import { Button, Tooltip } from '@marigold/components';

export default () => (
  <Tooltip.Trigger trigger="focus">
    <Button>Check Availability</Button>
    <Tooltip>
      View available seats for this event before proceeding with your booking.
    </Tooltip>
  </Tooltip.Trigger>
);
