import { Button, Tooltip } from '@marigold/components';

export default () => (
  <Tooltip.Trigger>
    <Button>Hover me!</Button>
    <Tooltip placement="right">Tooltip</Tooltip>
  </Tooltip.Trigger>
);
