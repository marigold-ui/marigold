import { Button, Tooltip } from '@marigold/components';

export const FocusTooltip = () => (
  <Tooltip.Trigger trigger="focus">
    <Button>Hover me!</Button>
    <Tooltip>Tooltip</Tooltip>
  </Tooltip.Trigger>
);
