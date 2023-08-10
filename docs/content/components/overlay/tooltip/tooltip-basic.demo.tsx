import { Button, Tooltip } from '@marigold/components';
import { Info } from '@marigold/icons';

export default () => (
  <Tooltip.Trigger>
    <Button>
      <Info className="text-text-info" />
    </Button>
    <Tooltip>Tooltip</Tooltip>
  </Tooltip.Trigger>
);
