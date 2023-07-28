import { Button, Tooltip } from '@marigold/components';
import { Info } from '@marigold/icons';

export default () => (
  <Tooltip.Trigger>
    <Button>
      <Info className="fill-fill-info" />
    </Button>
    <Tooltip>Tooltip</Tooltip>
  </Tooltip.Trigger>
);
