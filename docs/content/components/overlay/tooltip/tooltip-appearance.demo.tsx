import type { TooltipProps } from '@marigold/components';
import { Button, Tooltip } from '@marigold/components';
import { Edit } from '@marigold/icons';

export default (props: TooltipProps) => (
  <Tooltip.Trigger>
    <Button>
      <Edit aria-hidden="true" />
    </Button>
    <Tooltip {...props}>Edit (⌘E)</Tooltip>
  </Tooltip.Trigger>
);
