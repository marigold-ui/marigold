import { Button, Tooltip } from '@marigold/components';
import { Info } from '@marigold/icons';

export const BasicTooltip = () => (
  <Tooltip.Trigger>
    <Button>
      <Info fill="info" />
    </Button>
    <Tooltip>Tooltip</Tooltip>
  </Tooltip.Trigger>
);
