import { Button, ButtonGroup, Tooltip } from '@marigold/components';
import { Copy, Download, Printer } from '@marigold/icons';

export default () => (
  <ButtonGroup aria-label="Report actions" variant="ghost" size="icon">
    <Tooltip.Trigger>
      <Button aria-label="Copy link">
        <Copy />
      </Button>
      <Tooltip>Copy link</Tooltip>
    </Tooltip.Trigger>
    <Tooltip.Trigger>
      <Button aria-label="Download report">
        <Download />
      </Button>
      <Tooltip>Download</Tooltip>
    </Tooltip.Trigger>
    <Tooltip.Trigger>
      <Button aria-label="Print report">
        <Printer />
      </Button>
      <Tooltip>Print</Tooltip>
    </Tooltip.Trigger>
  </ButtonGroup>
);
