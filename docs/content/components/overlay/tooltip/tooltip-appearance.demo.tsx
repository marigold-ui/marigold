import { Button, Tooltip } from '@marigold/components';
import { Info } from '@marigold/icons';

export default () => (
  <Tooltip.Trigger>
    <Button>
      <Info color="text-info" />
    </Button>
    <Tooltip>Tooltip</Tooltip>
  </Tooltip.Trigger>
);
