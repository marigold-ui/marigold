import { Button, Tooltip } from '@marigold/components';

export const CustomTooltip = () => (
  <Tooltip.Trigger placement="right">
    <Button>Hover me!</Button>
    <Tooltip>Tooltip</Tooltip>
  </Tooltip.Trigger>
);
